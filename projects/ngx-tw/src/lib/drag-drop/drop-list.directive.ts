import { Directive } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';


@Directive({
    selector: '[twDropList]',
    standalone: true
})
export class TwDropListDirective extends CdkDropList {
}
