import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const DatosUsuario = ({ inspeccion }: Props) => {
  const nombreClient = [
    inspeccion?.ruta?.casa?.cliente?.primer_nombre,
    inspeccion?.ruta?.casa?.cliente?.segundo_nombre,
    inspeccion?.ruta?.casa?.cliente?.primer_apellido,
    inspeccion?.ruta?.casa?.cliente?.segundo_apellido,
  ]
    .filter(Boolean)
    .join(" ");

  const cliente = inspeccion?.ruta?.casa?.cliente;
  const casa = inspeccion?.ruta?.casa;
  const ciudad = casa?.ciudad;

  // Clases utilitarias para mantener consistencia
  const borderClass = "border-black";
  const labelClass = "font-bold mr-1";
  const cellClass = "px-1 py-[1px] flex items-center";

  return (
    <div className="w-full font-arial text-[7.5pt] leading-tight text-black border-b border-r border-l border-black box-border">
      <div className={`flex w-full border-b ${borderClass}`}>
        <div
          className={`w-[70%] border-r ${borderClass} font-bold text-center py-[2px]`}
        >
          1. DATOS DE USUARIO
        </div>
        <div className="w-[30%] font-bold text-center py-[2px]">
          2. IDENTIFICACIÓN DEL ORGANISMO DE INSPECCIÓN
        </div>
      </div>

      <div className="flex w-full">
        <div className={`w-[70%] flex flex-col border-r ${borderClass}`}>
          <div className={`flex w-full border-b ${borderClass}`}>
            <div className={`flex-1 border-r ${borderClass} ${cellClass}`}>
              <span className={labelClass}>Nombre:</span>
              <span className="uppercase truncate">{nombreClient}</span>
            </div>
            <div className={`w-[20%] border-r ${borderClass} ${cellClass}`}>
              <span className={labelClass}>Cédula:</span>
              <span className="truncate">{cliente?.numero_documento}</span>
            </div>
            <div className={`w-[20%] ${cellClass}`}>
              <span className={labelClass}>Teléfono:</span>
              <span className="truncate">{cliente?.telefono}</span>
            </div>
          </div>

          {/* Fila 2: Dirección | Barrio */}
          <div className={`flex w-full border-b ${borderClass}`}>
            <div className={`flex-1 border-r ${borderClass} ${cellClass}`}>
              <span className={labelClass}>Dirección:</span>
              <span className="uppercase truncate">{casa?.direccion}</span>
            </div>
            <div className={`w-[40%] ${cellClass}`}>
              <span className={labelClass}>Barrio:</span>
              <span className="uppercase truncate">{casa?.barrio}</span>
            </div>
          </div>

          <div className="flex w-full flex-1">
            <div
              className={`w-[25%] border-r ${borderClass} px-1 py-[1px] flex flex-col justify-center`}
            >
              <div className="flex items-center">
                <span className={`${labelClass} w-[45px]`}>Cuenta:</span>
                <span className="truncate">{casa?.no_cuenta}</span>
              </div>
              <div className="flex items-center">
                <span className={`${labelClass} w-[45px]`}>Código:</span>

                <span className="truncate"></span>
              </div>
            </div>
            <div className={`w-[25%] border-r ${borderClass} ${cellClass}`}>
              <span className={labelClass}>Medidor:</span>
              <span className="truncate">{casa?.medidor}</span>
            </div>
            <div className={`w-[25%] border-r ${borderClass} ${cellClass}`}>
              <span className={labelClass}>Dpto:</span>
              <span className="uppercase truncate">
                {ciudad?.departamento?.nombre}
              </span>
            </div>
            <div className={`w-[25%] ${cellClass}`}>
              <span className={labelClass}>Ciudad:</span>
              <span className="uppercase truncate">{ciudad?.nombre}</span>
            </div>
          </div>
        </div>

        <div className="w-[30%] flex">
          <div className={`flex-1 border-r ${borderClass} flex flex-col`}>
            <div className="flex-1 px-1 py-[2px] text-[7pt]">
              <div className="whitespace-nowrap">
                Empresa: OI ELECTROGASES S.A.S
              </div>
              <div className="leading-none whitespace-nowrap">
                Dirección: Cll. 3N # 3E-111 Urb. Capillana
              </div>
              <div>Cúcuta - Norte De Santander</div>
              <div className="font-bold mt-[1px]">
                Acreditación N°: 18-OIN-021
              </div>
            </div>

            <div
              className={`border-t ${borderClass} px-1 py-[2px] h-[22px] flex items-center`}
            >
              <span className="text-[6.5pt] mr-1 text-gray-700">
                DISTRIBUIDORA:
              </span>
              <span className="font-bold uppercase">COLGAS</span>{" "}
            </div>
          </div>

          <div className="w-[75px] flex flex-col text-center">
            <div className="flex-1 flex flex-col justify-center py-[2px]">
              <div className="text-[6.5pt]">Teléfonos:</div>
              <div className="font-bold leading-none">3503732122</div>
              <div className="font-bold leading-none mt-[2px]">5492370</div>
            </div>

            <div
              className={`border-t ${borderClass} h-[22px] flex flex-col justify-center`}
            >
              <div className="text-[6pt] leading-none">NIT:</div>
              <div className="leading-none">901106969-6</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
