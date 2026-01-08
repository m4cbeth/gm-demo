export interface AssessmentAnswers {
    relationshipLength: string;
    knowsSuccessor: string;
    discussedPlan: string;
    advisorAge: string;
    practiceStructure: string;
    metTeamMembers: string;
    complexity: string;
}

export interface RiskAnalysis {
    score: number;
    level: 'Low' | 'Moderate' | 'High';
    summary: string;
    gaps: string[];
    recommendations: string[];
}

// Scoring weights (higher weight = more impact on risk)
const WEIGHTS = {
    relationshipLength: 10,
    knowsSuccessor: 25, // Heavily weighted
    discussedPlan: 20, // Heavily weighted
    advisorAge: 15,
    practiceStructure: 15, // Heavily weighted
    metTeamMembers: 10,
    complexity: 5,
};

export function calculateRiskScore(answers: AssessmentAnswers): RiskAnalysis {
    let totalScore = 0;
    const gaps: string[] = [];
    const recommendations: string[] = [];

    // Question 1: Relationship Length
    const relationshipScores: Record<string, number> = {
        'Less than 1 year': 20,
        '1-3 years': 15,
        '3-5 years': 10,
        '5-10 years': 5,
        '10+ years': 0,
    };
    totalScore += relationshipScores[answers.relationshipLength] || 0;

    // Question 2: Knows Successor (Heavily Weighted)
    const successorScores: Record<string, number> = {
        "Yes, I've met them and feel confident": 0,
        "Yes, but I haven't met them": 20,
        "I've heard there's a plan but don't know details": 50,
        'No/Not sure': 80,
    };
    const successorScore = successorScores[answers.knowsSuccessor] || 0;
    totalScore += (successorScore * WEIGHTS.knowsSuccessor) / 25;
    if (answers.knowsSuccessor !== "Yes, I've met them and feel confident") {
        gaps.push("You haven't met your advisor's successor or aren't confident in the transition plan");
    }

    // Question 3: Discussed Plan (Heavily Weighted)
    const planScores: Record<string, number> = {
        'Yes, in detail': 0,
        'Briefly mentioned': 30,
        "No, I don't recall": 70,
    };
    const planScore = planScores[answers.discussedPlan] || 0;
    totalScore += (planScore * WEIGHTS.discussedPlan) / 25;
    if (answers.discussedPlan !== 'Yes, in detail') {
        gaps.push('Your advisor has not fully discussed their succession plan with you');
    }

    // Question 4: Advisor Age
    const ageScores: Record<string, number> = {
        'Under 40': 0,
        '40-50': 5,
        '50-60': 20,
        '60+': 40,
        "I don't know": 25,
    };
    totalScore += ageScores[answers.advisorAge] || 0;

    // Question 5: Practice Structure (Heavily Weighted)
    const structureScores: Record<string, number> = {
        'Solo practitioner': 60,
        'Small team (2-3 people)': 30,
        'Established team (4+ people)': 10,
        'Part of a larger firm': 5,
    };
    const structureScore = structureScores[answers.practiceStructure] || 0;
    totalScore += (structureScore * WEIGHTS.practiceStructure) / 25;
    if (answers.practiceStructure === 'Solo practitioner') {
        gaps.push('Your advisor operates as a solo practitioner, which increases transition risk');
    }

    // Question 6: Met Team Members
    const teamScores: Record<string, number> = {
        'Yes, multiple people': 0,
        'Yes, one other person': 15,
        'No, just my main advisor': 40,
    };
    totalScore += teamScores[answers.metTeamMembers] || 0;
    if (answers.metTeamMembers === 'No, just my main advisor') {
        gaps.push("You haven't met other team members who could support your account");
    }

    // Question 7: Complexity
    const complexityScores: Record<string, number> = {
        'Straightforward (single accounts, simple planning)': 0,
        'Moderate (multiple accounts, some estate planning)': 10,
        'Complex (business interests, trusts, extensive estate planning)': 25,
    };
    totalScore += complexityScores[answers.complexity] || 0;

    // Normalize to 0-100 scale
    const normalizedScore = Math.min(100, Math.max(0, totalScore));

    // Determine risk level
    let level: 'Low' | 'Moderate' | 'High';
    if (normalizedScore <= 33) {
        level = 'Low';
    } else if (normalizedScore <= 66) {
        level = 'Moderate';
    } else {
        level = 'High';
    }

    // Generate summary
    let summary = '';
    if (level === 'Low') {
        summary = 'Your succession risk is relatively low. You have a good understanding of your advisor\'s transition plan and team structure. However, it\'s still important to maintain regular communication about succession planning as circumstances can change.';
    } else if (level === 'Moderate') {
        summary = 'Your succession risk is moderate. While you may have some awareness of succession planning, there are gaps in your knowledge or your advisor\'s preparation that could create challenges during a transition. Taking proactive steps now can help protect your financial future.';
    } else {
        summary = 'Your succession risk is high. There are significant gaps in succession planning that could seriously disrupt your financial management if your advisor retires or leaves unexpectedly. Immediate action is recommended to address these concerns.';
    }

    // Generate recommendations based on gaps and answers
    if (answers.knowsSuccessor === 'No/Not sure' || answers.knowsSuccessor === "I've heard there's a plan but don't know details") {
        recommendations.push('Ask your advisor to introduce you to their designated successor and schedule a meeting to discuss your account');
    }
    if (answers.discussedPlan === "No, I don't recall" || answers.discussedPlan === 'Briefly mentioned') {
        recommendations.push('Request a detailed conversation about your advisor\'s succession plan, including timeline, transition process, and how your account will be managed');
    }
    if (answers.practiceStructure === 'Solo practitioner') {
        recommendations.push('Discuss with your advisor what arrangements they have in place for client continuity, and consider asking about backup advisors or firm partnerships');
    }
    if (answers.metTeamMembers === 'No, just my main advisor') {
        recommendations.push('Request introductions to other team members who may be involved in managing your account, especially if your advisor is unavailable');
    }

    // Add general recommendations
    if (level === 'High' || level === 'Moderate') {
        recommendations.push('Document your current financial strategy and key relationships so you have a clear record if a transition occurs');
        recommendations.push('Consider scheduling an annual review of succession planning as part of your regular financial check-ins');
    }

    return {
        score: Math.round(normalizedScore),
        level,
        summary,
        gaps,
        recommendations,
    };
}

