import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { fetchProductById } from '../../slice/productSlice';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  console.log(typeof productId);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
  }, [productId, dispatch]);

  return <div>ProductDetailPage</div>;
};

export default ProductDetailPage;
