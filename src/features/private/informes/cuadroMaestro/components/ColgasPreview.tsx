import { Section10Declaracion } from "./Section10Declaracion";
import { Section11y12 } from "./Section11y12";
import { Section8FilaCompacta } from "./Section8FilaCompacta";
import { SectionDefectologia } from "./SectionDefectologia";
import { SectionEquipos } from "./SectionEquipos";
import { TablaEvalVentilacion } from "./TablaEvalVentilacion";

export function ColgasPreview() {
  return (
    <div className="w-[380mm] min-h-[297mm] bg-white text-[10pt] leading-[1.35] text-black relative mx-auto shadow print:shadow-none print:w-auto print:min-h-0">
      {/* 5 - 6 - 6.1 */}
      

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
