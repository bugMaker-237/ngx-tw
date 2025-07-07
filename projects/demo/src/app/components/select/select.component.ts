
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TwOption, TwSelect } from 'ngx-tw';

@Component({
    selector: 'app-select',
    imports: [TwSelect, TwOption, FormsModule],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss'
})
export class SelectComponent {
  selectWithModel = 'value-10';
  public options: any[] = [
    { label: 'One', value: 'value-1' },
    { label: 'Two', value: 'value-2' },
    { label: 'Three', value: 'value-3' },
    { label: 'Four', value: 'value-4' },
    { label: 'Five', value: 'value-5' },
    { label: 'Six', value: 'value-6' },
    { label: 'Seven', value: 'value-7' },
    { label: 'Eight', value: 'value-8' },
    { label: 'Nine', value: 'value-9' },
    { label: 'Ten', value: 'value-10' },
    { label: 'Eleven', value: 'value-11' },
    { label: 'Twelve', value: 'value-12' },
    { label: 'Thirteen', value: 'value-13' },
    { label: 'Fourteen', value: 'value-14' },
    { label: 'Fifteen', value: 'value-15' },
    { label: 'Sixteen', value: 'value-16' },
    { label: 'Seventeen', value: 'value-17' },
    { label: 'Eighteen', value: 'value-18' },
    { label: 'Nineteen', value: 'value-19' },
    { label: 'Twenty', value: 'value-20' },
  ];

  options2 = [...this.options];

  search(val: string) {
    console.log('searching');
    if (!val) this.options2 = [...this.options];

    this.options2 = this.options2.filter((o) =>
      o.label.toLowerCase().includes(val.toLowerCase())
    );
  }
}
