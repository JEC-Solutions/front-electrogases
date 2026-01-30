import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const EvaluacionRecintos = ({ inspeccion }: Props) => {
  const rawRecintos = inspeccion?.evaluacionRecintos ?? [];

  const recintos = rawRecintos.filter(
    (recinto, index, self) =>
      index ===
      self.findIndex(
        (t) => t.id_evaluacion_recintos === recinto.id_evaluacion_recintos,
      ),
  );

  const maxFilas = 5;
  const filas = Array.from({ length: maxFilas });

  const borderClass = "border border-black";
  const headerClass = "bg-gray-100 font-bold px-1";
  const textClass = "text-[7.5pt] font-arial text-black leading-none";

  return (
    <div className={`w-full ${textClass}`}>
      <div className="w-full border-l border-r border-black bg-gray-200 font-bold text-center py-1 text-[7pt]">
        5. EVALUACIÓN DE LOS RECINTOS Y TIPOS DE ARTEFACTOS
      </div>

      <table className="w-full table-fixed border-collapse border border-black text-center">
        <colgroup>
          <col style={{ width: "13%" }} /> {/* Tipo Recinto */}
          <col style={{ width: "6%" }} /> {/* Id Recinto */}
          <col style={{ width: "7%" }} /> {/* Id Artefacto */}
          <col style={{ width: "9%" }} /> {/* Potencia Inst */}
          <col style={{ width: "8%" }} /> {/* Potencia Total */}
          <col style={{ width: "2.3%" }} /> {/* A */}
          <col style={{ width: "2.3%" }} /> {/* B */}
          <col style={{ width: "2.3%" }} /> {/* C */}
          {/* LADO DERECHO (50%) */}
          <col style={{ width: "13%" }} />
          <col style={{ width: "6%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "2.3%" }} />
          <col style={{ width: "2.3%" }} />
          <col style={{ width: "2.3%" }} />
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
              Potencia Instalada
              <br />
              (kW)
            </th>
            <th className={borderClass} rowSpan={2}>
              Potencia Total
              <br />
              en (kW)
            </th>
            <th className={borderClass} colSpan={3}>
              Tipo artefacto
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
              Potencia Instalada
              <br />
              (kW)
            </th>
            <th className={borderClass} rowSpan={2}>
              Potencia Total
              <br />
              en (kW)
            </th>
            <th className={borderClass} colSpan={3}>
              Tipo artefacto
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
            const itemLeft = recintos[i * 2];
            const itemRight = recintos[i * 2 + 1];

            return (
              <tr key={i} className="h-[20px]">
                <td className={`${borderClass} text-left px-1 truncate`}>
                  {itemLeft?.tipoRecinto || ""}
                </td>
                <td className={borderClass}>{itemLeft?.idRecinto || ""}</td>
                <td className={borderClass}>{itemLeft?.idArtefacto || ""}</td>
                <td className={borderClass}>
                  {itemLeft?.potenciaInstalada || ""}
                </td>
                <td className={borderClass}>
                  {itemLeft?.potenciaConjunta || ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemLeft?.tipoArtefacto === "A" ? "X" : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemLeft?.tipoArtefacto === "B" ? "X" : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemLeft?.tipoArtefacto === "C" ? "X" : ""}
                </td>

                <td
                  className={`${borderClass} border-l-2 text-left px-1 truncate`}
                >
                  {itemRight?.tipoRecinto || ""}
                </td>
                <td className={borderClass}>{itemRight?.idRecinto || ""}</td>
                <td className={borderClass}>{itemRight?.idArtefacto || ""}</td>
                <td className={borderClass}>
                  {itemRight?.potenciaInstalada || ""}
                </td>
                <td className={borderClass}>
                  {itemRight?.potenciaConjunta || ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemRight?.tipoArtefacto === "A" ? "X" : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemRight?.tipoArtefacto === "B" ? "X" : ""}
                </td>
                <td className={`${borderClass} font-bold`}>
                  {itemRight?.tipoArtefacto === "C" ? "X" : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
