import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const RegistroEquipos = ({ inspeccion }: Props) => {
  let listaEquipos = inspeccion?.equiposUtilizados || [];

  if (inspeccion?.equiposInspeccion && inspeccion.equiposInspeccion.length > 0) {
    listaEquipos = inspeccion.equiposInspeccion;
  } else if (
    (!listaEquipos || listaEquipos.length === 0) &&
    inspeccion?.ruta?.persona?.equiposUsuarios
  ) {
    listaEquipos = (inspeccion.ruta.persona.equiposUsuarios || [])
      .map((eu: any) => eu.idEquiposUtilizados)
      .filter((item: any) => item);
  }

  const equipos: Record<string, any> = {};

  listaEquipos.forEach((eq: any) => {
    const nombre = eq.equiposUtilizados
      ? String(eq.equiposUtilizados).toLowerCase().trim()
      : "";
    let prefix = "";

    if (nombre.includes("flexometro") || nombre.includes("flexómetro")) {
      prefix = "flexometro";
    } else if (
      nombre.includes("detector de fugas") ||
      nombre.includes("fugas")
    ) {
      prefix = "detector_fugas";
    } else if (nombre.includes("manometro") || nombre.includes("manómetro")) {
      if (!equipos.manometro_ns && !equipos.manometro_marca) {
        prefix = "manometro";
      }
    }

    if (prefix) {
      equipos[`${prefix}_ns`] = eq.ns;
      equipos[`${prefix}_marca`] = eq.marca;
      equipos[`${prefix}_modelo`] = eq.modelo;
    }
  });

  const eqVal = (v: any) => (v !== null && v !== undefined ? String(v) : "");

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Encabezado Principal (Gris) */}
      <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
        7.REGISTRO DE EQUIPOS  UTILIZADOS EN LA INSPECCIÓN
      </div>

      {/* Fila 1: Detector de Fugas */}
      <div className="flex flex-row w-full border-b border-black min-h-[16px] text-[6.8pt] box-border">
        <div className="w-[17%] border-r border-black px-[5px] py-[2px] flex items-center box-border whitespace-nowrap">
          <span>Detector de Fugas</span>
        </div>
        <div className="w-[19%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">N/S</span>
          <span className="font-bold flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.detector_fugas_ns)}
          </span>
        </div>
        <div className="w-[27%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">Marca</span>
          <span className="font-bold flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.detector_fugas_marca)}
          </span>
        </div>
        <div className="w-[37%] px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">Modelo:</span>
          <span className="font-bold flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.detector_fugas_modelo)}
          </span>
        </div>
      </div>

      {/* Fila 2: Manometro */}
      <div className="flex flex-row w-full border-b border-black min-h-[16px] text-[6.8pt] box-border">
        <div className="w-[17%] border-r border-black px-[5px] py-[2px] flex items-center box-border whitespace-nowrap">
          <span>Manometro</span>
        </div>
        <div className="w-[19%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">N/S</span>
          <span className="font-bold flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.manometro_ns)}
          </span>
        </div>
        <div className="w-[27%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">Marca</span>
          <span className="font-bold flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.manometro_marca)}
          </span>
        </div>
        <div className="w-[37%] px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">Modelo:</span>
          <span className="font-bold flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.manometro_modelo)}
          </span>
        </div>
      </div>

      {/* Fila 3: Flexometro */}
      <div className="flex flex-row w-full border-b border-black min-h-[16px] text-[6.8pt] box-border">
        <div className="w-[17%] border-r border-black px-[5px] py-[2px] flex items-center box-border whitespace-nowrap">
          <span>Flexometro</span>
        </div>
        <div className="w-[19%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">N/S</span>
          <span className="font-bold flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.flexometro_ns)}
          </span>
        </div>
        <div className="w-[27%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">Marca</span>
          <span className="font-bold flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.flexometro_marca)}
          </span>
        </div>
        <div className="w-[37%] px-[5px] py-[2px] flex items-center box-border">
          <span className="whitespace-nowrap mr-[4px]">Modelo:</span>
          <span className="font-bold flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap">
            {eqVal(equipos.flexometro_modelo)}
          </span>
        </div>
      </div>

      {/* Fila 4 (Inferior): Siglas y Glosario */}
      <div className="flex flex-row justify-between w-full min-h-[14px] p-[1.5px_6px] text-[5.7pt] box-border whitespace-nowrap leading-[1.2]">
        <span>MPOP: Máxima presión de operación permisible</span>
        <span>GLP: Gas licuado de petroleo</span>
        <span>GN: Gas Natural</span>
        <span>SIC: superintendencia de industria y comercio</span>
        <span>NTC: Norma técnica Colombiana</span>
      </div>
    </div>
  );
};
