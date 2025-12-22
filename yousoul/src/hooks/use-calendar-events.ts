import { useMemo } from 'react';
import type { Task } from '../api/client';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  calendarId: string;
  // YouSoul additions
  anticipatedMood?: string;
  status?: string;
  priority?: string;
}

function addHour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const newHours = (hours + 1) % 24;
  return `${String(newHours).padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function useCalendarEvents(tasks: Task[]): CalendarEvent[] {
  return useMemo(() => 
    tasks
      .filter(t => t.dueDate)
      .map(task => ({
        id: String(task.id),
        title: task.title,
        start: task.dueTime 
          ? `${task.dueDate} ${task.dueTime}` 
          : task.dueDate!,
        end: task.dueTime 
          ? `${task.dueDate} ${addHour(task.dueTime)}` 
          : task.dueDate!,
        calendarId: task.anticipatedMood || 'default',
        anticipatedMood: task.anticipatedMood || undefined,
        status: task.status,
        priority: task.priority,
      })), 
    [tasks]
  );
}

// Helper to check if string has time component
export function hasTimeComponent(dateStr: string): boolean {
  return (dateStr.includes(' ') && dateStr.includes(':')) || 
         (dateStr.includes('T') && dateStr.includes(':'));
}
