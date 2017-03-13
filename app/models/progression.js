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

  getById(id) {
    return this.model.find(item => item.id === id);
  }

  getInitialSubset() {
    return this.model.slice(0, 3).map(item => item.id);
  }
}

module.exports = new Progression();
