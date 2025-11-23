export function base64ToBlob(base64: string, mime = "application/pdf") {
  if (!base64) {
    console.error("El string base64 está vacío");
    return new Blob([], { type: mime });
  }

  try {
    const cleanString = base64.replace(/\s/g, "");
    const byteChars = atob(cleanString);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  } catch (e) {
    console.error("Error al convertir base64 a Blob:", e);
    return new Blob([], { type: mime });
  }
}

export function downloadBase64(
  base64: string,
  filename = "archivo.pdf",
  mime?: string
) {
  const blob = base64ToBlob(base64, mime);
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";

  document.body.appendChild(a);

  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
