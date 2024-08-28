import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TwSkeletonComponent } from './skeleton.component';

@Directive({ selector: '[twSkeleton]', standalone: true })
export class TwSkeletonDirective implements OnChanges {
  @Input('twSkeleton') isLoading = false;
  @Input('twSkeletonRepeat') size = 1;
  @Input('twSkeletonTemplate') template: TemplateRef<any> | null = null;
  @Input({ required: true, alias: 'twSkeletonWidth' }) width!: string;
  @Input({ required: true, alias: 'twSkeletonHeight' }) height!: string;
  @Input({ alias: 'twSkeletonClassName' }) className?: string;

  constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      this.vcr.clear();

      if (changes['isLoading'].currentValue) {
        Array.from({ length: this.size }).forEach(() => {
          const ref = this.vcr.createComponent(TwSkeletonComponent);

          Object.assign(ref.instance, {
            width: this.width,
            height: this.height,
            className: this.className,
            template: this.template,
          });
        });
      } else {
        this.vcr.createEmbeddedView(this.tpl);
      }
    }
  }
}
