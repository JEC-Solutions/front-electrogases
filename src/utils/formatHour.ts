export const formatTimeWithAmPm = (time?: string) => {
  if (!time) return "";

  // time viene como "HH:MM:SS"
  const [hh, mm] = time.split(":");
  let hour = parseInt(hh, 10);

  const suffix = hour >= 12 ? "pm" : "am";

  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;

  const hourStr = String(hour).padStart(2, "0");

  return `${hourStr}:${mm} ${suffix}`;
};
