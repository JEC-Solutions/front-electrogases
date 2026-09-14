import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const EmpresaInstalador = ({ inspeccion }: Props) => {
  const empresaInstalador =
    inspeccion?.datos_matriz?.linea_nueva?.empresa_instalador;
  const fallbackEmpresa =
    inspeccion?.instalacionNueva?.empresasInstalacion?.[0];

  const formatVigencia = (v: any): string => {
    if (!v) return "";
    const str = String(v).trim();
    if (str.includes("T")) {
      return str.split("T")[0];
    }
    return str;
  };

  const empresa =
    empresaInstalador?.empresa ?? fallbackEmpresa?.nombreEmpresa ?? "";
  const nit = empresaInstalador?.nit ?? fallbackEmpresa?.nit ?? "";
  const registroSicEmpresa =
    empresaInstalador?.registro_sic_empresa ??
    fallbackEmpresa?.RegSICEmpresa ??
    "";
  const telefono =
    empresaInstalador?.telefono ?? fallbackEmpresa?.telefono ?? "";
  const instalador =
    empresaInstalador?.instalador ?? fallbackEmpresa?.instalador ?? "";
  const cc =
    empresaInstalador?.cc ?? fallbackEmpresa?.identificacionSolicitud ?? "";
  const expedidoPor =
    empresaInstalador?.expedido_por ?? fallbackEmpresa?.expedidoPor ?? "";
  const ccl = empresaInstalador?.ccl ?? fallbackEmpresa?.CCL ?? "";
  const vigencia = formatVigencia(
    empresaInstalador?.vigencia ?? fallbackEmpresa?.vigencia,
  );
  const registroSicInstalador =
    empresaInstalador?.registro_sic_instalador ?? "";

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Encabezado Principal (Gris) */}
      <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
        4. INFORMACIÓN PARA LINEAS MATRICES NUEVAS
      </div>

      {/* Sub-encabezado 4.1 (Blanco) */}
      <div className="bg-white border-b border-black text-[7.5pt] font-bold text-center py-[2px] uppercase leading-[1.2]">
        4.1. EMPRESA Y/O INSTALADOR QUE CONSTRUYÓ  LA LINEA MATRIZ
      </div>

      {/* Contenido: Columna Izquierda (Empresa 45%) y Columna Derecha (Instalador 55%) */}
      <div className="flex flex-row w-full box-border text-[7pt]">
        {/* Columna Izquierda: Empresa (45%) */}
        <div className="w-[45%] border-r border-black flex flex-col box-border">
          {/* Fila 1: Empresa (65%) y NIT (35%) */}
          <div className="flex flex-row w-full border-b border-black flex-1 min-h-[25.5px] box-border">
            <div className="w-[65%] border-r border-black px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">Empresa :</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap uppercase">
                {empresa}
              </span>
            </div>
            <div className="w-[35%] px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">NIT:</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {nit}
              </span>
            </div>
          </div>

          {/* Fila 2: Registro SIC Empresa (65%) y Telefono (35%) */}
          <div className="flex flex-row w-full flex-1 min-h-[25.5px] box-border">
            <div className="w-[65%] border-r border-black px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">Registro SIC  Empresa :</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {registroSicEmpresa}
              </span>
            </div>
            <div className="w-[35%] px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">Telefono:</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {telefono}
              </span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Instalador (55%) */}
        <div className="w-[55%] flex flex-col box-border">
          {/* Fila 1: Instalador (60%) y C.C. (40%) */}
          <div className="flex flex-row w-full border-b border-black min-h-[17px] box-border">
            <div className="w-[60%] border-r border-black px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">Instalador:</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap uppercase">
                {instalador}
              </span>
            </div>
            <div className="w-[40%] px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">C.C.</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {cc}
              </span>
            </div>
          </div>

          {/* Fila 2: CCL (25%) y Registro SIC instalador (75%) */}
          <div className="flex flex-row w-full border-b border-black min-h-[17px] box-border">
            <div className="w-[25%] border-r border-black px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">CCL</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {ccl}
              </span>
            </div>
            <div className="w-[75%] px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">Registro SIC instalador :</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {registroSicInstalador}
              </span>
            </div>
          </div>

          {/* Fila 3: Expedido por (60%) y Vigencia (40%) */}
          <div className="flex flex-row w-full min-h-[17px] box-border">
            <div className="w-[60%] border-r border-black px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">Expedido por :</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {expedidoPor}
              </span>
            </div>
            <div className="w-[40%] px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap shrink-0">Vigencia</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {vigencia}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
