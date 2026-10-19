import {
  Users, Briefcase, Compass, Wallet, GraduationCap, Target, FileText, Handshake, Building2, Puzzle,
  type LucideIcon,
} from "lucide-react";

export const serviceCategories = ["Corporate HR Solutions", "Career & Professional Development", "Graduate & Student Services", "Professional Documents", "Career Packages"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];

export type Audience = "Business" | "Individual";
export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  orderLabel?: string;
  packageLabel?: string;
  audience: Audience[];
  icon: LucideIcon;
  short: string;
  problems: string[];
  deliverables: string[];
  provide: string[];
  whatsapp: string;
  price: string; // "Request a Quote" until confirmed
  faqs: { q: string; a: string }[];
  enabled: boolean;
}

const quote = "Request a Quote";
const commonFaq = [
  { q: "How is pricing determined?", a: "Pricing depends on the scope of your requirements. We discuss scope with you first and share a quote before any engagement." },
  { q: "Do I pay when I submit a request?", a: "No. Submitting a request is free. No payment is collected on this website." },
];

type CareerDefinition = Pick<Service, "slug" | "name" | "category" | "short" | "deliverables" | "provide"> & Partial<Pick<Service, "orderLabel" | "packageLabel">>;
const careerDefinitions: CareerDefinition[] = [
  { slug: "cover-letter", name: "Cover Letter Writing", category: serviceCategories[1], short: "Personalized cover letters tailored to a specific vacancy, employer or industry.", deliverables: ["Customized cover letter", "Editable copy"], provide: ["Target vacancy or employer", "Current CV"] },
  { slug: "linkedin-optimization", name: "LinkedIn Profile Optimization", category: serviceCategories[1], short: "Make your skills, achievements and experience more visible to recruiters.", deliverables: ["Headline", "About section", "Experience descriptions", "Profile recommendations"], provide: ["Current profile", "Target roles", "Key achievements"] },
  { slug: "interview-preparation", name: "Interview Preparation & Mock Interviews", category: serviceCategories[1], short: "Prepare for HR, technical, competency-based and panel interviews.", deliverables: ["Practice interview", "Feedback", "Sample questions", "Suggested answers"], provide: ["Target role", "Interview format", "Current CV"] },
  { slug: "job-search-assistance", name: "Job Search Assistance", category: serviceCategories[1], short: "Identify relevant vacancies, improve applications and organize your job search.", deliverables: ["Job-search strategy", "Vacancy research", "Application tracking template"], provide: ["Preferred roles and locations", "Current CV"] },
  { slug: "career-planning", name: "Career Guidance & Career Planning", category: serviceCategories[1], short: "Explore suitable career paths based on your qualifications, skills, interests and goals.", deliverables: ["Career consultation", "Skills assessment", "Personalized career development plan"], provide: ["Qualifications and experience", "Interests and career goals"] },
  { slug: "portfolio-development", name: "Professional Portfolio Development", category: serviceCategories[3], short: "Present your work professionally as a designer, developer, engineer, photographer or other specialist.", deliverables: ["Portfolio document", "Project descriptions", "Case studies or a personal portfolio website, as agreed"], provide: ["Work samples you have permission to share", "Project details", "Preferred portfolio format"] },
  { slug: "professional-documents", name: "Professional Document Writing", category: serviceCategories[3], short: "Prepare professional workplace and career documents based on your real experience.", deliverables: ["Resignation letters", "Professional bios", "Application letters", "Recommendation-letter drafts", "Expressions of interest"], provide: ["Document purpose", "Accurate background details"] },
  { slug: "workplace-readiness", name: "Workplace Readiness Training", category: serviceCategories[2], short: "Prepare graduates and entry-level candidates for professional employment.", deliverables: ["Workplace etiquette", "Communication skills", "Teamwork", "Professional conduct", "Workplace expectations training"], provide: ["Career stage", "Training goals"] },
  { slug: "application-review", name: "Application Document Review", category: serviceCategories[3], short: "Review CVs, application letters, personal statements and other documents before submission.", deliverables: ["Corrections", "Feedback", "Formatting improvements", "Revised version"], provide: ["Documents to review", "Application requirements", "Submission deadline"] },
  { slug: "internship-attachment", name: "Internship & Attachment Application Support", category: serviceCategories[2], short: "Prepare applications for internships and industrial attachments.", deliverables: ["Application preparation", "Internship and attachment document support"], provide: ["Study programme", "Target placement", "Application requirements"] },
  { slug: "graduate-career-starter", name: "Graduate Career Starter Package", category: serviceCategories[2], short: "Start your job search with coordinated documents and preparation.", deliverables: ["CV", "Cover letter", "Interview preparation", "Job-search guidance"], provide: ["Qualifications", "Target roles", "Current documents"] },
  { slug: "executive-cv", name: "Executive CV Writing", category: serviceCategories[1], short: "Senior-level CVs emphasizing leadership, measurable results and strategic experience.", deliverables: ["Executive CV", "Leadership and strategic experience positioning"], provide: ["Leadership experience", "Verified results", "Target roles"] },
  { slug: "ats-optimization", name: "CV ATS Optimization", category: serviceCategories[3], short: "Improve CV structure and relevant terminology for applicant tracking systems.", deliverables: ["CV structure review", "Relevant terminology improvements", "Optimized CV"], provide: ["Current CV", "Target vacancy"] },
  { slug: "salary-negotiation", name: "Salary Negotiation Coaching", category: serviceCategories[1], short: "Prepare to negotiate salary, benefits and employment offers.", deliverables: ["Salary negotiation guidance", "Benefits and employment offer discussion"], provide: ["Offer details", "Priorities"] },
  { slug: "career-advancement", name: "Promotion & Career Advancement Coaching", category: serviceCategories[1], short: "Support professionals seeking promotion or career progression.", deliverables: ["Career progression guidance", "Promotion preparation"], provide: ["Current role", "Career goals"] },
  { slug: "personal-branding", name: "Personal Branding", category: serviceCategories[1], short: "Develop a professional identity grounded in your experience and goals.", deliverables: ["Professional biography", "Online profile", "Personal brand strategy"], provide: ["Background and achievements", "Current online profiles", "Professional goals"] },
  { slug: "freelance-profile", name: "Freelance Profile Optimization", category: serviceCategories[1], short: "Improve your professional profile on legitimate freelancing platforms.", deliverables: ["Profile review", "Profile content improvements"], provide: ["Current profile", "Services and work samples"] },
  { slug: "scholarship-internship", name: "Scholarship & Internship Application Support", category: serviceCategories[2], short: "Prepare application documents and personal statements for scholarships and internships.", deliverables: ["Application document support", "Personal statement preparation or review"], provide: ["Application requirements", "Actual qualifications and experience"] },
  { slug: "career-change", name: "Career Change Support", category: serviceCategories[1], short: "Identify transferable skills and prepare for a different industry.", deliverables: ["Transferable skills assessment", "Career-change preparation"], provide: ["Current experience", "Target industry"] },
  { slug: "reference-profile", name: "Reference & Professional Profile Preparation", category: serviceCategories[3], short: "Organize legitimate professional references and profile information.", deliverables: ["Professional reference organization", "Professional profile preparation"], provide: ["Reference contacts with permission", "Accurate profile information"] },
  { slug: "graduate-workshops", name: "Graduate Employability Workshops", category: serviceCategories[2], short: "Group sessions for graduates preparing to enter the job market.", deliverables: ["Graduate employability group sessions", "Job-market preparation"], provide: ["Group size", "Graduate backgrounds", "Training priorities"] },
  { slug: "cv-essentials", name: "CV Essentials", category: serviceCategories[4], short: "For students, fresh graduates and job seekers who need a professional CV.", deliverables: ["Professional CV writing or redesign", "PDF and editable copy", "Basic formatting and proofreading"], provide: ["Current CV or career background", "Target roles and career goals"], packageLabel: "Entry-level", orderLabel: "Order CV Essentials" },
  { slug: "job-application-package", name: "Job Application Package", category: serviceCategories[4], short: "For applicants actively applying for jobs.", deliverables: ["Professional CV", "Tailored cover letter", "CV and application document review", "Job application guidance"], provide: ["Current CV or career background", "Target roles and career goals"], packageLabel: "Popular option", orderLabel: "Order Job Application Package" },
  { slug: "career-boost", name: "Career Boost Package", category: serviceCategories[4], short: "Improve your documents and interview performance.", deliverables: ["Professional CV", "Cover letter", "LinkedIn profile optimization", "Mock interview session", "Personalized feedback"], provide: ["Current CV or career background", "Target roles and career goals"], packageLabel: "Documents & interviews", orderLabel: "Order Career Boost" },
  { slug: "graduate-launch", name: "Graduate Launch Package", category: serviceCategories[4], short: "For university and college graduates entering the job market.", deliverables: ["Graduate CV", "Internship and attachment application support", "Interview preparation", "Workplace readiness guidance", "Career planning session"], provide: ["Current CV or career background", "Target roles and career goals"], packageLabel: "Graduate entry", orderLabel: "Order Graduate Launch" },
  { slug: "executive-career", name: "Executive Career Package", category: serviceCategories[4], short: "For experienced professionals and managers.", deliverables: ["Executive CV", "LinkedIn optimization", "Professional biography", "Interview and leadership positioning coaching", "Salary negotiation preparation"], provide: ["Current CV or career background", "Target roles and career goals"], packageLabel: "Experienced professionals", orderLabel: "Order Executive Career Package" },
 ];
