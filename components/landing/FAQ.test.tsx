import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    isID: true,
  }),
}));

import FaqLanding from './FAQ';

describe('FAQ component', () => {
  it('renders FAQ questions and title in Indonesian', () => {
    render(<FaqLanding />);

    expect(screen.getByText('Pertanyaan Umum (FAQ)')).toBeInTheDocument();
    expect(
      screen.getByText('Produk apa saja yang tersedia di Anastasya Bouquet?')
    ).toBeInTheDocument();
  });
});
