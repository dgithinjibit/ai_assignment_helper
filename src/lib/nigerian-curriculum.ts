import { EducationStructure, Subject, TradeSubject, ExamType, LanguageSupport } from '../types/nigerian-education';

// Nigerian Education System Structure (9-3-4)
export const EDUCATION_STRUCTURE: EducationStructure[] = [
  // Basic Education - Primary (6 years)
  { level: 'primary', grade: 'P1', ageRange: '6-7', description: 'Foundation literacy and numeracy' },
  { level: 'primary', grade: 'P2', ageRange: '7-8', description: 'Basic skills development' },
  { level: 'primary', grade: 'P3', ageRange: '8-9', description: 'Core subject introduction' },
  { level: 'primary', grade: 'P4', ageRange: '9-10', description: 'Intermediate primary education' },
  { level: 'primary', grade: 'P5', ageRange: '10-11', description: 'Advanced primary skills' },
  { level: 'primary', grade: 'P6', ageRange: '11-12', description: 'Primary completion preparation' },
  
  // Basic Education - Junior Secondary (3 years)
  { level: 'jss', grade: 'JSS1', ageRange: '12-13', description: 'Junior secondary foundation', keyExams: [] },
  { level: 'jss', grade: 'JSS2', ageRange: '13-14', description: 'Intermediate junior secondary' },
  { level: 'jss', grade: 'JSS3', ageRange: '14-15', description: 'BECE preparation', keyExams: ['BECE'] },
  
  // Senior Secondary (3 years)
  { level: 'sss', grade: 'SSS1', ageRange: '15-16', description: 'Senior secondary foundation' },
  { level: 'sss', grade: 'SSS2', ageRange: '16-17', description: 'Specialization development' },
  { level: 'sss', grade: 'SSS3', ageRange: '17-18', description: 'SSCE & UTME preparation', keyExams: ['WAEC', 'NECO', 'JAMB UTME'] },
];

// Core Subjects (2025 Reformed Curriculum)
export const CORE_SUBJECTS: Subject[] = [
  // Universal Core Subjects
  { id: 'english', name: 'English Studies', category: 'core', levels: ['primary', 'jss', 'sss'], description: 'Communication and literacy skills' },
  { id: 'mathematics', name: 'Mathematics', category: 'core', levels: ['primary', 'jss', 'sss'], description: 'Numerical and analytical skills' },
  { id: 'science', name: 'Basic Science & Technology', category: 'core', levels: ['primary', 'jss'], description: 'Scientific foundation and digital literacy' },
  
  // Reformed 2025 Subjects
  { id: 'citizenship', name: 'Citizenship and Heritage Studies', category: 'core', levels: ['jss', 'sss'], description: 'Merged History, Civic Education, and Social Studies', isNew2025: true },
  { id: 'digital-tech', name: 'Digital Technologies', category: 'core', levels: ['jss', 'sss'], description: 'ICT and digital literacy skills', isNew2025: true },
  
  // Senior Secondary Sciences
  { id: 'physics', name: 'Physics', category: 'core', levels: ['sss'], description: 'Physical sciences and mechanics' },
  { id: 'chemistry', name: 'Chemistry', category: 'core', levels: ['sss'], description: 'Chemical sciences and reactions' },
  { id: 'biology', name: 'Biology', category: 'core', levels: ['sss'], description: 'Life sciences and ecology' },
  
  // Languages
  { id: 'hausa', name: 'Hausa Language', category: 'language', levels: ['primary', 'jss', 'sss'], description: 'Nigerian indigenous language' },
  { id: 'igbo', name: 'Igbo Language', category: 'language', levels: ['primary', 'jss', 'sss'], description: 'Nigerian indigenous language' },
  { id: 'yoruba', name: 'Yoruba Language', category: 'language', levels: ['primary', 'jss', 'sss'], description: 'Nigerian indigenous language' },
  
  // Electives
  { id: 'literature', name: 'Literature in English', category: 'elective', levels: ['sss'], description: 'Literary analysis and appreciation' },
  { id: 'geography', name: 'Geography', category: 'elective', levels: ['sss'], description: 'Physical and human geography' },
  { id: 'economics', name: 'Economics', category: 'elective', levels: ['sss'], description: 'Economic principles and analysis' },
  { id: 'government', name: 'Government', category: 'elective', levels: ['sss'], description: 'Political science and governance' },
];

