import request from '@/request/request';

const entity = 'query';

const Query = {
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
  addNote: async (id, jsonData) => {
    return await request.post({ entity: `${entity}/${id}/notes`, jsonData });
  },
  removeNote: async (queryId, noteId) => {
    return await request.delete({ entity: `${entity}/${queryId}/notes/${noteId}` });
  },
};

export default Query;
