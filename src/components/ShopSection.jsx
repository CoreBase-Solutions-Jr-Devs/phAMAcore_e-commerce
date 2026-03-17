import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactSlider from 'react-slider'
import { useQuery } from '@tanstack/react-query'
import categoriesData from "../../getCategoriesHierachy.json";
import { getProductsWithPaginationQueryFn } from '@/lib/api';

const PAGE_SIZE = 20;

// ── static data ──────────────────────────────────────────────────────────────

const COLORS = [
    { id: "color1", label: "Black (12)", cls: "checked-black" },
    { id: "color2", label: "Blue (12)", cls: "checked-primary" },
    { id: "color3", label: "Gray (12)", cls: "checked-gray" },
    { id: "color4", label: "Green (12)", cls: "checked-success" },
    { id: "color5", label: "Red (12)", cls: "checked-danger" },
    { id: "color6", label: "White (12)", cls: "checked-white" },
    { id: "color7", label: "Purple (12)", cls: "checked-purple" },
];

const BRANDS = ["Apple", "Samsung", "Microsoft", "Apple", "HP", "DELL", "Redmi"];

const RATINGS = [
    { id: "rating5", stars: 5, filled: 5, count: 124, pct: 70 },
    { id: "rating4", stars: 4, filled: 4, count: 52, pct: 50 },
    { id: "rating3", stars: 3, filled: 3, count: 12, pct: 35 },
    { id: "rating2", stars: 2, filled: 2, count: 5, pct: 20 },
    { id: "rating1", stars: 1, filled: 1, count: 2, pct: 5 },
];

// ── sub-components ────────────────────────────────────────────────────────────

const ProductCard = ({ id, name, imageUrl, price, badge }) => (
    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
        <Link
            to={`/product-details-two/${id}`}
            className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
        >
            {badge && (
                <span className={`product-card__badge ${badge.color} px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0`}>
                    {badge.label}
                </span>
            )}
            <img src={imageUrl} alt={name} className="w-auto max-w-unset" />
        </Link>
        <div className="product-card__content mt-16">
            <h6 className="title text-lg fw-semibold mt-12 mb-8">
                <Link to={`/product-details-two/${id}`} className="link text-line-2" tabIndex={0}>
                    {name}
                </Link>
            </h6>
            <div className="flex-align mb-20 mt-16 gap-6">
                <span className="text-xs fw-medium text-gray-500">4.8</span>
                <span className="text-15 fw-medium text-warning-600 d-flex">
                    <i className="ph-fill ph-star" />
                </span>
                <span className="text-xs fw-medium text-gray-500">(17k)</span>
            </div>
            <div className="mt-8">
                <div className="progress w-100 bg-color-three rounded-pill h-4" role="progressbar" aria-valuenow={35} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar bg-main-two-600 rounded-pill" style={{ width: "35%" }} />
                </div>
                <span className="text-gray-900 text-xs fw-medium mt-8">Sold: 18/35</span>
            </div>
            <div className="product-card__price my-20">
                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                    Ksh{(price * 1.2).toFixed(2)}
                </span>
                <span className="text-heading text-md fw-semibold">
                    Ksh{price.toFixed(2)} <span className="text-gray-500 fw-normal">/Qty</span>
                </span>
            </div>
            <Link
                to="/cart"
                className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                tabIndex={0}
            >
                Add To Cart <i className="ph ph-shopping-cart" />
            </Link>
        </div>
    </div>
);

