import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUpMutationFn } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/images/logo/phamacart.png";

const RegisterModal = ({ show, onClose, onOpenLogin }) => {
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const phoneRegex = /^(?:\+254|254|0)?(7\d{8}|1\d{8})$/;
  const isPhoneValid = phoneRegex.test(phone);

  const registerMutation = useMutation({
    mutationFn: signUpMutationFn,
    onSuccess: () => {
      toast({
        title: "Registration Successful ✅",
        description: "Check your email to verify your account",
        variant: "success",
      });

      onClose();
      onOpenLogin(); // go back to login after register
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description:
          error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPhoneValid) {
      toast({
        title: "Invalid Phone Number",
        variant: "destructive",
      });
      return;
    }

    registerMutation.mutate({
      user: { username, email, phone, password },
    });
  };

  return (
    <Modal show={show} onHide={onClose} centered size="md">
      {/* <Modal.Header closeButton className="border-0" /> */}

      <Modal.Body className="text-center py-8 pt-20">
         <div className="mb-3">
                    <img src={logo} alt="Logo" height="50"         className="d-block mx-auto"
                    
 />
  <button
      onClick={onClose}
      className="btn-close position-absolute top-0 end-0 m-3"
    />
         </div>
        <h5 className="mb-4">Create Account</h5>

        <form onSubmit={handleSubmit}>
            
    <div className="mb-3 text-start">
      <label className="form-label">Username / Email</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
</div>

          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
</div>

          <div className="mb-3 text-start">
            <label className="form-label">Phone</label>

          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
</div>
          <div className="position-relative mb-6 text-start">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              <i className={showPassword ? "ph ph-eye-slash" : "ph ph-eye"} />
            </span>
          </div>

          <button
            type="submit"
            className="btn btn-main w-100"
            disabled={registerMutation.isPending}
          >
  {registerMutation.isPending ? (
    <>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Registering...
    </>
  ) : (
    "Register"
  )}          </button>
        </form>

<p
  className="text-main text-start mt-3 mb-0 text-sm"
  style={{ cursor: "pointer" }}
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
        >
          Already have an account? Login
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;