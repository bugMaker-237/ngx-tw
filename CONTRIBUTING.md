# Contributing to ngx-tw

We love your input! We want to make contributing to ngx-tw as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

### Conventional Commits

We use conventional commits for automatic versioning. Please format your commit messages as follows:

- `feat: add new component` - New features (minor version bump)
- `fix: resolve button click issue` - Bug fixes (patch version bump)
- `feat!: change component API` - Breaking changes (major version bump)
- `docs: update README` - Documentation (no version bump)
- `style: fix formatting` - Code style (no version bump)
- `refactor: improve code structure` - Refactoring (no version bump)
- `test: add component tests` - Tests (no version bump)
- `chore: update dependencies` - Maintenance (no version bump)

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/bugMaker-237/ngx-tw.git
cd ngx-tw
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run demo
```

4. Run tests:

```bash
npm run test:lib
```

5. Build the library:

```bash
npm run build:lib
```

### Component Development Guidelines

1. **File Structure**: Each component should have its own folder with:

   - `component-name.component.ts`
   - `component-name.component.html` (if needed)
   - `component-name.component.scss` (if needed)
   - `component-name.interface.ts` (if applicable)
   - `index.ts` (for exports)

2. **Styling**: Use Tailwind CSS classes. Add custom styles to the main SCSS files in `/styles/components/`

3. **Accessibility**: Ensure components follow WCAG guidelines:

   - Proper ARIA attributes
   - Keyboard navigation
   - Screen reader support
   - Focus management

4. **Testing**: Write unit tests for each component covering:
   - Basic rendering
   - Input/output behavior
   - User interactions
   - Edge cases

### Adding New Components

1. Create component in `projects/ngx-tw/src/lib/your-component/`
2. Export it in `projects/ngx-tw/src/public-api.ts`
3. Add it to the demo app in `projects/demo/src/app/components/`
4. Update the README with documentation
5. Add appropriate tests

### Publishing

The package is automatically published to NPM when changes are merged to the `main` branch. The CI/CD pipeline will:

1. Run tests
2. Build the library
3. Bump version based on conventional commits
4. Publish to NPM
5. Create a GitHub release

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions or concerns!
