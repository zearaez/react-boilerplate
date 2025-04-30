# React Boilerplate

A modern and scalable React application boilerplate to kickstart your next web project.

## Features

- React with TypeScript support
- State management setup
- Routing configuration
- Component library
- Testing framework
- Code quality tools (ESLint, Prettier)
- Build and bundling tools
- Pre-commit hooks via Husky
- GitHub Actions CI/CD pipeline

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/zearaez/react-boilerplate.git

# Navigate to the project directory
cd react-boilerplate

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

### Build

```bash
# Build for production
npm run build
# or
yarn build
```

### Testing

```bash
# Run tests
npm test
# or
yarn test

# Run tests in watch mode
npm run test:watch
# or
yarn test:watch

# Run test coverage report
npm run test:coverage
# or
yarn test:coverage
```

### Linting and formatting

```bash
# Run linting
npm run lint
# or
yarn lint

# Format code
npm run format
# or
yarn format
```

## Project Structure

```
react-boilerplate/
├── .github/           # GitHub specific files (workflows, issue templates)
├── public/            # Static assets
├── src/               # Application source code
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles
│   ├── App.tsx        # Main App component
│   └── index.tsx      # Application entry point
├── tests/             # Test files
├── .eslintrc.json     # ESLint configuration
├── .husky/            # Husky git hooks
├── .prettierrc        # Prettier configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Customization

Customize this boilerplate to fit your project requirements:

- Replace placeholder content with your actual project details
- Modify the configuration files to suit your preferences
- Add or remove dependencies as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React community
- Contributors to the dependencies used