// Temporal API polyfill - MUST be imported before Schedule-X
import "temporal-polyfill/global";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { viewWeek, viewDay, viewMonthGrid } from "@schedule-x/calendar";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createResizePlugin } from "@schedule-x/resize";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import "../styles/schedule-x-theme.css";
import { useTasksStore } from "../store/tasksStore";
import { useCapture } from "../contexts/capture-context";
import { Task } from "../api/client";
import { MOOD_CONFIG, AnticipatedMood } from "../types/task";

type ViewMode = "day" | "week" | "month";

interface ScheduleCalendarProps {
  view?: ViewMode;
  selectedDate?: Date;
}

const viewNameMap = {
  day: viewDay.name,
  week: viewWeek.name,
  month: viewMonthGrid.name,
};

// Helper to check if string has time component
function hasTimeComponent(dateStr: string): boolean {
  return (dateStr.includes(' ') && dateStr.includes(':')) || 
         (dateStr.includes('T') && dateStr.includes(':'));
}

// Helper to add an hour to time string
function addHour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const newHours = (hours + 1) % 24;
  return `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Convert string to Temporal.PlainDate or ZonedDateTime
function toTemporalDateTime(dateStr: string): Temporal.PlainDate | Temporal.ZonedDateTime {
  const hasTime = hasTimeComponent(dateStr);
  
  if (hasTime) {
    const normalized = dateStr.replace(' ', 'T');
    const [datePart, timePart] = normalized.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    const pdt = new Temporal.PlainDateTime(year, month, day, hour, minute);
    return pdt.toZonedDateTime('UTC');
  }
  
  const [year, month, day] = dateStr.split('T')[0].split('-').map(Number);
  return new Temporal.PlainDate(year, month, day);
}

// Format Temporal date/datetime back to string
function formatDateTime(dt: unknown): string {
  if (dt && typeof dt === 'object' && 'hour' in dt && 'minute' in dt) {
    const zdt = dt as Temporal.ZonedDateTime;
    const date = zdt.toPlainDate().toString();
    const time = `${String(zdt.hour).padStart(2, '0')}:${String(zdt.minute).padStart(2, '0')}`;
    return `${date} ${time}`;
  }
  
  if (dt && typeof dt === 'object' && 'toString' in dt) {
    return String(dt).split('T')[0].split('[')[0];
  }
  
  return String(dt);
}

export default function ScheduleCalendar({ view = "week", selectedDate }: ScheduleCalendarProps) {
  const [isClient, setIsClient] = useState(false);
  const { tasks, updateTask } = useTasksStore();
  const { openCapture } = useCapture();
  
  const calendarControlsPlugin = useMemo(() => createCalendarControlsPlugin(), []);
  const eventsServicePlugin = useMemo(() => createEventsServicePlugin(), []);

  // Transform tasks to Schedule-X events
  const scheduleEvents = useMemo(() => {
    return tasks
      .filter(t => t.dueDate)
      .map((task) => {
        const start = task.dueTime 
          ? `${task.dueDate} ${task.dueTime}` 
          : task.dueDate!;
        const end = task.dueTime 
          ? `${task.dueDate} ${addHour(task.dueTime)}` 
          : task.dueDate!;
        
        return {
          id: String(task.id),
          title: task.title,
          start: toTemporalDateTime(start),
          end: toTemporalDateTime(end),
          calendarId: task.anticipatedMood || "default",
        };
      });
  }, [tasks]);

  // Handle event click - open capture modal for editing
  const handleEventClick = useCallback((calendarEvent: { id: string | number }) => {
    const task = tasks.find(t => String(t.id) === String(calendarEvent.id));
    if (task) {
      openCapture(task);
    }
  }, [tasks, openCapture]);

  // Handle event update (drag/resize)
  const handleEventUpdate = useCallback(async (updatedEvent: { id: string | number; start: unknown; end: unknown }) => {
    const task = tasks.find(t => String(t.id) === String(updatedEvent.id));
    if (!task) return;

    const startStr = formatDateTime(updatedEvent.start);
    const endStr = formatDateTime(updatedEvent.end);
    const hasTime = hasTimeComponent(startStr);

    // Extract date and time parts
    const [datePart, timePart] = startStr.split(' ');
    
    await updateTask(task.id, {
      dueDate: datePart,
      dueTime: hasTime ? timePart : null,
    });
  }, [tasks, updateTask]);

  // Create mood-based calendar configs
  const moodCalendars = useMemo(() => {
    const calendars: Record<string, { colorName: string; lightColors: { main: string; container: string; onContainer: string }; darkColors: { main: string; container: string; onContainer: string } }> = {
      default: {
        colorName: "default",
        lightColors: { main: "#F97316", container: "rgba(249, 115, 22, 0.15)", onContainer: "#0a0a0f" },
        darkColors: { main: "#F97316", container: "rgba(249, 115, 22, 0.15)", onContainer: "#ffffff" },
      },
    };

    // Add mood-based calendars
    const moods: AnticipatedMood[] = ['energized', 'calm', 'tense', 'drained', 'curious'];
    moods.forEach(mood => {
      const config = MOOD_CONFIG[mood];
      calendars[mood] = {
        colorName: mood,
        lightColors: { main: config.color, container: `${config.color}26`, onContainer: "#0a0a0f" },
        darkColors: { main: config.color, container: `${config.color}26`, onContainer: "#ffffff" },
      };
    });

    return calendars;
  }, []);

  const calendar = useCalendarApp({
    defaultView: viewNameMap[view],
    views: [viewDay, viewWeek, viewMonthGrid],
    events: scheduleEvents,
    plugins: [
      eventsServicePlugin,
      createDragAndDropPlugin(),
      createResizePlugin(),
      calendarControlsPlugin,
    ],
    calendars: moodCalendars,
    isDark: true,
    weekOptions: {
      gridHeight: 1200,
      nDays: 7,
      eventWidth: 95,
    },
    dayBoundaries: {
      start: '06:00',
      end: '22:00',
    },
    monthGridOptions: {
      nEventsPerDay: 4,
    },
    callbacks: {
      onEventClick: handleEventClick,
      onEventUpdate: handleEventUpdate,
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Change view when prop changes
  useEffect(() => {
    if (!isClient) return;
    
    const targetView = viewNameMap[view];
    const timer = setTimeout(() => {
      if (calendarControlsPlugin?.setView) {
        calendarControlsPlugin.setView(targetView);
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [view, isClient, calendarControlsPlugin]);

  // Navigate to selected date
  useEffect(() => {
    if (!isClient || !selectedDate) return;
    
    const timer = setTimeout(() => {
      if (calendarControlsPlugin?.setDate) {
        const plainDate = new Temporal.PlainDate(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          selectedDate.getDate()
        );
        calendarControlsPlugin.setDate(plainDate);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [selectedDate, isClient, calendarControlsPlugin]);

  // Sync events to Schedule-X
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const calendarAny = calendar as any;
    if (isClient && calendarAny?.eventsService && scheduleEvents.length > 0) {
      calendarAny.eventsService.set(scheduleEvents);
    }
  }, [calendar, scheduleEvents, isClient]);

  if (!isClient) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10">
        <div className="text-white/50">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 relative rounded-2xl border border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl -z-10" />
      <div className="schedule-calendar-wrapper flex-1 min-h-0 overflow-auto">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
}
