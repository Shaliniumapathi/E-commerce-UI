import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function CardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // prefer redux user slice, fall back to localStorage
  const reduxLoggedIn = useSelector((s) => s?.user?.isLoggedIn);
  const isLoggedIn = reduxLoggedIn ?? (localStorage.getItem("isLoggedIn") === "true");

  // prefer redux cart, fall back to localStorage
  const reduxCart = useSelector((s) => s?.cart?.items);
  const localCart = useMemo(() => JSON.parse(localStorage.getItem("cart") || "[]"), []);
  const cartItems = reduxCart ?? localCart;
  // Auth gating: redirect unauthenticated users to login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null; // prevent UI flash while redirecting

  const handleRemove = (id) => {
    // dispatch redux action if present (no-ops if reducer absent)
    dispatch({ type: "cart/removeItem", payload: id });

    // also update localStorage fallback
    const updated = (reduxCart ?? localCart).filter((it) => String(it.id) !== String(id));
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleClear = () => {
    dispatch({ type: "cart/clearCart" });
    localStorage.removeItem("cart");
  };

  const total = (cartItems || []).reduce((s, it) => s + (Number(it.price || 0) * (it.quantity || 1)), 0);

  return (
    <>
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border rounded-xl p-4">
                <div>
                  <h3 className="font-semibold">{item.title || item.name || 'Product'}</h3>
                  <p className="text-gray-500">${item.price} × {item.quantity || 1}</p>
                </div>
                <button onClick={() => handleRemove(item.id)} className="text-red-500 font-medium">Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
            <div className="flex gap-2">
              <button onClick={() => navigate('/checkout')} className="bg-indigo-600 text-white px-4 py-2 rounded">Checkout</button>
              <button onClick={handleClear} className="px-4 py-2 border rounded">Clear Cart</button>
            </div>
          </div>
        </>
      ) : (
        <div className="py-12 text-center text-gray-500">Your cart is empty</div>
      )}
    </div>
     <Footer/>
    </>
  );
}

export default CardPage;
