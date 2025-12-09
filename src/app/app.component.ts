import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  navLinks = ['Home', 'Skills', 'Experience', 'Services', 'Projects', 'Contact'];
  activeSection = 'Home';
  currentYear = new Date().getFullYear();

  heroSubtitle = 'Designer & Developer';
  heroTitle = 'Crafting elegant digital experiences with intent and precision.';
  heroBody =
    'I blend thoughtful design with reliable engineering to build fast, engaging products.';

  skills = [
    {
      category: 'Core',
      items: ['Angular', 'TypeScript', 'RxJS', 'NGXS/Signals', 'Node.js'],
    },
    {
      category: 'Design',
      items: ['UI Systems', 'Prototyping', 'Design Tokens', 'Accessibility'],
    },
    {
      category: 'Tools',
      items: ['GSAP', 'Framer Motion', 'Figma', 'Storybook', 'Jest'],
    },
    {
      category: 'Delivery',
      items: ['Performance', 'Testing', 'CI/CD', 'Docs', 'Mentorship'],
    },
  ];

  experiences: Experience[] = [
    {
      role: 'Senior Frontend Engineer',
      company: 'Aurora Labs',
      period: '2021 — Present',
      summary: 'Lead UI engineer for a design-forward SaaS platform.',
      highlights: [
        'Built a modular design system that cut build time by 30%.',
        'Led performance pass: 40% faster TTI and improved CLS stability.',
        'Partnered with design to deliver motion-rich onboarding flows.',
      ],
    },
    {
      role: 'Frontend Engineer',
      company: 'Northwind Studio',
      period: '2018 — 2021',
      summary: 'Delivered web experiences for fintech and creative clients.',
      highlights: [
        'Shipped multi-tenant dashboards with accessible charting.',
        'Implemented CI workflows and visual regression testing.',
        'Mentored junior devs on Angular patterns and testing.',
      ],
    },
  ];

  services: Service[] = [
    {
      title: 'Product UI/UX',
      description: 'Intentional flows, design systems, and interaction design that feel premium.',
    },
    {
      title: 'Frontend Engineering',
      description: 'Robust Angular builds with performance budgets, testing, and CI baked in.',
    },
    {
      title: 'Design Systems',
      description: 'Tokens, components, documentation, and motion guidelines for teams.',
    },
    {
      title: 'Consulting & Audits',
      description: 'UX/motion/performance audits with actionable roadmaps.',
    },
  ];

  projects: Project[] = [
    {
      title: 'Portfolio SPA',
      description: 'Single-page portfolio with GSAP-driven reveals and polished theming.',
      tags: ['Angular', 'GSAP', 'Design System'],
      link: '#',
    },
    {
      title: 'SaaS Dashboard',
      description: 'Modular analytics UI with role-based layouts and themeable tokens.',
      tags: ['Angular', 'RxJS', 'Charts'],
      link: '#',
    },
    {
      title: 'Design System Kit',
      description: 'Composable component library with docs, tokens, and motion presets.',
      tags: ['Storybook', 'Design Tokens', 'Accessibility'],
      link: '#',
    },
    {
      title: 'Onboarding Flow',
      description: 'Narrative onboarding with scroll-driven storytelling and microcopy.',
      tags: ['GSAP', 'Content', 'A11y'],
    },
  ];

  socials: Social[] = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
    { label: 'Email', href: 'mailto:hello@example.com' },
  ];

  prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('sectionEl') sectionEls!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('heroLine') heroLines!: QueryList<ElementRef<HTMLElement>>;

  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    if (this.prefersReducedMotion) {
      return;
    }

    this.animateHero();
    this.setupRevealAnimations();
    this.setupSectionTracking();
  }

  private animateHero() {
    const timeline = gsap.timeline({
      defaults: { duration: 0.7, ease: 'power3.out' },
    });

    timeline.from(this.heroLines.toArray().map((el) => el.nativeElement), {
      opacity: 0,
      y: 24,
      stagger: 0.12,
    });
  }

  private setupRevealAnimations() {
    this.revealEls.forEach((el, idx) => {
      const tween = gsap.from(el.nativeElement, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: 'power3.out',
        delay: (idx % 3) * 0.05,
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: el.nativeElement,
        start: 'top 82%',
        onEnter: () => tween.play(),
        once: true,
      });

      this.triggers.push(trigger);
    });
  }

  private setupSectionTracking() {
    this.sectionEls.forEach((el) => {
      const id = el.nativeElement.id;

      const trigger = ScrollTrigger.create({
        trigger: el.nativeElement,
        start: 'top 35%',
        end: 'bottom 35%',
        onEnter: () => (this.activeSection = id),
        onEnterBack: () => (this.activeSection = id),
      });

      this.triggers.push(trigger);
    });
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  ngOnDestroy() {
    this.triggers.forEach((t) => t.kill());
    this.triggers = [];
  }
}
