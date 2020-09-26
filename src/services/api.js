import Vue from "vue";
import { STATUS } from "@/constants/response-status";

class Api {
  constructor() {
    this.apiUrl = process.env.VUE_APP_ROOT_API;
  }

  get(endpoint) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      let requestData = {
        method: "get",
        endpoint: endpoint
      };

      try {
        resolve(await this.makeRequest(requestData));
      } catch (error) {
        reject(error);
      }
    });
  }

  post(endpoint, body) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      let requestData = {
        method: "post",
        endpoint: endpoint,
        body: body
      };

      try {
        resolve(await this.makeRequest(requestData));
      } catch (error) {
        reject(error);
      }
    });
  }

  put(endpoint, body) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      let requestData = {
        method: "put",
        endpoint: endpoint,
        body: body
      };

      try {
        resolve(await this.makeRequest(requestData));
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(endpoint, body) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      let requestData = {
        method: "delete",
        endpoint: endpoint,
        body: body
      };

      try {
        resolve(await this.makeRequest(requestData));
      } catch (error) {
        reject(error);
      }
    });
  }

  makeRequest(requestData) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // TODO: Fill headers when needed from localStorage
      let headers;

      let response;

      try {
        response = await Vue.axios({
          method: requestData.method,
          url: `${this.apiUrl}${requestData.endpoint}`,
          data: requestData.body ? requestData.body : null,
          headers
        });
      } catch (e) {
        const error = e.response ? e.response : e;

        try {
          await this.handleTokenExpiredError(error);
        } catch (error) {
          return reject(error);
        }
      }

      resolve(response);
    });
  }

  handleTokenExpiredError(error) {
    return new Promise((resolve, reject) => {
      // TODO:  We should add a condition in order to know if the unauthorized error its because
      // the token was expired. For example: the api should return an error detail.. something like 'invalid-token'
      // and add it to the next condition.
      if (
        STATUS.UNAUTHORIZED === error.status ||
        STATUS.FORBIDDEN === error.status
      ) {
        localStorage.removeItem("auth-data");
        window.location.replace("/auth/login");

        return;
      }

      if (
        STATUS.SERVER_ERROR === error.status ||
        STATUS.NOT_FOUND === error.status
      ) {
        return window.location.replace("/error/not-found");
      }

      reject(error);
    });
  }
}

export default new Api();
