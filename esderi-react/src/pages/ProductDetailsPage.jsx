import { Fragment } from "react";
import Header from "../components/Header/Header";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetailsPage = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id: productId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        setSingleProduct(data);
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchSingleProduct();
  }, [apiUrl, productId]);

  console.log(singleProduct);

  return singleProduct && Array.isArray(singleProduct.img) ? (
    <ProductDetails 
      singleProduct={singleProduct} 
      setSingleProduct={setSingleProduct}
    />
  ) : (
    <p>Product not found or images missing.</p>
  );
};

export default ProductDetailsPage;