import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";
import { formatDateYMD } from "@/utils/formatDate";
import { formatTimeWithAmPm } from "@/utils/formatHour";

interface Props {
  inspeccion: IActa | undefined;
}

const Box = ({ checked = false }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[10px] h-[10px] border border-black bg-white ml-1">
    {checked && (
      <span className="text-[8px] font-bold leading-none -mt-[1px]">✓</span>
    )}
  </span>
);

export const InformacionGeneral = ({ inspeccion }: Props) => {
  const fechaInsp = inspeccion?.fecha_inspeccion || "-";
  const fechaExp = inspeccion?.fecha_expedicion || "-";
  const fechaSol = formatDateYMD(inspeccion?.created_at) || "-";
  const horaInicio = formatTimeWithAmPm(inspeccion?.hora_inicio || "");
  const horaFin = formatTimeWithAmPm(inspeccion?.hora_fin || "");

  const isNueva = true;
  const isReforma = false;

  const edifNueva = true;
  const edifExistente = false;

  const hayInformeAnt = !!inspeccion?.instalacionExistente;
  const fechaAnt = formatDateYMD(inspeccion?.instalacionExistente?.createdAt);
  const cert = inspeccion?.numero_certificado;
  const solUsuario = inspeccion?.solicitud_usuario;
  const reemplazo = inspeccion?.reemplazo_informe;

  const hasClase = (nombre: string) =>
    inspeccion?.clasesInspeccion?.some((c) => c.nombre === nombre);

  const border = "border-black";
  const textSmall = "text-[6.5pt] font-arial leading-tight text-black";
  const bgHeader = "bg-gray-200";

  return (
    <div
      className={`w-full border-r border-l border-b ${border} box-border ${textSmall}`}
    >
      <div className="flex w-full">
        <div className={`flex-1 flex flex-col border-r ${border}`}>
          <div
            className={`${bgHeader} border-b ${border} font-bold text-center py-[1px] text-[7pt]`}
          >
            3. INFORMACIÓN GENERAL DE LA INSPECCIÓN
          </div>

          <div className="flex h-[35px] w-full">
            <div
              className={`w-[14%] border-r ${border} flex flex-col justify-between p-[2px]`}
            >
              <span>Fecha de Inspección:</span>
              <span className="text-center font-semibold">{fechaInsp}</span>
            </div>

            <div
              className={`w-[14%] border-r ${border} flex flex-col justify-between p-[2px]`}
            >
              <span>Fecha de Expedición:</span>
              <span className="text-center font-semibold">{fechaExp}</span>
            </div>

            <div
              className={`w-[13%] border-r ${border} flex items-center justify-center`}
            >
              <div className="flex flex-col justify-center gap-1 w-full px-1">
                <div className="flex justify-between items-center">
                  <span>Instalación Nueva</span> <Box checked={isNueva} />
                </div>
                <div className="flex justify-between items-center">
                  <span>Reforma</span> <Box checked={isReforma} />
                </div>
              </div>
            </div>

            <div
              className={`w-[14%] border-r ${border} flex flex-col justify-center px-1`}
            >
              <div className="text-center mb-[1px]">Tipo de edificación</div>
              <div className="flex justify-around">
                <div className="flex items-center">
                  Nueva <Box checked={edifNueva} />
                </div>
                <div className="flex items-center">
                  Existente <Box checked={edifExistente} />
                </div>
              </div>
            </div>

            <div
              className={`w-[11%] border-r ${border} flex flex-col justify-center px-1`}
            >
              <div className="text-center mb-[1px]">Tipo de Gas:</div>
              <div className="flex justify-around">
                <div className="flex items-center">
                  GN: <Box checked={!inspeccion?.tipo_gas_glp} />
                </div>
                <div className="flex items-center">
                  GLP: <Box checked={inspeccion?.tipo_gas_glp} />
                </div>
              </div>
            </div>

            <div
              className={`w-[17%] border-r ${border} flex flex-col justify-between p-[2px]`}
            >
              <span>Hora de Incio:</span>
              <span className="text-center font-semibold">{horaInicio}</span>
            </div>

            <div className={`flex-1 flex flex-col justify-between p-[2px]`}>
              <span>Hora Final:</span>
              <span className="text-center font-semibold">{horaFin}</span>
            </div>
          </div>

          <div className={`flex border-t ${border} h-[45px]`}>
            <div
              className={`w-[18%] border-r ${border} font-bold flex flex-col justify-center text-center p-[2px] bg-gray-50`}
            >
              <span>
                3.2. TRAZABILIDAD DE INSPECCIÓN DE INSTALACIÓN INTERNA
              </span>
              <span className="text-[6pt] font-normal">
                (aplica para reforma )
              </span>
            </div>

            <div className={`flex-1 flex flex-col`}>
              <div className={`flex-1 border-b ${border} flex`}>
                <div
                  className={`w-[35%] border-r ${border} flex items-center justify-between px-1`}
                >
                  <span>Informe de Inspección anterior:</span>
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      SI <Box checked={hayInformeAnt} />
                    </div>
                    <div className="flex items-center">
                      NO <Box checked={!hayInformeAnt} />
                    </div>
                  </div>
                </div>
                <div
                  className={`w-[35%] border-r ${border} flex items-center justify-between px-1`}
                >
                  <span>Fecha de Inspección anterior:</span>
                  <span className="font-semibold">{fechaAnt || "-   -"}</span>
                </div>
                <div
                  className={`flex-1 flex items-center justify-between px-1`}
                >
                  <span>Fecha de Solicitud</span>
                  <span className="font-semibold">{fechaSol}</span>
                </div>
              </div>

              <div className="flex-1 flex">
                <div
                  className={`w-[35%] border-r ${border} flex items-center justify-between px-1`}
                >
                  <span>Inspeccion a solicitud del usuario</span>
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      SI <Box checked={solUsuario} />
                    </div>
                    <div className="flex items-center">
                      NO <Box checked={!solUsuario} />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex items-center px-1">
                  <span className="mr-2">Numero de certficado:</span>
                  <span className="font-semibold">{cert}</span>
                </div>
              </div>
            </div>

            <div className={`w-[18%] border-l ${border} flex flex-col`}>
              <div
                className={`border-b bg-gray-200 font-semibold ${border} text-center py-[1px]`}
              >
                Reemplazo o Adición de informe
              </div>
              <div className="flex flex-1">
                <div
                  className={`w-[60%] border-r ${border} flex flex-col justify-center px-1`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span>Reemplazo</span> <Box checked={reemplazo} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Adición</span> <Box checked={!reemplazo && false} />
                  </div>
                </div>
                <div className="flex-1 flex items-end justify-center pb-1 font-bold">
                  N°:
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-[14%] flex flex-col border-l-0`}>
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
