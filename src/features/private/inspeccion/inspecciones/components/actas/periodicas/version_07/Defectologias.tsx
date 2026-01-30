import { Fragment } from "react/jsx-runtime";
import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

const Box = ({ checked }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[9px] h-[9px] border border-black bg-white">
    {checked && (
      <span className="text-[7px] font-bold leading-none -mt-[1px]">✓</span>
    )}
  </span>
);

type Estado = "SI" | "NO" | "NA";

const GroupCells = ({
  code,
  state,
  isLastGroup = false,
}: {
  code?: string | null;
  state?: Estado;
  isLastGroup?: boolean;
}) => {
  if (!code) {
    return (
      <>
        <td className="border-r  border-b border-dotted border-gray-400"></td>

        <td className="border-r  border-b border-dotted border-gray-400"></td>
        <td className="border-r  border-b border-dotted border-gray-400"></td>
        <td
          className={`border-r ${isLastGroup ? "border-black" : "border-gray-400"} border-b border-dotted border-gray-400`}
        ></td>
      </>
    );
  }

  return (
    <>
      <td className="border border-black text-center align-middle font-semibold text-[6.5pt] bg-white h-[16px]">
        {code}
      </td>

      <td className="border border-black text-center align-middle bg-white">
        <Box checked={state === "SI"} />
      </td>
      <td className="border border-black text-center align-middle bg-white">
        <Box checked={state === "NO"} />
      </td>
      <td className="border border-black text-center align-middle bg-white">
        <Box checked={state === "NA"} />
      </td>
    </>
  );
};

export const Defectologias = ({ inspeccion }: Props) => {
  const filas = [
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
    {
      label: "Materiales",
      codes: ["E-16", null, null, null, null, null],
    },
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
    <div className="w-full font-arial text-black mt-[-1px]">
      <table className="w-full table-fixed border-collapse border border-black text-[7pt] leading-none">
        <colgroup>
          <col style={{ width: "18%" }} />
          {Array.from({ length: 6 }).map((_, i) => (
            <Fragment key={i}>
              <col style={{ width: "2.5%" }} />
              <col style={{ width: "1.8%" }} />
              <col style={{ width: "1.8%" }} />
              <col style={{ width: "1.8%" }} />
            </Fragment>
          ))}
          <col style={{ width: "3%" }} />
          <col style={{ width: "3%" }} />
          <col style={{ width: "2.5%" }} />
          <col style={{ width: "2.5%" }} />
          <col style={{ width: "2.5%" }} />
        </colgroup>

        <thead>
          <tr className="bg-gray-100 h-[14px]">
            <th
              className="border border-black px-1 text-center font-normal align-middle"
              rowSpan={2}
            >
              DEFECTOLOGIA ENCONTRADA
            </th>

            {Array.from({ length: 6 }).map((_, i) => (
              <th
                key={`h1-g${i}`}
                className="border border-black text-center font-normal text-[6.5pt]"
                colSpan={4}
              >
                Cumple
              </th>
            ))}

            <th
              className="border border-black text-center font-normal text-[6.5pt]"
              colSpan={2}
            >
              REPARACIÓN INMEDIATA
            </th>

            <th
              className="border border-black text-center font-normal text-[6.5pt]"
              colSpan={3}
            >
              CUMPLE
            </th>
          </tr>

          <tr className="bg-gray-100 h-[14px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <Fragment key={`h2-g${i}`}>
                <th className="border border-black"></th>
                <th className="border border-black font-normal text-[6pt]">
                  SI
                </th>
                <th className="border border-black font-normal text-[6pt]">
                  NO
                </th>
                <th className="border border-black font-normal text-[6pt]">
                  NA
                </th>
              </Fragment>
            ))}

            <th className="border border-black font-normal text-[6pt]">SI</th>
            <th className="border border-black font-normal text-[6pt]">NO</th>

            <th className="border border-black font-normal text-[6pt]">SI</th>
            <th className="border border-black font-normal text-[6pt]">NO</th>
            <th className="border border-black font-normal text-[6pt]">NA</th>
          </tr>
        </thead>

        <tbody>
          {filas.map((fila, idx) => {
            const estados = fila.codes
              .filter((code): code is string => code !== null)
              .map((code) => getEstadoCodigo(code));

            const cumpleFila: Estado = estados.includes("NO")
              ? "NO"
              : estados.every((e) => e === "NA")
                ? "NA"
                : "SI";

            return (
              <tr key={idx} className="h-[16px]">
                <td className="border border-black px-1 truncate text-left border-r-0 relative">
                  <span className="relative z-10 bg-white pr-1">
                    {fila.label}
                  </span>

                  <div className="absolute inset-x-0 top-1/2 border-b border-dotted border-gray-400 z-0"></div>
                </td>

                {Array.from({ length: 6 }).map((_, g) => (
                  <GroupCells
                    key={`r${idx}g${g}`}
                    code={fila.codes[g]}
                    state={getEstadoCodigo(fila.codes[g])}
                    isLastGroup={g === 5}
                  />
                ))}

                <td className="border border-black text-center align-middle">
                  <Box />
                </td>
                <td className="border border-black text-center align-middle">
                  <Box />
                </td>

                <td className="border border-black text-center align-middle border-l-[2px] border-l-black">
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
              className="border border-black px-2 py-[1px] text-[6.5pt] text-center"
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
