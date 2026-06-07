import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner.jsx';

describe('LoadingSpinner', () => {
  it('renders the loading label', () => {
    render(<LoadingSpinner label="Loading products" />);
    expect(screen.getByText('Loading products')).toBeInTheDocument();
  });
});
