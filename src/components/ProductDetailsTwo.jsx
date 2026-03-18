import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import { getCountdown } from '../helper/Countdown';
import thumb1 from "../assets/images/thumbs/product-details-two-thumb1.png";
import thumb2 from "../assets/images/thumbs/product-details-two-thumb2.png";
import thumb3 from "../assets/images/thumbs/product-details-two-thumb3.png";
import { getProductByIdQueryFn } from '../lib/api';
import localProduct from '../../getProductById.json';

// ── Static/fallback data ─────────────────────────────────────────────────────
const PRODUCT_IMAGES = [thumb1, thumb2, thumb3, thumb1, thumb2];

const SPECS = [
    { label: "Product Type", value: "Chips & Dips" },
    { label: "Product Name", value: "Potato Chips Classic" },
    { label: "Brand", value: "Lay's" },
    { label: "FSA Eligible", value: "No" },
    { label: "Size/Count", value: "8.0oz" },
    { label: "Item Code", value: "331539" },
    { label: "Ingredients", value: "Potatoes, Vegetable Oil, and Salt." },
];

const NUTRITION = [
    "Total Fat 10g 13%", "Saturated Fat 1.5g 7%",
    "Cholesterol 0mg 0%", "Sodium 170mg 7%", "Potassium 350mg 6%",
];

const MORE_DETAILS = [
    "Lunarlon midsole delivers ultra-plush responsiveness",
    "Encapsulated Air-Sole heel unit for lightweight cushioning",
    "Colour Shown: Ale Brown/Black/Goldtone/Ale Brown",
    "Style: 805899-202",
];

const SOCIAL_LINKS = [
    { href: "/https://www.facebook.com", icon: "ph-fill ph-facebook-logo" },
    { href: "/https://www.twitter.com", icon: "ph-fill ph-twitter-logo" },
    { href: "/https://www.linkedin.com", icon: "ph-fill ph-instagram-logo" },
    { href: "/https://www.pinterest.com", icon: "ph-fill ph-linkedin-logo" },
];

const RATING_BARS = [
    { stars: 5, width: "70%", filled: 5, count: 124 },
    { stars: 4, width: "50%", filled: 4, count: 52 },
    { stars: 3, width: "35%", filled: 3, count: 12 },
    { stars: 2, width: "20%", filled: 2, count: 5 },
    { stars: 1, width: "5%", filled: 1, count: 2 },
];

const SLIDER_SETTINGS = {
    dots: false, infinite: true, speed: 500,
    slidesToShow: 4, slidesToScroll: 1, focusOnSelect: true,
};

// ── TanStack Query hook ───────────────────────────────────────────────────────
const useProductById = (productId) =>
    useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductByIdQueryFn(productId),
        enabled: !!productId,
        select: (data) => data.product,
    });

// ── Sub-components ───────────────────────────────────────────────────────────
const Stars = ({ count = 5, size = "text-15", dimAfter }) =>
    Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`${size} fw-medium d-flex ${i < (dimAfter ?? count) ? "text-warning-600" : "text-gray-400"}`}>
            <i className="ph-fill ph-star" />
        </span>
    ));

const CheckItem = ({ children }) => (
    <li className="text-gray-400 mb-14 flex-align gap-14">
        <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
            <i className="ph ph-check" />
        </span>
        {children}
    </li>
);

const ReviewCard = () => (
    <div className="d-flex align-items-start gap-24 pb-44 border-bottom border-gray-100 mb-44">
        <img src="src/assets/images/thumbs/comment-img1.png" alt=""
            className="w-52 h-52 object-fit-cover rounded-circle flex-shrink-0" />
        <div className="flex-grow-1">
            <div className="flex-between align-items-start gap-8">
                <div>
                    <h6 className="mb-12 text-md">Nicolas cage</h6>
                    <div className="flex-align gap-8"><Stars /></div>
                </div>
                <span className="text-gray-800 text-xs">3 Days ago</span>
            </div>
            <h6 className="mb-14 text-md mt-24">Greate Product</h6>
            <p className="text-gray-700">
                There are many variations of passages of Lorem Ipsum available, but the
                majority have suffered alteration in some form, by injected humour
            </p>
            <div className="flex-align gap-20 mt-44">
                <button className="flex-align gap-12 text-gray-700 hover-text-main-600">
                    <i className="ph-bold ph-thumbs-up" /> Like
                </button>
                <Link to="#comment-form" className="flex-align gap-12 text-gray-700 hover-text-main-600">
                    <i className="ph-bold ph-arrow-bend-up-left" /> Replay
                </Link>
            </div>
        </div>
    </div>
);

