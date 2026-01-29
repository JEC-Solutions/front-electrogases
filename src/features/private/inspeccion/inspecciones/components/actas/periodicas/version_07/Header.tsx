import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const Header = ({ inspeccion }: Props) => {
  const borderClass = "border-black";

  return (
    <div
      className={`w-full border ${borderClass} bg-white text-black font-arial box-border`}
    >
      <div className="flex w-full h-[100px]">
        <div
          className={`w-[60px] border-r ${borderClass} flex items-center justify-center p-1`}
        >
          <img
            src="/imagenes/Electrogases.png"
            alt="Electrogases"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div
          className={`w-[170px] border-r ${borderClass} flex flex-col items-center justify-center p-1`}
        >
          <div className="flex-1 flex items-center justify-center mb-1">
            <img
              src="/imagenes/onac_logo.png"
              alt="Onac Acreditado"
              className="max-h-[45px] object-contain"
            />
          </div>
          <div className="text-[7.5pt] text-center leading-tight">
            <div>ISO/IEC 17020:2012</div>
            <div>18-OIN-021</div>
          </div>
        </div>

        <div
          className={`flex-1 border-r ${borderClass} flex flex-col justify-center items-center text-center px-1 py-1`}
        >
          <div className="font-bold text-[9pt] leading-tight">
            Informe de inspección de Instalaciones existentes para suministro de
            gases
          </div>
          <div className="font-bold text-[9pt] leading-tight">
            combustibles destinadas a usos Residenciales ó comerciales
          </div>

          <div className="font-bold text-[10pt] uppercase mt-2 mb-1 leading-tight">
            REVISIÓN PERIÓDICA - SOLICITUD DEL USUARIO
          </div>

          <div className="font-bold text-[9pt] leading-tight">
            GN - GLP Resolución Min. Minas &nbsp;&nbsp; 90902/2013 / 41385/2017
          </div>
        </div>

        <div className={`w-[180px] border-r ${borderClass} flex flex-col`}>
          <div
            className={`h-[30px] border-b ${borderClass} flex items-center justify-center text-[9pt] pt-1`}
          >
            N° DE INFORME:
          </div>

          <div className="flex-1 flex items-center px-3 relative">
            <span className="text-[16pt] font-normal absolute left-3">P</span>

            <div className="w-full text-center pl-4">
              <span className="text-[12pt] font-bold text-red-600">
                {inspeccion?.ruta?.numero_acta || ""}
              </span>
            </div>
          </div>
        </div>

        <div className="w-[150px] flex flex-col text-[8.5pt]">
          <div
            className={`flex-1 border-b ${borderClass} flex items-center justify-center text-center px-1`}
          >
            CODIGO: F-IP-01-01
          </div>
          <div
            className={`flex-1 border-b ${borderClass} flex items-center justify-center text-center px-1`}
          >
            VERSIÓN: 07
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-1">
            FECHA: 2025-01-10
          </div>
        </div>
      </div>
    </div>
  );
};
