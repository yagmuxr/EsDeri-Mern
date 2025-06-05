import { Layout, Menu, ConfigProvider } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  LaptopOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const { Sider, Header, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate(`/admin`),
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      children: [
        {
          key: "3",
          label: "Kategori Listesi",
          onClick: () => navigate(`/admin/categories`),
        },
        {
          key: "4",
          label: "Yeni Kategori Oluştur",
          onClick: () => navigate("/admin/categories/create"),
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      children: [
        {
          key: "6",
          label: "Ürün Listesi",
          onClick: () => navigate(`/admin/products`),
        },
        {
          key: "7",
          label: "Yeni Ürün Oluştur",
          onClick: () => navigate("/admin/products/create"),
        },
      ],
    },
    {
      key: "8",
      icon: <BarcodeOutlined />,
      label: "Kuponlar",
      children: [
        {
          key: "9",
          label: "Kupon Listesi",
          onClick: () => navigate(`/admin/coupons`),
        },
        {
          key: "10",
          label: "Yeni Kupon Oluştur",
          onClick: () => navigate("/admin/coupons/create"),
        },
      ],
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      onClick: () => navigate(`/admin/users`),
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      onClick: () => navigate(`/admin/orders`),
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => navigate(`/`),
    },
  ];

  const customTheme = {
    components: {
      Menu: {
        darkItemBg: '#000000',
        darkItemColor: '#ffffff',
        darkItemHoverBg: '#cc0000',
        darkItemSelectedBg: '#cc0000',
        darkSubMenuItemBg: '#000000',
        darkItemHoverColor: '#ffffff',
        darkItemSelectedColor: '#ffffff',
      },
    },
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!user || user.role !== "admin") {
    window.location.href = "/";
    return null;
  }

  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200} theme="dark">
          <Menu
            mode="vertical"
            style={{ height: "100%" }}
            theme="dark"
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header style={{ color: "black", display: "flex", justifyContent: "space-between", backgroundColor: "#cc0000" }}>
            <h2>Admin Paneli</h2>
          </Header>
          <Content>
            <div
              className="site-layout-background"
              style={{ padding: "24px 50px", minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;
