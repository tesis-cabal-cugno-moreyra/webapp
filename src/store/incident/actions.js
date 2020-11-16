import api from "@/services/api";

export default {
  createIncident(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.post("/api/v1/incidents/", payload));
      } catch (e) {
        return reject(e);
      }
    });
  },
  postIncidentChangeStatus(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlApi = `/api/v1/incidents/${payload.incidentId}/${payload.incidentChangeStatus}/`;
        return resolve(await api.post(urlApi));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getIncident(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/incidents/?incident_type__name=${payload.incident_type__name}&external_assistance=${payload.visibility}&status=${payload.status}&data_status=${payload.data_status}&page=${payload.page}`;
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  postIncidentChangeExternalSupport(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlApi = `/api/v1/incidents/${payload.incidentId}/${payload.incidentChange}/`;
        return resolve(await api.post(urlApi));
      } catch (e) {
        return reject(e);
      }
    });
  },
  postIncidentDetails(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlApi = `/api/v1/incidents/${payload.incidentId}/details/`;
        return resolve(await api.post(urlApi, payload));
      } catch (e) {
        return reject(e);
      }
    });
  }
};
