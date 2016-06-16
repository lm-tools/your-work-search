require('../../app/middleware/i18n');

module.exports = {
  sampleJob(jobFields) {
    return Object.assign({
      title: 'Test job',
      employer: 'Test employer',
      sourceType: 'online',
      sourceUrl: 'http://example.org',
      rating: 4,
      deadline: new Date('2050-10-10'),
      status: 'applied',
    }, jobFields);
  },
};
