import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const Header = ({ inspeccion }: Props) => {
  return (
    <div className="w-full border border-black bg-white text-black font-arial box-border">
      <div className="flex h-[110px]">
        <div className="w-[100px] border-r border-black flex items-center justify-center p-2">
          <img
            src="/imagenes/Electrogases.png"
            alt="Electrogases"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="w-[200px] border-r border-black flex flex-col items-center justify-center p-1">
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/imagenes/onac_logo.png"
              alt="Onac Acreditado"
              className="max-h-[60px] object-contain"
            />
          </div>
          <div className="text-[7pt] text-center font-semibold leading-tight mt-1">
            <div>ISO/IEC 17020:2012</div>
            <div>18-OIN-021</div>
          </div>
        </div>

        <div className="flex-1 border-r border-black flex flex-col justify-center items-center text-center p-1">
          <div className="font-bold text-[10pt] leading-tight">
            Informe de inspección de Instalaciones existentes para suministro de
            gases
          </div>
          <div className="font-bold text-[10pt] leading-tight">
            combustibles destinadas a usos Residenciales ó comerciales
          </div>
          <div className="font-bold text-[11pt] uppercase mt-1 leading-tight">
            REVISIÓN PERIÓDICA - SOLICITUD DEL USUARIO
          </div>
          <div className="font-bold text-[10pt] mt-1 leading-tight">
            GN - GLP Resolución Min. Minas &nbsp;&nbsp; 90902/2013 / 41385/2017
          </div>
        </div>

        <div className="w-[220px] border-r border-black flex flex-col">
          <div className="h-[25px] border-b border-black flex items-center justify-center text-[9pt] font-semibold bg-gray-50">
            N° DE INFORME:
          </div>

          <div className="flex-1 flex items-center px-4 relative">
            <span className="text-[18pt] font-normal absolute left-4">P</span>
            <div className="w-full text-center">
              <span className="text-[14pt] font-bold text-red-600">
                {inspeccion?.ruta?.numero_acta || ""}
              </span>
            </div>
          </div>
        </div>

        <div className="w-[180px] flex flex-col text-[9pt]">
          <div className="flex-1 border-b border-black flex items-center justify-between px-2">
            <span className="font-semibold">CODIGO:</span>
            <span>F-IP-01-01</span>
          </div>
          <div className="flex-1 border-b border-black flex items-center justify-between px-2">
            <span className="font-semibold">VERSIÓN:</span>
            <span>07</span>
          </div>
          <div className="flex-1 flex items-center justify-between px-2">
            <span className="font-semibold">FECHA:</span>
            <span>2025-01-10</span>
          </div>
        </div>
      </div>
    </div>
  );
};
