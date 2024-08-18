import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../Context/CarContext.jsx';

export async function productDeatils(id) {
  try {
    let response = await axios.get(`http://localhost:3000/product/${id}`);
    let products = Array.isArray(response.data) ? response.data : [response.data];
    return products;
  } catch (err) {
    console.error(err);
  }
}

export default function ProductDeatail() {
  let { id } = useParams();
  let navigate = useNavigate();

  let { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  let [productd, setProductsd] = useState([]);

  async function getdetails() {
    try {
      let data = await productDeatils(id);
      setProductsd(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getdetails();
  }, []);

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <div className="container my-5">
      <div className="row d-flex">
        {productd ? productd.map((product) => (
          <div className="col-md-4 my-2 bg-transparent" key={product.id}>
            <div className="img">
              <img src={product.image} className="w-100" alt={product.name} />
            </div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button className='btn' 
                    onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}>
              {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
            </button>
            {isInCart(product.id) && (
              <button className='btn btn-link view' onClick={() => navigate('/cart')}>View Cart</button>
            )}
          </div>
        )) : 'No Products'}
      </div>
    </div>
  );
}