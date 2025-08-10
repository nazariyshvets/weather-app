import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CityCard } from '@/components/CityCard';
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
    refetch: jest.fn(),
    isRefetching: false,
  }),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
};

describe('CityCard', () => {
  const city: City = { name: 'Kyiv' };

  it('renders weather summary', () => {
    renderWithClient(<CityCard city={city} onRemove={jest.fn()} />);

    expect(screen.getByText('Kyiv')).toBeDefined();
    expect(screen.getByText('Clear')).toBeDefined();
    expect(screen.getByText(/°C/)).toBeDefined();
  });

  it('calls onRemove when remove clicked', () => {
    const onRemove = jest.fn();
    renderWithClient(<CityCard city={city} onRemove={onRemove} />);

    const removeBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledWith('Kyiv');
  });
});
