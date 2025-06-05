import { Form, Input, InputNumber, Button, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCouponPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCoupon = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/coupons/${id}`);
        if (!res.ok) throw new Error("Kupon getirilemedi.");
        const data = await res.json();
        form.setFieldsValue({
          code: data.code,
          discountPercent: data.discountPercent,
        });
      } catch (err) {
        message.error("Kupon bilgileri yüklenemedi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id, apiUrl, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/coupons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        message.success("Kupon başarıyla güncellendi.");
        navigate("/admin/coupons");
      } else {
        message.error("Güncelleme başarısız.");
      }
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      message.error("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <h2 style={{ marginBottom: 20 }}>Kuponu Güncelle</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Kupon Kodu"
          name="code"
          rules={[{ required: true, message: "Kupon kodu gerekli!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı (%)"
          name="discountPercent"
          rules={[{ required: true, message: "İndirim oranı gerekli!" }]}
        >
          <InputNumber min={1} max={100} style={{ width: "100%" }} />
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
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
