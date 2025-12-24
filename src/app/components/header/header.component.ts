import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() navLinks: string[] = [];
  @Input() activeSection: string = 'Home';
  @Output() scrollToSection = new EventEmitter<string>();

  scrollTo(section: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.scrollToSection.emit(section);
  }
}

