Feature: Create Study

  Scenario: User sees radio buttons
    Given I am on the "create-study" page
    Then I should see 3 radio buttons
    And radio button 1 should be labeled "Text"
    And radio button 2 should be labeled "Bible Verse"
    And radio button 3 should be labeled "Song"

  Scenario: User selects "Text" option and adds a slide
    Given I am on the "create-study" page
    When I select the "Text" radio button
    Then a text input should be visible
    And I enter "Sample text" into the text input
    And I click the "Add Slide" button
    Then the slide number should increase by one

  Scenario: User saves the study
    Given I am on the "create-study" page
    When I click the "Save" button
    Then the form should be closed
