import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock useReducedMotion from motion/react
const mockUseReducedMotion = vi.fn();
vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>();
  return {
    ...actual,
    useReducedMotion: () => mockUseReducedMotion(),
  };
});

import { BlurredStagger } from './text-reveal-faqs';

describe('BlurredStagger component', () => {
  it('renders text with letter spans and aria-label in regular mode', () => {
    mockUseReducedMotion.mockReturnValue(false);
    const { container } = render(<BlurredStagger text="Fresh flowers daily" />);

    expect(screen.getByLabelText('Fresh flowers daily')).toBeInTheDocument();
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('renders plain text without per-letter spans when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);
    const { container } = render(<BlurredStagger text="Reduced motion text" />);

    expect(screen.getByText('Reduced motion text')).toBeInTheDocument();
    // In reduced motion mode, we shouldn't have one span per letter
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(0);
  });
});
