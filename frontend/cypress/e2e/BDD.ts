import {
  When,
  Then,
  Given,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';

describe('Create Study', () => {
  Before(() => {
    cy.visit('http://localhost:3000/create-study');
  });

  Given('I am on the {string} page', (page: string) => {
    cy.visit(`http://localhost:3000/${page}`);
  });

  Then('I should see 3 radio buttons', () => {
    cy.get('.q-radio').should('have.length', 3);
  });

  Then('radio button 1 should be labeled "Text"', () => {
    cy.get('.q-radio').eq(0).find('.q-radio__label').should('contain', 'Text');
  });

  Then('radio button 2 should be labeled "Bible Verse"', () => {
    cy.get('.q-radio')
      .eq(1)
      .find('.q-radio__label')
      .should('contain', 'Bible Verse');
  });

  Then('radio button 3 should be labeled "Song"', () => {
    cy.get('.q-radio').eq(2).find('.q-radio__label').should('contain', 'Song');
  });

  When('I select the "Text" radio button', () => {
    cy.get('.q-radio').eq(0).click();
  });

  Then('a text input should be visible', () => {
    cy.get('.q-editor__content').should('be.visible');
  });

  When('I enter "Sample text" into the text input', () => {
    cy.get('.q-editor__content').type('Sample text');
  });

  When('I click the "Add Slide" button', () => {
    cy.get('.q-btn').contains('Add Slide').click();
  });

  Then('the slide number should increase by one', () => {
    cy.get('#slide-number').should('contain', '2');
  });

  When('I click the "Save" button', () => {
    cy.get('.q-btn').contains('Save').click();
  });

  Then('the form should be closed', () => {
    cy.get('form').should('not.exist');
  });
});
