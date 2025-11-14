import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const Header = ({ inspeccion }: Props) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1246px]">
        <div className="flex">
          {/* Sección 1 — 79px */}
          <div className="w-[116px] border-t border-l border-black p-2">
            {/* coloca aquí el contenido real */}
            <div className="text-xs font-semibold">S1</div>
          </div>

          {/* Sección 2 — 184px */}
          <div className="w-[223px] border-l border-t border-black p-2">
            <div className="text-[9pt] font-semibold">S2</div>
          </div>

          {/* Sección 3 — 610px */}
          <div className="w-[647px] border-t border-l border-r border-black p-2">
            <div className="text-[10pt] text-center leading-tight">
              Informe de Inspección de Instalaciones existentes para suministro
              de gases combustibles destinadas a usos Residenciales ó
              comerciales
            </div>

            <div className="text-[11pt] font-bold text-center mt-1 leading-tight">
              REVISIÓN PERIÓDICA - SOLICITUD DEL USUARIO
            </div>

            {/* línea inferior con organización izquierda/derecha */}
            <div className="text-[10pt] mt-1 leading-tight">
              <div className="flex items-center justify-between">
                <span>GN - GLP Resolución Min. Minas</span>
                <span>90902/2013 / 41385/2017</span>
              </div>
            </div>
          </div>

          {/* Sección 4 — 236px */}
          <div className="w-[273px] border-r border-t border-black p-0">
            {/* Título superior */}
            <div className="text-center text-[10pt] font-semibold border-b border-black py-1">
              N° DE INFORME:
            </div>

            {/* Cuerpo: P | número rojo */}
            <div className="grid grid-cols-[22px_1fr] items-center min-h-[72px] px-2">
              {/* Prefijo P */}
              <div className="text-[14pt] font-semibold text-left">P</div>

              {/* Número (rojo, grande, centrado) */}
              <div className="text-center leading-none">
                <span className="text-[28pt] font-extrabold tracking-wider text-red-700">
                  {inspeccion?.ruta?.numero_acta}
                </span>
              </div>
            </div>
          </div>

          {/* Sección 5 — 137px con 3 bloques verticales */}
          <div className="w-[179px] border-t border-r border-black p-0 flex flex-col text-[10pt]">
            {/* 1) CODIGO. F-IP-01-01 */}
            <div className="flex items-center justify-between px-2 py-1 border-b border-black">
              <span className="font-semibold">CODIGO.</span>
              <span className="font-semibold">{"F-IP-01-01"}</span>
            </div>

            {/* 2) VERSIÓN: 07 */}
            <div className="flex items-center justify-between px-2 py-1 border-b border-black">
              <span className="font-semibold">VERSIÓN:</span>
              <span className="font-semibold">{"07"}</span>
            </div>

            {/* 3) FECHA: 2025-01-10 */}
            <div className="flex items-center justify-between px-2 py-1">
              <span className="font-semibold">FECHA:</span>
              <span className="font-semibold">{"2025-01-10"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
