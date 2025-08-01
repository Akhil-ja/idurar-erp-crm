const express = require('express');
const { catchErrors } = require('@/handlers/errorHandlers');
const router = express.Router();

const appControllers = require('@/controllers/appControllers');
const adminAuth = require('@/controllers/coreControllers/adminAuth');
const { routesList } = require('@/models/utils');

const routerApp = (entity, controller) => {
  router.route(`/${entity}/create`).post(adminAuth.isValidAuthToken, catchErrors(controller['create']));
  router.route(`/${entity}/read/:id`).get(catchErrors(controller['read']));
  router.route(`/${entity}/update/:id`).patch(catchErrors(controller['update']));
  router.route(`/${entity}/:id`).delete(catchErrors(controller['delete']));
  router.route(`/${entity}/search`).get(catchErrors(controller['search']));
  router.route(`/${entity}/list`).get(catchErrors(controller['list']));
  router.route(`/${entity}/listAll`).get(catchErrors(controller['listAll']));
  router.route(`/${entity}/filter`).get(catchErrors(controller['filter']));
  router.route(`/${entity}/summary`).get(catchErrors(controller['summary']));

  if (entity === 'invoice' || entity === 'quote' || entity === 'payment') {
    router.route(`/${entity}/mail`).post(catchErrors(controller['mail']));
  }

  if (entity === 'quote') {
    router.route(`/${entity}/convert/:id`).get(catchErrors(controller['convert']));
  }
};

routesList.forEach(({ entity, controllerName }) => {
  const controller = appControllers[controllerName];
  console.log(`Registering route for entity: ${entity}, controller: ${controllerName}`);
  routerApp(entity, controller);
});

const invoiceController = appControllers['invoiceController'];
router.route('/invoice/summarize-notes/:id').get(catchErrors(invoiceController.summarizeNotes));

const queryController = appControllers['queryController'];
router.post('/query/:id/notes', catchErrors(queryController.addNote));
router.delete('/query/:id/notes/:noteId', catchErrors(queryController.removeNote));

module.exports = router;
