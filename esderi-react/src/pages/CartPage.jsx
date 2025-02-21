import { Fragment } from "react"
import Cart from "../components/Cart/Cart"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

const CartPage = () => {
  return (
    <Fragment>
        <Header />
        <Cart />
        <Footer />
    </Fragment>
  )
}

export default CartPage