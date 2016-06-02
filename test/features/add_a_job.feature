Feature: Add a job
  As a claimant,
  I want to report jobs I am interested in or applying for
  so that I can continue to receive UC and avoid sanctions

  Scenario: Add an application
    When I add a job application
    Then it should show on my dashboard
    And it should be be at the beginning of the job application progression

  Scenario: Validation
    When I add a job application without a title
    Then I should see a validation error

  Scenario: Multiple claimants add job application
    When multiple claimants have added job applications to their accounts
    Then each claimant should only be able to see their respective job applications
