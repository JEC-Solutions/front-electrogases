import { useState, useCallback } from "react";
import {
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  AutoComplete,
  Alert,
  Button,
  Divider,
  message,
  Spin,
} from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import { ITipoVisita } from "@/features/private/inspeccion/rutas/interfaces";
import { useGlobalDptos } from "@/features/global/hooks";
import { searchCasas } from "@/features/private/inspeccion/rutas/services/rutas.services";
import debounce from "lodash/debounce";

interface ICasaSearch {
  id_casa: number;
  no_cuenta: string;
  medidor: string;
  direccion: string;
  barrio: string;
  valor_servicio: string;
  observaciones: string;
  cliente?: {
    id_cliente: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    numero_documento: string;
    telefono: string;
    tipo_documento?: {
      id_tipo_documento: number;
    };
  };
  ciudad?: {
    codigo: string;
    nombre: string;
    departamento?: {
      codigo: string;
      nombre: string;
    };
  };
  tipo_visita?: {
    id_tipo_visita: number;
    nombre: string;
  };
}

interface Props {
  methods: any;
  tiposVisita: ITipoVisita[];
}

export const StepCasa = ({ methods, tiposVisita }: Props) => {
  const { ciudades, departamentos, getCityByDpto } = useGlobalDptos();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = methods;

  const [searchOptions, setSearchOptions] = useState<
    { value: string; label: React.ReactNode; casa: ICasaSearch }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCasa, setSelectedCasa] = useState<ICasaSearch | null>(null);

  // Watch for id_casa to know if we have a selected casa
  const watchedIdCasa = watch("casa.id_casa");

  const formatTipoVisita = tiposVisita.map((visita) => ({
    value: visita.id_tipo_visita,
    label: visita.nombre,
  }));

  const formatCiudades = ciudades.map((ciudad) => ({
    value: ciudad.codigo,
    label: ciudad.nombre,
  }));

  const formatDepartamentos = departamentos.map((dpto) => ({
    value: dpto.codigo,
    label: dpto.nombre,
  }));

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSearchOptions([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await searchCasas(query);
        const casas: ICasaSearch[] = response.data?.data || [];
        const options = casas.map((casa) => ({
          value: String(casa.id_casa),
          label: (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontWeight: 500 }}>
                {casa.direccion} - {casa.barrio}
              </span>
              <span style={{ fontSize: 12, color: "#666" }}>
                Cuenta: {casa.no_cuenta} | Medidor: {casa.medidor || "N/A"}
              </span>
              {casa.cliente && (
                <span style={{ fontSize: 11, color: "#888" }}>
                  Cliente: {casa.cliente.primer_nombre}{" "}
                  {casa.cliente.primer_apellido} -{" "}
                  {casa.cliente.numero_documento}
                </span>
              )}
            </div>
          ),
          casa,
        }));
        setSearchOptions(options);
      } catch (error) {
        console.error("Error buscando casas:", error);
        setSearchOptions([]);
      } finally {
        setIsLoading(false);
      }
    }, 400),
    []
  );

  const handleSelectCasa = (_value: string, option: any) => {
    const casa: ICasaSearch = option.casa;
    setSelectedCasa(casa);

    // Set casa fields
    setValue("casa.id_casa", casa.id_casa);
    setValue("casa.no_cuenta", casa.no_cuenta);
    setValue("casa.medidor", casa.medidor || "");
    setValue("casa.direccion", casa.direccion);
    setValue("casa.barrio", casa.barrio);
    setValue("casa.valor_servicio", casa.valor_servicio || "");
    setValue("casa.observaciones", casa.observaciones || "");
    setValue("casa.id_tipo_visita", casa.tipo_visita?.id_tipo_visita);

    // Set location
    if (casa.ciudad?.departamento) {
      setValue("casa.id_departamento", casa.ciudad.departamento.codigo);
      getCityByDpto(casa.ciudad.departamento.codigo);
      setTimeout(() => {
        setValue("casa.id_ciudad", casa.ciudad?.codigo);
      }, 100);
    }

    // Set client fields if present
    if (casa.cliente) {
      setValue("cliente.id_cliente", casa.cliente.id_cliente);
      setValue("cliente.primer_nombre", casa.cliente.primer_nombre || "");
      setValue("cliente.segundo_nombre", casa.cliente.segundo_nombre || "");
      setValue("cliente.primer_apellido", casa.cliente.primer_apellido || "");
      setValue("cliente.segundo_apellido", casa.cliente.segundo_apellido || "");
      setValue("cliente.numero_documento", casa.cliente.numero_documento || "");
      setValue("cliente.telefono", casa.cliente.telefono || "");
      if (casa.cliente.tipo_documento) {
        setValue(
          "cliente.id_tipo_documento",
          casa.cliente.tipo_documento.id_tipo_documento
        );
      }
    }

    message.success("Casa seleccionada. Los campos han sido pre-llenados.");
    setSearchOptions([]);
  };

  const handleClearSelection = () => {
    setSelectedCasa(null);
    setValue("casa.id_casa", undefined);
    setValue("casa.no_cuenta", "");
    setValue("casa.medidor", "");
    setValue("casa.direccion", "");
    setValue("casa.barrio", "");
    setValue("casa.valor_servicio", "");
    setValue("casa.observaciones", "");
    setValue("casa.id_tipo_visita", undefined);
    setValue("casa.id_departamento", undefined);
    setValue("casa.id_ciudad", undefined);
    message.info("Selección limpiada. Puede ingresar una nueva casa.");
  };

  const isFieldDisabled = Boolean(selectedCasa || watchedIdCasa);

  return (
    <div className="mt-2">
      {/* Search Section */}
      <Row gutter={16} className="mb-4">
        <Col xs={24}>
          <Alert
            message="Buscar casa existente"
            description="Escriba la dirección, cuenta, medidor o barrio para buscar casas existentes. Si encuentra la casa, selecciónela para evitar duplicados."
            type="info"
            showIcon
            className="mb-3"
          />
        </Col>
        <Col xs={24} md={16}>
          <AutoComplete
            style={{ width: "100%", marginTop: 4 }}
            options={searchOptions}
            onSearch={debouncedSearch}
            onSelect={handleSelectCasa}
            disabled={isFieldDisabled}
          >
            <Input
              size="large"
              placeholder="Buscar por dirección, cuenta, medidor o barrio..."
              allowClear
              suffix={
                <SearchOutlined
                  style={{ color: "#bfbfbf", fontSize: "18px" }}
                />
              }
            />
          </AutoComplete>
          {isLoading && (
            <span
              style={{
                fontSize: 12,
                color: "#666",
                marginTop: 4,
                display: "block",
              }}
            >
              <Spin size="small" style={{ marginRight: 8 }} /> Buscando...
            </span>
          )}
        </Col>
        <Col xs={24} md={8}>
          {isFieldDisabled && (
            <Button
              type="dashed"
              danger
              icon={<CloseCircleOutlined />}
              onClick={handleClearSelection}
              style={{
                width: "100%",
                marginTop: 4,
              }}
              size="large"
            >
              Deshacer selección
            </Button>
          )}
        </Col>
      </Row>

      {selectedCasa && (
        <Alert
          message={`Casa seleccionada: ${selectedCasa.direccion}`}
          description={`Cuenta: ${selectedCasa.no_cuenta} | Barrio: ${selectedCasa.barrio}`}
          type="success"
          showIcon
          className="mb-3"
        />
      )}

      <Divider orientation="left">Datos de la Casa</Divider>

      {/* Hidden field for id_casa */}
      <Controller
        name="casa.id_casa"
        control={control}
        render={() => <input type="hidden" />}
      />

      {/* Form Fields */}
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <div className="mb-4">
            <label htmlFor="no_cuenta">Número de cuenta</label>
            <Controller
              name="casa.no_cuenta"
              control={control}
              defaultValue={""}
              rules={{
                required: "Este campo es requerido",
              }}
              render={({ field }) => (
                <Input
                  id="no_cuenta"
                  placeholder="Número de cuenta"
                  {...field}
                  disabled={isFieldDisabled}
                />
              )}
            />
            {errors?.casa?.no_cuenta && (
              <span style={{ color: "red" }}>
                {errors.casa.no_cuenta.message as string}
              </span>
            )}
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="mb-4">
            <label htmlFor="medidor">Medidor</label>
            <Controller
              name="casa.medidor"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <Input
                  id="medidor"
                  placeholder="Medidor"
                  {...field}
                  disabled={isFieldDisabled}
                />
              )}
            />
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="mb-4">
            <label htmlFor="direccion">Dirección</label>
            <Controller
              name="casa.direccion"
              control={control}
              defaultValue={""}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Input
                  id="direccion"
                  placeholder="Dirección"
                  {...field}
                  disabled={isFieldDisabled}
                />
              )}
            />
            {errors?.casa?.direccion && (
              <span style={{ color: "red" }}>
                {errors.casa.direccion.message as string}
              </span>
            )}
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="mb-4">
            <label htmlFor="barrio">Barrio</label>
            <Controller
              name="casa.barrio"
              control={control}
              defaultValue={""}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Input
                  id="barrio"
                  placeholder="Barrio"
                  {...field}
                  disabled={isFieldDisabled}
                />
              )}
            />
            {errors?.casa?.barrio && (
              <span style={{ color: "red" }}>
                {errors.casa.barrio.message as string}
              </span>
            )}
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="mb-4">
            <label htmlFor="valor_servicio">Valor del servicio</label>
            <Controller
              name="casa.valor_servicio"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <InputNumber
                  id="valor_servicio"
                  style={{ width: "100%" }}
                  placeholder="Valor del servicio"
                  min={0}
                  precision={0}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  disabled={isFieldDisabled}
                  formatter={(value) =>
                    value === undefined || value === null
                      ? ""
                      : new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        }).format(Number(value))
                  }
                  parser={(value) => {
                    const onlyDigits = value?.toString().replace(/[^\d]/g, "");
                    return onlyDigits ? Number(onlyDigits) : undefined;
                  }}
                />
              )}
            />
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="mb-4">
            <label htmlFor="id_tipo_visita">Tipo de visita</label>
            <Controller
              name="casa.id_tipo_visita"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="id_tipo_visita"
                  allowClear
                  showSearch
                  placeholder="Seleccione el tipo de visita"
                  style={{ width: "100%" }}
                  optionFilterProp="label"
                  options={formatTipoVisita}
                  disabled={isFieldDisabled}
                />
              )}
            />
            {errors?.casa?.id_tipo_visita && (
              <span style={{ color: "red" }}>
                {errors.casa.id_tipo_visita.message as string}
              </span>
            )}
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="mb-4">
            <label htmlFor="id_ciudad">Departamento</label>
            <Controller
              name="casa.id_departamento"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="id_departamento"
                  allowClear
                  showSearch
                  placeholder="Seleccione el departamento"
                  style={{ width: "100%" }}
                  optionFilterProp="label"
                  options={formatDepartamentos}
                  disabled={isFieldDisabled}
                  onChange={(value) => {
                    field.onChange(value);
                    getCityByDpto(value);
                    methods.setValue("casa.id_ciudad", undefined, {
                      shouldValidate: true,
                    });
                  }}
                />
              )}
            />
            {errors?.casa?.id_departamento && (
              <span style={{ color: "red" }}>
                {errors.casa.id_departamento.message as string}
              </span>
            )}
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="mb-4">
            <label>Ciudad</label>
            <Controller
              name="casa.id_ciudad"
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  allowClear
                  showSearch
                  placeholder="Seleccione la ciudad"
                  style={{ width: "100%" }}
                  optionFilterProp="label"
                  options={formatCiudades}
                  disabled={isFieldDisabled || formatCiudades.length === 0}
                />
              )}
            />
            {errors?.casa?.id_ciudad && (
              <span style={{ color: "red" }}>
                {errors.casa.id_ciudad.message as string}
              </span>
            )}
          </div>
        </Col>

        <Col xs={24}>
          <div className="mb-4">
            <label>Observaciones</label>
            <Controller
              name="casa.observaciones"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <Input.TextArea
                  rows={3}
                  placeholder="Observaciones"
                  {...field}
                  disabled={isFieldDisabled}
                />
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
