const moment = require('moment');
const i18n = require('i18n');
const progression = require('../models/progression');

module.exports = class DashboardViewModel {

  constructor(accountId, jobModels, sort, filter) {
    this.accountId = accountId;
    this.jobs = this.dashboardJobs(jobModels);
    this.sortType = sort;
    this.filterType = filter;
    this.sortOptions = this.dashboardSortOptions(sort);
    this.filterOptions = this.dashboardFilterOptions(filter);
    this.timelineData = this.dashboardTimeline(jobModels);
  }

  dashboardJobs(jobModels) {
    return jobModels
      .map((job) => Object.assign(
        {
          progression: this.dashboardJobProgression(job),
          // eslint-disable-next-line no-underscore-dangle
          statusString: i18n.__(`progression.${job.status}`),
          deadlineFormatted: this.formatDeadline(job.deadline),
          interestLevel: [1, 2, 3, 4, 5].map(v => ({ value: v, isChecked: v === job.rating })),
          source: this.formatSource(job),
        },
        job));
  }

  dashboardJobProgression(job) {
    return progression.map((status) => ({
      name: status,
      isChecked: (job.status === status),
      // eslint-disable-next-line no-underscore-dangle
      label: i18n.__(`progression.${status}`),
    }));
  }

  dashboardSortOptions(sort) {
    return [
      { value: 'created',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.created'), selected: sort === 'created' },
      { value: 'updated',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.updated'), selected: sort === 'updated' },
      { value: 'status',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.status'), selected: sort === 'status' },
      { value: 'title',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.title'), selected: sort === 'title' },
      { value: 'employer',
       // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.employer'), selected: sort === 'employer' },
      { value: 'deadline',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.sort.deadline'), selected: sort === 'deadline' },
    ];
  }

  dashboardFilterOptions(filter) {
    return [
      { value: 'none',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.filter.none'), selected: filter === 'none' },
      { value: 'week',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.filter.week'), selected: filter === 'week' },
      { value: 'fortnight',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.filter.fortnight'), selected: filter === 'fortnight' },
      { value: 'month',
        // eslint-disable-next-line no-underscore-dangle
        label: i18n.__('dashboard.filter.month'), selected: filter === 'month' },
    ];
  }

  formatDeadline(deadline) {
    if (!deadline) return '';

    const date = moment(deadline);
    return date.isSame(new Date(), 'year') ? date.format('D MMMM') : date.format('D MMMM YYYY');
  }

  formatSource(job) {
    if (!job.sourceType) return null;

    // eslint-disable-next-line no-underscore-dangle
    return job.sourceUrl ? job.sourceUrl : i18n.__(`sourceType.${job.sourceType}`);
  }

  dashboardTimeline(jobModels) {
    const totals = { interested: 0, applied: 0, interview: 0, result: 0 };

    jobModels.forEach(function (job) {
      totals[job.status]++;
    });

    const totalsArray = Object.keys(totals).map(function (k) { return totals[k]; });
    const maxTotal = Math.max.apply(Math, totalsArray);

    return {
      maxScale: this.getTimelineScale(maxTotal),
      totals: [
        { type: 'interested',
          total: totals.interested,
          scale: this.getTimelineScale(totals.interested) },
        { type: 'applied',
          total: totals.applied,
          scale: this.getTimelineScale(totals.applied) },
        { type: 'interview',
          total: totals.interview,
          scale: this.getTimelineScale(totals.interview) },
        { type: 'result',
          total: totals.result,
          scale: this.getTimelineScale(totals.result) },
      ],
    };
  }

  getTimelineScale(total) {
    return total < 6 ? total : 6;
  }
};
