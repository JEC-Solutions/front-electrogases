import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const TablaVentilacion = ({ inspeccion }: Props) => {
  const condiciones = inspeccion?.evaluacionCondiciones ?? [];
  const maxRows = 6;
  const filas = Array.from({ length: maxRows });

  const mark = (val: boolean) => (val ? "✓" : "");
  const markMetodo = (row: any, val: number) =>
    row?.metodoVentilacion == val ? "✓" : "";
  const markSup = (row: any, tipo: string) =>
    row?.tipoVentilacionSuperior === tipo ? "✓" : "";
  const markInf = (row: any, tipo: string) =>
    row?.tipoVentilacionInferior === tipo ? "✓" : "";

  const border = "border border-black";
  const headerBase =
    "bg-gray-100 font-bold px-[1px] leading-tight text-[6.5pt]";
  const cellBase = "border border-black text-center h-[20px]";

  return (
    <div className="w-full font-arial text-black text-[7pt]">
      <div className="w-full border-l border-r border-black bg-gray-200 font-bold text-center text-[7pt] py-1 border-b-0">
        7. EVALUACIÓN DE CONDICIONES DE VENTILACIÓN, MEDICIÓN DE MONÓXIDO DE
        CARBONO EN AMBIENTE Y DILUIDO EN AMBIENTE
      </div>

      <table className="w-full table-fixed border-collapse border border-black text-center">
        <colgroup>
          <col style={{ width: "4%" }} /> {/* Id */}
          <col style={{ width: "4%" }} /> {/* CO */}
          <col style={{ width: "4%" }} /> {/* CO Dil */}
          <col style={{ width: "5%" }} /> {/* Vol */}
          <col style={{ width: "6%" }} /> {/* Pot */}
          <col style={{ width: "3%" }} /> {/* Cumple SI */}
          <col style={{ width: "3%" }} /> {/* Cumple NO */}
          <col style={{ width: "3%" }} /> {/* Met 1 */}
          <col style={{ width: "3%" }} /> {/* Met 2 */}
          {/* Superior (7 cols) */}
          <col style={{ width: "2.5%" }} />
          <col style={{ width: "2.5%" }} />
          <col style={{ width: "2.5%" }} />
          <col style={{ width: "3%" }} />
          <col style={{ width: "3%" }} />
          <col style={{ width: "5.5%" }} />
          <col style={{ width: "5.5%" }} />
          {/* Inferior (7 cols) */}
          <col style={{ width: "2.5%" }} />
          <col style={{ width: "2.5%" }} />
          <col style={{ width: "2.5%" }} />
          <col style={{ width: "3%" }} />
          <col style={{ width: "3%" }} />
          <col style={{ width: "5.5%" }} />
          <col style={{ width: "5.5%" }} />
        </colgroup>

        <thead>
          <tr className={headerBase}>
            <th className={border} rowSpan={3}>
              Id.
              <br />
              Recinto
            </th>
            <th className={border} rowSpan={3}>
              CO
              <br />
              (amb)
            </th>
            <th className={border} rowSpan={3}>
              CO
              <br />
              diluido
              <br />
              (amb)
            </th>
            <th className={border} rowSpan={3}>
              Volumen
              <br />
              recinto
              <br />
              (m3)
            </th>
            <th className={border} rowSpan={3}>
              Potencia
              <br />
              artefactos
              <br />
              circuito abierto
              <br />
              (kW)
            </th>

            <th className={border} colSpan={2} rowSpan={2}>
              Cumple metodo
              <br />
              Estandar
            </th>
            <th className={border} colSpan={2} rowSpan={2}>
              Metodo de
              <br />
              Ventilacion
            </th>

            <th className={border} colSpan={7}>
              Superior
            </th>
            <th className={border} colSpan={7}>
              Inferior
            </th>
          </tr>

          <tr className={headerBase}>
            <th className={border} colSpan={5}>
              Tipo de Ventilacion
            </th>
            <th className={border} rowSpan={2}>
              Área minima
              <br />
              requerida
              <br />
              (cm2)
            </th>
            <th className={border} rowSpan={2}>
              Área abertura
              <br />
              existente
              <br />
              (cm2)
            </th>

            <th className={border} colSpan={5}>
              Tipo de ventilacion
            </th>
            <th className={border} rowSpan={2}>
              Área minima
              <br />
              requerida
              <br />
              (cm2)
            </th>
            <th className={border} rowSpan={2}>
              Área abertura
              <br />
              existente
              <br />
              (cm2)
            </th>
          </tr>

          <tr className={headerBase}>
            <th className={border}>SI</th>
            <th className={border}>NO</th>
            <th className={border}>1</th>
            <th className={border}>2</th>

            <th className={border}>D</th>
            <th className={border}>DV</th>
            <th className={border}>DH</th>
            <th className={border}>CEMP</th>
            <th className={border}>CEDP</th>

            <th className={border}>D</th>
            <th className={border}>DV</th>
            <th className={border}>DH</th>
            <th className={border}>CEMP</th>
            <th className={border}>CEDP</th>
          </tr>
        </thead>

        <tbody>
          {filas.map((_, i) => {
            const row = condiciones[i];
            return (
              <tr key={i} className="h-[20px]">
                <td className={cellBase}>{row?.idRecinto}</td>
                <td className={cellBase}>{row?.co}</td>
                <td className={cellBase}>{row && (row.coDiluido ?? "N/A")}</td>
                <td className={cellBase}>{row?.volumenRecinto}</td>
                <td className={cellBase}>{row?.potenciaArtefactos}</td>

                <td className={`${cellBase} font-bold`}>
                  {mark(row?.cumpleArtefactos === true)}
                </td>
                <td className={`${cellBase} font-bold`}>
                  {mark(row?.cumpleArtefactos === false)}
                </td>

                <td className={`${cellBase} font-bold`}>
                  {markMetodo(row, 1)}
                </td>
                <td className={`${cellBase} font-bold`}>
                  {markMetodo(row, 2)}
                </td>

                <td className={`${cellBase} font-bold`}>{markSup(row, "D")}</td>
                <td className={`${cellBase} font-bold`}>
                  {markSup(row, "DV")}
                </td>
                <td className={`${cellBase} font-bold`}>
                  {markSup(row, "DH")}
                </td>
                <td className={`${cellBase} font-bold`}>
                  {markSup(row, "CEMP")}
                </td>
                <td className={`${cellBase} font-bold`}>
                  {markSup(row, "CEDP")}
                </td>
                <td className={cellBase}>{row?.areaMinimaSuperior}</td>
                <td className={cellBase}>{row?.areaAberturaSuperior}</td>

                <td className={`${cellBase} font-bold`}>{markInf(row, "D")}</td>
                <td className={`${cellBase} font-bold`}>
                  {markInf(row, "DV")}
                </td>
                <td className={`${cellBase} font-bold`}>
                  {markInf(row, "DH")}
                </td>
                <td className={`${cellBase} font-bold`}>
                  {markInf(row, "CEMP")}
                </td>
                <td className={`${cellBase} font-bold`}>
                  {markInf(row, "CEDP")}
                </td>
                <td className={cellBase}>{row?.areaMinimaInferior}</td>
                <td className={cellBase}>{row?.areaAberturaInferior}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
