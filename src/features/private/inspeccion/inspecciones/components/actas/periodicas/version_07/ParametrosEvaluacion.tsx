import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const ParametrosEvaluacion = ({ inspeccion }: Props) => {
  const parametros = inspeccion?.parametrosEvaluacion[0];

  return (
    <div className="w-full font-arial text-black border-l border-r border-black box-border text-[7.5pt]">
      <div className="w-full border-b bg-gray-200 font-bold text-center py-1">
        8. PARAMETROS DE EVALUACIÓN / RESOLUCIÓN 90 902 DE 2013/ RESOLUCIÓN
        41385 DE 2017
      </div>

      <div className="flex w-full h-[32px]">
        <div className="w-[8%] border-r border-black flex items-center justify-center text-center p-1 leading-none font-semibold bg-gray-100">
          Prueba de
          <br />
          Hermeticidad
        </div>

        <div className="w-[10%] border-r border-black flex items-center justify-center text-center p-1 leading-none font-semibold bg-gray-100">
          Con caudalimetro
          <br />o medidor
        </div>

        <div className="w-[9%] border-r border-black flex flex-col justify-between px-1">
          <div className="flex justify-between items-start">
            <span>Lectura</span>
            <span className="font-bold">m3</span>
          </div>
          <div className="flex justify-between items-end">
            <span>Inicio</span>
            <span className="font-semibold">
              {parametros?.lecturaInicialAire}
            </span>
          </div>
        </div>

        <div className="w-[9%] border-r border-black flex flex-col justify-between px-1">
          <div className="flex justify-between items-start">
            <span>Lectura</span>
            <span className="font-bold">m3</span>
          </div>
          <div className="flex justify-between items-end">
            <span>Final</span>
            <span className="font-semibold">
              {parametros?.lecturaFinalAire}
            </span>
          </div>
        </div>

        <div className="w-[9%] border-r border-black flex flex-col justify-between px-1">
          <div className="flex justify-between items-start">
            <span>Lectura</span>
            <span className="font-bold">L</span>
          </div>
          <div className="flex justify-between items-end">
            <span>Inicio</span>
            <span className="font-semibold">
              {parametros?.lecturaInicialMedidor}
            </span>
          </div>
        </div>

        <div className="w-[9%] border-r border-black flex flex-col justify-between px-1">
          <div className="flex justify-between items-start">
            <span>Lectura</span>
            <span className="font-bold">L</span>
          </div>
          <div className="flex justify-between items-end">
            <span>Final</span>
            <span className="font-semibold">
              {parametros?.lecturaFinalMedidor}
            </span>
          </div>
        </div>

        <div className="w-[9%] border-r border-black flex flex-col justify-between px-1 bg-gray-100">
          <div className="flex justify-between items-start">
            <span>Tiempo de</span>
            <span className="font-bold">min</span>
          </div>
          <div className="flex justify-between items-end">
            <span>la prueba</span>
            <span className="font-semibold bg-white px-1 border border-gray-400">
              {parametros?.tiempoPruebaAire}
            </span>
          </div>
        </div>

        <div className="w-[17%] border-r border-black flex flex-col justify-between px-1 bg-gray-100">
          <div className="mt-0.5">Prueba</div>
          <div className="flex justify-between items-end mb-0.5">
            <span>Presión</span>
            <div className="bg-white border border-gray-400 w-[60%] h-[14px] px-1 text-right font-semibold">
              {parametros?.pruebaPresion}
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-[60%] h-full flex flex-col justify-center px-1 leading-none font-semibold border-r border-black text-right">
            Con detector
            <br />
            de fugas
          </div>
          <div className="flex-1 h-full flex flex-col justify-between px-1">
            <div className="text-right font-bold">%Vol</div>
            <div className="bg-gray-100 border border-gray-400 h-[14px] w-full text-center font-semibold">
              {parametros?.detectorFugas}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
