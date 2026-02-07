import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const Header = ({ inspeccion }: Props) => {
  const borderClass = "border-black";

  return (
    <div
      className={`w-full border ${borderClass} bg-white text-black font-arial box-border`}
    >
      {/* Altura fija de 100px para mantener proporción con logos */}
      <div className="flex w-full h-[100px]">
        {/* === COL 1: LOGO VERTICAL (ELECTROGASES) === */}
        <div
          className={`w-[60px] border-r ${borderClass} flex items-center justify-center p-1`}
        >
          <img
            src="/imagenes/Electrogases.png"
            alt="Electrogases"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* === COL 2: LOGO ONAC === */}
        <div
          className={`w-[170px] border-r ${borderClass} flex flex-col items-center justify-center p-1`}
        >
          <div className="flex-1 flex items-center justify-center mb-1">
            <img
              src="/imagenes/onac_logo.png"
              alt="Onac Acreditado"
              className="max-h-[45px] object-contain"
            />
          </div>
          <div className="text-[7.5pt] text-center leading-tight">
            <div>ISO/IEC 17020:2012</div>
            <div>18-OIN-021</div>
          </div>
        </div>

        {/* === COL 3: TÍTULO CENTRAL === */}
        <div
          className={`flex-1 border-r ${borderClass} flex flex-col justify-center items-center text-center px-1`}
        >
          <div className="font-bold text-[9pt] leading-tight">
            Informe de inspección de Instalaciones NUEVAS U OBJETO DE REFORMA
            para
          </div>

          <div className="font-bold text-[9pt] leading-tight my-1">
            suministro de gases combustibles destinadas a usos Residenciales y
            comerciales
          </div>

          <div className="font-bold text-[9.5pt] leading-tight">
            para GN - GLP Resolución Min. Minas &nbsp; 90902/2013 - 41385 / 2017
          </div>
        </div>

        {/* === COL 4: N° DE INFORME (NR) === */}
        <div className={`w-[190px] border-r ${borderClass} flex flex-col`}>
          {/* Título de la celda */}
          <div
            className={`h-[25px] flex items-center justify-center text-[8.5pt] font-bold pt-1`}
          >
            N° DE INFORME:
          </div>

          {/* Contenido: NR grande y número */}
          <div className="flex-1 flex items-center px-2 relative">
            {/* 'NR' grande alineado a la izquierda */}
            <span className="text-[26pt] font-bold text-gray-800 absolute left-2 leading-none">
              NRD
            </span>

            {/* El número de acta centrado/derecha */}
            <div className="w-full text-center pl-10">
              <span className="text-[12pt] font-bold text-red-600">
                {inspeccion?.ruta?.numero_acta || ""}
              </span>
            </div>
          </div>
        </div>

        {/* === COL 5: METADATOS (CÓDIGO / VERSIÓN / FECHA) === */}
        <div className="w-[150px] flex flex-col text-[8.5pt] font-bold">
          <div
            className={`flex-1 border-b ${borderClass} flex items-center justify-center text-center px-1`}
          >
            CODIGO: F-IP-02-01
          </div>
          <div
            className={`flex-1 border-b ${borderClass} flex items-center justify-center text-center px-1`}
          >
            VERSIÓN: 08
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-1">
            FECHA: 2023-02-19
          </div>
        </div>
      </div>
    </div>
  );
};
