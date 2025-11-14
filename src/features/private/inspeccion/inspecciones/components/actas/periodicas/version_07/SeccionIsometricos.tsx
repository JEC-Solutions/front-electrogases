import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
  isometricoBase64: string | undefined;
  esquemaPlantaBase64: string | undefined;
}

const LineField = ({
  label,
  value,
}: {
  label: string;
  value?: number | string | null;
}) => (
  <div className="flex items-center gap-2 px-2 py-[6px] border-b border-black/60">
    <span className="whitespace-nowrap">{label}</span>
    <span className="flex-1 ml-2 border-b border-black flex justify-end pr-1">
      {value !== undefined && value !== null && value !== "" && (
        <span className="leading-none tabular-nums">{value}</span>
      )}
    </span>
  </div>
);

export const SeccionIsometricos = ({
  inspeccion,
  isometricoBase64,
  esquemaPlantaBase64,
}: Props) => {
  const volumenRecintos = inspeccion?.volumenRecintos ?? [];

  const getRecinto = (index: number) => volumenRecintos[index];

  const RA = getRecinto(0);
  const RB = getRecinto(1);
  const RC = getRecinto(2);
  const RD = getRecinto(3);
  const RE = getRecinto(4);
  const RF = getRecinto(5);

  const adys = volumenRecintos.flatMap((r) =>
    [r.volumenADY1, r.volumenADY2, r.volumenADY3, r.volumenADY4].filter(
      (v): v is number => v !== null && v !== undefined
    )
  );

  const getAdy = (idx: number) => adys[idx] ?? "";

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
          className="h-[280px] border-r border-black flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: isoBG,
            backgroundSize: `${cell}px ${cell}px, ${cell}px ${cell}px, ${cell}px ${cell}px, ${cell}px ${cell}px`,
            backgroundPosition: "0 0, 0 0, 0 0, 0 0",
          }}
        >
          {isometricoBase64 && (
            <img
              src={isometricoBase64}
              alt="Isométrico"
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* ESQUEMA EN PLANTA */}
        <div
          className="h-[280px] border-r border-black flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: gridBG,
            backgroundSize: `${cell}px ${cell}px, ${cell}px ${cell}px`,
            backgroundPosition: "0 0, 0 0",
          }}
        >
          {esquemaPlantaBase64 && (
            <img
              src={esquemaPlantaBase64}
              alt="Esquema en planta"
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* 6.1 VOLÚMENES DISPONIBLES */}
        <div className="h-[280px] grid grid-cols-[1fr_1fr_0.9fr]">
          {/* Columna izquierda: RA, ADY1..6, RB, RC */}
          <div className="border-r border-black">
            <LineField label="RA:" value={RA?.volumenRecinto} />
            <LineField label="ADY 1:" value={getAdy(0)} />
            <LineField label="ADY 2:" value={getAdy(1)} />
            <LineField label="RB:" value={RB?.volumenRecinto} />
            <LineField label="ADY 3:" value={getAdy(2)} />
            <LineField label="ADY 4:" value={getAdy(3)} />
            <LineField label="RC:" value={RC?.volumenRecinto} />
            <LineField label="ADY 5:" value={getAdy(4)} />
            <LineField label="ADY 6:" value={getAdy(5)} />
          </div>

          {/* Columna central: RD, ADY7..12, RE, RF */}
          <div className="border-r border-black">
            <LineField label="RD:" value={RD?.volumenRecinto} />
            <LineField label="ADY 7:" value={getAdy(6)} />
            <LineField label="ADY 8:" value={getAdy(7)} />
            <LineField label="RE:" value={RE?.volumenRecinto} />
            <LineField label="ADY 9:" value={getAdy(8)} />
            <LineField label="ADY 10:" value={getAdy(9)} />
            <LineField label="RF:" value={RF?.volumenRecinto} />
            <LineField label="ADY 11:" value={getAdy(10)} />
            <LineField label="ADY 12:" value={getAdy(11)} />
          </div>

          {/* Columna derecha: TOTALES Vd */}
          <div className="grid grid-rows-[auto_1fr]">
            <div className="text-center font-bold border-b border-black py-1">
              TOTALES Vd
            </div>
            <div className="px-2 py-1">
              <LineField label="RA:" value={RA?.volumenTotal} />
              <LineField label="RB:" value={RB?.volumenTotal} />
              <LineField label="RC:" value={RC?.volumenTotal} />
              <LineField label="RD:" value={RD?.volumenTotal} />
              <LineField label="RE:" value={RE?.volumenTotal} />
              <LineField label="RF:" value={RF?.volumenTotal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
