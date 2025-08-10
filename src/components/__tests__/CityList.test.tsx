import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CityList from '@/components/CityList';
import { City } from '@/types/weather';

jest.mock('@/hooks/useWeatherQueries', () => ({
  useWeatherQuery: () => ({
    data: {
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      main: { temp: 20, humidity: 40 },
      wind: { speed: 3 },
    },
    isLoading: false,
    isError: false,
  }),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
};

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

describe('CityList', () => {
  it('renders Empty when there are no cities', () => {
    renderWithClient(<CityList cities={[]} onCityRemove={jest.fn()} />);

    expect(
      screen.getByText('No cities yet. Add your first city above.')
    ).toBeDefined();
  });

  it('renders a card for each city', () => {
    const cities: City[] = [{ name: 'Kyiv' }, { name: 'London' }];

    renderWithClient(<CityList cities={cities} onCityRemove={jest.fn()} />);

    expect(screen.getByText('Kyiv')).toBeDefined();
    expect(screen.getByText('London')).toBeDefined();
  });
});
