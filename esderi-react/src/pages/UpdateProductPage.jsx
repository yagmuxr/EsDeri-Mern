import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Kategorileri çek
    fetch(`${apiUrl}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Kategori yükleme hatası:", err));
    // Ürün verisini çek
    fetch(`${apiUrl}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // img, colors, sizes alanlarını textarea'ya uygun şekilde string'e çevir
        form.setFieldsValue({
          ...data,
          img: Array.isArray(data.img) ? data.img.join("\n") : data.img,
          colors: Array.isArray(data.colors) ? data.colors.join("\n") : data.colors,
          // Eğer description varsa, ReactQuill için
          description: data.description || "",
        });
      })
      .catch((err) => {
        message.error("Ürün verisi yüklenemedi.");
        console.error("Ürün yükleme hatası:", err);
      });
  }, [apiUrl, id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      img: values.img.split('\n').map((link) => link.trim()).filter(Boolean),
      colors: values.colors.split('\n').map((color) => color.trim()).filter(Boolean),
    };
    try {
      const response = await fetch(`${apiUrl}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        message.success("Ürün başarıyla güncellendi.");
        navigate("/admin/products");
      } else {
        message.error("Ürün güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Ürün güncelleme hatası:", error);
      message.error("Bir hata meydana geldi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="update-product" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen Ürün adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name={["price", "current"]}
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını girin!",
            },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="İndirim Oranı (%)"
          name={["price", "discount"]}
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün indirim oranı girin!",
            },
          ]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün açıklaması girin!",
            },
          ]}
          getValueFromEvent={(content) => content}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
        </Form.Item>
        <Form.Item
          label="Ürün Görselleri (Linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4 ürün görsel linki girin!",
            },
          ]}
        >
          <Input.TextArea placeholder="Her bir görsel linkini yeni bir satıra yazın." autoSize={{ minRows: 4 }} />
        </Form.Item>
        <Form.Item
          label="Ürün Renkleri (RGB Kodları)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün rengi girin!",
            },
          ]}
        >
          <Input.TextArea placeholder="Her bir RGB kodunu yeni bir satıra yazın. (örn: #ffffff)" autoSize={{ minRows: 4 }} />
        </Form.Item>
        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen 1 kategori seçin!",
            },
          ]}
        >
          <Select placeholder="Kategori seçin" loading={categories.length === 0}>
            {categories.map((cat) => (
              <Select.Option key={cat._id} value={cat._id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
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
            Ürünü Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
