import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";
import { formatDateYMD } from "@/utils/formatDate";
import { formatTimeWithAmPm } from "@/utils/formatHour";

interface Props {
  inspeccion: IActa | undefined;
}

const Box = ({ checked = false }: { checked?: boolean }) => (
  <div className="w-[11px] h-[11px] border border-black bg-white flex items-center justify-center">
    {checked && (
      <span className="text-[9px] font-bold leading-none mb-[1px]">✓</span>
    )}
  </div>
);

const DigitBox = ({
  label,
  checked = false,
}: {
  label: string;
  checked?: boolean;
}) => (
  <div className="w-[14px] h-[14px] border border-black bg-white flex items-center justify-center relative">
    <span className="text-[8pt] leading-none">{label}</span>
    {checked && (
      <span className="absolute inset-0 flex items-center justify-center font-bold text-lg opacity-50">
        ✓
      </span>
    )}
  </div>
);

export const InformacionGeneral = ({ inspeccion }: Props) => {
  const visita = inspeccion?.instalacionExistente?.numeroVisita || 0;
  const fechaAnt = formatDateYMD(inspeccion?.fecha_instalacion_anterior);
  const certAnt = inspeccion?.numero_certificado;
  const puestaServicio = inspeccion?.fecha_puesta_en_servicio;
  const isReforma = false;
  const isReemplazo = inspeccion?.reemplazo_informe;
  const nroInforme = inspeccion?.numero_informe;

  const border = "border-black";
  const bgHeader = "bg-[#e5e7eb]";
  const textSmall = "text-[7pt] leading-tight";
  const cellPadding = "p-[2px]";

  const hasClase = (nombre: string) =>
    inspeccion?.clasesInspeccion?.some((c) => c.nombre === nombre);

  return (
    <div
      className={`w-full border-b border-l border-r ${border} font-arial text-black box-border`}
    >
      <div className="flex w-full">
        <div className={`flex-1 flex flex-col border-r ${border}`}>
          <div
            className={`${bgHeader} border-b ${border} font-bold text-center text-[7pt] py-[1px]`}
          >
            3. INFORMACIÓN GENERAL DE LA INSPECCIÓN
          </div>

          <div className="flex h-[42px]">
            <div
              className={`flex-1 border-r ${border} flex flex-col items-center justify-between ${cellPadding} ${textSmall}`}
            >
              <span>Fecha de Inspeccion :</span>
              <span className="font-semibold">
                {inspeccion?.fecha_inspeccion || "-"}
              </span>
            </div>
            <div
              className={`flex-1 border-r ${border} flex flex-col items-center justify-between ${cellPadding} ${textSmall}`}
            >
              <span>Fecha expedicion:</span>
              <span className="font-semibold">
                {inspeccion?.fecha_expedicion || "-"}
              </span>
            </div>
            <div
              className={`flex-1 border-r ${border} flex flex-col items-center justify-between ${cellPadding} ${textSmall}`}
            >
              <span>Fecha de solicitud:</span>
              <span className="font-semibold">
                {formatDateYMD(inspeccion?.fecha_solicitud) || "-"}
              </span>
            </div>

            <div
              className={`w-[130px] border-r ${border} flex flex-col justify-center px-1 ${textSmall}`}
            >
              <div className="flex items-center justify-between mb-[2px]">
                <span>Revisión Periódica</span>{" "}
                <Box checked={!inspeccion?.solicitud_usuario} />
              </div>
              <div className="flex items-center justify-between">
                <span>A solicitud del usuario</span>{" "}
                <Box checked={inspeccion?.solicitud_usuario} />
              </div>
            </div>

            <div
              className={`w-[85px] border-r ${border} flex flex-col ${textSmall}`}
            >
              <div className="flex items-center justify-center border-b border-black h-[50%]">
                Tipo de Gas:
              </div>
              <div className="flex items-center justify-around h-[50%]">
                <div className="flex items-center gap-1">
                  GN: <Box checked={!inspeccion?.tipo_gas_glp} />
                </div>
                <div className="flex items-center gap-1">
                  GLP <Box checked={inspeccion?.tipo_gas_glp} />
                </div>
              </div>
            </div>

            <div
              className={`flex-1 border-r ${border} flex flex-col items-center justify-between ${cellPadding} ${textSmall}`}
            >
              <span>Hora de Incio:</span>
              <span className="font-semibold">
                {formatTimeWithAmPm(inspeccion?.hora_inicio || "")}
              </span>
            </div>
            <div
              className={`flex-1 border-r ${border} flex flex-col items-center justify-between ${cellPadding} ${textSmall}`}
            >
              <span>Hora Final:</span>
              <span className="font-semibold">
                {formatTimeWithAmPm(inspeccion?.hora_fin || "")}
              </span>
            </div>

            <div className={`w-[55px] flex flex-col ${textSmall}`}>
              <div className="flex items-center justify-center border-b border-black h-[50%]">
                Visita N°
              </div>
              <div className="flex items-center justify-center gap-[2px] h-[50%]">
                <DigitBox label="1" checked={visita === 1} />
                <DigitBox label="2" checked={visita === 2} />
                <DigitBox label="3" checked={visita === 3} />
              </div>
            </div>
          </div>

          <div className={`flex border-t ${border} h-[45px]`}>
            <div
              className={`w-[140px] ${bgHeader} border-r ${border} flex items-center justify-center text-center font-bold text-[7pt] p-1`}
            >
              3.2. TRAZABILIDAD DE LA INSTALACIÓN INTERNA
            </div>

            <div
              className={`w-[90px] border-r ${border} flex items-center px-1 ${textSmall}`}
            >
              <div className="flex-1 leading-none mr-1">
                Informe de inspección anterior
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <div className="flex items-center gap-1 text-[6.5pt]">
                  SI{" "}
                  <Box
                    checked={
                      inspeccion?.instalacionExistente?.inspeccionAnterior
                    }
                  />
                </div>
                <div className="flex items-center gap-1 text-[6.5pt]">
                  NO{" "}
                  <Box
                    checked={
                      !inspeccion?.instalacionExistente?.inspeccionAnterior
                    }
                  />
                </div>
              </div>
            </div>

            <div className={`flex-1 border-r ${border} flex flex-col`}>
              <div
                className={`flex-1 border-b ${border} flex items-center px-1 ${textSmall}`}
              >
                <span className="mr-auto">Fecha de Inspección anterior:</span>
                <span className="font-semibold mx-2">{fechaAnt || "-"}</span>
              </div>
              <div className={`flex-1 flex items-center px-1 ${textSmall}`}>
                <span className="mr-auto"># de certificado:</span>
                <span className="font-semibold mx-2">{certAnt}</span>
              </div>
            </div>

            <div className={`flex-1 border-r ${border} flex flex-col`}>
              <div
                className={`flex-1 border-b ${border} flex items-center px-1 ${textSmall}`}
              >
                <span className="mr-auto leading-none">
                  Fecha puesta
                  <br />
                  en servicio
                </span>
                <span className="font-semibold mx-2">
                  {puestaServicio || "-"}
                </span>
              </div>
              <div className={`flex-1 flex items-center px-1 ${textSmall}`}>
                <span className="mr-auto">Reforma</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    SI <Box checked={isReforma} />
                  </div>
                  <div className="flex items-center gap-1">
                    NO <Box checked={!isReforma} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`w-[140px] flex flex-col ${textSmall}`}>
              <div
                className={`border-b bg-[#e5e7eb] ${border} text-center h-[16px] flex items-center justify-center font-semibold`}
              >
                Reemplazo o Adición de informe
              </div>
              <div className="flex flex-1">
                <div className="flex-1 flex flex-col justify-center pl-1 gap-1">
                  <div className="flex justify-between pr-1">
                    Reemplazo <Box checked={isReemplazo} />
                  </div>
                  <div className="flex justify-between pr-1">
                    Adición <Box checked={!isReemplazo && false} />
                  </div>
                </div>
                <div
                  className={`w-[40px] border-l ${border} flex items-end justify-center pb-1`}
                >
                  N°:
                  <span className="font-semibold">{nroInforme || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-[100px] flex flex-col ${textSmall}`}>
          <div
            className={`${bgHeader} border-b ${border} font-bold text-center py-[2px] h-[22px] flex items-center justify-center`}
          >
            3.1. Clase de uso
          </div>
          <div className="flex-1 flex flex-col justify-around px-2 py-1">
            <div className="flex justify-between items-center">
              Comercial: <Box checked={hasClase("COMERCIAL")} />
            </div>
            <div className="flex justify-between items-center">
              Residencial: <Box checked={hasClase("RESIDENCIAL")} />
            </div>
            <div className="flex justify-between items-center">
              Multiusuario: <Box checked={hasClase("MULTIUSUARIO")} />
            </div>
            <div className="flex justify-between items-center">
              Uniusuario: <Box checked={hasClase("UNIUSUARIO")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
