import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import productsReducer from './store/productsSlice';
import cartReducer from './store/cartSlice';
import quantitiesReducer from './store/quantitiesSlice';
import type { Product } from './types';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Broccoli',
    price: 120,
    image: 'https://example.com/broccoli.jpg',
    category: 'vegetables',
  },
  {
    id: 2,
    name: 'Carrot',
    price: 82,
    image: 'https://example.com/carrot.jpg',
    category: 'vegetables',
  },
];

beforeEach(() => {
  (globalThis as any).fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    } as Response)
  ) as any;
});

const createTestStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
      quantities: quantitiesReducer,
    },
  });
};

describe('App', () => {
  it('renders loader initially', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Broccoli')).toBeInTheDocument();
    });

    expect(screen.getByText('Carrot')).toBeInTheDocument();
  });
});