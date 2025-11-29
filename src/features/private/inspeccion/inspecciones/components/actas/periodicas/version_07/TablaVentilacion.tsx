import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const TablaVentilacion = ({ inspeccion }: Props) => {
  const condiciones = inspeccion?.evaluacionCondiciones ?? [];

  const markMetodo = (row: any | undefined, metodo: 1 | 2) => {
    if (!row || row.metodoVentilacion == null) return "";
    return row.metodoVentilacion === metodo ||
      row.metodoVentilacion === String(metodo)
      ? "X"
      : "";
  };

  const markTipoSup = (row: any | undefined, tipo: string) =>
    row?.tipoVentilacionSuperior === tipo ? "X" : "";

  const markTipoInf = (row: any | undefined, tipo: string) =>
    row?.tipoVentilacionInferior === tipo ? "X" : "";

  return (
    <div className="w-full font-arial text-black">
      <table className="w-full table-fixed border-collapse border-l border-r text-[7.5pt] leading-none text-center">
        <colgroup>
          <col style={{ width: "6%" }} /> {/* Id. Recinto */}
          <col style={{ width: "5%" }} /> {/* CO (amb) */}
          <col style={{ width: "6%" }} /> {/* CO diluido */}
          <col style={{ width: "7%" }} /> {/* Volumen */}
          <col style={{ width: "8%" }} /> {/* Potencia */}
          <col style={{ width: "3%" }} /> {/* SI */}
          <col style={{ width: "3%" }} /> {/* NO */}
          <col style={{ width: "3%" }} /> {/* 1 */}
          <col style={{ width: "3%" }} /> {/* 2 */}
          <col style={{ width: "2.5%" }} /> {/* D */}
          <col style={{ width: "2.5%" }} /> {/* DV */}
          <col style={{ width: "2.5%" }} /> {/* DH */}
          <col style={{ width: "3.5%" }} /> {/* CEMP */}
          <col style={{ width: "3.5%" }} /> {/* CEDP */}
          <col style={{ width: "6%" }} /> {/* Área min */}
          <col style={{ width: "6%" }} /> {/* Área abert */}
          <col style={{ width: "2.5%" }} /> {/* D */}
          <col style={{ width: "2.5%" }} /> {/* DV */}
          <col style={{ width: "2.5%" }} /> {/* DH */}
          <col style={{ width: "3.5%" }} /> {/* CEMP */}
          <col style={{ width: "3.5%" }} /> {/* CEDP */}
          <col style={{ width: "6%" }} /> {/* Área min */}
          <col style={{ width: "6%" }} /> {/* Área abert */}
        </colgroup>

        <thead>
          <tr>
            <th
              colSpan={23}
              className="border-b border-black text-center font-bold py-1 bg-gray-200 text-[8pt]"
            >
              7. EVALUACIÓN DE CONDICIONES DE VENTILACIÓN, MEDICIÓN DE MONÓXIDO
              DE CARBONO EN AMBIENTE Y DILUIDO EN AMBIENTE
            </th>
          </tr>

          <tr className="align-middle">
            <th rowSpan={3} className="border border-black px-1 font-semibold">
              Id.
              <br />
              Recinto
            </th>
            <th rowSpan={3} className="border border-black px-1 font-semibold">
              CO
              <br />
              (amb)
            </th>
            <th rowSpan={3} className="border border-black px-1 font-semibold">
              CO
              <br />
              diluido
              <br />
              (amb)
            </th>
            <th rowSpan={3} className="border border-black px-1 font-semibold">
              Volumen
              <br />
              recinto
              <br />
              (m³)
            </th>
            <th
              rowSpan={3}
              className="border border-black px-1 font-semibold leading-tight"
            >
              Potencia
              <br />
              artefactos
              <br />
              circuito abierto
              <br />
              (kW)
            </th>

            <th
              colSpan={2}
              rowSpan={2}
              className="border border-black px-1 font-semibold leading-tight"
            >
              Cumple metodo
              <br />
              Estandar
            </th>
            <th
              colSpan={2}
              rowSpan={2}
              className="border border-black px-1 font-semibold leading-tight"
            >
              Metodo de
              <br />
              Ventilacion
            </th>

            <th colSpan={7} className="border border-black px-1 font-semibold">
              Superior
            </th>
            <th colSpan={7} className="border border-black px-1 font-semibold">
              Inferior
            </th>
          </tr>

          {/* Fila intermedia */}
          <tr>
            {/* Superior */}
            <th colSpan={5} className="border border-black px-1 font-semibold">
              Tipo de Ventilacion
            </th>
            <th
              rowSpan={2}
              className="border border-black px-1 font-semibold leading-tight"
            >
              Área minima
              <br />
              requerida
              <br />
              (cm²)
            </th>
            <th
              rowSpan={2}
              className="border border-black px-1 font-semibold leading-tight"
            >
              Área abertura
              <br />
              existente
              <br />
              (cm²)
            </th>

            {/* Inferior */}
            <th colSpan={5} className="border border-black px-1 font-semibold">
              Tipo de ventilacion
            </th>
            <th
              rowSpan={2}
              className="border border-black px-1 font-semibold leading-tight"
            >
              Área minima
              <br />
              requerida
              <br />
              (cm²)
            </th>
            <th
              rowSpan={2}
              className="border border-black px-1 font-semibold leading-tight"
            >
              Área abertura
              <br />
              existente
              <br />
              (cm²)
            </th>
          </tr>

          {/* Fila de subencabezados finales */}
          <tr className="h-[18px]">
            {/* Cumple / Método */}
            <th className="border border-black font-semibold">SI</th>
            <th className="border border-black font-semibold">NO</th>
            <th className="border border-black font-semibold">1</th>
            <th className="border border-black font-semibold">2</th>

            {/* Superior: D DV DH CEMP CEDP */}
            <th className="border border-black font-normal">D</th>
            <th className="border border-black font-normal">DV</th>
            <th className="border border-black font-normal">DH</th>
            <th className="border border-black font-normal">CEMP</th>
            <th className="border border-black font-normal">CEDP</th>

            {/* Inferior: D DV DH CEMP CEDP */}
            <th className="border border-black font-normal">D</th>
            <th className="border border-black font-normal">DV</th>
            <th className="border border-black font-normal">DH</th>
            <th className="border border-black font-normal">CEMP</th>
            <th className="border border-black font-normal">CEDP</th>
          </tr>
        </thead>

        <tbody>
          {/* 6 filas vacías o con datos */}
          {Array.from({ length: 6 }).map((_, r) => {
            const row = condiciones[r];

            return (
              <tr key={r} className="h-[22px]">
                {/* 1. Id Recinto */}
                <td className="border border-black">{row?.idRecinto ?? ""}</td>
                {/* 2. CO (amb) */}
                <td className="border border-black">{row?.co ?? ""}</td>
                {/* 3. CO diluido (amb) */}
                <td className="border border-black">{row?.coDiluido ?? ""}</td>
                {/* 4. Volumen recinto (m3) */}
                <td className="border border-black">
                  {row?.volumenRecinto ?? ""}
                </td>
                {/* 5. Potencia artefactos (kW) */}
                <td className="border border-black">
                  {row?.potenciaArtefactos ?? ""}
                </td>

                {/* 6-7. Cumple método Estándar */}
                <td className="border border-black font-bold">
                  {row ? (row.cumpleArtefactos ? "X" : "") : ""}
                </td>
                <td className="border border-black font-bold">
                  {row ? (!row.cumpleArtefactos ? "X" : "") : ""}
                </td>

                {/* 8-9. Método de Ventilación */}
                <td className="border border-black font-bold">
                  {markMetodo(row, 1)}
                </td>
                <td className="border border-black font-bold">
                  {markMetodo(row, 2)}
                </td>

                {/* 10-14. Superior Checkboxes */}
                <td className="border border-black font-bold">
                  {markTipoSup(row, "D")}
                </td>
                <td className="border border-black font-bold">
                  {markTipoSup(row, "DV")}
                </td>
                <td className="border border-black font-bold">
                  {markTipoSup(row, "DH")}
                </td>
                <td className="border border-black font-bold">
                  {markTipoSup(row, "CEMP")}
                </td>
                <td className="border border-black font-bold">
                  {markTipoSup(row, "CEDP")}
                </td>

                {/* 15-16. Superior Áreas */}
                <td className="border border-black">
                  {row?.areaMinimaSuperior ?? ""}
                </td>
                <td className="border border-black">
                  {row?.areaAberturaSuperior ?? ""}
                </td>

                {/* 17-21. Inferior Checkboxes */}
                <td className="border border-black font-bold">
                  {markTipoInf(row, "D")}
                </td>
                <td className="border border-black font-bold">
                  {markTipoInf(row, "DV")}
                </td>
                <td className="border border-black font-bold">
                  {markTipoInf(row, "DH")}
                </td>
                <td className="border border-black font-bold">
                  {markTipoInf(row, "CEMP")}
                </td>
                <td className="border border-black font-bold">
                  {markTipoInf(row, "CEDP")}
                </td>

                {/* 22-23. Inferior Áreas */}
                <td className="border border-black">
                  {row?.areaMinimaInferior ?? ""}
                </td>
                <td className="border border-black">
                  {row?.areaAberturaInferior ?? ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
