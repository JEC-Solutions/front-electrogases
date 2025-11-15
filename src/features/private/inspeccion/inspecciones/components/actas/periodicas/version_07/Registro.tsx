import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
  firmaBase64: string | undefined;
}

const Line = ({
  className = "",
  value = "",
}: {
  className?: string;
  value?: string;
}) => (
  <span className={`inline-block border-b border-black ${className}`}>
    {value}
  </span>
);

export const Registro = ({ inspeccion, firmaBase64 }: Props) => {
  const nombreInspector =
    inspeccion?.ruta?.persona?.primer_nombre +
    " " +
    inspeccion?.ruta?.persona?.segundo_nombre +
    " " +
    inspeccion?.ruta?.persona?.primer_apellido +
    " " +
    inspeccion?.ruta?.persona?.segundo_apellido;

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="min-w-[1248px]">
        <div className="border border-black text-xs leading-tight">
          {/* GRID PRINCIPAL: 11 (izq) | 12 (der) */}
          <div className="grid grid-cols-[2fr_1fr]">
            {/* ================== 11. REGISTRO CLIENTE ================== */}
            <div className="border-r border-black">
              {/* Título */}
              <div className="bg-gray-100 font-bold text-center py-1 border-b border-black">
                11. REGISTRO DE CLIENTE / QUIEN ATIENDE LA VISITA
              </div>

              {/* Declaraciones */}
              <div className="px-2 py-1 border-b border-black">
                Declaro que conozco el resultado de la Inspecciones y las
                acciones a seguir en caso de encontrar defectos en la
                instalación.
              </div>

              <div className="px-2 py-1 border-b border-black">
                Con la Firma de este documento el usuario autoriza el cobro de
                la revisión a <Line className="w-24 align-middle mx-1" /> cuotas
              </div>

              {/* Nombre quien atiende */}
              <div className="px-2 py-1 border-b border-black">
                <span className="mr-2">Nombre quien atiende la visita:</span>
                <Line className="w-[70%] align-middle" />
              </div>

              {/* Firma (zona grande) + Cédula/Vínculo */}
              <div className="grid grid-cols-[1fr_0.9fr]">
                {/* Firma (izquierda) */}
                <div className="border-r border-black">
                  <div className="px-2 py-1 border-b border-black">Firma:</div>
                  <div className="h-[120px] flex items-center justify-center">
                    {firmaBase64 === undefined ? null : (
                      <img
                        src={firmaBase64}
                        alt="Firma cliente"
                        className="max-h-[110px] max-w-[90%] object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Cédula / Vínculo (derecha) */}
                <div>
                  <div className="px-2 py-1 border-b border-black flex items-center gap-2">
                    <span className="whitespace-nowrap">Cédula:</span>
                    <Line className="flex-1" />
                  </div>
                  <div className="px-2 py-1 flex items-center gap-2">
                    <span className="whitespace-nowrap">Vínculo:</span>
                    <Line className="flex-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* ================== 12. REGISTRO DEL INSPECTOR ================== */}
            <div>
              {/* Título */}
              <div className="bg-gray-100 font-bold text-center py-1 border-b border-black">
                12. REGISTRO DE DATOS DEL INSPECTOR
              </div>

              {/* Cuerpo: datos (izq) | firma/sello (der) */}
              <div className="grid grid-cols-[1fr_0.8fr] h-full">
                {/* Columna izquierda: campos del inspector */}
                <div className="border-r border-black">
                  <div className="px-2 py-1 border-b border-black flex items-center gap-2">
                    <span className="whitespace-nowrap">
                      Nombre del Inspector:
                    </span>
                    <Line className="flex-1" value={nombreInspector} />
                  </div>
                  <div className="px-2 py-1 border-b border-black flex items-center gap-2">
                    <span className="whitespace-nowrap">Certificado No.:</span>
                    <Line className="flex-1" />
                  </div>
                  <div className="px-2 py-1 border-b border-black flex items-center gap-2">
                    <span className="whitespace-nowrap">Registro SIC No.:</span>
                    <Line className="flex-1" />
                  </div>
                  <div className="px-2 py-1 flex items-center gap-2">
                    <span className="whitespace-nowrap">Competencia:</span>
                    <Line className="flex-1" />
                  </div>
                </div>

                {/* Columna derecha: firma / sello */}
                <div className="flex flex-col">
                  <div className="px-2 py-1 border-b border-black">Firma:</div>
                  <div className="h-[72px] border-b border-black" />
                  <div className="px-2 py-1 border-b border-black">Sello:</div>
                  <div className="flex-1" />
                </div>
              </div>
            </div>
          </div>
          {/* Fin contenedor */}
        </div>
      </div>
    </div>
  );
};
