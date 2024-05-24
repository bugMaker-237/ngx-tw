import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-sticky-content-header',
  standalone: true,
  template: `
    <div
      class="w-full sticky bg-white dark:bg-gray-800 shadow-sm"
      style="top: {{ top }}px; z-index: {{ zIndex }}"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class TwStickyContentHeaderComponent {
  @Input() top = 72;
  @Input() zIndex = 20;
}
