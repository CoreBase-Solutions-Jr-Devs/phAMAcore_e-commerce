import React from "react";
import { Link } from "react-router-dom";

const BlogHome = () => {

    const blogPosts = [
        {
            id: 1,
            title: "Legal structure, can make profit business",
            category: "Gadget",
            date: "July 12, 2025",
            comments: 0,
            image: "assets/images/thumbs/blog-img1.png",
            excerpt:
                "Re-engagement — objectives. As developers, we rightfully obsess about the customer experience...",
        },
        {
            id: 2,
            title: "Legal structure, can make profit business",
            category: "Gadget",
            date: "July 12, 2025",
            comments: 0,
            image: "assets/images/thumbs/blog-img2.png",
            excerpt:
                "Re-engagement — objectives. As developers, we rightfully obsess about the customer experience...",
        },
        {
            id: 3,
            title: "Legal structure, can make profit business",
            category: "Gadget",
            date: "July 12, 2025",
            comments: 0,
            image: "assets/images/thumbs/blog-img3.png",
            excerpt:
                "Re-engagement — objectives. As developers, we rightfully obsess about the customer experience...",
        },
    ];

    return (
        <section className="blog py-80">
            <div className="container container-lg">

                {/* Section Heading */}
                <div className="section-heading mb-40">
                    <h5 className="mb-0">Latest Blog</h5>
                </div>

                {/* Blog Grid */}
                <div className="row gy-4">

                    {blogPosts.map((post) => (
                        <div key={post.id} className="col-lg-4 col-md-6">

                            <div className="blog-item">

                                <Link
                                    to="/blog-details"
                                    className="w-100 h-100 rounded-16 overflow-hidden"
                                >
                                    <img
                                        src='/src/assets/images/thumbs/blog-img1.png'
                                        className="cover-img"
                                    />
                                </Link>

                                <div className="blog-item__content mt-24">

                                    <span className="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16">
                                        {post.category}
                                    </span>

                                    <h6 className="text-2xl mb-24">
                                        <Link to="/blog-details">
                                            {post.title}
                                        </Link>
                                    </h6>

                                    <p className="text-gray-700 text-line-2">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex-align flex-wrap gap-24 pt-24 mt-24 border-top border-gray-100">

                                        <div className="flex-align gap-8">
                                            <span className="text-lg text-main-600">
                                                <i className="ph ph-calendar-dots" />
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {post.date}
                                            </span>
                                        </div>

                                        <div className="flex-align gap-8">
                                            <span className="text-lg text-main-600">
                                                <i className="ph ph-chats-circle" />
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {post.comments} Comments
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default BlogHome;