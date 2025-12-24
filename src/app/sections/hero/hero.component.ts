import { Component, Input, Output, EventEmitter, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  @Input() subtitle: string = '';
  @Input() title: string = '';
  @Input() body: string = '';
  @Output() scrollToSection = new EventEmitter<string>();

  @ViewChildren('heroLine') heroLines!: QueryList<ElementRef<HTMLElement>>;

  prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngAfterViewInit() {
    if (this.prefersReducedMotion) return;
    this.animateHero();
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

  scrollTo(section: string) {
    this.scrollToSection.emit(section);
  }
}

