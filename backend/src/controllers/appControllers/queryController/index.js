const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
const methods = createCRUDController('Query');

const create = require('./create');
const read = require('./read');
const update = require('./update');
const remove = require('./remove');
const list = require('./paginatedList');
const addNote = require('./addNote');
const removeNote = require('./removeNote');

methods.create = create;
methods.read = read;
methods.update = update;
methods.delete = remove;
methods.list = list;
methods.addNote = addNote;
methods.removeNote = removeNote;

module.exports = methods;
