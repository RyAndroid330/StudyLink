describe('Navigation Bar Test', () => {
  it('should have 4 navigation links', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.navContainer .q-btn').should('have.length', 4);
  });

  it('should navigate to the correct page when a link is clicked', () => {
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

describe('E2E Test Worship Page', () => {
  it('should open the worship page and search for a song', () => {
    cy.visit('http://localhost:3000/Worship');

    cy.get('.q-field').type('amazing');
    cy.get('input').type('{enter}');
    cy.get('#songTitle').should('contain', 'Amazing Grace');
  });
});

// describe('Test Bible Page', function () {
//   it('should allow users to select a book', () => {
//     cy.visit('http://localhost:3000/Bible');

//     // Ensure the element is visible before clicking
//     cy.get('#select-book').eq(0).click(); // Open the dropdown

//     // Ensure the dropdown options are visible
//     cy.get('#select-book .q-item_section').should('be.visible');

//     // Select the option
//     cy.get('#select-book .q-item_section').contains('genesis').click();

//     // Additional assertions if needed
//     // cy.get('#select-chapter').click().select('1');
//     // cy.get('#chapter-text').should('contain', 'In the beginning');
//   });
// });
describe('TDD Study Page', function () {
  it('should open study 1 and check viewer fintions', () => {
    cy.visit('http://localhost:3000/study/1');
    cy.get('#study-title').should('contain', 'Sin and Love');
    cy.get('#study-content').should(
      'contain',
      'Understanding Why God Allowed Sin'
    );
    cy.get('#slide-number').should('contain', '1');
    cy.get('#next-button').click();
    cy.get('#study-content').should('contain', 'Free Will is Love in Action');
    cy.get('#slide-number').should('contain', '2');
    cy.get('#previous-button').click();
    cy.get('#slide-number').should('contain', '1');
    cy.get('#study-content').should(
      'contain',
      'Understanding Why God Allowed Sin'
    );
  });
});
