### Contract Management Platform

A modern, feature-rich contract management platform built with React, TypeScript, and Tailwind CSS. This application allows users to create reusable contract blueprints, generate contracts from templates, and manage contract lifecycles with a clean, intuitive interface.

## Features

### Blueprint Management
- Create reusable contract templates with configurable fields
- Support for multiple field types: Text, Date, Signature, Checkbox
- Field positioning and metadata storage
- Visual blueprint builder interface

### Contract Creation
- Generate contracts from existing blueprints
- Inherit all fields from selected blueprint
- Fill contract-specific values with type-appropriate inputs
- Form validation to ensure data completeness

### Contract Lifecycle Management
- Complete state flow: **Created → Approved → Sent → Signed → Locked**
- **Revoke** option available for Created, Approved, and Sent states
- Visual timeline showing contract progress
- Controlled state transitions (no skipping steps)
- Edit restrictions for locked and revoked contracts

### Dashboard & Filtering
- Contract listing with real-time statistics
- Filter by status: All, Active, Pending, Signed, Revoked
- Sortable table view with quick actions
- Status badges with color coding
- Responsive design for mobile and desktop

## Project Structure

```
src/
├── components/
│   ├── blueprint/
│   │   ├── BlueprintCard.tsx          # Blueprint display card
│   │   └── BlueprintForm.tsx          # Blueprint creation form
│   ├── contract/
│   │   ├── ContractForm.tsx           # Contract creation form
│   │   ├── ContractLifecycle.tsx      # Lifecycle timeline component
│   │   └── FieldInput.tsx             # Dynamic field input component
│   ├── dashboard/
│   │   ├── StatsCard.tsx              # Statistics card component
│   │   ├── FilterBar.tsx              # Filter controls
│   │   └── ContractsTable.tsx         # Contracts table view
│   └── common/
│       ├── Header.tsx                 # Application header
│       ├── Button.tsx                 # Reusable button component
│       ├── StatusBadge.tsx            # Status indicator badge
│       └── Card.tsx                   # Reusable card wrapper
├── pages/
│   ├── ContractsDashboard.tsx         # Main dashboard page
│   ├── Blueprints.tsx                 # Blueprints listing page
│   └── ViewContract.tsx               # Contract detail view page
├── context/
│   └── ContractContext.tsx            # Global state management
├── models/
│   ├── Blueprint.ts                   # Blueprint type definitions
│   └── Contract.ts                    # Contract type definitions
├── utils/
│   ├── lifecycle.ts                   # Lifecycle state management
│   ├── helpers.ts                     # Utility functions
│   └── storage.ts                     # LocalStorage abstraction
├── App.tsx                            # Main app component
├── main.tsx                           # Application entry point
└── index.css                          # Global styles
```

## Tech Stack

- **React 18** - UI library with functional components and hooks
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icon library
- **LocalStorage** - Client-side data persistence

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd contract-management-platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Build for production
```bash
npm run build
npm run preview
```

## Architecture & Design Decisions

### State Management
- **Context API** used for global state management
- Simple and appropriate for application scope
- No external state management library needed
- Easy to understand and maintain

### Component Architecture
- **Atomic Design principles** - components broken down by function
- **Separation of Concerns** - clear boundaries between UI, logic, and data
- **Reusable Components** - common components in `/common` folder
- **Page-level Components** - orchestrate feature-specific components

### Data Persistence
- **LocalStorage** with abstraction layer
- Easy migration path to backend API
- Data persists across browser sessions
- Simple CRUD operations

### Type Safety
- **Comprehensive TypeScript interfaces** for all data models
- **Strict mode enabled** for maximum type checking
- **Type inference** used where appropriate
- **Clear contracts** between components

### Styling Approach
- **Tailwind CSS** for rapid development
- **Utility-first** approach for consistency
- **Responsive design** using Tailwind breakpoints
- **Custom color schemes** for different states

### Code Organization
- **Feature-based folders** - components grouped by feature
- **Clean imports** - relative imports kept simple
- **Single Responsibility** - each file has one clear purpose
- **DRY principles** - no code duplication

## Key Features Implementation

### Contract Lifecycle
The lifecycle is implemented with strict rules:
- State transitions are validated before execution
- No skipping of intermediate states
- Revoke action available only for specific states
- Visual feedback through timeline component
- Immutable state updates

### Field Types
Four field types are supported with appropriate inputs:
- **Text** - Standard text input
- **Date** - Date picker input
- **Signature** - Stylized text input (italic serif font)
- **Checkbox** - Boolean checkbox with label

### Validation
- Client-side validation before saving
- Required field checks
- User-friendly error messages
- Prevent invalid state transitions

## Assumptions & Limitations

### Assumptions
1. **Single User** - No authentication or multi-user support
2. **Browser Storage** - Data stored in localStorage (limited to ~5-10MB)
3. **No Backend** - All data is client-side only
4. **Modern Browsers** - Assumes ES6+ support
5. **English Language** - No internationalization

### Limitations
1. **No file uploads** - Contracts can't include attached documents
2. **No email integration** - "Send" action is state-only
3. **No e-signatures** - Signature field is text-based
4. **No search** - Table filtering limited to status
5. **No export** - Can't export contracts to PDF/Word
6. **No collaboration** - Single user, no real-time updates
7. **No version history** - Contract changes overwrite previous data
8. **No audit trail** - No logging of who/when made changes

### Future Enhancements
- Backend API integration
- User authentication and authorization
- Real e-signature integration (DocuSign, etc.)
- PDF generation and export
- Email notifications
- Advanced search and filtering
- Contract templates library
- Bulk operations
- Audit logging
- Document attachments
- Version control
- Collaborative editing

## Testing

Currently, no automated tests are included. For production use, consider adding:
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright or Cypress
- Type checking with `tsc --noEmit`

## Usage Guide

### Creating a Blueprint
1. Navigate to "Blueprints" tab
2. Click "New Blueprint"
3. Fill in name and description
4. Add fields from the left panel
5. Customize field labels
6. Save the blueprint

### Creating a Contract
1. Navigate to "Dashboard" tab
2. Click "New Contract"
3. Enter contract name
4. Select a blueprint
5. Fill in all field values
6. Create the contract

### Managing Contract Lifecycle
1. View contract from dashboard
2. Use timeline to advance status
3. Edit fields (if in Created/Approved state)
4. Revoke if needed (before Signed state)
5. Contracts become read-only when Locked


##  Author

Created as part of a frontend development assessment.

---

**Note**: This application stores all data in browser localStorage. Clearing browser data will delete all contracts and blueprints.

