import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { TwSkeletonComponent } from './skeleton.component';
import { TwSkeletonDirective } from './skeleton.directive';

@Component({
  selector: 'sb-skeleton-demo',
  imports: [TwSkeletonComponent, TwSkeletonDirective],
  template: `
    <div class="flex flex-col gap-8 max-w-sm">
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Rectangle skeletons</p>
        <div class="flex flex-col gap-2">
          <tw-skeleton-rect [width]="'300px'" [height]="'20px'"></tw-skeleton-rect>
          <tw-skeleton-rect [width]="'240px'" [height]="'20px'"></tw-skeleton-rect>
          <tw-skeleton-rect [width]="'180px'" [height]="'20px'"></tw-skeleton-rect>
        </div>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Card skeleton</p>
        <div class="flex gap-3">
          <tw-skeleton-rect [width]="'56px'" [height]="'56px'"></tw-skeleton-rect>
          <div class="flex flex-col gap-2 flex-1">
            <tw-skeleton-rect [width]="'100%'" [height]="'16px'"></tw-skeleton-rect>
            <tw-skeleton-rect [width]="'70%'" [height]="'16px'"></tw-skeleton-rect>
            <tw-skeleton-rect [width]="'50%'" [height]="'12px'"></tw-skeleton-rect>
          </div>
        </div>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Content behind directive (loading = true)</p>
        <p
          *twSkeleton="true; twSkeletonWidth: '280px'; twSkeletonHeight: '20px'"
          class="text-gray-700"
        >
          This text is hidden while loading.
        </p>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Content behind directive (loading = false)</p>
        <p
          *twSkeleton="false; twSkeletonWidth: '280px'; twSkeletonHeight: '20px'"
          class="text-gray-700"
        >
          Content is now visible!
        </p>
      </div>
    </div>
  `,
})
class SkeletonDemoComponent {}

const meta: Meta<SkeletonDemoComponent> = {
  title: 'Components/Skeleton',
  component: SkeletonDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Skeleton-loading placeholder components. Use `tw-skeleton-rect` to render an animated shimmer rectangle with configurable `width` and `height`. Alternatively, the `*twSkeleton` structural directive swaps real content for a skeleton placeholder while `[twSkeleton]` (the loading boolean) is `true`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Rectangle skeletons for body text, a card layout (avatar + lines), and two `*twSkeleton` directive examples — one with loading active, one resolved.',
      },
    },
  },
};
