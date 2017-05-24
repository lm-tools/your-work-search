const moment = require('moment');

function priorityResultWith(override) {
  return Object.assign({
    interested: 'default',
    applied: 'default',
    interview: 'default',
    failure: 'default',
    success: 'default',
  }, override)
}

var findAllWithStatuses = function (jobList, status) {
  return jobList.filter(it => it.status === status);
};

function containsStatus(jobList, ...params) {
  return findAllWithStatuses(jobList, params).length > 0;
}
function allDatesYoungerThen21days(jobList = []) {
  if (jobList.length === 0) {
    return true;
  }
  const jobOlderThen20Days = jobList
    .find(it => moment(it.statusDate).isBefore(moment().subtract(20, 'days'), 'day'));
  return !jobOlderThen20Days;

}

function priorityForInterviewStatus(jobList) {
  var interviewJobs = findAllWithStatuses(jobList, 'interview');
  return interviewJobs.length > 0 && allDatesYoungerThen21days(interviewJobs) ? 'high' : 'default';
}


function priority(jobList) {
  // find the highest status
  // check the rules for it
  const interviewJobs = findAllWithStatuses(jobList, 'interview');
  if (interviewJobs.length > 0) {
    const priority = allDatesYoungerThen21days(interviewJobs) ? 'high' : 'default';
    return priorityResultWith({ interested: priority, applied: priority, interview: priority })
  } else {
    return {
      interested: jobList.length > 0 ? 'high' : 'default',
      applied: containsStatus(jobList, 'applied', 'interview') ? 'high' : 'default',
      interview: 'default',
      failure: 'default',
      success: 'default',
    }

  }
}

module.exports = {
  priority
};
