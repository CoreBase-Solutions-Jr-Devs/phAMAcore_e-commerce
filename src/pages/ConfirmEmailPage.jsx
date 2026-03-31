/* eslint-disable no-unused-vars */
import { confirmEmailQueryFn } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const ConfirmEmailPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["confirm-email", userId, token],
        queryFn: () => confirmEmailQueryFn({ userId, token }),
        enabled: !!userId && !!token,
    });

    const isSuccess = data?.isSuccess;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        if(isSuccess && !loading) {
            setTimeout(() => {
                navigate("/account");
            }, 2500);
        }
    }, [isSuccess, navigate, loading]);


    return (
        <section>
            <div className="container container-lg my-30">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-6 col-md-8">
                        <div className="border border-gray-100 rounded-16 px-24 py-40 text-center">
                            {/* Loading State */}
                            {(isLoading || loading) && (
                                <>
                                    <div className="mb-24 flex flex-col items-center gap-16">
                                        <div className="relative">
                                            <i className="ph ph-envelope-simple text-5xl text-main-600"></i>

                                            <span className="absolute inset-0 rounded-full animate-ping bg-main-200 opacity-40"></span>
                                        </div>

                                        <h6 className="text-xl">Confirming your email...</h6>
                                        <p className="text-gray-500">
                                            Securing your account, please wait.
                                        </p>
                                    </div>
                                </>
                            )}
                            {/* Success State */}
                            {!isLoading && !loading && isSuccess && (
                                <>
                                    <div className="mb-24">
                                        <i className="ph ph-check-circle text-success text-4xl"></i>
                                    </div>
                                    <h6 className="text-xl mb-12">Email Confirmed</h6>
                                    <p className="text-gray-500 mb-24">
                                        Your email has been successfully verified. You can now log in.
                                    </p>

                                    <button
                                        onClick={() => navigate("/account")}
                                        className='btn btn-success py-18 px-40'
                                    >
                                        Back to Login
                                    </button>
                                </>
                            )}
                            {/* Error State */}
                            {!isLoading && !loading && (isError || !isSuccess) && (
                                <>
                                    <div className="mb-24">
                                        <i className="ph ph-x-circle text-danger text-4xl"></i>
                                    </div>
                                    <h6 className="text-xl mb-12">Account Verification Failed!</h6>
                                    <p6 className="text-gray-500 mb-24">
                                        Email confirmation link is invalid or expired.
                                    </p6>
                                    <div className="d-flex justify-content-center gap-12 flex-wrap mt-64">
                                        <Link
                                            to={"/account"}
                                            className='btn btn-success py-18 px-32'
                                        >
                                            Back to Login
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ConfirmEmailPage;
