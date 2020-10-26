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
  }
};
