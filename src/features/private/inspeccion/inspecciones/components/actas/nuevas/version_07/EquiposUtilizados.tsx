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
  const acta = inspeccion as any;
  let equipos = (acta?.equiposUtilizados as EquipoApi[]) || [];

  if (acta?.equiposInspeccion && acta.equiposInspeccion.length > 0) {
    equipos = acta.equiposInspeccion as EquipoApi[];
  } else if (
    (!equipos || equipos.length === 0) &&
    acta?.ruta?.persona?.equiposUsuarios
  ) {
    equipos = acta.ruta.persona.equiposUsuarios
      .map((eu: any) => eu.idEquiposUtilizados)
      .filter((e: any) => e) as unknown as EquipoApi[];
  }

  let detectorCO: any, manometroBaja: any, detectorFugas: any, flexometro: any, manometroMedia: any, otro: any;

  equipos.forEach((eq) => {
    const nombre = eq.equiposUtilizados ? eq.equiposUtilizados.toLowerCase().trim() : "";
    let prefix = "";

    if (
      nombre.includes("detector co") ||
      nombre.includes("co") ||
      nombre.includes("monoxido") ||
      nombre.includes("monóxido")
    ) {
      prefix = "detector_co";
    } else if (
      nombre.includes("manómetro de baja") ||
      nombre.includes("manometro de baja") ||
      nombre.includes("baja")
    ) {
      prefix = "manometro_baja";
    } else if (
      (nombre.includes("detector de fugas") || nombre.includes("fugas")) &&
      (acta?.tipo_gas_glp
        ? nombre.includes("propano") || !nombre.includes("metano")
        : nombre.includes("metano") || !nombre.includes("propano"))
    ) {
      prefix = "detector_fugas";
    } else if (
      nombre.includes("detector de fugas") ||
      nombre.includes("fugas")
    ) {
      prefix = "";
    } else if (nombre.includes("flexómetro") || nombre.includes("flexometro")) {
      prefix = "flexometro";
    } else if (
      nombre.includes("manómetro de media") ||
      nombre.includes("manometro de media") ||
      nombre.includes("media")
    ) {
      prefix = "manometro_media";
    } else {
      prefix = "otro";
    }

    const equipoData = { ns: eq.ns, marca: eq.marca, modelo: eq.modelo, nombre: (eq as any).otroEquipo || eq.equiposUtilizados || "" };

    if (prefix === "detector_co") detectorCO = equipoData;
    else if (prefix === "manometro_baja") manometroBaja = equipoData;
    else if (prefix === "detector_fugas") detectorFugas = equipoData;
    else if (prefix === "flexometro") flexometro = equipoData;
    else if (prefix === "manometro_media") manometroMedia = equipoData;
    else if (prefix === "otro") otro = equipoData;
  });

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
            rightLabel={otro?.nombre ? `Otro: ${otro.nombre}` : "Otro:"}
            leftData={manometroMedia}
            rightData={otro}
          />
        </tbody>
      </table>
    </div>
  );
};
