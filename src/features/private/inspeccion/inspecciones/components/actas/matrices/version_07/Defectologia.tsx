import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

const CheckBox = ({ checked }: { checked: boolean }) => (
  <div className="inline-flex items-center justify-center w-[16px] h-[11px] border-[0.75pt] border-[#777] bg-[#e5e7eb] align-middle leading-none box-border">
    {checked && (
      <span className="font-arial text-[9px] font-bold text-black leading-none">
        &#10003;
      </span>
    )}
  </div>
);

export const Defectologia = ({ inspeccion }: Props) => {
  const cv =
    inspeccion?.datos_matriz?.defectologia ||
    inspeccion?.datos_matriz?.condiciones_verificacion;
  const dec = inspeccion?.datos_matriz?.declaracion_conformidad;
  const resultadoGlobal = dec?.resultado;

  const metodos = cv?.hermeticidad?.metodos || {};
  const detectorCheck = metodos.detector === true;
  const presionCheck = metodos.presion === true;
  const aguaJabonCheck = metodos.agua_jabon === true;

  const evaluarItem = (
    val: boolean | null | undefined,
    defaultDefect: "critico" | "no_critico",
  ) => {
    if (val === true) {
      return {
        critico: false,
        noCritico: false,
        cumple: true,
      };
    }
    if (val === false) {
      if (resultadoGlobal === "defectos_criticos") {
        return { critico: true, noCritico: false, cumple: false };
      }
      if (resultadoGlobal === "defectos_no_criticos") {
        return { critico: false, noCritico: true, cumple: false };
      }
      return {
        critico: defaultDefect === "critico",
        noCritico: defaultDefect === "no_critico",
        cumple: false,
      };
    }
    return {
      critico: false,
      noCritico: false,
      cumple: false,
    };
  };

  const hermEval = evaluarItem(cv?.hermeticidad?.cumple, "critico");
  const trazadoEval = evaluarItem(cv?.trazado_general, "no_critico");
  const materialesEval = evaluarItem(cv?.materiales, "critico");

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Fila Encabezado: 6. DEFECTOLOGIA | Critico | No critico | Cumple */}
      <div className="flex flex-row w-full border-b border-black bg-[#f2f2f2] box-border min-h-[16px]">
        <div className="w-[70%] border-r border-black text-[7.5pt] font-bold text-center p-[2px_4px] box-border uppercase flex items-center justify-center">
          6. DEFECTOLOGIA
        </div>
        <div className="w-[10%] border-r border-black text-[7.2pt] text-center p-[2px_2px] box-border flex items-center justify-center font-bold">
          Critico
        </div>
        <div className="w-[10%] border-r border-black text-[7.2pt] text-center p-[2px_2px] box-border flex items-center justify-center font-bold">
          No critico
        </div>
        <div className="w-[10%] text-[7.2pt] text-center p-[2px_2px] box-border flex items-center justify-center font-bold">
          Cumple
        </div>
      </div>

      {/* Fila 1: Hermeticidad de la linea matriz */}
      <div className="flex flex-row w-full border-b border-black box-border min-h-[17px] text-[6.8pt]">
        <div className="w-[70%] border-r border-black px-[6px] py-[2px] flex items-center justify-between box-border">
          <span className="whitespace-nowrap">Hermeticidad de la linea matriz</span>
          <div className="flex items-center gap-[14px] mr-[10px]">
            <div className="flex items-center gap-[4px]">
              <span>Detector:</span>
              <CheckBox checked={detectorCheck} />
            </div>
            <div className="flex items-center gap-[4px]">
              <span>P. Presión:</span>
              <CheckBox checked={presionCheck} />
            </div>
            <div className="flex items-center gap-[4px]">
              <span>Agua con Jabón:</span>
              <CheckBox checked={aguaJabonCheck} />
            </div>
          </div>
        </div>
        <div className="w-[10%] border-r border-black flex items-center justify-center box-border">
          <CheckBox checked={hermEval.critico} />
        </div>
        <div className="w-[10%] border-r border-black flex items-center justify-center box-border">
          <CheckBox checked={hermEval.noCritico} />
        </div>
        <div className="w-[10%] flex items-center justify-center box-border">
          <CheckBox checked={hermEval.cumple} />
        </div>
      </div>

      {/* Fila 2: Trazado general de instalación */}
      <div className="flex flex-row w-full border-b border-black box-border min-h-[17px] text-[6.8pt]">
        <div className="w-[70%] border-r border-black px-[6px] py-[2px] flex items-center box-border">
          <span>Trazado general de instalación</span>
        </div>
        <div className="w-[10%] border-r border-black flex items-center justify-center box-border">
          <CheckBox checked={trazadoEval.critico} />
        </div>
        <div className="w-[10%] border-r border-black flex items-center justify-center box-border">
          <CheckBox checked={trazadoEval.noCritico} />
        </div>
        <div className="w-[10%] flex items-center justify-center box-border">
          <CheckBox checked={trazadoEval.cumple} />
        </div>
      </div>

      {/* Fila 3: Materiales: */}
      <div className="flex flex-row w-full box-border min-h-[17px] text-[6.8pt]">
        <div className="w-[70%] border-r border-black px-[6px] py-[2px] flex items-center box-border">
          <span>Materiales:</span>
        </div>
        <div className="w-[10%] border-r border-black flex items-center justify-center box-border">
          <CheckBox checked={materialesEval.critico} />
        </div>
        <div className="w-[10%] border-r border-black flex items-center justify-center box-border">
          <CheckBox checked={materialesEval.noCritico} />
        </div>
        <div className="w-[10%] flex items-center justify-center box-border">
          <CheckBox checked={materialesEval.cumple} />
        </div>
      </div>
    </div>
  );
};
