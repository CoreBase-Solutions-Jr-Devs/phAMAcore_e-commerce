export const ORDERS = [
    { id: "#KE-00421", item: "Wireless Headphones", emoji: "🎧", date: "12 Mar 2025", status: "Delivered", price: "KES 4,500" },
    { id: "#KE-00389", item: "Men's Running Shoes", emoji: "👟", date: "28 Feb 2025", status: "In Transit", price: "KES 6,200" },
    { id: "#KE-00301", item: "Smart Watch Series 8", emoji: "⌚", date: "10 Feb 2025", status: "Delivered", price: "KES 18,000" },
    { id: "#KE-00277", item: "Blender 1.5L", emoji: "🫙", date: "20 Jan 2025", status: "Cancelled", price: "KES 2,800" },
];

export const INITIAL_WISHLIST = [
    { id: 1, name: "iPhone 15 Pro", emoji: "📱", price: "KES 185,000", oldPrice: "KES 199,000" },
    { id: 2, name: "Air Fryer 5L", emoji: "🍳", price: "KES 8,500", oldPrice: null },
    { id: 3, name: "Gaming Chair", emoji: "🪑", price: "KES 22,000", oldPrice: "KES 28,000" },
    { id: 4, name: "Portable Speaker", emoji: "🔊", price: "KES 3,200", oldPrice: null },
];

export const INITIAL_ADDRESSES = [
    { id: 1, tag: "Shipping Address", line1: "Apt 4B, Westlands Plaza", line2: "Westlands, Nairobi", isDefault: true },
    { id: 2, tag: "Billing Address", line1: "2nd Floor, Delta Corner Towers", line2: "Westlands, Nairobi", isDefault: false },
];

export const ORDER_STATUSES = ["All", "Pending", "Processing", "Completed", "Cancelled"];

export const ADDRESS_FIELDS = [
    "Full Name",
    "Phone Number",
    "County",
    "Town / City",
    "Street Address",
    "Nearest Landmark"
];

export const PERSONAL_FIELDS = [
    { label: "Username", readOnly: true },
    { label: "Email Address", readOnly: true },
    { label: "Phone Number", },
    { label: "Date of Birth", type: "date" },
];

export const getInitialAddresses = (user) => [
    { id: 1, tag: "Shipping Address", name: user.userName, line1: "Apt 4B, Westlands Plaza", line2: "Westlands, Nairobi", isDefault: true },
    { id: 2, tag: "Billing Address", name: user.userName, line1: "2nd Floor, Delta Corner Towers", line2: "Westlands, Nairobi", isDefault: false },
];

export const getPersonalFields = (user) => [
    { key: "userName", label: "Username", value: user.userName, readOnly: true },
    { key: "email", label: "Email Address", value: user.email, readOnly: true },
    { key: "roles", label: "Role", value: user.roles?.join(", ") || "—", readOnly: true },
    { key: "phoneNumber", label: "Phone Number", value: user.phoneNumber },
    { key: "dateOfBirth", label: "Date of Birth", value: user.dateOfBirth, type: "date" },
];

export const getAddressFields = (user) => {
    const a = user.address ?? {};
    return [
        { key: "addressLine1", label: "Address Line 1", value: a.addressLine1 ?? "" },
        { key: "addressLine2", label: "Address Line 2", value: a.addressLine2 ?? "" },
        { key: "landmark", label: "Landmark", value: a.landmark ?? "" },
        { key: "city", label: "City", value: a.city ?? "" },
        { key: "county", label: "County", value: a.county ?? "" },
        { key: "postalCode", label: "Postal Code", value: a.postalCode ?? "" },
        { key: "country", label: "Country", value: a.country ?? "" },
    ];
};

export const getPasswordFields = () => [
    { key: "currentPassword", label: "Current Password", type: "password" },
    { key: "newPassword",     label: "New Password",     type: "password" },
    { key: "confirmPassword", label: "Confirm New Password", type: "password" },
];