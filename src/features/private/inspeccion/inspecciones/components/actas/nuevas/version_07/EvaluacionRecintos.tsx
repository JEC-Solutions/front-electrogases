import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const EvaluacionRecintos = ({ inspeccion }: Props) => {
  const recintos = inspeccion?.evaluacionRecintos ?? [];

  const maxFilas = 5;
  const filas = Array.from({ length: maxFilas });

  const borderClass = "border border-black";
  const headerClass = "bg-gray-100 font-bold px-1";
  const textClass = "text-[7.5pt] font-arial text-black leading-none";

  const val = (v: any) =>
    v !== null && v !== undefined && v !== "" ? v : "";

  const valNA = (v: any) =>
    v !== null && v !== undefined && v !== "" ? `${v}` : "N/A";

  const shouldShowPotencia = (currentIndex: number) => {
    const current = recintos[currentIndex];
    if (!current) return false;

    const next = recintos[currentIndex + 1];

    if (!next) return true;
    return current.idRecinto !== next.idRecinto;
  };

  return (
    <div className={`w-full ${textClass}`}>
      <div className="w-full border-l border-r border-black bg-gray-200 font-bold text-center py-1 text-[7pt]">
        5. EVALUACIÓN DE LOS RECINTOS Y TIPOS DE ARTEFACTOS
      </div>

      <table className="w-full table-fixed border-collapse border border-black text-center">
        <colgroup>
          <col style={{ width: "11%" }} /> {/* Tipo Recinto */}
          <col style={{ width: "5%" }} /> {/* Id Recinto */}
          <col style={{ width: "6%" }} /> {/* Id Artefacto */}
          <col style={{ width: "9.3%" }} /> {/* Potencia Inst */}
          <col style={{ width: "9.3%" }} /> {/* Potencia Prevista */}
          <col style={{ width: "9.3%" }} /> {/* Potencia Total */}
          <col style={{ width: "2%" }} /> {/* A */}
          <col style={{ width: "2%" }} /> {/* B */}
          <col style={{ width: "2%" }} /> {/* C */}
          {/* LADO DERECHO (50%) */}
          <col style={{ width: "11%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "6%" }} />
          <col style={{ width: "9.3%" }} />
          <col style={{ width: "9.3%" }} />
          <col style={{ width: "9.3%" }} />
          <col style={{ width: "2%" }} />
          <col style={{ width: "2%" }} />
          <col style={{ width: "2%" }} />
        </colgroup>

        <thead>
          <tr className={headerClass}>
            <th className={borderClass} rowSpan={2}>
              Tipo de Recinto
            </th>
            <th className={borderClass} rowSpan={2}>
              Id. Recinto
            </th>
            <th className={borderClass} rowSpan={2}>
              Id. Artefacto
            </th>
            <th className={borderClass} rowSpan={2}>
              Potencia
              <br />
              Instalada
              <br />
              (KW)
            </th>
            <th className={borderClass} rowSpan={2}>
              Potencia
              <br />
              Prevista
              <br />
              (KW)
            </th>
            <th className={borderClass} rowSpan={2}>
              Potencia
              <br />
              Conjunta Max
              <br />
              (kw)
            </th>
            <th className={borderClass} colSpan={3}>
              Tipo art.
            </th>

            <th className={`${borderClass} border-l-2`} rowSpan={2}>
              Tipo de Recinto
            </th>
            <th className={borderClass} rowSpan={2}>
              Id. Recinto
            </th>
            <th className={borderClass} rowSpan={2}>
              Id. Artefacto
            </th>
            <th className={borderClass} rowSpan={2}>
              Potencia
              <br />
              Instalada
              <br />
              (KW)
            </th>
            <th className={borderClass} rowSpan={2}>
              Potencia
              <br />
              Prevista
              <br />
              (KW)
            </th>
            <th className={borderClass} rowSpan={2}>
              Potencia
              <br />
              Conjunta Max
              <br />
              (kw)
            </th>
            <th className={borderClass} colSpan={3}>
              Tipo art.
            </th>
          </tr>

          <tr className={headerClass}>
            <th className={borderClass}>A</th>
            <th className={borderClass}>B</th>
            <th className={borderClass}>C</th>
            <th className={borderClass}>A</th>
            <th className={borderClass}>B</th>
            <th className={borderClass}>C</th>
          </tr>
        </thead>

        <tbody>
          {filas.map((_, i) => {
            const leftIndex = i;
            const rightIndex = i + maxFilas;

            const itemLeft = recintos[leftIndex];
            const itemRight = recintos[rightIndex];

            const showPotLeft = shouldShowPotencia(leftIndex);
            const showPotRight = shouldShowPotencia(rightIndex);

            return (
              <tr key={i} className="h-[20px]">
                {/* --- LADO IZQUIERDO --- */}
                <td className={`${borderClass} text-left px-1 truncate`}>
                  {val(itemLeft?.tipoRecinto)}
                </td>
                <td className={borderClass}>{val(itemLeft?.idRecinto)}</td>
                <td className={borderClass}>{val(itemLeft?.idArtefacto)}</td>
                <td className={borderClass}>
                  {itemLeft ? valNA(itemLeft?.potenciaInstalada) : ""}
                </td>
                <td className={borderClass}>
                  {val(itemLeft?.potenciaPrevista)}
                </td>
                <td className={borderClass}>
                  {/* Solo mostramos si showPotLeft es true */}
                  {showPotLeft ? val(itemLeft?.potenciaConjunta) : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemLeft?.tipoArtefacto === "A" ? "✓" : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemLeft?.tipoArtefacto === "B" ? "✓" : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemLeft?.tipoArtefacto === "C" ? "✓" : ""}
                </td>

                {/* --- LADO DERECHO --- */}
                <td
                  className={`${borderClass} border-l-2 text-left px-1 truncate`}
                >
                  {val(itemRight?.tipoRecinto)}
                </td>
                <td className={borderClass}>{val(itemRight?.idRecinto)}</td>
                <td className={borderClass}>{val(itemRight?.idArtefacto)}</td>
                <td className={borderClass}>
                  {itemRight ? valNA(itemRight?.potenciaInstalada) : ""}
                </td>
                <td className={borderClass}>
                  {val(itemRight?.potenciaPrevista)}
                </td>
                <td className={borderClass}>
                  {/* Solo mostramos si showPotRight es true */}
                  {showPotRight ? val(itemRight?.potenciaConjunta) : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemRight?.tipoArtefacto === "A" ? "✓" : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemRight?.tipoArtefacto === "B" ? "✓" : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemRight?.tipoArtefacto === "C" ? "✓" : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
