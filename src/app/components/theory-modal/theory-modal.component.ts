import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import type { Milestone, ModuleCategory } from '../../../types/quiz';

@Component({
  selector: 'app-theory-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './theory-modal.component.html',
  styleUrl: './theory-modal.component.css'
})
export class TheoryModalComponent {
  @Input() isOpen = false;
  @Input({ required: true }) category!: Milestone | ModuleCategory;
  @Output() close = new EventEmitter<void>();

  get isMilestone(): boolean {
    return 'learningRatio' in this.category;
  }

  get asMilestone(): Milestone {
    return this.category as Milestone;
  }

  get asModule(): ModuleCategory {
    return this.category as ModuleCategory;
  }
}
