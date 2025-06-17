import styles from './CategoryDropDown.module.css';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../slice/filterSlice';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
const CategoryDropDown = () => {
 
  const category = useAppSelector((state: RootState) => state.filter.category);
  
  const dispatch = useDispatch();
  return (
    <div>
      <select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      >
        <option value="all">Filter By Category</option>
        <option value="tops">Tops</option>
        <option value="dresses">Dresses</option>
        <option value="jackets">Jackets</option>
        <option value="bottoms">Bottoms</option>
      </select>
    </div>
  );
};

export default CategoryDropDown;
