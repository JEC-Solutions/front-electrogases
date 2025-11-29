import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const EvalRecintosTablaSimple = ({ inspeccion }: Props) => {
  const recintos = inspeccion?.evaluacionRecintos ?? [];
  const maxFilas = 5;

  return (
    <div className="w-full font-arial text-black">
      <div className="w-full border-r border-l bg-gray-200 font-bold text-center text-[9pt] py-1">
        4. EVALUACION DE LOS RECINTOS Y TIPOS DE ARTEFACTOS
      </div>

      <table className="w-full table-fixed border-collapse border border-black text-[8pt] leading-none text-center">
        {/* Definición de anchos de columna (Suma 50% por lado) */}
        <colgroup>
          {/* --- LADO IZQUIERDO --- */}
          <col style={{ width: "14%" }} /> {/* Tipo Recinto */}
          <col style={{ width: "7%" }} /> {/* Id Recinto */}
          <col style={{ width: "8%" }} /> {/* Id Artefacto */}
          <col style={{ width: "10%" }} /> {/* Potencia Inst */}
          <col style={{ width: "8%" }} /> {/* Potencia Total */}
          <col style={{ width: "3%" }} /> {/* A */}
          <col style={{ width: "3%" }} /> {/* B */}
          <col style={{ width: "3%" }} /> {/* C */}
          {/* --- LADO DERECHO --- */}
          <col style={{ width: "14%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "3%" }} />
          <col style={{ width: "3%" }} />
          <col style={{ width: "3%" }} />
        </colgroup>

        <thead>
          {/* Fila 1: Encabezados Principales */}
          <tr className="bg-gray-100">
            {/* IZQUIERDA */}
            <th className="border border-black py-2 font-semibold">
              Tipo de Recinto
            </th>
            <th className="border border-black py-1 font-semibold">
              Id. Recinto
            </th>
            <th className="border border-black py-1 font-semibold">
              Id. Artefacto
            </th>
            <th className="border border-black py-1 font-semibold">
              Potencia Instalada (kW)
            </th>
            <th className="border border-black py-1 font-semibold">
              Potencia Total en (kW)
            </th>
            <th className="border border-black py-1 font-semibold" colSpan={3}>
              Tipo artefacto
            </th>

            {/* DERECHA (Borde izquierdo más grueso para separar visualmente) */}
            <th className="border border-black border-l-2 py-2 font-semibold">
              Tipo de Recinto
            </th>
            <th className="border border-black py-1 font-semibold">
              Id. Recinto
            </th>
            <th className="border border-black py-1 font-semibold">
              Id. Artefacto
            </th>
            <th className="border border-black py-1 font-semibold">
              Potencia Instalada (kW)
            </th>
            <th className="border border-black py-1 font-semibold">
              Potencia Total en (kW)
            </th>
            <th className="border border-black py-1 font-semibold" colSpan={3}>
              Tipo artefacto
            </th>
          </tr>

          {/* Fila 2: Sub-encabezados A, B, C */}
          <tr>
            {/* IZQUIERDA */}
            <th className="border border-black h-[14px]" colSpan={5}></th>
            <th className="border border-black h-[14px]">A</th>
            <th className="border border-black h-[14px]">B</th>
            <th className="border border-black h-[14px]">C</th>

            {/* DERECHA */}
            <th
              className="border border-black border-l-2 h-[14px]"
              colSpan={5}
            ></th>
            <th className="border border-black h-[14px]">A</th>
            <th className="border border-black h-[14px]">B</th>
            <th className="border border-black h-[14px]">C</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: maxFilas }).map((_, filaIndex) => {
            const left = recintos[filaIndex * 2];
            const right = recintos[filaIndex * 2 + 1];

            return (
              <tr key={filaIndex} className="h-[22px]">
                {/* --- DATOS IZQUIERDA --- */}
                <td className="border border-black truncate px-1 text-left">
                  {left?.tipoRecinto ?? ""}
                </td>
                <td className="border border-black">{left?.idRecinto ?? ""}</td>
                <td className="border border-black">
                  {left?.idArtefacto ?? ""}
                </td>
                <td className="border border-black">
                  {left?.potenciaInstalada ?? ""}
                </td>
                <td className="border border-black">
                  {left?.potenciaConjunta ?? ""}
                </td>
                <td className="border border-black font-bold">
                  {left?.tipoArtefacto === "A" ? "X" : ""}
                </td>
                <td className="border border-black font-bold">
                  {left?.tipoArtefacto === "B" ? "X" : ""}
                </td>
                <td className="border border-black font-bold">
                  {left?.tipoArtefacto === "C" ? "X" : ""}
                </td>

                {/* --- DATOS DERECHA --- */}
                <td className="border border-black border-l-2 truncate px-1 text-left">
                  {right?.tipoRecinto ?? ""}
                </td>
                <td className="border border-black">
                  {right?.idRecinto ?? ""}
                </td>
                <td className="border border-black">
                  {right?.idArtefacto ?? ""}
                </td>
                <td className="border border-black">
                  {right?.potenciaInstalada ?? ""}
                </td>
                <td className="border border-black">
                  {right?.potenciaConjunta ?? ""}
                </td>
                <td className="border border-black font-bold">
                  {right?.tipoArtefacto === "A" ? "X" : ""}
                </td>
                <td className="border border-black font-bold">
                  {right?.tipoArtefacto === "B" ? "X" : ""}
                </td>
                <td className="border border-black font-bold">
                  {right?.tipoArtefacto === "C" ? "X" : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
