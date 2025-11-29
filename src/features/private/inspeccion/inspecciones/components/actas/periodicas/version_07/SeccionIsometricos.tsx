import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
  isometricoBase64: string | undefined;
  esquemaPlantaBase64: string | undefined;
}

const LineInput = ({
  label,
  value,
}: {
  label: string;
  value?: number | string | null;
}) => (
  <div className="flex items-end text-[7.5pt] w-full">
    <span className="font-semibold mr-1 leading-none">{label}</span>
    <div className="flex-1 border-b border-black text-center leading-none h-[12px] truncate">
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

  // Función segura para obtener recintos
  const getRecinto = (index: number) => volumenRecintos[index];
  const RA = getRecinto(0);
  const RB = getRecinto(1);
  const RC = getRecinto(2);
  const RD = getRecinto(3);
  const RE = getRecinto(4);
  const RF = getRecinto(5);

  // Obtener todos los ADY en un array plano
  const adys = volumenRecintos.flatMap((r) =>
    [r.volumenADY1, r.volumenADY2, r.volumenADY3, r.volumenADY4].filter(
      (v) => v !== null && v !== undefined
    )
  );
  const getAdy = (idx: number) => adys[idx] ?? "";

  return (
    <div className="w-full border-l border-r border-b border-black font-arial text-black box-border">
      {/* --- ENCABEZADOS --- */}
      <div className="flex w-full border-b border-black bg-gray-200 font-bold text-[8pt] text-center">
        <div className="w-[37%] border-r border-black py-1">5. ISOMETRICO</div>
        <div className="w-[37%] border-r border-black py-1">
          6. ESQUEMA EN PLANTA
        </div>
        <div className="w-[26%] py-1">6.1 VOLUMENES DISPONIBLES EN m³ (Vd)</div>
      </div>

      {/* --- CONTENIDO --- */}
      <div className="flex w-full h-[220px]">
        <div className="w-[37%] border-r border-black flex items-center justify-center overflow-hidden">
          {isometricoBase64 ? (
            <img
              src={isometricoBase64}
              alt="Isométrico"
              className="max-w-full max-h-full"
            />
          ) : null}
        </div>
        {/* 6. ÁREA ESQUEMA (37%) */}
        <div className="w-[37%] border-r border-black flex items-center justify-center overflow-hidden">
          {esquemaPlantaBase64 ? (
            <img
              src={esquemaPlantaBase64}
              alt="Esquema"
              className="max-w-full max-h-full"
            />
          ) : null}
        </div>
        {/* 6.1 TABLA VOLÚMENES (26%) */}
        <div className="w-[26%] flex text-[8pt]">
          {/* Columna 1: RA -> ADY6 */}
          <div className="w-[34%] border-r border-black px-1 py-1 flex flex-col justify-between">
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

          {/* Columna 2: RD -> ADY12 */}
          <div className="w-[34%] border-r border-black px-1 py-1 flex flex-col justify-between">
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

          {/* Columna 3: TOTALES */}
          <div className="w-[32%] flex flex-col">
            <div className="font-bold text-center border-b border-black text-[7pt] py-1 bg-gray-50">
              TOTALES Vd
            </div>
            <div className="flex-1 px-1 py-1 flex flex-col justify-between">
              <LineInput label="RA:" value={RA?.volumenTotal} />
              <LineInput label="RB:" value={RB?.volumenTotal} />
              <LineInput label="RC:" value={RC?.volumenTotal} />
              <LineInput label="RD:" value={RD?.volumenTotal} />
              <LineInput label="RE:" value={RE?.volumenTotal} />
              <LineInput label="RF:" value={RF?.volumenTotal} />
              {/* Espaciadores vacíos para alinear visualmente con las columnas de al lado que tienen más filas */}
              <div className="h-[12px]"></div>
              <div className="h-[12px]"></div>
              <div className="h-[12px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
