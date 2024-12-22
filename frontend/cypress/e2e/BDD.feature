Feature: Create Study from

  There should be 3 radio buttons, radio button 1 is for basic text, radio button 2 is to add a Bible verse and radio button 3 is to add a song. When text is selected then a text input should be visible, when Bible verse is selected then the verse selector should be visible, when song is selected then the song search input should be visible. There should also be an add slide button to save the slide to the database and a save button to close the form.

  Scenario: User sees radio buttons
    Given I am on the "Create Study" page
    Then I should see 3 radio buttons
    And radio button 1 should be labeled "Basic Text"
    And radio button 2 should be labeled "Bible Verse"
    And radio button 3 should be labeled "Song"

  Scenario: User selects "Basic Text" option and adds a slide
    Given I am on the "Create Study" page
    When I select the "Basic Text" radio button
    Then a text input should be visible
    And I enter "Sample text" into the text input
    And I click the "Add Slide" button
    Then the slide should be saved to the database
    And the form should reset
    And the slide number should increase by one

  Scenario: User selects "Bible Verse" option and adds a slide
    Given I am on the "Create Study" page
    When I select the "Bible Verse" radio button
    Then the verse selector should be visible
    And I select "John 3:16" from the verse selector
    And I click the "Add Slide" button
    Then the slide should be saved to the database
    And the form should reset
    And the slide number should increase by one

  Scenario: User selects "Song" option and adds a slide
    Given I am on the "Create Study" page
    When I select the "Song" radio button
    Then the song search input should be visible
    And I enter "Amazing Grace" into the song search input
    And I click the "Add Slide" button
    Then the slide should be saved to the database
    And the form should reset
    And the slide number should increase by one

  Scenario: User saves the study
    Given I am on the "Create Study" page
    When I click the "Save" button
    Then the form should be closed
    And the study should be saved to the database
