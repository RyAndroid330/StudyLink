import {
  When,
  Then,
  Given,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';

describe('Create Study from', () => {
  Before(() => {
    cy.visit('http://localhost:3000/create-study');
  });

  Given('User is on the create study page', () => {
    cy.visit('http://localhost:3000/create-study');
  });

  When('User sees radio buttons', () => {
    cy.get('input[type="radio"]').should('have.length', 3);
    cy.get('input[type="radio"]').eq(0).should('have.attr', 'label', 'Text');
    cy.get('input[type="radio"]')
      .eq(1)
      .should('have.attr', 'label', 'Bible Verse');
    cy.get('input[type="radio"]').eq(2).should('have.attr', 'label', 'Song');
    cy.get('#slide-number').should('contain', '1');
  });

  When('User selects "Text" option and adds a slide', () => {
    cy.get('input[type="radio"]').eq(0).check();
    cy.get('input[type="text"]').should('be.visible').type('Sample text');
    cy.get('button').contains('Add Slide').click();
    cy.get('#slide-number').should('contain', '2');
  });

  When('User selects "Bible Verse" option and adds a slide', () => {
    cy.get('input[type="radio"]').eq(1).check();
    cy.get('book').click().should('be.visible').select('John');
    cy.get('chapter').click().should('be.visible').select('3');
    cy.get('bibleText').should('be.visible');
    cy.get('button').contains('Add Slide').click();
    cy.get('#slide-number').should('contain', '3');
  });

  When('User selects "Song" option and adds a slide', () => {
    cy.get('input[type="radio"]').eq(2).check();
    cy.get('input[type="text"]').should('be.visible').type('Amazing Grace');
    cy.get('button').contains('Add Slide').click();
    cy.get('#slide-number').should('contain', '4');
  });

  Then('User saves the study', () => {
    cy.get('button').contains('Save').click();
    cy.get('form').should('not.exist');
  });
});
