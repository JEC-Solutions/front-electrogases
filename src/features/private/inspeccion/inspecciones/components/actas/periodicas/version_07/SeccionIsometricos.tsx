const LineField = ({ label }: { label: string }) => (
  <div className="flex items-center justify-between gap-2 px-2 py-[6px] border-b border-black/60">
    <span className="whitespace-nowrap">{label}</span>
    <span className="flex-1 border-b border-black ml-2" />
  </div>
);

export const SeccionIsometricos = () => {
  // tamaño de celda para los fondos (px)
  const cell = 22;

  const gridBG =
    `repeating-linear-gradient(0deg, transparent 0 ${
      cell - 1
    }px, rgba(0,0,0,.22) ${cell}px),` +
    `repeating-linear-gradient(90deg, transparent 0 ${
      cell - 1
    }px, rgba(0,0,0,.22) ${cell}px)`;

  const isoBG =
    // líneas verticales / horizontales
    gridBG +
    "," +
    // diagonales ↘
    `repeating-linear-gradient(45deg, transparent 0 ${
      cell - 1
    }px, rgba(0,0,0,.18) ${cell}px)` +
    "," +
    // diagonales ↗
    `repeating-linear-gradient(135deg, transparent 0 ${
      cell - 1
    }px, rgba(0,0,0,.18) ${cell}px)`;

  return (
    <div className="mt-2 border border-black text-xs leading-tight">
      {/* Encabezados de las tres columnas */}
      <div className="grid grid-cols-[1fr_1.05fr_0.45fr]">
        <div className="border-b border-black text-center font-bold py-1 bg-gray-100">
          5. ISOMÉTRICO
        </div>
        <div className="border-l border-b border-black text-center font-bold py-1 bg-gray-100">
          6. ESQUEMA EN PLANTA
        </div>
        <div className="border-l border-b border-black text-center font-bold py-1 bg-gray-100">
          6.1 VOLÚMENES DISPONIBLES EN m³ (Vd)
        </div>
      </div>

      {/* Cuerpo */}
      <div className="grid grid-cols-[1fr_1.05fr_0.45fr]">
        {/* ISOMÉTRICO */}
        <div
          className="h-[280px] border-r border-black"
          style={{
            backgroundImage: isoBG,
            backgroundSize: `${cell}px ${cell}px, ${cell}px ${cell}px, ${cell}px ${cell}px`,
            backgroundPosition: "0 0, 0 0, 0 0",
          }}
        />

        {/* ESQUEMA EN PLANTA */}
        <div
          className="h-[280px] border-r border-black"
          style={{
            backgroundImage: gridBG,
            backgroundSize: `${cell}px ${cell}px, ${cell}px ${cell}px`,
            backgroundPosition: "0 0, 0 0",
          }}
        />

        {/* 6.1 VOLÚMENES DISPONIBLES */}
        <div className="h-[280px] grid grid-cols-[1fr_1fr_0.9fr]">
          {/* Columna izquierda: RA, ADY1..6, RB, RC */}
          <div className="border-r border-black">
            <LineField label="RA:" />
            <LineField label="ADY 1:" />
            <LineField label="ADY 2:" />
            <LineField label="RB:" />
            <LineField label="ADY 3:" />
            <LineField label="ADY 4:" />
            <LineField label="RC:" />
            <LineField label="ADY 5:" />
            <LineField label="ADY 6:" />
          </div>

          {/* Columna central: RD, ADY7..12, RE, RF */}
          <div className="border-r border-black">
            <LineField label="RD:" />
            <LineField label="ADY 7:" />
            <LineField label="ADY 8:" />
            <LineField label="RE:" />
            <LineField label="ADY 9:" />
            <LineField label="ADY 10:" />
            <LineField label="RF:" />
            <LineField label="ADY 11:" />
            <LineField label="ADY 12:" />
          </div>

          {/* Columna derecha: TOTALES Vd */}
          <div className="grid grid-rows-[auto_1fr]">
            <div className="text-center font-bold border-b border-black py-1">
              TOTALES Vd
            </div>
            <div className="px-2 py-1">
              <LineField label="RA:" />
              <LineField label="RB:" />
              <LineField label="RC:" />
              <LineField label="RD:" />
              <LineField label="RE:" />
              <LineField label="RF:" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
