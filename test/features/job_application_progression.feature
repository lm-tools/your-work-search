Feature: Job application progression
  As a claimant
  I want to keep track of the progress of my job applications
  In order to get better assistance from my work coach

Scenario: Set job progression
  Given I have added a job application to my account
  When I set that job's progression status
  Then the status should reflect on the dashboard
