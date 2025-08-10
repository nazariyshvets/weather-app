import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HomePage from '@/pages/index';

// Mock next/dynamic to return a no-op component for dynamic imports in this test
jest.mock('next/dynamic', () => () => () => null);

// AntD grid relies on matchMedia; provide a stub for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('@/hooks/useCities', () => ({
  useCities: () => ({
    cities: [{ name: 'Kyiv' }],
    addCity: jest.fn(),
    removeCity: jest.fn(),
  }),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
};

describe('HomePage', () => {
  it('renders title', () => {
    renderWithClient(<HomePage />);
    expect(screen.getByRole('heading', { name: /weather/i })).toBeDefined();
  });
});
