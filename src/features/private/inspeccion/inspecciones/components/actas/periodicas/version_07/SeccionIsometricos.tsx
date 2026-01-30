import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
  isometricoBase64: string | undefined;
  esquemaPlantaBase64: string | undefined;
}

const LineInput = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value?: number | string | null;
  className?: string;
}) => (
  <div className={`flex items-end text-[7pt] w-full ${className}`}>
    <span className="font-bold mr-1 leading-none whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 border-b border-black text-center leading-none h-[11px] truncate">
      {value ?? ""}
    </div>
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
      (v) => v !== null && v !== undefined,
    ),
  );
  const getAdy = (idx: number) => adys[idx] ?? "";

  // Patrón de cuadrícula CSS simple para el fondo
  const gridPatternStyle = {
    backgroundImage:
      "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  };

  return (
    <div className="w-full border-l border-r border-b border-black font-arial text-black box-border">
      <div className="flex w-full border-b border-black bg-gray-200 font-bold text-[7pt] text-center">
        <div className="w-[38%] border-r border-black py-1">5. ISOMETRICO</div>
        <div className="w-[38%] border-r border-black py-1">
          6. ESQUEMA EN PLANTA
        </div>
        <div className="w-[24%] py-1">6.1 VOLUMENES DISPONIBLES EN m³ (Vd)</div>
      </div>

      <div className="flex w-full h-[200px]">
        <div
          className="w-[38%] border-r border-black relative"
          style={!isometricoBase64 ? gridPatternStyle : {}}
        >
          {isometricoBase64 && (
            <img
              src={isometricoBase64}
              alt="Isométrico"
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          )}
        </div>

        <div
          className="w-[38%] border-r border-black relative"
          style={!esquemaPlantaBase64 ? gridPatternStyle : {}}
        >
          {esquemaPlantaBase64 && (
            <img
              src={esquemaPlantaBase64}
              alt="Esquema"
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          )}
        </div>

        <div className="w-[24%] flex text-[7pt]">
          <div className="w-[37%] border-r border-black px-1 py-1 flex flex-col justify-between">
            <LineInput label="RA:" value={RA?.volumenRecinto} />
            <LineInput label="ADY 1:" value={getAdy(0)} />
            <LineInput label="ADY 2:" value={getAdy(1)} />
            <LineInput label="RB:" value={RB?.volumenRecinto} />
            <LineInput label="ADY 3:" value={getAdy(2)} />
            <LineInput label="ADY 4:" value={getAdy(3)} />
            <LineInput label="RC:" value={RC?.volumenRecinto} />
            <LineInput label="ADY 5:" value={getAdy(4)} />
            <LineInput label="ADY 6:" value={getAdy(5)} />
          </div>

          <div className="w-[37%] border-r border-black px-1 py-1 flex flex-col justify-between">
            <LineInput label="RD:" value={RD?.volumenRecinto} />
            <LineInput label="ADY 7:" value={getAdy(6)} />
            <LineInput label="ADY 8:" value={getAdy(7)} />
            <LineInput label="RE:" value={RE?.volumenRecinto} />
            <LineInput label="ADY 9:" value={getAdy(8)} />
            <LineInput label="ADY 10:" value={getAdy(9)} />
            <LineInput label="RF:" value={RF?.volumenRecinto} />
            <LineInput label="ADY 11:" value={getAdy(10)} />
            <LineInput label="ADY 12:" value={getAdy(11)} />
          </div>

          <div className="w-[26%] flex flex-col">
            <div className="font-bold text-center border-b border-black text-[6.5pt] py-1 leading-none">
              TOTALES Vd
            </div>
            <div className="flex-1 px-1 py-1 flex flex-col justify-between">
              <LineInput
                label="RA:"
                value={RA?.volumenTotal}
                className="mb-1"
              />
              <LineInput
                label="RB:"
                value={RB?.volumenTotal}
                className="mb-1"
              />
              <LineInput
                label="RC:"
                value={RC?.volumenTotal}
                className="mb-1"
              />
              <LineInput
                label="RD:"
                value={RD?.volumenTotal}
                className="mb-1"
              />
              <LineInput
                label="RE:"
                value={RE?.volumenTotal}
                className="mb-1"
              />
              <LineInput label="RF:" value={RF?.volumenTotal} />
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
