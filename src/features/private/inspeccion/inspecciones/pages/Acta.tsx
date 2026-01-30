import { useActa } from "@/features/private/inspeccion/inspecciones/hooks";
import {
  Periodicas,
  Nuevas,
} from "@/features/private/inspeccion/inspecciones/components";

import { useNavigate } from "react-router-dom";

export const Acta = () => {
  const navigate = useNavigate();
  const {
    inspeccion,
    isometricoBase64,
    esquemaPlantaBase64,
    firmaBase64,
    firmaInspectorBase64,
    selloInspectorBase64,
  } = useActa();

  const isPeriodica = inspeccion?.tipoInspeccion.id_tipo_inspeccion === 1;

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 print:hidden z-50 font-bold"
      >
        Volver
      </button>
      <div
        className="
        w-full 
        max-w-[1246px]         
        min-h-[297mm]
        bg-white
        text-[10pt]
        leading-[1.35]
        text-black
        relative
        mx-auto
        shadow-lg              
        print:w-full           
        print:max-w-none       
        print:min-h-0
        print:shadow-none
        print:m-0
        box-border
      "
      >
        {isPeriodica ? (
          <Periodicas
            inspeccion={inspeccion}
            isometricoBase64={isometricoBase64}
            esquemaPlantaBase64={esquemaPlantaBase64}
            firmaBase64={firmaBase64}
            firmaInspectorBase64={firmaInspectorBase64}
            selloInspectorBase64={selloInspectorBase64}
          />
        ) : (
          <Nuevas
            inspeccion={inspeccion}
            isometricoBase64={isometricoBase64}
            esquemaPlantaBase64={esquemaPlantaBase64}
            firmaBase64={firmaBase64}
            firmaInspectorBase64={firmaInspectorBase64}
            selloInspectorBase64={selloInspectorBase64}
          />
        )}
      </div>
    </>
  );
};
