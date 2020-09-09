import Vue from "vue";

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
    // eslint-disable-next-line no-async-promise-executor,no-unused-vars
    return new Promise(async (resolve, reject) => {
      // TODO: Handle login headers
      let headers;

      const unprotectedEndpoints = [
        "/api-token-auth/",
        "/api-token-refresh/",
        /api-token-verify/
      ];

      if (!unprotectedEndpoints.includes(requestData.endpoint)) {
        try {
          headers = this.getHeaders();
        } catch (e) {
          if (e.message === "no-auth-data") {
            window.location.replace("/");
            return null;
          }
        }
      }

      let response;

      try {
        response = await Vue.axios({
          method: requestData.method,
          url: `${requestData.endpoint}`,
          data: requestData.body ? requestData.body : null,
          headers
        });
      } catch (e) {
        console.log(e);
        // const error = e.response ? e.response : e;
        // try {
        //   await this.handleTokenExpiredError(error, requestData);
        // } catch (err) {
        //   return reject(err);
        // }
      }

      return resolve(response);
    });
  }
}

export default new Api();
