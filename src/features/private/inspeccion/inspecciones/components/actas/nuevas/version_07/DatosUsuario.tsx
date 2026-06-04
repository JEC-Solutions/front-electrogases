import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const DatosUsuario = ({ inspeccion }: Props) => {
  const cliente = inspeccion?.ruta?.casa?.cliente;
  const casa = inspeccion?.ruta?.casa;
  const ciudad = casa?.ciudad;
  const nombreCliente = [
    cliente?.primer_nombre,
    cliente?.segundo_nombre,
    cliente?.primer_apellido,
    cliente?.segundo_apellido,
  ]
    .filter(Boolean)
    .join(" ");

  const FALLBACK_ORGANISMO = {
    empresa: "OI ELECTROGASES S.A.S",
    direccion: "Cll 3N # 3E-111 Urb. La Capillana Cúcuta - Norte De Santander",
    telefono1: "3503732122",
    telefono2: "5492370",
    nit: "901106969-6",
    acreditacion: "18-OIN-021",
  };

  const org = inspeccion?.datos_organismo_snapshot ?? FALLBACK_ORGANISMO;

  const border = "border-black";
  const textBase = "text-[7.5pt] font-arial leading-tight text-black";
  const labelBold = "font-bold mr-1";
  const cellStyle = "px-1 flex items-center";

  return (
    <div
      className={`w-full border-r border-l border-b ${border} ${textBase} box-border`}
    >
      <div
        className={`flex w-full border-b ${border} font-bold text-center bg-gray-200`}
      >
        <div className={`w-[70%] border-r ${border} py-[1px]`}>
          1. DATOS DE USUARIO
        </div>
        <div className="w-[30%] py-[1px]">
          2. IDENTIFICACIÓN DEL ORGANISMO DE INSPECCIÓN
        </div>
      </div>

      <div className="flex w-full">
        <div className={`w-[70%] flex flex-col border-r ${border}`}>
          <div className={`flex w-full border-b ${border} h-[20px]`}>
            <div className={`flex-1 border-r ${border} ${cellStyle}`}>
              <span className={labelBold}>Nombre:</span>
              <span className="truncate uppercase">{nombreCliente}</span>
            </div>
            <div className={`w-[20%] border-r ${border} ${cellStyle}`}>
              <span className={labelBold}>Cédula:</span>
              <span className="truncate">{cliente?.numero_documento}</span>
            </div>
            <div className={`w-[20%] ${cellStyle}`}>
              <span className={labelBold}>Teléfono:</span>
              <span className="truncate">{cliente?.telefono}</span>
            </div>
          </div>

          <div className={`flex w-full border-b ${border} h-[20px]`}>
            <div className={`flex-1 border-r ${border} ${cellStyle}`}>
              <span className={labelBold}>Dirección:</span>
              <span className="truncate uppercase">{casa?.direccion}</span>
            </div>
            <div className={`w-[40%] ${cellStyle}`}>
              <span className={labelBold}>Barrio:</span>
              <span className="truncate uppercase">{casa?.barrio}</span>
            </div>
          </div>

          <div className="flex w-full h-[24px]">
            <div
              className={`w-[35%] border-r ${border} px-1 flex flex-col justify-center leading-none`}
            >
              <div className="flex items-center">
                <span className={`${labelBold} w-[45px]`}>Cuenta:</span>
                <span className="truncate">{casa?.no_cuenta}</span>
              </div>
              <div className="flex items-center">
                <span className={`${labelBold} w-[45px]`}>Código:</span>
              </div>
            </div>

            <div className={`w-[32.5%] border-r ${border} ${cellStyle}`}>
              <span className={labelBold}>Dpto:</span>
              <span className="truncate uppercase">
                {ciudad?.departamento?.nombre}
              </span>
            </div>

            <div className={`w-[32.5%] ${cellStyle}`}>
              <span className={labelBold}>Ciudad:</span>
              <span className="truncate uppercase">{ciudad?.nombre}</span>
            </div>
          </div>
        </div>

        <div className="w-[30%] flex flex-col">
          <div className={`flex-1 flex border-b ${border}`}>
            <div
              className={`flex-1 border-r ${border} px-1 py-[1px] flex flex-col justify-center text-[7pt]`}
            >
              <div className="whitespace-nowrap truncate">
                <span className="">Empresa:</span> {org.empresa}
              </div>
              <div className="text-[6.5pt] leading-tight">
                Dirección: {org.direccion}
              </div>
              <div className="font-bold whitespace-nowrap truncate">Acreditación N°: {org.acreditacion}</div>
            </div>

            <div className="w-[75px] flex flex-col justify-center items-center text-center px-1">
              <div className="text-[6.5pt] mb-[1px]">Teléfonos:</div>
              <div className="font-bold leading-none">{org.telefono1}</div>
              {org.telefono2 && <div className="font-bold leading-none">{org.telefono2}</div>}
            </div>
          </div>

          <div className="h-[16px] flex items-center px-1">
            <span className="text-[6pt] mr-1 text-gray-700">
              DISTRIBUIDORA:
            </span>
            <div className="flex-1"></div> {/* Espacio vacío */}
            <span className="text-[6pt] mr-1">NIT:</span>
            <span>{org.nit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
