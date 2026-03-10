import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion?: IActa | undefined;
}

// Caja con o sin X
const Box = ({ checked = false }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[10px] h-[10px] border border-black bg-white ml-[2px] align-middle">
    {checked && (
      <span className="text-[8px] font-bold leading-none -mt-[2px]">X</span>
    )}
  </span>
);

// Checkmark para grillas de normativa (✓ en negrita)
const Check = ({ checked = false }: { checked?: boolean }) =>
  checked ? <span className="font-bold text-[8pt] leading-none">✓</span> : null;

// Helper para interpretar un boolean | null | undefined -> "SI" | "NO" | "NA"
const toState = (val: boolean | null | undefined): "SI" | "NO" | "NA" => {
  if (val === true) return "SI";
  if (val === false) return "NO";
  return "NA";
};


const DocCheckCell = ({
  label,
  className = "",
  state,
}: {
  label: string;
  className?: string;
  state?: "SI" | "NO" | "NA";
}) => (
  <div
    className={`flex flex-col justify-between p-[1px] border-r border-black ${className}`}
  >
    <div className="leading-tight text-center text-[6.5pt]">{label}</div>
    <div className="flex justify-center items-center gap-[2px] text-[6pt]">
      <span className="font-semibold">Cumple</span>
      <span>SI</span> <Box checked={state === "SI"} />
      <span>NO</span> <Box checked={state === "NO"} />
      <span>NA</span> <Box checked={state === "NA"} />
    </div>
  </div>
);

// Fila de normativa con checkmarks en columnas SI / NO / NA
const NormaRow = ({
  label,
  state,
}: {
  label: string;
  state?: "SI" | "NO" | "NA";
}) => (
  <div className="flex items-center border-b border-black h-[16px]">
    <div className="flex-1 px-1 border-r border-black truncate" title={label}>
      {label}
    </div>
    <div className="w-[22px] border-r border-black flex justify-center items-center">
      <Check checked={state === "SI"} />
    </div>
    <div className="w-[22px] border-r border-black flex justify-center items-center">
      <Check checked={state === "NO"} />
    </div>
    <div className="w-[22px] flex justify-center items-center">
      <Check checked={state === "NA"} />
    </div>
  </div>
);

const NormaHeader = ({ title }: { title: string }) => (
  <div className="flex border-b border-black h-[16px] bg-gray-50 items-center">
    <div
      className="flex-1 px-1 border-r border-black font-semibold truncate leading-none"
      title={title}
    >
      {title}
    </div>
    <div className="w-[38px] border-r border-black text-center font-bold text-[6pt]">
      CUMPLE
    </div>
    <div className="w-[22px] border-r border-black text-center font-bold text-[6pt]">
      SI
    </div>
    <div className="w-[22px] border-r border-black text-center font-bold text-[6pt]">
      NO
    </div>
    <div className="w-[22px] text-center font-bold text-[6pt]">NA</div>
  </div>
);

