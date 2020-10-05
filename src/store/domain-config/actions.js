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
  getDomainConfig() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const domainConfigResponse = await api.get("/api/v1/domain-config/");
        this.commit("domainConfig/addDomainConfig", domainConfigResponse.data);
        return resolve(domainConfigResponse);
      } catch (e) {
        return reject(e);
      }
    });
  },
  getDomainConfigAlias() {
    setTimeout(console.log("Esperando..."), 3000);
    const domainConfig = this.commit("domainConfig/retrieveDomainConfig");
    console.log(domainConfig);
    let adminAlias = domainConfigServices.getAdminAliases(domainConfig);
    let supervisorAliases = domainConfigServices.getSupervisorAliases(
      domainConfig
    );
    let resourceAliases = domainConfigServices.getResourceAliases(domainConfig);
    console.log(adminAlias);
    return {
      adminAlias: adminAlias,
      supervisorAliases: supervisorAliases,
      resourcesAliases: resourceAliases
    };
  }
};
