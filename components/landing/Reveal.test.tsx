import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { RevealGroup, RevealItem } from './Reveal';
import { MotionConfig } from 'motion/react';

describe('Reveal components', () => {
  it('renders RevealGroup and RevealItem with children', () => {
    render(
      <RevealGroup>
        <RevealItem>
          <div>Child Content 1</div>
        </RevealItem>
        <RevealItem>
          <div>Child Content 2</div>
        </RevealItem>
      </RevealGroup>
    );

    expect(screen.getByText('Child Content 1')).toBeInTheDocument();
    expect(screen.getByText('Child Content 2')).toBeInTheDocument();
  });

  it('renders custom className on RevealGroup and RevealItem', () => {
    const { container } = render(
      <RevealGroup className="custom-group-class">
        <RevealItem className="custom-item-class">
          <span>Item</span>
        </RevealItem>
      </RevealGroup>
    );

    expect(container.querySelector('.custom-group-class')).toBeInTheDocument();
    expect(container.querySelector('.custom-item-class')).toBeInTheDocument();
  });

  it('renders properly inside MotionConfig with reducedMotion="user"', () => {
    render(
      <MotionConfig reducedMotion="user">
        <RevealGroup>
          <RevealItem>
            <div>Accessible Content</div>
          </RevealItem>
        </RevealGroup>
      </MotionConfig>
    );

    expect(screen.getByText('Accessible Content')).toBeInTheDocument();
  });
});
