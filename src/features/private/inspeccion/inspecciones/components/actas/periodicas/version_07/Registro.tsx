import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
  firmaClienteBase64?: string | null;
  firmaInspectorBase64?: string | null;
  selloInspectorBase64?: string | null;
}

export const Registro = ({
  inspeccion,
  firmaClienteBase64,
  firmaInspectorBase64,
  selloInspectorBase64,
}: Props) => {
  const persona = inspeccion?.ruta?.persona;
  const nombreInspector =
    [
      persona?.primer_nombre,
      persona?.segundo_nombre,
      persona?.primer_apellido,
      persona?.segundo_apellido,
    ]
      .filter(Boolean)
      .join(" ") || "";
  const registroSic = persona?.numero_documento || "";
  const certificadoInspector = persona?.usuario?.certificado_no || "";
  const vigenciaInspector = persona?.usuario?.vigencia || "";

  const conformidad: any = inspeccion?.declaracionConformidad?.[0] || {};
  const cliente = inspeccion?.ruta?.casa?.cliente;

  const nombreCliente =
    conformidad?.nombreCliente ||
    `${cliente?.primer_nombre || ""} ${cliente?.primer_apellido || ""}`;

  const cedulaCliente =
    conformidad?.cedulaCliente || cliente?.numero_documento || "";
  const vinculoCliente = conformidad?.vinculoCliente || "TITULAR";

  const borderClass = "border-black";
  const textClass = "text-[7pt] font-arial leading-tight text-black";
  const headerClass =
    "bg-[#e5e7eb] font-bold text-center py-[2px] border-b border-black text-[7pt] uppercase";
  const cellPadding = "px-1 py-[1px]";

  return (
    <div
      className={`w-full border border-black ${textClass} mt-[-1px] flex flex-row min-h-[110px]`}
    >
      <div className={`w-1/2 flex flex-col border-r ${borderClass}`}>
        <div className={headerClass}>
          12. REGISTRO DE CLIENTE / QUIEN ATIENDE LA VISITA
        </div>

        <div className={`border-b ${borderClass} ${cellPadding} text-justify`}>
          Declaro que conozco el resultado de la Inspecciones y las acciones a
          seguir en caso de encontrar defectos en la instalación.
        </div>

        <div
          className={`border-b ${borderClass} ${cellPadding} flex items-end min-h-[20px]`}
        >
          <span className="whitespace-nowrap">
            Nombre quien atiende la visita:
          </span>
          <span className="font-bold ml-2 uppercase truncate">
            {nombreCliente}
          </span>
        </div>

        <div className="flex flex-1 min-h-[50px]">
          <div
            className={`w-[60%] border-r ${borderClass} relative flex flex-col`}
          >
            <div className={cellPadding}>Firma:</div>
            <div className="flex-1 relative overflow-hidden">
              {firmaClienteBase64 && (
                <img
                  src={firmaClienteBase64}
                  alt="Firma Cliente"
                  className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[150%] max-h-[150%] object-contain mix-blend-multiply"
                />
              )}
            </div>
          </div>

          <div className="w-[40%] flex flex-col">
            <div
              className={`flex-1 border-b ${borderClass} ${cellPadding} flex flex-col justify-center`}
            >
              <div>Cédula:</div>
              <div className="font-bold ml-1">{cedulaCliente}</div>
            </div>
            <div
              className={`flex-1 ${cellPadding} flex flex-col justify-center`}
            >
              <div>Vinculo:</div>
              <div className="font-bold ml-1 uppercase">{vinculoCliente}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col">
        <div className={headerClass}>13. REGISTRO DE DATOS DEL INSPECTOR</div>

        <div className="flex flex-1">
          <div className={`w-[60%] border-r ${borderClass} flex flex-col`}>
            <div
              className={`h-[25%] border-b ${borderClass} ${cellPadding} flex flex-col justify-center`}
            >
              <span>Nombre:</span>
              <span className="font-bold uppercase text-[6pt] leading-none">
                {nombreInspector}
              </span>
            </div>
            <div
              className={`h-[25%] border-b ${borderClass} ${cellPadding} flex flex-col justify-center`}
            >
              <span>Certificado No.:</span>
              <div className="font-bold flex flex-col">
                {String(certificadoInspector)
                  .split("/")
                  .map((item, index) => (
                    <div key={index}>{item.trim()}</div>
                  ))}
              </div>
            </div>
            <div
              className={`h-[25%] ${cellPadding} flex flex-col justify-center`}
            >
              <span>Vigencia:</span>
              <div className="font-bold flex flex-col">
                {String(vigenciaInspector)
                  .split("/")
                  .map((item, index) => (
                    <div key={index}>{item.trim()}</div>
                  ))}
              </div>
            </div>
            <div
              className={`h-[25%] border-t ${borderClass} ${cellPadding} flex flex-col justify-center`}
            >
              <span>SENA:</span>
              <span className="font-bold">{registroSic}</span>
            </div>
          </div>

          <div className="w-[40%] flex flex-col">
            <div
              className={`h-[50%] border-b ${borderClass} relative flex flex-col`}
            >
              <div className={cellPadding}>Firma:</div>
              <div className="flex-1 relative overflow-hidden">
                {firmaInspectorBase64 && (
                  <img
                    src={firmaInspectorBase64}
                    alt="Firma Inspector"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[120%] max-h-[120%] object-contain mix-blend-multiply"
                  />
                )}
              </div>
            </div>

            <div className="h-[50%] relative flex flex-col">
              <div className={cellPadding}>Sello:</div>
              <div className="flex-1 relative overflow-hidden">
                {selloInspectorBase64 && (
                  <img
                    src={selloInspectorBase64}
                    alt="Sello Inspector"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[85%] object-contain mix-blend-multiply"
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
