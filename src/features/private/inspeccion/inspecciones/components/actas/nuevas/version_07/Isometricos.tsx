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

export const Isometricos = ({
  inspeccion,
  isometricoBase64,
  esquemaPlantaBase64,
}: Props) => {
  const volumenRecintos = inspeccion?.volumenRecintos ?? [];

  // 1. Buscamos el recinto por su NOMBRE exacto ("RA", "RB", etc.)
  const findRecinto = (nombre: string) =>
    volumenRecintos.find((r) => r.recinto === nombre);

  const RA = findRecinto("RA");
  const RB = findRecinto("RB");
  const RC = findRecinto("RC");
  const RD = findRecinto("RD");
  const RE = findRecinto("RE");
  const RF = findRecinto("RF");

  // Patrón de cuadrícula CSS simple para el fondo
  const gridPatternStyle = {
    backgroundImage:
      "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  };

  return (
    <div className="w-full border-l border-r border-b border-black font-arial text-black box-border">
      <div className="flex w-full border-b border-black bg-gray-200 font-bold text-[7pt] text-center">
        <div className="w-[38%] border-r border-black py-1">6. ISOMETRICO</div>
        <div className="w-[38%] border-r border-black py-1">
          7. ESQUEMA EN PLANTA
        </div>
        <div className="w-[24%] py-1">7.1 VOLUMENES DISPONIBLES EN m³ (Vd)</div>
      </div>

      <div className="flex w-full h-[200px]">
        {/* COLUMNA ISOMÉTRICO */}
        <div
          className="w-[38%] border-r border-black relative"
          style={!isometricoBase64 ? gridPatternStyle : {}}
        >
          {isometricoBase64 && (
            <img
              src={isometricoBase64}
              alt="Isométrico"
              className="absolute inset-0 w-full h-full object-fill"
            />
          )}
        </div>

        {/* COLUMNA ESQUEMA */}
        <div
          className="w-[38%] border-r border-black relative"
          style={!esquemaPlantaBase64 ? gridPatternStyle : {}}
        >
          {esquemaPlantaBase64 && (
            <img
              src={esquemaPlantaBase64}
              alt="Esquema"
              className="absolute inset-0 w-full h-full object-fill"
            />
          )}
        </div>

        {/* COLUMNA DATOS (RA-RF) */}
        <div className="w-[24%] flex text-[7pt]">
          {/* Sub-columna Izquierda: RA, RB, RC */}
          <div className="w-[37%] border-r border-black px-1 py-1 flex flex-col justify-between">
            {/* RA: Sus adyacentes son 1, 2, 3 */}
            <LineInput label="RA:" value={RA?.volumenRecinto} />
            <LineInput label="ADY 1:" value={RA?.volumenADY1} />
            <LineInput label="ADY 2:" value={RA?.volumenADY2} />
            <LineInput label="ADY 3:" value={RA?.volumenADY3} />

            {/* RB: Sus adyacentes visualmente son 4, 5, 6 (pero en DB son 1, 2, 3 de RB) */}
            <LineInput label="RB:" value={RB?.volumenRecinto} />
            <LineInput label="ADY 4:" value={RB?.volumenADY1} />
            <LineInput label="ADY 5:" value={RB?.volumenADY2} />
            <LineInput label="ADY 6:" value={RB?.volumenADY3} />

            {/* RC: Sus adyacentes visualmente son 7, 8, 9 */}
            <LineInput label="RC:" value={RC?.volumenRecinto} />
            <LineInput label="ADY 7:" value={RC?.volumenADY1} />
            <LineInput label="ADY 8:" value={RC?.volumenADY2} />
            <LineInput label="ADY 9:" value={RC?.volumenADY3} />
          </div>

          {/* Sub-columna Derecha: RD, RE, RF */}
          <div className="w-[37%] border-r border-black px-1 py-1 flex flex-col justify-between">
            {/* RD */}
            <LineInput label="RD:" value={RD?.volumenRecinto} />
            <LineInput label="ADY 10:" value={RD?.volumenADY1} />
            <LineInput label="ADY 11:" value={RD?.volumenADY2} />
            <LineInput label="ADY 12:" value={RD?.volumenADY3} />

            {/* RE */}
            <LineInput label="RE:" value={RE?.volumenRecinto} />
            <LineInput label="ADY 13:" value={RE?.volumenADY1} />
            <LineInput label="ADY 14:" value={RE?.volumenADY2} />
            <LineInput label="ADY 15:" value={RE?.volumenADY3} />

            {/* RF */}
            <LineInput label="RF:" value={RF?.volumenRecinto} />
            <LineInput label="ADY 16:" value={RF?.volumenADY1} />
            <LineInput label="ADY 17:" value={RF?.volumenADY2} />
            <LineInput label="ADY 18:" value={RF?.volumenADY3} />
          </div>

          {/* Sub-columna Totales */}
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
