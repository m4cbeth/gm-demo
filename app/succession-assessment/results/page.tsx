'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { calculateRiskScore, type RiskAnalysis, type AssessmentAnswers } from '../utils/scoring';

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
    const [answers, setAnswers] = useState<AssessmentAnswers | null>(null);

    useEffect(() => {
        const answersData: AssessmentAnswers = {
            relationshipLength: searchParams.get('relationshipLength') || '',
            knowsSuccessor: searchParams.get('knowsSuccessor') || '',
            discussedPlan: searchParams.get('discussedPlan') || '',
            advisorAge: searchParams.get('advisorAge') || '',
            practiceStructure: searchParams.get('practiceStructure') || '',
            metTeamMembers: searchParams.get('metTeamMembers') || '',
            complexity: searchParams.get('complexity') || '',
        };

        // Validate that we have all answers
        const hasAllAnswers = Object.values(answersData).every((value) => value !== '');

        if (hasAllAnswers) {
            setAnswers(answersData);
            const result = calculateRiskScore(answersData);
            setAnalysis(result);
        }
    }, [searchParams]);

    if (!analysis || !answers) {
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
                <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 sm:py-20 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                            Your Succession Risk Assessment
                        </h1>
                        <div className={`inline-block px-6 py-3 rounded-full border-2 font-semibold text-lg ${getRiskColor(analysis.level)}`}>
                            {analysis.level} Risk
                        </div>
                    </div>
                </section>

                {/* Score Display */}
                <section className="bg-white py-12">
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
                </section>

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
                                        className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
                                    >
                                        <p className="text-gray-700">{gap}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Recommendations */}
                <section className="bg-gray-50 py-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                            Recommended Actions
                        </h2>
                        <div className="space-y-4">
                            {analysis.recommendations.map((recommendation, index) => (
                                <div
                                    key={index}
                                    className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm"
                                >
                                    <p className="text-gray-700">{recommendation}</p>
                                </div>
                            ))}
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
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Clear Communication
                                </h3>
                                <p className="text-gray-700">
                                    Your advisor should proactively discuss their succession plan, introduce you to their successor, and provide a clear timeline for any transitions.
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Team Familiarity
                                </h3>
                                <p className="text-gray-700">
                                    Multiple team members should be familiar with your account and financial situation, ensuring continuity even if your primary advisor is unavailable.
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Documented Processes
                                </h3>
                                <p className="text-gray-700">
                                    A well-structured practice should have documented procedures for account transitions, client communication, and maintaining service quality during changes.
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Ongoing Review
                                </h3>
                                <p className="text-gray-700">
                                    Succession planning should be reviewed regularly, not just when retirement is imminent. This ensures plans remain current and effective.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
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
                                className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-10 rounded-lg transition-colors duration-200 shadow-lg text-lg"
                            >
                                Schedule Consultation
                            </Link>
                            <Link
                                href="/succession-assessment#start"
                                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-10 rounded-lg transition-colors duration-200 shadow-lg text-lg"
                            >
                                Retake Assessment
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

