import { Directive } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';


@Directive({
    selector: 'twDrag',
    standalone: true
})
export class TwDragDirective extends CdkDrag {
}
