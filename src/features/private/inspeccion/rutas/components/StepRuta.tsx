import { DatePicker, Input, TimePicker } from "antd";
import { Controller } from "react-hook-form";

interface Props {
  methods: any;
}

export const StepRuta = ({ methods }: Props) => {
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <>
      <div className="mb-4">
        <label>Fecha</label>
        <Controller
          name="ruta.fecha"
          control={control}
          render={({ field }) => <DatePicker {...field} format="YYYY-MM-DD" />}
        />
      </div>

      <div className="mb-4">
        <label>Hora</label>
        <Controller
          name="ruta.hora"
          control={control}
          render={({ field }) => <TimePicker {...field} format="HH:mm:ss" />}
        />
      </div>

      <div className="mb-4">
        <label>Inspector (id_persona)</label>
        <Controller
          name="ruta.id_persona"
          control={control}
          render={({ field }) => <Input type="number" {...field} />}
        />
      </div>
    </>
  );
};
