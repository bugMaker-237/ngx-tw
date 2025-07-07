import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'tw-skeleton-rect',
    imports: [NgTemplateOutlet, NgIf],
    host: {
        class: '',
    },
    template: `<ng-container
      *ngIf="template; elseTemplate"
      [ngTemplateOutlet]="template"
    ></ng-container>
    <ng-template #elseTemplate>
      <div class="pulse default"></div>
    </ng-template> `,
    styles: [
        `
      .default {
        animation: pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        animation-delay: 0.5s;
        display: block;
        width: var(--skeleton-rect-width);
        height: var(--skeleton-rect-height);
      }
      :host {
        display: block;
        width: var(--skeleton-rect-width);
        height: var(--skeleton-rect-height);
      }
      :host.pulse {
        background: rgb(239, 241, 246) no-repeat;
        border-radius: 4px;
      }
    `,
    ]
})
export class TwSkeletonComponent {
  @Input() width?: string;
  @Input() height?: string;
  @Input() className?: string;
  template: TemplateRef<any> | null = null;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const host = this.host.nativeElement;

    if (this.className) {
      host.classList.add(this.className);
    }

    if (!this.template) host.classList.add('pulse');

    host.style.setProperty('--skeleton-rect-width', this.width ?? '100%');
    host.style.setProperty('--skeleton-rect-height', this.height ?? '20px');
  }
}
