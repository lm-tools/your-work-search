const moment = require('moment');
const i18n = require('i18n');
const progression = require('../models/progression');
const singleStatusRules = require('../rules/single-status-rules');
const timelinePriorityRules = require('../rules/timeline-rules-priority');
const timelineTextRules = require('../../app/rules/timeline-rules-text');

module.exports = class DashboardViewModel {

  constructor(accountId, jobs, totalSavedJobs, sort, focus) {
    this.accountId = accountId;
    this.jobs = this.dashboardJobs(jobs, focus);
    this.hasJobs = totalSavedJobs > 0;
    this.sortType = sort;
    this.sortOptions = this.dashboardSortOptions(sort);
    this.timeline = this.dashboardTimeline(jobs);
  }

  dashboardJobs(jobs, jobIdInFocus) {
    return jobs
      .map((job) => Object.assign(
        {
          progression: this.dashboardJobProgression(job),
          // eslint-disable-next-line no-underscore-dangle
          statusString: i18n.__(`progression.${job.status}`),
          updatedFormatted: this.formatDate(job.updated_at),
          interestLevel: [5, 4, 3, 2, 1].map(v => ({ value: v, isChecked: v === job.rating })),
          source: this.formatSource(job),
          hasFocus: job.id === parseInt(jobIdInFocus, 10),
          statusDateString: singleStatusRules.dateText(job.status, job.statusDate),
          statusPriority: singleStatusRules.priority(job.status, job.statusDate),
        },
        job));
  }

  dashboardJobProgression(job) {
    return progression.getAllIds().map((status) => ({
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
    ];
  }

  dashboardTimeline(jobs) {
    let currentStatus = 'unknown';

    const priority = timelinePriorityRules.priority(jobs);
    const text = timelineTextRules.text(jobs);

    const statusList = Object.keys(priority);
    const indexOfFirstDefaultPriority = statusList.map(
      status => priority[status]).findIndex(p => p === 'default');

    if (indexOfFirstDefaultPriority > 0) {
      currentStatus = statusList[indexOfFirstDefaultPriority - 1];
    }

    return statusList.map((status, index) => (
      {
        // eslint-disable-next-line no-underscore-dangle
        heading: i18n.__(`timeline.status.${status}`),
        class: this.buildStatusClass(index, status, currentStatus, statusList, priority),
        message: text[status],
      }
    ));
  }

  buildStatusClass(index, status, currentStatus, statusList, priority) {
    const classArray = [];

    if (priority[status] === singleStatusRules.PRIORITY.HIGH) {
      classArray.push('timeline__item--highlight');
    } else {
      classArray.push('timeline__item--default');
    }

    if (index === 0) {
      classArray.push('timeline__item--start');
    } else if (index === statusList.length - 1) {
      classArray.push('timeline__item--finish');
    }

    if (status === currentStatus) {
      classArray.push('timeline__item--current');
    }

    return classArray.toString().replace(',', ' ');
  }

  formatDate(inputDate) {
    if (!inputDate) return '';
    return moment(inputDate).format('D MMMM YYYY');
  }

  formatSource(job) {
    return job.sourceType === 'online' && job.sourceUrl ? job.sourceUrl : '';
  }
};
