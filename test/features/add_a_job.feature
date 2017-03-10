Feature: Add a job
  As a claimant,
  I want to report jobs I am interested in or applying for
  so that I can continue to receive UC and avoid sanctions

  Scenario: Multiple claimants add job application
    When multiple claimants have added job applications to their accounts
    Then each claimant should only be able to see their respective job applications
