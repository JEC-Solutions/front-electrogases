import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";
import { formatDateYMD } from "@/utils/formatDate";
import { formatTimeWithAmPm } from "@/utils/formatHour";

interface Props {
  inspeccion: IActa | undefined;
}

function Box({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex items-center justify-center w-[12px] h-[12px] border border-black">
      {checked ? (
        <span className="-mt-[2px] text-[10px] leading-none">✓</span>
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
    <div className="relative mx-auto flex items-center justify-center w-[20px] h-[18px] border border-black">
      {/* número */}
      <span className="text-[11px] leading-none">{label}</span>
      {/* marca (simulamos el “chulo” inclinado del formulario) */}
      {checked && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rotate-12 -mt-[1px] text-[12px] leading-none">
            ✓
          </span>
        </span>
      )}
    </div>
  );
}

export const InformacionGeneral = ({ inspeccion }: Props) => {
  const primeraVisita = inspeccion?.instalacionExistente === null;
  const segundaVisita = inspeccion?.instalacionExistente.numeroVisita === 2;
  const terceraVisita = inspeccion?.instalacionExistente.numeroVisita === 3;

  const hayInspeccionAnterior =
    !!inspeccion?.instalacionExistente?.id_instalacion_existente;

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="w-max">
        <div className="border border-black text-xs leading-tight box-border">
          {/* Título */}
          <div className="px-2 py-1 border-b border-black bg-gray-100 font-bold text-center">
            3. INFORMACIÓN GENERAL DE LA INSPECCIÓN
          </div>

          {/* Grid principal: 9 columnas (como tu layout anterior) x 3 filas de contenido */}
          <div className="grid grid-cols-[205px_205px_200px_190px_130px_120px_120px_87px_178px] grid-rows-[60px_96px_96px]">
            {/* ===== Fila 1 (arriba): S1..S9 y S10 arrancando ===== */}
            <div className="border-b border-r border-black px-2 py-1">
              <span className="font-semibold">Fecha de Inspección: </span>
              <span className="min-h-[22px]">
                {inspeccion?.fecha_inspeccion}
              </span>
            </div>
            <div className="border-b border-r border-black px-2 py-1">
              <span className="font-semibold">Fecha expedición: </span>
              <span className="min-h-[22px]">
                {inspeccion?.fecha_expedicion}
              </span>
            </div>
            <div className="border-b border-r border-black px-2 py-1">
              <span className="font-semibold">Fecha de solicitud: </span>
              <span className="min-h-[22px]">
                {formatDateYMD(inspeccion?.created_at)}
              </span>
            </div>

            {/* S4/S5: celda anidada (arriba/abajo dentro de la misma columna) */}
            <div className="border-r border-b border-black grid grid-rows-[24px_1fr]">
              {/* S4 */}
              <div className="flex items-center justify-between px-2 border-b border-black h-[24px]">
                <span className="font-semibold">Revisión Periódica</span>
                {/* pequeña columna para la casilla */}
                <span className="w-[18px] h-full border-l border-black flex items-center justify-center">
                  <Box checked={!inspeccion?.solicitud_usuario} />
                </span>
              </div>

              {/* S5 */}
              <div className="flex items-center justify-between px-2 h-full">
                <span>A solicitud del usuario</span>
                <span className="w-[18px] h-full border-l border-black flex items-center justify-center">
                  <Box checked={inspeccion?.solicitud_usuario} />
                </span>
              </div>
            </div>

            <div className="border-r border-b border-black grid grid-rows-[18px_1fr]">
              {/* Encabezado */}
              <div className="px-2 border-b border-black text-[10px] font-semibold leading-none flex items-center">
                Tipo de Gas.
              </div>

              {/* Opciones */}
              <div className="px-2 h-full flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span className="font-semibold">GN:</span>
                  <Box checked={!inspeccion?.tipo_gas_glp} />
                </span>

                <span className="flex items-center gap-1">
                  <span className="font-semibold">GLP</span>
                  <Box checked={inspeccion?.tipo_gas_glp} />
                </span>
              </div>
            </div>
            <div className="border-b border-r border-black px-2 py-1">
              <span className="font-semibold">Hora de inicio: </span>
              <span className=" min-h-[22px]">
                {formatTimeWithAmPm(inspeccion?.hora_inicio || "")}
              </span>
            </div>
            <div className="border-b border-r border-black px-2 py-1">
              <span className="font-semibold">Hora de final: </span>
              <span className=" min-h-[22px]">
                {formatTimeWithAmPm(inspeccion?.hora_fin || "")}
              </span>
            </div>
            <div className="border-r border-b border-black grid grid-rows-[18px_1fr]">
              {/* Título */}
              <div className="text-[10px] font-semibold text-center leading-none border-b border-black">
                Visita N°
              </div>

              {/* 1 | 2 | 3 */}
              <div className="flex items-center justify-center gap-1 pt-1">
                <DigitBox label="1" checked={primeraVisita} />
                <DigitBox label="2" checked={segundaVisita} />
                <DigitBox label="3" checked={terceraVisita} />
              </div>
            </div>

            {/* S10 ocupa toda la derecha (3 filas) */}
            <div className="row-span-3 grid grid-rows-[18px_24px_24px_24px_24px]">
              {/* Encabezado */}
              <div className="px-2 bg-gray-100 font-bold text-[10px] text-center leading-none border-b border-black">
                3.1. Clase de uso
              </div>

              {/* Comercial */}
              <div className="px-2 flex items-center justify-between border-b border-black">
                <span className="font-semibold">Comercial:</span>
                <Box />
              </div>

              {/* Residencial (✓) */}
              <div className="px-2 flex items-center justify-between border-b border-black">
                <span className="font-semibold">Residencial:</span>
                <Box />
              </div>

              {/* Multiusuario (✓) */}
              <div className="px-2 flex items-center justify-between border-b border-black">
                <span className="font-semibold">Multiusuario:</span>
                <Box />
              </div>

              {/* Uniusuario */}
              <div className="px-2 flex items-center justify-between">
                <span className="font-semibold">Uniusuario:</span>
                <Box />
              </div>
            </div>

            {/* ===== Fila 2 (medio): S11, S12, S13, S15, S17 ===== */}
            {/* S11 y S12 ocupan 2 filas (medio + abajo) */}
            <div className="row-span-2 border-r border-black flex items-center justify-center bg-gray-100">
              <p className="font-bold px-2">
                3.2 TRAZABILIAD DE INSPECCION DE LA INSTACIÓN INTERNA
              </p>
            </div>

            <div className="row-span-2 border-r border-black flex-col items-center justify-center">
              {/* Encabezado */}
              <div className="px-2 border-b border-black font-semibold leading-none flex items-center">
                Informe de inspección anterior.
              </div>
              <div className="px-2 h-full flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span className="font-semibold">SI</span>
                  <Box checked={hayInspeccionAnterior} />
                </span>

                <span className="flex items-center gap-1">
                  <span className="font-semibold">NO</span>
                  <Box checked={!hayInspeccionAnterior} />
                </span>
              </div>
            </div>

            {/* S13 (arriba de S14) en la col 3 */}
            <div className="px-2 py-1 border-r border-b border-black flex-col items-center justify-center">
              <span className="font-semibold">
                Fecha de Inspección anterior:{" "}
              </span>
              <span className="min-h-[22px]">
                {formatDateYMD(inspeccion?.instalacionExistente.createdAt)}
              </span>
            </div>

            {/* S15 ocupa varias columnas en esta fila (cols 4 a 7) */}
            <div className="px-2 py-1 border-r border-b border-black flex-col items-center justify-center">
              <span className="font-semibold">Fecha puesta en servicio: </span>
              <span className="min-h-[22px]">
                {inspeccion?.fecha_puesta_en_servicio}
              </span>
            </div>

            {/* S17 (al extremo derecho antes de S10) en la col 8 */}
            <div className="col-span-4 border-r border-b border-black flex items-center justify-center bg-gray-100">
              <p className="font-bold px-2">Reemplazo o adicion de informe</p>
            </div>

            {/* ===== Fila 3 (abajo): S14, S16, S18 ===== */}
            {/* S14 (debajo de S13) */}
            <div className="px-2 py-1 border-r border-black flex-col items-center justify-center">
              <span className="font-semibold"># de certificado: </span>
              <span className="min-h-[22px]">
                {inspeccion?.numero_certificado}
              </span>
            </div>

            {/* S16 (puente central) — ocupa cols 4 y 5 en la última fila */}
            <div className=" border-r border-black flex-col items-center justify-center">
              {/* Encabezado */}
              <div className="px-2 border-b border-black font-semibold leading-none flex items-center">
                Reforma
              </div>
              <div className="px-2 h-full flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span className="font-semibold">SI</span>
                  <Box />
                </span>

                <span className="flex items-center gap-1">
                  <span className="font-semibold">NO</span>
                  <Box />
                </span>
              </div>
            </div>

            {/* S18 (bloque grande inferior derecho) — ocupa cols 6 a 8 en la última fila */}
            <div className="col-span-4 border-r border-black grid grid-cols-[130px_1fr]">
              {/* Izquierda: opciones (2 renglones) */}
              <div className="grid grid-rows-2 border-r">
                <div className="px-2 flex items-center justify-between border-b border-black">
                  <span className="font-semibold">Reemplazo</span>
                  <Box checked={inspeccion?.reemplazo_informe}/>
                </div>
                <div className="px-2 flex items-center justify-between">
                  <span className="font-semibold">Adición</span>
                  <Box checked={!inspeccion?.reemplazo_informe}/>
                </div>
              </div>

              {/* Derecha: N° (ocupa el alto completo) */}
              <div className="px-2 grid grid-rows-[28px_1fr]">
                <div className="flex items-center gap-1 border-b border-black">
                  <span className="font-semibold">N°:</span>
                  {/* línea para el número */}
                  <span className="flex-1 h-[18px] border-b border-black" />
                </div>
                {/* espacio en blanco inferior, como en el formato */}
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
