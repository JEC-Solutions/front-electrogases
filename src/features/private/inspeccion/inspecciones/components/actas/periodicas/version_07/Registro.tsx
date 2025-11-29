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
  <span
    className={`inline-block border-b border-black text-[7.5pt] leading-none ${className}`}
  >
    {value}
  </span>
);

export const Registro = ({ inspeccion, firmaBase64 }: Props) => {
  const nombreInspector =
    (inspeccion?.ruta?.persona?.primer_nombre ?? "") +
    " " +
    (inspeccion?.ruta?.persona?.segundo_nombre ?? "") +
    " " +
    (inspeccion?.ruta?.persona?.primer_apellido ?? "") +
    " " +
    (inspeccion?.ruta?.persona?.segundo_apellido ?? "");

  return (
    <div className="w-full font-arial text-black text-[7.5pt]">
      <div className="border border-black leading-tight">
        <div className="grid grid-cols-[2fr_1fr] w-full">
          <div className="border-r border-black flex flex-col">
            <div className="bg-gray-200 font-bold text-center py-1 border-b border-black text-[8pt]">
              11. REGISTRO DE CLIENTE / QUIEN ATIENDE LA VISITA
            </div>
            <div className="px-2 py-1 border-b border-black">
              Declaro que conozco el resultado de la Inspecciones y las acciones
              a seguir en caso de encontrar defectos en la instalación.
            </div>

            <div className="px-2 py-1 border-b border-black">
              Con la Firma de este documento el usuario autoriza el cobro de la
              revisión a <Line className="w-24 align-middle mx-1" /> cuotas
            </div>

            <div className="px-2 py-1 border-b border-black flex items-center">
              <span className="mr-2 whitespace-nowrap">
                Nombre quien atiende la visita:
              </span>
              <Line className="flex-1" />
            </div>

            <div className="grid grid-cols-[1fr_0.9fr] flex-1">
              <div className="border-r border-black flex flex-col">
                <div className="px-2 py-1 border-b border-black">Firma:</div>
                <div className="flex-1 flex items-center justify-center relative">
                  {firmaBase64 ? (
                    <img
                      src={firmaBase64}
                      alt="Firma cliente"
                      className="max-h-[90%] max-w-[20%] object-contain"
                    />
                  ) : null}
                  <Line className="absolute inset-x-4 bottom-2 border-black/50" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="px-2 py-1 border-b border-black flex items-center gap-2">
                  <span className="whitespace-nowrap">Cédula:</span>
                  <Line className="flex-1" />
                </div>
                <div className="px-2 py-1 flex items-center gap-2">
                  <span className="whitespace-nowrap">Vínculo:</span>
                  <Line className="flex-1" />
                </div>
                <div className="flex-1" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-200 font-bold text-center py-1 border-b border-black text-[8pt]">
              12. REGISTRO DE DATOS DEL INSPECTOR
            </div>
            <div className="grid grid-cols-[1.5fr_1fr] flex-1">
              <div className="border-r border-black flex flex-col">
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
                <div className="flex-1" /> {/* Espacio de relleno */}
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
      </div>
    </div>
  );
};
