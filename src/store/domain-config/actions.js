import api from "@/services/api";

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
  }
};
