import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <section className="contact py-80">
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-lg-8">
                        <div className="contact-box border border-gray-100 rounded-16 px-24 py-10">
                            <form action="#">
                                <h6 className="fw-bold underline mb-12">Make Custom Request</h6>

                                <div className="row gy-2">

                                    <div className="col-sm-6">
                                        <label
                                            htmlFor="name"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-2"
                                        >
                                            Full Name
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="common-input px-12 py-8"
                                            id="name"
                                            placeholder="Full name"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label
                                            htmlFor="email"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-2"
                                        >
                                            Email Address
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="common-input px-12 py-8"
                                            id="email"
                                            placeholder="Email address"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label
                                            htmlFor="phone"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-2"
                                        >
                                            Phone Number
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="common-input px-12 py-8"
                                            id="phone"
                                            placeholder="Phone Number"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label
                                            htmlFor="subject"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-2"
                                        >
                                            Subject
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="common-input px-12 py-8"
                                            id="subject"
                                            placeholder="Subject"
                                        />
                                    </div>

                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="message"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-2"
                                        >
                                            Message
                                            <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="common-input px-12 py-8"
                                            id="message"
                                            rows="3"
                                            placeholder="Type your message"
                                        />
                                    </div>

                                    <div className="col-sm-12 mt-16">
                                        <button
                                            type="submit"
                                            className="btn btn-main py-12 px-24 rounded-8"
                                        >
                                            Get a Quote
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="contact-box border border-gray-100 rounded-16 px-20 py-32">
                            <h6 className="fw-bold underline mb-32">Get In Touch</h6>

                            <div className="flex-align gap-12 mb-12">
                                <span className="w-36 h-36 flex-center rounded-circle border border-gray-100 text-main-two-600 text-xl flex-shrink-0">
                                    <i className="ph-fill ph-phone-call" />
                                </span>
                                <Link to="/tel:+00123456789" className="text-md text-gray-900 hover-text-main-600">
                                    +00 123 456 789
                                </Link>
                            </div>

                            <div className="flex-align gap-12 mb-12">
                                <span className="w-36 h-36 flex-center rounded-circle border border-gray-100 text-main-two-600 text-xl flex-shrink-0">
                                    <i className="ph-fill ph-envelope" />
                                </span>
                                <Link to="/mailto:support24@marketpro.com" className="text-md text-gray-900 hover-text-main-600">
                                    support24@marketpro.com
                                </Link>
                            </div>

                            <div className="flex-align gap-12">
                                <span className="w-36 h-36 flex-center rounded-circle border border-gray-100 text-main-two-600 text-xl flex-shrink-0">
                                    <i className="ph-fill ph-map-pin" />
                                </span>
                                <span className="text-md text-gray-900">
                                    789 Inner Lane, California, USA
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Contact