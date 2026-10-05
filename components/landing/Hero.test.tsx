import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock subcomponents
vi.mock('./Category', () => ({
  default: () => <div data-testid="mock-category" />,
}));
vi.mock('./StaffPicks', () => ({
  default: () => <div data-testid="mock-staff-picks" />,
}));
vi.mock('./CTA', () => ({
  default: () => <div data-testid="mock-cta" />,
}));
vi.mock('./FAQ', () => ({
  default: () => <div data-testid="mock-faq" />,
}));
vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: {
      hero: {
        titleLine1: 'Bouquet For Every',
        titleLine2: 'Moment',
        description: 'Handcrafted floral arrangements designed to brighten every celebration.',
        viewBouquets: 'View Bouquets',
        shopNow: 'Order Here',
      },
    },
  }),
}));

import Hero from './Hero';

describe('Hero component', () => {
  it('renders hero title and view bouquets link', () => {
    render(<Hero />);

    expect(screen.getByText(/Bouquet For Every/i)).toBeInTheDocument();
    expect(screen.getByText(/Moment/i)).toBeInTheDocument();
    expect(screen.getByText(/View Bouquets/i)).toBeInTheDocument();
  });

  it('renders subcomponents and illustration', () => {
    render(<Hero />);

    expect(screen.getByTestId('mock-category')).toBeInTheDocument();
    expect(screen.getByTestId('mock-staff-picks')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cta')).toBeInTheDocument();
    expect(screen.getByTestId('mock-faq')).toBeInTheDocument();
    expect(screen.getByAltText('flower bouquet')).toBeInTheDocument();
  });
});
