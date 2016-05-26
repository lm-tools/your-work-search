@wip
Feature: Add a job
  As a claimant,
  I want to report jobs I am interested in or applying for
  so that I can continue to receive UC and avoid sanctions

  Scenario: Add an application
    When I add a job application
    Then it should show on my dashboard
