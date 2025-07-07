import { Component } from '@angular/core';
import { TwButton, TwButtonIcon, TwIcon, TwTableModule } from 'ngx-tw';

type Payment = {
  amount: string;
  date: string;
  status: string;
  customer: string;
  description: string;
  paymentMethod: string;
};

@Component({
    selector: 'app-tables',
    imports: [TwButton, TwButtonIcon, TwTableModule, TwIcon],
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent {
  displayedColumns = [
    'amount',
    'date',
    'status',
    'customer',
    'description',
    'paymentMethod',
    'actions',
  ];

  dataSource = [
    {
      amount: '1000 XAF',
      date: 'May 2, 2024',
      status: 'Succeeded',
      customer: 'cus_zertyuiop',
      description: 'Subscription update',
      paymentMethod: 'Orange money',
    },
    {
      amount: '1000 XAF',
      date: 'May 2, 2024',
      status: 'Succeeded',
      customer: 'cus_zertyuiop',
      description: 'Subscription update',
      paymentMethod: 'Orange money',
    },
    {
      amount: '1000 XAF',
      date: 'May 2, 2024',
      status: 'Succeeded',
      customer: 'cus_zertyuiop',
      description: 'Subscription update',
      paymentMethod: 'Orange money',
    },
    {
      amount: '1000 XAF',
      date: 'May 2, 2024',
      status: 'Succeeded',
      customer: 'cus_zertyuiop',
      description: 'Subscription update',
      paymentMethod: 'Orange money',
    },
    {
      amount: '1000 XAF',
      date: 'May 2, 2024',
      status: 'Succeeded',
      customer: 'cus_zertyuiop',
      description: 'Subscription update',
      paymentMethod: 'Orange money',
    },
    {
      amount: '1000 XAF',
      date: 'May 2, 2024',
      status: 'Succeeded',
      customer: 'cus_zertyuiop',
      description: 'Subscription update',
      paymentMethod: 'Orange money',
    },
  ];
}
