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

1. Import the tailwind component in your Angular component:

```typescript
import { TwButton } from "ngx-tw";

@NgModule({
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

### 🔔 Alerts

Interactive notification components for displaying important messages to users.

```html
<tw-alerts></tw-alerts>
```

**Features:**

- Multiple alert types: `info`, `error`, `warning`
- Customizable duration and actions
- Icon support with custom colors
- Primary and secondary action buttons

**Service Usage:**

```typescript
import { AlertService } from 'ngx-tw';

constructor(private alertService: AlertService) {}

showAlert() {
  this.alertService.show({
    title: 'Success!',
    description: 'Operation completed successfully',
    type: 'info',
    duration: 3000
  });
}
```

### 🔤 Autocomplete

Smart input component with search and suggestion capabilities.

```html
<tw-autocomplete [options]="myOptions" [(ngModel)]="selectedValue"> </tw-autocomplete>
```

**Features:**

- Dynamic filtering and searching
- Keyboard navigation support
- Custom option templates
- Async data loading

### 🎯 Button

Versatile button component with multiple styles and configurations.

```html
<tw-button type="primary" color="primary" rounded="md" [disabled]="false"> Click me </tw-button>
```

**Properties:**

- `type`: `'basic' | 'primary' | 'secondary'`
- `color`: Color theme variants
- `rounded`: Border radius options
- `disabled`: Boolean state
- `isSubmit`: Form submission type

### 🎯 Button Icon

Icon-only button for compact interfaces.

```html
<tw-button-icon svgIcon="hero:plus" color="primary" [size]="20"> </tw-button-icon>
```

### 🎯 Button Group

Grouped button controls for related actions.

```html
<tw-button-group>
  <tw-button-group-item label="Option 1" value="1"></tw-button-group-item>
  <tw-button-group-item label="Option 2" value="2"></tw-button-group-item>
</tw-button-group>
```

### 📅 Calendar

Full-featured calendar component with date selection and range support.

```html
<tw-calendar [(selectedDate)]="selectedDate" [isRange]="false" [minDate]="minDate" [maxDate]="maxDate"> </tw-calendar>
```

**Features:**

- Single date selection
- Date range selection
- Min/max date constraints
- Multiple view modes (days, months, years)
- Keyboard navigation
- Today highlighting

### 🏷️ Chip

Tag-like components for displaying categories, filters, or selections.

```html
<tw-chip-list [(ngModel)]="selectedChips" [isEditable]="true">
  <tw-chip-item value="tag1">JavaScript</tw-chip-item>
  <tw-chip-item value="tag2">Angular</tw-chip-item>
</tw-chip-list>
```

**Features:**

- Editable chip lists
- Custom separators
- Icon support
- Color theming
- Dynamic chip creation

### 📅 Date Picker

Specialized date range picker component.

```html
<tw-date-range-picker [(rangeStart)]="startDate" [(rangeEnd)]="endDate"> </tw-date-range-picker>
```

### 💬 Dialog

Modal dialog service for displaying overlays and confirmations.

```typescript
import { DialogService } from 'ngx-tw';

constructor(private dialog: DialogService) {}

openDialog() {
  this.dialog.open(MyDialogComponent, {
    width: '400px',
    data: { message: 'Hello World' }
  });
}
```

### 🔽 Expander

Accordion-style expandable content sections.

```html
<tw-expander [(expanded)]="isExpanded">
  <tw-expander-header>Section Title</tw-expander-header>
  <tw-expander-content>
    <p>Expandable content goes here</p>
  </tw-expander-content>
</tw-expander>
```

**Grouped Expanders:**

```html
<tw-expander-group [multi]="false">
  <tw-expander>
    <tw-expander-header>Item 1</tw-expander-header>
    <tw-expander-content>Content 1</tw-expander-content>
  </tw-expander>
  <tw-expander>
    <tw-expander-header>Item 2</tw-expander-header>
    <tw-expander-content>Content 2</tw-expander-content>
  </tw-expander>
