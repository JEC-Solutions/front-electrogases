const Box = () => (
  <span className="inline-block w-[14px] h-[14px] border border-black align-middle" />
);

export const Declaracion = () => {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="min-w-[1248px]">
        <div className="border border-black text-xs leading-tight">
          {/* Título */}
          <div className="bg-gray-100 font-bold text-center py-1 border-b border-black">
            10. DECLARACIÓN DE CONFORMIDAD
          </div>

          {/* 1) Mecanismo de advertencia (SI/NO) */}
          <div className="px-2 py-1 border-b border-black flex items-center justify-between">
            <p className="pr-2">
              Se informó adquirir un mecanismo de advertencia, preferiblemente
              audiovisual, a un nivel de concentración de CO en el ambiente
              igual o superior a 50 ppm:
            </p>
            <span className="flex items-center gap-3">
              <span className="font-semibold">SI</span> <Box />
              <span className="font-semibold ml-3">NO</span> <Box />
            </span>
          </div>

          {/* 2) Importante */}
          <div className="px-2 py-1 border-b border-black">
            <span className="font-semibold">Importante:</span> Si la Instalación
            presenta Defectos No Críticos según Resoluciones 90902 y 41385 se
            cuenta con dos meses para corregir dichos defectos, en todo caso
            este plazo no podrá extenderse más allá del plazo máximo de la
            revisión periódica con el fin de evitar la suspensión del servicio
            por parte del Distribuidor.
          </div>

          {/* 3) Confidencialidad */}
          <div className="px-2 py-1 border-b border-black">
            <span className="font-semibold">CONFIDENCIALIDAD:</span>
            <span className="font-semibold">
              {" "}
              ELECTROGASES SAS. DECLARA:
            </span>{" "}
            Que la información contenida en este documento es de carácter
            confidencial, salvo los datos que sean requeridos para la solución
            de quejas y apelaciones o con fines legales (requerimiento judicial,
            cumplimiento de reglamentación, legislación o normativa vigente,
            etc.); igualmente en su condición de responsable del tratamiento de
            los datos personales actuará conforme a la ley 1581 de 2012.
          </div>

          {/* 4) Reporte a distribuidora + Nº reporte defecto crítico */}
          <div className="px-2 py-1 border-b border-black flex items-center">
            <span>
              Se le informa al usuario que el resultado de la inspección será
              reportado a la distribuidora en los tiempos establecidos según
              resolución 90902 de 2013
            </span>
            <span className="ml-2 font-semibold whitespace-nowrap">
              N° DE REPORTE POR DEFECTO CRITICO
            </span>
            <span className="ml-2 flex-1 border-b border-black h-[14px]" />
          </div>

          {/* 5) Etiqueta visible (SI/NO) */}
          <div className="px-2 py-1 border-b border-black">
            <div className="flex items-center justify-between">
              <p className="pr-2">
                Si la instalación es conforme se adhiere en sitio visible la
                etiqueta que soporta esta inspección.
              </p>
              <span className="flex items-center gap-3">
                <span className="font-semibold">SI</span> <Box />
                <span className="font-semibold ml-3">NO</span> <Box />
              </span>
            </div>
          </div>

          {/* ===== NUEVO BLOQUE: Resultados / Instalación Conforme / Predio Continúa ===== */}
          <div className="grid grid-cols-3 divide-x divide-black border-b border-black">
            {/* Columna 1: Resultados de la visita */}
            <div className="px-2">
              <div className="py-1 font-bold text-center">
                Resultados de la visita de inspección
              </div>
              <div className="pb-1 flex items-center gap-3">
                <span>Sin defectos:</span> <Box />
                <span className="ml-3">Defectos no críticos:</span> <Box />
                <span className="ml-3">Defectos Críticos:</span> <Box />
              </div>
            </div>

            {/* Columna 2: Instalación conforme */}
            <div className="px-2 flex items-center justify-between">
              <span className="font-bold">INSTALACIÓN CONFORME:</span>
              <span className="flex items-center gap-3">
                <span className="font-semibold">SI</span> <Box />
                <span className="font-semibold ml-3">NO</span> <Box />
              </span>
            </div>

            {/* Columna 3: Predio continúa en servicio */}
            <div className="px-2 flex items-center justify-between">
              <span className="font-bold">Predio Continúa En Servicio :</span>
              <span className="flex items-center gap-3">
                <span className="font-semibold">Si</span> <Box />
                <span className="font-semibold ml-3">No</span> <Box />
              </span>
            </div>
          </div>

          {/* ===== 12. OBSERVACIONES ===== */}
          <div className="px-2 py-1 border-b border-black">
            <span className="font-bold">12. OBSERVACIONES:</span>{" "}
            <span className="font-semibold">
              (En este espacio solo deben quedar registradas observaciones
              producto de evaluación de la conformidad resoluciones 90902 de
              2013 y 41385 de 2017)
            </span>
          </div>
          {/* Área libre para escribir */}
          <div className="h-[220px]" />
        </div>
      </div>
    </div>
  );
};
