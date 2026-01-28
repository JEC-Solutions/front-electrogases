import { electroApi } from "@/api";

export const getCuadroMaestro = () => {
    return electroApi.get("/cuadro-maestro");
}
