# Your work search

[![Build status][build status image]][ci]

Keep track of your work search.

[![Deploy][heroku deploy image]][heroku deploy hook]

## Dev setup

### Database

App requires postgresql running locally. You can run it in docker following below instructions

    $ docker run --name some-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
    $ docker run --rm -e PGPASSWORD=password --link some-postgres:postgres postgres psql -h postgres -U postgres  -c 'CREATE DATABASE your_work_search;'
    $ export DATABASE_URL=postgres://postgres:password@localhost/your_work_search

**Note**: if you are using *docker-machine* your *DATABASE_URL* will be different

    $ export DATABASE_URL=postgres://postgres:password@`docker-machine ip`/your_work_search

### Start the app

    $ npm i
    & npm run db-migrate
    $ npm run watch

## Mounting the application in a directory

The app will run mounted at "/" by default. To run within a directory, set the
`EXPRESS_BASE_PATH` environment variable.

For example, to mount the application at "/your-work-search", run:

```sh
$ EXPRESS_BASE_PATH=/work-you-could-do npm run start
```

### Resources

* [Zombie.js documentation][zombie docs]

[build status image]: https://api.travis-ci.org/lm-tools/your-work-search.svg
[ci]: https://travis-ci.org/lm-tools/your-work-search
[heroku deploy image]: https://www.herokucdn.com/deploy/button.svg
[heroku deploy hook]: https://heroku.com/deploy
[zombie docs]: https://zombie.readthedocs.io/en/latest/index.html
