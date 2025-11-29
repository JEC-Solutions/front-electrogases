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

// Componente para línea con etiqueta (ej: "Marca: _______")
const LabeledLine = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-end w-full overflow-hidden">
    <span className="whitespace-nowrap font-semibold mr-1 leading-none">
      {label}
    </span>
    <span className="flex-1 border-b border-black text-center leading-none h-[12px] truncate">
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
  <tr className="h-[26px]">
    {/* --- LADO IZQUIERDO --- */}
    <td className="border border-black px-1 align-middle font-semibold text-left">
      {leftLabel}
    </td>
    <td className="border border-black px-1 align-middle">
      <LabeledLine label="N/S:" value={leftData?.ns} />
    </td>
    <td className="border border-black px-1 align-middle">
      <LabeledLine label="Marca:" value={leftData?.marca} />
    </td>
    <td className="border border-black px-1 align-middle">
      <LabeledLine label="Modelo:" value={leftData?.modelo} />
    </td>

    {/* --- LADO DERECHO --- */}
    <td className="border border-black px-1 align-middle font-semibold text-left">
      {rightLabel}
    </td>
    <td className="border border-black px-1 align-middle">
      <LabeledLine label="N/S:" value={rightData?.ns} />
    </td>
    <td className="border border-black px-1 align-middle">
      <LabeledLine label="Marca:" value={rightData?.marca} />
    </td>
    <td className="border border-black px-1 align-middle">
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

  const detectorCO = getEquipoData("co");
  const detectorFugas = getEquipoData("fuga");
  const manometroBaja = getEquipoData("manómetro de baja");
  const flexometro = getEquipoData("flexómetro");
  const manometroMedia = getEquipoData("manómetro de media");
  const otro = getEquipoData("otro");

  return (
    <div className="w-full font-arial text-black">
      <table className="w-full table-fixed border-collapse border border-black text-[7.5pt] leading-none">
        <colgroup>
          {/* Lado Izquierdo */}
          <col style={{ width: "14%" }} /> {/* Etiqueta */}
          <col style={{ width: "8%" }} /> {/* N/S */}
          <col style={{ width: "14%" }} /> {/* Marca */}
          <col style={{ width: "14%" }} /> {/* Modelo */}
          {/* Lado Derecho */}
          <col style={{ width: "14%" }} /> {/* Etiqueta */}
          <col style={{ width: "8%" }} /> {/* N/S */}
          <col style={{ width: "14%" }} /> {/* Marca */}
          <col style={{ width: "14%" }} /> {/* Modelo */}
        </colgroup>

        <thead>
          <tr>
            <th
              className="bg-gray-200 font-bold text-center border border-black py-1"
              colSpan={8}
            >
              9. REGISTRO DE EQUIPOS UTILIZADOS EN LA INSPECCIÓN
            </th>
          </tr>
        </thead>

        <tbody>
          <EquipmentRow
            leftLabel="Detector de CO:"
            rightLabel="Manometro de baja"
            leftData={detectorCO}
            rightData={manometroBaja}
          />
          <EquipmentRow
            leftLabel="Detector de fugas:"
            rightLabel="Flexometro:"
            leftData={detectorFugas}
            rightData={flexometro}
          />
          <EquipmentRow
            leftLabel="Manometro de media"
            rightLabel="Otro:"
            leftData={manometroMedia}
            rightData={otro}
          />
        </tbody>
      </table>
    </div>
  );
};
