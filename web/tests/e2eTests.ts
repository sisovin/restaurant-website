import { mount } from '@cypress/react';
import ReservationForm from '../components/ReservationForm';
import Menu from '../components/Menu';

describe('End-to-End Testing', () => {
  it('should create a new reservation', () => {
    mount(<ReservationForm />);
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="date"]').type('2023-12-31');
    cy.get('input[name="time"]').type('19:00');
    cy.get('input[name="guests"]').type('4');
    cy.get('button[type="submit"]').click();
    cy.contains('Form submitted:').should('be.visible');
  });

  it('should fetch and display menu items', () => {
    mount(<Menu />);
    cy.intercept('GET', '/api/menu', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Pizza', description: 'Delicious cheese pizza', price: 10, category: 'Main' },
        { id: 2, name: 'Salad', description: 'Fresh garden salad', price: 5, category: 'Appetizer' },
      ],
    }).as('getMenuItems');
    cy.wait('@getMenuItems');
    cy.contains('Pizza').should('be.visible');
    cy.contains('Salad').should('be.visible');
  });
});
