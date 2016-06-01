// Update with your config settings.
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      database: 'your_work_search',
    },
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      database: 'your_work_search_test',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
