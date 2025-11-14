import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const DatosUsuario = ({ inspeccion }: Props) => {
  const nombreClient =
    inspeccion?.ruta?.casa?.cliente?.primer_nombre +
    " " +
    inspeccion?.ruta?.casa?.cliente?.segundo_nombre +
    " " +
    inspeccion?.ruta?.casa?.cliente?.primer_apellido +
    " " +
    inspeccion?.ruta?.casa?.cliente?.segundo_apellido;

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="min-w-[1248px]">
        <div className="grid grid-cols-[1030px_400px] border-t border-l border-r border-black text-xs leading-tight">
          {/* IZQUIERDA: 1. DATOS DE USUARIO */}
          <div className="border-r border-black">
            <div className="px-2 py-1 border-b border-black bg-gray-100 font-bold text-center">
              1. DATOS DE USUARIO
            </div>

            {/* Fila 1: Nombre | Cédula | Teléfono */}
            <div className="grid grid-cols-[1fr_220px_220px]">
              <div className="border-b border-black px-2 py-1">
                <span className="font-semibold">Nombre: </span>
                <span className="align-middle inline-block min-h-[22px]">
                  {/* {usuario.nombre} */} {nombreClient}
                </span>
              </div>
              <div className="border-l border-b border-black px-2 py-1">
                <span className="font-semibold">Cédula: </span>
                <span className="inline-block min-h-[22px]">
                  {/* {usuario.cedula} */}{" "}
                  {inspeccion?.ruta?.casa?.cliente?.numero_documento}
                </span>
              </div>
              <div className="border-l border-b border-black px-2 py-1">
                <span className="font-semibold">Teléfono: </span>
                <span className="inline-block min-h-[22px]">
                  {/* {usuario.telefono} */}{" "}
                  {inspeccion?.ruta?.casa?.cliente?.telefono}
                </span>
              </div>
            </div>

            {/* Fila 2: Dirección | Barrio */}
            <div className="grid grid-cols-[1fr_420px]">
              <div className="px-2 py-1 border-b border-black">
                <span className="font-semibold">Dirección: </span>
                <span className="inline-block min-h-[22px]">
                  {/* {usuario.direccion} */}{" "}
                  {inspeccion?.ruta?.casa?.direccion}
                </span>
              </div>
              <div className="px-2 py-1 border-l border-b border-black">
                <span className="font-semibold">Barrio: </span>
                <span className="inline-block min-h-[22px]">
                  {/* {usuario.barrio} */} {inspeccion?.ruta?.casa?.barrio}
                </span>
              </div>
            </div>

            {/* Fila 3/4: Cuenta+Código (apilado) | Medidor (ocupa 2 filas) | Dpto (2 filas) | Ciudad (2 filas) */}
            <div className="grid grid-cols-[260px_1fr_240px_220px]">
              {/* Col 1 (dos renglones apilados) */}
              <div className="flex flex-col">
                <div className="px-2 py-1 flex items-center justify">
                  <div>
                    <span className="font-semibold">Cuenta: </span>
                    <br />
                    <span className="font-semibold">Codigo: </span>
                  </div>
                  <span className="inline-block min-h-[22px]">
                    {inspeccion?.ruta?.casa?.no_cuenta}
                  </span>
                </div>
              </div>

              {/* Col 2: Medidor (abarca 2 filas) */}
              <div className="px-2 py-1 border-l border-r border-black row-span-2">
                <span className="font-semibold">Medidor: </span>
                <span className="inline-block min-h-[46px] align-top">
                  {/* {usuario.medidor} */} {inspeccion?.ruta?.casa?.medidor}
                </span>
              </div>

              {/* Col 3: Dpto (abarca 2 filas) */}
              <div className="px-2 py-1 border-r border-black row-span-2">
                <span className="font-semibold">Dpto: </span>
                <span className="inline-block min-h-[46px] align-top">
                  {/* {usuario.departamento} */}{" "}
                  {inspeccion?.ruta?.casa?.ciudad?.departamento?.nombre}
                </span>
              </div>

              {/* Col 4: Ciudad (abarca 2 filas) */}
              <div className="px-2 py-1 row-span-2">
                <span className="font-semibold">Ciudad: </span>
                <span className="inline-block min-h-[46px] align-top">
                  {/* {usuario.ciudad} */}{" "}
                  {inspeccion?.ruta?.casa?.ciudad?.nombre}
                </span>
              </div>
            </div>
          </div>

          {/* DERECHA: 2. IDENTIFICACIÓN DEL ORGANISMO DE INSPECCIÓN */}
          <div className="h-full">
            <div className="px-2 py-1 border-b border-black bg-gray-100 font-bold text-center">
              2. IDENTIFICACIÓN DEL ORGANISMO DE DE INSPECCIÓN
            </div>

            {/* Cuerpo con dos columnas internas: info + teléfonos/NIT */}
            <div className="grid grid-cols-[1fr_115px] h-full">
              {/* Col izquierda (empresa/dirección/acreditación/distribuidora) */}
              <div className=" border-black">
                <div className="px-2 py-1 border-b border-r border-black">
                  <span className="font-semibold">Empresa: </span>
                  <span className="inline-block min-h-[20px]">
                    {/* {oi.empresa} */} OI ELECTROGASES S A S
                  </span>
                </div>
                <div className="px-2 py-1 border-b border-r border-black">
                  <span className="font-semibold">Dirección: </span>
                  <span className="inline-block">
                    {/* {oi.direccion} */} Cl. 3N # 3E-111 Urb. Capellana —
                    Cúcuta - Norte de Santander
                  </span>
                </div>
                <div className="px-2 py-1 border-b border-r border-black">
                  <span className="font-semibold">Acreditación N°: </span>
                  <span>{/* {oi.acreditacion} */} 18-OIN-021</span>
                </div>

                {/* Distribuidora al final */}
                <div className="px-2 py-1 border-r">
                  <span className="text-gray-700 mr-1">DISTRIBUIDORA:</span>
                  <span className="font-semibold">
                    {/* {oi.distribuidora} */} Colgas
                  </span>
                </div>
              </div>

              {/* Col derecha (teléfonos, NIT) */}
              <div className="flex flex-col">
                <div className="px-2 py-1 border-b border-black">
                  <div className="font-semibold">Teléfonos:</div>
                  <div className="leading-snug">
                    {/* {oi.telefonos?.map(...)} */}
                    3503723122
                    <br />
                    5492370
                  </div>
                </div>
                <div className="px-2 py-1">
                  <div className="font-semibold">NIT</div>
                  <div>901106596-6</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
