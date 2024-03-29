import api from "@/services/api";
import domainConfigServices from "@/services/domainConfigServices";

export default {
  getDomainAccessCode() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.get("/api/v1/domain-config/domain-code/"));
      } catch (e) {
        return reject(e);
      }
    });
  },
  checkDomainAccessCode(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await api.post("/api/v1/domain-config/domain-code/check/", payload)
        );
      } catch (e) {
        return reject(e);
      }
    });
  },
  refreshDomainAccessCode() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(
          await api.get("/api/v1/domain-config/renew-domain-code/")
        );
      } catch (e) {
        return reject(e);
      }
    });
  },
  createDomainConfig(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.post("/api/v1/domain-config/", payload));
      } catch (e) {
        return reject(e);
      }
    });
  },
  createSupervisor(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.post("/api/v1/supervisors/", payload));
      } catch (e) {
        return reject(e);
      }
    });
  },
  createResource(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.post("/api/v1/resources/", payload));
      } catch (e) {
        return reject(e);
      }
    });
  },
  createAdmin(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.post("/api/v1/admins/", payload));
      } catch (e) {
        return reject(e);
      }
    });
  },
  createUser(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.post("/api/v1/users/", payload));
      } catch (e) {
        return reject(e);
      }
    });
  },

  getDomainConfig() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const domainConfigResponse = await api.get("/api/v1/domain-config/");
        this.commit("domainConfig/addDomainConfig", domainConfigResponse.data);
        this.commit(
          "domainConfig/addDomainConfigAliases",
          domainConfigServices.getDomainConfigAlias(domainConfigResponse.data)
        );
        this.commit(
          "domainConfig/addDomainConfigIncidents",
          domainConfigServices.getIncidentAbstractions(
            domainConfigResponse.data
          )
        );
        return resolve(domainConfigResponse);
      } catch (e) {
        return reject(e);
      }
    });
  },
  getResourceById(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/resources/${payload}/`;
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
        let urlSearch = `/api/v1/users/?first_name=${payload.first_name}&last_name=${payload.last_name}&page=${payload.page}`;

        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getResource(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/resources/`;
        if (payload) {
          urlSearch = `${urlSearch}?${new URLSearchParams(payload).toString()}`;
        }

        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getSupervisor(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/supervisors/?user__first_name=${payload.user__first_name}&user__last_name=${payload.user__last_name}&alias__alias=${payload.alias__alias}&user__is_active=${payload.user__is_active}&page=${payload.page}`;

        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getAdmin(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/admins/?user__first_name=${payload.user__first_name}&user__last_name=${payload.user__last_name}&user__is_active=${payload.user__is_active}&page=${payload.page}`;

        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  postChangeStatusUser(context, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlApi = `/api/v1/users/${payload.user_id}/${payload.new_state}/`;
        return resolve(await api.post(urlApi));
      } catch (e) {
        return reject(e);
      }
    });
  },
  async getIncidentTypeFromLocalDomainConfig(context, payload) {
    // This should be done better!
    if (context.getters.domainConfig === {}) {
      await context.dispatch("getDomainConfig");
    }
    await context.dispatch("getDomainConfig");

    const incidentAbstractions =
      context.getters.domainConfig.incidentAbstractions;
    let incidentTypeData = {};
    if (!payload.incidentAbstraction) {
      console.error("no incidentAbstraction in payload");
      return incidentTypeData;
    }
    if (!payload.incidentType) {
      console.error("no incidentType in payload");
      return incidentTypeData;
    }

    const selectedIncidentAbstraction = incidentAbstractions.filter(
      incidentAbstraction =>
        incidentAbstraction.name === payload.incidentAbstraction
    );
    if (selectedIncidentAbstraction.length !== 1) {
      console.error(
        "selectedIncidentAbstraction nonexistent or duplicated name"
      );
    }
    // Using first element from selectedIncidentAbstraction, as name is unique for all abstractions
    incidentTypeData = selectedIncidentAbstraction[0].types.filter(
      incidentType => incidentType.name === payload.incidentType
    );

    if (incidentTypeData.length !== 1) {
      console.error("incident Type nonexistent or duplicated name");
    }
    // This returns the first element, as type is unique with relation of selected abstraction
    return incidentTypeData[0];
  },
  getStatisticsByResourceId(context, resourceId) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/resources/${resourceId}/statistics/`;
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getIncidentsByResourceId(context, resourceId) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        let urlSearch = `/api/v1/resources/${resourceId}/incidents/`;
        return resolve(await api.get(urlSearch));
      } catch (e) {
        return reject(e);
      }
    });
  }
};
