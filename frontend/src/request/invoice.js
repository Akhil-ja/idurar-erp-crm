import request from '@/request/request';

const entity = 'invoice';

const Invoice = {
  list: async (options) => {
    return await request.list({ entity, options });
  },
  create: async (jsonData) => {
    return await request.create({ entity, jsonData });
  },
  read: async (id) => {
    return await request.read({ entity, id });
  },
  update: async (id, jsonData) => {
    return await request.update({ entity, id, jsonData });
  },
  delete: async (id) => {
    return await request.delete({ entity, id });
  },
  summarizeNotes: async (id) => {
    return await request.get({ entity: `${entity}/summarize-notes/${id}` });
  },
};

export default Invoice;
