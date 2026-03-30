import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/authSlice";

export const useUser = () => {
    const user = useSelector(selectCurrentUser);

    if (!user) return null;

    const displayName = user.userName
        ? user.userName.charAt(0).toUpperCase() + user.userName.slice(1)
        : "User";

    const initials = displayName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");

    return {
        id: user.id,
        userName: user.userName,
        name: displayName,
        email: user.email,
        phone: user.phoneNumber,
        initials: initials || "U",
        roles: user.roles || [],
    };
};