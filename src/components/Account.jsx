import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { signInMutationFn, signUpMutationFn } from '@/lib/api';

const Account = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showRegisterPasswordHints, setShowRegisterPasswordHints] = useState(false);
    const [showPasswordHints, setShowPasswordHints] = useState(false);
    const passwordChecks = {
        length: registerPassword.length >= 6,
        uppercase: /[A-Z]/.test(registerPassword),
        lowercase: /[a-z]/.test(registerPassword),
        digit: /[0-9]/.test(registerPassword),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(registerPassword),
    };
    const phoneRegex = /^(?:\+254|254|0)?(7\d{8}|1\d{8})$/;
    const isPhoneValid = phoneRegex.test(phone);

    const loginMutation = useMutation({
        mutationFn: signInMutationFn,
        onSuccess: (data) => {
            if (data.isSuccess) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                toast({
                    title: "Login Successful",
                    description: "Redirecting to your profile...",
                    variant: "success",
                });

                setTimeout(() => {
                    navigate("/profile");
                }, 3000);

            } else {
                toast({
                    title: "Login Failed",
                    description: "Check your credentials and try again.",
                    variant: "destructive",
                    className: "text-white [&_*]:text-white",
                });
            }
        },
        onError: (error) => {
            const message = error?.response?.data?.message;

            toast({
                title: "Login Failed",
                description:
                    message === "Email not confirmed"
                        ? "Please verify your email before logging in."
                        : message || "An unexpected error occurred.",
                variant: "destructive",
                className: "text-white [&_*]:text-white",
            });
        },
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate({
            user: { identifier, password: loginPassword },
        });
    };

    const registerMutation = useMutation({
        mutationFn: signUpMutationFn,
        onSuccess: () => {
            toast({
                title: "Registration Successful",
                description:
                    "Check your email to verify your account before logging in.",
                variant: "success",
            });

            setUsername("");
            setEmail("");
            setPhone("");
            setRegisterPassword("");
        },
        onError: (error) => {
            toast({
                title: "Registration Failed",
                description:
                    error?.response?.data?.message || "Something went wrong.",
                variant: "destructive",
                className: "text-white [&_*]:text-white",
            });
        },
    });

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (!isPhoneValid) {
            toast({
                title: "Invalid Phone Number",
                description: "Please enter a valid phone number.",
                variant: "destructive",
                className: "text-white [&_*]:text-white",
            });
            return;
        }

        if (!Object.values(passwordChecks).every(Boolean)) {
            toast({
                title: "Weak Password",
                description: "Please meet all password requirements.",
                variant: "destructive",
                className: "text-white [&_*]:text-white",
            });
            return;
        }

        registerMutation.mutate({
            user: {
                username,
                email,
                phone,
                password: registerPassword,
            },
        });
    };

    return (
        <section className="account py-80">
            <div className="container container-lg">
                <div className="row gy-4">

                    <div className="col-xl-6 pe-xl-5">
                        <form onSubmit={handleLoginSubmit}>
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                                <h6 className="text-xl mb-32">Login</h6>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Username / Email Address <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        placeholder="Username or Email"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Password
                                    </label>

                                    <div className="position-relative">
                                        <input
                                            type={showLoginPassword ? "text" : "password"}
                                            className="common-input pe-48"
                                            placeholder="Enter Password"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            onFocus={() => setShowPasswordHints(true)}
                                            onBlur={() => setShowPasswordHints(false)}
                                        />

                                        {/* Visibility Toggle */}
                                        <span
                                            onClick={() => setShowLoginPassword((prev) => !prev)}
                                            className="position-absolute top-50 inset-e-0 translate-middle-y me-16 text-xl"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <i className={showLoginPassword ? "ph ph-eye-slash" : "ph ph-eye"} />
                                        </span>
                                    </div>

                                    {showPasswordHints && (
                                        <div className="mt-12 p-16 border rounded-8 bg-light">
                                            <h6 className="mb-8">Password Requirements</h6>
                                            <ul className="text-sm mb-0">
                                                <li className={passwordChecks.length ? "text-success" : "text-muted"}>
                                                    At least 6 characters
                                                </li>
                                                <li className={passwordChecks.uppercase ? "text-success" : "text-muted"}>
                                                    At least one uppercase letter (A–Z)
                                                </li>
                                                <li className={passwordChecks.lowercase ? "text-success" : "text-muted"}>
                                                    At least one lowercase letter (a–z)
                                                </li>
                                                <li className={passwordChecks.digit ? "text-success" : "text-muted"}>
                                                    At least one number (0–9)
                                                </li>
                                                <li className={passwordChecks.special ? "text-success" : "text-muted"}>
                                                    At least one special character (!@#$...)
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-24 mt-48">
                                    <button
                                        type="submit"
                                        className="btn btn-main py-18 px-40"
                                        disabled={loginMutation.isPending}
                                    >
                                        {loginMutation.isPending ? "Logging in..." : "Log in"}
                                    </button>
                                </div>

                                <div className="mt-24">
                                    <Link
                                        to="#"
                                        className="text-danger-600 text-sm fw-semibold"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-xl-6">
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                                <h6 className="text-xl mb-32">Register</h6>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Username <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        placeholder="Write a username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Email address <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="common-input"
                                        placeholder="Enter Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Phone Number <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        className="common-input"
                                        placeholder="e.g. 0712345678 or +254712345678"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    {!isPhoneValid && phone.length > 0 && (
                                        <small className="text-danger">
                                            Enter a valid phone number (e.g. 0712345678 or +254712345678)
                                        </small>
                                    )}
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Password <span className="text-danger">*</span>
                                    </label>

                                    <div className="position-relative">
                                        <input
                                            type={showRegisterPassword ? "text" : "password"}
                                            className="common-input pe-48"
                                            placeholder="Enter Password"
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                            onFocus={() => setShowRegisterPasswordHints(true)}
                                            onBlur={() => setShowRegisterPasswordHints(false)}
                                        />

                                        {/* Visibility Toggle */}
                                        <span
                                            onClick={() => setShowRegisterPassword((prev) => !prev)}
                                            className="position-absolute top-50 inset-e-0 translate-middle-y me-16 cursor-pointer text-xl"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <i className={showRegisterPassword ? "ph ph-eye-slash" : "ph ph-eye"} />
                                        </span>
                                    </div>

                                    {/* Password Requirements */}
                                    {showRegisterPasswordHints && (
                                        <div className="mt-12 p-16 border rounded-8 bg-light">
                                            <h6 className="mb-8">Password Requirements</h6>
                                            <ul className="text-sm mb-0">
                                                <li className={passwordChecks.length ? "text-success" : "text-muted"}>
                                                    At least 6 characters
                                                </li>
                                                <li className={passwordChecks.uppercase ? "text-success" : "text-muted"}>
                                                    At least one uppercase letter (A–Z)
                                                </li>
                                                <li className={passwordChecks.lowercase ? "text-success" : "text-muted"}>
                                                    At least one lowercase letter (a–z)
                                                </li>
                                                <li className={passwordChecks.digit ? "text-success" : "text-muted"}>
                                                    At least one number (0–9)
                                                </li>
                                                <li className={passwordChecks.special ? "text-success" : "text-muted"}>
                                                    At least one special character (!@#$...)
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-48">
                                    <button
                                        type="submit"
                                        className="btn btn-main py-18 px-40"
                                        disabled={registerMutation.isPending}
                                    >
                                        {registerMutation.isPending
                                            ? "Registering..."
                                            : "Register"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Account;