/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactSlider from 'react-slider'
import { useQuery } from '@tanstack/react-query'
import { getProductsWithPaginationQueryFn, getProductByCategoryQueryFn, getCategoriesFlatQueryFn } from '@/lib/api';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '@/features/cartSlice';
import { selectIsAuthenticated, selectCustomerId, selectAccessToken } from '@/features/authSlice';
import { toast } from "../hooks/use-toast";

const PAGE_SIZE = 20;


const ProductCard = ({ products = [], handleAddtoCart }) => {
    return (
        <>
            {products.map((product) =>
                <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2" key={product.id}>
                    <Link
                        to={`/product-details-two/${product.id}`}
                        className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                    >
                        <img src={"src/assets/images/icon/Medicine.jpg"} alt={product.name} className="w-auto max-w-unset" />
                    </Link>
                    <div className="product-card__content mt-16">
                        <div className='justify-content-between'>
                            <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                <Link to={`/product-details-two/${product.id}`} className="link text-line-2" tabIndex={0}>
                                    {product.name}
                                </Link>
                            </h6>
                            <span className="badge text-sm text-white bg-main-600 position-absolute top-0 inset-s-0 m-8 rounded-4">
                                {product.categoryName}
                            </span>
                        </div>
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
                            {/* <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                Ksh{(product.price * 1.2).toFixed(2)}
                            </span> */}
                            <span className="text-heading text-md fw-semibold">
                                Ksh{product.price.toFixed(2)} <span className="text-gray-500 fw-normal">/Qty</span>
                            </span>
                        </div>
                   <button
  className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
  tabIndex={0}
  onClick={() => handleAddtoCart(product)} 
>
  Add To Cart <i className="ph ph-shopping-cart" />
</button>
                    </div>
                </div>
            )}
        </>
    )

};


const ShopSection = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.itemCart);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const customerId = useSelector(selectCustomerId);
    console.log(cart);
    console.log("Login info: ", isAuthenticated, customerId);
    const [grid, setGrid] = useState(false);
    const [active, setActive] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [searchParams] = useSearchParams();
    const categoryName = searchParams.get("category") || null;
    const navigate = useNavigate();

    useEffect(() => {
        setPageIndex(0);
    }, [categoryName]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", pageIndex],
        queryFn: () => getProductsWithPaginationQueryFn({ pageIndex, pageSize: PAGE_SIZE }),
        keepPreviousData: true,
        enabled: !categoryName,
    });

    const {
        isPending: categoryPending,
        isError: categoryIsError,
        data: categoryData,
    } = useQuery({
        queryKey: ["category_products", categoryName, pageIndex],
        queryFn: () => getProductByCategoryQueryFn(categoryName, pageIndex, PAGE_SIZE),
        enabled: !!categoryName,
    });

    const {
        isPending: categoriesLoading,
        isError: categoriesError,
        data: categoriesResponse,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategoriesFlatQueryFn,
    });

    const categoryList = categoriesResponse?.categories ?? [];

    let products = [];
    let total = 0;
    let totalPages = 1;
    let loading = false;
    let error = false;

    if (categoryName) {
        loading = categoryPending;
        error = categoryIsError;
        const raw = categoryData?.products?.data ?? [];
        total = raw.length;
        totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
        const start = pageIndex * PAGE_SIZE;
        products = raw.slice(start, start + PAGE_SIZE);
    } else {
        loading = isLoading;
        error = isError;
        products = data?.products?.data ?? [];
        total = data?.products?.count ?? 0;
        totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    }

    const sidebarController = () => setActive(v => !v);

    const handlePage = (index) => {
        if (index < 0 || index >= totalPages) return;
        setPageIndex(index);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

//   const handleAddtoCart = (item) => {
//     dispatch(addItemToCart({ ...item }));
//   };


    const handleAddtoCart = (item) => {
        dispatch(addItemToCart({ ...item }));
          navigate("/cart");
    };

    function getPaginationRange(current, total, siblings = 1) {
        const range = new Set();
        for (let i = 0; i < Math.min(3, total); i++) range.add(i);
        for (let i = Math.max(0, total - 1); i < total; i++) range.add(i);
        for (let i = Math.max(0, current - siblings); i <= Math.min(total - 1, current + siblings); i++) {
            range.add(i);
        }
        const sorted = [...range].sort((a, b) => a - b);
        const result = [];
        for (let i = 0; i < sorted.length; i++) {
            if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
            result.push(sorted[i]);
        }
        return result;
    }

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

                            {/* Product Categories */}
                            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Product Categories</h6>
                                {categoriesError && (
                                    <div className="container text-center">
                                        <h6 className="mt-20 text-danger-600">Error getting categories</h6>
                                    </div>
                                )}
                                <ul className="max-h-540 overflow-y-auto scroll-sm">
                                    {!categoriesError && categoryList.map((category) => (
                                        <li className="mb-24" key={category.id}>
                                            <Link
                                                to={`/shop?category=${category.name}`}
                                                className={`text-gray-900 hover-text-main-600 ${categoryName === category.name ? "text-main-600 fw-semibold" : ""}`}
                                            >
                                                {category.name}
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

                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-lg-9">
                        {/* Top bar */}
                        <div className="flex-between gap-16 flex-wrap mb-40">
                            <span className="text-gray-900">
                                {loading
                                    ? "Loading..."
                                    : error
                                        ? "Failed to load products"
                                        : `Showing ${Math.min((pageIndex + 1) * PAGE_SIZE, total)} of ${total} results`}
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
                                    <label htmlFor="sorting" className="text-inherit shrink-0">Sort by: </label>
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
                        {loading ? (
                            <div className="flex-center py-80">
                                <span className="text-gray-500">Loading products...</span>
                            </div>
                        ) : error ? (
                            <div className="flex-center py-80">
                                <span className="text-danger">Failed to load products. Please try again.</span>
                            </div>
                        ) : (
                            <div className={`list-grid-wrapper ${grid && "list-view"}`}>
                                <ProductCard products={products} handleAddtoCart={handleAddtoCart} />
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && !error && (
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

                                {getPaginationRange(pageIndex, totalPages).map((item, idx) =>
                                    item === "..." ? (
                                        <li key={`ellipsis-${idx}`} className="page-item disabled">
                                            <span className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-400 border border-gray-100">…</span>
                                        </li>
                                    ) : (
                                        <li key={item} className={`page-item ${pageIndex === item ? "active" : ""}`}>
                                            <button
                                                className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                                onClick={() => handlePage(item)}
                                            >
                                                {String(item + 1).padStart(2, "0")}
                                            </button>
                                        </li>
                                    )
                                )}

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