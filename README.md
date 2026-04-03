# FinVision Pro - Premium Financial Dashboard

FinVision Pro is a high-end financial management dashboard built with React, TypeScript, and Tailwind CSS. It features a premium glassmorphism UI, 3D-inspired animations, and comprehensive financial tracking capabilities.

## Features

- **Premium Glassmorphism UI**: High-end visual design with backdrop blurs and dynamic gradients.
- **Interactive Dashboard**: Real-time summary cards and data visualizations using Recharts.
- **Transaction Management**: Full ledger with search, filtering, and CRUD operations (Admin only).
- **Smart Insights**: AI-powered financial observations and monthly projections.
- **Role-Based Access Control (RBAC)**: Switch between 'Admin' and 'Viewer' roles to see different UI behaviors.
- **Responsive Design**: Fully optimized for desktop and mobile screens.

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion (motion/react)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router 7

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Extract the ZIP file** to your desired directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

- `src/components`: Reusable UI components (GlassCard, Sidebar, Header, Layout).
- `src/context`: State management using React Context (Auth, Finance).
- `src/pages`: Main view components (Dashboard, Transactions, Insights).
- `src/lib`: Utility functions and helpers.
- `src/types`: TypeScript interfaces and types.
- `src/data`: Mock data and constants.

## License

Apache-2.0
