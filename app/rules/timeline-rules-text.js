const moment = require('moment');
const _ = require('lodash');

const weekFromNow = () => moment().add(7, 'days');
const now = () => moment();
const time3weeksAgo = () => moment().subtract(3, 'weeks');

function groupByStatus(jobList) {
  return _.groupBy(jobList, 'status');
}

function noJobWithStatusDateSet(jobs) {
  return !jobs.find(it => !!it.statusDate);
}

function atLeastOneJob(jobs) {
  return !!jobs && jobs.length > 0;
}

function mostRecentUpdatedDate(jobs) {
  const sorted = jobs.sort((a, b) => moment(a.updated_at).isBefore(moment(b.updated_at)));
  return sorted[0].updated_at;
}

function mostRecentStatusDate(jobs) {
  const sorted = jobs.sort((a, b) => moment(a.statusDate).isBefore(moment(b.statusDate)));
  return sorted[0] ? sorted[0].statusDate : null;
}

function soonestStatusDate(jobs) {
  const sorted = jobs.sort((a, b) => moment(a.statusDate).isAfter(moment(b.statusDate)));
  return sorted[0] ? sorted[0].statusDate : null;
}

function allJobsMoreThenAWeekInTheFuture(jobs) {
  return !jobs.find(it => moment(it.statusDate).isSameOrBefore(weekFromNow(), 'day'));
}

function findJobsExpiringInLessThanAWeek(jobs) {
  return jobs.filter(
    it => moment(it.statusDate).isBetween(now(), weekFromNow(), 'day', '[]')
  );
}

function findJobsExpiringToday(jobs) {
  return jobs.filter(it => it.statusDate && moment(it.statusDate).isSame(now(), 'day'));
}

function findJobsExpiringInTheFuture(jobs) {
  return jobs.filter(it => moment(it.statusDate).isAfter(now(), 'day'));
}

function findJobsExpired(jobs, when = now()) {
  return jobs.filter(it => moment(it.statusDate).isBefore(when, 'day'));
}

function getTextForInterested(jobs) {
  if (noJobWithStatusDateSet(jobs) || allJobsMoreThenAWeekInTheFuture(jobs)) {
    const date = mostRecentUpdatedDate(jobs);
    return [`Updated ${moment(date).fromNow()}`];
  }

  const jobsExpiringSoonCount = findJobsExpiringInLessThanAWeek(jobs).length;
  if (jobsExpiringSoonCount === 1) {
    return ['One job expiring soon'];
  }
  if (jobsExpiringSoonCount > 1) {
    return [`${jobsExpiringSoonCount} jobs expiring soon`];
  }
  return [];
}

function rulesForInterested(jobs) {
  if (atLeastOneJob(jobs)) {
    const interestedText = getTextForInterested(jobs);
    return { interested: interestedText };
  }
  return { interested: [] };
}

function getTextForApplied(jobs) {
  if (atLeastOneJob(jobs)) {
    const mostRecentDate = mostRecentStatusDate(jobs);
    if (!!mostRecentDate && moment(mostRecentDate).isBefore(now(), 'day')) {
      return [`Last ${moment(mostRecentDate).fromNow()}`];
    }
  }
  return [];
}

function rulesForApplied(jobs) {
  const applied = getTextForApplied(jobs);
  return { applied };
}

function getTextForInterview(jobs) {
  if (atLeastOneJob(jobs)) {
    if (findJobsExpiringToday(jobs).length > 0) {
      return ['Interviewing today'];
    }
    const result = [];
    const expiringInTheFuture = findJobsExpiringInTheFuture(jobs);
    if (expiringInTheFuture.length > 0) {
      const date = soonestStatusDate(expiringInTheFuture);
      result.push(`Next ${moment(date).fromNow()}`);
    }
    const expiredJobs = findJobsExpired(jobs);
    if (expiredJobs.length > 0) {
      const date = mostRecentStatusDate(expiredJobs);
      result.push(`Last ${moment(date).fromNow()}`);
    }
    return result;
  }
  return [];
}

function rulesForInterview(jobs) {
  const interview = getTextForInterview(jobs);
  return { interview };
}

function getTextForSuccess(jobs) {
  if (atLeastOneJob(jobs)) {
    const jobsExpired = findJobsExpired(jobs, time3weeksAgo());
    if (jobsExpired.length === jobs.length) {
      const date = mostRecentStatusDate(jobsExpired);
      return [`Last ${moment(date).fromNow()}`];
    }
    return ['Congratulations – make sure your work coach knows.'];
  }
  return [];
}

function rulesForSuccess(jobs) {
  const success = getTextForSuccess(jobs);
  return { success };
}

function text(jobList) {
  const jobsByStatus = groupByStatus(jobList);

  const rulesPerStatus = Object.assign({},
    rulesForInterested(jobsByStatus.interested),
    rulesForApplied(jobsByStatus.applied),
    rulesForInterview(jobsByStatus.interview),
    rulesForSuccess(jobsByStatus.success)
  );

  return rulesPerStatus;
}

module.exports = { text };
