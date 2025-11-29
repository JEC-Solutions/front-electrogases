import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

function Box({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[12px] h-[12px] border border-black bg-white">
      {checked ? (
        <span className="-mt-[2px] text-[10px] leading-none font-bold">✓</span>
      ) : null}
    </span>
  );
}

export const TrazabilidadMatriz = ({ inspeccion }: Props) => {
  const lineaMatriz = !!inspeccion?.lineaMatriz;

  return (
    <div className="w-full border-l border-r border-b border-black text-[8pt] font-arial text-black box-border">
      <div className="flex w-full h-[40px]">
        <div className="w-[22%] border-r border-black flex items-center justify-center p-2 bg-gray-200 text-center font-bold">
          3.3. TRAZABILIDAD DE LA LÍNEA MATRIZ
        </div>
        <div className="w-[12%] border-r border-black flex flex-col">
          <div className="h-[20px] border-b border-black flex items-center justify-center text-center font-semibold bg-gray-50">
            Existe Linea Matríz
          </div>
          <div className="flex-1 flex items-center justify-around px-1">
            <div className="flex items-center gap-1">
              <span>SI</span> <Box checked={lineaMatriz} />
            </div>
            <div className="flex items-center gap-1">
              <span>NO</span> <Box checked={!lineaMatriz} />
            </div>
          </div>
        </div>
        <div className="w-[10%] border-r border-black flex flex-col">
          <div className="flex-1 border-b border-black flex items-center justify-between px-2">
            <span>A la vista</span> <Box />
          </div>
          <div className="flex-1 flex items-center justify-between px-2">
            <span>Oculta</span> <Box />
          </div>
        </div>
        <div className="w-[18%] border-r border-black flex flex-col">
          <div className="h-[20px] border-b border-black flex items-center justify-center text-center font-semibold bg-gray-50">
            Organismo que certificó:
          </div>
          <div className="flex-1 flex items-center justify-center"></div>
        </div>
        <div className="w-[12%] border-r border-black flex flex-col">
          <div className="h-[20px] border-b border-black flex items-center justify-center text-center font-semibold bg-gray-50 leading-tight">
            N° de predios conectados
          </div>
          <div className="flex-1 flex items-center justify-center bg-gray-100"></div>
        </div>

        <div className="w-[14%] border-r border-black flex flex-col">
          <div className="h-[20px] border-b border-black flex items-center justify-center text-center font-semibold bg-gray-50 leading-tight">
            N° de informe de inspección :
          </div>
          <div className="flex-1 flex items-center justify-center"></div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-[20px] border-b border-black flex items-center justify-center text-center font-semibold bg-gray-50">
            Fecha de inspección :
          </div>
          <div className="flex-1 flex items-center justify-center font-bold">
            - &nbsp; -
          </div>
        </div>
      </div>
    </div>
  );
};
