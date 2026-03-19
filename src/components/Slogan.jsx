import React from "react";
import { ShieldCheck, Truck, HeartPulse, BadgeCheck } from "lucide-react";

const features = [
    {
        icon: <BadgeCheck size={32} />,
        title: "Trusted Quality",
        desc: "We provide authentic health, wellness and beauty products sourced from trusted manufacturers and distributors."
    },
    {
        icon: <HeartPulse size={32} />,
        title: "Health First",
        desc: "Our mission is to make quality healthcare products easily accessible while supporting healthier lifestyles."
    },
    {
        icon: <Truck size={32} />,
        title: "Fast Delivery",
        desc: "Enjoy convenient delivery to your doorstep with efficient nationwide logistics."
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Reliable Service",
        desc: "Our team is dedicated to offering excellent customer support and a seamless shopping experience."
    }
];

const Slogan = () => {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">

                {/* Title */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-semibold mb-4">
                        Why Shop With Us
                    </h2>

                    <p className="text-muted-foreground">
                        Welcome to our online pharmacy and wellness store. We are committed to
                        providing high-quality healthcare, beauty, and wellness products that
                        help you live healthier every day. Our platform combines trusted
                        products, convenient delivery, and reliable customer service to
                        create a seamless shopping experience.
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <div className="mb-4 text-primary">
                                {item.icon}
                            </div>

                            <h4 className="font-semibold mb-2">
                                {item.title}
                            </h4>

                            <p className="text-sm text-muted-foreground">
                                {item.desc}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Slogan;