export function formatErrors(errors: Record<string, string> = {}) {
  const items = Object.entries(errors).map(
    ([field, msg]) => `<li><b>${field}</b>: ${msg}</li>`
  );
  return `<ul style="text-align:left;margin:0 12px;">${items.join("")}</ul>`;
}
