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
        let urlSearch = `/api/v1/incidents/`;
        if (payload) {
          urlSearch = `${urlSearch}?${new URLSearchParams(payload).toString()}`;
        }
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getIncidentById(context, incidentId) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.get(`/api/v1/incidents/${incidentId}/`));
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
        let urlSearch = `/api/v1/incidents/${payload.incident_id}/resources/`;
        if (
          payload.resource__user__first_name ||
          payload.resource__user__last_name ||
          payload.resource__type ||
          payload.page
        ) {
          urlSearch = urlSearch + "?";
        }
        if (payload.resource__user__first_name) {
          urlSearch =
            urlSearch +
            `resource__user__first_name=${payload.resource__user__first_name}&`;
        }
        if (payload.resource__user__last_name) {
          urlSearch = `${urlSearch}resource__user__last_name=${payload.resource__user__last_name}&`;
        }
        if (payload.resource__type) {
          urlSearch = `${urlSearch}resource__type__name=${payload.resource__type}&`;
        }
        if (payload.page) {
          urlSearch = `${urlSearch}page=${payload.page}&`;
        }
        if (payload.page_size) {
          urlSearch = `${urlSearch}&page_size=${payload.page_size}&`;
        }
        // If something happens with this endpoint, check the "&" at the end of searched url.
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getIncidentTypeStatistics(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/incident-types/${payload.incident_type_name}/statistics/`;
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
  postIncidentTrackPoints(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/incidents/${payload.incident_id}/resources/${payload.resource_id}/track-points/`;
        return resolve(await api.post(urlSearch, payload));
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
  },
  getUser(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/users/${payload.idUser}/`;
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  deleteResourceProfile(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlResource = `/api/v1/resources/${payload.resourceId}/`;
        return resolve(await api.delete(urlResource));
      } catch (e) {
        return reject(e);
      }
    });
  },
  deleteAdminProfile(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlAdmin = `/api/v1/admins/${payload.adminId}/`;
        return resolve(await api.delete(urlAdmin));
      } catch (e) {
        return reject(e);
      }
    });
  },
  deleteSupervisorProfile(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSupervisor = `/api/v1/supervisors/${payload.supervisorId}/`;
        return resolve(await api.delete(urlSupervisor));
      } catch (e) {
        return reject(e);
      }
    });
  }
};
