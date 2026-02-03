import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

// CORRECCIÓN: Función para convertir SEGUNDOS a mm:ss
const formatSecondsToTime = (value: string | number | undefined) => {
  if (value === undefined || value === null || value === "") return "";

  // Si ya viene formateado con dos puntos, lo devolvemos tal cual
  if (typeof value === "string" && value.includes(":")) return value;

  const totalSeconds = Number(value);
  if (isNaN(totalSeconds)) return value;

  // Calculamos minutos y segundos
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Formateamos con ceros a la izquierda
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const ParametrosEvaluacion = ({ inspeccion }: Props) => {
  const params = Array.isArray(inspeccion?.parametrosEvaluacion)
    ? inspeccion?.parametrosEvaluacion[0]
    : inspeccion?.parametrosEvaluacion;

  const borderClass = "border-black";
  const textClass = "text-[7.5pt] font-arial leading-tight text-black";
  const cellPadding = "px-[2px]";

  return (
    <div
      className={`w-full border-l border-r border-b ${borderClass} ${textClass} box-border`}
    >
      <div className="w-full border-b border-black bg-gray-200 font-bold text-center py-[2px]">
        8. PARAMETROS DE EVALUACIÓN / RESOLUCIÓN 90 902 DE 2013/ RESOLUCIÓN
        41385 DE 2017
      </div>

      <div className="flex w-full h-[35px]">
        {/* ... (Las primeras columnas se mantienen igual) ... */}
        
        <div
          className={`w-[9%] border-r ${borderClass} bg-gray-100 flex items-center justify-center text-center p-[1px]`}
        >
          Prueba de
          <br />
          Hermeticidad
        </div>

        <div
          className={`w-[11%] border-r ${borderClass} bg-gray-100 flex items-center justify-center text-center p-[1px]`}
        >
          Con caudalimetro
          <br />o medidor
        </div>

        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col justify-between ${cellPadding}`}
        >
          <div className="flex justify-between w-full">
            <span>Lectura</span>
            <span className="font-bold">m3</span>
          </div>
          <div className="flex justify-between w-full items-end mb-[1px]">
            <span>Inicio</span>
            <span className="font-semibold text-right flex-1 truncate ml-1">
              {params?.lecturaInicialMedidor}
            </span>
          </div>
        </div>

        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col justify-between ${cellPadding}`}
        >
          <div className="flex justify-between w-full">
            <span>Lectura</span>
            <span className="font-bold">m3</span>
          </div>
          <div className="flex justify-between w-full items-end mb-[1px]">
            <span>Final</span>
            <span className="font-semibold text-right flex-1 truncate ml-1">
              {params?.lecturaFinalMedidor}
            </span>
          </div>
        </div>

        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col justify-between ${cellPadding}`}
        >
          <div className="flex justify-between w-full">
            <span>Lectura</span>
            <span className="font-bold">L</span>
          </div>
          <div className="flex justify-between w-full items-end mb-[1px]">
            <span>Inicio</span>
            <span className="font-semibold text-right flex-1 truncate ml-1">
              {params?.lecturaInicialAire}
            </span>
          </div>
        </div>

        <div
          className={`w-[10%] border-r ${borderClass} flex flex-col justify-between ${cellPadding}`}
        >
          <div className="flex justify-between w-full">
            <span>Lectura</span>
            <span className="font-bold">L</span>
          </div>
          <div className="flex justify-between w-full items-end mb-[1px]">
            <span>Final</span>
            <span className="font-semibold text-right flex-1 truncate ml-1">
              {params?.lecturaFinalAire}
            </span>
          </div>
        </div>

        <div
          className={`w-[13%] border-r ${borderClass} bg-gray-100 flex flex-col justify-between ${cellPadding}`}
        >
          <div className="flex justify-between w-full">
            <span>Tiempo de</span>
            <span className="font-bold">min</span>
          </div>
          <div className="flex justify-between w-full items-end mb-[2px]">
            <span>la prueba</span>

            {/* AQUI USAMOS LA NUEVA FUNCIÓN */}
            <div className="bg-white border border-gray-400 w-[50%] h-[14px] text-center leading-none font-semibold truncate">
              {formatSecondsToTime(params?.tiempoPruebaAire)}
            </div>
          </div>
        </div>

        <div
          className={`w-[13%] border-r ${borderClass} bg-gray-100 flex flex-col justify-between ${cellPadding}`}
        >
          <div className="mt-[1px]">Prueba</div>
          <div className="flex justify-between w-full items-end mb-[2px]">
            <span>Presión</span>
            <div className="bg-white border border-gray-400 w-[60%] h-[14px] text-center leading-none font-semibold truncate">
              {params?.pruebaPresion}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between px-1 py-[1px]">
          <div className="flex justify-between items-start w-full">
            <span className="text-right w-[65%] leading-none mr-1">
              Con detector
              <br />
              de fugas
            </span>

            <div className="bg-gray-200 border border-gray-400 w-[35%] h-[14px] text-center leading-none font-semibold truncate mt-[2px]">
              {params?.detectorFugas}
            </div>
          </div>
          <div className="text-right font-bold leading-none">%Vol</div>
        </div>
      </div>
    </div>
  );
};