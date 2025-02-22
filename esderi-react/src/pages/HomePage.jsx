import Header from "../components/Header/Header";
import Slider from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Campaigns from "../components/Campaign/Campaigns";
import Policy from "../components/Policy/Policy";
import Footer from "../components/Footer/Footer";
const HomePage = () => {

  return (
    <div>
      <Header/>
      <Slider/>
      <Categories/>
      <Products/>
      <Campaigns/>
      <Policy/>
      <Footer/>
    </div>
  )
}
export default HomePage;