const moment = require('moment');
const _ = require('lodash');

function atLeastOneJob(jobs) {
  return !!jobs && jobs.length > 0;
}

function anyJobWithoutDate(jobList) {
  return jobList && jobList.filter(j => !j.statusDate).length > 0;
}

function anyJobYoungerThan21days(jobList) {
  const time21DaysAgo = moment().subtract(21, 'days');

  if (atLeastOneJob(jobList)) {
    const jobsWithADate = jobList.filter(j => !!j.statusDate);

    const jobYoungerThan21days = jobsWithADate
      .find(it => moment(it.statusDate).isAfter(time21DaysAgo, 'day'));

    return jobYoungerThan21days;
  }
  return false;
}

function allDatesOlderThen21days(jobList) {
  return !anyJobYoungerThan21days(jobList);
}

function noJobsWithoutDates(jobList) {
  if (atLeastOneJob(jobList)) {
    return jobList.filter(job => job.statusDate === null).length === 0;
  }
  return true;
}

function groupByStatus(jobList) {
  return _.groupBy(jobList, 'status');
}

function rulesForInterested(jobs) {
  const rule = anyJobWithoutDate(jobs) || anyJobYoungerThan21days(jobs) ? 'high' : 'default';
  return { interested: rule };
}

function rulesForApplied(jobs) {
  const rule = anyJobWithoutDate(jobs) || anyJobYoungerThan21days(jobs) ? 'high' : 'default';
  return { applied: rule };
}

function rulesForInterview(jobs) {
  const rule = allDatesOlderThen21days(jobs) && noJobsWithoutDates(jobs) ? 'default' : 'high';
  return { interview: rule };
}

function rulesForSuccess(jobs) {
  const rule = allDatesOlderThen21days(jobs) ? 'default' : 'high';
  return { success: rule };
}

function overrideWhenNecessary(rules) {
  const overrides = Object.assign({}, rules);
  if (overrides.success === 'high') {
    overrides.interview = 'high';
  }
  if (overrides.interview === 'high') {
    overrides.applied = 'high';
  }
  if (overrides.applied === 'high') {
    overrides.interested = 'high';
  }
  return overrides;
}

function priority(jobList) {
  const jobsByStatus = groupByStatus(jobList);

  const rulesPerStatus = Object.assign({},
    rulesForInterested(jobsByStatus.interested),
    rulesForApplied(jobsByStatus.applied),
    rulesForInterview(jobsByStatus.interview),
    rulesForSuccess(jobsByStatus.success)
  );

  return overrideWhenNecessary(rulesPerStatus);
}

module.exports = { priority };
