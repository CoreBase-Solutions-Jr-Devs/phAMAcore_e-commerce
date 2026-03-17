import React, { useState } from "react";

const faqData = [
    {
        question: "How long does delivery take?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet cursus, erat lorem consequat nunc, sed facilisis ligula turpis sit amet lectus."
    },
    {
        question: "Are your products genuine?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a velit at metus gravida elementum quis ut sapien."
    },
    {
        question: "Do you offer returns or exchanges?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed justo vitae elit pharetra viverra."
    },
    {
        question: "Can I consult a pharmacist online?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies velit nec turpis interdum."
    }
];

const FaqSection = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">

                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="mx-auto space-y-4">

                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="border rounded-lg"
                        >

                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium"
                            >
                                {faq.question}
                                <span>
                                    {openIndex === index ? "-" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-4 text-muted-foreground">
                                    {faq.answer}
                                </div>
                            )}

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default FaqSection;