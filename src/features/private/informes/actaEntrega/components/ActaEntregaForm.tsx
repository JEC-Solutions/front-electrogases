import { Card, Form, Row, Col, Button, DatePicker, Select } from "antd";
import { SearchOutlined, DownloadOutlined, ClearOutlined } from "@ant-design/icons";
import { useInspectores } from "@/features/private/inspectores/usuarios/hooks/useInspectoresUsuarios";

interface Props {
  onFiltersChange: (filters: any) => void;
  onGeneratePdf: () => void;
  loading: boolean;
  loadingPdf: boolean;
}

export const ActaEntregaForm = ({
  onFiltersChange,
  onGeneratePdf,
  loading,
  loadingPdf,
}: Props) => {
  const [form] = Form.useForm();
  const { data: inspectores = [], isLoading: loadingInspectors } = useInspectores();

  const onFinish = (values: any) => {
    const formattedValues = {
      startDate: values.dateRange?.[0]?.format("YYYY-MM-DD") || "",
      endDate: values.dateRange?.[1]?.format("YYYY-MM-DD") || "",
      inspectorId: values.inspectorId || "",
    };
    onFiltersChange(formattedValues);
  };

  const onReset = () => {
    form.resetFields();
    onFiltersChange({
      startDate: "",
      endDate: "",
      inspectorId: "",
    });
  };

  return (
    <Card title="Filtros de Búsqueda" size="small">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 8]}>
          <Col xs={24} sm={12} lg={12}>
            <Form.Item
              name="dateRange"
              label="Rango de Fechas"
              rules={[{ required: true, message: "El rango de fechas es requerido" }]}
            >
              <DatePicker.RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <Form.Item name="inspectorId" label="Inspector">
              <Select
                placeholder="Seleccione un inspector"
                allowClear
                loading={loadingInspectors}
                showSearch
                optionFilterProp="label"
                options={inspectores.map((i: any) => ({
                  value: i.persona?.id_persona,
                  label: `${i.persona?.primer_nombre ?? ""} ${
                    i.persona?.primer_apellido ?? ""
                  }`.trim(),
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: 10 }}>
          <Col className="flex gap-2">
            <Button
              icon={<ClearOutlined />}
              onClick={onReset}
              disabled={loading || loadingPdf}
            >
              Limpiar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              loading={loading}
              disabled={loadingPdf}
            >
              Buscar
            </Button>
            <Button
              type="dashed"
              icon={<DownloadOutlined />}
              loading={loadingPdf}
              disabled={loading}
              onClick={onGeneratePdf}
            >
              Generar PDF
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
