import { render, screen } from '@testing-library/react';
import Providers from '../Providers';

describe('Providers', () => {
  it('renders children correctly', () => {
    render(
      <Providers>
        <div data-testid="test-child">Test Content</div>
      </Providers>
    );

    expect(screen.getByTestId('test-child')).toBeDefined();
    expect(screen.getByText('Test Content')).toBeDefined();
  });
});
