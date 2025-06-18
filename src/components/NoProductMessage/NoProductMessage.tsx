import { useAppDispatch } from "../../app/hooks";
import { resetFilter } from '../../slice/filterSlice';


const NoProductMessage = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <p>No products match your current filters</p>
      <p>
        Try adjusting your price range, category, or search term to find what
        you're looking for.
      </p>
      <button onClick={() => dispatch(resetFilter())}>Reset Filter</button>
    </>
  );
};

export default NoProductMessage;
