import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainRoute from './routes/MainRoute.jsx';
import Nav from './components/Nav.jsx';
import { asyncCurrentUser } from './services/userService.jsx';
import { asyncLoadProducts } from './services/productService.jsx';

const App = () => {
  const user = useSelector((state) => state.userReducer.data);
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || (Array.isArray(user) && user.length === 0)) {
      dispatch(asyncCurrentUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(asyncLoadProducts());
    }
  }, [dispatch, products]);

  return (
    <div>
      <Nav />
      <MainRoute />
    </div>
  );
};

export default App;
