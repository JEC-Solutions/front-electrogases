import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

function Box({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[11px] h-[11px] border border-black bg-white ml-1">
      {checked ? (
        <span className="-mt-[2px] text-[9px] leading-none font-bold">✓</span>
      ) : null}
    </span>
  );
}

export const TrazabilidadMatriz = ({ inspeccion }: Props) => {
  const matriz = inspeccion?.lineaMatriz;
  const tieneLineaMatriz = !!inspeccion?.lineaMatriz;
  const visible = matriz?.oculta;

  const borderClass = "border-black";
  const textClass = "text-[7.5pt] font-arial leading-tight text-black";

  return (
    <div
      className={`w-full border-l border-r border-b ${borderClass} ${textClass} box-border`}
    >
      <div className="flex w-full h-[38px]">
        <div
          className={`w-[26%] bg-[#e5e7eb] border-r ${borderClass} flex items-center justify-center p-1 text-center font-bold uppercase`}
        >
          3.3. TRAZABILIDAD DE LA LINEA MATRIZ
        </div>

        <div className={`w-[12%] border-r ${borderClass} flex flex-col`}>
          <div
            className={`h-[50%] border-b ${borderClass} flex items-center justify-center text-center px-1`}
          >
            Existe Linea Matríz
          </div>
          <div className="h-[50%] flex items-center justify-center gap-2 bg-gray-50">
            <div className="flex items-center">
              SI <Box checked={tieneLineaMatriz} />
            </div>
            <div className="flex items-center">
              NO <Box checked={!tieneLineaMatriz} />
            </div>
          </div>
        </div>

        <div
          className={`w-[11%] border-r ${borderClass} flex flex-col justify-center px-2 gap-1`}
        >
          <div className="flex items-center justify-between">
            <span>A la vista</span> <Box checked={visible} />
          </div>
          <div className="flex items-center justify-between">
            <span>Oculta</span> <Box checked={visible === false} />
          </div>
        </div>

        <div
          className={`w-[14%] border-r ${borderClass} p-1 flex flex-col relative`}
        >
          <span>Organismo que certifico:</span>
          <div className="flex-1 flex items-end justify-center font-bold text-[7pt]">
            {matriz?.empresa_certifica}
          </div>
        </div>

        <div
          className={`w-[12%] border-r ${borderClass} p-1 flex flex-col relative`}
        >
          <span className="leading-none mb-1">N° de predios conectados</span>

          <div className="absolute bottom-1 right-1 w-[35px] h-[14px] bg-gray-200 border border-gray-300 flex items-center justify-center font-bold">
            {matriz?.cant_predios_conectados}
          </div>
        </div>

        <div className={`w-[13%] border-r ${borderClass} p-1 flex flex-col`}>
          <span className="leading-none">N° de informe de inspeccion :</span>
          <div className="flex-1 flex items-end justify-center font-bold">
            {matriz?.informe_inspeccion}
          </div>
        </div>

        <div className="flex-1 p-1 flex flex-col">
          <span className="leading-none">Fecha de inspección :</span>
          <div className="flex-1 flex items-end justify-center font-bold tracking-widest">
            {matriz?.fecha_inspeccion ? matriz.fecha_inspeccion : "-   -"}
          </div>
        </div>
      </div>
    </div>
  );
};
