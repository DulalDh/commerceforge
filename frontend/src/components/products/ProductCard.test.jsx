import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard.jsx';

const product = {
  _id: 'product-1',
  name: 'Premium Cotton Panjabi',
  category: 'Fashion',
  price: 1800,
  discountPrice: 1500,
  description: 'Comfortable cotton panjabi',
  images: []
};

describe('ProductCard', () => {
  it('renders product information and handles add to cart', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard onAddToCart={onAddToCart} product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText('Premium Cotton Panjabi')).toBeInTheDocument();
    expect(screen.getByText('৳1500')).toBeInTheDocument();
    expect(screen.getByText('৳1800')).toBeInTheDocument();

    await user.click(screen.getByTitle('Add to cart'));
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });
});
