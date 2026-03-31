/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionTitle from "../components/SectionTitle";
import { getPersonalFields, getAddressFields, getPasswordFields } from "../constants/profileData";
import { ORANGE, st } from "../constants/styles";
import FormInput from "../components/FormInput";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { updateCurrentUserMutationFn } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";

const PERSONAL_EDITABLE = ["phoneNumber", "dateOfBirth"];

const SectionAccountManagement = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const TABS = [["personal", "Personal Details"], ["password", "Change Password"]];
    const { user: USER, isLoading, isError } = useCurrentUser();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const personalRefs = {
        phoneNumber: useRef(null),
        dateOfBirth: useRef(null),
    };

    const addressRefs = {
        addressLine1: useRef(null),
        addressLine2: useRef(null),
        landmark: useRef(null),
        city: useRef(null),
        county: useRef(null),
        postalCode: useRef(null),
        country: useRef(null),
    };

    const passwordRefs = {
        currentPassword: useRef(null),
        newPassword: useRef(null),
        confirmPassword: useRef(null),
    };

    const updateMutation = useMutation({
        mutationFn: updateCurrentUserMutationFn,
        onSuccess: (data) => {
            if (data?.isSuccess !== false) {
                toast({
                    title: "Profile Updated!",
                    description: "Your details have been saved successfully.",
                    variant: "success",
                });
            } else {
                toast({
                    title: "Update Failed",
                    description: data?.message || "Unable to save changes.",
                    variant: "destructive",
                    className: "text-white [&_*]:text-white",
                });
            }
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            toast({
                title: "Update Failed",
                description: message || "Something went wrong.",
                variant: "destructive",
                className: "text-white [&_*]:text-white",
            });
        },
    });

    const handleSave = () => {
        console.log("Saving with values:", {
            phoneNumber: personalRefs.phoneNumber.current?.value,
            dateOfBirth: personalRefs.dateOfBirth.current?.value,
            address: {
                addressLine1: addressRefs.addressLine1.current?.value,
                addressLine2: addressRefs.addressLine2.current?.value,
                landmark: addressRefs.landmark.current?.value,
                city: addressRefs.city.current?.value,
                county: addressRefs.county.current?.value,
                postalCode: addressRefs.postalCode.current?.value,
                country: addressRefs.country.current?.value,
            },
        })

        updateMutation.mutate({
            user: {
                phoneNumber: personalRefs.phoneNumber.current?.value,
                dateOfBirth: personalRefs.dateOfBirth.current?.value || null,
                address: {
                    addressLine1: addressRefs.addressLine1.current?.value || null,
                    addressLine2: addressRefs.addressLine2.current?.value || null,
                    landmark: addressRefs.landmark.current?.value || null,
                    city: addressRefs.city.current?.value || null,
                    county: addressRefs.county.current?.value || null,
                    postalCode: addressRefs.postalCode.current?.value || null,
                    country: addressRefs.country.current?.value || null,
                },
            },
        });
    };

    const handlePasswordSave = () => {
        const currentPassword = passwordRefs.currentPassword.current?.value;
        const newPassword = passwordRefs.newPassword.current?.value;
        const confirmPassword = passwordRefs.confirmPassword.current?.value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast({ title: "All password fields are required.", variant: "destructive", className: "text-white [&_*]:text-white" });
            return;
        }
        if (newPassword !== confirmPassword) {
            toast({ title: "Passwords don't match", description: "New password and confirmation must match.", variant: "destructive", className: "text-white [&_*]:text-white" });
            return;
        }

        updateMutation.mutate({
            user: { currentPassword, newPassword },
        });
    };

    if (isLoading) return <p style={{ padding: 16 }}>Loading...</p>;
    if (isError || !USER) {
        return (
            <EmptyState
                emoji="⚠️"
                message="Please login. Your session may have expired."
                action={
                    <Link to="/account" style={{ ...st.btnGreen, textDecoration: "none", display: "inline-block", marginTop: 12, padding: "10px 24px" }}>
                        Login
                    </Link>
                }
            />
        );
    }

    return (
        <div>
            <SectionTitle title="Account Management" subtitle="Update your personal details and security settings" />

            <div className="d-flex gap-3 mb-28 border-bottom pb-2">
                {TABS.map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        style={{ background: "none", border: "none", borderBottom: activeTab === key ? `2.5px solid ${ORANGE}` : "2.5px solid transparent", color: activeTab === key ? ORANGE : "#666", fontWeight: activeTab === key ? 700 : 500, fontSize: 14, padding: "6px 4px 10px", cursor: "pointer", marginBottom: -2 }}
                    >{label}</button>
                ))}
            </div>

            {activeTab === "personal" && (
                <ScrollArea style={{ height: 420 }}>

                    <div className="row g-3" style={{ paddingRight: 12 }}>
                        {getPersonalFields(USER).map(f => (
                            <FormInput
                                key={f.label}
                                label={f.label}
                                type={f.type}
                                defaultValue={f.value}
                                options={f.options}
                                readOnly={f.readOnly}
                                inputRef={PERSONAL_EDITABLE.includes(f.key) ? personalRefs[f.key] : undefined}
                            />
                        ))}
                    </div>

                    <div style={{ margin: "24px 0 12px", fontWeight: 600, fontSize: 14, color: "#333", paddingRight: 12 }}>
                        Address
                    </div>

                    <div className="row g-3" style={{ paddingRight: 12 }}>
                        {getAddressFields(USER).map(f => (
                            <FormInput
                                key={f.label}
                                label={f.label}
                                defaultValue={f.value}
                                inputRef={addressRefs[f.key]}
                            />
                        ))}
                    </div>

                    <div className="col-12 mt-3 mb-2" style={{ paddingRight: 12 }}>
                        <button
                            style={st.btnGreen}
                            onClick={handleSave}
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </ScrollArea>
            )}

            {activeTab === "password" && (
                <div className="row g-3" style={{ paddingRight: 12 }}>
                    {getPasswordFields().map(f => (
                        <FormInput
                            key={f.key}
                            label={f.label}
                            type={f.type}
                            inputRef={passwordRefs[f.key]}
                        />
                    ))}
                    <div className="col-12 mt-3 mb-2">
                        <button
                            style={st.btnGreen}
                            onClick={handlePasswordSave}
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? "Saving..." : "Update Password"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SectionAccountManagement;