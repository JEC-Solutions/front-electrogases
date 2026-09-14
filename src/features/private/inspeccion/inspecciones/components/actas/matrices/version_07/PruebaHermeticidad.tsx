import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const PruebaHermeticidad = ({ inspeccion }: Props) => {
  const herm = inspeccion?.datos_matriz?.prueba_hermeticidad;

  const formatMedida = (val: any): string => {
    if (val === null || val === undefined || val === "") return "";
    return String(val);
  };

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Encabezado Principal (Gris) */}
      <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
        5. PRUEBA DE HERMETICIDAD
      </div>

      {/* Fila de Campos: 6 Columnas */}
      <div className="flex flex-row w-full min-h-[32px] box-border text-[6.8pt]">
        {/* Columna 1: Prueba con aire o gas inerte (11%, Gris) */}
        <div className="w-[11%] border-r border-black bg-[#e5e7eb] p-[2px_4px] flex items-center justify-center text-center leading-[1.15] box-border">
          <span>Prueba con aire<br />o gas inerte</span>
        </div>

        {/* Columna 2: Lectura inicial ... PSI (15.5%) */}
        <div className="w-[15.5%] border-r border-black p-[2px_4px] flex items-center justify-between box-border">
          <div className="leading-[1.15] whitespace-nowrap">
            <span>Lectura<br />inicial</span>
          </div>
          <div className="font-bold text-[8pt] flex-1 text-center overflow-hidden px-[2px]">
            {formatMedida(herm?.lectura_inicial_psi)}
          </div>
          <div className="font-bold whitespace-nowrap">
            <span>PSI</span>
          </div>
        </div>

        {/* Columna 3: Lectura final ... PSI (16%) */}
        <div className="w-[16%] border-r border-black p-[2px_4px] flex items-center justify-between box-border">
          <div className="leading-[1.15] whitespace-nowrap">
            <span>Lectura<br />final</span>
          </div>
          <div className="font-bold text-[8pt] flex-1 text-center overflow-hidden px-[2px]">
            {formatMedida(herm?.lectura_final_psi)}
          </div>
          <div className="font-bold whitespace-nowrap">
            <span>PSI</span>
          </div>
        </div>

        {/* Columna 4: Tiempo de prueba ... Min (15.5%) */}
        <div className="w-[15.5%] border-r border-black p-[2px_4px] flex items-center justify-between box-border">
          <div className="leading-[1.15] whitespace-nowrap">
            <span>Tiempo<br />de prueba</span>
          </div>
          <div className="font-bold text-[8pt] flex-1 text-center overflow-hidden px-[2px]">
            {formatMedida(herm?.tiempo_prueba_min)}
          </div>
          <div className="font-bold whitespace-nowrap">
            <span>Min</span>
          </div>
        </div>

        {/* Columna 5: Prueba con detector de gas ... % en vol: (21%) */}
        <div className="w-[21%] border-r border-black p-[2px_4px] flex items-center justify-between box-border">
          <div className="leading-[1.15] whitespace-nowrap">
            <span>Prueba con<br />detector de gas</span>
          </div>
          <div className="flex items-center whitespace-nowrap ml-[4px]">
            <span className="font-bold text-[8pt] min-w-[18px] text-center">
              {formatMedida(herm?.detector_fugas_pct_vol)}
            </span>
            <span className="font-normal ml-[3px]">% en vol</span>
          </div>
        </div>

        {/* Columna 6: Presión de operación ... PSI (21%) */}
        <div className="w-[21%] p-[2px_4px] flex items-center justify-between box-border">
          <div className="leading-[1.15] whitespace-nowrap">
            <span>Presión de<br />operación</span>
          </div>
          <div className="font-bold text-[8pt] flex-1 text-center overflow-hidden px-[2px]">
            {formatMedida(herm?.presion_operacion_psi)}
          </div>
        </div>
      </div>
    </div>
  );
};
