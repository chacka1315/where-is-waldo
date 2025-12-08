import Footer from './Footer';
import { render, screen } from '@testing-library/react';

describe('Footer component', () => {
  it('renders in the page', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
