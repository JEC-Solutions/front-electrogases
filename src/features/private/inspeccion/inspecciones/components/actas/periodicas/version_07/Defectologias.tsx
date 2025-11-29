import { Fragment } from "react/jsx-runtime";
import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

const Box = ({ checked }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[10px] h-[10px] border border-black bg-white">
    {checked && <span className="text-[8px] font-bold leading-none">X</span>}
  </span>
);

type Estado = "SI" | "NO" | "NA";

const GroupCells = ({
  code,
  state,
}: {
  code?: string | null;
  state?: Estado;
}) => {
  if (!code) {
    return (
      <>
        <td className="border border-black bg-gray-50"></td>
        <td className="border border-black bg-gray-50"></td>
        <td className="border border-black bg-gray-50"></td>
        <td className="border border-black bg-gray-50"></td>
      </>
    );
  }

  return (
    <>
      {/* Código (E-01) */}
      <td className="border border-black text-center align-middle font-semibold bg-gray-50">
        {code}
      </td>
      {/* Casillas */}
      <td className="border border-black text-center align-middle">
        <Box checked={state === "SI"} />
      </td>
      <td className="border border-black text-center align-middle">
        <Box checked={state === "NO"} />
      </td>
      <td className="border border-black text-center align-middle">
        <Box checked={state === "NA"} />
      </td>
    </>
  );
};

