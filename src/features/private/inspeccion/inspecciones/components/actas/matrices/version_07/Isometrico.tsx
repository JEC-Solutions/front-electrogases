interface Props {
  isometricoBase64: string | undefined;
}

export const Isometrico = ({ isometricoBase64 }: Props) => {
  return (
    <div className="w-full border-l border-r border-b border-black font-arial box-border flex flex-col bg-white text-black">
      {/* Encabezado Principal (Gris) */}
      <div className="bg-[#f2f2f2] border-b border-black text-[7.5pt] font-bold text-center py-[2.5px] uppercase leading-[1.2]">
        9. Isometrico
      </div>

      {/* Lienzo de Dibujo Isométrico */}
      <div className="w-full h-[200px] bg-white flex items-center justify-center box-border relative overflow-hidden p-1">
        {isometricoBase64 ? (
          <img
            src={isometricoBase64}
            alt="Isométrico"
            className="max-w-full max-h-full w-full h-full object-contain block"
          />
        ) : (
          <span className="text-gray-400 text-[8pt] italic">
            Sin esquema isométrico registrado
          </span>
        )}
      </div>
    </div>
  );
};
