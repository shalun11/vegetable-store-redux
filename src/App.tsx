import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { Loader } from './components/Loader/Loader';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchProducts } from './store/productsSlice';
import { addToCart, removeFromCart, updateCartQuantity } from './store/cartSlice';
import { setQuantity, resetQuantity } from './store/quantitiesSlice';
import {
  selectProducts,
  selectProductsLoading,
  selectCartItems,
  selectCartItemsCount,
  selectQuantities,
} from './store/selectors';

function App() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const cartItems = useAppSelector(selectCartItems);
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const quantities = useAppSelector(selectQuantities);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    dispatch(setQuantity({ productId, quantity }));
  };

  const handleAddToCart = (product: any, quantity: number) => {
    if (quantity === 0) return;

    dispatch(addToCart({ product, quantity }));
    dispatch(resetQuantity(product.id));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleCartQuantityChange = (productId: number, quantity: number) => {
    dispatch(updateCartQuantity({ productId, quantity }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header
          cartItemsCount={cartItemsCount}
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onQuantityChange={handleCartQuantityChange}
        />
      </div>

      <ProductList
        products={products}
        quantities={quantities}
        onAddToCart={handleAddToCart}
        onQuantityChange={handleQuantityChange}
      />
    </>
  );
}

export default App;