import { createEdgeSpark } from '@edgespark/client';
import '@edgespark/client/styles.css';

// Worker URL from deployment
const WORKER_URL = 'https://staging--21pgo2ifnspfwi3ospds.youbase.cloud';

export const client = createEdgeSpark({ baseUrl: WORKER_URL });

// Types for API responses
export interface Task {
  id: number;
  userId: string;
  title: string;
  description: string | null;
  status: 'backlog' | 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  dueDate: string | null;
  dueTime: string | null;
  anticipatedMood: 'energized' | 'calm' | 'tense' | 'drained' | 'curious' | null;
  completedMood: 'proud' | 'relieved' | 'satisfied' | 'meh' | 'exhausted' | null;
  reflectionNote: string | null;
  reflectionPhotoS3Uri: string | null;
  orderIndex: number;
  completedAt: number | null;
  createdAt: number;
  updatedAt: number;
}

export interface UserPreferences {
  userId: string;
  emojiSet: string;
  colorPalette: string;
  visualizationIntensity: string;
}

// Task API functions
export const tasksApi = {
  async getAll(): Promise<Task[]> {
    const res = await client.api.fetch('/api/tasks');
    const data = await res.json();
    return data.data || [];
  },

  async create(task: Partial<Task>): Promise<Task> {
    const res = await client.api.fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    return data.data;
  },

  async update(id: number, updates: Partial<Task>): Promise<Task> {
    const res = await client.api.fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await client.api.fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  },

  async reorder(items: { id: number; orderIndex: number }[]): Promise<void> {
    await client.api.fetch('/api/tasks/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
  },
};

// Preferences API functions
export const preferencesApi = {
  async get(): Promise<UserPreferences> {
    const res = await client.api.fetch('/api/preferences');
    const data = await res.json();
    return data.data;
  },

  async update(prefs: Partial<UserPreferences>): Promise<UserPreferences> {
    const res = await client.api.fetch('/api/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prefs),
    });
    const data = await res.json();
    return data.data;
  },
};

// Storage API functions
export const storageApi = {
  async getUploadUrl(filename: string): Promise<{ uploadUrl: string; path: string; s3Uri: string }> {
    const res = await client.api.fetch('/api/reflections/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename }),
    });
    return res.json();
  },

  async getDownloadUrl(s3Uri: string): Promise<{ downloadUrl: string }> {
    const res = await client.api.fetch(`/api/reflections/download-url?s3Uri=${encodeURIComponent(s3Uri)}`);
    return res.json();
  },

  async uploadFile(file: File): Promise<string> {
    const { uploadUrl, s3Uri } = await this.getUploadUrl(file.name);
    await fetch(uploadUrl, { method: 'PUT', body: file });
    return s3Uri;
  },
};
