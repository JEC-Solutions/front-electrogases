import { SeccionIsometricoPlantaVolumenes } from "./SeccionIsometricoPlantaVolumenes";
import { Section10Declaracion } from "./Section10Declaracion";
import { Section11y12 } from "./Section11y12";
import { Section8FilaCompacta } from "./Section8FilaCompacta";
import { SectionDefectologia } from "./SectionDefectologia";
import { SectionEquipos } from "./SectionEquipos";
import { TablaEvalVentilacion } from "./TablaEvalVentilacion";

type Props = { rows?: number; className?: string };

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

// 4. EVALUACIÓN DE LOS RECINTOS Y TIPOS DE ARTEFACTOS (layout como la imagen)
function EvalRecintosTablaSimple({ rows = 5, className = "" }: Props) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-[1248px] table-fixed border-collapse border border-black text-[11px] leading-none">
        {/* Anchos de columnas (8 por lado = 16 total) */}
        <colgroup>
          <col className="w-[180px]" />
          <col className="w-[90px]" />
          <col className="w-[110px]" />
          <col className="w-[140px]" />
          <col className="w-[140px]" />
          <col className="w-[28px]" />
          <col className="w-[28px]" />
          <col className="w-[28px]" />
          {/* derecha */}
          <col className="w-[180px]" />
          <col className="w-[90px]" />
          <col className="w-[110px]" />
          <col className="w-[140px]" />
          <col className="w-[140px]" />
          <col className="w-[28px]" />
          <col className="w-[28px]" />
          <col className="w-[28px]" />
        </colgroup>

        <thead>
          {/* Fila 1: textos */}
          <tr className="bg-gray-100">
            <th className="border border-black py-1">Tipo de Recinto</th>
            <th className="border border-black py-1">Id. Recinto</th>
            <th className="border border-black py-1">Id. Artefacto</th>
            <th className="border border-black py-1">
              Potencia Instalada (kW)
            </th>
            <th className="border border-black py-1">Potencia Total en (kW)</th>
            <th className="border border-black py-1" colSpan={3}>
              Tipo artefacto
            </th>

            {/* derecha (con borde central marcado) */}
            <th className="border border-black py-1 border-l-2">
              Tipo de Recinto
            </th>
            <th className="border border-black py-1">Id. Recinto</th>
            <th className="border border-black py-1">Id. Artefacto</th>
            <th className="border border-black py-1">
              Potencia Instalada (kW)
            </th>
            <th className="border border-black py-1">Potencia Total en (kW)</th>
            <th className="border border-black py-1" colSpan={3}>
              Tipo artefacto
            </th>
          </tr>

          {/* Fila 2: A / B / C */}
          <tr>
            <th className="border border-black py-0.5" colSpan={5}></th>
            <th className="border border-black py-0.5">A</th>
            <th className="border border-black py-0.5">B</th>
            <th className="border border-black py-0.5">C</th>

            <th
              className="border border-black py-0.5 border-l-2"
              colSpan={5}
            ></th>
            <th className="border border-black py-0.5">A</th>
            <th className="border border-black py-0.5">B</th>
            <th className="border border-black py-0.5">C</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="h-[24px]">
              {/* izquierda */}
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>

              {/* derecha (primer td con borde central más grueso) */}
              <td className="border border-black border-l-2"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ColgasPreview() {
  return (
    <div className="w-[380mm] min-h-[297mm] bg-white text-[10pt] leading-[1.35] text-black relative mx-auto shadow print:shadow-none print:w-auto print:min-h-0">
      {/* HEADER: ancho total 1246px con 5 secciones */}
      <div className="overflow-x-auto">
        <div className="min-w-[1246px]">
          <div className="flex">
            {/* Sección 1 — 79px */}
            <div className="w-[116px] border-t border-l border-black p-2">
              {/* coloca aquí el contenido real */}
              <div className="text-xs font-semibold">S1</div>
            </div>

            {/* Sección 2 — 184px */}
            <div className="w-[223px] border-l border-t border-black p-2">
              <div className="text-[9pt] font-semibold">S2</div>
            </div>

            {/* Sección 3 — 610px */}
            <div className="w-[647px] border-t border-l border-r border-black p-2">
              <div className="text-[10pt] text-center leading-tight">
                Informe de Inspección de Instalaciones existentes para
                suministro de gases combustibles destinadas a usos Residenciales
                ó comerciales
              </div>

              <div className="text-[11pt] font-bold text-center mt-1 leading-tight">
                REVISIÓN PERIÓDICA - SOLICITUD DEL USUARIO
              </div>

              {/* línea inferior con organización izquierda/derecha */}
              <div className="text-[10pt] mt-1 leading-tight">
                <div className="flex items-center justify-between">
                  <span>GN - GLP Resolución Min. Minas</span>
                  <span>90902/2013 / 41385/2017</span>
                </div>
              </div>
            </div>

            {/* Sección 4 — 236px */}
            <div className="w-[273px] border-r border-t border-black p-0">
              {/* Título superior */}
              <div className="text-center text-[10pt] font-semibold border-b border-black py-1">
                N° DE INFORME:
              </div>

              {/* Cuerpo: P | número rojo */}
              <div className="grid grid-cols-[22px_1fr] items-center min-h-[72px] px-2">
                {/* Prefijo P */}
                <div className="text-[14pt] font-semibold text-left">P</div>

                {/* Número (rojo, grande, centrado) */}
                <div className="text-center leading-none">
                  <span className="text-[28pt] font-extrabold tracking-wider text-red-700">
                    47754
                  </span>
                </div>
              </div>
            </div>

            {/* Sección 5 — 137px con 3 bloques verticales */}
            <div className="w-[179px] border-t border-r border-black p-0 flex flex-col text-[10pt]">
              {/* 1) CODIGO. F-IP-01-01 */}
              <div className="flex items-center justify-between px-2 py-1 border-b border-black">
                <span className="font-semibold">CODIGO.</span>
                <span className="font-semibold">{"F-IP-01-01"}</span>
              </div>

              {/* 2) VERSIÓN: 07 */}
              <div className="flex items-center justify-between px-2 py-1 border-b border-black">
                <span className="font-semibold">VERSIÓN:</span>
                <span className="font-semibold">{"07"}</span>
              </div>

              {/* 3) FECHA: 2025-01-10 */}
              <div className="flex items-center justify-between px-2 py-1">
                <span className="font-semibold">FECHA:</span>
                <span className="font-semibold">{"2025-01-10"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  === 1. DATOS DEL USUARIO + 2 IDENTIFICACION DEL ORGANISMO DE INSPECCION */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
          <div className="grid grid-cols-[1030px_400px] border-t border-l border-r border-black text-xs leading-tight">
            {/* IZQUIERDA: 1. DATOS DE USUARIO */}
            <div className="border-r border-black">
              <div className="px-2 py-1 border-b border-black bg-gray-100 font-bold text-center">
                1. DATOS DE USUARIO
              </div>

              {/* Fila 1: Nombre | Cédula | Teléfono */}
              <div className="grid grid-cols-[1fr_220px_220px]">
                <div className="border-b border-black px-2 py-1">
                  <span className="font-semibold">Nombre: </span>
                  <span className="align-middle inline-block min-h-[22px]">
                    {/* {usuario.nombre} */} YEDINSON FABIAN PEREZ LOPEZ
                  </span>
                </div>
                <div className="border-l border-b border-black px-2 py-1">
                  <span className="font-semibold">Cédula: </span>
                  <span className="inline-block min-h-[22px]">
                    {/* {usuario.cedula} */} 1090…
                  </span>
                </div>
                <div className="border-l border-b border-black px-2 py-1">
                  <span className="font-semibold">Teléfono: </span>
                  <span className="inline-block min-h-[22px]">
                    {/* {usuario.telefono} */} 3213600130
                  </span>
                </div>
              </div>

              {/* Fila 2: Dirección | Barrio */}
              <div className="grid grid-cols-[1fr_420px]">
                <div className="px-2 py-1 border-b border-black">
                  <span className="font-semibold">Dirección: </span>
                  <span className="inline-block min-h-[22px]">
                    {/* {usuario.direccion} */} T S AP 802
                  </span>
                </div>
                <div className="px-2 py-1 border-l border-b border-black">
                  <span className="font-semibold">Barrio: </span>
                  <span className="inline-block min-h-[22px]">
                    {/* {usuario.barrio} */} Conjunto Brisas
                  </span>
                </div>
              </div>

              {/* Fila 3/4: Cuenta+Código (apilado) | Medidor (ocupa 2 filas) | Dpto (2 filas) | Ciudad (2 filas) */}
              <div className="grid grid-cols-[260px_1fr_240px_220px]">
                {/* Col 1 (dos renglones apilados) */}
                <div className="flex flex-col">
                  <div className="px-2 py-1 ">
                    <span className="font-semibold">Cuenta: </span>
                    <span className="inline-block min-h-[22px]">
                      {/* {usuario.cuenta} */} 007296
                    </span>
                  </div>
                  <div className="px-2 py-1 ">
                    <span className="font-semibold">Código: </span>
                    <span className="inline-block min-h-[22px]">
                      {/* {usuario.codigo} */} 007296
                    </span>
                  </div>
                </div>

                {/* Col 2: Medidor (abarca 2 filas) */}
                <div className="px-2 py-1 border-l border-r border-black row-span-2">
                  <span className="font-semibold">Medidor: </span>
                  <span className="inline-block min-h-[46px] align-top">
                    {/* {usuario.medidor} */} 2019210037338
                  </span>
                </div>

                {/* Col 3: Dpto (abarca 2 filas) */}
                <div className="px-2 py-1 border-r border-black row-span-2">
                  <span className="font-semibold">Dpto: </span>
                  <span className="inline-block min-h-[46px] align-top">
                    {/* {usuario.departamento} */} Santander
                  </span>
                </div>

                {/* Col 4: Ciudad (abarca 2 filas) */}
                <div className="px-2 py-1 row-span-2">
                  <span className="font-semibold">Ciudad: </span>
                  <span className="inline-block min-h-[46px] align-top">
                    {/* {usuario.ciudad} */} Cúcuta
                  </span>
                </div>
              </div>
            </div>

            {/* DERECHA: 2. IDENTIFICACIÓN DEL ORGANISMO DE INSPECCIÓN */}
            <div className="h-full">
              <div className="px-2 py-1 border-b border-black bg-gray-100 font-bold text-center">
                2. IDENTIFICACIÓN DEL ORGANISMO DE DE INSPECCIÓN
              </div>

              {/* Cuerpo con dos columnas internas: info + teléfonos/NIT */}
              <div className="grid grid-cols-[1fr_115px] h-full">
                {/* Col izquierda (empresa/dirección/acreditación/distribuidora) */}
                <div className=" border-black">
                  <div className="px-2 py-1 border-b border-r border-black">
                    <span className="font-semibold">Empresa: </span>
                    <span className="inline-block min-h-[20px]">
                      {/* {oi.empresa} */} OI ELECTROGASES S A S
                    </span>
                  </div>
                  <div className="px-2 py-1 border-b border-r border-black">
                    <span className="font-semibold">Dirección: </span>
                    <span className="inline-block">
                      {/* {oi.direccion} */} Cl. 3N # 3E-111 Urb. Capellana —
                      Cúcuta - Norte de Santander
                    </span>
                  </div>
                  <div className="px-2 py-1 border-b border-r border-black">
                    <span className="font-semibold">Acreditación N°: </span>
                    <span>{/* {oi.acreditacion} */} 18-OIN-021</span>
                  </div>

                  {/* Distribuidora al final */}
                  <div className="px-2 py-1 border-r">
                    <span className="text-gray-700 mr-1">DISTRIBUIDORA:</span>
                    <span className="font-semibold">
                      {/* {oi.distribuidora} */} Colgas
                    </span>
                  </div>
                </div>

                {/* Col derecha (teléfonos, NIT) */}
                <div className="flex flex-col">
                  <div className="px-2 py-1 border-b border-black">
                    <div className="font-semibold">Teléfonos:</div>
                    <div className="leading-snug">
                      {/* {oi.telefonos?.map(...)} */}
                      3503723122
                      <br />
                      5492370
                    </div>
                  </div>
                  <div className="px-2 py-1">
                    <div className="font-semibold">NIT</div>
                    <div>901106596-6</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === 3. INFORMACIÓN GENERAL + 3.1 CLASE DE USO === */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
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
                <span className="min-h-[22px]">2025-07-14</span>
              </div>
              <div className="border-b border-r border-black px-2 py-1">
                <span className="font-semibold">Fecha expedición: </span>
                <span className="min-h-[22px]">2025-07-14</span>
              </div>
              <div className="border-b border-r border-black px-2 py-1">
                <span className="font-semibold">Fecha de solicitud: </span>
                <span className="min-h-[22px]">2025-07-14</span>
              </div>

              {/* S4/S5: celda anidada (arriba/abajo dentro de la misma columna) */}
              <div className="border-r border-b border-black grid grid-rows-[24px_1fr]">
                {/* S4 */}
                <div className="flex items-center justify-between px-2 border-b border-black h-[24px]">
                  <span className="font-semibold">Revisión Periódica</span>
                  {/* pequeña columna para la casilla */}
                  <span className="w-[18px] h-full border-l border-black flex items-center justify-center">
                    <Box checked />
                  </span>
                </div>

                {/* S5 */}
                <div className="flex items-center justify-between px-2 h-full">
                  <span>A solicitud del usuario</span>
                  <span className="w-[18px] h-full border-l border-black flex items-center justify-center">
                    <Box />
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
                    <Box />
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="font-semibold">GLP</span>
                    <Box checked />
                  </span>
                </div>
              </div>
              <div className="border-b border-r border-black px-2 py-1">
                <span className="font-semibold">Hora de inicio: </span>
                <span className=" min-h-[22px]">08:41 a.m</span>
              </div>
              <div className="border-b border-r border-black px-2 py-1">
                <span className="font-semibold">Hora de final: </span>
                <span className=" min-h-[22px]">09:05 a.m</span>
              </div>
              <div className="border-r border-b border-black grid grid-rows-[18px_1fr]">
                {/* Título */}
                <div className="text-[10px] font-semibold text-center leading-none border-b border-black">
                  Visita N°
                </div>

                {/* 1 | 2 | 3 */}
                <div className="flex items-center justify-center gap-1 pt-1">
                  <DigitBox label="1" checked />
                  <DigitBox label="2" />
                  <DigitBox label="3" />
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
                  <Box checked />
                </div>

                {/* Multiusuario (✓) */}
                <div className="px-2 flex items-center justify-between border-b border-black">
                  <span className="font-semibold">Multiusuario:</span>
                  <Box checked />
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
                    <Box />
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="font-semibold">NO</span>
                    <Box checked />
                  </span>
                </div>
              </div>

              {/* S13 (arriba de S14) en la col 3 */}
              <div className="px-2 py-1 border-r border-b border-black flex-col items-center justify-center">
                <span className="font-semibold">
                  Fecha de Inspección anterior:{" "}
                </span>
                <span className="min-h-[22px]">2025-07-14</span>
              </div>

              {/* S15 ocupa varias columnas en esta fila (cols 4 a 7) */}
              <div className="px-2 py-1 border-r border-b border-black flex-col items-center justify-center">
                <span className="font-semibold">
                  Fecha puesta en servicio:{" "}
                </span>
                <span className="min-h-[22px]">2020-10-12</span>
              </div>

              {/* S17 (al extremo derecho antes de S10) en la col 8 */}
              <div className="col-span-4 border-r border-b border-black flex items-center justify-center bg-gray-100">
                <p className="font-bold px-2">Reemplazo o adicion de informe</p>
              </div>

              {/* ===== Fila 3 (abajo): S14, S16, S18 ===== */}
              {/* S14 (debajo de S13) */}
              <div className="px-2 py-1 border-r border-black flex-col items-center justify-center">
                <span className="font-semibold"># de certificado: </span>
                <span className="min-h-[22px]">---</span>
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
                    <Box checked />
                  </span>
                </div>
              </div>

              {/* S18 (bloque grande inferior derecho) — ocupa cols 6 a 8 en la última fila */}
              <div className="col-span-4 border-r border-black grid grid-cols-[130px_1fr]">
                {/* Izquierda: opciones (2 renglones) */}
                <div className="grid grid-rows-2 border-r">
                  <div className="px-2 flex items-center justify-between border-b border-black">
                    <span className="font-semibold">Reemplazo</span>
                    <Box />
                  </div>
                  <div className="px-2 flex items-center justify-between">
                    <span className="font-semibold">Adición</span>
                    <Box />
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

      {/* 3.3 TRAZABILIDAD DE LA LÍNEA MATRIZ */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
          <div className="grid grid-cols-[345px_175px_145px_305px_155px_170px_140px] border-r border-l border-b border-black text-xs leading-tight box-border">
            {/* Col 1: Título */}
            <div className="px-2 py-1 border-r border-black bg-gray-100 font-bold flex items-center">
              3.3 TRAZABILIDAD DE LA LÍNEA MATRIZ
            </div>

            {/* Col 2: Existe Línea Matriz  (SI/NO) */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                Existe Línea Matriz
              </div>
              <div className="px-2 flex items-center justify-between">
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

            {/* Col 3: A la vista / Oculta */}
            <div className="border-r border-black grid grid-rows-2">
              <div className="px-2 border-b border-black flex items-center justify-between">
                <span className="font-semibold">A la vista</span>
                <Box />
              </div>
              <div className="px-2 flex items-center justify-between">
                <span className="font-semibold">Oculta</span>
                <Box />
              </div>
            </div>

            {/* Col 4: Organismo que certificó */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                Organismo que certificó:
              </div>
              <div className="px-2 flex items-center">
                <span />
              </div>
            </div>

            {/* Col 5: N° de predios conectados */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                N° de predios conectados
              </div>
              <div className="px-2 flex items-center">
                <span />
              </div>
            </div>

            {/* Col 6: N° de informe de inspección */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                N° de informe de inspección
              </div>
              <div className="px-2 flex items-center">
                <span></span>
              </div>
            </div>

            {/* Col 7: Fecha de inspección */}
            <div className="grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                Fecha de inspección:
              </div>
              {/* Tres casillas (DD - MM - AAAA) para imitar el formato del PDF */}
              <span>- -</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3.4 TRAZABILIDAD DE VACÍO INTERNO */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
          <div className="grid grid-cols-[260px_130px_1fr_150px_110px_100px_90px_240px_170px] border-b border-l border-black text-xs leading-tight box-border">
            {/* Col 1: Título */}
            <div className="px-2 py-1 border-r border-black bg-gray-100 font-bold flex items-center">
              3.4 TRAZABILIDAD DE VACÍO INTERNO
            </div>

            {/* Col 2: Existe vacío interno (SI/NO) */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                Existe vacío interno
              </div>
              <div className="px-2 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span className="font-semibold">SI</span>
                  <Box />
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold">NO</span>
                  <Box checked />
                </span>
              </div>
            </div>

            {/* Col 3: Licencia / Certificado / Tradición / Escritura / N° / Fecha */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[8px] font-semibold flex items-center">
                Licencia de construcción o certificado de Tradición / Escritura
                Pública
              </div>
              <div className="px-2 py-1 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">N°</span>
                  <span className="flex-1 h-[18px] border-b border-black" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Fecha</span>
                  <span className="w-[22px] h-[18px] border border-black" />
                  <span>-</span>
                  <span className="w-[22px] h-[18px] border border-black" />
                  <span>-</span>
                  <span className="w-[36px] h-[18px] border border-black" />
                </div>
              </div>
            </div>

            {/* Col 4: Uso (Ventilación / Evacuación) */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                Uso:
              </div>
              <div className="px-2 py-1 flex flex-col gap-1">
                <span className="flex items-center justify-between">
                  <span className="font-semibold">Ventilación</span>
                  <Box />
                </span>
                <span className="flex items-center justify-between">
                  <span className="font-semibold">Evacuación</span>
                  <Box />
                </span>
              </div>
            </div>

            {/* Col 5: Área en planta (m²) */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                Área en planta
              </div>
              <div className="px-2 flex items-center gap-1">
                <span className="flex-1 h-[18px] border-b border-black" />
                <span className="font-semibold">m²</span>
              </div>
            </div>

            {/* Col 6: Lado mínimo (m) */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                Lado mínimo
              </div>
              <div className="px-2 flex items-center gap-1">
                <span className="flex-1 h-[18px] border-b border-black" />
                <span className="font-semibold">m</span>
              </div>
            </div>

            {/* Col 7: # de pisos */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                # de pisos
              </div>
              <div className="px-2 flex items-center">
                <span className="flex-1 h-[18px] border-b border-black" />
              </div>
            </div>

            {/* Col 8: Cubierto / Área libre cubierta */}
            <div className="border-r border-black grid grid-rows-[20px_1fr]">
              <div className="px-2 border-b border-black text-[10px] font-semibold flex items-center">
                Cubierto:
                <span className="ml-2 mr-1 font-semibold">SI</span>
                <Box />
                <span className="ml-2 mr-1 font-semibold">NO</span>
                <Box />
              </div>
              <div className="px-2 py-1 flex items-center gap-1">
                <span className="font-semibold">Área libre cubierta</span>
                <span className="flex-1 h-[18px] border-b border-black" />
                <span className="font-semibold">m²</span>
              </div>
            </div>

            {/* Col 9: CUMPLE + Verificación de ventilación (años) */}
            <div className="grid grid-rows-[28px_1fr]">
              <div className="px-2 bg-gray-100 font-bold text-center border-b border-r border-black">
                CUMPLE
              </div>
              <div className="grid grid-cols-2 ">
                {/* Columna izquierda: SI/NO */}
                <div className="border-r border-black flex flex-col">
                  <div className="px-2 h-[26px] flex items-center justify-between border-b border-black">
                    <span className="font-semibold">SI</span>
                    <Box />
                  </div>
                  <div className="px-2 h-[26px] flex items-center justify-between  border-black">
                    <span className="font-semibold">NO</span>
                    <Box />
                  </div>
                </div>
                {/* Columna derecha: verificación de ventilación (años) */}
                <div className="px-2 flex flex-col justify-center border-r">
                  <div className="text-[10px] font-semibold leading-none mb-1">
                    verificación de ventilación (años)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span className="font-semibold">3</span>
                      <Box />
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-semibold">5</span>
                      <Box />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
          <div className="px-2 py-1 border-l border-r border-black bg-gray-100 font-bold text-center">
            4. EVALUACION DE LOS RECINTOS Y TIPOS DE ARTEFACTOS
          </div>
          <EvalRecintosTablaSimple />
        </div>
      </div>

      {/* 5 - 6 - 6.1 */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
          <SeccionIsometricoPlantaVolumenes />
        </div>
      </div>

      {/* 7. */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1248px]">
          <TablaEvalVentilacion />
        </div>
      </div>

      {/* 8.  */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="w-max">
          <div className="border-t border-black">
            <div className="border-l border-r border-black bg-gray-100 font-bold text-center text-xs py-1">
              8. PARÁMETROS DE EVALUACIÓN / RESOLUCIÓN 90902 DE 2013 /
              RESOLUCIÓN 41385 DE 2017
            </div>

            <Section8FilaCompacta />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
        <div className="w-max">
          <SectionDefectologia />
        </div>
      </div>

      {/* 9 */}
      <div className="overflow-x-auto overflow-y-hidden">
        <SectionEquipos />
      </div>

      {/* 10 */}
      <div className="overflow-x-auto overflow-y-hidden">
        <Section10Declaracion />
      </div>

      {/* 11 - 12 */}
      <div className="overflow-x-auto overflow-y-hidden">
        <Section11y12 />
      </div>
    </div>
  );
}
