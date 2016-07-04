# Scripts
## Bulk Data upload
 - generateJobSeed.sh - Create a knex seed file for jobs from a jobs.csv file
 - loadJobSeed.sh - Will load the job seed into the db
### generateJobSeed
Should be used locally to create a job_seed file from a csv file.  Steps to use are:
 - Edit the jobs spreadsheet (see example in jobs.ods)
 - Save file/tab as csv (file produced should be jobs.csv)
 - run the following with a memorable name for your jobset (e.g. chef):
```sh
$ ./generateJobSeed.sh chef
```
This will create the following structure:
```sh
|-- seeds
      |-- knexfile-chef.js
      |-- chef
            |-- job_seed.js
```
### loadJobSeed
> ONLY used remotely to load the seed data

To load the seed locally run the following from the scripts directory:
```sh
$ ../node_modules/.bin/knex seed:run --knexfile ./seeds/knexfile-chef.js
```
To load the seed remotely run the following:
```sh
$ heroku run:detached --app <APP-NAME> ./scripts/loadSeed.sh chef
```
where:
<APP-NAME> can be obtained from heroku with the command:
```sh
$ heroku apps
```
