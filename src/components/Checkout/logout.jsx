import React from "react";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "@tanstack/react-query";
import { signOutMutationFn } from "@/lib/api";
import { useDispatch } from "react-redux";
import { logout } from "@/features/authSlice";
import { clearCart } from "@/features/cartSlice";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutMutation = useMutation({
    mutationFn: signOutMutationFn,
    onSuccess: () => {
      dispatch(logout());
      dispatch(clearCart());
      onClose();
      navigate("/shop");
    },
    onError: () => {
      dispatch(logout());
      dispatch(clearCart());
      onClose();
      navigate("/account");
    },
  });

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
 <Modal show={show} onHide={onClose} centered size="md">
  <Modal.Body className="text-center position-relative py-20 pt-20">
    
    {/* Custom close button */}
    <button
      onClick={onClose}
      className="btn-close position-absolute top-0 end-0 m-3"
    />

    <h6 className="mb-3">Logout Account?</h6>

    <p className="text-muted mb-4">
      Are you sure you want to log out of your account?
    </p>

    <div className="d-flex gap-3 justify-content-center">
      <button
        type="button"
        className="btn btn-danger px-4 w-full"
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        type="button"
        className="btn btn-main px-4 w-full"
        onClick={handleLogout}
        disabled={signOutMutation.isPending}
      >
        {signOutMutation.isPending ? (
    <>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Logging out...
    </>
  ) : (
    "Logout"
  )}
      </button>
    </div>

  </Modal.Body>
</Modal>
  );
};

export default LogoutModal;