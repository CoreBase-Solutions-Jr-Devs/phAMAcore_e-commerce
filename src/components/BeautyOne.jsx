import React from 'react';
import { StorefrontIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const ArrowButton = ({ className, direction, onClick }) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className={clsx(
                className,
                'slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1',
            )}
        >
            {direction === 'next' ?
                (
                    <i className="ph ph-caret-right" />
                ) :
                <i className="ph ph-caret-left" />
            }
        </button>
    )
};

const products = [
    {
        id: 1,
        img: "src/assets/images/thumbs/product-two-img7.png",
        badge: "Sold",
        badgeColor: "bg-main-600",
    },
    {
        id: 2,
        img: "src/assets/images/thumbs/product-two-img8.png",
        badge: "Sale 50%",
        badgeColor: "bg-danger-600",
    },
    {
        id: 3,
        img: "src/assets/images/thumbs/product-two-img9.png",
        badge: "New",
        badgeColor: "bg-warning-600",
    },
    {
        id: 4,
        img: "src/assets/images/thumbs/product-two-img10.png",
        badge: "Best Seller",
        badgeColor: "bg-tertiary-600",
    },
    {
        id: 5,
        img: "src/assets/images/thumbs/product-two-img8.png",
        badge: "Best Seller",
        badgeColor: "bg-main-600",
    },
]

const ProductCard = ({ product }) => (
    <div className="product-card--beauty h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
        <Link
            to="/product-details-two"
            className="product-card__thumb flex-center rounded-24 bg-gray-50 position-relative"
        >
            <span
                className={clsx(
                    "product-card__badge px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0",
                    product.badgeColor
                )}
            >
                {product.badge}
            </span>

            <img src={product.img} alt="" className="w-auto max-w-unset" />
        </Link>

        <div className="product-card__content mt-16">
            <div className="flex-align gap-6">
                <span className="text-xs fw-medium text-gray-500">4.8</span>
                <Star size={16} weight="fill" className="text-warning-600" />
                <span className="text-xs fw-medium text-gray-500">(17k)</span>
            </div>

            <h6 className="title text-base fw-semibold mt-12 mb-8">
                <Link to="/product-details-two" className="link text-line-2">
                    Taylor Farms Broccoli Florets Vegetables
                </Link>
            </h6>

            <div className="flex-align gap-4">
                <StorefrontIcon size={16} className="text-tertiary-600" />
                <span className="text-gray-500 text-xs">By Lucky Supermarket</span>
            </div>

            <div className="mt-8">
                <div className="progress w-100 bg-color-three rounded-pill h-4">
                    <div
                        className="progress-bar bg-tertiary-600 rounded-pill"
                        style={{ width: "35%" }}
                    />
                </div>
                <span className="text-gray-900 text-xs fw-medium mt-8">Sold: 18/35</span>
            </div>

            <div className="product-card__price my-20">
                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                    $28.99
                </span>
                <span className="text-heading text-md fw-semibold">
                    $14.99 <span className="text-gray-500 fw-normal">/Qty</span>
                </span>
            </div>

            <Link
                to="/cart"
                className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
            >
                Add To Cart <ShoppingCart size={18} />
            </Link>
        </div>
    </div>
);

const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 1000,
    slidesToShow: 4,
    autoplay: true,
    nextArrow: <ArrowButton direction={'next'} />,
    prevArrow: <ArrowButton direction={'prev'} />,
    responsive: [
        { breakpoint: 1500, settings: { slidesToShow: 3 } },
        { breakpoint: 1200, settings: { slidesToShow: 2 } },
        { breakpoint: 992, settings: { slidesToShow: 1 } },
    ],
}

const BeautyOne = () => {
    return (
        <section className="beauty-one py-16">
            <div className="container container-lg">
                <div className="border border-gray-100 p-12 rounded-16">

                    {/* Header */}
                    <div className="section-header text-center mb-16">
                        <h5 className="section-header__title text-lg fw-semibold">
                            Beauty & Personal Care
                        </h5>

                        <Link
                            to="/shop"
                            className="section-header__link text-xs text-main-600"
                        >
                            View All Deals
                        </Link>
                    </div>

                    {/* Slider */}
                    <div className="row g-8">

                        {/* Banner */}
                        <div className="col-md-4">
                            <div className="position-relative rounded-16 overflow-hidden p-28 z-1 text-center beauty-banner">

                                <img
                                    src="src/assets/images/bg/deal-bg.png"
                                    alt=""
                                    className="position-absolute inset-0 z-n1 w-100 h-100"
                                />

                                <div className="p-2">
                                    <h6 className="text-sm mb-1 fw-semibold">
                                        Skinlab hylaxae sphere beauty eye
                                    </h6>

                                    <h5 className="text-base mb-3 fw-semibold">
                                        Beauty Care & Cosmetics
                                    </h5>

                                    <Link
                                        to="/cart"
                                        className="btn text-heading border-neutral-600 hover-bg-neutral-600 hover-text-white py-1 px-3 flex-center d-inline-flex rounded-pill gap-1 fw-medium text-xs"
                                    >
                                        Shop <ShoppingCart size={14} />
                                    </Link>
                                </div>

                                <div className="d-md-block d-none mt-3">
                                    <img
                                        src="src/assets/images/thumbs/brand-img1.png"
                                        alt=""
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Products */}
                        <div className="col-md-8">
                            <Slider {...sliderSettings}>
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </Slider>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default BeautyOne;
