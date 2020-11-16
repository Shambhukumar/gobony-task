import React from "react";

const Cart = (props) => {
  return (
    <div className="section-main__product">
      
      {!props.products.length >= 1 ? (
        <h1 className="section-main__product--empty">This Cart Is Empty</h1>
      ): <span className="heading"> Your Cart</span>}
      {props.products.map((e, el) => {
        return (
          <ul>
            <li>
              <img src={e.img} alt="IMG" />
            </li>
            <li className="section-main__product--description">
              {e.description}
            </li>
            <li className="section-main__product--price">
            ₹ {e.price}{" "}
              <button
                className="section-main__product--button"
                onClick={() => props.removeItem(e.id)}
              >
                Remove From Cart
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Cart;
