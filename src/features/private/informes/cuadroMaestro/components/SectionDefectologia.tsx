// SectionDefectologia.tsx
import React from "react";

const Box = () => (
  <span className="inline-block w-[12px] h-[12px] border border-black align-middle" />
);

// COLUMNA DE CÓDIGO + 3 checks (SI/NO/NA)
const GroupCells = ({ code }: { code?: string }) => (
  <>
    {/* Código en casilla propia */}
    <td className="border border-black h-[30px] w-[44px] px-1 text-center align-middle">
      <span className="text-[11px] font-semibold">{code ?? ""}</span>
    </td>
    {/* SI / NO / NA */}
    <td className="border border-black h-[30px] w-[36px] text-center align-middle">
      <Box />
    </td>
    <td className="border border-black h-[30px] w-[36px] text-center align-middle">
      <Box />
    </td>
    <td className="border border-black h-[30px] w-[36px] text-center align-middle">
      <Box />
    </td>
  </>
);

export function SectionDefectologia() {
  const filas: Array<{ label: string; codes: (string | null)[] }> = [
    {
      label: "Hermeticidad de la instalación",
      codes: ["E-01", "E-02", "E-03", "E-04", "E-05", "E-06"],
    },
    {
      label: "Existencia y Operatividad válvulas",
      codes: ["E-07", "E-08", "E-09", "E-10", "E-11", "E-12"],
    },
    {
      label: "Trazado General de la instalación",
      codes: ["E-13", "E-14", "E-15", null, null, null],
    },
    { label: "Materiales", codes: ["E-16", null, null, null, null, null] },
    {
      label: "Condiciones de Ventilación",
      codes: ["E-17", "E-18", null, null, null, null],
    },
    {
      label: "Medición de monóxido carbono (CO)",
      codes: ["E-19", "E-20", "E-21", null, null, null],
    },
    {
      label: "Ubicación de Artefactos a Gas",
      codes: ["E-22", "E-23", "E-24", "E-25", null, null],
    },
  ];

  // 1 (etiqueta) + (6 grupos * 4 columnas) + 2 (reparación) + 3 (cumple final)
  const COLSPAN_TOTAL = 1 + 6 * 4 + 2 + 3; // = 30

  return (
    <table className="table-fixed border-collapse text-xs leading-tight">
      <thead>
        <tr>
          <th className="border border-black px-2 h-[28px] w-[430px] text-left">
            DEFECTOLOGIA ENCONTRADA
          </th>
          {Array.from({ length: 6 }).map((_, i) => (
            <th
              key={`g${i}`}
              className="border border-black h-[28px] text-center bg-gray-100"
              colSpan={4}
            >
              Cumple
            </th>
          ))}
          <th
            className="border border-black h-[28px] text-center bg-gray-100"
            colSpan={2}
          >
            REPARACIÓN INMEDIATA
          </th>
          <th
            className="border border-black h-[28px] text-center bg-gray-100"
            colSpan={3}
          >
            CUMPLE
          </th>
        </tr>

        <tr>
          <th className="border border-black px-2 h-[24px]" />
          {Array.from({ length: 6 }).map((_, i) => (
            <React.Fragment key={`sub${i}`}>
              <th className="border border-black h-[24px] w-[44px]"></th>
              <th className="border border-black h-[24px] w-[36px]">SI</th>
              <th className="border border-black h-[24px] w-[36px]">NO</th>
              <th className="border border-black h-[24px] w-[36px]">NA</th>
            </React.Fragment>
          ))}
          <th className="border border-black h-[24px] w-[44px]">SI</th>
          <th className="border border-black h-[24px] w-[44px]">NO</th>
          <th className="border border-black h-[24px] w-[44px]">SI</th>
          <th className="border border-black h-[24px] w-[44px]">NO</th>
          <th className="border border-black h-[24px] w-[44px]">NA</th>
        </tr>
      </thead>

      <tbody>
        {filas.map((fila, idx) => (
          <tr key={idx}>
            <td className="border border-black px-2 py-1">{fila.label}</td>

            {/* 6 grupos: Código + SI/NO/NA */}
            {Array.from({ length: 6 }).map((_, g) => (
              <GroupCells
                key={`r${idx}g${g}`}
                code={fila.codes[g] ?? undefined}
              />
            ))}

            {/* Reparación inmediata */}
            <td className="border border-black h-[30px] text-center">
              <Box />
            </td>
            <td className="border border-black h-[30px] text-center">
              <Box />
            </td>

            {/* Cumple final */}
            <td className="border border-black h-[30px] text-center">
              <Box />
            </td>
            <td className="border border-black h-[30px] text-center">
              <Box />
            </td>
            <td className="border border-black h-[30px] text-center">
              <Box />
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td
            className="border-t border-black px-2 py-1 text-[10px]"
            colSpan={COLSPAN_TOTAL}
          >
            Los códigos de defectos (E01 al E25) y las demás abreviaturas se
            discriminan en la parte posterior de este documento
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
