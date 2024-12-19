describe('Navigation Bar', function () {
  it('should have navigation links', function () {
    cy.visit('http://localhost:3000/');
    cy.get('.navContainer .q-btn').should('have.length', 4);
  });

  it('should navigate to the correct page when a link is clicked', function () {
    cy.visit('http://localhost:3000/');
    cy.get('#assets').click();
    cy.url().should('eq', 'http://localhost:3000/assets');

    cy.get('#bible').click();
    cy.url().should('eq', 'http://localhost:3000/Bible');

    cy.get('#worship').click();
    cy.url().should('eq', 'http://localhost:3000/Worship');

    cy.get('#home').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('Test Worship Page', function () {
  it('should navigate to the correct page when a link is clicked', function () {
    cy.visit('http://localhost:3000/Worship');

    cy.get('.q-field').type('amazing');
    cy.get('input').type('{enter}');
    cy.get('#songTitle').should('contain', 'Amazing Grace');
  });
});

describe('Test Bible Page', function () {
  it('should allow users to select a book', () => {
    cy.visit('http://localhost:3000/Bible');
    cy.get('#select-book').click().wait(1000).select('Genesis');

    cy.get('#select-chapter').click().select('1');
    cy.get('#chapter-text').should('contain', 'In the beginning');
  });
});
