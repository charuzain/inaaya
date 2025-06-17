import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import { setSortTerm } from '../../slice/filterSlice';
import type { Order } from '../../slice/filterSlice';
import styles from './SortFilter.module.css';
const SortFilter = () => {
  const dispatch = useAppDispatch();

  const val = useAppSelector((state: RootState) => state.filter.sort)
  console.log(val)

  const sortChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split('-');
    console.log(e.target.value)
    console.log(order)
    console.log(sortBy)
    if (order === 'asc' || order === 'desc') {
      dispatch(setSortTerm({ sortBy, order: order }));
    }
  };
  return (
    <div>
      <label htmlFor="sort">SortBy</label>
      <select
        
        name="sort"
        id="sort"
        onChange={sortChangeHandler}
        value={`${val.sortBy}-${val.order}`}
      >
        <option value="price-desc">Price(High to Low)</option>
        <option value="price-asc">Price(Low to High)</option>
        <option value="name-asc">Name(A-Z)</option>
        <option value="name-desc">Name(Z-A)</option>
      </select>
    </div>
  );
};

export default SortFilter;
