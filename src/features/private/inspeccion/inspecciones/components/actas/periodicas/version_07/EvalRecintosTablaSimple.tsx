import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const EvalRecintosTablaSimple = ({ inspeccion }: Props) => {

  const recintos = inspeccion?.evaluacionRecintos ?? [];
  const maxFilas = 5;

  return (
     <div className={`overflow-x-auto`}>
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
          {Array.from({ length: maxFilas }).map((_, filaIndex) => {
            const left = recintos[filaIndex * 2];
            const right = recintos[filaIndex * 2 + 1];

            return (
              <tr key={filaIndex} className="h-[24px]">
                {/* izquierda */}
                <td className="border border-black">
                  {left?.tipoRecinto ?? ""}
                </td>
                <td className="border border-black">
                  {left?.idRecinto ?? ""}
                </td>
                <td className="border border-black">
                  {left?.idArtefacto ?? ""}
                </td>
                <td className="border border-black">
                  {left?.potenciaInstalada ?? ""}
                </td>
                <td className="border border-black">
                  {left?.potenciaConjunta ?? ""}
                </td>
                <td className="border border-black">
                  {left?.tipoArtefacto === "A" ? "X" : ""}
                </td>
                <td className="border border-black">
                  {left?.tipoArtefacto === "B" ? "X" : ""}
                </td>
                <td className="border border-black">
                  {left?.tipoArtefacto === "C" ? "X" : ""}
                </td>

                {/* derecha (primer td con borde central más grueso) */}
                <td className="border border-black border-l-2">
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
                <td className="border border-black">
                  {right?.tipoArtefacto === "A" ? "X" : ""}
                </td>
                <td className="border border-black">
                  {right?.tipoArtefacto === "B" ? "X" : ""}
                </td>
                <td className="border border-black">
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
