/**
 * Content data and constants for the website
 */

import type {
  SkillGroup,
  Project,
  Education,
  Link,
  BootMessage,
  LegalNoticeData,
} from "../types";

/**
 * Boot sequence messages
 */
export const BOOT_MESSAGES: BootMessage[] = [
  {
    text: "Call trans opt: received. 2-19-98 13:24:18 REC:Log>",
    delay: 50,
  },
  {
    text: "Trace program: running",
    delay: 50,
  },
  {
    text: "The Matrix has you...",
    delay: 50,
  },
];

/**
 * Skills grouped by Matrix-themed categories
 */
export const SKILLS: SkillGroup[] = [
  {
    category: "Scripting & Automation",
    matrixName: "Agent Smith",
    skills: ["Ansible", "Python", "Shell"],
  },
  {
    category: "Web Development",
    matrixName: "The Matrix",
    skills: ["CSS", "HTML", "JavaScript", "PHP"],
  },
  {
    category: "Data & Orchestration",
    matrixName: "Zion",
    skills: ["Apache Airflow", "Apache Spark", "SQL"],
  },
  {
    category: "DevOps & Cloud",
    matrixName: "Neo",
    skills: ["Docker", "GitHub Actions", "Google Cloud Platform", "Kubernetes"],
  },
  {
    category: "Data Science & AI",
    matrixName: "The Oracle",
    skills: [
      "Keras",
      "Matplotlib",
      "MLflow",
      "NumPy",
      "Pandas",
      "scikit-learn",
      "TensorFlow",
    ],
  },
];

/**
 * Projects showcase
 */
export const PROJECTS: Project[] = [
  {
    title: "SûrEtBon",
    description:
      "SûrEtBon merges the results of official health checks on France's restaurants with their Google Maps and TripAdvisor ratings.",
    website: "https://www.suretbon.org",
    github: "https://github.com/SurEtBon",
    asciiLogo: `
              ------              
        ###+######+#####-        
     .#######+-....-+######+     
   .####+####...-+...-#######+   
  +#+##+####..-####+..++#######+  
 #########+#...-##+...+#########- 
.+####+######-.......####+##+#+##.
###-......-+####+-####++++-...+#++
###-..++++....+#++##+.....--..-###
##+-..+####+....##+...-####...####
##+#+..-#####-..--..-####+...+####
.###+#....-#+#+....+####...-#####.
 -#####+-................+##+#### 
  +########+###...####+###+#####  
    +##########-..###+####+###+    
      +#+#######..##########+      
         -###+#####+#####-         
               .---               
`,
  },
];

/**
 * Education history
 */
export const EDUCATION: Education[] = [
  {
    id: "oct-2024-nov-2024",
    school: "Le Wagon",
    degree: "Professional qualification",
    fieldOfStudy: "Data Engineering",
  },
  {
    id: "apr-2024-jun-2024",
    school: "Le Wagon",
    degree: "Professional qualification",
    fieldOfStudy: "Data Science & AI",
  },
  {
    id: "oct-2013-jun-2016",
    school: "SUPDEWEB",
    degree: "Bachelor",
    fieldOfStudy: "Web Development",
  },
];

/**
 * External links
 */
export const LINKS: Link[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/jonathan-about/",
    external: true,
  },
  {
    label: "GitHub",
    url: "https://github.com/j-about",
    external: true,
  },
  {
    label: "CodePen",
    url: "https://codepen.io/j_about",
    external: true,
  },
  {
    label: "Knowledge Base",
    url: "https://knowledge.jonathan-about.com/",
    external: true,
  },
  {
    label: "X (Twitter)",
    url: "https://x.com/JonathanAbout",
    external: true,
  },
  {
    label: "Phone",
    url: "tel:+33183644580",
    external: false,
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/message/AMR3AYZ6HBKIN1",
    external: true,
  },
  {
    label: "Email",
    url: "mailto:contact@jonathan-about.com",
    external: false,
  },
];

/**
 * Legal notice information (LCEN compliance)
 */
export const LEGAL_NOTICE: LegalNoticeData = {
  identity: {
    firstName: "Jonathan",
    lastName: "About",
  },
  contact: {
    address: "11 RUE DU FAUBOURG SAINT MARTIN, 75010, PARIS, FRANCE",
    email: "contact@jonathan-about.com",
    phone: "+33183644580",
  },
  hosting: {
    name: "OVH",
    legalForm: "SAS",
    address: "2 RUE KELLERMANN, 59100 ROUBAIX, FRANCE",
    phone: "+33972101007",
  },
  business: {
    rcs: "835137456 R.C.S. Paris",
    siren: "835137456",
  },
};

/**
 * Keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
  skills: "1",
  projects: "2",
  education: "3",
  connect: "4",
  legal: "l",
  theme: "p",
} as const;
