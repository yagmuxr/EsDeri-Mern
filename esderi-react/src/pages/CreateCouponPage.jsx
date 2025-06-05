import { Form, Input, InputNumber, Button, Spin, message } from "antd";
import { useState } from "react";

const CreateCouponPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kupon başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Kupon oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Kupon oluşturma hatası:", error);
      message.error("Bir hata meydana geldi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <h2 style={{ marginBottom: 20 }}>Yeni Kupon Oluştur</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Kupon Kodu"
          name="code"
          rules={[{ required: true, message: "Lütfen kupon kodunu girin!" }]}
        >
          <Input placeholder="Örn: YAZ2025" />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı (%)"
          name="discountPercent"
          rules={[{ required: true, message: "İndirim oranı zorunlu!" }]}
        >
          <InputNumber min={1} max={100} style={{ width: "100%" }} placeholder="Örn: 15" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              background: "#1890ff",
              borderRadius: "6px",
              height: "40px",
              fontWeight: "bold",
            }}
          >
            Kuponu Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateCouponPage;
