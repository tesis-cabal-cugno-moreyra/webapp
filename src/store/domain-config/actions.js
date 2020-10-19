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
        return resolve(domainConfigResponse);
      } catch (e) {
        return reject(e);
      }
    });
  },
  postResourceIncident(context, playload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await api.post(playload));
      } catch (e) {
        return reject(e);
      }
    });
  },
  getResource(context, playload) {
    return new Promise((resolve, reject) => {
      try {
        let urlSerch = "";
        if (isNaN(playload)) {
          urlSerch = `/api/v1/resources/?user__first_name=${playload.user__first_name}&user__last_name=${playload.user__last_name}&type__name=${playload.type__name}`;
        } else {
          urlSerch = `/api/v1/resources/?page=${playload}`;
        }
        return resolve(api.get(urlSerch));
      } catch (e) {
        return reject(e);
      }
    });
  }
};
