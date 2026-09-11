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

      {/* Fila 1: Empresa (42.5%), NIT (19.5%), Instalador (38%) */}
      <div className="flex flex-row w-full border-b border-black min-h-[17px] box-border text-[7pt]">
        <div className="w-[42.5%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">Empresa :</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap uppercase">
            {empresa}
          </span>
        </div>
        <div className="w-[19.5%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">NIT:</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {nit}
          </span>
        </div>
        <div className="w-[38%] px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">Instalador:</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap uppercase">
            {instalador}
          </span>
        </div>
      </div>

      {/* Fila 2: Registro SIC Empresa (42.5%), Telefono (19.5%), CCL (18%), C.C. (20%) */}
      <div className="flex flex-row w-full border-b border-black min-h-[17px] box-border text-[7pt]">
        <div className="w-[42.5%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">Registro SIC  Empresa :</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {registroSicEmpresa}
          </span>
        </div>
        <div className="w-[19.5%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">Telefono:</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {telefono}
          </span>
        </div>
        <div className="w-[18%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">CCL</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {ccl}
          </span>
        </div>
        <div className="w-[20%] px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">C.C.</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {cc}
          </span>
        </div>
      </div>

      {/* Fila 3: Expedido por (29%), Vigencia (33%), Registro SIC instalador (38%) */}
      <div className="flex flex-row w-full min-h-[17px] box-border text-[7pt]">
        <div className="w-[29%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">Expedido por :</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {expedidoPor}
          </span>
        </div>
        <div className="w-[33%] border-r border-black px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">Vigencia</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {vigencia}
          </span>
        </div>
        <div className="w-[38%] px-[5px] py-[2px] flex items-center box-border">
          <span className="font-bold mr-[4px] whitespace-nowrap">Registro SIC instalador :</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {registroSicInstalador}
          </span>
        </div>
      </div>
    </div>
  );
};