export const Defectologias = ({ inspeccion }: Props) => {
  const filas: Array<{ label: string; codes: (string | null)[] }> = [
    {
      label: "Hermeticidad de la instalacion",
      codes: ["E-01", "E-02", "E-03", "E-04", "E-05", "E-06"],
    },
    {
      label: "Existencia y Operatividad valvulas",
      codes: ["E-07", "E-08", "E-09", "E-10", "E-11", "E-12"],
    },
    {
      label: "Trazado General de la instalacion",
      codes: ["E-13", "E-14", "E-15", null, null, null],
    },
    { label: "Materiales", codes: ["E-16", null, null, null, null, null] },
    {
      label: "Condiciones de Ventilacion",
      codes: ["E-17", "E-18", null, null, null, null],
    },
    {
      label: "Medicion de monoxido carbono (CO)",
      codes: ["E-19", "E-20", "E-21", null, null, null],
    },
    {
      label: "Ubicación de Artefactos a Gas",
      codes: ["E-22", "E-23", "E-24", "E-25", null, null],
    },
  ];

  const resultados = inspeccion?.resultadoDefectologias ?? [];
  const mapaResultados = new Map<string, boolean>();
  resultados.forEach((r: any) => {
    const codigo = r.defectologia?.codigo as string | undefined;
    if (codigo) {
      mapaResultados.set(codigo, r.resultado);
    }
  });

  const getEstadoCodigo = (code?: string | null): Estado | undefined => {
    if (!code) return undefined;
    if (!mapaResultados.has(code)) return "NA";
    const res = mapaResultados.get(code);
    if (res === true) return "SI";
    if (res === false) return "NO";
    return "NA";
  };

  const COLSPAN_TOTAL = 30;

  return (
    <div className="w-full font-arial text-black">
      <table className="w-full table-fixed border-collapse border border-black text-[7pt] leading-none">
        <colgroup>
          <col style={{ width: "22%" }} />
          {Array.from({ length: 6 }).map((_, i) => (
            <Fragment key={i}>
              <col style={{ width: "3.5%" }} /> {/* Código */}
              <col style={{ width: "2.33%" }} /> {/* SI */}
              <col style={{ width: "2.33%" }} /> {/* NO */}
              <col style={{ width: "2.33%" }} /> {/* NA */}
            </Fragment>
          ))}
          {/* Reparación Inmediata (aprox 6%) */}
          <col style={{ width: "3%" }} /> {/* SI */}
          <col style={{ width: "3%" }} /> {/* NO */}
          {/* Cumple Final (aprox 9%) */}
          <col style={{ width: "3%" }} /> {/* SI */}
          <col style={{ width: "3%" }} /> {/* NO */}
          <col style={{ width: "3%" }} /> {/* NA */}
        </colgroup>

        <thead>
          {/* Fila 1: Encabezados Principales */}
          <tr className="bg-gray-200">
            <th className="border border-black px-1 py-1 text-left text-[8pt]">
              DEFECTOLOGIA ENCONTRADA
            </th>
            {/* 6 Bloques "Cumple" */}
            {Array.from({ length: 6 }).map((_, i) => (
              <th
                key={`h1-g${i}`}
                className="border border-black text-center font-normal"
                colSpan={4}
              >
                Cumple
              </th>
            ))}
            <th
              className="border border-black text-center font-normal"
              colSpan={2}
            >
              REPARACIÓN INMEDIATA
            </th>
            <th
              className="border border-black text-center font-normal"
              colSpan={3}
            >
              CUMPLE
            </th>
          </tr>

          {/* Fila 2: Sub-encabezados (SI, NO, NA) */}
          <tr className="bg-white">
            <th className="border border-black h-[14px]"></th>{" "}
            {/* Espacio bajo Defectología */}
            {/* 6 Grupos */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Fragment key={`h2-g${i}`}>
                <th className="border border-black bg-gray-50"></th>{" "}
                {/* Espacio para Código */}
                <th className="border border-black font-normal">SI</th>
                <th className="border border-black font-normal">NO</th>
                <th className="border border-black font-normal">NA</th>
              </Fragment>
            ))}
            {/* Reparación */}
            <th className="border border-black font-normal">SI</th>
            <th className="border border-black font-normal">NO</th>
            {/* Cumple Final */}
            <th className="border border-black font-normal">SI</th>
            <th className="border border-black font-normal">NO</th>
            <th className="border border-black font-normal">NA</th>
          </tr>
        </thead>

        <tbody>
          {filas.map((fila, idx) => {
            // Lógica para determinar el estado final de la fila
            const estadosPorCodigo = fila.codes.map((code) =>
              getEstadoCodigo(code)
            );
            const estadosValidos = estadosPorCodigo.filter(
              (st, i) => fila.codes[i] && st
            ) as Estado[];

            const hayNO = estadosValidos.includes("NO");
            const todosSI =
              estadosValidos.length > 0 &&
              estadosValidos.every((st) => st === "SI");
            const hayNA = estadosValidos.includes("NA");

            let cumpleFila: Estado | undefined;
            if (hayNO) cumpleFila = "NO";
            else if (todosSI) cumpleFila = "SI";
            else if (hayNA) cumpleFila = "NA";

            return (
              <tr key={idx} className="h-[20px]">
                {" "}
                {/* Altura reducida de fila */}
                <td className="border border-black px-1 truncate">
                  {fila.label}
                </td>
                {/* 6 Grupos de Códigos */}
                {Array.from({ length: 6 }).map((_, g) => (
                  <GroupCells
                    key={`r${idx}g${g}`}
                    code={fila.codes[g]}
                    state={estadosPorCodigo[g]}
                  />
                ))}
                {/* Reparación Inmediata (Vacío por defecto) */}
                <td className="border border-black text-center align-middle">
                  <Box />
                </td>
                <td className="border border-black text-center align-middle">
                  <Box />
                </td>
                {/* Cumple Final Fila */}
                <td className="border border-black text-center align-middle">
                  <Box checked={cumpleFila === "SI"} />
                </td>
                <td className="border border-black text-center align-middle">
                  <Box checked={cumpleFila === "NO"} />
                </td>
                <td className="border border-black text-center align-middle">
                  <Box checked={cumpleFila === "NA"} />
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <td
              className="border border-black px-2 py-0.5 text-[6.5pt] text-center italic"
              colSpan={COLSPAN_TOTAL}
            >
              Los códigos de defectos (E01 al E25) y las demás abreviaturas se
              discriminan en la parte posterior de este documento
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
