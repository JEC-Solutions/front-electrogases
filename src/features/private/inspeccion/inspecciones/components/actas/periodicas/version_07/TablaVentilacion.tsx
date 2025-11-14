import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const TablaVentilacion = ({ inspeccion }: Props) => {
  const condiciones = inspeccion?.evaluacionCondiciones ?? [];

  // Helpers para marcar X en método y tipo de ventilación
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
    <div className="mt-2 overflow-x-auto overflow-y-hidden">
      <table className="table-fixed w-full min-w-[1248px] border border-black border-collapse text-xs leading-tight">
        {/* --- Anchos de columnas --- */}
        <colgroup>
          {/* Básicas */}
          <col className="w-[90px]" /> {/* Id. Recinto */}
          <col className="w-[80px]" /> {/* CO (amb) */}
          <col className="w-[90px]" /> {/* CO diluido (amb) */}
          <col className="w-[110px]" /> {/* Volumen (m3) */}
          <col className="w-[150px]" /> {/* Potencia artefactos (kW) */}
          <col className="w-[50px]" /> {/* Cumple: SI */}
          <col className="w-[50px]" /> {/* Cumple: NO */}
          <col className="w-[44px]" /> {/* Método: 1 */}
          <col className="w-[44px]" /> {/* Método: 2 */}
          {/* Superior: D DV DH CEMP CEDP + Áreas */}
          <col className="w-[36px]" />
          <col className="w-[36px]" />
          <col className="w-[36px]" />
          <col className="w-[48px]" />
          <col className="w-[48px]" />
          <col className="w-[120px]" />
          <col className="w-[120px]" />
          {/* Inferior: D DV DH CEMP CEDP + Áreas */}
          <col className="w-[36px]" />
          <col className="w-[36px]" />
          <col className="w-[36px]" />
          <col className="w-[48px]" />
          <col className="w-[48px]" />
          <col className="w-[120px]" />
          <col className="w-[120px]" />
        </colgroup>

        <thead>
          {/* Título */}
          <tr>
            <th
              colSpan={23}
              className="border-b border-black text-center font-bold py-1 bg-gray-100"
            >
              7. EVALUACIÓN DE CONDICIONES DE VENTILACIÓN, MEDICIÓN DE MONÓXIDO
              DE CARBONO EN AMBIENTE Y DILUIDO EN AMBIENTE
            </th>
          </tr>

          {/* Fila de grupos principales */}
          <tr className="text-center align-middle">
            <th rowSpan={3} className="border border-black px-2">
              Id. Recinto
            </th>
            <th rowSpan={3} className="border border-black px-2">
              CO
              <br />
              (amb)
            </th>
            <th rowSpan={3} className="border border-black px-2">
              CO diluido
              <br />
              (amb)
            </th>
            <th rowSpan={3} className="border border-black px-2">
              Volumen
              <br />
              recinto
              <br />
              (m³)
            </th>
            <th rowSpan={3} className="border border-black px-2">
              Potencia artefactos
              <br />
              circuito abierto
              <br />
              (kW)
            </th>

            <th colSpan={2} rowSpan={2} className="border border-black px-2">
              Cumple método
              <br />
              Estándar
            </th>
            <th colSpan={2} rowSpan={2} className="border border-black px-2">
              Método de
              <br />
              Ventilación
            </th>

            <th colSpan={7} className="border border-black px-2">
              Superior
            </th>
            <th colSpan={7} className="border border-black px-2">
              Inferior
            </th>
          </tr>

          {/* Fila intermedia */}
          <tr className="text-center">
            {/* Superior */}
            <th colSpan={5} className="border border-black px-2">
              Tipo de Ventilación
            </th>
            <th rowSpan={2} className="border border-black px-2">
              Área mínima
              <br />
              requerida (cm²)
            </th>
            <th rowSpan={2} className="border border-black px-2">
              Área abertura
              <br />
              existente (cm²)
            </th>

            {/* Inferior */}
            <th colSpan={5} className="border border-black px-2">
              Tipo de ventilación
            </th>
            <th rowSpan={2} className="border border-black px-2">
              Área mínima
              <br />
              requerida (cm²)
            </th>
            <th rowSpan={2} className="border border-black px-2">
              Área abertura
              <br />
              existente (cm²)
            </th>
          </tr>

          {/* Fila de subencabezados finales */}
          <tr className="text-center">
            {/* Cumple / Método */}
            <th className="border border-black">SI</th>
            <th className="border border-black">NO</th>
            <th className="border border-black">1</th>
            <th className="border border-black">2</th>

            {/* Superior: D DV DH CEMP CEDP */}
            <th className="border border-black">D</th>
            <th className="border border-black">DV</th>
            <th className="border border-black">DH</th>
            <th className="border border-black">CEMP</th>
            <th className="border border-black">CEDP</th>

            {/* Inferior: D DV DH CEMP CEDP */}
            <th className="border border-black">D</th>
            <th className="border border-black">DV</th>
            <th className="border border-black">DH</th>
            <th className="border border-black">CEMP</th>
            <th className="border border-black">CEDP</th>
          </tr>
        </thead>

        <tbody>
          {/* Máximo 6 filas (RA, RB, RC, RD, RE, RF, por ejemplo) */}
          {Array.from({ length: 6 }).map((_, r) => {
            const row = condiciones[r];

            return (
              <tr key={r} className="h-[28px]">
                {/* 1. Id Recinto */}
                <td className="border border-black">
                  {row?.idRecinto ?? ""}
                </td>

                {/* 2. CO (amb) */}
                <td className="border border-black">
                  {row?.co ?? ""}
                </td>

                {/* 3. CO diluido (amb) */}
                <td className="border border-black">
                  {row?.coDiluido ?? ""}
                </td>

                {/* 4. Volumen recinto (m3) */}
                <td className="border border-black">
                  {row?.volumenRecinto ?? ""}
                </td>

                {/* 5. Potencia artefactos (kW) */}
                <td className="border border-black">
                  {row?.potenciaArtefactos ?? ""}
                </td>

                {/* 6. Cumple método Estándar - SI */}
                <td className="border border-black">
                  {row ? (row.cumpleArtefactos ? "X" : "") : ""}
                </td>

                {/* 7. Cumple método Estándar - NO */}
                <td className="border border-black">
                  {row ? (!row.cumpleArtefactos ? "X" : "") : ""}
                </td>

                {/* 8. Método de Ventilación 1 */}
                <td className="border border-black">
                  {markMetodo(row, 1)}
                </td>

                {/* 9. Método de Ventilación 2 */}
                <td className="border border-black">
                  {markMetodo(row, 2)}
                </td>

                {/* 10-14. Superior D, DV, DH, CEMP, CEDP */}
                <td className="border border-black">
                  {markTipoSup(row, "D")}
                </td>
                <td className="border border-black">
                  {markTipoSup(row, "DV")}
                </td>
                <td className="border border-black">
                  {markTipoSup(row, "DH")}
                </td>
                <td className="border border-black">
                  {markTipoSup(row, "CEMP")}
                </td>
                <td className="border border-black">
                  {markTipoSup(row, "CEDP")}
                </td>

                {/* 15. Área mínima sup (cm2) */}
                <td className="border border-black">
                  {row?.areaMinimaSuperior ?? ""}
                </td>

                {/* 16. Área abertura sup (cm2) */}
                <td className="border border-black">
                  {row?.areaAberturaSuperior ?? ""}
                </td>

                {/* 17-21. Inferior D, DV, DH, CEMP, CEDP */}
                <td className="border border-black">
                  {markTipoInf(row, "D")}
                </td>
                <td className="border border-black">
                  {markTipoInf(row, "DV")}
                </td>
                <td className="border border-black">
                  {markTipoInf(row, "DH")}
                </td>
                <td className="border border-black">
                  {markTipoInf(row, "CEMP")}
                </td>
                <td className="border border-black">
                  {markTipoInf(row, "CEDP")}
                </td>

                {/* 22. Área mínima inf (cm2) */}
                <td className="border border-black">
                  {row?.areaMinimaInferior ?? ""}
                </td>

                {/* 23. Área abertura inf (cm2) */}
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
