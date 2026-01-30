import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion?: IActa | undefined;
}

const Box = ({ checked = false }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[10px] h-[10px] border border-black bg-white ml-[2px] align-middle">
    {checked && (
      <span className="text-[8px] font-bold leading-none -mt-[2px]">X</span>
    )}
  </span>
);

const DocCheckCell = ({
  label,
  className = "",
  state,
}: {
  label: string;
  className?: string;
  state?: "SI" | "NO" | "NA";
}) => (
  <div
    className={`flex flex-col justify-between p-[1px] border-r border-black ${className}`}
  >
    <div className="leading-tight text-center text-[6.5pt]">{label}</div>
    <div className="flex justify-center items-center gap-[2px] text-[6pt]">
      <span className="font-semibold">Cumple</span>
      <span>SI</span> <Box checked={state === "SI"} />
      <span>NO</span> <Box checked={state === "NO"} />
      <span>NA</span> <Box checked={state === "NA"} />
    </div>
  </div>
);

const NormaRow = ({ label }: { label: string }) => (
  <div className="flex items-center border-b border-black h-[16px]">
    <div className="flex-1 px-1 border-r border-black truncate" title={label}>
      {label}
    </div>
    <div className="w-[22px] border-r border-black flex justify-center items-center">
      <Box />
    </div>
    <div className="w-[22px] border-r border-black flex justify-center items-center">
      <Box />
    </div>
    <div className="w-[22px] flex justify-center items-center">
      <Box />
    </div>
  </div>
);

const NormaHeader = ({ title }: { title: string }) => (
  <div className="flex border-b border-black h-[16px] bg-gray-50 items-center">
    <div
      className="flex-1 px-1 border-r border-black font-semibold truncate leading-none"
      title={title}
    >
      {title}
    </div>
    <div className="w-[38px] border-r border-black text-center font-bold text-[6pt]">
      CUMPLE
    </div>
    <div className="w-[22px] border-r border-black text-center font-bold text-[6pt]">
      SI
    </div>
    <div className="w-[22px] border-r border-black text-center font-bold text-[6pt]">
      NO
    </div>
    <div className="w-[22px] text-center font-bold text-[6pt]">NA</div>
  </div>
);