const RatingRow = ({ id, filled, count, pct }) => (
    <div className="flex-align gap-8 position-relative mb-20">
        <label className="position-absolute w-100 h-100 cursor-pointer" htmlFor={id}> </label>
        <div className="common-check common-radio mb-0">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id={id} />
        </div>
        <div className="progress w-100 bg-gray-100 rounded-pill h-8" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar bg-main-600 rounded-pill" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex-align gap-4">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs fw-medium d-flex ${i < filled ? "text-warning-600" : "text-gray-400"}`}>
                    <i className="ph-fill ph-star" />
                </span>
            ))}
        </div>
        <span className="text-gray-900 flex-shrink-0">{count}</span>
    </div>
);

// ── main component ────────────────────────────────────────────────────────────

const ShopSection = () => {
    const [grid, setGrid] = useState(false);
    const [active, setActive] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", pageIndex],
        queryFn: () => getProductsWithPaginationQueryFn({ pageIndex, pageSize: PAGE_SIZE }),
        keepPreviousData: true,
    });

    const products = data?.products?.data ?? [];
    const total = data?.products?.count ?? 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    const sidebarController = () => setActive(v => !v);

    const handlePage = (index) => {
        if (index < 0 || index >= totalPages) return;
        setPageIndex(index);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="shop py-80">
            <div className={`side-overlay ${active && "show"}`}></div>
            <div className="container container-lg">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className={`shop-sidebar ${active && "active"}`}>
                            <button onClick={sidebarController} type="button"
                                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                            >
                                <i className="ph ph-x" />
                            </button>

                            {/* Categories */}
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Product Category</h6>
                                <ul className="max-h-540 overflow-y-auto scroll-sm">
                                    {categoriesData.categories.map((cat, i) => (
                                        <li key={cat.id} className={i === categoriesData.categories.length - 1 ? "mb-0" : "mb-24"}>
                                            <Link to={`/shop?category=${cat.slug}`} className="text-gray-900 hover-text-main-600">
                                                {cat.name} ({cat.children?.length ?? 0})
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price */}
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Price</h6>
                                <div className="custom--range">
                                    <ReactSlider
                                        className="horizontal-slider"
                                        thumbClassName="example-thumb"
                                        trackClassName="example-track"
                                        defaultValue={[0, 100]}
                                        ariaLabel={['Lower thumb', 'Upper thumb']}
                                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                        renderThumb={(props, state) => {
                                            const { key, ...restProps } = props;
                                            return <div {...restProps} key={state.index}>{state.valueNow}</div>;
                                        }}
                                        pearling
                                        minDistance={10}
                                    />
                                    <br /><br />
                                    <div className="flex-between flex-wrap-reverse gap-8 mt-24">
                                        <button type="button" className="btn btn-main h-40 flex-align">Filter</button>
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Rating</h6>
                                {RATINGS.map(r => <RatingRow key={r.id} {...r} />)}
                            </div>

                            {/* Color */}
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Color</h6>
                                <ul className="max-h-540 overflow-y-auto scroll-sm">
                                    {COLORS.map(({ id, label, cls }, i) => (
                                        <li key={id} className={i === COLORS.length - 1 ? "mb-0" : "mb-24"}>
                                            <div className={`form-check common-check common-radio ${cls}`}>
                                                <input className="form-check-input" type="radio" name="color" id={id} />
                                                <label className="form-check-label" htmlFor={id}>{label}</label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Brand */}
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Brand</h6>
                                <ul className="max-h-540 overflow-y-auto scroll-sm">
                                    {BRANDS.map((brand, i) => (
                                        <li key={`${brand}-${i}`} className={i === BRANDS.length - 1 ? "mb-0" : "mb-24"}>
                                            <div className="form-check common-check common-radio">
                                                <input className="form-check-input" type="radio" name="brand" id={`brand-${i}`} />
                                                <label className="form-check-label" htmlFor={`brand-${i}`}>{brand}</label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="shop-sidebar__box rounded-8">
                                <img src="src/assets/images/thumbs/advertise-img1.png" alt="" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-lg-9">
                        {/* Top bar */}
                        <div className="flex-between gap-16 flex-wrap mb-40">
                            <span className="text-gray-900">
                                {isLoading
                                    ? "Loading..."
                                    : isError
                                        ? "Failed to load products"
                                        : `Showing ${products.length} of ${total} results`}
                            </span>
                            <div className="position-relative flex-align gap-16 flex-wrap">
                                <div className="list-grid-btns flex-align gap-16">
                                    <button onClick={() => setGrid(true)} type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${grid && "border-main-600 text-white bg-main-600"}`}
                                    >
                                        <i className="ph-bold ph-list-dashes" />
                                    </button>
                                    <button onClick={() => setGrid(false)} type="button"
                                        className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${!grid && "border-main-600 text-white bg-main-600"}`}
                                    >
                                        <i className="ph ph-squares-four" />
                                    </button>
                                </div>
                                <div className="position-relative text-gray-500 flex-align gap-4 text-14">
                                    <label htmlFor="sorting" className="text-inherit flex-shrink-0">Sort by: </label>
                                    <select defaultValue={1} className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto" id="sorting">
                                        {["Popular", "Latest", "Trending", "Matches"].map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={sidebarController} type="button"
                                    className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                                >
                                    <i className="ph-bold ph-funnel" />
                                </button>
                            </div>
                        </div>

                        {/* Product grid */}
                        {isLoading ? (
                            <div className="flex-center py-80">
                                <span className="text-gray-500">Loading products...</span>
                            </div>
                        ) : isError ? (
                            <div className="flex-center py-80">
                                <span className="text-danger">Failed to load products. Please try again.</span>
                            </div>
                        ) : (
                            <div className={`list-grid-wrapper ${grid && "list-view"}`}>
                                {products.map((p) => <ProductCard key={p.id} {...p} />)}
                            </div>
                        )}

                        {/* Pagination */}
                        {!isLoading && !isError && totalPages > 1 && (
                            <ul className="pagination flex-center flex-wrap gap-16 mt-40">
                                <li className={`page-item ${pageIndex === 0 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                        onClick={() => handlePage(pageIndex - 1)}
                                        disabled={pageIndex === 0}
                                    >
                                        <i className="ph-bold ph-arrow-left" />
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${pageIndex === i ? "active" : ""}`}>
                                        <button
                                            className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                            onClick={() => handlePage(i)}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${pageIndex === totalPages - 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                        onClick={() => handlePage(pageIndex + 1)}
                                        disabled={pageIndex === totalPages - 1}
                                    >
                                        <i className="ph-bold ph-arrow-right" />
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopSection;
