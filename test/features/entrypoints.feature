Feature: Entrypoints
  As a UCDS user
  I want a persistent work search account to be accessible from my UCDS account
  So that I can refer back to it during my work search
  And easily share it with my work coach
  ​
  Scenario: Access the tool for the first time
    Given I have never accessed my account
    When I access the tool with my account identifier
    Then I should see the dashboard, within my account

  Scenario: Access an existing account
    Given I have an existing account
    When I access the tool with my account identifier
    Then I should see the dashboard, within my account

  Scenario: Access the tool without an account identifier
    When I access the tool without an account identifier
    Then I should see the dashboard, within a new account
