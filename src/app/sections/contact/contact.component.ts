import { Component, Input, AfterViewInit, QueryList, ViewChildren, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Social = {
  label: string;
  href: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @Input() socials: Social[] = [];

  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef<HTMLElement>>;

  private triggers: ScrollTrigger[] = [];

  prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngAfterViewInit() {
    if (typeof window === 'undefined' || this.prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    this.setupRevealAnimations();
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

  ngOnDestroy() {
    this.triggers.forEach((t) => t.kill());
    this.triggers = [];
  }
}

