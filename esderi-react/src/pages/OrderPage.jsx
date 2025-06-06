import { Table, Tag } from "antd";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/orders`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Sipariş verileri alınamadı:", error);
      }
    };
    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Tarih",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Kullanıcı",
      dataIndex: ["user", "email"],
      key: "userEmail",
      render: (email) => email || "Bilinmiyor",
    },
    {
      title: "Ürünler",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <>
          {products.map((p, index) => (
            <div key={index}>
              <Tag color="blue">{p.name} x{p.quantity}</Tag>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Toplam Tutar",
      dataIndex: "total",
      key: "total",
      render: (amount) => `$${amount?.toFixed(2) ?? "-"}`,
    },
    {
      title: "Durum",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (paid) =>
        paid ? <Tag color="green">Ödendi</Tag> : <Tag color="red">Bekliyor</Tag>,
    },
  ];

  return (
    <div>
      <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>Sipariş Listesi</h2>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OrderPage;
