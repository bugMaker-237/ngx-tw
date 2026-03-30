import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { TwButtonIcon } from '../button/button-icon.component';
import { TwIcon } from '../icon/icon.component';
import { TwTableModule } from './index';

type Payment = {
  amount: string;
  date: string;
  status: string;
  customer: string;
  description: string;
  paymentMethod: string;
};

@Component({
  selector: 'sb-table-demo',
  imports: [TwTableModule, TwButtonIcon, TwIcon],
  template: `
    <div class="flex flex-col gap-12">
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Empty table</p>
        <tw-table></tw-table>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Table with data</p>
        <tw-table [dataSource]="dataSource">

          <ng-container twColumnDef="amount">
            <ng-container *twHeaderCellDef>Amount</ng-container>
            <ng-container *twCellDef="let item"><b>{{ item.amount }}</b></ng-container>
          </ng-container>

          <ng-container twColumnDef="date">
            <ng-container *twHeaderCellDef>Date</ng-container>
            <ng-container *twCellDef="let item">{{ item.date }}</ng-container>
          </ng-container>

          <ng-container twColumnDef="status">
            <ng-container *twHeaderCellDef>Status</ng-container>
            <ng-container *twCellDef="let item">
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-green-700 bg-green-100 text-xs">
                {{ item.status }}
                <tw-icon svgIcon="hero:check" [size]="12" />
              </span>
            </ng-container>
          </ng-container>

          <ng-container twColumnDef="customer">
            <ng-container *twHeaderCellDef>Customer</ng-container>
            <ng-container *twCellDef="let item">{{ item.customer }}</ng-container>
          </ng-container>

          <ng-container twColumnDef="description">
            <ng-container *twHeaderCellDef>Description</ng-container>
            <ng-container *twCellDef="let item">{{ item.description }}</ng-container>
          </ng-container>

          <ng-container twColumnDef="paymentMethod">
            <ng-container *twHeaderCellDef>Payment</ng-container>
            <ng-container *twCellDef="let item">{{ item.paymentMethod }}</ng-container>
          </ng-container>

          <ng-container twColumnDef="actions">
            <ng-container *twHeaderCellDef></ng-container>
            <ng-container *twCellDef="let item">
              <div class="flex items-center">
                <tw-button-icon svgIcon="hero:eye" />
                <tw-button-icon svgIcon="hero:trash" />
              </div>
            </ng-container>
          </ng-container>

          <tr *twRowDef="let item; displayColumns: displayedColumns;"></tr>
        </tw-table>
      </div>
    </div>
  `,
})
class TableDemoComponent {
  displayedColumns = ['amount', 'date', 'status', 'customer', 'description', 'paymentMethod', 'actions'];
  dataSource: Payment[] = [
    { amount: '$120.00', date: 'Jan 5, 2026', status: 'Succeeded', customer: 'cus_abc123', description: 'Pro plan subscription', paymentMethod: 'Visa •••• 4242' },
    { amount: '$45.00', date: 'Jan 8, 2026', status: 'Succeeded', customer: 'cus_def456', description: 'Add-on purchase', paymentMethod: 'Mastercard •••• 1234' },
    { amount: '$200.00', date: 'Jan 12, 2026', status: 'Succeeded', customer: 'cus_ghi789', description: 'Enterprise plan', paymentMethod: 'PayPal' },
    { amount: '$30.00', date: 'Jan 15, 2026', status: 'Succeeded', customer: 'cus_jkl012', description: 'Top-up', paymentMethod: 'Stripe' },
  ];
}

const meta: Meta<TableDemoComponent> = {
  title: 'Components/Table',
  component: TableDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A data table built with structural directives: `twColumnDef` registers a column, `*twHeaderCellDef` defines the header cell, `*twCellDef` defines the data cell, and `*twRowDef` with `displayColumns` controls which columns are rendered and in what order. Bind rows via `[dataSource]`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TableDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two tables: an empty table (no `[dataSource]`) and a data table with payment records, status badges, and row action buttons.',
      },
    },
  },
};
