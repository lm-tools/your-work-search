const moment = require('moment');

function priorityResultWith(override) {
  return Object.assign({
    interested: 'default',
    applied: 'default',
    interview: 'default',
    failure: 'default',
    success: 'default',
  }, override);
}

function findAllWithStatuses(jobList, status) {
  return jobList.filter(it => it.status === status);
};

function containsStatus(jobList, ...params) {
  return findAllWithStatuses(jobList, params).length > 0;
}

function allDatesOlderThen21days(jobList = []) {
  if (jobList.length === 0) {
    return false;
  }
  const _21DaysAgo = moment().subtract(21, 'days');

  const jobYoungerThen21days = jobList
    .find(it => moment(it.statusDate).isAfter(_21DaysAgo, 'day'));
  return !jobYoungerThen21days;
}

function priorityForInterviewStatus(jobList) {
  var interviewJobs = findAllWithStatuses(jobList, 'interview');
  return interviewJobs.length > 0 && allDatesOlderThen21days(interviewJobs) ? 'high' : 'default';
}


function priority(jobList) {
  const sorted = jobList.sort((a, b) => a.status_sort_index > b.status_sort_index);
  const highestOrder = sorted[0];
  if (!highestOrder) return priorityResultWith({});
  switch (highestOrder.status) {
    case 'interested':
      return priorityResultWith({ interested: 'high' });
    case 'applied':
      return priorityResultWith({ interested: 'high', applied: 'high' });
    case 'interview':
      const interviewJobs = findAllWithStatuses(jobList, 'interview');
      const priority = allDatesOlderThen21days(interviewJobs) ? 'default' : 'high';
      return priorityResultWith({ interested: priority, applied: priority, interview: priority });
    case 'success':

    default:
      return priorityResultWith({});
  }
}

module.exports = {
  priority,
};