// ── Main component ───────────────────────────────────────────────────────────
const ProductDetailsTwo = () => {
    const { productId } = useParams();

    const { data: apiProduct, isLoading } = useProductById(productId);

    // Use API data when a productId is in the URL, otherwise fall back to local JSON
    const product = productId ? apiProduct : localProduct.product;

    const [timeLeft, setTimeLeft] = useState(getCountdown());
    const [quantity, setQuantity] = useState(1);

    // Derive display values
    const productName        = product?.name        ?? 'Product Name';
    const productDescription = product?.description ?? '';
    const productPrice       = product?.price       ?? 0;
    const productCategory    = product?.categoryName ?? '';
    const productImageUrl    = product?.imageUrl    ?? null;

    const displayImages = productImageUrl
        ? [productImageUrl, ...PRODUCT_IMAGES.slice(1)]
        : PRODUCT_IMAGES;

    const [mainImage, setMainImage] = useState(displayImages[0]);

    // Update main image when product data changes (e.g. API response arrives)
    useEffect(() => {
        setMainImage(displayImages[0]);
    }, [productImageUrl]);

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getCountdown()), 1000);
        return () => clearInterval(id);
    }, []);

    // Show spinner only while a real API call is in flight
    if (productId && isLoading) {
        return (
            <section className="product-details py-80">
                <div className="container container-lg flex-center">
                    <span className="text-gray-500">Loading product details...</span>
                </div>
            </section>
        );
    }

    return (
        <section className="product-details py-80">
            <div className="container container-lg">
                <div className="row gy-4">

                    {/* ── Left: image gallery + product info ── */}
                    <div className="col-xl-9">
                        <div className="row gy-4">

                            {/* Gallery */}
                            <div className="col-xl-6">
                                <div className="product-details__left">
                                    <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                                        <div className="product-details__thumb flex-center h-100">
                                            <img src={mainImage} alt={productName} />
                                        </div>
                                    </div>
                                    <div className="mt-24 product-details__images-slider">
                                        <Slider {...SLIDER_SETTINGS}>
                                            {displayImages.map((img, i) => (
                                                <div key={i} onClick={() => setMainImage(img)}
                                                    className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8">
                                                    <img className="thum" src={img} alt={`Thumbnail ${i}`} />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>

                            {/* Product info */}
                            <div className="col-xl-6">
                                <div className="product-details__content">

                                    {/* Countdown banner */}
                                    <div className="flex-center mb-24 flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24 position-relative z-1">
                                        <img src="src/assets/images/bg/details-offer-bg.png" alt=""
                                            className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1" />
                                        <div className="flex-align gap-16">
                                            <span className="text-white text-sm">Special Offer:</span>
                                        </div>
                                        <ul className="countdown-list flex-align flex-wrap">
                                            {["days", "hours", "minutes", "seconds"].map((unit) => (
                                                <li key={unit} className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                                                    {timeLeft[unit]}<span className={unit} />
                                                </li>
                                            ))}
                                        </ul>
                                        <span className="text-white text-xs">Remains untill the end of the offer</span>
                                    </div>

                                    {/* Title & rating */}
                                    <h5 className="mb-12">{productName}</h5>
                                    <div className="flex-align flex-wrap gap-12">
                                        <div className="flex-align gap-8"><Stars /></div>
                                        <span className="text-sm fw-medium text-neutral-600">4.7 Star Rating</span>
                                        <span className="text-sm fw-medium text-gray-500">(21,671)</span>
                                        <span className="text-sm fw-medium text-gray-500">|</span>
                                        <span className="text-gray-900">
                                            <span className="text-gray-400">Category: </span>{productCategory}
                                        </span>
                                    </div>

                                    <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                    <p className="text-gray-700">{productDescription}</p>

                                    {/* Price */}
                                    <div className="my-32 flex-align gap-16 flex-wrap">
                                        <div className="flex-align gap-8">
                                            <h6 className="mb-0">KES {productPrice.toFixed(2)}</h6>
                                        </div>
                                    </div>

                                    {/* Info links */}
                                    <div className="my-32 flex-align flex-wrap gap-12">
                                        {["Monthyly EMI USD 15.00", "Shipping Charge", "Security & Privacy"].map((label) => (
                                            <Link key={label} to="#"
                                                className="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600">
                                                {label} <i className="ph ph-caret-right" />
                                            </Link>
                                        ))}
                                    </div>

                                    <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />

                                    {/* Quick overview */}
                                    <div className="mt-32">
                                        <h6 className="mb-16">Quick Overview</h6>
                                        <div className="flex-between align-items-start flex-wrap gap-16">
                                            <div>
                                                <span className="text-gray-900 d-block mb-12">Color: <span className="fw-medium">Mineral Silver</span></span>
                                                <div className="color-list flex-align gap-8">
                                                    {["bg-info-600", "bg-warning-600", "bg-tertiary-600", "bg-main-600", "bg-gray-100"].map((bg) => (
                                                        <button key={bg} type="button"
                                                            className={`color-list__button w-20 h-20 border border-2 border-gray-50 rounded-circle ${bg}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-900 d-block mb-12">Pattern Name: <span className="fw-medium">with offer</span></span>
                                                <div className="flex-align gap-8 flex-wrap">
                                                    {["with offer", "12th Gen Laptop", "without offer"].map((p) => (
                                                        <Link key={p} to="#"
                                                            className="px-12 py-8 text-sm rounded-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600">
                                                            {p}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                    <Link to="/https://www.whatsapp.com" className="btn btn-black flex-center gap-8 rounded-8 py-16">
                                        <i className="ph ph-whatsapp-logo text-lg" /> Request More Information
                                    </Link>
                                    <div className="mt-32">
                                        <span className="fw-medium text-gray-900">100% Guarantee Safe Checkout</span>
                                        <div className="mt-10">
                                            <img src="src/assets/images/thumbs/gateway-img.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: sidebar ── */}
                    <div className="col-xl-3">
                        <div className="product-details__sidebar py-40 px-32 border border-gray-100 rounded-16">

                            {/* Delivery */}
                            <div className="mb-32">
                                <label htmlFor="delivery" className="h6 activePage mb-8 text-heading fw-semibold d-block">Delivery</label>
                                <div className="flex-align border border-gray-100 rounded-4 px-16">
                                    <span className="text-xl d-flex text-main-600"><i className="ph ph-map-pin" /></span>
                                    <select defaultValue={1} className="common-input border-0 px-8 rounded-4" id="delivery">
                                        {["Maymansign", "Khulna", "Rajshahi", "Rangpur"].map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-32">
                                <label htmlFor="stock" className="text-lg mb-8 text-heading fw-semibold d-block">Total Stock: 21</label>
                                <div className="d-flex rounded-4 overflow-hidden">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} type="button"
                                        className="quantity__minus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white">
                                        <i className="ph ph-minus" />
                                    </button>
                                    <input type="number" id="stock" value={quantity} readOnly
                                        className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-16" />
                                    <button onClick={() => setQuantity(q => q + 1)} type="button"
                                        className="quantity__plus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white">
                                        <i className="ph ph-plus" />
                                    </button>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="mb-32">
                                <div className="flex-between flex-wrap gap-8 border-bottom border-gray-100 pb-16 mb-16">
                                    <span className="text-gray-500">Price</span>
                                    <h6 className="text-lg mb-0">KES {productPrice.toFixed(2)}</h6>
                                </div>
                                <div className="flex-between flex-wrap gap-8">
                                    <span className="text-gray-500">Shipping</span>
                                    <h6 className="text-lg mb-0">From $10.00</h6>
                                </div>
                            </div>

                            <Link to="#" className="btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48">
                                <i className="ph ph-shopping-cart-simple text-lg" /> Add To Cart
                            </Link>
                            <Link to="#" className="btn btn-outline-main rounded-8 py-16 fw-normal mt-16 w-100">Buy Now</Link>

                            {/* Shipping info */}
                            <div className="mt-32">
                                {[
                                    { icon: "ph-fill ph-truck", text: <><span className="fw-semibold">MarketPro</span></>, label: "Ship from" },
                                    { icon: "ph-fill ph-storefront", text: <><span className="fw-semibold">MR Distribution LLC</span></>, label: "Sold by:" },
                                ].map(({ icon, text, label }) => (
                                    <div key={label} className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-14">
                                        <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                                            <i className={icon} />
                                        </span>
                                        <span className="text-sm text-neutral-600">{label} {text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Share */}
                            <div className="mt-32">
                                <div className="px-32 py-16 rounded-8 border border-gray-100 flex-between gap-8">
                                    <Link to="#" className="d-flex text-main-600 text-28">
                                        <i className="ph-fill ph-chats-teardrop" />
                                    </Link>
                                    <span className="h-26 border border-gray-100" />
                                    <div className="dropdown on-hover-item">
                                        <button className="d-flex text-main-600 text-28" type="button">
                                            <i className="ph-fill ph-share-network" />
                                        </button>
                                        <div className="on-hover-dropdown common-dropdown border-0 inset-inline-start-auto inset-inline-end-0">
                                            <ul className="flex-align gap-16">
                                                {SOCIAL_LINKS.map(({ href, icon }) => (
                                                    <li key={href}>
                                                        <Link to={href} className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white">
                                                            <i className={icon} />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Tabs: Description / Reviews ── */}
                <div className="pt-80">
                    <div className="product-dContent border rounded-24">
                        <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
                            <ul className="nav common-tab nav-pills mb-3" id="pills-tab" role="tablist">
                                {[
                                    { id: "description", label: "Description" },
                                    { id: "reviews", label: "Reviews" },
                                ].map(({ id, label }, i) => (
                                    <li key={id} className="nav-item" role="presentation">
                                        <button className={`nav-link ${i === 0 ? "active" : ""}`}
                                            id={`pills-${id}-tab`} data-bs-toggle="pill"
                                            data-bs-target={`#pills-${id}`} type="button" role="tab"
                                            aria-controls={`pills-${id}`} aria-selected={i === 0}>
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <Link to="#" className="btn bg-color-one rounded-16 flex-align gap-8 text-main-600 hover-bg-main-600 hover-text-white">
                                <img src="src/assets/images/icon/satisfaction-icon.png" alt="" />
                                100% Satisfaction Guaranteed
                            </Link>
                        </div>

                        <div className="product-dContent__box">
                            <div className="tab-content" id="pills-tabContent">

                                {/* Description tab */}
                                <div className="tab-pane fade show active" id="pills-description" role="tabpanel" tabIndex={0}>
                                    <div className="mb-40">
                                        <h6 className="mb-24">Product Description</h6>
                                        <p>{productDescription}</p>
                                    </div>

                                    <div className="mb-40">
                                        <h6 className="mb-24">Product Specifications</h6>
                                        <ul className="mt-32">
                                            {SPECS.map(({ label, value }) => (
                                                <CheckItem key={label}>
                                                    <span className="text-heading fw-medium">{label}: <span className="text-gray-500">{value}</span></span>
                                                </CheckItem>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-40">
                                        <h6 className="mb-24">Nutrition Facts</h6>
                                        <ul className="mt-32">
                                            {NUTRITION.map((t) => (
                                                <CheckItem key={t}><span className="text-heading fw-medium">{t}</span></CheckItem>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-0">
                                        <h6 className="mb-24">More Details</h6>
                                        <ul className="mt-32">
                                            {MORE_DETAILS.map((t) => (
                                                <CheckItem key={t}><span className="text-gray-500">{t}</span></CheckItem>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Reviews tab */}
                                <div className="tab-pane fade" id="pills-reviews" role="tabpanel" tabIndex={0}>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <h6 className="mb-24">Product Description</h6>
                                            <ReviewCard />
                                            <ReviewCard />

                                            {/* Write a review */}
                                            <div className="mt-56">
                                                <h6 className="mb-24">Write a Review</h6>
                                                <span className="text-heading mb-8">What is it like to Product?</span>
                                                <div className="flex-align gap-8"><Stars /></div>
                                                <div className="mt-32">
                                                    <div className="mb-32">
                                                        <label htmlFor="title" className="text-neutral-600 mb-8">Review Title</label>
                                                        <input type="text" className="common-input rounded-8" id="title" placeholder="Great Products" />
                                                    </div>
                                                    <div className="mb-32">
                                                        <label htmlFor="desc" className="text-neutral-600 mb-8">Review Content</label>
                                                        <textarea className="common-input rounded-8" id="desc" defaultValue="It is a long established fact..." />
                                                    </div>
                                                    <button type="submit" className="btn btn-main rounded-pill mt-48">Submit Review</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rating breakdown */}
                                        <div className="col-lg-6">
                                            <div className="ms-xxl-5">
                                                <h6 className="mb-24">Customers Feedback</h6>
                                                <div className="d-flex flex-wrap gap-44">
                                                    <div className="border border-gray-100 rounded-8 px-40 py-52 flex-center flex-column flex-shrink-0 text-center">
                                                        <h2 className="mb-6 text-main-600">4.8</h2>
                                                        <div className="flex-center gap-8"><Stars /></div>
                                                        <span className="mt-16 text-gray-500">Average Product Rating</span>
                                                    </div>
                                                    <div className="border border-gray-100 rounded-8 px-24 py-40 flex-grow-1">
                                                        {RATING_BARS.map(({ stars, width, filled, count }) => (
                                                            <div key={stars} className="flex-align gap-8 mb-20">
                                                                <span className="text-gray-900 flex-shrink-0">{stars}</span>
                                                                <div className="progress w-100 bg-gray-100 rounded-pill h-8" role="progressbar">
                                                                    <div className="progress-bar bg-main-600 rounded-pill" style={{ width }} />
                                                                </div>
                                                                <div className="flex-align gap-4"><Stars size="text-xs" dimAfter={filled} /></div>
                                                                <span className="text-gray-900 flex-shrink-0">{count}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsTwo;
