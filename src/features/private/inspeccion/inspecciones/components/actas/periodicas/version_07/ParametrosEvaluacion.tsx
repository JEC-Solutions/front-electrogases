import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

const formatSecondsToTime = (value: string | number | undefined) => {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value === "string" && value.includes(":")) return value;
  const totalSeconds = Number(value);
  if (isNaN(totalSeconds)) return value;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const ParametrosEvaluacion = ({ inspeccion }: Props) => {
  const params = Array.isArray(inspeccion?.parametrosEvaluacion)
    ? inspeccion?.parametrosEvaluacion[0]
    : inspeccion?.parametrosEvaluacion;

  const borderClass = "border-black";
  const textClass = "text-[7.5pt] font-arial leading-tight text-black";
  const cellPadding = "p-[2px]";

  return (
    <div
      className={`w-full border-l border-r border-b ${borderClass} ${textClass} box-border`}
    >
      <div className="w-full border-b border-black bg-gray-200 font-bold text-center py-[2px]">
        8. PARAMETROS DE EVALUACIÓN / RESOLUCIÓN 90 902 DE 2013/ RESOLUCIÓN
        41385 DE 2017
      </div>

      <div className="flex w-full h-[45px]">
        <div
          className={`w-[9%] border-r ${borderClass} flex items-center justify-center text-center`}
        >
          Prueba de
          <br />
          Hermeticidad
        </div>

        <div
          className={`w-[11%] border-r ${borderClass} flex items-center justify-center text-center`}
        >
          Con caudalimetro
          <br />o medidor
        </div>

        {/* Lectura Inicial m3 */}
        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col items-center text-center ${cellPadding}`}
        >
          <span className="font-bold">Lectura Inicio</span>
          <div className="mt-auto font-semibold flex items-baseline gap-0.5">
            {params?.lecturaInicialMedidor}{" "}
            <span>
              m<sup>3</sup>
            </span>
          </div>
        </div>

        {/* Lectura Final m3 */}
        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col items-center text-center ${cellPadding}`}
        >
          <span className="font-bold">Lectura Final</span>
          <div className="mt-auto font-semibold flex items-baseline gap-0.5">
            {params?.lecturaFinalMedidor}{" "}
            <span>
              m<sup>3</sup>
            </span>
          </div>
        </div>

        {/* Lectura Inicial L */}
        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col items-center text-center ${cellPadding}`}
        >
          <span className="font-bold">Lectura Inicio</span>
          <div className="mt-auto font-semibold flex items-baseline gap-0.5">
            {params?.lecturaInicialAire} <span>L</span>
          </div>
        </div>

        {/* Lectura Final L */}
        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col items-center text-center ${cellPadding}`}
        >
          <span className="font-bold">Lectura Final</span>
          <div className="mt-auto font-semibold flex items-baseline gap-0.5">
            {params?.lecturaFinalAire} <span>L</span>
          </div>
        </div>

        {/* Tiempo de la prueba */}
        <div
          className={`w-[13%] border-r ${borderClass} flex flex-col items-center text-center ${cellPadding}`}
        >
          <span className="font-bold">Tiempo prueba</span>
          <div className="mt-auto bg-white border border-gray-400 w-full h-[14px] flex items-center justify-center font-semibold gap-0.5">
            {formatSecondsToTime(params?.tiempoPruebaAire)}{" "}
            <span className="text-[6.5pt]">min</span>
          </div>
        </div>

        {/* Prueba Presión */}
        <div
          className={`w-[13%] border-r ${borderClass} flex flex-col items-center text-center ${cellPadding}`}
        >
          <span className="font-bold">Prueba Presión</span>
          <div className="mt-auto bg-white border border-gray-400 w-full h-[14px] flex items-center justify-center font-semibold">
            {params?.pruebaPresion === null ? "N/A" : params?.pruebaPresion}
          </div>
        </div>

        {/* Detector de Fugas */}
        <div className="flex-1 flex flex-col items-center text-center p-[2px]">
          <span className="font-bold leading-none">Detector fugas</span>
          <div className="mt-auto bg-gray-200 border border-gray-400 w-full h-[14px] flex items-center justify-center font-semibold gap-0.5">
            {params?.detectorFugas} <span className="text-[6.5pt]">%Vol</span>
          </div>
        </div>
      </div>
    </div>
  );
};
