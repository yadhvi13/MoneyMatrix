import { Transaction } from '../types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-03-01', amount: 2500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2024-03-02', amount: 120, category: 'Food', type: 'expense', description: 'Grocery Shopping' },
  { id: '3', date: '2024-03-05', amount: 45, category: 'Transport', type: 'expense', description: 'Uber Ride' },
  { id: '4', date: '2024-03-10', amount: 800, category: 'Rent', type: 'expense', description: 'Monthly Rent' },
  { id: '5', date: '2024-03-12', amount: 150, category: 'Entertainment', type: 'expense', description: 'Netflix & Cinema' },
  { id: '6', date: '2024-03-15', amount: 300, category: 'Freelance', type: 'income', description: 'Logo Design Project' },
  { id: '7', date: '2024-03-18', amount: 60, category: 'Health', type: 'expense', description: 'Pharmacy' },
  { id: '8', date: '2024-03-20', amount: 200, category: 'Shopping', type: 'expense', description: 'New Shoes' },
  { id: '9', date: '2024-03-22', amount: 50, category: 'Food', type: 'expense', description: 'Dinner Out' },
  { id: '10', date: '2024-03-25', amount: 1200, category: 'Investments', type: 'income', description: 'Stock Dividends' },
  { id: '11', date: '2024-03-28', amount: 90, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '12', date: '2024-03-30', amount: 30, category: 'Transport', type: 'expense', description: 'Bus Pass' },
];

export const CATEGORIES = [
  'Salary', 'Food', 'Transport', 'Rent', 'Entertainment', 'Freelance', 'Health', 'Shopping', 'Investments', 'Utilities'
];