// New Trade Subjects (2025 Reform Focus)
export const TRADE_SUBJECTS: TradeSubject[] = [
  {
    id: 'solar-pv',
    name: 'Solar PV Installation',
    category: 'trade',
    levels: ['jss', 'sss'],
    description: 'Solar panel installation and maintenance',
    isNew2025: true,
    practicalComponents: ['Panel mounting', 'Electrical connections', 'System testing', 'Maintenance procedures'],
    careerPaths: ['Solar Technician', 'Renewable Energy Specialist', 'Electrical Contractor']
  },
  {
    id: 'fashion-design',
    name: 'Fashion Design & Tailoring',
    category: 'trade',
    levels: ['jss', 'sss'],
    description: 'Clothing design and garment construction',
    practicalComponents: ['Pattern making', 'Cutting techniques', 'Sewing operations', 'Fashion illustration'],
    careerPaths: ['Fashion Designer', 'Tailor', 'Fashion Entrepreneur', 'Textile Artist']
  },
  {
    id: 'computer-hardware',
    name: 'Computer Hardware & GSM Repairs',
    category: 'trade',
    levels: ['jss', 'sss'],
    description: 'Computer and mobile device repair',
    isNew2025: true,
    practicalComponents: ['Hardware diagnosis', 'Component replacement', 'Software troubleshooting', 'Mobile repair'],
    careerPaths: ['IT Technician', 'Mobile Repair Specialist', 'Computer Engineer']
  },
  {
    id: 'livestock-farming',
    name: 'Livestock Farming',
    category: 'trade',
    levels: ['jss', 'sss'],
    description: 'Animal husbandry and farm management',
    practicalComponents: ['Animal care', 'Feed management', 'Disease prevention', 'Farm planning'],
    careerPaths: ['Livestock Farmer', 'Veterinary Assistant', 'Agricultural Entrepreneur']
  },
  {
    id: 'catering',
    name: 'Catering & Hotel Management',
    category: 'trade',
    levels: ['jss', 'sss'],
    description: 'Food service and hospitality management',
    practicalComponents: ['Food preparation', 'Menu planning', 'Customer service', 'Event management'],
    careerPaths: ['Chef', 'Restaurant Manager', 'Event Planner', 'Hospitality Entrepreneur']
  }
];

// Major Examinations in Nigerian System
export const EXAMINATIONS: ExamType[] = [
  {
    id: 'bece',
    name: 'BECE',
    fullName: 'Basic Education Certificate Examination',
    level: 'jss',
    conductedBy: 'NECO/State Examination Boards',
    description: 'Terminal examination for JSS 3 students',
    subjects: ['English', 'Mathematics', 'Basic Science', 'Citizenship Studies', 'Nigerian Language', 'Trade Subject']
  },
  {
    id: 'waec',
    name: 'WAEC SSCE',
    fullName: 'West African Senior School Certificate Examination',
    level: 'sss',
    conductedBy: 'WAEC',
    description: 'Senior secondary certificate examination',
    subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'Geography', 'Economics']
  },
  {
    id: 'neco',
    name: 'NECO SSCE',
    fullName: 'National Examinations Council Senior School Certificate Examination',
    level: 'sss',
    conductedBy: 'NECO',
    description: 'Alternative senior secondary certificate examination',
    subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'Geography', 'Economics']
  },
  {
    id: 'jamb',
    name: 'JAMB UTME',
    fullName: 'Unified Tertiary Matriculation Examination',
    level: 'sss',
    conductedBy: 'JAMB',
    description: 'University admission examination',
    subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'Geography', 'Economics', 'Government']
  }
];

// Nigerian Languages Support
export const NIGERIAN_LANGUAGES: LanguageSupport[] = [
  { code: 'english', name: 'English', nativeName: 'English', regions: ['National'] },
  { code: 'hausa', name: 'Hausa', nativeName: 'Harshen Hausa', regions: ['Northern Nigeria', 'Middle Belt'] },
  { code: 'igbo', name: 'Igbo', nativeName: 'Asụsụ Igbo', regions: ['South East', 'South South'] },
  { code: 'yoruba', name: 'Yoruba', nativeName: 'Èdè Yorùbá', regions: ['South West', 'Middle Belt'] }
];

// Nigerian States (for university/scholarship filtering)
export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT Abuja'
];

