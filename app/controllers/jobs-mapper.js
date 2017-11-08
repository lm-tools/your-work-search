const progression = require('../models/progression');
/* eslint-disable no-underscore-dangle */

function mapToUpdateModel(body) {
  const updateData = Object.assign({}, body);
  delete updateData._csrf;

  if (updateData.status) {
    updateData.status_sort_index = progression.getById(updateData.status).order;
    const dateField = progression.getById(updateData.status).dateField;
    progression
      .getAll()
      .filter(it => it.id !== updateData.status)
      .forEach(it => {
        delete updateData[it.dateField];
      });

    if (updateData[dateField] === '') {
      updateData[dateField] = null;
    }

    if (['failure'].includes(updateData.status)) {
      updateData[dateField] = new Date();
    }
  }

  return updateData;
}

module.exports = {
  mapToUpdateModel,
};
