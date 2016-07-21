# Your work search

[![Build status][build status image]][ci]

Keep track of your work search.

## Prerequisites
- [Node.js] 6
- [PostgreSQL] 9.4

## Installation

Clone the repository:

```sh
$ git clone https://github.com/lm-tools/your-work-search.git
```

Make sure that [PostgreSQL] is running, and that your current user (`$ whoami`)
has full access. Alternatively, custom database details can be provided by setting
a `DATABASE_URL` environment variable to a valid [PostgreSQL connection string]

Setup the application:

```sh
$ psql "create database your_work_search;"
$ psql "create database your_work_search_test;"
$ npm install
```

## Development

### Run locally in development mode

The following command will compile browser assets, start the
application on `http://localhost:3000`, then watch for changes and
recompile assets/restart the application as needed.

```sh
$ npm run watch
```

### Run database migrations

To run any outstanding database migrations:
```sh
$ npm run db-migrate
```

### Run tests

To run all tests, ensure that npm-shrinkwrap.json and package.json
are in sync, and lint Javascript code:
```sh
$ npm test
```

### Running the database in [Docker]

App requires postgresql running locally. You can run it in docker following below instructions

    $ docker run --name some-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
    $ docker run --rm -e PGPASSWORD=password --link some-postgres:postgres postgres psql -h postgres -U postgres  -c 'CREATE DATABASE your_work_search;'
    $ export DATABASE_URL=postgres://postgres:password@localhost/your_work_search

**Note**: if you are using *docker-machine* your *DATABASE_URL* will be different

    $ export DATABASE_URL=postgres://postgres:password@`docker-machine ip`/your_work_search

### NPM Shrinkwrap

We are using [npm shrinkwrap] to pin specific versions of the [npm]
dependency tree. If your `package.json` and `npm-shrinkwrap.json` go
out of sync then `npm test` will fail.

## Docker build

To build the application's docker image:

```sh
$ scripts/build.sh IMAGE
```

Run `scripts/build.sh` without arguments for usage instructions.

## Mounting the application in a directory

The app will run mounted at "/" by default. To run within a directory, set the
`EXPRESS_BASE_PATH` environment variable.

For example, to mount the application at "/your-work-search", run:

```sh
$ EXPRESS_BASE_PATH=/your-work-search npm run start
```

## Resources

* [Zombie.js documentation][zombie docs]

## Heroku

[![Deploy][heroku deploy image]][heroku deploy hook]

[build status image]: https://api.travis-ci.org/lm-tools/your-work-search.svg
[ci]: https://travis-ci.org/lm-tools/your-work-search
[Cucumber]: https://cucumber.io/
[Docker]: https://www.docker.com/
[heroku deploy hook]: https://heroku.com/deploy
[heroku deploy image]: https://www.herokucdn.com/deploy/button.svg
[npm]: https://www.npmjs.com/
[npm shrinkwrap]: https://docs.npmjs.com/cli/shrinkwrap
[Node.js]: https://nodejs.org
[PostgreSQL connection string]: http://www.postgresql.org/docs/9.4/static/libpq-connect.html#AEN41221
[PostgreSQL]: http://www.postgresql.org/
[PostgreSQL]: http://www.postgresql.org/
[zombie docs]: https://zombie.readthedocs.io/en/latest/index.html
