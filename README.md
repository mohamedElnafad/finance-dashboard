# Finance Dashboard

A full-stack finance dashboard built with Next.js, TypeScript, and PostgreSQL.

## Features

- 🔐 Authentication (NextAuth.js + bcrypt + JWT)
- 📊 Real-time KPI cards (Balance, Income, Expenses)
- 📈 Income vs Expenses line chart
- 🥧 Expenses breakdown pie chart
- 💳 Transactions table with:
  - Search with debounce
  - Filter by type (income/expense)
  - Pagination
- 🧪 Jest + React Testing Library tests

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Recharts
- **State:** Redux Toolkit, RTK Query
- **Auth:** NextAuth.js, bcrypt
- **Database:** PostgreSQL (Supabase)
- **Testing:** Jest, React Testing Library

## Getting Started

1. Clone the repo
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create `.env.local`:
   \`\`\`env
   DATABASE_URL="your-supabase-connection-string"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   \`\`\`
4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Running Tests

\`\`\`bash
npx jest
\`\`\`
