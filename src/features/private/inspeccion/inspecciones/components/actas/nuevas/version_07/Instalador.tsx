import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const Instalador = ({ inspeccion }: Props) => {
  const instalacionNueva = inspeccion?.instalacionNueva;
  const empresaData = instalacionNueva?.empresasInstalacion?.[0];

  const border = "border-black";
  const bgHeader = "bg-[#f3f4f6]";
  const textSmall = "text-[7pt] font-arial leading-tight text-black";
  const cellStyle = "px-1 flex items-center h-full";
  const labelStyle = "font-normal mr-1 whitespace-nowrap";
  const valueStyle = "font-bold truncate flex-1";

  return (
    <div
      className={`w-full border ${border} ${textSmall} box-border mt-[-1px]`}
    >
      <div
        className={`flex w-full border-b ${border} font-bold text-center ${bgHeader}`}
      >
        <div className={`w-[75%] border-r ${border} py-[1px]`}>
          3.6 EMPRESA Y/O INSTALADOR QUE CONSTRUYÓ O MODIFICO LA INSTALACIÓN
        </div>
        <div className="w-[25%] py-[1px]">
          3.6.1 QUIEN SOLICITA LA INSPECCIÓN
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className={`flex w-full h-[20px] border-b ${border}`}>
          <div className={`w-[75%] flex border-r ${border}`}>
            <div className={`w-[45%] border-r ${border} ${cellStyle}`}>
              <span className={labelStyle}>EMPRESA :</span>
              <span className={valueStyle}>{empresaData?.nombreEmpresa}</span>
            </div>

            <div className={`w-[20%] border-r ${border} ${cellStyle}`}>
              <span className={labelStyle}>Nit :</span>
              <span className={valueStyle}>{empresaData?.nit}</span>
            </div>

            <div className={`w-[35%] ${cellStyle}`}>
              <span className={labelStyle}>Reg SIC Empresa:</span>
              <span className={valueStyle}>{empresaData?.RegSICEmpresa}</span>
            </div>
          </div>

          <div className={`w-[25%] ${cellStyle}`}>
            <span className={labelStyle}>Nombre :</span>
            <span className={valueStyle}>{empresaData?.nombreSolicitud}</span>
          </div>
        </div>

        <div className="flex w-full h-[20px]">
          <div className={`w-[75%] flex border-r ${border}`}>
            <div className={`w-[45%] border-r ${border} ${cellStyle}`}>
              <span className={labelStyle}>INSTALADOR:</span>
              <span className={valueStyle}>{empresaData?.instalador}</span>
            </div>

            <div className={`w-[15%] border-r ${border} ${cellStyle}`}>
              <span className={labelStyle}>CCL:</span>
              <span className={valueStyle}>{empresaData?.CCL}</span>
            </div>

            <div className={`w-[25%] border-r ${border} ${cellStyle}`}>
              <span className={labelStyle}>Expedido por :</span>
              <span className={valueStyle}>{empresaData?.expedidoPor}</span>
            </div>

            <div className={`w-[15%] ${cellStyle}`}>
              <span className={labelStyle}>Vigencia :</span>
              <span className={valueStyle}>{empresaData?.vigencia}</span>
            </div>
          </div>

          <div className={`w-[25%] ${cellStyle}`}>
            <span className={labelStyle}>Identificación:</span>
            <span className={valueStyle}>
              {empresaData?.identificacionSolicitud}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
