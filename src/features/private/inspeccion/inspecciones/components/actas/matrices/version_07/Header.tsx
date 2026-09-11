import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const Header = ({ inspeccion }: Props) => {
  const rawNumeroActa = inspeccion?.ruta?.numero_acta || "";
  let numeroActa = rawNumeroActa;
  if (numeroActa.startsWith("MD-")) {
    numeroActa = numeroActa.substring(3);
  } else if (numeroActa.startsWith("MD")) {
    numeroActa = numeroActa.substring(2);
  } else if (numeroActa.startsWith("M-")) {
    numeroActa = numeroActa.substring(2);
  } else if (
    numeroActa.startsWith("M") &&
    numeroActa.length > 1 &&
    !isNaN(Number(numeroActa.charAt(1)))
  ) {
    numeroActa = numeroActa.substring(1);
  }

  return (
    <div className="w-full border border-black font-arial flex flex-row items-stretch min-h-[85px] box-border bg-white text-black">
      {/* Columna 1: Logo Electrogases (12%) */}
      <div className="w-[12%] flex items-center justify-center p-[6px] box-border">
        <img
          src="/imagenes/Electrogases.png"
          alt="Electrogases"
          className="max-w-full max-h-[55px] h-auto object-contain"
        />
      </div>

      {/* Columna 2: Logo ONAC Acreditado (17%) */}
      <div className="w-[17%] border-l border-r border-black flex flex-col items-center justify-center p-[6px_8px] box-border text-center leading-[1.15]">
        <img
          src="/imagenes/onac_logo.png"
          alt="ONAC"
          className="max-w-full max-h-[48px] w-auto h-auto mb-[3px] object-contain"
        />
        <span className="font-bold text-[6.5pt] whitespace-nowrap">ISO/IEC 17020:2012</span>
        <span className="text-[6.5pt] whitespace-nowrap">18-OIN-021</span>
      </div>

      {/* Columna 3: Título Informe de Líneas Matrices (flex-1) */}
      <div className="flex-1 border-r border-black flex flex-col justify-center items-center p-[6px_10px] text-center box-border">
        <div className="text-[9.5pt] font-bold leading-[1.25] mb-[2px]">
          Informe de inspección de LINEAS MATRICES
        </div>
        <div className="text-[8.5pt] font-bold leading-[1.2] mb-[2px]">
          Nuevas y  existentes de GN  y GLP / resolución
        </div>
        <div className="text-[8.5pt] font-bold leading-[1.2]">
          Min.minas 90902/2013
        </div>
      </div>

      {/* Columna 4: N° de Informe (13%) */}
      <div className="w-[13%] border-r border-black flex flex-col justify-start p-[6px_4px] box-border">
        <div className="text-center text-[7.5pt] font-bold leading-[1.1] mb-[12px]">
          N° DE INFORME:
        </div>
        <div className="flex items-baseline justify-center gap-[3px] font-bold text-[11.5pt] leading-none">
          <span>MD</span>
          <span className="text-[#d00] text-[10.5pt]">{numeroActa}</span>
        </div>
      </div>

      {/* Columna 5: Código de Calidad, Versión y Fecha (17%) */}
      <div className="w-[17%] flex flex-col justify-center items-center text-[7.5pt] font-bold leading-[1.4] p-[6px_4px] box-border text-center">
        <div>CODIGO DE F-IP-03-01</div>
        <div>VERSION: 03</div>
        <div>FECHA: 2026-09-15</div>
      </div>
    </div>
  );
};
