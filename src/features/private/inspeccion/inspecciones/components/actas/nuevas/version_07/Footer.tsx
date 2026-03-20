import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
  firmaClienteBase64?: string | null;
  firmaInspectorBase64?: string | null;
  selloInspectorBase64?: string | null;
}

export const Footer = ({
  inspeccion,
  firmaClienteBase64,
  firmaInspectorBase64,
  selloInspectorBase64,
}: Props) => {
  const persona = inspeccion?.ruta?.persona;
  const nombreInspector =
    [
      inspeccion?.ruta?.persona?.primer_nombre,
      inspeccion?.ruta?.persona?.segundo_nombre,
      inspeccion?.ruta?.persona?.primer_apellido,
      inspeccion?.ruta?.persona?.segundo_apellido,
    ]
      .filter(Boolean)
      .join(" ") || "";
  const entidad = inspeccion?.inspector_entidad || persona?.usuario?.entidad || "";
  const certificadoInspector =
    inspeccion?.inspector_certificado_no || persona?.usuario?.certificado_no || "";
  const vigenciaInspector =
    inspeccion?.inspector_vigencia || persona?.usuario?.vigencia || "";

  const borderClass = "border-black";
  const textClass = "text-[7.5pt] font-arial leading-tight text-black";
  const headerClass =
    "bg-[#e5e7eb] font-bold text-center py-[2px] border-b border-black text-[7pt]";
  const cellPadding = "px-1 py-[2px]";

  return (
    <div className={`w-full border ${borderClass} ${textClass} mt-[-1px]`}>
      <div className="flex w-full">
        <div className={`w-1/2 flex flex-col border-r ${borderClass}`}>
          <div className={headerClass}>
            11. REGISTRO DE CLIENTE / QUIEN ATIENDE LA VISITA
          </div>

          <div className={`border-b ${borderClass} ${cellPadding}`}>
            Declaro que conozco el resultado de la Inspecciones y las acciones a
            seguir en caso de encontrar defectos en la instalación.
          </div>

          <div className="flex flex-1 min-h-[70px]">
            <div
              className={`w-[60%] border-r ${borderClass} relative flex flex-col`}
            >
              <div className={cellPadding}>Firma:</div>
              {firmaClienteBase64 && (
                <img
                  src={firmaClienteBase64}
                  alt="Firma Cliente"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[120%] max-h-[120%] object-contain mix-blend-multiply"
                />
              )}
            </div>

            <div className="w-[40%] flex flex-col">
              <div
                className={`flex-1 border-b ${borderClass} ${cellPadding} flex flex-col justify-start`}
              >
                <span className="mb-4">Cédula:</span>
              </div>
              <div
                className={`flex-1 ${cellPadding} flex flex-col justify-start`}
              >
                <span className="mb-4">Vinculo:</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col">
          <div className={headerClass}>12. REGISTRO DE DATOS DEL INSPECTOR</div>

          <div className="flex flex-1">
            <div className={`w-[60%] border-r ${borderClass} flex flex-col`}>
              <div
                className={`flex-1 border-b ${borderClass} ${cellPadding} flex flex-col justify-start min-h-[35px]`}
              >
                <span>Nombre:</span>
                <span className="font-bold ml-1 mt-1">{nombreInspector}</span>
              </div>

              <div
                className={`flex-1 border-b ${borderClass} ${cellPadding} min-h-[25px]`}
              >
                <span>Certificado No.:</span>
                <div className="font-bold ml-1 mt-1 flex flex-col">
                  {String(certificadoInspector)
                    .split("/")
                    .map((item, index) => (
                      <div key={index}>{item.trim()}</div>
                    ))}
                </div>
              </div>
              <div className={`flex-1 ${cellPadding} min-h-[25px]`}>
                <span>Vigencia:</span>
                <div className="font-bold ml-1 mt-1 flex flex-col">
                  {String(vigenciaInspector)
                    .split("/")
                    .map((item, index) => (
                      <div key={index}>{item.trim()}</div>
                    ))}
                </div>
              </div>
              <div
                className={`flex-1 border-t ${borderClass} ${cellPadding} min-h-[25px]`}
              >
                <span>Expedido por:</span>
                <span className="font-bold ml-1 mt-1">{entidad}</span>
              </div>
            </div>

            <div className="w-[40%] flex flex-col">
              <div
                className={`h-[50%] border-b ${borderClass} relative flex flex-col`}
              >
                <div className={cellPadding}>Firma:</div>
                {firmaInspectorBase64 && (
                  <img
                    src={firmaInspectorBase64}
                    alt="Firma Inspector"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[95%] max-h-[90%] object-contain mix-blend-multiply"
                  />
                )}
              </div>

              <div className="h-[50%] relative flex flex-col">
                <div className={cellPadding}>Sello:</div>
                {selloInspectorBase64 && (
                  <img
                    src={selloInspectorBase64}
                    alt="Sello Inspector"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[80%] object-contain mix-blend-multiply"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
