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
        let urlSearch;
        if (payload) {
          urlSearch = `/api/v1/incidents/?incident_type__name=${payload.incident_type__name}&external_assistance=${payload.visibility}&status=${payload.status}&data_status=${payload.data_status}&page=${payload.page}`;
        } else {
          urlSearch = `/api/v1/incidents/`;
        }
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
  },
  getIncidentResources(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/incidents/${payload.incident_id}/resources/?resource__user__first_name=${payload.resource__user__first_name}&resource__user__last_name=${payload.resource__user__last_name}&resource__type__name=${payload.resource__type}&page=${payload.page}`;
        if (payload.page_size) {
          urlSearch = `${urlSearch}&page_size=${payload.page_size}`;
        }
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  postResourceIncident(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlResourceIncident = `/api/v1/incidents/${payload.incidentId}/resources/${payload.resourceId}/`;
        return resolve(await api.post(urlResourceIncident));
      } catch (e) {
        return reject(e);
      }
    });
  },

  deleteResourceIncident(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlResourceIncident = `/api/v1/incidents/${payload.incidentId}/resources/${payload.resourceId}/`;
        return resolve(await api.delete(urlResourceIncident));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getIncidentTrackPoints(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/incidents/${payload.incident_id}/track-points/`;
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getIncidentMapPoints(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/incidents/${payload.incident_id}/map-points/`;
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  }
};
