import { IActa } from "@/features/private/inspeccion/inspecciones/interfaces";

interface Props {
  inspeccion: IActa | undefined;
  firmaClienteBase64?: string | null;
  firmaInspectorBase64?: string | null;
  selloInspectorBase64?: string | null;
}

const MatrizBox = ({ checked }: { checked: boolean }) => (
  <div className="inline-flex items-center justify-center w-[18px] h-[11px] border-[0.75pt] border-[#777] bg-[#e5e7eb] align-middle leading-none box-border">
    {checked && (
      <span className="font-arial text-[10px] font-bold text-black leading-none">
        &#10003;
      </span>
    )}
  </div>
);

export const DeclaracionConformidad = ({
  inspeccion,
  firmaClienteBase64,
  firmaInspectorBase64,
  selloInspectorBase64,
}: Props) => {
  const conf =
    inspeccion?.datos_matriz?.declaracion_conformidad ||
    (Array.isArray(inspeccion?.declaracionConformidad)
      ? inspeccion.declaracionConformidad[0]
      : (inspeccion?.declaracionConformidad as any)) ||
    {};

  const resultado = conf.resultado;
  const sinDefectos =
    resultado === "sin_defectos" || conf.sin_defectos === true;
  const defectosNoCriticos =
    resultado === "defectos_no_criticos" ||
    conf.defectos_no_criticos === true;
  const defectosCriticos =
    resultado === "defectos_criticos" || conf.defectos_criticos === true;

  const lineaMatriz = conf.linea_matriz || {};
  const lineaConforme =
    lineaMatriz.cumple !== undefined
      ? lineaMatriz.cumple
      : conf.instalacionConforme;
  const enServicio =
    lineaMatriz.servicio !== undefined
      ? lineaMatriz.servicio === true
      : conf.enServicio === true;
  const predioContinua =
    lineaMatriz.predio_continua !== undefined
      ? lineaMatriz.predio_continua
      : conf.continuaServicio;

  const cliente = conf.cliente || {};
  const nombreCliente = cliente.nombre || conf.nombreCliente || "";
  const cedulaCliente = cliente.cedula || conf.cedulaCliente || "";
  const vinculoCliente = cliente.vinculo || conf.vinculoCliente || "";
  const telefonoCliente =
    cliente.telefono ||
    conf.telefonoCliente ||
    conf.telefono ||
    inspeccion?.datos_matriz?.datos_usuario?.telefono ||
    inspeccion?.ruta?.casa?.cliente?.telefono ||
    "";

  const p = inspeccion?.ruta?.persona;
  const nombreInspector = [
    p?.primer_nombre,
    p?.segundo_nombre,
    p?.primer_apellido,
    p?.segundo_apellido,
  ]
    .filter(Boolean)
    .join(" ");

  const certificadoInspector = String(
    inspeccion?.inspector_certificado_no || p?.usuario?.certificado_no || "",
  );
  const vigenciaInspector = String(
    inspeccion?.inspector_vigencia || p?.usuario?.vigencia || "",
  );
  const expedidoPor = inspeccion?.inspector_entidad || p?.usuario?.entidad || "";

  const observaciones = conf.observaciones || inspeccion?.declaracionConformidad?.[0]?.observaciones || "";

  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Encabezado Principal (Gris) */}
      <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2px] uppercase leading-[1.2]">
        10. DECLARACIÓN DE CONFORMIDAD
      </div>

      {/* Fila 2 & 3: Resultado de la inspección & Estado Línea Matriz */}
      <div className="flex flex-row w-full border-b border-black box-border">
        {/* Columna Izquierda: Resultado de la inspección (43%) */}
        <div className="w-[43%] border-r border-black flex flex-col box-border">
          <div className="text-[6.8pt] font-bold text-center py-[2px] border-b border-black leading-[1.2]">
            Resultado de la inspección
          </div>
          <div className="flex flex-row w-full min-h-[17px] items-center text-[6pt] box-border">
            <div className="w-[32%] flex items-center justify-between p-[1px_3px] border-r border-black h-full box-border">
              <span>Sin defectos</span>
              <MatrizBox checked={sinDefectos} />
            </div>
            <div className="w-[38%] flex items-center justify-between p-[1px_3px] border-r border-black h-full box-border">
              <span>Defectos no Criticos</span>
              <MatrizBox checked={defectosNoCriticos} />
            </div>
            <div className="w-[30%] flex items-center justify-between p-[1px_3px] h-full box-border">
              <span>Defectos Criticos</span>
              <MatrizBox checked={defectosCriticos} />
            </div>
          </div>
        </div>

        {/* Columna Derecha: Estado Línea Matriz y Servicio (57%) */}
        <div className="w-[57%] flex flex-col box-border">
          <div className="flex items-center justify-center gap-[6px] text-[6.8pt] font-bold py-[2px] border-b border-black leading-[1.2]">
            <span>Linea Matriz conforme</span>
            <div className="inline-flex items-center gap-[2px] ml-[4px]">
              <span>SI</span>
              <MatrizBox checked={lineaConforme === true} />
            </div>
            <div className="inline-flex items-center gap-[2px] ml-[8px]">
              <span>NO</span>
              <MatrizBox checked={lineaConforme === false} />
            </div>
          </div>

          <div className="flex flex-row w-full min-h-[17px] items-center text-[6pt] box-border">
            <div className="w-[32%] flex items-center justify-between p-[1px_4px] border-r border-black h-full box-border">
              <span>En Servicio</span>
              <MatrizBox checked={enServicio} />
            </div>
            <div className="w-[68%] flex items-center justify-between p-[1px_6px] h-full box-border">
              <span>Predio continua en servicio</span>
              <div className="inline-flex items-center gap-[2px]">
                <span>SI</span>
                <MatrizBox checked={predioContinua === true} />
              </div>
              <div className="inline-flex items-center gap-[2px]">
                <span>NO</span>
                <MatrizBox checked={predioContinua === false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fila 4: Banner Legal de Confidencialidad */}
      <div className="border-b border-black text-[5.4pt] leading-[1.2] text-center p-[2.5px_6px] box-border">
        <span className="font-bold mr-1">CONFIDENCILIDAD: ELECTROGASES SAS. DECLARA:</span>
        Que la información contenida en este documento es de carácter confidencial, salvo los datos que sean requeridos para la solución de quejas y apelaciones o con fines legales (requerimiento judicial, cumplimiento de reglamentación, legislación o normativa vigente, etc.); igualmente en su condición de responsable del tratamiento de los datos personales actuará conforme a la ley 1581 de 2012.
      </div>

      {/* Fila 5: Observaciones */}
      <div className="border-b border-black min-h-[42px] p-[3px_5px] text-[6.5pt] leading-[1.25] flex flex-col box-border">
        <div>
          <span className="font-normal">11. Observaciones:</span>
          <span className="font-bold ml-[4px]">{observaciones}</span>
        </div>
      </div>

      {/* Fila 6 & 7: Bloque de Cierre: Datos del Cliente (50%) & Inspector (50%) */}
      <div className="w-full flex flex-row min-h-[80px] box-border text-[6.2pt]">
        {/* Columna Izquierda: Datos del cliente (50%) */}
        <div className="w-[50%] border-r border-black flex flex-col box-border">
          <div className="bg-[#f2f2f2] border-b border-black font-bold text-[6.8pt] text-center py-[2px] leading-[1.2]">
            12. Datos del cliente
          </div>
          <div className="border-b border-black p-[2px_4px] text-center font-bold text-[5.6pt] leading-[1.15]">
            Declaro que conozco el resultado de la inspección y las acciones<br/>a seguir en caso de encontrar defetos en la linea matriz
          </div>

          <div className="flex flex-row flex-1 w-full box-border">
            {/* Campos Cliente (65%) */}
            <div className="w-[65%] border-r border-black flex flex-col box-border">
              <div className="flex-1 border-b border-black p-[2px_4px] flex items-center">
                <span>Nombre:</span>
                <span className="font-bold ml-[3px] uppercase">{nombreCliente}</span>
              </div>
              <div className="flex-1 border-b border-black p-[2px_4px] flex items-center">
                <span>Cedula:</span>
                <span className="font-bold ml-[3px]">{cedulaCliente}</span>
              </div>
              <div className="flex-1 border-b border-black p-[2px_4px] flex items-center">
                <span>Vinculo:</span>
                <span className="font-bold ml-[3px] uppercase">{vinculoCliente}</span>
              </div>
              <div className="flex-1 p-[2px_4px] flex items-center">
                <span>Telefono:</span>
                <span className="font-bold ml-[3px]">{telefonoCliente}</span>
              </div>
            </div>

            {/* Firma Cliente (35%) */}
            <div className="w-[35%] flex flex-col relative box-border">
              <div className="p-[2px_4px] text-[6.2pt]">Firma:</div>
              <div className="flex-1 flex items-center justify-center overflow-hidden relative min-h-[38px] p-1">
                {firmaClienteBase64 ? (
                  <img
                    src={firmaClienteBase64}
                    alt="Firma Cliente"
                    className="block max-w-[95%] max-h-[95%] object-contain mix-blend-multiply"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Datos del inspector (50%) */}
        <div className="w-[50%] flex flex-col box-border">
          <div className="bg-[#f2f2f2] border-b border-black font-bold text-[6.8pt] text-center py-[2px] leading-[1.2]">
            Datos del inspector
          </div>

          {/* Fila Nombre Inspector con Firma Superpuesta */}
          <div className="border-b border-black p-[2px_4px] min-h-[24px] flex items-center relative box-border">
            <span className="whitespace-nowrap">Nombre del inspector:</span>
            <span className="font-bold ml-[4px] z-[1] uppercase">{nombreInspector}</span>
            {firmaInspectorBase64 && (
              <img
                src={firmaInspectorBase64}
                alt="Firma Inspector"
                className="block max-h-[38px] max-w-[120px] object-contain absolute right-[15px] top-1/2 -translate-y-1/2 z-[2] mix-blend-multiply"
              />
            )}
          </div>

          <div className="flex flex-row flex-1 w-full box-border">
            {/* Detalles Inspector (65%) */}
            <div className="w-[65%] border-r border-black flex flex-col box-border">
              <div className="flex-1 border-b border-black p-[2px_4px] flex items-center box-border overflow-hidden">
                <span className="whitespace-nowrap text-[6pt] mr-[4px]">Certificado N°:</span>
                <div className="font-bold text-[5.2pt] leading-[1.2] break-all">
                  {certificadoInspector.includes("/") ? (
                    certificadoInspector.split("/").map((item, idx) => (
                      <div key={idx}>{item.trim()}</div>
                    ))
                  ) : (
                    certificadoInspector
                  )}
                </div>
              </div>
              <div className="flex-1 border-b border-black p-[2px_4px] flex items-center box-border overflow-hidden">
                <span className="text-[6pt] whitespace-nowrap mr-[4px]">Vigencia:</span>
                <div className="font-bold text-[5.8pt] leading-[1.2]">
                  {vigenciaInspector.includes("/") ? (
                    vigenciaInspector.split("/").map((item, idx) => (
                      <div key={idx}>{item.trim()}</div>
                    ))
                  ) : (
                    vigenciaInspector || "Sin Vigencia"
                  )}
                </div>
              </div>
              <div className="flex-1 p-[2px_4px] flex items-center box-border">
                <span className="text-[6pt] whitespace-nowrap">Expedido por:</span>
                <span className="font-bold ml-[4px] text-[5.8pt]">{expedidoPor}</span>
              </div>
            </div>

            {/* Sello Inspector (35%) */}
            <div className="w-[35%] flex flex-col relative box-border">
              <div className="p-[2px_4px] text-[6.2pt]">Sello:</div>
              <div className="flex-1 flex items-center justify-center overflow-hidden relative min-h-[35px] p-1">
                {selloInspectorBase64 ? (
                  <img
                    src={selloInspectorBase64}
                    alt="Sello Inspector"
                    className="block max-w-[95%] max-h-[95%] object-contain mix-blend-multiply"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
