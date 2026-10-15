import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() className = 'w-5 h-5';

  get normalizedName(): string {
    if (!this.name) return '';
    // Normalize PascalCase or camelCase like 'CheckCircle2' -> 'check-circle-2', 'BookOpen' -> 'book-open'
    return this.name
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
  }
}
