import Header from "../components/Header/Header";
import Slider from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Campaigns from "../components/Campaign/Campaigns";

const HomePage = () => {

  return (
    <div>
      <Header/>
      <Slider/>
      <Categories/>
      <Products/>
      <Campaigns/>
    </div>
  )
}
export default HomePage;