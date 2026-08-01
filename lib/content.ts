import {
  Github,
  Linkedin,
  Code2,
  Mail,
  SiPython,
  SiFastapi,
  SiSpringboot,
  SiFlask,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiTensorflow,
  SiScikitlearn,
  SiHtml5,
  SiGit,
  SiGithub,
  SiPostman,
  Brain,
  Sparkles,
  Cpu,
  Database,
  Code,
  Layers,
  Wrench,
  Coffee,
  Monitor,
  type IconType,
} from '@/lib/icons';

export const profile = {
  name: 'Gokulakrishnan S',
  firstName: 'Gokulakrishnan',
  role: 'AI Engineer | Machine Learning Developer | Backend Developer',
  tagline: 'Building intelligent solutions for real-world problems.',
  location: 'Karur, Tamil Nadu',
  email: 'gokulakrishn06@gmail.com',
  phone: '6369582878',
  college: 'VSB Engineering College',
  cgpa: '7.7',
  batch: '2023 – 2027',
  resumeUrl: '/Gokulakrishnan_Resume.pdf',
  githubUsername: 'gokulakrishnan-s',
  leetcodeUsername: 'gokulakrishnan_s',
};

export const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/gokulakrishnan-s',
    icon: Github,
    color: '#ffffff',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gokulakrishnan-s',
    icon: Linkedin,
    color: '#0A66C2',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/gokulakrishnan_s',
    icon: Code2,
    color: '#FFA116',
  },
  {
    label: 'Email',
    href: 'mailto:gokulakrishn06@gmail.com',
    icon: Mail,
    color: '#22d3ee',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const about = {
  title: 'About Me',
  paragraphs: [
    "I'm a final-year Computer Science and Engineering (AI & ML) student at VSB Engineering College, Karur, with a CGPA of 7.7. I'm passionate about developing innovative AI-powered solutions for real-world problems.",
    'My expertise spans Machine Learning, Computer Vision, Generative AI, and scalable backend development with FastAPI and Spring Boot. I love turning research into deployable, production-ready products.',
    'From AI-powered personal finance assistants to crop disease detection platforms, I build end-to-end intelligent systems — from data pipelines and model training to REST APIs and interactive dashboards.',
  ],
  highlights: [
    { label: 'CGPA', value: '7.7' },
    { label: 'FastAPI + Spring Boot', value: 'Backend' },
    { label: 'Gemini API', value: 'Generative AI' },
    { label: '2023 – 2027', value: 'B.E. CSE' },
  ],
};

export type SkillCategory = {
  title: string;
  icon: IconType;
  accent: string;
  skills: { name: string; icon: IconType }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code,
    accent: 'cyan',
    skills: [
      { name: 'Java', icon: Coffee },
      { name: 'Python', icon: SiPython },
    ],
  },
  {
    title: 'AI & ML',
    icon: Brain,
    accent: 'purple',
    skills: [
      { name: 'Machine Learning', icon: Brain },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'Scikit-learn', icon: SiScikitlearn },
      { name: 'Gemini API', icon: Sparkles },
    ],
  },
  {
    title: 'Frameworks',
    icon: Layers,
    accent: 'cyan',
    skills: [
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'Flask', icon: SiFlask },
    ],
  },
  {
    title: 'Frontend',
    icon: Layers,
    accent: 'purple',
    skills: [{ name: 'HTML (Basic)', icon: SiHtml5 }],
  },
  {
    title: 'Databases',
    icon: Database,
    accent: 'cyan',
    skills: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    accent: 'purple',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: Monitor },
      { name: 'Postman', icon: SiPostman },
    ],
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  description: string;
  bullets: string[];
  tags: string[];
  icon: IconType;
};

