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
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [showPasswordHints, setShowPasswordHints] = useState(false);
    const passwordChecks = {
        length: registerPassword.length >= 6,
        uppercase: /[A-Z]/.test(registerPassword),
        lowercase: /[a-z]/.test(registerPassword),
        digit: /[0-9]/.test(registerPassword),
    };

    const loginMutation = useMutation({
        mutationFn: signInMutationFn,
        onSuccess: (data) => {
            if (data.isSuccess) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                toast({
                    title: "Login Successful",
                    description: "Redirecting to your cart...",
                    variant: "success",
                });

                setTimeout(() => {
                    navigate("/cart");
                }, 3000);

            } else {
                toast({
                    title: "Login Failed",
                    description: "Check your credentials and try again.",
                    variant: "destructive",
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
            setRegisterPassword("");
        },
        onError: (error) => {
            toast({
                title: "Registration Failed",
                description:
                    error?.response?.data?.message || "Something went wrong.",
                variant: "destructive",
            });
        },
    });

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        registerMutation.mutate({
            user: {
                username,
                email,
                phone: "",
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
                                    <input
                                        type="password"
                                        className="common-input"
                                        placeholder="Enter Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        onFocus={() => setShowPasswordHints(true)}
                                        onBlur={() => setShowPasswordHints(false)}
                                    />
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
                                        Password <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="common-input"
                                        placeholder="Enter Password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
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