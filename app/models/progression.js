class Progression {
  constructor() {
    this.model = [
      { id: 'interested', order: 0 },
      { id: 'applied', order: 1 },
      { id: 'interview', order: 2 },
      { id: 'result', order: 3 },
    ];
  }

  getAllIds() {
    return this.model.map(item => item.id);
  }

  getInitial() {
    return this.model[0];
  }

  getById(id) {
    return this.model.find(item => item.id === id);
  }
}

module.exports = new Progression();
