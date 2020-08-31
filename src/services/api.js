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
}

export default new Api();
