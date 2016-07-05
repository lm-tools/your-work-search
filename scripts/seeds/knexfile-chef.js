// Update with your config settings.
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      database: 'your_work_search',
    },
    seeds: {
      directory: './chef',
    },
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      database: 'your_work_search_test',
    },
    seeds: {
      directory: './chef',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: './chef',
    },
  },
};
