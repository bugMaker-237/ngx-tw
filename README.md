# ngx-tw

[![.github/workflows/publish.yml](https://github.com/bugMaker-237/ngx-tw/actions/workflows/publish.yml/badge.svg)](https://github.com/bugMaker-237/ngx-tw/actions/workflows/publish.yml)

A comprehensive Angular component library built with Tailwind CSS, providing a modern and customizable set of UI components for Angular applications.

> **⚠️ WARNING: Pre-Production Software**
>
> **This library is currently in active development and is NOT production-ready.**
>
> - 🚧 **Breaking changes** may be introduced in any release without prior notice
> - 🧪 **APIs are experimental** and subject to major modifications
> - 📝 **Documentation** may be incomplete or outdated
> - 🐛 **Bugs and instability** should be expected
>
> **Use at your own risk.** This library is intended for experimental use, prototyping, and development purposes only. Do not use in production applications until a stable v1.0.0 release is announced.

## 🙏 Credits

This library includes components adapted from [ng-tw](https://github.com/matheusdavidson/ng-tw) by the Matheus Davidson. Specifically:

- **Select Component** - Based on the select implementation from ng-tw
- **Alerts/Notification Components** - Adapted from the notification system in ng-tw

We thank the ng-tw contributors for their excellent work that helped inspire and accelerate the development of these components.

## 📦 Installation

```bash
npm install ngx-tw
```

## 🚀 Quick Start

1. Import the components directly in your standalone Angular component:

```typescript
import { TwButton } from "ngx-tw";

@Component({
  imports: [TwButton],
  // ...
})
export class AppComponent {}
```

2. Import the default styles in your `styles.scss`:

```scss
@import "ngx-tw/default";
```

## 🎨 Components

### 🔔 Alerts / Notifications

Service-based notification toasts for displaying messages to users.

**Modern usage — `TwNotification`:**

```typescript
import { TwNotification, TwNotificationData } from 'ngx-tw';

constructor(private notification: TwNotification) {}

showNotification() {
  this.notification.show({
    title: 'Success!',
    text: 'Operation completed successfully',
    type: 'success',       // 'success' | 'info' | 'warning' | 'danger'
    autoClose: true,
    autoCloseTimeout: 3000
  });
}
```

**Legacy `TwAlertService` (deprecated — use `TwNotification` instead):**

```typescript
import { TwAlertService } from 'ngx-tw';

constructor(private alertService: TwAlertService) {}

showAlert() {
  this.alertService.info({
    title: 'Information',
    description: 'This is an informational alert.',
    icon: 'hero:chart-bar',   // optional custom icon
    duration: 3000
  });
  // also: .warning({...}), .error({...})
}
```

### 🔤 Autocomplete

Smart input with search suggestions, custom templates, and form integration.

```typescript
import { TwAutocomplete } from "ngx-tw";
```

```html
<tw-autocomplete placeholder="Search..." [showLabel]="false" [suggestions]="suggestionsObservableOrArray" [displayFactory]="displayFactory" [filterFn]="filterFn" [optionTemplate]="customTemplate" (selectionChanged)="onSelectionChange($event)" formControlName="myValue"></tw-autocomplete>

<ng-template #customTemplate let-item>
  <div class="flex items-center">
    <span>{{ item.name }}</span>
    <small class="ml-2 text-gray-500">{{ item.id }}</small>
  </div>
</ng-template>
```

**Inputs:**

- `suggestions`: Array, Promise, or Observable of options
- `displayFactory`: `(item) => { key: string; text: string }` — how to display each option
- `filterFn`: `(value: string, item: any) => boolean` — custom filter logic
- `optionTemplate`: `TemplateRef<any>` — custom option row template
- `showLabel`: Boolean — whether to show the label above the input
- `color`: Color theme
- Supports `formControlName` / `ngModel`

**Outputs:**

- `selectionChanged`: Emits the selected item

### 🎯 Button

Versatile button with multiple styles and color themes.

```typescript
import { TwButton } from "ngx-tw";
```

```html
<tw-button type="basic">Basic</tw-button>
<tw-button type="outlined" color="primary">Primary Outlined</tw-button>
<tw-button type="filled" color="accent">Accent Filled</tw-button>
<tw-button type="filled" color="danger" [disabled]="true">Disabled</tw-button>
<tw-button type="filled" [isSubmit]="true">Submit</tw-button>
```

**Properties:**

- `type`: `'basic' | 'outlined' | 'filled'` (default: `'basic'`)
- `color`: `'primary' | 'accent' | 'danger'`
- `rounded`: `'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'` (default: `'md'`)
- `disabled`: Boolean
- `isSubmit`: Boolean — sets `type="submit"` on the inner button
- `twClass`: Extra CSS classes

### 🎯 Button Icon

Icon-only button for compact interfaces.

```typescript
import { TwButtonIcon } from "ngx-tw";
```

```html
<tw-button-icon type="basic" svgIcon="hero:code-bracket" />
<tw-button-icon type="outlined" color="primary" svgIcon="hero:command-line" />
<tw-button-icon type="filled" color="accent" svgIcon="hero:qr-code" />
<tw-button-icon type="filled" color="danger" [disabled]="true" svgIcon="hero:code-bracket" />
```

**Properties:** same as `TwButton` plus `svgIcon` (icon name, e.g. `"hero:plus"`).

### 🎯 Button Group

Segmented button controls for selecting among options. Supports `ngModel` and `formControlName`.

```typescript
import { TwButtonGroup, TwButtonGroupItem } from "ngx-tw";
```

```html
<!-- Basic -->
<tw-btn-group>
  <tw-btn-group-item value="1">Option 1</tw-btn-group-item>
  <tw-btn-group-item value="2">Option 2</tw-btn-group-item>
  <tw-btn-group-item value="3">Option 3</tw-btn-group-item>
</tw-btn-group>

<!-- With color and disabled -->
<tw-btn-group color="primary" [disabled]="true">
  <tw-btn-group-item value="1">Option X</tw-btn-group-item>
  <tw-btn-group-item value="2">Option Y</tw-btn-group-item>
</tw-btn-group>

<!-- Per-item color override -->
<tw-btn-group color="danger">
  <tw-btn-group-item value="1">Option X</tw-btn-group-item>
  <tw-btn-group-item value="2" color="primary">Option Y</tw-btn-group-item>
</tw-btn-group>

<!-- As a form control -->
<tw-btn-group color="primary" formControlName="buttonGroupValue">
  <tw-btn-group-item value="1">Option X</tw-btn-group-item>
  <tw-btn-group-item value="2">Option Y</tw-btn-group-item>
  <tw-btn-group-item value="3">Option Z</tw-btn-group-item>
</tw-btn-group>
```

**`tw-btn-group` Properties:**

- `color`: Color theme for all items
- `disabled`: Disables the entire group
- `orientation`: `'horizontal' | 'vertical'` (default: `'horizontal'`)
- Supports `formControlName` / `ngModel`

**`tw-btn-group-item` Properties:**

- `value`: The value emitted when this item is selected
- `color`: Per-item color override
- `disabled`: Disables this specific item

### 📅 Calendar

Full-featured calendar with single date and range selection.

```typescript
import { TwCalendar } from "ngx-tw";
```

```html
<!-- Single date -->
<tw-calendar [selectedDate]="selectedDate" [minDate]="minDate" [maxDate]="maxDate" (dateSelected)="onDateSelected($event)"></tw-calendar>

<!-- Date range -->
<tw-calendar [isRange]="true" [rangeStart]="startDate" [rangeEnd]="endDate" (rangeSelected)="onRangeSelected($event)"></tw-calendar>
```

**Properties:**

- `selectedDate`: Currently selected date (single mode)
- `rangeStart` / `rangeEnd`: Selected range dates
- `isRange`: Boolean — enable range selection mode
- `minDate` / `maxDate`: Date constraints
- `displayDate`: Initial display date

**Events:**

- `dateSelected`: Emits `Date` on selection
- `rangeSelected`: Emits `{ start: Date; end: Date | null }`

### 🏷️ Chip

Tag/chip components for displaying and editing collections of items.

```typescript
import { TwChipList, TwChipItem } from "ngx-tw";
```

```html
<!-- Static chip list -->
<tw-chip-list color="accent">
  <tw-chip-item [label]="'Angular'" [isDeletable]="false" />
  <tw-chip-item [label]="'TypeScript'" [image]="avatarUrl" [isDeletable]="true" />
</tw-chip-list>

<!-- Editable chip list with form control -->
<tw-chip-list [isEditable]="true" color="accent" formControlName="chips" placeholder="Insert item here" [autoCompleteSuggestions]="suggestions" [autoCompleteDisplayFactory]="displayFactory" [autoCompleteFilterFn]="filterFn" [autoCompleteOptionTemplate]="customTemplate" [allowUnknownItemInsertion]="false" iconPrefix="hero:megaphone" iconSuffix="hero:presentation-chart-line"></tw-chip-list>
```

**`tw-chip-list` Properties:**

- `isEditable`: Allow adding/removing chips
- `color`: Color theme
- `placeholder`: Placeholder text for the input
- `allowUnknownItemInsertion`: Allow values not in suggestions (default: `true`)
- `keyCodeSeperator`: Key to confirm chip insertion (default: `'Enter'`)
- `autoCompleteSuggestions`, `autoCompleteDisplayFactory`, `autoCompleteFilterFn`, `autoCompleteOptionTemplate`: Autocomplete configuration
- `iconPrefix` / `iconSuffix`: Icon names for the input
- Supports `formControlName` / `ngModel`

**`tw-chip-item` Properties:**

- `label`: Text label
- `image`: Optional avatar image URL
- `isDeletable`: Show delete button (default: `true`)

### 📅 Date Range Picker

Popup date range picker with preset support.

```typescript
import { TwDateRangePicker } from "ngx-tw";
```

```html
<tw-date-range-picker></tw-date-range-picker>

<!-- With form integration -->
<tw-date-range-picker formControlName="dateRange"></tw-date-range-picker>
```

### 💬 Dialog

Modal dialog service for displaying overlays and confirmations.

```typescript
import { TwDialogService } from 'ngx-tw';

constructor(private dialog: TwDialogService) {}

openDialog() {
  this.dialog.open(MyDialogComponent, {
    width: '400px',
    data: { message: 'Hello World' }
  });
}
```

### 🗂️ Drawer

Collapsible sidebar navigation component for app shell layouts.

```typescript
import { TwDrawer, DrawerMenuSection } from "ngx-tw";
```

```html
<tw-drawer #drawer [sections]="menuSections" [useAsAppShell]="true">
  <!-- Optional custom header content -->
  <div drawer-header>
    <tw-button [twMenuTriggerFor]="menu">Options</tw-button>
  </div>

  <!-- Main page content goes here -->
  <div class="p-4">
    <button (click)="drawer.toggleMobileMenu()">Toggle menu</button>
    <router-outlet></router-outlet>
  </div>
</tw-drawer>
```

```typescript
menuSections: DrawerMenuSection[] = [
  {
    items: [
      { label: 'Dashboard', icon: 'hero:home', route: '/dashboard' },
      {
        label: 'Products',
        icon: 'hero:cube-transparent',
        children: [
          { label: 'All Products', route: '/products' },
          { label: 'Inventory', route: ['/products', 'inventory'] },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Account', icon: 'hero:user-circle', route: '/settings' },
    ],
  },
];
```

**Properties:**

- `sections`: `DrawerMenuSection[]` — navigation menu structure
- `useAsAppShell`: Boolean — use drawer as full app shell layout

**Methods (via template reference):**

- `drawer.toggleMobileMenu()`: Toggle mobile drawer
- `drawer.isCollapsed`: Whether the sidebar is collapsed

### 🔽 Expander

Accordion-style expandable content sections. Import `TwExpanderModule` for all components.

```typescript
import { TwExpanderModule } from "ngx-tw";
```

```html
<!-- Standalone expander -->
<tw-expander>
  <tw-expander-header>Section Title</tw-expander-header>
  <tw-expander-content>
    <div class="p-4">Content goes here</div>
  </tw-expander-content>
</tw-expander>

<!-- Without the toggle icon -->
<tw-expander>
  <tw-expander-header [showIcon]="false">Section Title</tw-expander-header>
  <tw-expander-content>
    <div class="p-4">Content goes here</div>
  </tw-expander-content>
</tw-expander>

<!-- Grouped expanders (accordion — only one open at a time) -->
<tw-expander-group [multi]="false">
  <tw-expander>
    <tw-expander-header>Item 1</tw-expander-header>
    <tw-expander-content>
      <div class="p-4">Content 1</div>
    </tw-expander-content>
  </tw-expander>
  <tw-expander>
    <tw-expander-header>Item 2</tw-expander-header>
    <tw-expander-content>
      <div class="p-4">Content 2</div>
    </tw-expander-content>
  </tw-expander>
</tw-expander-group>
```

**`tw-expander` Properties:**

- `expanded`: Initial expanded state (default: `false`)

**`tw-expander-header` Properties:**

- `showIcon`: Show/hide the chevron toggle icon (default: `true`)
- `hideDivider`: Hide the bottom divider line (default: `false`)

**`tw-expander-group` Properties:**

- `multi`: Allow multiple expanders open simultaneously (default: `false`)

### 🎨 Icon

SVG icon component with Heroicons support.

```typescript
import { TwIcon } from "ngx-tw";
```

```html
<tw-icon svgIcon="hero:home" [size]="24"></tw-icon> <tw-icon svgIcon="hero:chevron-right" [size]="16"></tw-icon>
```

**Properties:**

- `svgIcon`: Icon identifier in `"registry:name"` format (e.g. `"hero:home"`)
- `size`: Icon size in pixels

### 📝 Input Field

Form input component with icons, validation, and textarea support.

```typescript
import { TwInputField } from "ngx-tw";
```

```html
<!-- Basic -->
<tw-input-field inputType="text" placeholder="Name" [required]="true" formControlName="name" />

<!-- With prefix icon -->
<tw-input-field inputType="text" color="accent" placeholder="Name" iconPrefix="hero:megaphone" formControlName="name" />

<!-- With prefix and suffix icons -->
<tw-input-field inputType="text" color="danger" placeholder="Name" iconPrefix="hero:megaphone" iconSuffix="hero:presentation-chart-line" formControlName="name" />

<!-- Multiline (textarea) -->
<tw-input-field inputType="text" [multiline]="true" placeholder="Description" formControlName="description" />
```

**Properties:**

- `inputType`: `'text' | 'email' | 'password' | 'number' | 'tel'` etc. (default: `'text'`)
- `placeholder`: Placeholder text
- `label`: Label text (shown when `showLabel` is `true`)
- `showLabel`: Whether to display the label (default: `true`)
- `required`: Mark field as required
- `disabled`: Disable the input
- `multiline`: Render as textarea
- `color`: Color theme
- `iconPrefix` / `iconSuffix`: Icon names
- `iconPrefixClass` / `iconSuffixClass`: CSS classes for icons
- `twClass`: Extra CSS classes
- Supports `formControlName` / `ngModel`

### 📝 Masked Input

Input with configurable formatting masks (phone numbers, dates, codes, etc.).

```typescript
import { TwMaskedInput } from "ngx-tw";
```

```html
<!-- Phone number mask -->
<tw-masked-input inputType="tel" placeholder="Phone Number" [maskConfig]="{ mask: '(999) 999-9999', guide: true, placeholderChar: '_', showMask: true }" formControlName="phoneNumber" />

<!-- Date mask (MM/YYYY) -->
<tw-masked-input inputType="text" placeholder="MM/YYYY" [maskConfig]="dateMMYYYYMask" formControlName="date" />

<!-- Alphanumeric with validator -->
<tw-masked-input inputType="text" placeholder="XX-0000-XX" [maskConfig]="alphanumericMask" [allowAlphanumeric]="true" [validator]="validateCode" formControlName="code" />

<!-- With icons -->
<tw-masked-input inputType="tel" placeholder="Phone Number" [maskConfig]="phoneMask" iconPrefix="hero:phone" iconSuffix="hero:information-circle" iconSuffixClass="text-blue-500" formControlName="phone" />
```

**Properties:**

- `maskConfig`: `MaskConfig` object — `{ mask: string; guide?: boolean; placeholderChar?: string; showMask?: boolean }`
- `allowAlphanumeric`: Allow letters in the masked input (default: `false`)
- `validator`: `(rawValue: string) => boolean | string` — custom validation function
- All `TwInputField` properties (`inputType`, `placeholder`, `label`, `iconPrefix`, `iconSuffix`, `color`, etc.)
- Supports `formControlName` / `ngModel`

### 🍽️ Menu

Dropdown menu with nested submenu support. Import `TwMenuModule` for all directives.

```typescript
import { TwMenuModule, TwButton, TwButtonIcon } from "ngx-tw";
```

```html
<!-- Trigger buttons -->
<tw-button type="filled" color="primary" [twMenuTriggerFor]="menu">Menu</tw-button>
<tw-button-icon type="filled" color="accent" [twMenuTriggerFor]="menu" svgIcon="hero:ellipsis-horizontal"></tw-button-icon>

<!-- Basic menu -->
<tw-menu #menu>
  <button *twMenuItem>Action 1</button>
  <button *twMenuItem>Action 2</button>
  <button *twMenuItem>Action 3</button>
</tw-menu>

<!-- Menu with submenus -->
<tw-menu #menu2>
  <button *twMenuItem>Action 1</button>
  <button *twMenuItem="subMenu" class="flex items-center justify-between gap-4">Action 2 <tw-icon [size]="16" svgIcon="hero:chevron-right"></tw-icon></button>
  <button *twMenuItem>Action 3</button>
</tw-menu>

<tw-menu #subMenu>
  <button *twMenuItem>Submenu Item 1</button>
  <button *twMenuItem>Submenu Item 2</button>
</tw-menu>
```

**Directives:**

- `[twMenuTriggerFor]="menuRef"`: Attach to any element to open the menu
- `*twMenuItem`: Marks a button as a menu item
- `*twMenuItem="subMenuRef"`: Marks a button as a submenu trigger

**`tw-menu` Properties:**

- `panelWidth`: CSS width of the dropdown panel

### 📋 Select

Dropdown select with optional search input and form integration.

```typescript
import { TwSelect, TwOption } from "ngx-tw";
```

```html
<!-- Basic select -->
<tw-select color="primary" #selectControl>
  <tw-option>Select an option</tw-option>
  @for (item of options; track item) {
  <tw-option [value]="item.value">{{ item.label }}</tw-option>
  }
</tw-select>
<span>Selected: {{ selectControl.value }}</span>

<!-- With search input -->
<tw-select color="accent">
  <input type="text" placeholder="Search..." (input)="search($event.target.value)" />
  @for (item of filteredOptions; track item) {
  <tw-option [value]="item.value">{{ item.label }}</tw-option>
  }
</tw-select>

<!-- With ngModel -->
<tw-select [(ngModel)]="selectedValue" color="accent">
  @for (item of options; track item) {
  <tw-option [value]="item.value">{{ item.label }}</tw-option>
  }
</tw-select>

<!-- With reactive forms -->
<tw-select formControlName="mySelect" color="accent">
  @for (item of options; track item) {
  <tw-option [value]="item.value">{{ item.label }}</tw-option>
  }
</tw-select>
```

**Properties:**

- `color`: Color theme
- Supports `formControlName` / `ngModel`
- Use a placeholder `<tw-option>` (without `value`) as the default unselected option
- Optionally place an `<input>` as the first child to enable searching

### 💀 Skeleton

Loading placeholder components for better UX.

```typescript
import { TwSkeletonRect, TwSkeletonDirective } from "ngx-tw";
```

```html
<tw-skeleton-rect [width]="'200px'" [height]="'20px'"></tw-skeleton-rect>
```

**Directive Usage:**

```html
<div twSkeleton [isLoading]="loading">
  <p>Content that will be replaced with skeleton when loading</p>
</div>
```

### ⏳ Spinner

Loading spinner for async operations.

```typescript
import { TwSpinner } from "ngx-tw";
```

```html
<tw-spinner color="text-primary-500"></tw-spinner>
```

### 📌 Sticky Content Header

Header that sticks to the top during scroll.

```typescript
import { TwStickyContentHeader } from "ngx-tw";
```

```html
<tw-sticky-content-header>
  <h2>Section Title</h2>
</tw-sticky-content-header>
```

### 🔄 Switch

Toggle switch for boolean form inputs.

```typescript
import { TwSwitch } from "ngx-tw";
```

```html
<tw-switch label="Run on next cycle" color="accent" [formControl]="form.controls.runCycle" (toggleChange)="onToggle($event)"></tw-switch>
```

**Properties:**

- `label`: Text label displayed next to the toggle
- `color`: Color theme
- `disabled`: Disable the switch
- `twClass`: Extra CSS classes
- Supports `formControlName` / `ngModel`

**Events:**

- `toggleChange`: Emits the new `boolean` value on change

### 📑 Tab

Tab navigation for organizing content.

```typescript
import { TwTabGroup, TwTabItemMaker } from "ngx-tw";
```

```html
<tw-tab-group [(selectedIndex)]="activeTab" color="primary">
  <tw-tab-item label="Tab 1">
    <p>Content for tab 1</p>
  </tw-tab-item>
  <tw-tab-item label="Tab 2">
    <p>Content for tab 2</p>
  </tw-tab-item>
</tw-tab-group>
```

### 📊 Table

Data table with column definitions, pagination, and custom cell templates.

```typescript
import { TwTableModule } from "ngx-tw";
// Exports: TwTable, TwColumnDefDirective, TwHeaderCellDefDirective, TwCellDefDirective, TwRowDefDirective
```

```html
<tw-table [dataSource]="dataSource" (queryChange)="onQueryChange($event)">
  <ng-container twColumnDef="name">
    <ng-container *twHeaderCellDef>Name</ng-container>
    <ng-container *twCellDef="let item">{{ item.name }}</ng-container>
  </ng-container>

  <ng-container twColumnDef="status">
    <ng-container *twHeaderCellDef>Status</ng-container>
    <ng-container *twCellDef="let item">{{ item.status }}</ng-container>
  </ng-container>

  <ng-container twColumnDef="actions">
    <ng-container *twHeaderCellDef></ng-container>
    <ng-container *twCellDef="let item">
      <tw-button-icon svgIcon="hero:trash" />
      <tw-button-icon svgIcon="hero:eye" />
    </ng-container>
  </ng-container>

  <tr *twRowDef="let item; displayColumns: displayedColumns;"></tr>
</tw-table>
```

```typescript
displayedColumns = ["name", "status", "actions"];
dataSource = [
  { name: "Item A", status: "Active" },
  { name: "Item B", status: "Pending" },
];
```

**`tw-table` Properties:**

- `dataSource`: Array of data items
- `displayCheckbox`: Show row checkboxes (default: `true`)
- `displayPagination`: Show pagination controls (default: `true`)
- `totalItemsCount`: Total items for server-side pagination
- `pageSizes`: Available page size options (default: `[10, 20, 50, 100]`)
- `dataLoading`: Show loading state

**Events:**

- `queryChange`: Emits `{ pageIndex, pageSize, searchTerm }` on pagination/search change
- `itemClick`: Emits the clicked row item

**Directives:**

- `twColumnDef="colName"`: Defines a column
- `*twHeaderCellDef`: Header cell template
- `*twCellDef="let row"`: Data cell template
- `*twRowDef="let row; displayColumns: cols"`: Row definition

### 🛠️ Toolbar

Application toolbar with title and actions area.

```typescript
import { TwToolbar } from "ngx-tw";
```

```html
<tw-toolbar header="Page Title" toolbarIcon="hero:shopping-bag"> </tw-toolbar>
```

### 🖱️ Drag & Drop

The drag and drop demo uses **Angular CDK** drag-drop directly. There are no custom `ngx-tw` drag directives — import from `@angular/cdk/drag-drop`.

```typescript
import { CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
```

```html
<div cdkDropList #listA="cdkDropList" [cdkDropListData]="listA" [cdkDropListConnectedTo]="[listB]" (cdkDropListDropped)="drop($event)">
  @for (item of listA; track item) {
  <div cdkDrag>{{ item }}</div>
  }
</div>

<div cdkDropList #listB="cdkDropList" [cdkDropListData]="listB" [cdkDropListConnectedTo]="[listA]" (cdkDropListDropped)="drop($event)">
  @for (item of listB; track item) {
  <div cdkDrag>{{ item }}</div>
  }
</div>
```

```typescript
drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
```

## 🎨 Theming

The library supports multiple color themes:

- `primary` - Primary brand color
- `accent` - Secondary accent color
- `danger` - Error/warning states
- Custom color configurations

Most components accept a `color` input to apply the desired theme.

## 🌙 Dark Mode

ngx-tw includes built-in dark mode support using Tailwind's dark mode utilities. Components automatically adapt to dark mode when the `dark` class is applied to a parent element.

## 📱 Responsive Design

All components are built with responsive design principles and work seamlessly across different screen sizes using Tailwind's responsive utilities.

## ♿ Accessibility

Components follow WCAG guidelines and include:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

## 🔧 Customization

### Custom Styles

Override component styles using Tailwind classes:

```html
<tw-button twClass="custom-button-style">Custom Button</tw-button>
```

### Component Configuration

Many components accept configuration objects for advanced customization:

```typescript
// Example: Custom chip transformer
<tw-chip-list [newContentTransformer]="customTransformer">
```

## 📋 Requirements

- Angular 16+
- Tailwind CSS 3.0+
- Angular CDK 16+

## 🚀 Release & Publishing

This package is automatically published to NPM when changes are merged into the `master` branch. The CI/CD pipeline handles:

- **Automated Testing** - Runs all tests to ensure code quality
- **Version Bumping** - Automatically increments package version based on conventional commits
- **Build Process** - Compiles the library for distribution
- **NPM Publishing** - Publishes the new version to the NPM registry
- **Release Notes** - Generates changelog and release notes

### Conventional Commits

To ensure proper versioning, please use conventional commit messages:

```bash
feat: add new component feature       # Minor version bump
fix: resolve component bug           # Patch version bump
feat!: breaking change              # Major version bump
docs: update documentation          # No version bump
```

### Version Strategy

- **Patch** (1.0.X) - Bug fixes and small improvements
- **Minor** (1.X.0) - New features and components
- **Major** (X.0.0) - Breaking changes and major updates

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- How to submit pull requests
- Coding standards and conventions
- Development setup and workflow
- Conventional commit format for versioning
- Component development guidelines

For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
