class Incident {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}

class IncidentResource {
  constructor(
    id,
    userId,
    email,
    username,
    firstName,
    lastName,
    resourceTypeName,
    incident
  ) {
    this._id = id;
    this._userId = userId;
    this._email = email;
    this._username = username;
    this._firstName = firstName;
    this._lastName = lastName;
    this._resourceTypeName = "person"; // TODO: Personalizar los iconos para personas y vehículos.
    this._incident = incident;
    this._trackPoints = [];
    this._mapPoints = [];
    this._showOnMap = true;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get userId() {
    return this._userId;
  }

  set userId(value) {
    this._userId = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    this._lastName = value;
  }

  get resourceTypeName() {
    return this._resourceTypeName;
  }

  set resourceTypeName(value) {
    this._resourceTypeName = value;
  }

  get incident() {
    return this._incident;
  }

  set incident(value) {
    this._incident = value;
  }

  get trackPoints() {
    return this._trackPoints;
  }

  set trackPoints(value) {
    this._trackPoints = value;
  }

  addTrackPoint(trackPoint) {
    this._trackPoints.push(trackPoint);
  }

  addTrackPoints(trackPoints) {
    // Check order!!!! Routes depend on temporal order
    this._trackPoints = this._trackPoints.concat(trackPoints);
  }

  getTrackPointsRoute() {
    return this._trackPoints.map(trackPoint => {
      return trackPoint.position;
    });
  }

  getTrackPointsRouteColor() {
    let colors = ["blue", "red", "yellow", "green", "orange"];
    let colorSelected = colors[0];
    colors.shift();
    colors.push(colorSelected);
    return colorSelected.toString();
  }

  get mapPoints() {
    return this._mapPoints;
  }

  set mapPoints(value) {
    this._mapPoints = value;
  }

  addMapPoint(mapPoint) {
    this._mapPoints.push(mapPoint);
  }

  addMapPoints(mapPoints) {
    this._mapPoints = this._mapPoints.concat(mapPoints);
  }

  currentPosition() {
    if (this._trackPoints.length) {
      return this._trackPoints[this._trackPoints.length - 1].position;
    }
  }

  get showOnMap() {
    return this._showOnMap;
  }

  set showOnMap(value) {
    this._showOnMap = value;
  }

  name() {
    return `${this._firstName} ${this._lastName}`;
  }
}

class Point {
  constructor(lat, long) {
    this._lat = lat;
    this._long = long;
  }

  get lat() {
    return this._lat;
  }

  set lat(value) {
    this._lat = value;
  }

  get long() {
    return this._long;
  }

  set long(value) {
    this._long = value;
  }

  get position() {
    return {
      lat: this._lat,
      lng: this._long
    };
  }
}

class TrackPoint extends Point {}

class MapPoint extends Point {
  constructor(lat, long, comment) {
    super(lat, long);
    this._comment = comment;
  }

  get comment() {
    return this._comment;
  }

  set comment(value) {
    this._comment = value;
  }
}

export { Incident, IncidentResource, MapPoint, TrackPoint };