const careerServices: Service[] = careerDefinitions.map((definition) => ({
  ...definition,
  audience: ["Individual"],
  icon: definition.category === "Career Packages" ? Puzzle : definition.category === "Graduate & Student Services" ? GraduationCap : FileText,
  problems: [definition.short],
  whatsapp: `Hello, I am interested in your ${definition.name} service. Please share the process and a quote.`,
  price: quote,
  faqs: [...commonFaq, { q: "What information is used in my documents?", a: "We use your actual qualifications and experience. We do not fabricate credentials, employment history, references or achievements." }],
  enabled: true,
}));

export const services: Service[] = [
  {
    slug: "recruitment", name: "Recruitment and Talent Acquisition", category: "Corporate HR Solutions", audience: ["Business"], icon: Users,
    short: "Identify, screen, shortlist and recruit suitable candidates for your open positions.",
    problems: ["Hard-to-fill roles", "High volume of unqualified applicants", "Limited internal hiring capacity"],
    deliverables: ["Recruitment planning", "Vacancy advertising", "CV screening", "Candidate shortlisting", "Interview coordination", "Candidate recommendations"],
    provide: ["Job description", "Required qualifications", "Proposed start date", "Salary range (if available)"],
    whatsapp: "Hello, I am interested in your Recruitment and Talent Acquisition service. Please share more information about the process and pricing.",
    price: quote, faqs: commonFaq, enabled: true,
  },
  {
    slug: "staffing", name: "Staffing and Workforce Solutions", category: "Corporate HR Solutions", audience: ["Business"], icon: Briefcase,
    short: "Temporary, contract, project-based or permanent personnel when you need them.",
    problems: ["Seasonal or project demand", "Sudden staff shortages", "Scaling teams quickly"],
    deliverables: ["Workforce requirements assessment", "Candidate sourcing", "Staffing coordination", "Contract or placement administration, where offered"],
    provide: ["Number of staff needed", "Role profiles", "Duration of engagement", "Work location"],
    whatsapp: "Hello, I would like to discuss your Staffing and Workforce Solutions service. Please contact me about my staffing requirements.",
    price: quote, faqs: commonFaq, enabled: true,
  },
  {
    slug: "hr-consultancy", name: "HR Consultancy", category: "Corporate HR Solutions", audience: ["Business"], icon: Compass,
    short: "Professional guidance to improve HR processes and employee management.",
    problems: ["Outdated or missing HR policies", "Unclear structures and roles", "Employee relations challenges"],
    deliverables: ["HR policy development", "HR process reviews", "Employee relations guidance", "Performance management frameworks", "Workforce planning", "Organizational structure reviews"],
    provide: ["Current HR policies (if any)", "Organization chart", "Key challenges you face"],
    whatsapp: "Hello, I am interested in HR Consultancy services for my organization. I would like to discuss my requirements and your pricing.",
    price: quote, faqs: commonFaq, enabled: true,
  },
  {
    slug: "payroll", name: "Payroll and HR Administration", category: "Corporate HR Solutions", audience: ["Business"], icon: Wallet,
    short: "Support with payroll processes and employee administration.",
    problems: ["Time-consuming payroll runs", "Scattered employee records", "Leave tracking gaps"],
    deliverables: ["Payroll processing support", "Employee records administration", "Leave and attendance administration", "HR reporting", "Payroll compliance coordination"],
    provide: ["Number of employees", "Pay frequency", "Current payroll process"],
    whatsapp: "Hello, I would like more information about your Payroll and HR Administration services.",
    price: quote, faqs: [...commonFaq, { q: "Do you file statutory returns?", a: "The exact scope of compliance support is agreed during consultation." }], enabled: true,
  },
  {
    slug: "training", name: "Employee Training and Development", category: "Corporate HR Solutions", audience: ["Business"], icon: GraduationCap,
    short: "Structured programmes that build workforce capability.",
    problems: ["Skills gaps", "New managers without leadership support", "Low engagement"],
    deliverables: ["Training needs assessment", "Employee development planning", "Leadership development", "Workplace skills training", "Training coordination"],
    provide: ["Team size", "Skill areas of interest", "Preferred format and dates"],
    whatsapp: "Hello, I would like to inquire about Employee Training and Development services.",
    price: quote, faqs: commonFaq, enabled: true,
  },
  {
    slug: "performance", name: "Performance Management", category: "Corporate HR Solutions", audience: ["Business"], icon: Target,
    short: "Effective evaluation and improvement processes for your people.",
    problems: ["Inconsistent appraisals", "Unclear targets", "Underperformance without a plan"],
    deliverables: ["Performance review frameworks", "KPI development", "Appraisal templates", "Performance improvement planning"],
    provide: ["Current appraisal approach", "Departments in scope", "Business goals"],
    whatsapp: "Hello, I would like to learn more about your Performance Management service.",
    price: quote, faqs: commonFaq, enabled: true,
  },
  {
    slug: "cv-writing", name: "Professional CV Writing & Redesign", category: "Career & Professional Development", audience: ["Individual"], icon: FileText,
    short: "Create a new CV or improve an existing one to highlight your qualifications, experience, skills and achievements.",
    problems: ["CV not getting responses", "Career change", "Interview nerves"],
    deliverables: ["Professional CV", "Redesigned layout", "Editable document and PDF"],
    provide: ["Your current CV", "Target roles", "Key achievements"],
    whatsapp: "Hello, I am interested in your Professional CV Writing & Redesign service. Please share the process and a quote.",
    price: quote, faqs: commonFaq, enabled: true,
  },
  {
    slug: "job-placement", name: "Job Placement", category: "Career & Professional Development", audience: ["Individual"], icon: Handshake,
    short: "Connecting suitable candidates with relevant employment opportunities.",
    problems: ["Finding the right openings", "Navigating application processes"],
    deliverables: ["Candidate profiling", "Matching with suitable vacancies", "Application guidance", "Interview preparation"],
    provide: ["Updated CV", "Preferred roles and locations", "Availability"],
    whatsapp: "Hello, I would like to inquire about your Job Placement service and the process for candidates.",
    price: quote, faqs: [...commonFaq, { q: "Is placement guaranteed?", a: "No. We work to match you with suitable openings, but final hiring decisions rest with employers." }], enabled: true,
  },
  {
    slug: "outsourcing", name: "Employee Outsourcing", category: "Corporate HR Solutions", audience: ["Business"], icon: Building2,
    short: "Outsourced staff managed on your behalf, so you can focus on your core business.",
    problems: ["Administrative burden of non-core staff", "Need for flexible headcount"],
    deliverables: ["Requirements assessment", "Staff sourcing", "Ongoing staff administration, where offered"],
    provide: ["Roles to outsource", "Number of staff", "Expected duration"],
    whatsapp: "Hello, I would like to learn more about your Employee Outsourcing service.",
    price: quote, faqs: commonFaq, enabled: true,
  },
  {
    slug: "custom", name: "Customized HR Solutions", category: "Corporate HR Solutions", audience: ["Business", "Individual"], icon: Puzzle,
    short: "Tailored support for HR needs that don't fit a standard package.",
    problems: ["Unique or combined HR needs"],
    deliverables: ["Requirements discussion", "Tailored proposal", "Agreed delivery plan"],
    provide: ["A short description of what you need"],
    whatsapp: "Hello, I would like to discuss a customized HR solution. My requirements are: ",
    price: quote, faqs: commonFaq, enabled: true,
  },
  ...careerServices,
];

export const activeServices = services.filter((s) => s.enabled);
export const getService = (slug: string) => activeServices.find((s) => s.slug === slug);
