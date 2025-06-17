import styles from './SearchBar.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSearchTerm } from '../../slice/filterSlice';
const SearchBar = () => {

  const { searchTerm } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();
  return (
      <div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search product by name"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
  );
};

export default SearchBar;
