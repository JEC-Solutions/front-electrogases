import { Card, Form, Row, Col, Input, Button, DatePicker, Select } from "antd";
import { SearchOutlined, DownloadOutlined, ClearOutlined } from "@ant-design/icons";

interface Props {
  onFiltersChange: (filters: any) => void;
  onExportZip: () => void;
  loading: boolean;
  loadingExport: boolean;
}

export const SisercoForm = ({ onFiltersChange, onExportZip, loading, loadingExport }: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
      startDate: values.dateRange?.[0]?.format("YYYY-MM-DD"),
      endDate: values.dateRange?.[1]?.format("YYYY-MM-DD"),
    };
    delete formattedValues.dateRange;
    onFiltersChange(formattedValues);
  };

  const onReset = () => {
    form.resetFields();
    onFiltersChange({
      startDate: "",
      endDate: "",
      tipoInspeccion: "",
      inspector: "",
      numeroActa: "",
    });
  };

  return (
    <Card title="Filtros de Búsqueda" size="small">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          tipoInspeccion: "",
        }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item name="dateRange" label="Rango de Fechas">
              <DatePicker.RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item name="tipoInspeccion" label="Tipo de Inspección">
              <Select>
                <Select.Option value="">Todos</Select.Option>
                <Select.Option value="1">Periódica (PD)</Select.Option>
                <Select.Option value="2">Nueva (NRD)</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item name="numeroActa" label="Número de Acta">
              <Input placeholder="Ej. 12345" allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item name="inspector" label="Inspector">
              <Input placeholder="Nombre del inspector" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col className="flex gap-2">
            <Button
              icon={<ClearOutlined />}
              onClick={onReset}
              disabled={loading}
            >
              Limpiar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              loading={loading}
            >
              Buscar
            </Button>
            <Button
              type="dashed"
              icon={<DownloadOutlined />}
              loading={loadingExport}
              disabled={loading}
              onClick={onExportZip}
            >
              Exportar ZIP
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
