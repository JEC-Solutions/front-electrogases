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
  <div className="flex items-end w-full overflow-hidden">
    <span className="whitespace-nowrap mr-[2px] leading-none text-[7pt]">
      {label}
    </span>
    <div className="flex-1 border-b border-black text-center leading-none h-[10px] truncate text-[7pt]">
      {value ?? ""}
    </div>
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
  <tr className="h-[20px]">
    <td className="border border-black px-1 align-middle text-left whitespace-nowrap">
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

    <td className="border border-black px-1 align-middle text-left whitespace-nowrap">
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

export const EquiposUtilizados = ({ inspeccion }: Props) => {
  let equipos = (inspeccion?.equiposUtilizados as EquipoApi[]) ?? [];

  if (equipos.length === 0 && inspeccion?.ruta?.persona?.equiposUsuarios) {
    equipos = inspeccion.ruta.persona.equiposUsuarios
      .map((eu) => eu.idEquiposUtilizados)
      .filter((e) => e) as unknown as EquipoApi[];
  }

  const getEquipoData = (keyword: string) => {
    const eq = equipos.find((e) =>
      e.equiposUtilizados?.toLowerCase().includes(keyword.toLowerCase()),
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
    <div className="w-full font-arial text-black mt-[-1px]">
      <table className="w-full table-fixed border-collapse border border-black text-[7.5pt] leading-none">
        <colgroup>
          <col style={{ width: "13%" }} /> {/* Etiqueta */}
          <col style={{ width: "10%" }} /> {/* N/S */}
          <col style={{ width: "13.5%" }} /> {/* Marca */}
          <col style={{ width: "13.5%" }} /> {/* Modelo */}
          <col style={{ width: "13%" }} /> {/* Etiqueta */}
          <col style={{ width: "10%" }} /> {/* N/S */}
          <col style={{ width: "13.5%" }} /> {/* Marca */}
          <col style={{ width: "13.5%" }} /> {/* Modelo */}
        </colgroup>

        <thead>
          <tr>
            <th
              className="bg-gray-200 font-bold text-center border border-black py-1 text-[7pt]"
              colSpan={8}
            >
              10. REGISTRO DE EQUIPOS UTILIZADOS EN LA INSPECCIÓN
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
