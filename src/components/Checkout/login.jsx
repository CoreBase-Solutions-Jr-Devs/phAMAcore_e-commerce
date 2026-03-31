import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signInMutationFn } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/authSlice";
import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo/phamacart.png";
const LoginModal = ({ show, onClose, onSuccessRedirect, onOpenRegister }) => {
    const { toast } = useToast();
  const dispatch = useDispatch();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: signInMutationFn,
 onSuccess: (data) => {
  if (data.isSuccess) {
 
   localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
    // Dispatch with correct shape
                  dispatch(setCredentials(data));
  
      
        toast({ title: "Login Successful", variant: "success" });
        onClose();
        if (onSuccessRedirect) onSuccessRedirect();
      } else {
        toast({ title: "Login Failed", variant: "destructive" });
      }
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error?.response?.data?.message || "Unexpected error",
        variant: "destructive",
      });
    },
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ user: { identifier, password } });
  };

  return (
   <Modal
  show={show}
  onHide={onClose}
  centered
  size="md" // smaller width
  dialogClassName="custom-login-modal"
>
  <Modal.Header closeButton className="border-0"></Modal.Header>

  <Modal.Body className="text-center">
    {/* Centered logo */}
    <div className="mb-3">
      <img
        src={logo}
        alt="Logo"
        height="50"
        className="d-block mx-auto"
      />
    </div>

    {/* Title below the image */}
    <h5 className="mb-4">Welcome Back!</h5>

    <div className="mb-3 text-start">
      <label className="form-label">Username / Email</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter username or email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
      />
    </div>

    <div className="mb-3 position-relative text-start">
      <label className="form-label">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <span
        // style={{
        //   position: "absolute",
        //   top: "50%",
        //   right: "10px",
        //   cursor: "pointer",
        //   transform: "translateY(-50%)",
        // }}
          className="position-absolute top-50 end-0 translate-middle-y me-3"
        onClick={() => setShowPassword(!showPassword)}
      >
         <i className={showPassword ? "ph ph-eye-slash" : "ph ph-eye"} />
      </span>
    </div>

    <button
      type="button"
      className="btn btn-main w-100 mt-8"
      onClick={handleLoginSubmit}
      disabled={loginMutation.isPending}
    >
{loginMutation.isPending ? (
    <>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Logging in...
    </>
  ) : (
    "Login"
  )}    </button>
<p
  className="text-main text-start mt-3 mb-0 text-sm"
  style={{ cursor: "pointer" }}
  onClick={() => {
    onClose();
    onOpenRegister();
  }}
>
  Don’t have an account? Sign Up
</p>
  </Modal.Body>
</Modal>
  );
};

export default LoginModal;