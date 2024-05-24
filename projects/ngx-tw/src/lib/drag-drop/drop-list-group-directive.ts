import { Directive } from '@angular/core';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';


@Directive({
    selector: 'twDropListGroup',
    standalone: true
})
export class TwDropListGroupDirective<T> extends CdkDropListGroup<T> {
}
