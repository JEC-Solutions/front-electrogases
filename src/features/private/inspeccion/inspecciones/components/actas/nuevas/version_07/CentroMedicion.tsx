interface Props {
  inspeccion: any | undefined;
}

const Box = ({ checked = false }: { checked?: boolean }) => (
  <div className="w-[12px] h-[12px] border border-black bg-gray-100 ml-1 flex items-center justify-center">
    {checked && <span className="text-[10px] font-bold leading-none">✓</span>}
  </div>
);

const ValueBox = ({ value }: { value?: string | number }) => (
  <div className="bg-[#e5e7eb] border border-gray-400 h-[16px] w-[80px] text-center font-semibold leading-none flex items-center justify-center">
    {value}
  </div>
);

export const CentroMedicion = ({ inspeccion }: Props) => {
  const centro = inspeccion?.centroMedicion;
  const medidor = inspeccion?.ruta?.medidor;

  const marcaMedidor = medidor?.marca;
  const numMedidor = medidor?.numero;
  const tipoMedidor = medidor?.tipo;

  const marcaRegulador = centro?.regulador_marca;
  const etapa = centro?.regulador_etapa;

  const presionEstatica = centro?.presion_estatica;
  const presionDinamica = centro?.presion_dinamica;

  const border = "border-black";
  const bgHeader = "bg-[#f3f4f6]";
  const textSmall = "text-[7pt] font-arial leading-tight text-black";
  const label = "font-normal mr-1";

  return (
    <div
      className={`w-full border-r border-l border-b ${border} ${textSmall} box-border`}
    >
      <div
        className={`w-full border-b ${border} ${bgHeader} font-bold text-center py-[1px]`}
      >
        3.5 . DATOS DEL CENTRO DE MEDICIÓN
      </div>

      <div className="flex w-full h-[56px]">
        <div className={`w-[65%] flex flex-col border-r ${border}`}>
          <div className={`flex border-b ${border} font-bold text-center`}>
            <div className={`w-[55%] border-r ${border}`}>
              DATOS DEL MEDIDOR
            </div>
            <div className="w-[45%]">DATOS DEL REGULADOR</div>
          </div>

          <div className={`flex border-b ${border} h-[22px]`}>
            <div
              className={`w-[25%] border-r ${border} flex items-center px-1`}
            >
              <span className={label}>Marca:</span>
              <span className="truncate font-semibold">{marcaMedidor}</span>
            </div>
            {/* # De Medidor */}
            <div
              className={`w-[30%] border-r ${border} flex items-center px-1`}
            >
              <span className="font-bold mr-1 border-r border-black pr-1 h-full flex items-center">
                # De Medidor:
              </span>
              <span className="truncate font-semibold pl-1">{numMedidor}</span>
            </div>
            {/* Regulador Marca */}
            <div className="flex-1 flex items-center px-1">
              <span className={label}>Marca:</span>
              <span className="truncate font-semibold">{marcaRegulador}</span>
            </div>
          </div>

          {/* Fila 2: Tipo y Etapa */}
          <div className="flex h-[22px]">
            {/* Medidor Tipo */}
            <div
              className={`w-[55%] border-r ${border} flex items-center px-1`}
            >
              <span className={label}>Tipo :</span>
              <span className="truncate font-semibold">{tipoMedidor}</span>
            </div>
            {/* Regulador Etapa */}
            <div className="flex-1 flex items-center justify-end px-2 gap-2">
              <span>Etapa:</span>
              <div className="flex items-center">
                1 <Box checked={etapa === 1} />
              </div>
              <div className="flex items-center">
                2 <Box checked={etapa === 2} />
              </div>
              <div className="flex items-center">
                3 <Box checked={etapa === 3} />
              </div>
            </div>
          </div>
        </div>
        {/* === BLOQUE DERECHO: PRESIÓN (Aprox 35%) === */}
        <div className="w-[35%] flex flex-col">
          {/* Encabezado Presión */}
          <div
            className={`border-b ${border} font-bold text-center ${bgHeader}`}
          >
            PRESIÓN DE SUMINISTRO
          </div>

          {/* Fila Estática */}
          <div
            className={`flex items-center justify-between px-2 h-[22px] border-b ${border}`}
          >
            <span className="font-normal">PRESIÓN ESTÁTICA</span>
            <div className="flex items-center gap-1">
              <ValueBox value={presionEstatica} />
              <span>mbar</span>
            </div>
          </div>

          {/* Fila Dinámica */}
          <div className="flex items-center justify-between px-2 h-[22px]">
            <span className="font-normal">PRESIÓN DINÁMICA</span>
            <div className="flex items-center gap-1">
              <ValueBox value={presionDinamica} />
              <span>mbar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
