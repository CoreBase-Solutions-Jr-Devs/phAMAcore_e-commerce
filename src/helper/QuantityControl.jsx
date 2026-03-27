import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  increaseQty,
  removeItemFromCart,
} from "../features/cartSlice";
import { selectIsAuthenticated, selectCustomerId } from "../features/authSlice";
import { toast } from "../hooks/use-toast";
import { UpdateItemQuantityMutationFn } from "../lib/api";

const QuantityControl = ({ currentItem = {} }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const customerId = useSelector(selectCustomerId);

  // Local quantity state for instant UI updates
  const [quantity, setQuantity] = useState(currentItem.quantity ?? 1);

  useEffect(() => {
  setQuantity(currentItem.quantity);
}, [currentItem.quantity]);
  // React Query client to refetch basket
  const queryClient = useQueryClient();

  // Mutation for server update
const { mutate: updateServerQuantity, isLoading } = useMutation({
  mutationFn: (data) => UpdateItemQuantityMutationFn(data),
  onSuccess: () => {
    toast({
      title: "Quantity Updated ✅",
      description: `${currentItem.name} quantity updated in your cart.`,
      variant: "success",
    });

    queryClient.invalidateQueries(["cart", customerId]); // ✅ FIXED
  },
  onError: (err) => {
    toast({
      title: "Failed to Update",
      description: err?.message || "Unable to update quantity.",
      variant: "destructive",
    });

    setQuantity(currentItem.quantity);
  },
});

 const incrementQuantity = () => {
  const newQty = quantity + 1;
  setQuantity(newQty);

  if (isAuthenticated) {
    updateServerQuantity({
      productId: currentItem.productId, // ✅ FIXED
      quantity: newQty,
    });
  } else {
    dispatch(increaseQty(currentItem.id));
  }
};

const decrementQuantity = () => {
  const newQty = quantity - 1;

  if (newQty < 1) {
    if (isAuthenticated) {
      updateServerQuantity({
        productId: currentItem.productId, // ✅ FIXED
        quantity: 0,
      });
    } else {
      dispatch(removeItemFromCart(currentItem.id));
    }
    return;
  }

  setQuantity(newQty);

  if (isAuthenticated) {
    updateServerQuantity({
      productId: currentItem.productId, // ✅ FIXED
      quantity: newQty,
    });
  } else {
    dispatch(increaseQty(currentItem.id)); // ⚠️ FIXED (was wrong before)
  }
};

  return (
    <div className="d-flex rounded-2 overflow-hidden">
      <button
        type="button"
        onClick={decrementQuantity}
        className="quantity__minus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
        disabled={isLoading}
      >
        {quantity === 1 ? <i className="ph ph-trash" /> : <i className="ph ph-minus" />}
      </button>

      <input
        type="number"
        className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-8"
        value={quantity}
        min={1}
        readOnly
      />

      <button
        type="button"
        onClick={incrementQuantity}
        className="quantity__plus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
        disabled={isLoading}
      >
        <i className="ph ph-plus" />
      </button>
    </div>
  );
};

export default QuantityControl;