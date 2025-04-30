import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ReservationForm } from '../components/ReservationForm';
import { Menu } from '../components/Menu';

describe('API Integration Tests', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('should create a new reservation', async () => {
    mock.onPost('/api/reservations').reply(201, { reservationId: 1 });

    render(<ReservationForm />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-12-31' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '19:00' } });
    fireEvent.change(screen.getByLabelText(/guests/i), { target: { value: '4' } });

    fireEvent.click(screen.getByText(/submit/i));

    const successMessage = await screen.findByText(/reservation created successfully/i);
    expect(successMessage).toBeInTheDocument();
  });

  test('should fetch menu items', async () => {
    const menuItems = [
      { id: 1, name: 'Pizza', description: 'Delicious cheese pizza', price: 10, category: 'Main' },
      { id: 2, name: 'Salad', description: 'Fresh garden salad', price: 5, category: 'Appetizer' },
    ];

    mock.onGet('/api/menu').reply(200, menuItems);

    render(<Menu />);

    const pizzaItem = await screen.findByText(/pizza/i);
    const saladItem = await screen.findByText(/salad/i);

    expect(pizzaItem).toBeInTheDocument();
    expect(saladItem).toBeInTheDocument();
  });
});
