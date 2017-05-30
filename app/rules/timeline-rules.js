const moment = require('moment');
const _ = require('lodash');

function atLeastOneJob(jobs) {
  return !!jobs && jobs.length > 0;
}

function allDatesOlderThen21days(jobList) {
  if (atLeastOneJob(jobList)) {
    const time21DaysAgo = moment().subtract(21, 'days');

    const jobYoungerThen21days = jobList
      .find(it => moment(it.statusDate).isAfter(time21DaysAgo, 'day'));
    return !jobYoungerThen21days;
  }
  return true;
}

function groupByStatus(jobList) {
  return _.groupBy(jobList, 'status');
}

function rulesForInterested(jobs) {
  const rule = atLeastOneJob(jobs) ? 'high' : 'default';
  return { interested: rule };
}
function rulesForApplied(jobs) {
  const rule = atLeastOneJob(jobs) ? 'high' : 'default';
  return { applied: rule };
}

function rulesForInterview(jobs) {
  const rule = allDatesOlderThen21days(jobs) ? 'default' : 'high';
  return { interview: rule };
}

function rulesForSuccess(jobs) {
  const rule = allDatesOlderThen21days(jobs) ? 'default' : 'high';
  return { success: rule };
}

function overrideWhenNecessary(rules) {
  // todo
  return Object.assign({}, rules);
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
