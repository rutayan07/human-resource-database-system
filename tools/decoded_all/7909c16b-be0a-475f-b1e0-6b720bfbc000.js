// Sample employee data & option lists
const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Data', 'QA', 'DevOps', 'Security', 'HR'];
const DESIGNATIONS = [
  'Software Engineer', 'Senior Software Engineer', 'Staff Engineer',
  'Engineering Manager', 'Product Manager', 'UX Designer', 'UI Designer',
  'Data Analyst', 'Data Scientist', 'QA Engineer', 'DevOps Engineer',
  'Security Engineer', 'HR Specialist', 'Tech Lead',
];
const EMP_TYPES = ['Full-time', 'Contract', 'Intern'];
const TECH_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Go', 'Kubernetes',
  'AWS', 'GCP', 'Azure', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL',
  'Docker', 'Terraform', 'Kafka', 'Spark', 'TensorFlow', 'PyTorch',
  'Figma', 'Swift', 'Kotlin', 'Rust', 'C++', 'Next.js', 'Django', 'FastAPI',
];
const DOMAINS = ['FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'SaaS', 'Enterprise', 'Gaming', 'Media'];

const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-10421', firstName: 'Anika', lastName: 'Bhatt', dob: '1994-03-12',
    gender: 'Female', email: 'anika.bhatt@teamsync.co', phone: '+91 98202 11321',
    address: 'Bandra West, Mumbai 400050',
    designation: 'Senior Software Engineer', department: 'Engineering',
    joinDate: '2021-06-14', experience: 7, empType: 'Full-time',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    domains: ['FinTech', 'SaaS'], additionalSkills: ['Mentoring', 'System Design'],
    status: 'Active', availability: 'On Project', project: 'Ledger Platform',
  },
  {
    id: 'EMP-10318', firstName: 'Rahul', lastName: 'Mehra', dob: '1990-11-02',
    gender: 'Male', email: 'rahul.mehra@teamsync.co', phone: '+91 97123 88401',
    address: 'Koramangala, Bengaluru 560095',
    designation: 'Staff Engineer', department: 'Engineering',
    joinDate: '2019-02-01', experience: 11, empType: 'Full-time',
    skills: ['Go', 'Kubernetes', 'AWS', 'Kafka'],
    domains: ['Enterprise', 'SaaS'], additionalSkills: ['Architecture', 'Tech Strategy'],
    status: 'Active', availability: 'Available', project: null,
  },
  {
    id: 'EMP-10577', firstName: 'Priya', lastName: 'Sharma', dob: '1996-07-23',
    gender: 'Female', email: 'priya.sharma@teamsync.co', phone: '+91 98102 33451',
    address: 'Indiranagar, Bengaluru 560038',
    designation: 'UX Designer', department: 'Design',
    joinDate: '2022-09-05', experience: 5, empType: 'Full-time',
    skills: ['Figma', 'Prototyping', 'User Research'],
    domains: ['EdTech', 'HealthTech'], additionalSkills: ['Workshops'],
    status: 'Active', availability: 'On Project', project: 'Patient Portal Redesign',
  },
  {
    id: 'EMP-10602', firstName: 'Karan', lastName: 'Desai', dob: '1998-01-15',
    gender: 'Male', email: 'karan.desai@teamsync.co', phone: '+91 99001 27210',
    address: 'Powai, Mumbai 400076',
    designation: 'Data Scientist', department: 'Data',
    joinDate: '2023-03-20', experience: 3, empType: 'Full-time',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Spark'],
    domains: ['FinTech'], additionalSkills: ['MLOps'],
    status: 'Active', availability: 'Available', project: null,
  },
  {
    id: 'EMP-10489', firstName: 'Neha', lastName: 'Kulkarni', dob: '1992-05-30',
    gender: 'Female', email: 'neha.kulkarni@teamsync.co', phone: '+91 98220 50431',
    address: 'Viman Nagar, Pune 411014',
    designation: 'Engineering Manager', department: 'Engineering',
    joinDate: '2020-01-11', experience: 9, empType: 'Full-time',
    skills: ['Leadership', 'Node.js', 'Architecture'],
    domains: ['SaaS', 'Enterprise'], additionalSkills: ['Hiring', 'Coaching'],
    status: 'Active', availability: 'On Project', project: 'Platform Modernization',
  },
  {
    id: 'EMP-10711', firstName: 'Arjun', lastName: 'Iyer', dob: '1999-09-08',
    gender: 'Male', email: 'arjun.iyer@teamsync.co', phone: '+91 97420 10093',
    address: 'HSR Layout, Bengaluru 560102',
    designation: 'Software Engineer', department: 'Engineering',
    joinDate: '2024-07-01', experience: 2, empType: 'Full-time',
    skills: ['React', 'TypeScript', 'Next.js'],
    domains: ['E-commerce'], additionalSkills: [],
    status: 'Active', availability: 'On Project', project: 'Storefront v3',
  },
  {
    id: 'EMP-10255', firstName: 'Sana', lastName: 'Qureshi', dob: '1991-02-17',
    gender: 'Female', email: 'sana.qureshi@teamsync.co', phone: '+91 98188 44012',
    address: 'Salt Lake, Kolkata 700064',
    designation: 'DevOps Engineer', department: 'DevOps',
    joinDate: '2018-08-22', experience: 10, empType: 'Full-time',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker'],
    domains: ['Enterprise'], additionalSkills: ['SRE'],
    status: 'Active', availability: 'Available', project: null,
  },
  {
    id: 'EMP-10834', firstName: 'Vikram', lastName: 'Rao', dob: '1995-12-04',
    gender: 'Male', email: 'vikram.rao@teamsync.co', phone: '+91 99100 21134',
    address: 'Jubilee Hills, Hyderabad 500033',
    designation: 'QA Engineer', department: 'QA',
    joinDate: '2022-04-18', experience: 5, empType: 'Full-time',
    skills: ['Selenium', 'Cypress', 'Python'],
    domains: ['HealthTech'], additionalSkills: ['Automation'],
    status: 'Active', availability: 'On Project', project: 'Patient Portal Redesign',
  },
  {
    id: 'EMP-10192', firstName: 'Meera', lastName: 'Nair', dob: '1988-08-19',
    gender: 'Female', email: 'meera.nair@teamsync.co', phone: '+91 98450 77321',
    address: 'Whitefield, Bengaluru 560066',
    designation: 'Tech Lead', department: 'Engineering',
    joinDate: '2017-11-06', experience: 13, empType: 'Full-time',
    skills: ['Java', 'Spring', 'AWS', 'Microservices'],
    domains: ['FinTech', 'Enterprise'], additionalSkills: ['Mentoring'],
    status: 'Active', availability: 'On Project', project: 'Ledger Platform',
  },
  {
    id: 'EMP-10005', firstName: 'Ishaan', lastName: 'Kapoor', dob: '1993-06-25',
    gender: 'Male', email: 'ishaan.kapoor@teamsync.co', phone: '+91 98770 11004',
    address: 'Greater Kailash, Delhi 110048',
    designation: 'Product Manager', department: 'Product',
    joinDate: '2020-05-14', experience: 8, empType: 'Full-time',
    skills: ['Roadmapping', 'Analytics', 'SQL'],
    domains: ['SaaS', 'E-commerce'], additionalSkills: ['Stakeholder Mgmt'],
    status: 'Active', availability: 'Available', project: null,
  },
  {
    id: 'EMP-10087', firstName: 'Deepak', lastName: 'Shetty', dob: '1989-04-11',
    gender: 'Male', email: 'deepak.shetty@teamsync.co', phone: '+91 98233 90010',
    address: 'Aundh, Pune 411007',
    designation: 'Security Engineer', department: 'Security',
    joinDate: '2019-10-02', experience: 10, empType: 'Full-time',
    skills: ['AppSec', 'Penetration Testing', 'AWS', 'Kubernetes'],
    domains: ['FinTech', 'HealthTech'], additionalSkills: ['Compliance'],
    status: 'Active', availability: 'Available', project: null,
  },
  {
    id: 'EMP-10344', firstName: 'Rhea', lastName: 'Pillai', dob: '1997-10-28',
    gender: 'Female', email: 'rhea.pillai@teamsync.co', phone: '+91 97100 33482',
    address: 'Besant Nagar, Chennai 600090',
    designation: 'Data Analyst', department: 'Data',
    joinDate: '2023-08-14', experience: 3, empType: 'Contract',
    skills: ['SQL', 'Python', 'Tableau'],
    domains: ['E-commerce'], additionalSkills: [],
    status: 'Active', availability: 'On Project', project: 'Storefront v3',
  },
];

const ARCHIVED_EMPLOYEES = [
  {
    id: 'EMP-09874', firstName: 'Ananya', lastName: 'Verma', designation: 'Senior Software Engineer',
    department: 'Engineering', exitDate: '2025-11-14',
    reason: 'Resignation — Career Growth', feedback: 'Great team and leadership, moving to a platform role.',
    experience: 6, status: 'Exited',
  },
  {
    id: 'EMP-09612', firstName: 'Sameer', lastName: 'Ghosh', designation: 'QA Engineer',
    department: 'QA', exitDate: '2025-08-02',
    reason: 'Resignation — Relocation', feedback: 'Enjoyed the mentorship culture. Relocating overseas.',
    experience: 4, status: 'Exited',
  },
];

Object.assign(window, {
  DEPARTMENTS, DESIGNATIONS, EMP_TYPES, TECH_SKILLS, DOMAINS,
  INITIAL_EMPLOYEES, ARCHIVED_EMPLOYEES,
});
