class Progression {
  constructor() {
    this.model = [
      { id: 'interested', order: 0, dateField: 'deadlineDate' },
      { id: 'applied', order: 1, dateField: 'applicationDate' },
      { id: 'interview', order: 2, dateField: 'interviewDate' },
      { id: 'failure', order: 3, dateField: 'updated_at' },
      { id: 'success', order: 4, dateField: 'updated_at' },
    ];
  }

  getAllIds() {
    return this.model.map(item => item.id);
  }

  getById(id) {
    return this.model.find(item => item.id === id);
  }

  getInitialSubset() {
    return this.model.slice(0, 3).map(item => item.id);
  }
}

module.exports = new Progression();
