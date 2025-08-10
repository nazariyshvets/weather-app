import '@testing-library/jest-dom';
import React from 'react';

// Make Next/Image behave like a normal img in tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => React.createElement('img', props),
}));

// Provide a fake API key for tests
process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = 'test-key';
