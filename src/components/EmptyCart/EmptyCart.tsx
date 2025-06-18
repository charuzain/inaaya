import { useNavigate } from "react-router";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>My Bag</h1>
      <p>
        Your bag is empty. Please fill it by selecting products and clicking on
        the button "Add to my bag".
      </p>
      <button onClick={() => navigate('/products')}>Start Shopping</button>
    </>
  );
};

export default EmptyCart;