// Sample Universities Data (Nigerian Context)
export const SAMPLE_UNIVERSITIES = [
  {
    id: 'ui',
    name: 'University of Ibadan',
    state: 'Oyo',
    type: 'federal' as const,
    established: 1948,
    courses: [
      {
        id: 'medicine',
        name: 'Medicine and Surgery',
        faculty: 'College of Medicine',
        jambSubjects: ['English', 'Biology', 'Chemistry', 'Physics'],
        sscRequirements: ['English (Credit)', 'Mathematics (Credit)', 'Biology (Credit)', 'Chemistry (Credit)', 'Physics (Credit)'],
        cutoffMark: 350,
        duration: '6 years'
      },
      {
        id: 'engineering',
        name: 'Electrical Engineering',
        faculty: 'Faculty of Technology',
        jambSubjects: ['English', 'Mathematics', 'Physics', 'Chemistry'],
        sscRequirements: ['English (Credit)', 'Mathematics (Credit)', 'Physics (Credit)', 'Chemistry (Credit)', 'Further Mathematics (Credit)'],
        cutoffMark: 280,
        duration: '5 years'
      }
    ]
  },
  {
    id: 'unn',
    name: 'University of Nigeria, Nsukka',
    state: 'Enugu',
    type: 'federal' as const,
    established: 1960,
    courses: [
      {
        id: 'computer-science',
        name: 'Computer Science',
        faculty: 'Faculty of Physical Sciences',
        jambSubjects: ['English', 'Mathematics', 'Physics', 'Chemistry'],
        sscRequirements: ['English (Credit)', 'Mathematics (Credit)', 'Physics (Credit)', 'Chemistry (Credit)'],
        cutoffMark: 250,
        duration: '4 years'
      }
    ]
  },
  {
    id: 'unilag',
    name: 'University of Lagos',
    state: 'Lagos',
    type: 'federal' as const,
    established: 1962,
    courses: [
      {
        id: 'law',
        name: 'Law',
        faculty: 'Faculty of Law',
        jambSubjects: ['English', 'Literature', 'Government', 'Economics'],
        sscRequirements: ['English (Credit)', 'Mathematics (Credit)', 'Literature (Credit)', 'Government (Credit)', 'Economics (Credit)'],
        cutoffMark: 300,
        duration: '5 years'
      }
    ]
  }
];

// Sample Scholarships (Nigerian Context)
export const SAMPLE_SCHOLARSHIPS = [
  {
    id: 'nddc-scholarship',
    name: 'NDDC Foreign Postgraduate Scholarship',
    provider: 'Niger Delta Development Commission',
    type: 'local' as const,
    eligibility: ['First Class or Second Class Upper', 'From Niger Delta States', 'Below 35 years'],
    deadline: '2025-03-31',
    amount: 'Full funding + stipend',
    description: 'Postgraduate scholarship for students from Niger Delta region'
  },
  {
    id: 'ptf-scholarship',
    name: 'Petroleum Technology Development Fund Scholarship',
    provider: 'PTDF',
    type: 'international' as const,
    eligibility: ['Engineering/Geosciences students', 'First Class or Second Class Upper', 'Nigerian citizen'],
    deadline: '2025-04-15',
    amount: 'Full tuition + living allowance',
    description: 'Overseas scholarship for petroleum-related studies'
  },
  {
    id: 'lagos-state-scholarship',
    name: 'Lagos State Scholarship Board Award',
    provider: 'Lagos State Government',
    type: 'local' as const,
    eligibility: ['Lagos State indigene', 'Minimum of 5 credits in SSCE', 'Financial need'],
    deadline: '2025-05-30',
    amount: '₦200,000 - ₦500,000 per session',
    description: 'State scholarship for indigent students'
  }
];

// Enhanced Trade Skills with Career Pathways
export const ENHANCED_TRADE_SKILLS = [
  {
    id: 'solar-pv',
    name: 'Solar PV Installation & Maintenance',
    category: 'renewable-energy',
    description: 'Complete solar energy systems installation and maintenance',
    modules: [
      'Solar Panel Technology Basics',
      'Electrical Safety & Wiring',
      'System Design & Sizing',
      'Installation Techniques',
      'Maintenance & Troubleshooting',
      'Business & Entrepreneurship'
    ],
    careerPaths: [
      { title: 'Solar Installation Technician', salary: '₦150,000 - ₦300,000/month' },
      { title: 'Renewable Energy Consultant', salary: '₦200,000 - ₦500,000/month' },
      { title: 'Solar Business Owner', salary: '₦300,000+/month' }
    ],
    certifications: ['NABCEP Associate', 'Nigerian Solar Certification'],
    duration: '6 months',
    practicalHours: 200
  },
  {
    id: 'fashion-design',
    name: 'Fashion Design & Garment Production',
    category: 'creative-arts',
    description: 'Complete fashion design and tailoring skills',
    modules: [
      'Fashion Illustration & Design',
      'Pattern Making & Cutting',
      'Sewing Techniques',
      'Fabric Selection & Care',
      'Fashion Business Management',
      'Digital Marketing for Fashion'
    ],
    careerPaths: [
      { title: 'Fashion Designer', salary: '₦100,000 - ₦400,000/month' },
      { title: 'Tailor/Seamstress', salary: '₦80,000 - ₦200,000/month' },
      { title: 'Fashion Entrepreneur', salary: '₦200,000+/month' }
    ],
    certifications: ['Nigerian Fashion Certification', 'International Fashion Design Certificate'],
    duration: '8 months',
    practicalHours: 300
  }
];

// Key Educational Agencies
export const EDUCATIONAL_AGENCIES = {
  FME: 'Federal Ministry of Education',
  NERDC: 'Nigerian Educational Research and Development Council',
  UBEC: 'Universal Basic Education Commission',
  WAEC: 'West African Examinations Council',
  NECO: 'National Examinations Council',
  JAMB: 'Joint Admissions and Matriculation Board',
  NUC: 'National Universities Commission',
  NBTE: 'National Board for Technical Education'
};