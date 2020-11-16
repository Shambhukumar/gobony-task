import React, { useEffect, useState } from "react";
import axios from "axios";
import "../scss/Main.scss";
import Cart from "./Cart";
import firebase from "../services/firebase";

const Main = ({ handleLogout, user }) => {
  const [data, setData] = useState();
  const [cart, setCart] = useState([]);
  const [cartView, setCartView] = useState(true);
  useEffect(() => {
    getdata();
    getCart();
  }, []);

  //getting the data from firebase using axios
  const getdata = async () => {
    const data = await axios.get(
      "https://gobony-task.firebaseio.com/Products.json"
    );
    setData(data.data);
  };

  //removing the item from cart using its id 
  const cartItemRemove = (id) => {
    // console.log("this is is" + id);
    const data = firebase.database().ref("cart/" + user.uid);
    data.child(id).remove();
    getCart();
  };


  //geting the cart when app is loaded or when the cart is changed by the user
  const getCart = async (product) => {
    const data = firebase.database().ref("cart/" + user.uid);
    const fetchcart = [];
    data.on(
      "value",
      function (snapshot) {
        // console.log(snapshot.val());
        for (let key in snapshot.val()) {
          fetchcart.push({
            id: key,
            ...snapshot.val()[key],
          });
        }
        setCart(fetchcart);
      },
      function (error) {
        console.log("Error: " + error.code);
      }
    );

    // cart && console.log(fetchcart);
  };

  //storing the cart item for the user using user id
  const setcart = async (product) => {
    const data = firebase.database().ref("cart");
    data.child(user.uid).push(product);
    getCart();
  };

  return (
    <section className="section-main">
      <div className="section-main--header">
        <h1>ShoeMaster</h1>
        <div className="section-main--header-handle">
        <span onClick={() => setCartView(true)}>Products</span>
        <span onClick={() => setCartView(false)}>
            Cart ( {cart ? cart.length: "Empty"} )
          </span>
        <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
      {cartView ? (
        <div >
          <span className="heading">Products</span>
          <div className="section-main__product">
          {data &&
            Object.entries(data).map(([key, data], i) => (
              <ul key={i}>
                <li>
                  <img src={data.img} alt="img" />
                </li>
                <li className="section-main__product--description">{data.description}</li>
                <li className="section-main__product--price">
                ₹ {data.price}{" "}
                  <button className="section-main__product--button" onClick={() => setcart(data)}>Add To Cart</button>
                </li>
              </ul>
            ))}
            </div>
        </div>
      ) : (
        <Cart products={cart} removeItem={cartItemRemove} />
      )}
      <section className="footer">
        <h2>This is the footer</h2>
      </section>
    </section>
  );
};

export default Main;
