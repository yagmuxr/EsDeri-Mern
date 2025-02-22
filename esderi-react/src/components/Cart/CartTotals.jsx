const CartTotals = () => {
    return (
      <div className="cart-totals">
        <h2>Cart totals</h2>
        <table>
          <tbody>
            <tr className="cart-subtotal">
              <th>Subtotal</th>
              <td>
                <span id="subtotal">$316.00</span>
              </td>
            </tr>
            <tr>
              <th>Shipping</th>
              <td>
                <ul>
                  <li>
                    <label>
                      $15.00
                    </label>
                  </li>     
                </ul>
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <strong id="cart-total">$316.00</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="checkout">
          <button className="btn btn-lg">Proceed to checkout</button>
        </div>
      </div>
    );
  };
  
  export default CartTotals;