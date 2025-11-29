import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const DatosUsuario = ({ inspeccion }: Props) => {
  const nombreClient = [
    inspeccion?.ruta?.casa?.cliente?.primer_nombre,
    inspeccion?.ruta?.casa?.cliente?.segundo_nombre,
    inspeccion?.ruta?.casa?.cliente?.primer_apellido,
    inspeccion?.ruta?.casa?.cliente?.segundo_apellido,
  ]
    .filter(Boolean)
    .join(" ");

  const cliente = inspeccion?.ruta?.casa?.cliente;
  const casa = inspeccion?.ruta?.casa;
  const ciudad = casa?.ciudad;

  return (
    <div className="w-full text-[9pt] font-arial leading-tight text-black border-l border-r border-b border-black box-border">
      <div className="flex w-full">
        <div className="w-[72%] border-r border-black flex flex-col">
          <div className="w-full bg-gray-200 font-bold text-center border-b border-black py-0.5">
            1. DATOS DE USUARIO
          </div>

          <div className="flex w-full border-b border-black">
            <div className="flex-1 border-r border-black px-1 py-0.5 flex items-center">
              <span className="font-bold mr-1">Nombre:</span>
              <span className="uppercase truncate">{nombreClient}</span>
            </div>
            <div className="w-[140px] border-r border-black px-1 py-0.5 flex items-center">
              <span className="font-bold mr-1">Cédula:</span>
              <span>{cliente?.numero_documento}</span>
            </div>
            <div className="w-[140px] px-1 py-0.5 flex items-center">
              <span className="font-bold mr-1">Teléfono:</span>
              <span>{cliente?.telefono}</span>
            </div>
          </div>

          <div className="flex w-full border-b border-black">
            <div className="flex-1 border-r border-black px-1 py-0.5 flex items-center">
              <span className="font-bold mr-1">Dirección:</span>
              <span className="uppercase truncate">{casa?.direccion}</span>
            </div>
            <div className="w-[350px] px-1 py-0.5 flex items-center">
              <span className="font-bold mr-1">Barrio:</span>
              <span className="uppercase truncate">{casa?.barrio}</span>
            </div>
          </div>

          <div className="flex w-full h-full">
            <div className="w-[160px] border-r border-black px-1 py-0.5 flex flex-col justify-center">
              <div className="flex items-center">
                <span className="font-bold w-[50px]">Cuenta:</span>
                <span>{casa?.no_cuenta}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold w-[50px]">Código:</span>
                <span></span>
              </div>
            </div>
            <div className="flex-1 border-r border-black px-1 py-0.5 flex items-center">
              <span className="font-bold mr-1">Medidor:</span>
              <span>{casa?.medidor}</span>
            </div>
            <div className="w-[160px] border-r border-black px-1 py-0.5 flex items-center">
              <span className="font-bold mr-1">Dpto:</span>
              <span className="uppercase">{ciudad?.departamento?.nombre}</span>
            </div>
            <div className="w-[160px] px-1 py-0.5 flex items-center">
              <span className="font-bold mr-1">Ciudad:</span>
              <span className="uppercase">{ciudad?.nombre}</span>
            </div>
          </div>
        </div>

        <div className="w-[28%] flex flex-col">
          <div className="w-full bg-gray-200 font-bold text-center border-b border-black py-0.5 text-[8pt]">
            2. IDENTIFICACIÓN DEL ORGANISMO DE DE INSPECCIÓN
          </div>

          <div className="flex flex-1">
            <div className="flex-1 border-r border-black flex flex-col justify-between">
              <div className="px-1 py-0.5">
                <span className="font-normal block">
                  Empresa: OI ELECTROGASES S.A.S
                </span>
                <span className="font-normal block leading-tight">
                  Dirección: Cll. 3N # 3E-111 Urb. Capellana
                  <br />
                  Cúcuta - Norte De Santander
                </span>
                <div className="mt-0.5">
                  <span className="font-bold">Acreditación N°: </span>
                  <span className="font-bold">18-OIN-021</span>
                </div>
              </div>

              <div className="px-1 py-0.5 border-t border-black text-[8pt]">
                <span className="uppercase text-gray-600">DISTRIBUIDORA:</span>
                <span className="ml-1 font-bold">COLGAS</span>
              </div>
            </div>

            <div className="w-[90px] flex flex-col">
              <div className="flex-1 border-b border-black px-1 py-0.5 text-center flex flex-col justify-center">
                <div className="font-normal text-[8pt]">Teléfonos:</div>
                <div className="font-bold text-[9pt]">3503732122</div>
                <div className="font-bold text-[9pt]">5492370</div>
              </div>
              <div className="h-[30px] px-1 flex flex-col justify-center text-center">
                <div className="text-[7pt]">NIT:</div>
                <div className="text-[8pt] leading-none">901106969-6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
