/**
 * YouSoul Backend API
 * 
 * Emotional productivity app backend with:
 * - Task CRUD with mood tracking
 * - User preferences management
 * - Reflection photo storage
 */

import { Hono } from "hono";
import type { Client } from "@sdk/server-types";
import { tables, buckets } from "@generated";
import { eq, and, desc, asc } from "drizzle-orm";

/**
 * Create your Hono app
 * @param edgespark - EdgeSpark SDK client
 * @returns Hono app with your routes defined
 */
export async function createApp(
  edgespark: Client<typeof tables>
): Promise<Hono> {
  const app = new Hono();

  // ═══════════════════════════════════════════════════════════
  // PUBLIC ENDPOINTS
  // ═══════════════════════════════════════════════════════════

  app.get("/api/public/health", (c) => {
    console.log("[API] GET /api/public/health - health check");
    return c.json({ status: "ok", app: "YouSoul" });
  });

  // ═══════════════════════════════════════════════════════════
  // AUTHENTICATED USER ENDPOINTS
  // ═══════════════════════════════════════════════════════════

  // Get current user profile
  app.get("/api/me", (c) => {
    const user = edgespark.auth.user!;
    console.log("[API] GET /api/me - user:", user.id);
    return c.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  });

  // ═══════════════════════════════════════════════════════════
  // TASKS ENDPOINTS
  // ═══════════════════════════════════════════════════════════

  // Get all tasks for current user
  app.get("/api/tasks", async (c) => {
    const user = edgespark.auth.user!;
    console.log("[API] GET /api/tasks - userId:", user.id);

    const allTasks = await edgespark.db
      .select()
      .from(tables.tasks)
      .where(eq(tables.tasks.userId, user.id))
      .orderBy(asc(tables.tasks.orderIndex), desc(tables.tasks.createdAt));

    console.log("[API] GET /api/tasks - found:", allTasks.length);
    return c.json({ data: allTasks });
  });

  // Get single task
  app.get("/api/tasks/:id", async (c) => {
    const user = edgespark.auth.user!;
    const id = parseInt(c.req.param("id"));
    console.log("[API] GET /api/tasks/:id - id:", id);

    const result = await edgespark.db
      .select()
      .from(tables.tasks)
      .where(and(eq(tables.tasks.id, id), eq(tables.tasks.userId, user.id)));

    if (result.length === 0) {
      console.warn("[API] GET /api/tasks/:id - not found:", id);
      return c.json({ error: "Task not found" }, 404);
    }

    return c.json({ data: result[0] });
  });

  // Create task
  app.post("/api/tasks", async (c) => {
    const user = edgespark.auth.user!;
    const body = await c.req.json();
    console.log("[API] POST /api/tasks - creating for user:", user.id);

    const result = await edgespark.db
      .insert(tables.tasks)
      .values({
        userId: user.id,
        title: body.title,
        description: body.description || null,
        status: body.status || "backlog",
        priority: body.priority || "medium",
        dueDate: body.dueDate || null,
        dueTime: body.dueTime || null,
        anticipatedMood: body.anticipatedMood || null,
        orderIndex: body.orderIndex || 0,
      })
      .returning();

    console.log("[API] POST /api/tasks - created:", result[0].id);
    return c.json({ data: result[0] }, 201);
  });

  // Update task
  app.patch("/api/tasks/:id", async (c) => {
    const user = edgespark.auth.user!;
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();
    console.log("[API] PATCH /api/tasks/:id - id:", id, "body:", body);

    // Build update object dynamically
    const updateData: Record<string, unknown> = {
      updatedAt: Math.floor(Date.now() / 1000),
    };

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.priority !== undefined) updateData.priority = body.priority;
    if (body.dueDate !== undefined) updateData.dueDate = body.dueDate;
    if (body.dueTime !== undefined) updateData.dueTime = body.dueTime;
    if (body.anticipatedMood !== undefined) updateData.anticipatedMood = body.anticipatedMood;
    if (body.completedMood !== undefined) updateData.completedMood = body.completedMood;
    if (body.reflectionNote !== undefined) updateData.reflectionNote = body.reflectionNote;
    if (body.reflectionPhotoS3Uri !== undefined) updateData.reflectionPhotoS3Uri = body.reflectionPhotoS3Uri;
    if (body.orderIndex !== undefined) updateData.orderIndex = body.orderIndex;

    // Set completedAt when moving to done
    if (body.status === "done" && !body.completedAt) {
      updateData.completedAt = Math.floor(Date.now() / 1000);
    }
    if (body.completedAt !== undefined) updateData.completedAt = body.completedAt;

    const result = await edgespark.db
      .update(tables.tasks)
      .set(updateData)
      .where(and(eq(tables.tasks.id, id), eq(tables.tasks.userId, user.id)))
      .returning();

    if (result.length === 0) {
      console.warn("[API] PATCH /api/tasks/:id - not found:", id);
      return c.json({ error: "Task not found" }, 404);
    }

    console.log("[API] PATCH /api/tasks/:id - updated:", id);
    return c.json({ data: result[0] });
  });

  // Delete task
  app.delete("/api/tasks/:id", async (c) => {
    const user = edgespark.auth.user!;
    const id = parseInt(c.req.param("id"));
    console.log("[API] DELETE /api/tasks/:id - id:", id);

    const result = await edgespark.db
      .delete(tables.tasks)
      .where(and(eq(tables.tasks.id, id), eq(tables.tasks.userId, user.id)))
      .returning();

    if (result.length === 0) {
      console.warn("[API] DELETE /api/tasks/:id - not found:", id);
      return c.json({ error: "Task not found" }, 404);
    }

    console.log("[API] DELETE /api/tasks/:id - deleted:", id);
    return c.json({ success: true });
  });

  // Bulk update task order
  app.post("/api/tasks/reorder", async (c) => {
    const user = edgespark.auth.user!;
    const body = await c.req.json();
    console.log("[API] POST /api/tasks/reorder - items:", body.items?.length);

    if (!Array.isArray(body.items)) {
      return c.json({ error: "items must be an array" }, 400);
    }

    // Update each task's orderIndex
    for (const item of body.items) {
      await edgespark.db
        .update(tables.tasks)
        .set({ orderIndex: item.orderIndex, updatedAt: Math.floor(Date.now() / 1000) })
        .where(and(eq(tables.tasks.id, item.id), eq(tables.tasks.userId, user.id)));
    }

    console.log("[API] POST /api/tasks/reorder - completed");
    return c.json({ success: true });
  });

  // ═══════════════════════════════════════════════════════════
  // USER PREFERENCES ENDPOINTS
  // ═══════════════════════════════════════════════════════════

  // Get user preferences
  app.get("/api/preferences", async (c) => {
    const user = edgespark.auth.user!;
    console.log("[API] GET /api/preferences - userId:", user.id);

    const result = await edgespark.db
      .select()
      .from(tables.userPreferences)
      .where(eq(tables.userPreferences.userId, user.id));

    if (result.length === 0) {
      // Return defaults if no preferences exist
      return c.json({
        data: {
          userId: user.id,
          emojiSet: "default",
          colorPalette: "vibrant",
          visualizationIntensity: "balanced",
        },
      });
    }

    return c.json({ data: result[0] });
  });

  // Update user preferences (upsert)
  app.put("/api/preferences", async (c) => {
    const user = edgespark.auth.user!;
    const body = await c.req.json();
    console.log("[API] PUT /api/preferences - userId:", user.id, "body:", body);

    // Check if preferences exist
    const existing = await edgespark.db
      .select()
      .from(tables.userPreferences)
      .where(eq(tables.userPreferences.userId, user.id));

    if (existing.length === 0) {
      // Insert new
      const result = await edgespark.db
        .insert(tables.userPreferences)
        .values({
          userId: user.id,
          emojiSet: body.emojiSet || "default",
          colorPalette: body.colorPalette || "vibrant",
          visualizationIntensity: body.visualizationIntensity || "balanced",
        })
        .returning();

      console.log("[API] PUT /api/preferences - created for:", user.id);
      return c.json({ data: result[0] }, 201);
    }

    // Update existing
    const result = await edgespark.db
      .update(tables.userPreferences)
      .set({
        emojiSet: body.emojiSet ?? existing[0].emojiSet,
        colorPalette: body.colorPalette ?? existing[0].colorPalette,
        visualizationIntensity: body.visualizationIntensity ?? existing[0].visualizationIntensity,
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .where(eq(tables.userPreferences.userId, user.id))
      .returning();

    console.log("[API] PUT /api/preferences - updated for:", user.id);
    return c.json({ data: result[0] });
  });

  // ═══════════════════════════════════════════════════════════
  // STORAGE ENDPOINTS (Reflection Photos)
  // ═══════════════════════════════════════════════════════════

  // Get presigned upload URL for reflection photo
  app.post("/api/reflections/upload-url", async (c) => {
    const user = edgespark.auth.user!;
    const body = await c.req.json();
    const filename = body.filename || `${Date.now()}.jpg`;
    const path = `${user.id}/${filename}`;
    console.log("[API] POST /api/reflections/upload-url - path:", path);

    const { uploadUrl, expiresAt } = await edgespark.storage
      .from(buckets.reflections)
      .createPresignedPutUrl(path, 3600);

    const s3Uri = edgespark.storage.toS3Uri(buckets.reflections, path);

    return c.json({ uploadUrl, path, s3Uri, expiresAt });
  });

  // Get presigned download URL for reflection photo
  app.get("/api/reflections/download-url", async (c) => {
    const s3Uri = c.req.query("s3Uri");
    console.log("[API] GET /api/reflections/download-url - s3Uri:", s3Uri);

    if (!s3Uri) {
      return c.json({ error: "s3Uri is required" }, 400);
    }

    const { bucket, path } = edgespark.storage.fromS3Uri(s3Uri);
    const { downloadUrl, expiresAt } = await edgespark.storage
      .from(bucket)
      .createPresignedGetUrl(path, 3600);

    return c.json({ downloadUrl, expiresAt });
  });

  return app;
}