export const EvaluacionDocumentacion = ({ inspeccion }: Props) => {
  const border = "border-black";
  const textClass = "text-[7pt] font-arial leading-tight text-black";
  console.log(inspeccion);
  return (
    <div
      className={`w-full border ${border} ${textClass} box-border mt-[-1px]`}
    >
      <div
        className={`w-full border-b ${border} bg-gray-200 font-bold text-center py-[2px] text-[7.5pt]`}
      >
        3.7. EVALUACIÓN DE LA DOCUMENTACIÓN Y NORMATIVIDAD APLICABLES (donde
        aplique las resoluciones 90902 de 2013 y 41385 de 2017)
      </div>

      <div className={`flex w-full border-b ${border}`}>
        <div className={`w-[50%] flex flex-col border-r ${border}`}>
          <div className={`flex w-full border-b ${border} h-[40px]`}>
            <DocCheckCell label="CCL del instalador:" className="w-[40%]" />
            <DocCheckCell
              label="Certficado o Declaración de conformidad de los materiales:"
              className="flex-1 border-r-0"
            />
          </div>
          <div className="flex w-full h-[40px]">
            <DocCheckCell
              label="Diseño aprobado por el distribuidor"
              className="w-[33%]"
            />
            <DocCheckCell
              label="Isometrico de la instalación:"
              className="w-[33%]"
            />
            <DocCheckCell
              label="Memoria de Calculo Cumple:"
              className="flex-1 border-r-0"
            />
          </div>
        </div>

        <div className="w-[50%] flex flex-col font-arial text-[6.5pt]">
          <div
            className={`flex border-b ${border} text-center font-semibold bg-gray-50`}
          >
            <div className={`w-[18%] border-r ${border} py-[2px]`}>
              Material
            </div>
            <div className={`w-[32%] border-r ${border} py-[2px]`}>Tipo</div>
            <div className={`w-[25%] border-r ${border} py-[2px]`}>Marca</div>
            <div className="flex-1 py-[2px]"># de Certificado</div>
          </div>
          <div className={`flex border-b ${border} h-[32px]`}>
            <div
              className={`w-[18%] border-r ${border} flex items-center justify-center text-center px-1`}
            >
              Tubería y Accesorios
            </div>
            <div
              className={`w-[32%] border-r ${border} flex flex-col justify-center px-1`}
            >
              <div className="flex justify-between items-center mb-[1px]">
                <span>Multi capa</span>
                <Box /> <span className="ml-1">Galvanizado</span>
                <Box />
              </div>
              <div className="flex justify-between items-center">
                <span>Cobre</span>
                <Box /> <span className="ml-1">Otro</span>
                <Box />
              </div>
            </div>
            <div className={`w-[25%] border-r ${border}`}></div>
            <div className="flex-1"></div>
          </div>
          <div className={`flex border-b ${border} h-[16px]`}>
            <div
              className={`w-[18%] border-r ${border} flex items-center px-1`}
            >
              Valvulas
            </div>
            <div
              className={`w-[32%] border-r ${border} text-center text-gray-400 italic flex items-center justify-center`}
            >
              si aplica
            </div>
            <div className={`w-[25%] border-r ${border}`}></div>
            <div className="flex-1"></div>
          </div>
          <div className="flex h-[16px]">
            <div
              className={`w-[18%] border-r ${border} flex items-center px-1`}
            >
              otro (cual)
            </div>
            <div
              className={`w-[32%] border-r ${border} text-center text-gray-400 italic flex items-center justify-center`}
            >
              si aplica
            </div>
            <div className={`w-[25%] border-r ${border}`}></div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>

      <div className="flex w-full font-arial text-[6.5pt]">
        <div className={`w-[30%] border-r ${border} flex flex-col`}>
          <div
            className={`flex items-center justify-between px-1 border-b ${border} h-[18px]`}
          >
            <span>Registro SIC del instalador:</span>
            <div className="flex items-center gap-[2px]">
              <span className="font-semibold">Cumple SI</span>
              <Box /> <span>NO</span>
              <Box /> <span>NA</span>
              <Box />
            </div>
          </div>
          <NormaHeader title="NTC 2505 4 ta Actualización:" />
          <NormaRow label="Diseño" />
          <div className="flex items-center h-[16px]">
            <div className="flex-1 px-1 border-r border-black truncate">
              Construccion
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Box />
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Box />
            </div>
            <div className="w-[22px] flex justify-center items-center">
              <Box />
            </div>
          </div>
        </div>

        <div className={`w-[35%] border-r ${border} flex flex-col`}>
          <div
            className={`flex items-center justify-between px-1 border-b ${border} h-[18px]`}
          >
            <span className="truncate mr-1">
              Carta de la disponibilidad del servicio por distribuidor:
            </span>
            <div className="flex items-center gap-[1px]">
              <span className="font-semibold">Cumple SI</span>
              <Box /> <span>NO</span>
              <Box /> <span>NA</span>
              <Box />
            </div>
          </div>
          <NormaHeader title="NTC 3838 3ra actualización" />
          <NormaRow label="MPOP linea individual comercial" />
          <div className="flex items-center h-[16px]">
            <div className="flex-1 px-1 border-r border-black truncate">
              MPOP linea individual residencial
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Box />
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Box />
            </div>
            <div className="w-[22px] flex justify-center items-center">
              <Box />
            </div>
          </div>
        </div>

        <div className="w-[35%] flex flex-col">
          <NormaHeader title="3833 1ra actualización:" />

          <NormaRow label="Dimensionamiento Sistema Evacuación de los Productos de la Combustión" />
          <NormaRow label="Construccion Sistema Evacuación de los Productos de la Combustión" />
          <div className="flex items-center h-[16px]">
            <div className="flex-1 px-1 border-r border-black truncate">
              Montaje Sistema Evacuación de los Productos de la Combustión
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Box />
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Box />
            </div>
            <div className="w-[22px] flex justify-center items-center">
              <Box />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
