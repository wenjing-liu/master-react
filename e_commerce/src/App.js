import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}></Route>
          <Route path="/cart" element={<Cart cart={cart}/>}>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App