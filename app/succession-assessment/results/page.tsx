'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { assessmentAnswersAtom, isAssessmentCompleteAtom } from '../store';
import { calculateRiskScore, type RiskAnalysis } from '../utils/scoring';

export default function ResultsPage() {
    const answers = useAtomValue(assessmentAnswersAtom);
    const isComplete = useAtomValue(isAssessmentCompleteAtom);

    const analysis = useMemo<RiskAnalysis | null>(() => {
        if (!isComplete) return null;
        return calculateRiskScore(answers);
    }, [answers, isComplete]);

    if (!analysis || !isComplete) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        Assessment Results
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Unable to load results. Please complete the assessment again.
                    </p>
                    <Link
                        href="/succession-assessment#start"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retake Assessment
                    </Link>
                </div>
            </div>
        );
    }

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'Low':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'Moderate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'High':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getScoreColor = (score: number) => {
        if (score <= 33) return 'text-green-600';
        if (score <= 66) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="w-full min-h-screen font-sans bg-white">
            <main className="w-full">
                {/* Hero Section */}
                <section className="bg-linear-to-br from-blue-600 to-blue-800 py-16 sm:py-20 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            Your Succession Risk Assessment
                        </h1>
                        <div className={`inline-block px-7 py-4 rounded-full border-2 font-semibold text-3xl ${getRiskColor(analysis.level)}`}>
                            {analysis.level} Risk
                        </div>
                    </div>
                </section>

                {/* Score Display */}
                {/* <section className="bg-white py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gray-50 rounded-2xl p-8 text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Your Risk Score
                            </h2>
                            <div className={`text-6xl sm:text-7xl font-bold mb-2 ${getScoreColor(analysis.score)}`}>
                                {analysis.score}
                            </div>
                            <p className="text-lg text-gray-600">
                                out of 100
                            </p>
                            <div className="mt-6 w-full bg-gray-200 rounded-full h-4 max-w-md mx-auto">
                                <div
                                    className={`h-4 rounded-full transition-all ${analysis.score <= 33
                                            ? 'bg-green-600'
                                            : analysis.score <= 66
                                                ? 'bg-yellow-600'
                                                : 'bg-red-600'
                                        }`}
                                    style={{ width: `${analysis.score}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* Summary */}
                <section className="bg-blue-50 py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                                Assessment Summary
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {analysis.summary}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Gaps Identified */}
                {analysis.gaps.length > 0 && (
                    <section className="bg-white py-12">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                                Key Gaps Identified
                            </h2>
                            <div className="space-y-4">
                                {analysis.gaps.map((gap, index) => (
                                    <div
                                        key={index}
                                        className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm"
                                    >
                                        <p className="text-gray-700">{gap}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Recommendations */}
                <section className="bg-blue-50/90 py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                            Recommended Actions
                        </h2>
                        <div className="space-y-4">
                            {analysis.recommendations.length > 0 ? (
                                analysis.recommendations.map((recommendation, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm"
                                    >
                                        <p className="text-gray-700">{recommendation}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
                                    <p className="text-gray-700">
                                        No immediate actions required. Continue to monitor and periodically review your succession arrangements with your advisor to ensure they remain aligned with your needs.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Educational Points */}
                <section className="bg-white py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
                            What Good Succession Planning Looks Like
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 rounded-xl p-6 shadow-lg border border-black">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Clear Communication
                                </h3>
                                <p className="text-gray-700">
                                    Your advisor should proactively discuss their succession plan, introduce you to their successor, and provide a clear timeline for any transitions.
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-6 shadow-lg border border-black">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Team Familiarity
                                </h3>
                                <p className="text-gray-700">
                                    Multiple team members should be familiar with your account and financial situation, ensuring continuity even if your primary advisor is unavailable.
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-6 shadow-lg border border-black">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Documented Processes
                                </h3>
                                <p className="text-gray-700">
                                    A well-structured practice should have documented procedures for account transitions, client communication, and maintaining service quality during changes.
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-6 shadow-lg border border-black">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Ongoing Review
                                </h3>
                                <p className="text-gray-700">
                                    Succession planning should be reviewed regularly, not just when retirement is imminent. This ensures plans remain current and effective.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                    <div className="max-w-md mx-auto mt-10 text-center">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                            Get a Personalized<br />
                            Succession Plan Information Package<br />
                            Sent to Your Email
                        </h3>
                        <form
                            className="flex flex-col items-center gap-3"
                            onSubmit={e => {
                                e.preventDefault();
                                // Optional: Implement email submit logic here, e.g., call API or show thank you message
                                alert('This functionality is not in the scope of this demo.');
                            }}
                        >
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="text-black flex-1 px-4 py-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                name="succession-info-email"
                                autoComplete="email"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Send Me the Package
                            </button>
                        </form>
                    </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-linear-to-br from-blue-600 to-blue-800 py-16">
                    <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to Discuss Your Results?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Schedule a consultation to discuss your succession risk and develop a plan to protect your financial future.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-block bg-white border-5 border-blue-400  hover:bg-gray-100 text-blue-600 font-bold py-4 px-10 rounded-lg transition-colors duration-200 shadow-lg text-lg"
                            >
                                Schedule Consultation
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

