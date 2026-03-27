// LoginModal.jsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signInMutationFn } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/authSlice";

const Login = ({ show, onClose, onSuccessRedirect }) => {
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
        dispatch(setCredentials(data));
        toast({ title: "Login Successful", variant: "success" });
        onClose(); // close the modal
        if (onSuccessRedirect) onSuccessRedirect(); // optional redirect
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

  if (!show) return null; // only render if modal is visible

  return (
<div
  className="modal fade show d-block"
  tabIndex="-1"
  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  aria-modal="true"
>
  <div className="modal-dialog modal-dialog-centered max-w-md" >
    <div className="modal-content p-4">
      <form onSubmit={handleLoginSubmit}>
        {/* Centered Title */}
       <div className="modal-header border-0 pb-0 flex-column text-center">
  <h5 className="modal-title w-100">Welcome Back!</h5>
  <h6 className="modal-title w-100 text-muted">Sign in to continue</h6>
  <button
    type="button"
    className="btn-close position-absolute end-0 top-0"
    onClick={onClose}
  ></button>
</div>

        <div className="modal-body pt-0">
          <div className="mb-3">
            <label className="form-label">Username / Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                cursor: "pointer",
                transform: "translateY(-50%)",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="modal-footer border-0 pt-0">
          <button
            type="submit"
            className="btn btn-main w-100"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default Login;