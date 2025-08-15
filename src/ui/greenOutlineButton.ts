// src/ui/outlineButtonProps.ts
import type React from "react";

/**
 * Crea props para un botón AntD "outline" con fondo blanco,
 * borde y texto del color indicado, y hover consistente.
 */
export const getOutlineButtonProps = (
  baseColor: string,
  hoverColor: string,
  hoverBg = "#f5f5f5"
) => {
  const BASE: React.CSSProperties = {
    backgroundColor: "#fff",
    borderColor: baseColor,
    color: baseColor,
  };

  const onEnter: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.style.borderColor = hoverColor;
    e.currentTarget.style.color = hoverColor;
    e.currentTarget.style.backgroundColor = hoverBg;
  };

  const onLeave: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.style.backgroundColor = "#fff";
    e.currentTarget.style.borderColor = baseColor;
    e.currentTarget.style.color = baseColor;
  };

  return {
    type: "default" as const,
    style: BASE,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
  };
};

// Helpers listos (verde y rojo)
export const getGreenOutlineButtonProps = () =>
  getOutlineButtonProps("#16a34a", "#15803d", "#f6ffed");

export const getRedOutlineButtonProps = () =>
  getOutlineButtonProps("#dc2626", "#b91c1c", "#fff1f0");
