import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: {
      cta: {
        orderHere: 'Order Your Special Arrangement',
        orderHereDesc: 'Custom floral arrangements for any occasion.',
        clickMe: 'Click me!',
        browseCollection: 'Browse Collection',
      },
    },
  }),
}));

import CTA from './CTA';

describe('CTA component', () => {
  it('renders CTA heading, description, and action button', () => {
    const { container } = render(<CTA />);

    expect(screen.getByText('Order Your Special Arrangement')).toBeInTheDocument();
    expect(screen.getByText('Custom floral arrangements for any occasion.')).toBeInTheDocument();
    expect(screen.getByText('Browse Collection')).toBeInTheDocument();

    // Verify outer section does not have inline motion transforms that break stacking context
    const section = container.querySelector('section');
    expect(section).not.toBeNull();
    expect(section?.style.transform).toBeFalsy();
  });
});
