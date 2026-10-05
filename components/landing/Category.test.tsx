import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('@/components/ui/mobile-category-carousel', () => ({
  MobileCategoryCarousel: () => <div data-testid="mock-mobile-carousel">Mobile Carousel</div>,
}));

vi.mock('./CategorySlider', () => ({
  default: () => <div data-testid="mock-desktop-slider">Desktop Slider</div>,
}));

import Category from './Category';

describe('Category component', () => {
  it('renders both mobile carousel and desktop slider inside reveal structure', () => {
    const { container } = render(<Category />);

    expect(screen.getByTestId('mock-mobile-carousel')).toBeInTheDocument();
    expect(screen.getByTestId('mock-desktop-slider')).toBeInTheDocument();

    // Verify outer element or wrapper is present
    expect(container.firstChild).toBeInTheDocument();
  });
});
