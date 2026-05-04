import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct percentage', () => {
    render(<ProgressBar percent={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<ProgressBar percent={30} label="已完成 7 / 26 节课程" />);
    expect(screen.getByText('已完成 7 / 26 节课程')).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<ProgressBar percent={75} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '75');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('shows completion message at 100%', () => {
    render(<ProgressBar percent={100} />);
    expect(screen.getByText(/完成了所有课程/)).toBeInTheDocument();
  });

  it('does not show completion message below 100%', () => {
    render(<ProgressBar percent={99} />);
    expect(screen.queryByText(/完成了所有课程/)).not.toBeInTheDocument();
  });
});
