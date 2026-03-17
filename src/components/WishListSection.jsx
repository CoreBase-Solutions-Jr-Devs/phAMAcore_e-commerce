import React from "react";
import { Link } from "react-router-dom";

const WishListSection = () => {
  return (
    <section className='cart py-80'>
      <div className='container container-lg'>
        <div className='row gy-4'>
          <div className='col-lg-11'>
            <div className='cart-table border border-gray-100 rounded-8'>
              <div className='overflow-x-auto scroll-sm scroll-sm-horizontal'>
                <table className='table rounded-8 overflow-hidden'>
                  <thead>
                    <tr className='border-bottom border-neutral-100'>
                      <th className='h6 mb-0 text-sm fw-bold px-16 py-8 border-end border-neutral-100'>
                        Delete
                      </th>
                      <th className='h6 mb-0 text-sm fw-bold px-16 py-8 border-end border-neutral-100'>
                        Product Name
                      </th>
                      <th className='h6 mb-0 text-sm fw-bold px-16 py-8 border-end border-neutral-100'>
                        Unit Price
                      </th>
                      <th className='h6 mb-0 text-sm fw-bold px-16 py-8 border-end border-neutral-100'>
                        Stock Status
                      </th>
                      <th className='h6 mb-0 text-sm fw-bold px-16 py-8' />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=''>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <button
                          type='button'
                          className='remove-tr-btn flex-align gap-12 hover-text-danger-600'
                        >
                          <i className='ph ph-x-circle text-2xl d-flex' />
                          Remove
                        </button>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <div className='table-product d-flex align-items-center gap-24'>
                          <Link
                            to='/product-details-two'
                            className='table-product__thumb border border-gray-100 rounded-8 flex-center w-56 h-56'
                          >
                            <img
                              src='assets/images/thumbs/product-two-img1.png'
                              alt=''
                            />
                          </Link>
                          <div className='table-product__content text-start'>
                            <h6 className='title text-lg fw-semibold mb-8'>
                              <Link
                                to='/product-details-two'
                                className='link text-line-2 text-xs'
                                tabIndex={0}
                              >
                                Taylor Farms Broccoli Florets Vegetables
                              </Link>
                            </h6>
                            <div className='flex-align gap-8 mb-2'>
                              <div className='flex-align gap-6'>
                                <span className='text-md fw-medium text-warning-600 d-flex'>
                                  <i className='ph-fill ph-star' />
                                </span>
                                <span className='text-xs fw-semibold text-gray-900'>
                                  4.8
                                </span>
                              </div>
                              <span className='text-sm fw-medium text-gray-200'>
                                |
                              </span>
                              <span className='text-neutral-600 text-xs'>
                                128 Reviews
                              </span>
                            </div>
                            <div className='flex-align gap-8'>
                              <Link
                                to='/cart'
                                className='product-card__cart btn bg-gray-50 text-heading text-xs hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium'
                              >
                                Camera
                              </Link>
                              <Link
                                to='/cart'
                                className='product-card__cart btn bg-gray-50 text-heading text-xs hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium'
                              >
                                Videos
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <span className='text-xs h6 mb-0 fw-medium'>
                          $125.00
                        </span>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <span className='text-xs h6 mb-0 fw-medium'>
                          In Stock
                        </span>
                      </td>
                      <td className='px-16 py-8'>
                        <Link
                          to='/cart'
                          className='btn btn-main-two rounded-8 px-64'
                        >
                          Add To Cart <i className='ph ph-shopping-cart' />
                        </Link>
                      </td>
                    </tr>
                    <tr className=''>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <button
                          type='button'
                          className='remove-tr-btn flex-align gap-12 hover-text-danger-600'
                        >
                          <i className='ph ph-x-circle text-2xl d-flex' />
                          Remove
                        </button>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <div className='table-product d-flex align-items-center gap-24'>
                          <Link
                            to='/product-details-two'
                            className='table-product__thumb border border-gray-100 rounded-8 flex-center w-56 h-56'
                          >
                            <img
                              src='assets/images/thumbs/product-two-img3.png'
                              alt=''
                            />
                          </Link>
                          <div className='table-product__content text-start'>
                            <h6 className='title text-lg fw-semibold mb-8'>
                              <Link
                                to='/product-details-two'
                                className='link text-line-2 text-xs'
                                tabIndex={0}
                              >
                                Smart Phone With Intel Celeron
                              </Link>
                            </h6>
                            <div className='flex-align gap-8 mb-2'>
                              <div className='flex-align gap-6'>
                                <span className='text-md fw-medium text-warning-600 d-flex'>
                                  <i className='ph-fill ph-star' />
                                </span>
                                <span className='text-xs fw-semibold text-gray-900'>
                                  4.8
                                </span>
                              </div>
                              <span className='text-sm fw-medium text-gray-200'>
                                |
                              </span>
                              <span className='text-neutral-600 text-xs'>
                                128 Reviews
                              </span>
                            </div>
                            <div className='flex-align gap-8'>
                              <Link
                                to='/cart'
                                className='product-card__cart btn bg-gray-50 text-heading text-xs hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium'
                              >
                                Camera
                              </Link>
                              <Link
                                to='/cart'
                                className='product-card__cart btn bg-gray-50 text-heading text-xs hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium'
                              >
                                Videos
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <span className='text-xs h6 mb-0 fw-medium'>
                          $125.00
                        </span>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <span className='text-xs h6 mb-0 fw-medium'>
                          In Stock
                        </span>
                      </td>
                      <td className='px-16 py-8'>
                        <Link
                          to='/cart'
                          className='btn btn-main-two rounded-8 px-64'
                        >
                          Add To Cart <i className='ph ph-shopping-cart' />
                        </Link>
                      </td>
                    </tr>
                    <tr className=''>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <button
                          type='button'
                          className='remove-tr-btn flex-align gap-12 hover-text-danger-600'
                        >
                          <i className='ph ph-x-circle text-2xl d-flex' />
                          Remove
                        </button>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <div className='table-product d-flex align-items-center gap-24'>
                          <Link
                            to='/product-details-two'
                            className='table-product__thumb border border-gray-100 rounded-8 flex-center w-56 h-56'
                          >
                            <img
                              src='assets/images/thumbs/product-two-img14.png'
                              alt=''
                            />
                          </Link>
                          <div className='table-product__content text-start'>
                            <h6 className='title text-lg fw-semibold mb-8'>
                              <Link
                                to='/product-details-two'
                                className='link text-line-2 text-xs'
                                tabIndex={0}
                              >
                                HP Chromebook With Intel Celeron
                              </Link>
                            </h6>
                            <div className='flex-align gap-8 mb-2'>
                              <div className='flex-align gap-6'>
                                <span className='text-md fw-medium text-warning-600 d-flex'>
                                  <i className='ph-fill ph-star' />
                                </span>
                                <span className='text-xs fw-semibold text-gray-900'>
                                  4.8
                                </span>
                              </div>
                              <span className='text-sm fw-medium text-gray-200'>
                                |
                              </span>
                              <span className='text-neutral-600 text-xs'>
                                128 Reviews
                              </span>
                            </div>
                            <div className='flex-align gap-8'>
                              <Link
                                to='/cart'
                                className='product-card__cart btn bg-gray-50 text-heading text-xs hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium'
                              >
                                Camera
                              </Link>
                              <Link
                                to='/cart'
                                className='product-card__cart btn bg-gray-50 text-heading text-xs hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium'
                              >
                                Videos
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <span className='text-xs h6 mb-0 fw-medium'>
                          $125.00
                        </span>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <span className='text-xs h6 mb-0 fw-medium'>
                          In Stock
                        </span>
                      </td>
                      <td className='px-16 py-8'>
                        <Link
                          to='/cart'
                          className='btn btn-main-two rounded-8 px-64'
                        >
                          Add To Cart <i className='ph ph-shopping-cart' />
                        </Link>
                      </td>
                    </tr>
                    <tr className=''>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <button
                          type='button'
                          className='remove-tr-btn flex-align gap-12 hover-text-danger-600'
                        >
                          <i className='ph ph-x-circle text-2xl d-flex' />
                          Remove
                        </button>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <div className='table-product d-flex align-items-center gap-24'>
                          <Link
                            to='/product-details-two'
                            className='table-product__thumb border border-gray-100 rounded-8 flex-center w-56 h-56'
                          >
                            <img
                              src='assets/images/thumbs/product-two-img2.png'
                              alt=''
                              className=""
                            />
                          </Link>
                          <div className='table-product__content text-start'>
                            <h6 className='title text-lg fw-semibold mb-8'>
                              <Link
                                to='/product-details'
                                className='link text-line-2 text-xs'
                                tabIndex={0}
                              >
                                Smart watch With Intel Celeron
                              </Link>
                            </h6>
                            <div className='flex-align gap-8 mb-2'>
                              <div className='flex-align gap-6'>
                                <span className='text-md fw-medium text-warning-600 d-flex'>
                                  <i className='ph-fill ph-star' />
                                </span>
                                <span className='text-xs fw-semibold text-gray-900'>
                                  4.8
                                </span>
                              </div>
                              <span className='text-xs fw-medium text-gray-200'>
                                |
                              </span>
                              <span className='text-neutral-600 text-xs'>
                                128 Reviews
                              </span>
                            </div>
                            <div className='flex-align gap-16'>
                              <Link
                                to='/cart'
                                className='product-card__cart btn bg-gray-50 text-heading text-xs hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium'
                              >
                                Camera
                              </Link>
                              <Link
                                to='/cart'
                                className='product-card__cart btn bg-gray-50 text-heading text-xs hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium'
                              >
                                Videos
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <span className='text-xs h6 mb-0 fw-medium'>
                          $125.00
                        </span>
                      </td>
                      <td className='px-16 py-8 border-end border-neutral-100'>
                        <span className='text-xs h6 mb-0 fw-medium'>
                          In Stock
                        </span>
                      </td>
                      <td className='px-16 py-8'>
                        <Link
                          to='/cart'
                          className='btn btn-main-two rounded-8 px-64'
                        >
                          Add To Cart <i className='ph ph-shopping-cart' />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishListSection;
