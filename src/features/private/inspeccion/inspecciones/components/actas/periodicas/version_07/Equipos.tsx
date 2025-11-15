import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

interface EquipoApi {
  equiposUtilizados: string;
  ns?: string;
  marca?: string;
  modelo?: string;
}

const LabeledLine = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-center gap-1">
    <span className="whitespace-nowrap">{label}</span>
    <span className="block flex-1 border-b border-black h-[14px] text-[11px] leading-none">
      {value ?? ""}
    </span>
  </div>
);

interface EquipmentRowProps {
  leftLabel: string;
  rightLabel: string;
  leftData?: { ns?: string; marca?: string; modelo?: string };
  rightData?: { ns?: string; marca?: string; modelo?: string };
}

const EquipmentRow = ({
  leftLabel,
  rightLabel,
  leftData,
  rightData,
}: EquipmentRowProps) => (
  <tr className="h-[32px]">
    {/* Lado izquierdo */}
    <td className="border border-black px-2 align-middle">{leftLabel}</td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="N/S:" value={leftData?.ns} />
    </td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="Marca:" value={leftData?.marca} />
    </td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="Modelo:" value={leftData?.modelo} />
    </td>

    {/* Lado derecho */}
    <td className="border border-black px-2 align-middle">{rightLabel}</td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="N/S:" value={rightData?.ns} />
    </td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="Marca:" value={rightData?.marca} />
    </td>
    <td className="border border-black px-2 align-middle">
      <LabeledLine label="Modelo:" value={rightData?.modelo} />
    </td>
  </tr>
);

export const Equipos = ({ inspeccion }: Props) => {
  const equipos = (inspeccion?.equiposUtilizados as EquipoApi[]) ?? [];

  const getEquipoData = (keyword: string) => {
    const eq = equipos.find((e) =>
      e.equiposUtilizados?.toLowerCase().includes(keyword.toLowerCase())
    );
    if (!eq) return undefined;
    return {
      ns: eq.ns,
      marca: eq.marca,
      modelo: eq.modelo,
    };
  };

  const detectorCO = getEquipoData("co"); // "Detector CO"
  const detectorFugas = getEquipoData("fuga"); // "Detector Fugas"
  const manometroBaja = getEquipoData("manómetro de baja");
  const flexometro = getEquipoData("flexómetro");
  const manometroMedia = getEquipoData("manómetro de media");
  const otro = getEquipoData("otro");

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
              leftData={detectorCO}
              rightData={manometroBaja}
            />
            <EquipmentRow
              leftLabel="Detector de fugas:"
              rightLabel="Flexómetro:"
              leftData={detectorFugas}
              rightData={flexometro}
            />
            <EquipmentRow
              leftLabel="Manómetro de media"
              rightLabel="Otro:"
              leftData={manometroMedia}
              rightData={otro}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};
