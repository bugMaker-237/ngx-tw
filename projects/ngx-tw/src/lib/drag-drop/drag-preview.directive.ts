import { Directive } from '@angular/core';
import { CdkDragPreview } from '@angular/cdk/drag-drop';



@Directive({
    selector: 'twDragPreview',
    standalone: true
})
export class TwDragPreviewDirective extends CdkDragPreview {
}
