export function TablaEvalVentilacion({ rows = 6 }: { rows?: number }) {
  return (
    <div className="mt-2 overflow-x-auto overflow-y-hidden">
      <table className="table-fixed w-full min-w-[1248px] border border-black border-collapse text-xs leading-tight">
        {/* --- Anchos de columnas --- */}
        <colgroup>
          {/* Básicas */}
          <col className="w-[90px]" />   {/* Id. Recinto */}
          <col className="w-[80px]" />   {/* CO (amb) */}
          <col className="w-[90px]" />   {/* CO diluido (amb) */}
          <col className="w-[110px]" />  {/* Volumen (m3) */}
          <col className="w-[150px]" />  {/* Potencia artefactos (kW) */}
          <col className="w-[50px]" />   {/* Cumple: SI */}
          <col className="w-[50px]" />   {/* Cumple: NO */}
          <col className="w-[44px]" />   {/* Método: 1 */}
          <col className="w-[44px]" />   {/* Método: 2 */}

          {/* Superior: D DV DH CEMP CEDP + Áreas */}
          <col className="w-[36px]" />
          <col className="w-[36px]" />
          <col className="w-[36px]" />
          <col className="w-[48px]" />
          <col className="w-[48px]" />
          <col className="w-[120px]" />
          <col className="w-[120px]" />

          {/* Inferior: D DV DH CEMP CEDP + Áreas */}
          <col className="w-[36px]" />
          <col className="w-[36px]" />
          <col className="w-[36px]" />
          <col className="w-[48px]" />
          <col className="w-[48px]" />
          <col className="w-[120px]" />
          <col className="w-[120px]" />
        </colgroup>

        <thead>
          {/* Título */}
          <tr>
            <th
              colSpan={23}
              className="border-b border-black text-center font-bold py-1 bg-gray-100"
            >
              7. EVALUACIÓN DE CONDICIONES DE VENTILACIÓN, MEDICIÓN DE MONÓXIDO
              DE CARBONO EN AMBIENTE Y DILUIDO EN AMBIENTE
            </th>
          </tr>

          {/* Fila de grupos principales */}
          <tr className="text-center align-middle">
            <th rowSpan={3} className="border border-black px-2">Id. Recinto</th>
            <th rowSpan={3} className="border border-black px-2">CO<br/>(amb)</th>
            <th rowSpan={3} className="border border-black px-2">CO diluido<br/>(amb)</th>
            <th rowSpan={3} className="border border-black px-2">Volumen<br/>recinto<br/>(m³)</th>
            <th rowSpan={3} className="border border-black px-2">Potencia artefactos<br/>circuito abierto<br/>(kW)</th>

            <th colSpan={2} rowSpan={2} className="border border-black px-2">
              Cumple método<br/>Estándar
            </th>
            <th colSpan={2} rowSpan={2} className="border border-black px-2">
              Método de<br/>Ventilación
            </th>

            <th colSpan={7} className="border border-black px-2">Superior</th>
            <th colSpan={7} className="border border-black px-2">Inferior</th>
          </tr>

          {/* Fila intermedia: título “Tipo de Ventilación” + áreas (con rowSpan) */}
          <tr className="text-center">
            {/* Superior */}
            <th colSpan={5} className="border border-black px-2">
              Tipo de Ventilación
            </th>
            <th rowSpan={2} className="border border-black px-2">
              Área mínima<br/>requerida (cm²)
            </th>
            <th rowSpan={2} className="border border-black px-2">
              Área abertura<br/>existente (cm²)
            </th>

            {/* Inferior */}
            <th colSpan={5} className="border border-black px-2">
              Tipo de ventilación
            </th>
            <th rowSpan={2} className="border border-black px-2">
              Área mínima<br/>requerida (cm²)
            </th>
            <th rowSpan={2} className="border border-black px-2">
              Área abertura<br/>existente (cm²)
            </th>
          </tr>

          {/* Fila de subencabezados finales */}
          <tr className="text-center">
            {/* Cumple / Método */}
            <th className="border border-black">SI</th>
            <th className="border border-black">NO</th>
            <th className="border border-black">1</th>
            <th className="border border-black">2</th>

            {/* Superior: D DV DH CEMP CEDP */}
            <th className="border border-black">D</th>
            <th className="border border-black">DV</th>
            <th className="border border-black">DH</th>
            <th className="border border-black">CEMP</th>
            <th className="border border-black">CEDP</th>

            {/* (Áreas superior tienen rowSpan en la fila anterior) */}

            {/* Inferior: D DV DH CEMP CEDP */}
            <th className="border border-black">D</th>
            <th className="border border-black">DV</th>
            <th className="border border-black">DH</th>
            <th className="border border-black">CEMP</th>
            <th className="border border-black">CEDP</th>
            {/* (Áreas inferior tienen rowSpan en la fila anterior) */}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className="h-[28px]">
              {Array.from({ length: 23 }).map((__, c) => (
                <td key={c} className="border border-black" />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
