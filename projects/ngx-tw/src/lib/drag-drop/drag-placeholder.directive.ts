import { Directive } from '@angular/core';
import { CdkDragPlaceholder } from '@angular/cdk/drag-drop';


@Directive({
    selector: 'twDragPlaceholder',
    standalone: true
})
export class TwDragPlaceholderDirective extends CdkDragPlaceholder {
}
