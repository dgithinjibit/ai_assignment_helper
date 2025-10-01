// Nigerian Education System Types (9-3-4 Structure)

export type EducationLevel = 'primary' | 'jss' | 'sss' | 'tertiary';

export type PrimaryGrade = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
export type JSSGrade = 'JSS1' | 'JSS2' | 'JSS3';
export type SSSGrade = 'SSS1' | 'SSS2' | 'SSS3';

export interface EducationStructure {
    level: EducationLevel;
    grade: PrimaryGrade | JSSGrade | SSSGrade;
    ageRange: string;
    description: string;
    keyExams?: string[];
}

export interface Subject {
    id: string;
    name: string;
    category: 'core' | 'trade' | 'elective' | 'language';
    levels: EducationLevel[];
    description: string;
    isNew2025?: boolean;
}

export interface TradeSubject extends Subject {
    category: 'trade';
    practicalComponents: string[];
    careerPaths: string[];
}

export interface ExamType {
    id: string;
    name: string;
    fullName: string;
    level: EducationLevel;
    conductedBy: string;
    description: string;
    subjects: string[];
}

export interface University {
    id: string;
    name: string;
    state: string;
    type: 'federal' | 'state' | 'private';
    established: number;
    courses: Course[];
}

export interface Course {
    id: string;
    name: string;
    faculty: string;
    jambSubjects: string[];
    sscRequirements: string[];
    cutoffMark: number;
    duration: string;
}

export interface Scholarship {
    id: string;
    name: string;
    provider: string;
    type: 'local' | 'international';
    eligibility: string[];
    deadline: string;
    amount: string;
    description: string;
}

// Nigerian Languages
export type NigerianLanguage = 'english' | 'hausa' | 'igbo' | 'yoruba';

export interface LanguageSupport {
    code: NigerianLanguage;
    name: string;
    nativeName: string;
    regions: string[];
}

// Enhanced Trade Skills
export interface EnhancedTradeSkill {
    id: string;
    name: string;
    category: string;
    description: string;
    modules: string[];
    careerPaths: CareerPath[];
    certifications: string[];
    duration: string;
    practicalHours: number;
}

export interface CareerPath {
    title: string;
    salary: string;
}

// Learning Progress Tracking
export interface LearningProgress {
    userId: string;
    subjectId: string;
    level: EducationLevel;
    grade: string;
    completedLessons: number;
    totalLessons: number;
    averageScore: number;
    lastAccessed: Date;
}

// Offline Content Support
export interface OfflineContent {
    id: string;
    type: 'video' | 'quiz' | 'document';
    title: string;
    size: number; // in MB
    downloaded: boolean;
    lastUpdated: Date;
}