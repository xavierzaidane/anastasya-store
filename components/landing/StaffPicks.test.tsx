import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: {
      staffPicks: {
        title: 'Our Best Selling',
        subtitle: 'Explore our hand-curated collection of floral favorites.',
      },
    },
  }),
}));

import StaffPicks from './StaffPicks';

describe('StaffPicks component', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders skeleton initially while loading', () => {
    // Hang fetch so it stays in loading state
    global.fetch = vi.fn().mockImplementation(() => new Promise(() => {}));

    render(<StaffPicks />);

    expect(screen.getByText('Our Best Selling')).toBeInTheDocument();
    expect(screen.getByText(/Explore our hand-curated collection/i)).toBeInTheDocument();
  });

  it('renders products once fetch succeeds', async () => {
    const mockData = {
      success: true,
      data: {
        items: [
          {
            id: 'prod-1',
            name: 'Rose Elegance',
            price: 150000,
            image: '/images/rose.jpg',
            slug: 'rose-elegance',
            category: { name: 'Roses', slug: 'roses' },
          },
        ],
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    render(<StaffPicks />);

    await waitFor(() => {
      expect(screen.getAllByText('Rose Elegance').length).toBeGreaterThan(0);
    });
  });

  it('renders null when products list is empty', async () => {
    const mockEmpty = {
      success: true,
      data: { items: [] },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockEmpty,
    } as Response);

    const { container } = render(<StaffPicks />);

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
