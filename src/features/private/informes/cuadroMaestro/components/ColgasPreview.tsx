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
