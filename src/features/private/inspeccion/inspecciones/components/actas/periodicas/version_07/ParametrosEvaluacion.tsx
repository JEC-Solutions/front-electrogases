import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

/** Celda con valor + unidad arriba a la derecha (m³, L, min, %Vol) */
const UnitValue = ({
  unit,
  value,
}: {
  unit: string;
  value?: number | string;
}) => (
  <div className="border border-black relative h-[36px]">
    <span className="absolute right-0 top-0 bg-gray-100 px-1 leading-none text-[11px]">
      {unit}
    </span>

    <div className="absolute left-1 right-1 bottom-1 border-b border-black h-[0px]" />

    {value !== undefined && value !== null && (
      <span className="absolute right-1 bottom-[6px] text-[11px] leading-none">
        {value}
      </span>
    )}
  </div>
);

/** Celda solo de texto/etiqueta */
const LabelCell = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-black px-2 h-[36px] flex items-center">
    {children}
  </div>
);

export const ParametrosEvaluacion = ({ inspeccion }: Props) => {
  const parametros = inspeccion?.parametrosEvaluacion[0];

  return (
    <>
      {/* Fila única (sin tabla) */}
      <div
        className="
          grid text-xs leading-tight
          grid-cols-[160px_170px_120px_90px_120px_90px_120px_90px_120px_90px_150px_70px_150px_170px_140px_70px]
        "
      >
        {/* Prueba de hermeticidad / Caudalímetro */}
        <LabelCell>
          Prueba de
          <br />
          Hermeticidad
        </LabelCell>
        <LabelCell>
          Con caudalímetro
          <br />o medidor
        </LabelCell>

        {/* Lecturas m³ (Inicio/Final) */}
        <LabelCell>
          Lectura
          <br />
          Inicio
        </LabelCell>
        <UnitValue unit="m³" value={parametros?.lecturaInicialAire} />
        <LabelCell>
          Lectura
          <br />
          Final
        </LabelCell>
        <UnitValue unit="m³" value={parametros?.lecturaFinalAire} />

        {/* Lecturas L (Inicio/Final) */}
        <LabelCell>
          Lectura
          <br />
          Inicio
        </LabelCell>
        <UnitValue unit="L" value={parametros?.lecturaInicialMedidor} />
        <LabelCell>
          Lectura
          <br />
          Final
        </LabelCell>
        <UnitValue unit="L" value={parametros?.lecturaFinalMedidor} />

        {/* Tiempo de la prueba (min) */}
        <LabelCell>
          Tiempo de
          <br />
          la prueba
        </LabelCell>
        <UnitValue unit="min" value={parametros?.tiempoPruebaAire} />

        {/* Prueba Presión (solo línea de valor, sin unidad) */}
        <div className="border border-black relative h-[36px] px-1">
          <span className="absolute left-2 top-1 text-[11px] font-semibold bg-gray-100 px-1">
            Prueba
          </span>
          <span className="absolute left-[52px] top-1 text-[11px] font-semibold bg-gray-100 px-1">
            Presión
          </span>
          <div className="absolute left-1 right-1 bottom-1 border-b border-black">
            <span>{parametros?.pruebaPresion}</span>
          </div>
        </div>

        {/* Con detector de fugas (valor + %Vol) */}
        <LabelCell>
          Con detector
          <br />
          de fugas
        </LabelCell>
        <div className="border border-black relative h-[36px]">
          <div className="absolute inset-x-1 bottom-1 border-b border-black flex justify-end pr-1 text-[11px]">
            {parametros?.detectorFugas ?? ""}
          </div>
        </div>
        <div className="border border-black relative h-[36px]">
          <span className="absolute right-0 top-0 bg-gray-100 px-1 leading-none text-[11px]">
            %Vol
          </span>
        </div>
      </div>
    </>
  );
};
