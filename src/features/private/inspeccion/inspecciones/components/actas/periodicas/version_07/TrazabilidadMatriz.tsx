import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

function Box({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[12px] h-[12px] border border-black">
      {checked ? (
        <span className="-mt-[2px] text-[10px] leading-none">✓</span>
      ) : null}
    </span>
  );
}

export const TrazabilidadMatriz = ({ inspeccion }: Props) => {
  const lineaMatriz = !!inspeccion?.lineaMatriz;

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="min-w-[1248px]">
        <div className="grid grid-cols-[345px_175px_145px_305px_155px_170px_140px] border-r border-l border-b border-black text-xs leading-tight box-border">
          {/* Col 1: Título */}
          <div className="px-2 py-1 border-r border-black bg-gray-100 font-bold flex items-center">
            3.3 TRAZABILIDAD DE LA LÍNEA MATRIZ
          </div>

          {/* Col 2: Existe Línea Matriz  (SI/NO) */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              Existe Línea Matriz
            </div>
            <div className="px-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="font-semibold">SI</span>
                <Box checked={lineaMatriz} />
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">NO</span>
                <Box checked={!lineaMatriz} />
              </span>
            </div>
          </div>

          {/* Col 3: A la vista / Oculta */}
          <div className="border-r border-black grid grid-rows-2">
            <div className="px-2 border-b border-black flex items-center justify-between">
              <span className="font-semibold">A la vista</span>
              <Box />
            </div>
            <div className="px-2 flex items-center justify-between">
              <span className="font-semibold">Oculta</span>
              <Box />
            </div>
          </div>

          {/* Col 4: Organismo que certificó */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              Organismo que certificó:
            </div>
            <div className="px-2 flex items-center">
              <span />
            </div>
          </div>

          {/* Col 5: N° de predios conectados */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              N° de predios conectados
            </div>
            <div className="px-2 flex items-center">
              <span />
            </div>
          </div>

          {/* Col 6: N° de informe de inspección */}
          <div className="border-r border-black grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              N° de informe de inspección
            </div>
            <div className="px-2 flex items-center">
              <span></span>
            </div>
          </div>

          {/* Col 7: Fecha de inspección */}
          <div className="grid grid-rows-[20px_1fr]">
            <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
              Fecha de inspección:
            </div>
            {/* Tres casillas (DD - MM - AAAA) para imitar el formato del PDF */}
            <span>- -</span>
          </div>
        </div>
      </div>
    </div>
  );
};
