import { Link } from "react-router";
const OrderConfirmationPage = () => {
  return (
    <section>
      <div></div>
      <h1>Order Successfully Placed!</h1>
      <p>
        Thank you for your purchase. We're excited for you to receive your
        items!
      </p>
      <div>
        <h4>Order details</h4>
        <p>Order Number : #123AbF8</p>
        <p>Estimated Delivery: Arriving by Tuesday, June 17, 2025</p>
      </div>
      <div>
        <button>Track Your Order</button>
        <button>View Order History</button>
      </div>
      <Link to ={'/products'}>← Continue Shopping</Link>
    </section>
  );
};

export default OrderConfirmationPage;
