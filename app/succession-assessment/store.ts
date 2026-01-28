import { atom } from 'jotai';
import type { AssessmentAnswers } from './utils/scoring';

// Initial empty state for assessment answers
const initialAnswers: AssessmentAnswers = {
    relationshipLength: '',
    knowsSuccessor: '',
    discussedPlan: '',
    advisorAge: '',
    practiceStructure: '',
    metTeamMembers: '',
    complexity: '',
};

// Atom to store the assessment answers
export const assessmentAnswersAtom = atom<AssessmentAnswers>(initialAnswers);

// Derived atom to check if all answers are complete
export const isAssessmentCompleteAtom = atom((get) => {
    const answers = get(assessmentAnswersAtom);
    return Object.values(answers).every((value) => value !== '');
});
