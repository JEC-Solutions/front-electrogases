import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

const CheckBox = ({ checked }: { checked: boolean }) => (
  <div className="inline-flex items-center justify-center w-[18px] h-[11px] border-[0.75pt] border-[#777] bg-[#e5e7eb] align-middle leading-none box-border">
    {checked && (
      <span className="font-arial text-[10px] font-bold text-black leading-none">
        &#10003;
      </span>
    )}
  </div>
);

export const CaracteristicasMatriz = ({ inspeccion }: Props) => {
  const caracteristicas = inspeccion?.datos_matriz?.caracteristicas;

  const isResidencial = caracteristicas?.residencial === true;
  const isComercial = caracteristicas?.comercial === true;
  const isNueva = caracteristicas?.tipo_linea === "nueva";
  const isExistente = caracteristicas?.tipo_linea === "existente";

  // tipo_gas_glp: true = GLP, false = GN
  const esGLP = inspeccion?.tipo_gas_glp === true;
  const esGN = inspeccion?.tipo_gas_glp === false;

  // solicitud_usuario: boolean
  const solUsuario = inspeccion?.solicitud_usuario === true;

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-row bg-white text-black">
      {/* Columna Izquierda: 3. CARACTERISTICAS DE LA LINA MATRIZ (70%) */}
      <div className="w-[70%] border-r border-black flex flex-col box-border">
        {/* Encabezado */}
        <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
          3. CARACTERISTICAS DE LA LINA MATRIZ
        </div>

        {/* Fila de opciones */}
        <div className="flex items-center justify-around px-[6px] py-[2.5px] text-[7pt] min-h-[19px] box-border w-full">
          <div className="flex items-center">
            <span className="font-normal mr-[3px]">Residencial:</span>
            <CheckBox checked={isResidencial} />
          </div>
          <div className="flex items-center">
            <span className="font-normal mr-[3px]">Comercial:</span>
            <CheckBox checked={isComercial} />
          </div>
          <div className="flex items-center">
            <span className="font-normal mr-[3px]">Nueva:</span>
            <CheckBox checked={isNueva} />
          </div>
          <div className="flex items-center">
            <span className="font-normal mr-[3px]">Existente:</span>
            <CheckBox checked={isExistente} />
          </div>
          <div className="flex items-center">
            <span className="font-normal mr-[3px]">Gas Natural :</span>
            <CheckBox checked={esGN} />
          </div>
          <div className="flex items-center">
            <span className="font-normal mr-[3px]">Gas GLP:</span>
            <CheckBox checked={esGLP} />
          </div>
        </div>
      </div>

      {/* Columna Derecha: INSPECCIÓN A SOLICITUD DEL CLIENTE (30%) */}
      <div className="w-[30%] flex flex-col box-border">
        {/* Encabezado */}
        <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
          INSPECCIÓN  A SOLICITUD DEL CLIENTE
        </div>

        {/* Fila SI / NO */}
        <div className="flex items-center justify-around px-[12px] py-[2.5px] text-[7pt] min-h-[19px] box-border w-full">
          <div className="flex items-center">
            <span className="font-bold mr-[4px]">SI</span>
            <CheckBox checked={solUsuario} />
          </div>
          <div className="flex items-center">
            <span className="font-bold mr-[4px]">NO</span>
            <CheckBox checked={!solUsuario} />
          </div>
        </div>
      </div>
    </div>
  );
};
