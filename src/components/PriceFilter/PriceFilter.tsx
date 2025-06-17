// import styles from './PriceFilter.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import { setSelectedPrice } from '../../slice/filterSlice';

const PriceFilter = () => {
  const { maxPrice, selectedPrice } = useAppSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useAppDispatch();

  if (maxPrice === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>Price</p>
      <p>$0 {selectedPrice > 0 && `- ${selectedPrice}`}</p>
      <input
        type="range"
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => dispatch(setSelectedPrice(Number(e.target.value)))}
      />
    </>
  );
};

export default PriceFilter;
