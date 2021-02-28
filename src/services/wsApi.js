export default class WsApi {
  constructor() {
    this.apiUrl = process.env.VUE_APP_ROOT_WS_API;
  }

  getWebsocketConnection(endpoint) {
    return new WebSocket(`${this.apiUrl}/${endpoint}`);
  }
}
