import Link from "next/link";
import AssessmentForm from "./AssessmentForm";

export default function SuccessionAssessment() {
    return (
        <div className="w-full min-h-screen font-sans bg-white">
            <main className="w-full">
                {/* Hero Section */}
                <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-linear-to-br from-blue-600 to-blue-800">
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Text Content */}
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                            Succession Risk Assessment
                        </h1>
                        <p className="text-xl font-thin sm:text-2xl md:text-3xl text-white/90  max-w-3xl mx-auto drop-shadow-md mb-8">
                            Is your financial advisor's retirement <br/> putting <span className="italic font-light">your</span> retirement at risk?
                        </p>
                        <a
                            href="#start"
                            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-10 rounded-lg transition-colors duration-200 shadow-xl text-lg sm:text-xl"
                        >
                            Start Your Assessment
                        </a>
                    </div>
                </section>

                {/* Why It Matters Section */}
                <section className="bg-linear-to-b md:bg-linear-to-r from-red-400 to-blue-300 py-16 sm:py-20 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 ">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                                Why Succession Planning Matters
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
                                Your financial advisor's retirement shouldn't disrupt yours. Without proper succession planning, your financial future could be left in limbo.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-red-200 border-2 border-red-500 rounded-xl p-8 shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    The Risk
                                </h3>
                                <p className="text-lg text-gray-700">
                                    Many financial advisors lack a clear succession plan. When they retire unexpectedly or face health issues, clients can experience service disruptions, relationship gaps, and uncertainty about their financial future.
                                </p>
                            </div>

                            <div className="bg-blue-200 border-2 border-blue-500 rounded-xl p-8 shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                    The Solution
                                </h3>
                                <p className="text-lg text-gray-700">
                                    A well-structured succession plan ensures continuity of service, maintains your trusted relationships, and protects your financial strategy—no matter what happens to your advisor.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What You'll Learn Section */}
                <section className="bg-blue-100 py-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-12 text-center">
                            What You'll Discover
                        </h2>

                        <div className="space-y-6 mb-12">
                            <div className="bg-white border border-black rounded-xl p-6 shadow-md flex items-start gap-4">
                                <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Your Current Risk Level
                                    </h3>
                                    <p className="text-gray-700">
                                        Understand how vulnerable your financial plan is to advisor transitions.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white border border-black rounded-xl p-6 shadow-md flex items-start gap-4">
                                <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Key Questions to Ask
                                    </h3>
                                    <p className="text-gray-700">
                                        Learn the critical questions you should be asking your advisor about their succession plan.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white border border-black rounded-xl p-6 shadow-md flex items-start gap-4">
                                <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Actionable Recommendations
                                    </h3>
                                    <p className="text-gray-700">
                                        Receive personalized guidance on how to protect your financial future.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Assessment Form */}
                <AssessmentForm />
            </main>
        </div>
    );
}