</tw-expander-group>
```

### 🎨 Icon

SVG icon component with dynamic loading and caching.

```html
<tw-icon svgIcon="hero:home" [size]="24"> </tw-icon>
```

**Features:**

- SVG icon support
- Icon registry and caching
- Heroicons integration
- Custom size control
- Dynamic icon loading

### 📝 Input Field

Comprehensive form input component with validation and styling.

```html
<tw-input-field label="Email" placeholder="Enter your email" inputType="email" [required]="true" iconPrefix="hero:envelope" color="primary" [(ngModel)]="emailValue"> </tw-input-field>
```

**Features:**

- Multiple input types
- Prefix/suffix icons
- Validation support
- Multiline textarea mode
- Form control integration
- Error display

### 📝 Masked Input

Specialized input with formatting masks.

```html
<tw-masked-input mask="(000) 000-0000" placeholder="Phone number" [(ngModel)]="phoneNumber"> </tw-masked-input>
```

### 🍽️ Menu

Dropdown menu component with nested support.

```html
<tw-menu #menu>
  <button *twMenuItem>Action 1</button>
  <button *twMenuItem="submenu">Action 2 →</button>
  <button *twMenuItem>Action 3</button>
</tw-menu>

<tw-menu #submenu>
  <button *twMenuItem>Submenu Item 1</button>
  <button *twMenuItem>Submenu Item 2</button>
</tw-menu>
```

**Directives:**

- `twMenuTrigger`: Trigger for opening menus
- `twMenuItem`: Menu item directive

### 📋 Select

Advanced select dropdown with search and custom options.

```html
<tw-select placeholder="Choose an option" color="primary" [(ngModel)]="selectedValue">
  <!-- Optional search input -->
  <input type="text" placeholder="Search options..." />

  <tw-option value="option1">Option 1</tw-option>
  <tw-option value="option2">Option 2</tw-option>
  <tw-option value="option3">Option 3</tw-option>
</tw-select>
```

**Features:**

- Searchable options
- Keyboard navigation
- Custom option indicators
- Multi-selection support
- Async option loading

### 💀 Skeleton

Loading placeholder components for better UX.

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

Loading spinner for indicating async operations.

```html
<tw-spinner color="text-primary-500"></tw-spinner>
```

### 📌 Sticky Content Header

Header component that sticks to the top during scroll.

```html
<tw-sticky-content-header>
  <h2>Section Title</h2>
</tw-sticky-content-header>
```

### 🔄 Switch

Toggle switch component for boolean inputs.

```html
<tw-switch label="Enable notifications" color="primary" [(ngModel)]="isEnabled" (toggleChange)="onToggle($event)"> </tw-switch>
```

### 📑 Tab

Tab navigation component for organizing content.

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

Advanced data table with sorting, pagination, and customization.

```html
<tw-table [dataSource]="data" (queryChange)="onQueryChange($event)">
  <tw-column-def name="name">
    <tw-header-cell-def>Name</tw-header-cell-def>
    <tw-cell-def let-row>{{ row.name }}</tw-cell-def>
  </tw-column-def>

  <tw-column-def name="email">
    <tw-header-cell-def>Email</tw-header-cell-def>
    <tw-cell-def let-row>{{ row.email }}</tw-cell-def>
  </tw-column-def>
</tw-table>
```

**Features:**

- Column definitions
- Sorting and filtering
- Pagination
- Custom cell templates
- Row selection

### 🛠️ Toolbar

Application toolbar with actions and navigation.

```html
<tw-toolbar header="Page Title" toolbarIcon="hero:shopping-bag" [hideActions]="false">
  <!-- Custom toolbar actions -->
  <ng-content select="[slot=actions]"></ng-content>
</tw-toolbar>
```

### 🖱️ Drag & Drop

Comprehensive drag and drop functionality.

```html
<div twDropListGroup>
  <div twDropList [twDropListData]="list1">
    <div *ngFor="let item of list1" twDrag>{{ item }}</div>
  </div>

  <div twDropList [twDropListData]="list2">
    <div *ngFor="let item of list2" twDrag>{{ item }}</div>
  </div>
</div>
```

**Directives:**

- `twDrag`: Makes elements draggable
- `twDropList`: Drop zone container
- `twDropListGroup`: Groups multiple drop lists
- `twDragPlaceholder`: Custom placeholder during drag
- `twDragPreview`: Custom drag preview

**Utilities:**

- `moveItemInArray()`: Reorder items within array
- `transferArrayItem()`: Move items between arrays

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
