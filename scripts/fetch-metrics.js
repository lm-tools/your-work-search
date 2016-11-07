#!/usr/bin/env node
/* eslint-disable no-console */
const knex = require('../app/db').knex;
let output = 'interventionRef,totalSaved\n';

knex('jobs')
  .select('accountId as interventionRef')
  .count('accountId as totalSaved')
  .groupBy('accountId')
  .then((result) => {
    result.forEach((account) => {
      output += `${account.interventionRef},${account.totalSaved}\n`;
    });
    console.log(output.toString());
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

