import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ServicesComponent } from './sections/services/services.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ContactComponent } from './sections/contact/contact.component';

type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

type Service = {
  title: string;
  description: string;
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

type Social = {
  label: string;
  href: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    ServicesComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  navLinks = ['Home', 'Skills', 'Experience', 'Services', 'Projects', 'Contact'];
  activeSection = 'Home';
  currentYear = new Date().getFullYear();

  constructor(private cdr: ChangeDetectorRef) {}

  heroSubtitle = 'Software Engineer | UI/UX Designer | Frontend Developer';
  heroTitle = 'Crafting elegant digital experiences with intent and precision.';
  heroBody =
    'An experienced IT professional with over 5 years of hands-on expertise in developing and delivering high-quality web applications. I blend thoughtful design with reliable engineering to build fast, engaging products.';

  skills = [
    {
      category: 'Frontend',
      items: ['Angular', 'React.js', 'TypeScript', 'JavaScript', 'jQuery', 'HTML5', 'CSS3', 'SCSS'],
    },
    {
      category: 'Backend & APIs',
      items: ['Node.js', 'PHP', 'Laravel', 'RESTful APIs', 'MySQL', 'SQL'],
    },
    {
      category: 'Design & Tools',
      items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'WordPress', 'Bootstrap', 'Tailwind', 'PrimeNG'],
    },
    {
      category: 'Development',
      items: ['Git', 'CI/CD', 'Jenkins', 'Jira', 'Postman', 'Agile', 'TDD', 'BDD'],
    },
  ];

  experiences: Experience[] = [
    {
      role: 'Senior Software Engineer',
      company: 'Altisource Business Solutions Private Limited',
      period: 'Feb 2025 — Present',
      summary: 'Developing and maintaining responsive, high-performance web applications using modern frontend technologies.',
      highlights: [
        'Develop and maintain responsive, high-performance web applications using HTML5, CSS3, JavaScript, and Angular.',
        'Created comprehensive UI/UX designs and converted them into pixel-perfect, responsive code for seamless user experiences.',
        'Technologies: JavaScript, TypeScript, Angular, HTML, CSS, SCSS, Bootstrap, Tailwind, PrimeNG, SQL, Figma, CI/CD, Jira.',
      ],
    },
    {
      role: 'UI/UX Designer',
      company: 'Admiral India',
      period: 'Nov 2021 — Feb 2025',
      summary: 'Developed responsive web applications and created comprehensive UI/UX designs with seamless frontend-backend integration.',
      highlights: [
        'Developed responsive web applications using HTML5, CSS3, JavaScript, Angular, and React.js.',
        'Created comprehensive UI/UX designs and converted them into pixel-perfect, responsive code.',
        'Developed wireframes, mockups, and prototypes for new features and products.',
        'Developed and maintained CMS applications for efficient data management.',
        'Integrated RESTful APIs using Node.js and Laravel for seamless frontend-backend communication.',
        'Technologies: JavaScript, jQuery, Angular, React, HTML, CSS, SCSS, Bootstrap, Tailwind, PHP, Laravel, MySQL, WordPress, Figma, Adobe Suite, Git, CI/CD, Jenkins, Jira.',
      ],
    },
    {
      role: 'Website Designer and Developer',
      company: 'Multimedia and Animation Academy',
      period: 'Nov 2018 — Nov 2021',
      summary: 'Developed static and dynamic websites, CMS-based applications, and led teams as a trainer.',
      highlights: [
        'Developed both static and dynamic websites for businesses, tailored to meet specific needs.',
        'Developed CMS-based applications for efficient data management and organization.',
        'Led and managed teams of 3 to 8 members as a trainer.',
      ],
    },
  ];

  services: Service[] = [
    {
      title: 'UI/UX Design',
      description: 'Comprehensive designs, wireframes, mockups, and prototypes that effectively visualize user flows and functionality.',
    },
    {
      title: 'Frontend Development',
      description: 'Responsive, high-performance web applications using Angular, React, and modern JavaScript frameworks.',
    },
    {
      title: 'Full-Stack Solutions',
      description: 'End-to-end development with frontend, backend, and database integration using Node.js, Laravel, and MySQL.',
    },
    {
      title: 'CMS Development',
      description: 'Custom WordPress websites, CMS applications, and content management systems tailored to business needs.',
    },
  ];

  projects: Project[] = [
    {
      title: 'Granite Portal',
      description: 'Custom WordPress website with theme creation, plugin integration, and responsive layouts. Developed APIs for MySQL and MSSQL integration.',
      tags: ['WordPress', 'PHP', 'MySQL', 'MSSQL', 'API'],
    },
    {
      title: 'Granite Keystone',
      description: 'Custom WordPress solution with end-to-end development, SEO integration, and seamless user experience across multiple database systems.',
      tags: ['WordPress', 'PHP', 'MySQL', 'MSSQL', 'SEO'],
    },
    {
      title: 'Admiral India & Admiral Solutions',
      description: 'Custom WordPress websites with theme creation, plugin integration, and API development for seamless data management across systems.',
      tags: ['WordPress', 'PHP', 'MySQL', 'MSSQL', 'API'],
    },
    {
      title: 'Conte Faste Quote',
      description: 'Intuitive and visually appealing Angular application with dynamic components, API integration, and optimized performance for seamless user interactions.',
      tags: ['Angular', 'TypeScript', 'API', 'UI/UX'],
    },
    {
      title: 'School Management System',
      description: 'Comprehensive system with user research, intuitive interface design, full-stack development, and optimized database structure for academic data management.',
      tags: ['Full-Stack', 'Database', 'UI/UX', 'Research'],
    },
    {
      title: 'Real Estate Management System',
      description: 'End-to-end solution with in-depth business research, frontend, backend, and database development for efficient property and transaction management.',
      tags: ['Full-Stack', 'Database', 'Research', 'Business Logic'],
    },
    {
      title: 'Accounts Management System',
      description: 'Complete financial system with product/service research, tax calculations, and seamless transaction tracking for sales and rental operations.',
      tags: ['Full-Stack', 'Database', 'Financial', 'Tax System'],
    },
  ];

  socials: Social[] = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Email', href: 'mailto:rkkhulbe1996@gmail.com' },
    { label: 'Phone', href: 'tel:+917078924888' },
  ];

  prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  private triggers: ScrollTrigger[] = [];
  private scrollHandler?: () => void;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    if (this.prefersReducedMotion) {
      return;
    }

    this.setupSectionTracking();
  }

  private setupSectionTracking() {
    // Set initial active section
    this.updateActiveSection();

    // Track scroll to update active section with throttling
    let ticking = false;
    this.scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    // Use ScrollTrigger for more precise tracking
    // Query sections directly from DOM since they're in child components
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const id = section.id;
        if (!id) return;

        const trigger = ScrollTrigger.create({
          trigger: section as HTMLElement,
          start: 'top 30%',
          end: 'bottom 70%',
          onEnter: () => {
            this.activeSection = id;
          },
          onEnterBack: () => {
            this.activeSection = id;
          },
        });

        this.triggers.push(trigger);
      });
    }, 100);
  }

  private updateActiveSection() {
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY + viewportHeight * 0.3; // 30% from top

    let currentSection = 'Home';

    // Query sections directly from DOM
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const el = section as HTMLElement;
      if (!el || !el.id) return;

      const rect = el.getBoundingClientRect();
      const elementTop = window.scrollY + rect.top;
      const elementBottom = elementTop + rect.height;

      // Check if section is in the viewport threshold
      if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
        currentSection = el.id;
      }
    });

    // Fallback: if at the bottom, set to Contact
    if (window.scrollY + viewportHeight >= document.documentElement.scrollHeight - 100) {
      currentSection = 'Contact';
    }

    // Fallback: if at the top, set to Home
    if (window.scrollY < 100) {
      currentSection = 'Home';
    }

    this.activeSection = currentSection;
  }

  scrollTo(id: string) {
    // Try to find the element immediately
    let el = document.getElementById(id);
    
    // If not found, wait a bit for DOM to be ready
    if (!el) {
      setTimeout(() => {
        el = document.getElementById(id);
        if (el) {
          this.performScroll(el, id);
        } else {
          console.warn(`Section with id "${id}" not found`);
        }
      }, 50);
    } else {
      this.performScroll(el, id);
    }
  }

  private performScroll(el: HTMLElement, id: string) {
    // Use scrollIntoView with scroll-margin-top (set in CSS)
    el.scrollIntoView({
      behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    // Update active section immediately for better UX
    this.activeSection = id;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.triggers.forEach((t) => t.kill());
    this.triggers = [];
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }
}