export const experiences: Experience[] = [
  {
    role: 'Machine Learning Intern',
    org: 'CodeAlpha (Virtual)',
    period: 'Jan 2026 – Feb 2026',
    description:
      'Delivered end-to-end ML projects involving recognition, prediction, and classification systems using Python and Scikit-learn.',
    bullets: [
      'Developed a Handwritten Character Recognition system using supervised learning.',
      'Built an Emotion Recognition model from speech using audio feature extraction.',
      'Designed a Credit Scoring prediction model for loan eligibility assessment.',
      'Performed data preprocessing and model evaluation using Python and Scikit-learn.',
    ],
    tags: ['Python', 'Scikit-learn', 'ML', 'Feature Extraction'],
    icon: Brain,
  },
  {
    role: 'Intern',
    org: 'Infosys Springboard (Virtual)',
    period: 'Feb 2025 – Mar 2025',
    description:
      'Worked in a collaborative environment following structured project workflows and version control best practices.',
    bullets: [
      'Worked with Git branching strategy in a collaborative development environment.',
      'Implemented features following a structured project workflow.',
      'Strengthened understanding of version control and team-based development.',
    ],
    tags: ['Git', 'Version Control', 'Team Development'],
    icon: Cpu,
  },
  {
    role: 'B.E. CSE (AI & ML) Student',
    org: 'VSB Engineering College, Karur',
    period: '2023 – 2027',
    description:
      'Pursuing B.E. in Computer Science and Engineering with AI & ML specialization. CGPA: 7.7. Building real-world projects across computer vision, generative AI, and backend systems.',
    bullets: [
      'Specialization in Artificial Intelligence & Machine Learning.',
      'CGPA: 7.7 — consistent academic performance.',
      'Building end-to-end AI products beyond the curriculum.',
    ],
    tags: ['AI & ML', 'Computer Vision', 'Generative AI', 'CGPA: 7.7'],
    icon: Sparkles,
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  accent: 'cyan' | 'purple';
  metrics: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    title: 'BudgetWise AI',
    tagline: 'AI-Powered Personal Finance Assistant',
    description:
      'An AI-powered personal finance assistant that creates personalized monthly budgets based on user income, expenses, and goals — powered by Gemini API for intelligent recommendations and FastAPI + MongoDB for the backend.',
    tech: ['FastAPI', 'MongoDB', 'Gemini API', 'JWT', 'Python'],
    github: 'https://github.com/gokulakrishnan-s/budgetwise-ai',
    demo: 'https://budgetwise-ai-6pqv.onrender.com',
    accent: 'cyan',
    metrics: [
      { label: 'Engine', value: 'Gemini AI' },
      { label: 'Backend', value: 'FastAPI' },
      { label: 'DB', value: 'MongoDB' },
    ],
  },
  {
    title: 'Pest Detection Agent',
    tagline: 'AI Crop Disease Detection Platform',
    description:
      'A two-stage AI pipeline that identifies plant diseases from uploaded leaf images and uses Google Gemini API to generate detailed treatment reports with symptoms, causes, prevention, and farmer recommendations.',
    tech: ['Python', 'FastAPI', 'TensorFlow', 'Gemini API', 'MongoDB'],
    github: 'https://github.com/gokulakrishnan-s/pest-detection-agent',
    demo: 'https://pest-detection-agent.onrender.com',
    accent: 'purple',
    metrics: [
      { label: 'Pipeline', value: 'Two-Stage AI' },
      { label: 'Model', value: 'TensorFlow' },
      { label: 'Reports', value: 'Gemini AI' },
    ],
  },
  {
    title: 'Online Auction Bazaar',
    tagline: 'Secure Web-Based Auction Platform',
    description:
      'A full-stack web auction platform built on Spring Boot and MySQL with user registration, role-based access control, bidding validation logic, and REST APIs integrated with a dynamic frontend.',
    tech: ['Spring Boot', 'Java', 'MySQL', 'REST API'],
    github: 'https://github.com/gokulakrishnan-s/online-auction-bazaar',
    demo: '#',
    accent: 'cyan',
    metrics: [
      { label: 'Backend', value: 'Spring Boot' },
      { label: 'Language', value: 'Java' },
      { label: 'DB', value: 'MySQL' },
    ],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  accent: 'cyan' | 'purple';
};

export const certifications: Certification[] = [
  {
    title: 'Java Foundation Certification',
    issuer: 'Infosys Springboard',
    year: '2025',
    description: 'Core Java programming fundamentals and enterprise-grade coding practices.',
    accent: 'cyan',
  },
  {
    title: 'Machine Learning Internship Certificate',
    issuer: 'CodeAlpha',
    year: '2026',
    description: 'Handwritten character recognition, emotion detection, and credit scoring models.',
    accent: 'purple',
  },
  {
    title: 'Introduction to SQL',
    issuer: 'Simplilearn',
    year: '2024',
    description: 'Relational database fundamentals, queries, joins, and data management.',
    accent: 'cyan',
  },
  {
    title: 'B.E. CSE — AI & ML Specialization',
    issuer: 'VSB Engineering College',
    year: '2023 – 2027',
    description: 'Degree program focused on Artificial Intelligence & Machine Learning. CGPA: 7.7',
    accent: 'purple',
  },
];

export type CodingProfile = {
  label: string;
  username: string;
  href: string;
  icon: IconType;
  color: string;
  stat: string;
  statLabel: string;
};

export const codingProfiles: CodingProfile[] = [
  {
    label: 'GitHub',
    username: '@gokulakrishnan-s',
    href: 'https://github.com/gokulakrishnan-s',
    icon: Github,
    color: '#ffffff',
    stat: '10+',
    statLabel: 'Repositories',
  },
  {
    label: 'LinkedIn',
    username: 'Gokulakrishnan S',
    href: 'https://www.linkedin.com/in/gokulakrishnan-s',
    icon: Linkedin,
    color: '#0A66C2',
    stat: '500+',
    statLabel: 'Connections',
  },
];

export const emailjsConfig = {
  serviceId: 'service_portfolio',
  templateId: 'template_contact',
  publicKey: 'public_key_placeholder',
};
