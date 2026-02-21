import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const ParametrosEvaluacion = ({ inspeccion }: Props) => {
  const params = Array.isArray(inspeccion?.parametrosEvaluacion)
    ? inspeccion?.parametrosEvaluacion[0]
    : inspeccion?.parametrosEvaluacion;

  const borderClass = "border-black";
  const textClass = "text-[6pt] font-arial leading-tight text-black";

  const headerGray = "bg-[#f3f4f6]";

  return (
    <div
      className={`w-full border-l border-r border-b ${borderClass} ${textClass} box-border`}
    >
      <div
        className={`w-full border-b ${borderClass} ${headerGray} font-bold text-center py-[2px]`}
      >
        9. PARAMETROS DE EVALUACIÓN / RESOLUCIÓN 90 902 DE 2013/ RESOLUCIÓN
        41385 DE 2017
      </div>

      <div className="flex w-full min-h-[40px] items-stretch">
        <div
          className={`w-[12%] border-r ${borderClass} ${headerGray} flex items-center justify-center text-center p-[2px] font-bold leading-[1.1]`}
        >
          Prueba de
          <br />
          Hermeticidad
        </div>

        <div className={`w-[35%] flex flex-col border-r ${borderClass}`}>
          <div className={`w-full text-center border-b ${borderClass} p-[1px]`}>
            Con aire o gas inerte
          </div>
          <div className="flex flex-1">
            <div
              className={`flex-1 border-r ${borderClass} p-[2px] flex flex-col justify-center`}
            >
              <div className="flex justify-between items-end">
                <div className="leading-[1]">
                  lectura
                  <br />
                  Inicial
                </div>
              </div>
              <div className="text-center font-bold">
                {params?.lecturaInicialAire === null
                  ? "N/A"
                  : `${params?.lecturaInicialAire} PSI`}
              </div>
            </div>
            <div
              className={`flex-1 border-r ${borderClass} p-[2px] flex flex-col justify-center`}
            >
              <div className="flex justify-between items-end">
                <div className="leading-[1]">
                  Lectura
                  <br />
                  Final
                </div>
              </div>
              <div className="text-center font-bold">
                {params?.lecturaFinalAire === null
                  ? "N/A"
                  : `${params?.lecturaFinalAire} PSI`}
              </div>
            </div>
            <div className={`flex-1 p-[2px] flex flex-col justify-center`}>
              <div className="flex justify-between items-end">
                <div className="leading-[1]">
                  Tiempo
                  <br />
                  Prueba
                </div>
              </div>
              <div className="text-center font-bold">
                {params?.tiempoPruebaAire === null
                  ? "N/A"
                  : `${params?.tiempoPruebaAire} Min`}
              </div>
            </div>
          </div>
        </div>

        <div className={`w-[38%] flex flex-col border-r ${borderClass}`}>
          <div className={`w-full text-center border-b ${borderClass} p-[1px]`}>
            Con caudalimetro ó medidor (solo para reformas)
          </div>
          <div className="flex flex-1">
            <div
              className={`flex-1 border-r ${borderClass} p-[2px] flex flex-col justify-center`}
            >
              <div className="flex justify-between items-end">
                <div className="leading-[1]">
                  lectura
                  <br />
                  Inicial
                </div>
              </div>
              <div className="text-center font-bold">
                {params?.lecturaInicialMedidor === null
                  ? "N/A"
                  : `${params?.lecturaInicialMedidor} L`}
              </div>
            </div>
            <div
              className={`flex-1 border-r ${borderClass} p-[2px] flex flex-col justify-center`}
            >
              <div className="flex justify-between items-end">
                <div className="leading-[1]">
                  Lectura
                  <br />
                  Final
                </div>
              </div>
              <div className="text-center font-bold">
                {params?.lecturaFinalMedidor === null
                  ? "N/A"
                  : `${params?.lecturaFinalMedidor} L`}
              </div>
            </div>
            <div className={`flex-1 p-[2px] flex flex-col justify-center`}>
              <div className="flex justify-between items-end">
                <div className="leading-[1]">
                  Tiempo
                  <br />
                  Prueba
                </div>
              </div>
              <div className="text-center font-bold">
                {params?.tiempoPruebaMedidor === null
                  ? "N/A"
                  : `${params?.tiempoPruebaMedidor} Min`}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[15%] flex flex-col">
          <div className="flex-1 p-[2px] flex flex-col justify-center">
            <div className="flex items-center mb-[1px]">
              <span>Con Detector</span>
              <div className="bg-[#eee] border border-black w-[20px] h-[12px] mx-[2px] flex items-center justify-center font-bold">
                {params?.detectorFugas}
              </div>
              <span>% Vol</span>
            </div>
            <div>de Fugas</div>
          </div>
          <div
            className={`border-t ${borderClass} text-center font-bold py-[2px] w-full`}
          >
            CUMPLE
          </div>
        </div>
      </div>
    </div>
  );
};
