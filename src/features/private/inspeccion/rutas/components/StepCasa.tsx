import { Input, Select } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  methods: any;
}

export const StepCasa = ({ methods }: Props) => {
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <>
      <div className="mb-4">
        <label>Dirección</label>
        <Controller
          name="casa.direccion"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => <Input {...field} />}
        />
      </div>

      <div className="mb-4">
        <label>Tipo de Vivienda</label>
        <Controller
          name="casa.tipo_vivienda"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { label: "Casa", value: "Casa" },
                { label: "Apartamento", value: "Apartamento" },
              ]}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <label>Ciudad</label>
        <Controller
          name="casa.id_ciudad"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { label: "Medellín", value: "05001" },
                { label: "Bogotá", value: "11001" },
              ]}
            />
          )}
        />
      </div>
    </>
  );
};
