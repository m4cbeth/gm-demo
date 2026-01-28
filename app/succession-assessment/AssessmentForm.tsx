'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { assessmentAnswersAtom } from './store';
import type { AssessmentAnswers } from './utils/scoring';

export default function AssessmentForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useAtom(assessmentAnswersAtom);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const questions = [
        {
            id: 'relationshipLength',
            question: 'How long have you worked with your current financial advisor?',
            options: [
                'Less than 1 year',
                '1-3 years',
                '3-5 years',
                '5-10 years',
                '10+ years',
            ],
        },
        {
            id: 'knowsSuccessor',
            question: 'Do you know who would manage your portfolio if your advisor retired or left unexpectedly?',
            options: [
                "Yes, I've met them and feel confident",
                "Yes, but I haven't met them",
                "I've heard there's a plan but don't know details",
                'No/Not sure',
            ],
        },
        {
            id: 'discussedPlan',
            question: 'Has your advisor explicitly discussed their succession plan with you?',
            options: [
                'Yes, in detail',
                'Briefly mentioned',
                "No, I don't recall",
            ],
        },
        {
            id: 'advisorAge',
            question: "What is your advisor's approximate age?",
            options: [
                'Under 40',
                '40-50',
                '50-60',
                '60+',
                "I don't know",
            ],
        },
        {
            id: 'practiceStructure',
            question: "How would you describe your advisor's practice structure?",
            options: [
                'Solo practitioner',
                'Small team (2-3 people)',
                'Established team (4+ people)',
                'Part of a larger firm',
            ],
        },
        {
            id: 'metTeamMembers',
            question: 'Have you met other advisors/team members who are familiar with your financial situation?',
            options: [
                'Yes, multiple people',
                'Yes, one other person',
                'No, just my main advisor',
            ],
        },
        {
            id: 'complexity',
            question: 'How complex is your financial situation?',
            options: [
                'Straightforward (single accounts, simple planning)',
                'Moderate (multiple accounts, some estate planning)',
                'Complex (business interests, trusts, extensive estate planning)',
            ],
        },
    ];

    const handleChange = (value: string) => {
        const questionId = questions[currentStep].id;
        setFormData((prev) => ({ ...prev, [questionId]: value }));
        setErrors((prev) => ({ ...prev, [questionId]: '' }));
    };

    const validateStep = (): boolean => {
        const questionId = questions[currentStep].id;
        if (!formData[questionId as keyof AssessmentAnswers]) {
            setErrors((prev) => ({
                ...prev,
                [questionId]: 'Please select an option to continue',
            }));
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                handleSubmit();
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        if (!validateStep()) return;

        // Navigate to results - answers are already stored in the atom
        router.push('/succession-assessment/results');
    };

    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div id="start" className="bg-white py-16 sm:py-20 md:py-24 scroll-mt-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Question {currentStep + 1} of {questions.length}
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                            {questions[currentStep].question}
                        </h2>

                        {/* Options */}
                        <div className="space-y-3">
                            {questions[currentStep].options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData[questions[currentStep].id as keyof AssessmentAnswers] === option
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={questions[currentStep].id}
                                        value={option}
                                        checked={formData[questions[currentStep].id as keyof AssessmentAnswers] === option}
                                        onChange={() => handleChange(option)}
                                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="ml-3 text-lg text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>

                        {errors[questions[currentStep].id] && (
                            <p className="mt-4 text-sm text-red-600">
                                {errors[questions[currentStep].id]}
                            </p>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between gap-4">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${currentStep === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                        >
                            {currentStep === questions.length - 1 ? 'View Results' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

