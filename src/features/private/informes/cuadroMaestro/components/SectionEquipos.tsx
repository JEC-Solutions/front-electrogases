/** Celda "Etiqueta: ______" con línea para escribir */
const LabeledLine = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1">
    <span className="whitespace-nowrap">{label}</span>
    <span className="block flex-1 border-b border-black h-[14px]" />
  </div>
);

/** Una fila de equipos: izquierda y derecha (cada lado: N/S, Marca, Modelo) */
const EquipmentRow = ({
  leftLabel,
  rightLabel,
}: {
  leftLabel: string;
  rightLabel: string;
}) => (
  <tr className="h-[32px]">
    {/* Lado izquierdo */}
    <td className="border border-black px-2 align-middle">{leftLabel}</td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="N/S:" />
    </td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="Marca:" />
    </td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="Modelo:" />
    </td>

    {/* Lado derecho */}
    <td className="border border-black px-2 align-middle">{rightLabel}</td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="N/S:" />
    </td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="Marca:" />
    </td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="Modelo:" />
    </td>
  </tr>
);

export function SectionEquipos() {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="min-w-[1248px]">
        <table className="table-fixed border-collapse text-xs leading-tight w-full">
          {/* Control de anchos por columna para que se parezca al formato original */}
          <colgroup>
            <col className="w-[210px]" /> {/* Etiq. izq */}
            <col className="w-[140px]" /> {/* N/S   */}
            <col className="w-[230px]" /> {/* Marca */}
            <col className="w-[230px]" /> {/* Modelo */}
            <col className="w-[210px]" /> {/* Etiq. der */}
            <col className="w-[140px]" /> {/* N/S   */}
            <col className="w-[230px]" /> {/* Marca */}
            <col className="w-[230px]" /> {/* Modelo */}
          </colgroup>

          <thead>
            <tr>
              <th
                className="bg-gray-100 font-bold text-center border border-black h-[28px]"
                colSpan={8}
              >
                9. REGISTRO DE EQUIPOS UTILIZADOS EN LA INSPECCIÓN
              </th>
            </tr>
          </thead>

          <tbody>
            <EquipmentRow
              leftLabel="Detector de CO:"
              rightLabel="Manómetro de baja"
            />
            <EquipmentRow
              leftLabel="Detector de fugas:"
              rightLabel="Flexómetro:"
            />
            <EquipmentRow
              leftLabel="Manómetro de media"
              rightLabel="Otro:"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