export const EvaluacionDocumentacion = ({ inspeccion }: Props) => {
  const border = "border-black";
  const textClass = "text-[7pt] font-arial leading-tight text-black";

  const i = (inspeccion as any)?.instalacionNueva;

  // ── Materiales ────────────────────────────────────────────────────────
  const materiales: any[] = i?.materiales || [];

  let tipoMulticapa = false;
  let tipoAceroCarbon = false;
  let tipoCobre = false;
  let tipoOtroTuberia = false;
  const tuberiaMarcas: string[] = [];
  const tuberiaCerts: string[] = [];

  const valvulaTipos: string[] = [];
  const valvulaMarcas: string[] = [];
  const valvulaCerts: string[] = [];

  const otroTipos: string[] = [];
  const otroMarcas: string[] = [];
  const otroCerts: string[] = [];

  materiales.forEach((mat) => {
    const categoria = mat.categoria ? mat.categoria.toUpperCase() : "";
    const tipoMin = mat.tipo ? mat.tipo.toLowerCase() : "";
    const tipoOriginal = mat.tipo || "";

    if (categoria === "TUBERIA Y ACCESORIOS") {
      if (tipoMin.includes("multi capa") || tipoMin.includes("multicapa")) {
        tipoMulticapa = true;
      } else if (tipoMin.includes("acero al carbono")) {
        tipoAceroCarbon = true;
      } else if (tipoMin.includes("cobre")) {
        tipoCobre = true;
      } else {
        tipoOtroTuberia = true;
      }
      if (mat.marca) tuberiaMarcas.push(mat.marca);
      if (mat.nro_certificado) tuberiaCerts.push(mat.nro_certificado);
    } else if (categoria === "VALVULAS") {
      if (tipoOriginal) valvulaTipos.push(tipoOriginal);
      if (mat.marca) valvulaMarcas.push(mat.marca);
      if (mat.nro_certificado) valvulaCerts.push(mat.nro_certificado);
    } else if (categoria === "OTRO") {
      if (tipoOriginal) otroTipos.push(tipoOriginal);
      if (mat.marca) otroMarcas.push(mat.marca);
      if (mat.nro_certificado) otroCerts.push(mat.nro_certificado);
    }
  });

  const tuberiasMarca = [...new Set(tuberiaMarcas)].join(" / ");
  const tuberiasCert = [...new Set(tuberiaCerts)].join(" / ");
  const valvulaTipo = [...new Set(valvulaTipos)].join(" / ") || "si aplica";
  const valvulaMarca = [...new Set(valvulaMarcas)].join(" / ");
  const valvulaCert = [...new Set(valvulaCerts)].join(" / ");
  const otroTiposUnidos = [...new Set(otroTipos)].join(" / ");
  const otroCual = otroTiposUnidos
    ? `otro (${otroTiposUnidos})`
    : "otro (cual)";
  const otroTipoDisplay = otroTiposUnidos || "si aplica";
  const otroMarca = [...new Set(otroMarcas)].join(" / ");
  const otroCert = [...new Set(otroCerts)].join(" / ");

  return (
    <div
      className={`w-full border ${border} ${textClass} box-border mt-[-1px]`}
    >
      <div
        className={`w-full border-b ${border} bg-gray-200 font-bold text-center py-[2px] text-[7.5pt]`}
      >
        3.7. EVALUACIÓN DE LA DOCUMENTACIÓN Y NORMATIVIDAD APLICABLES (donde
        aplique las resoluciones 90902 de 2013 y 41385 de 2017)
      </div>

      {/* ── Fila superior: Documentación + Materiales ───────────────── */}
      <div className={`flex w-full border-b ${border}`}>
        {/* Documentación */}
        <div className={`w-[50%] flex flex-col border-r ${border}`}>
          <div className={`flex w-full border-b ${border} h-[40px]`}>
            <DocCheckCell
              label="CCL del instalador:"
              className="w-[40%]"
              state={toState(i?.ccInstalador)}
            />
            <DocCheckCell
              label="Certficado o Declaración de conformidad de los materiales:"
              className="flex-1 border-r-0"
              state={toState(i?.certificadoConformidadMateriales)}
            />
          </div>
          <div className="flex w-full h-[40px]">
            <DocCheckCell
              label="Diseño aprobado por el distribuidor"
              className="w-[33%]"
              state={toState(i?.disenoAprobado)}
            />
            <DocCheckCell
              label="Isometrico de la instalación:"
              className="w-[33%]"
              state={toState(i?.isometrico)}
            />
            <DocCheckCell
              label="Memoria de Calculo Cumple:"
              className="flex-1 border-r-0"
              state={toState(i?.memoriaCalculo)}
            />
          </div>
        </div>

        {/* Materiales */}
        <div className="w-[50%] flex flex-col font-arial text-[6.5pt]">
          {/* Header */}
          <div
            className={`flex border-b ${border} text-center font-semibold bg-gray-50`}
          >
            <div className={`w-[18%] border-r ${border} py-[2px]`}>
              Material
            </div>
            <div className={`w-[32%] border-r ${border} py-[2px]`}>Tipo</div>
            <div className={`w-[25%] border-r ${border} py-[2px]`}>Marca</div>
            <div className="flex-1 py-[2px]"># de Certificado</div>
          </div>

          {/* Tubería */}
          <div className={`flex border-b ${border} h-[32px]`}>
            <div
              className={`w-[18%] border-r ${border} flex items-center justify-center text-center px-1`}
            >
              Tubería y Accesorios
            </div>
            <div
              className={`w-[32%] border-r ${border} flex flex-col justify-center px-1`}
            >
              <div className="flex justify-between items-center mb-[1px]">
                <span>Multi capa</span>
                <Box checked={tipoMulticapa} />
                <span className="ml-1">Acero al Carbón</span>
                <Box checked={tipoAceroCarbon} />
              </div>
              <div className="flex justify-between items-center">
                <span>Cobre</span>
                <Box checked={tipoCobre} />
                <span className="ml-1">Otro</span>
                <Box checked={tipoOtroTuberia} />
              </div>
            </div>
            <div
              className={`w-[25%] border-r ${border} flex items-center justify-center font-bold px-1`}
            >
              {tuberiasMarca}
            </div>
            <div className="flex-1 flex items-center justify-center font-bold px-1">
              {tuberiasCert}
            </div>
          </div>

          {/* Válvulas */}
          <div className={`flex border-b ${border} h-[16px]`}>
            <div
              className={`w-[18%] border-r ${border} flex items-center px-1`}
            >
              Valvulas
            </div>
            <div
              className={`w-[32%] border-r ${border} flex items-center justify-center text-center ${!valvulaTipos.length ? "text-gray-400 italic" : ""}`}
            >
              {valvulaTipo}
            </div>
            <div
              className={`w-[25%] border-r ${border} flex items-center px-1 font-bold`}
            >
              {valvulaMarca}
            </div>
            <div className="flex-1 flex items-center px-1 font-bold">
              {valvulaCert}
            </div>
          </div>

          {/* Otro */}
          <div className="flex h-[16px]">
            <div
              className={`w-[18%] border-r ${border} flex items-center px-1`}
            >
              {otroCual}
            </div>
            <div
              className={`w-[32%] border-r ${border} flex items-center justify-center text-center ${!otroTipos.length ? "text-gray-400 italic" : ""}`}
            >
              {otroTipoDisplay}
            </div>
            <div
              className={`w-[25%] border-r ${border} flex items-center px-1 font-bold`}
            >
              {otroMarca}
            </div>
            <div className="flex-1 flex items-center px-1 font-bold">
              {otroCert}
            </div>
          </div>
        </div>
      </div>

      {/* ── Fila inferior: SIC + Carta + NTCs ───────────────────────── */}
      <div className="flex w-full font-arial text-[6.5pt]">
        {/* SIC + NTC 2505 */}
        <div className={`w-[30%] border-r ${border} flex flex-col`}>
          <div
            className={`flex items-center justify-between px-1 border-b ${border} h-[18px]`}
          >
            <span>Registro SIC del instalador:</span>
            <div className="flex items-center gap-[2px]">
              <span className="font-semibold">Cumple SI</span>
              <Box checked={toState(i?.sicInstalador) === "SI"} />
              <span>NO</span>
              <Box checked={toState(i?.sicInstalador) === "NO"} />
              <span>NA</span>
              <Box checked={toState(i?.sicInstalador) === "NA"} />
            </div>
          </div>
          <NormaHeader title="NTC 2505 4 ta Actualización:" />
          <NormaRow label="Diseño" state={toState(i?.ntc2505Diseno)} />
          <div className="flex items-center h-[16px]">
            <div className="flex-1 px-1 border-r border-black truncate">
              Construccion
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Check checked={toState(i?.ntc2505Construccion) === "SI"} />
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Check checked={toState(i?.ntc2505Construccion) === "NO"} />
            </div>
            <div className="w-[22px] flex justify-center items-center">
              <Check checked={toState(i?.ntc2505Construccion) === "NA"} />
            </div>
          </div>
        </div>

        {/* Carta + NTC 3838 */}
        <div className={`w-[35%] border-r ${border} flex flex-col`}>
          <div
            className={`flex items-center justify-between px-1 border-b ${border} h-[18px]`}
          >
            <span className="truncate mr-1">
              Carta de la disponibilidad del servicio por distribuidor:
            </span>
            <div className="flex items-center gap-[1px]">
              <span className="font-semibold">Cumple SI</span>
              <Box checked={toState(i?.cartaDisponibilidad) === "SI"} />
              <span>NO</span>
              <Box checked={toState(i?.cartaDisponibilidad) === "NO"} />
              <span>NA</span>
              <Box checked={toState(i?.cartaDisponibilidad) === "NA"} />
            </div>
          </div>
          <NormaHeader title="NTC 3838 3ra actualización" />
          <NormaRow
            label="MPOP linea individual comercial"
            state={toState(i?.ntc3838MPOPComercial)}
          />
          <div className="flex items-center h-[16px]">
            <div className="flex-1 px-1 border-r border-black truncate">
              MPOP linea individual residencial
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Check checked={toState(i?.ntc3838MPOPResidencial) === "SI"} />
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Check checked={toState(i?.ntc3838MPOPResidencial) === "NO"} />
            </div>
            <div className="w-[22px] flex justify-center items-center">
              <Check checked={toState(i?.ntc3838MPOPResidencial) === "NA"} />
            </div>
          </div>
        </div>

        {/* NTC 3833 */}
        <div className="w-[35%] flex flex-col">
          <NormaHeader title="3833 1ra actualización:" />
          <NormaRow
            label="Dimensionamiento Sistema Evacuación de los Productos de la Combustión"
            state={toState(i?.ntc3833Dimensionamiento)}
          />
          <NormaRow
            label="Construccion Sistema Evacuación de los Productos de la Combustión"
            state={toState(i?.ntc3833Construccion)}
          />
          <div className="flex items-center h-[16px]">
            <div className="flex-1 px-1 border-r border-black truncate">
              Montaje Sistema Evacuación de los Productos de la Combustión
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Check checked={toState(i?.ntc3833Montaje) === "SI"} />
            </div>
            <div className="w-[22px] border-r border-black flex justify-center items-center">
              <Check checked={toState(i?.ntc3833Montaje) === "NO"} />
            </div>
            <div className="w-[22px] flex justify-center items-center">
              <Check checked={toState(i?.ntc3833Montaje) === "NA"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
