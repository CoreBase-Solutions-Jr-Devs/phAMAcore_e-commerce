/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signOutMutationFn } from "@/lib/api";
import { useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import SectionMyAccount from "./sections/SectionMyAccount";
import SectionOrders from "./sections/SectionOrders";
import SectionWishlist from "./sections/SectionWishlist";
import SectionAddressBook from "./sections/SectionAddressBook";
import SectionAccountManagement from "./sections/SectionAccountManagement";
import { useUser } from "./hooks/useUser";
import { st } from "./constants/styles";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { logout } from "@/features/authSlice";
import SectionOrderDetails from "./sections/SectionOrderDetails";

const SECTION_MAP = {
    account: SectionMyAccount,
    orders: SectionOrders,
    wishlist: SectionWishlist,
    orderdetails: SectionOrderDetails,
    addresses: SectionAddressBook,
    management: SectionAccountManagement,
};

const MyProfile = () => {
    const [active, setActive] = useState("account");
    const user = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
const [selectedOrderId, setSelectedOrderId] = useState(null);


    const signOutMutation = useMutation({
        mutationFn: signOutMutationFn,

        onSuccess: (data) => {
            if (data?.isSuccess) {
                dispatch(logout());

                toast({
                    title: "Signed Out",
                    description: "You have been logged out successfully.",
                    variant: "success",
                });

                setTimeout(() => {
                    navigate("/account");
                }, 2000);
            } else {
                toast({
                    title: "Sign Out Failed",
                    description: "Unable to log you out. Please try again.",
                    variant: "destructive",
                    className: "text-white [&_*]:text-white",
                });
            }
        },

        onError: (error) => {
            dispatch(logout());
            const message = error?.response?.data?.message;

            toast({
                title: "Sign Out Failed",
                description: message || "Something went wrong during logout.",
                variant: "destructive",
                className: "text-white [&_*]:text-white",
            });
        },
    });

    if (!user) {
        navigate("/account");
        return null;
    }

    const ActiveSection = SECTION_MAP[active];

    return (
        <section className="py-60">
            <div className="container container-lg">
                <div className="row g-4">
                    <div className="col-lg-3">
                        <Sidebar
                            active={active}
                            setActive={setActive}
                            user={user}
                            onSignOut={() => signOutMutation.mutate()}
                            loading={signOutMutation.isPending}
                        />
                    </div>

       <div className="col-lg-9">
  <div style={st.card}>
    <ActiveSection
      user={user}
      orderId={selectedOrderId}   // pass selected order
      onSelectOrder={(orderId) => {
        setSelectedOrderId(orderId);
        setActive("orderdetails");
      }}
      onBack={() => setActive("orders")} // back button
    />
  </div>
</div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;