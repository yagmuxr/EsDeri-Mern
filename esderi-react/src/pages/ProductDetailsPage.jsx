import Breadcrumb from "../components/ProductDetails/Breadcrumbs/Breadcrumbs";
import Gallery from "../components/ProductDetails/Gallery/Gallery";
import Info from "../components/ProductDetails/Info/Info";
import Tabs from "../components/ProductDetails/Tabs/Tabs";
import "./ProductDetails.css";

const ProductDetailsPage = () => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery />
              <Info />
            </main>
          </div>
          <Tabs />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;