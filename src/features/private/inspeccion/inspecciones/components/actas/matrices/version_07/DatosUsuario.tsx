import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
}

export const DatosUsuario = ({ inspeccion }: Props) => {
  const datosMatriz = inspeccion?.datos_matriz;
  const datosUsuario = datosMatriz?.datos_usuario;

  const clienteRuta = inspeccion?.ruta?.casa?.cliente;
  const casaRuta = inspeccion?.ruta?.casa;

  const nombreFallback = [
    clienteRuta?.primer_nombre,
    clienteRuta?.segundo_nombre,
    clienteRuta?.primer_apellido,
    clienteRuta?.segundo_apellido,
  ]
    .filter(Boolean)
    .join(" ");

  const nombreUsuario =
    (typeof datosUsuario?.nombre === "string" ? datosUsuario.nombre.trim() : "") ||
    nombreFallback ||
    "";
  const codigoUsuario =
    (typeof datosUsuario?.codigo === "string" ? datosUsuario.codigo.trim() : "") ||
    casaRuta?.no_cuenta ||
    inspeccion?.numero_informe ||
    "";
  const direccionUsuario =
    (typeof datosUsuario?.direccion === "string" ? datosUsuario.direccion.trim() : "") ||
    casaRuta?.direccion ||
    "";
  const ciudadUsuario =
    (typeof datosUsuario?.ciudad === "string" ? datosUsuario.ciudad.trim() : "") ||
    casaRuta?.ciudad?.nombre ||
    "";

  // Organismo de inspección
  const FALLBACK_ORGANISMO = {
    empresa: "O.I. ELECTROGASES S.A.S.",
    nit: "901106969-6",
    direccion: "Cll 3n # 3e-111 Urb. La Capillana",
    telefono: "3202697386",
    acreditacion: "18-OIN-021",
  };

  const orgSnapshot = inspeccion?.datos_organismo_snapshot;
  const orgEmpresa = orgSnapshot?.empresa || FALLBACK_ORGANISMO.empresa;
  const orgNit = orgSnapshot?.nit || FALLBACK_ORGANISMO.nit;
  const orgDireccion = orgSnapshot?.direccion || FALLBACK_ORGANISMO.direccion;
  const orgTelefono =
    orgSnapshot?.telefono1 ||
    orgSnapshot?.telefono2 ||
    FALLBACK_ORGANISMO.telefono;
  const orgAcreditacion =
    orgSnapshot?.acreditacion || FALLBACK_ORGANISMO.acreditacion;

  // Formato de fechas y horas
  const formatFecha = (fecha: any): string => {
    if (!fecha) {
      return "   /   /   ";
    }
    if (typeof fecha === "string") {
      const clean = fecha.split("T")[0].trim();
      if (clean.includes("-")) {
        const parts = clean.split("-");
        if (parts.length === 3) {
          if (parts[0].length === 4) {
            return `${parts[2]}  /  ${parts[1]}  /  ${parts[0]}`;
          }
          return `${parts[0]}  /  ${parts[1]}  /  ${parts[2]}`;
        }
      }
      if (clean.includes("/")) {
        return clean
          .split("/")
          .map((p) => p.trim())
          .join("  /  ");
      }
    }
    try {
      const d = new Date(fecha);
      if (!isNaN(d.getTime())) {
        const iso = d.toISOString().split("T")[0];
        const [y, m, day] = iso.split("-");
        return `${day}  /  ${m}  /  ${y}`;
      }
    } catch {}
    return String(fecha);
  };

  const formatHora = (hora: any): string => {
    if (!hora) return "";
    const str = String(hora).trim();
    if (str.toUpperCase().includes("AM") || str.toUpperCase().includes("PM")) {
      return str;
    }
    const [h, m] = str.split(":");
    if (h !== undefined && m !== undefined) {
      const numH = parseInt(h, 10);
      const ampm = numH >= 12 ? "PM" : "AM";
      const h12 = numH % 12 || 12;
      return `${h12}:${m} ${ampm}`;
    }
    return str;
  };

  const fechaInspeccion = formatFecha(inspeccion?.fecha_inspeccion);
  const horaInicio = formatHora(inspeccion?.hora_inicio);
  const horaFinal = formatHora(inspeccion?.hora_fin);

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Fila Superior: Datos del Usuario (60%) e Identificación del Organismo (40%) */}
      <div className="flex flex-row w-full border-b border-black box-border">
        {/* Columna 1: 1. DATOS DEL USUARIO (60%) */}
        <div className="w-[60%] border-r border-black flex flex-col box-border">
          <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
            1. DATOS DEL USUARIO
          </div>

          {/* Nombre y Código */}
          <div className="flex flex-row w-full border-b border-black flex-1 min-h-[25px] box-border text-[7pt]">
            <div className="w-[70%] border-r border-black px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap">Nombre :</span>
              <span className="font-normal overflow-hidden text-ellipsis whitespace-nowrap uppercase">
                {nombreUsuario}
              </span>
            </div>
            <div className="w-[30%] px-[5px] py-[2px] flex items-center box-border whitespace-nowrap">
              <span className="font-bold mr-[4px]">Codigo:</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">{codigoUsuario}</span>
            </div>
          </div>

          {/* Dirección y Ciudad */}
          <div className="flex flex-row w-full flex-1 min-h-[25px] box-border text-[7pt]">
            <div className="w-[70%] border-r border-black px-[5px] py-[2px] flex items-center box-border overflow-hidden">
              <span className="font-bold mr-[4px] whitespace-nowrap">Dirección :</span>
              <span className="font-normal overflow-hidden text-ellipsis whitespace-nowrap uppercase">
                {direccionUsuario}
              </span>
            </div>
            <div className="w-[30%] px-[5px] py-[2px] flex items-center box-border whitespace-nowrap">
              <span className="font-bold mr-[4px]">Ciudad:</span>
              <span className="uppercase overflow-hidden text-ellipsis whitespace-nowrap">{ciudadUsuario}</span>
            </div>
          </div>
        </div>

        {/* Columna 2: 2. IDENTIFICACIÓN DEL ORGANISMO DE INSPECCIÓN (40%) */}
        <div className="w-[40%] flex flex-col box-border">
          <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
            2. IDENTIFICACIÓN DEL ORGANISMO DE INSPECCIÓN
          </div>

          {/* Empresa y NIT */}
          <div className="flex flex-row w-full border-b border-black min-h-[17px] box-border text-[6.8pt]">
            <div className="w-[65%] border-r border-black px-[5px] py-[2px] flex items-center overflow-hidden box-border">
              <span className="font-bold mr-[3px] whitespace-nowrap">Empresa:</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">{orgEmpresa}</span>
            </div>
            <div className="w-[35%] px-[5px] py-[2px] flex items-center whitespace-nowrap box-border">
              <span className="font-bold mr-[3px]">NIT:</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">{orgNit}</span>
            </div>
          </div>

          {/* Dirección y Telefono */}
          <div className="flex flex-row w-full border-b border-black min-h-[17px] box-border text-[6.8pt]">
            <div className="w-[65%] border-r border-black px-[5px] py-[2px] flex items-center overflow-hidden box-border">
              <span className="font-bold mr-[3px] whitespace-nowrap">Dirección:</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">{orgDireccion}</span>
            </div>
            <div className="w-[35%] px-[5px] py-[2px] flex items-center whitespace-nowrap box-border">
              <span className="font-bold mr-[3px]">Telefono:</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">{orgTelefono}</span>
            </div>
          </div>

          {/* Acreditación No: */}
          <div className="flex items-center justify-center px-[5px] py-[2px] text-[6.8pt] min-h-[17px] box-border text-center">
            <span className="font-bold mr-[3px]">Acreditación No:</span>
            <span>{orgAcreditacion}</span>
          </div>
        </div>
      </div>

      {/* Fila Inferior: Fecha de inspección, Hora inicio, Hora final */}
      <div className="flex items-center w-full min-h-[19px] box-border text-[7pt] p-[1.5px_5px] bg-white">
        {/* Fecha de inspección */}
        <div className="flex items-center mr-[28px]">
          <span className="font-bold mr-[6px] whitespace-nowrap">Fecha de inspección:</span>
          <div className="bg-[#e5e7eb] min-w-[110px] h-[15px] flex items-center justify-center px-[8px] text-[7pt] box-border tracking-[0.5px]">
            {fechaInspeccion}
          </div>
        </div>

        {/* Hora inicio */}
        <div className="flex items-center mr-[28px]">
          <span className="font-bold mr-[6px] whitespace-nowrap">Hora inicio :</span>
          <div className="bg-[#e5e7eb] min-w-[80px] h-[15px] flex items-center justify-center px-[6px] text-[7pt] box-border">
            {horaInicio}
          </div>
        </div>

        {/* Hora final */}
        <div className="flex items-center">
          <span className="font-bold mr-[6px] whitespace-nowrap">Hora final:</span>
          <div className="bg-[#e5e7eb] min-w-[80px] h-[15px] flex items-center justify-center px-[6px] text-[7pt] box-border">
            {horaFinal}
          </div>
        </div>
      </div>
    </div>
  );
};
