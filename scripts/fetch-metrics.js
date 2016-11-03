#!/usr/bin/env node
/* eslint-disable no-console */
const knex = require('../app/db').knex;

knex('jobs')
  .select('accountId as interventionRef')
  .count('accountId as totalSaved')
  .groupBy('accountId')
  .then((result) => {
    console.log(JSON.stringify({ TotalSavedJobs: result }));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

