export function shouldRunSchedule(local: { hour: number; minute: number; day: string }, schedule: { hour: number; minute: number }, lastRunDay: string | null) {
  if (lastRunDay === local.day) return false;
  return local.hour * 60 + local.minute >= schedule.hour * 60 + schedule.minute;
}
