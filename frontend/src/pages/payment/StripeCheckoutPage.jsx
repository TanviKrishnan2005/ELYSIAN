import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const StripeCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalAmount } = location.state || {};
  const [createOrder] = useCreateOrderMutation();

  if (!items || !totalAmount) {
    navigate("/");
    return null;
  }

  const handleSuccess = async () => {
    try {
      await createOrder({
        items,
        totalAmount,
      }).unwrap();

      dispatch(clearCart());
      toast.success("Order placed successfully 🎉");
      navigate("/dashboard/user/orders");
    } catch (err) {
      toast.error("Order creation failed ❌");
    }
  };

  return <Checkout onSuccess={handleSuccess} />;
};

export default StripeCheckoutPage;
