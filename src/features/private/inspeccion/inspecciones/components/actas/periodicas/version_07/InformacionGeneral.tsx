import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";
import { formatDateYMD } from "@/utils/formatDate";
import { formatTimeWithAmPm } from "@/utils/formatHour";

interface Props {
  inspeccion: IActa | undefined;
}

function Box({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[12px] h-[12px] border border-black bg-white">
      {checked ? (
        <span className="-mt-[2px] text-[10px] leading-none font-bold">✓</span>
      ) : null}
    </span>
  );
}

function DigitBox({
  label,
  checked = false,
}: {
  label: string;
  checked?: boolean;
}) {
  return (
    <div className="relative mx-auto flex items-center justify-center w-[16px] h-[16px] border border-black bg-white">
      <span className="text-[9px] leading-none font-semibold">{label}</span>
      {checked && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rotate-12 -mt-[1px] text-[12px] leading-none font-bold text-black">
            ✓
          </span>
        </span>
      )}
    </div>
  );
}

export const InformacionGeneral = ({ inspeccion }: Props) => {
  const primeraVisita = inspeccion?.instalacionExistente?.numeroVisita === 1;
  const segundaVisita = inspeccion?.instalacionExistente?.numeroVisita === 2;
  const terceraVisita = inspeccion?.instalacionExistente?.numeroVisita === 3;

  console.log(inspeccion);

  const hayInspeccionAnterior =
    !!inspeccion?.instalacionExistente?.id_instalacion_existente;

  // Helpers para textos
  const dateInsp = inspeccion?.fecha_inspeccion || "-";
  const dateExp = inspeccion?.fecha_expedicion || "-";
  const dateSol = formatDateYMD(inspeccion?.created_at) || "-";
  const timeStart = formatTimeWithAmPm(inspeccion?.hora_inicio || "");
  const timeEnd = formatTimeWithAmPm(inspeccion?.hora_fin || "");

  const clases = inspeccion?.clasesInspeccion || [];

  const hasClase = (nombre: string) => {
    return clases.some((c) => c.nombre === nombre);
  };

  return (
    <div className="w-full text-[8pt] font-arial text-black border-l border-r border-b border-black box-border">
      {/* Contenedor Flex Principal: Izquierda (Sección 3) | Derecha (Sección 3.1) */}
      <div className="flex w-full">
        {/* =========================================
            BLOQUE IZQUIERDO: 3. INFORMACIÓN GENERAL
           ========================================= */}
        <div className="flex-1 flex flex-col border-r border-black">
          {/* Encabezado Sección 3 */}
          <div className="w-full bg-gray-200 font-bold text-center border-b border-black py-0.5">
            3. INFORMACIÓN GENERAL DE LA INSPECCIÓN
          </div>

          {/* --- FILA SUPERIOR: Fechas, Tipos, Horas, Visita --- */}
          <div className="flex w-full border-b border-black h-[50px]">
            {/* Col 1: Fecha Insp */}
            <div className="flex-1 border-r border-black flex flex-col items-center justify-center p-1 text-center">
              <span className="leading-tight mb-1">Fecha de Inspeccion :</span>
              <span className="font-semibold">{dateInsp}</span>
            </div>

            {/* Col 2: Fecha Exp */}
            <div className="flex-1 border-r border-black flex flex-col items-center justify-center p-1 text-center">
              <span className="leading-tight mb-1">Fecha expedicion:</span>
              <span className="font-semibold">{dateExp}</span>
            </div>

            {/* Col 3: Fecha Solicitud */}
            <div className="flex-1 border-r border-black flex flex-col items-center justify-center p-1 text-center">
              <span className="leading-tight mb-1">Fecha de solicitud:</span>
              <span className="font-semibold">{dateSol}</span>
            </div>

            {/* Col 4: Tipo Revisión */}
            <div className="w-[140px] border-r border-black flex flex-col">
              <div className="flex-1 border-b border-black flex items-center justify-between px-1">
                <span>Revisión Periódica</span>
                <Box checked={!inspeccion?.solicitud_usuario} />
              </div>
              <div className="flex-1 flex items-center justify-between px-1">
                <span>A solicitud del usuario</span>
                <Box checked={inspeccion?.solicitud_usuario} />
              </div>
            </div>

            {/* Col 5: Tipo de Gas */}
            <div className="w-[90px] border-r border-black flex flex-col">
              <div className="h-[18px] border-b border-black text-center font-semibold flex items-center justify-center">
                Tipo de Gas:
              </div>
              <div className="flex-1 flex items-center justify-around px-1">
                <div className="flex items-center gap-1">
                  <span>GN:</span> <Box checked={!inspeccion?.tipo_gas_glp} />
                </div>
                <div className="flex items-center gap-1">
                  <span>GLP</span> <Box checked={inspeccion?.tipo_gas_glp} />
                </div>
              </div>
            </div>

            {/* Col 6: Hora Inicio */}
            <div className="w-[80px] border-r border-black flex flex-col items-center justify-center p-1 text-center">
              <span className="leading-tight mb-1">Hora de Incio:</span>
              <span className="font-semibold">{timeStart}</span>
            </div>

            {/* Col 7: Hora Final */}
            <div className="w-[80px] border-r border-black flex flex-col items-center justify-center p-1 text-center">
              <span className="leading-tight mb-1">Hora Final:</span>
              <span className="font-semibold">{timeEnd}</span>
            </div>

            {/* Col 8: Visita N° */}
            <div className="w-[60px] flex flex-col">
              <div className="h-[18px] border-b border-black text-center flex items-center justify-center">
                Visita N°
              </div>
              <div className="flex-1 flex items-center justify-center gap-1 bg-gray-50">
                <DigitBox label="1" checked={primeraVisita} />
                <DigitBox label="2" checked={segundaVisita} />
                <DigitBox label="3" checked={terceraVisita} />
              </div>
            </div>
          </div>

          {/* --- FILA INFERIOR: 3.2 Trazabilidad --- */}
          <div className="flex w-full flex-1">
            {/* 3.2 Título (Bloque Gris Izquierdo) */}
            <div className="w-[130px] bg-gray-200 border-r border-black flex items-center justify-center p-2 text-center font-bold text-[8pt]">
              3.2. TRAZABILIDAD DE INSPECCIÓN DE LA INSTALACIÓN INTERNA
            </div>

            {/* Columna: Informe Anterior SI/NO */}
            <div className="w-[80px] border-r border-black flex flex-col justify-center px-1">
              <div className="flex items-center justify-between mb-1">
                <span>Informe de</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span>inspección</span> <span className="font-bold">SI</span>{" "}
                <Box checked={hayInspeccionAnterior} />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="font-bold">NO</span>{" "}
                <Box checked={!hayInspeccionAnterior} />
              </div>
            </div>

            {/* Columna: Fecha Anterior / Certificado */}
            <div className="flex-1 border-r border-black flex flex-col">
              <div className="flex-1 border-b border-black flex items-center px-1">
                <span className="mr-2">Fecha de Inspección anterior:</span>
                <span className="font-semibold">
                  {formatDateYMD(inspeccion?.instalacionExistente?.createdAt)}
                </span>
              </div>
              <div className="flex-1 flex items-center px-1">
                <span className="mr-2"># de certificado:</span>
                <span className="font-semibold">
                  {inspeccion?.numero_certificado}
                </span>
              </div>
            </div>

            {/* Columna: Puesta Servicio / Reforma */}
            <div className="flex-1 border-r border-black flex flex-col">
              <div className="flex-1 border-b border-black flex items-center px-1">
                <span className="mr-2 leading-tight">
                  Fecha puesta <br /> en servicio
                </span>
                <span className="font-semibold text-center flex-1">
                  {inspeccion?.fecha_puesta_en_servicio}
                </span>
              </div>
              <div className="flex-1 flex items-center justify-between px-1">
                <span className="mr-1">Reforma</span>
                <div className="flex items-center gap-1">
                  <span>SI</span> <Box />
                </div>
                <div className="flex items-center gap-1">
                  <span>NO</span> <Box />
                </div>
              </div>
            </div>

            {/* Columna: Reemplazo / Adición */}
            <div className="w-[180px] flex flex-col">
              <div className="h-[20px] border-b border-black text-center flex items-center justify-center font-semibold bg-gray-50">
                Reemplazo o Adición de informe
              </div>
              <div className="flex-1 flex">
                <div className="w-[80px] border-r border-black flex flex-col justify-center px-1">
                  <div className="flex items-center justify-between mb-1">
                    <span>Reemplazo</span>{" "}
                    <Box checked={inspeccion?.reemplazo_informe} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Adición</span>{" "}
                    <Box checked={!inspeccion?.reemplazo_informe} />
                  </div>
                </div>
                <div className="flex-1 p-1 flex items-start">
                  <span className="mr-1">N°:</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            BLOQUE DERECHO: 3.1 CLASE DE USO
           ========================================= */}
        <div className="w-[110px] flex flex-col">
          <div className="h-[22px] border-b border-black font-bold text-center flex items-center justify-center bg-gray-200">
            3.1. Clase de uso
          </div>

          <div className="flex-1 flex flex-col justify-around py-1 px-2">
            <div className="flex items-center justify-between">
              <span>Comercial:</span>
              <Box checked={hasClase("COMERCIAL")} />
            </div>
            <div className="flex items-center justify-between">
              <span>Residencial:</span>
              <Box checked={hasClase("RESIDENCIAL")} />
            </div>
            <div className="flex items-center justify-between">
              <span>Multiusuario:</span>
              <Box checked={hasClase("MULTIUSUARIO")} />
            </div>
            <div className="flex items-center justify-between">
              <span>Uniusuario:</span>
              <Box checked={hasClase("UNIUSUARIO")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
