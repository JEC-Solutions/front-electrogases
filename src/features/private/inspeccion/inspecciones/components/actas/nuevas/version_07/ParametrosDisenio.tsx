interface Props {
  inspeccion: any | undefined;
}

const Box = ({ checked = false }: { checked?: boolean }) => (
  <span className="inline-flex items-center justify-center w-[10px] h-[10px] border border-black bg-white align-middle">
    {checked && (
      <span className="text-[8px] font-bold leading-none -mt-[2px]">X</span>
    )}
  </span>
);

export const ParametrosDisenio = ({ inspeccion }: Props) => {
  const items = inspeccion?.parametrosDiseno || [];

  const maxRows = 5;
  const filas = Array.from({ length: maxRows });

  const border = "border border-black";
  const textClass = "text-[7pt] font-arial leading-tight text-black";
  const headerClass =
    "bg-gray-100 font-semibold text-center align-middle h-[24px]";

  return (
    <div className={`w-full ${textClass} mt-[-1px]`}>
      <table className="w-full table-fixed border-collapse border border-black">
        <colgroup>
          {/* Lado Izquierdo */}
          <col style={{ width: "8%" }} /> {/* Tramos */}
          <col style={{ width: "16%" }} /> {/* Material */}
          <col style={{ width: "10%" }} /> {/* Diametro */}
          <col style={{ width: "8%" }} /> {/* Longitud */}
          <col style={{ width: "4%" }} /> {/* Oculta */}
          <col style={{ width: "4%" }} /> {/* Vista */}
          {/* Lado Derecho */}
          <col style={{ width: "8%" }} /> {/* Tramos */}
          <col style={{ width: "16%" }} /> {/* Material */}
          <col style={{ width: "10%" }} /> {/* Diametro */}
          <col style={{ width: "8%" }} /> {/* Longitud */}
          <col style={{ width: "4%" }} /> {/* Oculta */}
          <col style={{ width: "4%" }} /> {/* Vista */}
        </colgroup>

        <thead>
          <tr>
            <th
              className={`bg-gray-200 font-bold text-center border border-black py-[2px]`}
              colSpan={12}
            >
              4. PARAMETROS DE DISEÑO
            </th>
          </tr>
          <tr>
            {/* Encabezados Izquierda */}
            <th className={`${border} ${headerClass}`}>Tramos</th>
            <th className={`${border} ${headerClass}`}>Material</th>
            <th className={`${border} ${headerClass}`}>Diametro en (mm)</th>
            <th className={`${border} ${headerClass}`}>Longitud en (m)</th>
            <th className={`${border} ${headerClass} text-[6pt]`}>Oculta</th>
            <th className={`${border} ${headerClass} text-[6pt]`}>
              A la Vista
            </th>

            {/* Encabezados Derecha */}
            <th className={`${border} ${headerClass}`}>Tramos</th>
            <th className={`${border} ${headerClass}`}>Material</th>
            <th className={`${border} ${headerClass}`}>Diametro</th>
            <th className={`${border} ${headerClass}`}>Longitud</th>
            <th className={`${border} ${headerClass} text-[6pt]`}>Oculta</th>
            <th className={`${border} ${headerClass} text-[6pt]`}>
              A la Vista
            </th>
          </tr>
        </thead>

        <tbody>
          {filas.map((_, i) => {
            const itemLeft = items[i];
            const itemRight = items[i + maxRows];

            return (
              <tr key={i} className="h-[20px]">
                {/* --- LADO IZQUIERDO --- */}
                <td className={`${border} px-1 text-center`}>
                  {itemLeft?.tramo || ""}
                </td>
                <td className={`${border} px-1 text-center`}>
                  {itemLeft?.material || ""}
                </td>
                <td className={`${border} px-1 text-center`}>
                  {itemLeft?.diametro || ""}
                </td>
                <td className={`${border} px-1 text-center`}>
                  {itemLeft?.longitud || ""}
                </td>
                <td className={`${border} text-center`}>
                  <Box checked={itemLeft?.tipo === "OCULTA"} />
                </td>
                <td className={`${border} text-center`}>
                  <Box checked={itemLeft?.tipo === "VISTA"} />
                </td>

                {/* --- LADO DERECHO --- */}
                <td className={`${border} px-1 text-center`}>
                  {itemRight?.tramo || ""}
                </td>
                <td className={`${border} px-1 text-center`}>
                  {itemRight?.material || ""}
                </td>
                <td className={`${border} px-1 text-center`}>
                  {itemRight?.diametro || ""}
                </td>
                <td className={`${border} px-1 text-center`}>
                  {itemRight?.longitud || ""}
                </td>
                <td className={`${border} text-center`}>
                  <Box checked={itemRight?.tipo === "OCULTA"} />
                </td>
                <td className={`${border} text-center`}>
                  <Box checked={itemRight?.tipo === "VISTA"} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
