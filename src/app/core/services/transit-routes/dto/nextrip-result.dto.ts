export interface NexTripStopGPSCoordinates {
  stop_id: number;
  latitude: number;
  longitude: number;
  description: string;
}

export interface NexTripAlertMessage {
  stop_closed: boolean;
  alert_text: string;
}

export interface NexTripDepatureDTO {
  /**
   * Indicates whether the departure time is based on current information from the vehicle.
   */
  actual: boolean;

  /**
   *
   */
  trip_id: number;
  stop_id: number;

  /**
   * Displays time format for scheduled time and countdown format for real-time departures.
   */
  depature_text: string;

  /**
   * Datetime value of the departure time.
   */
  departure_time: string;

  /**
   * A label describing the trip destination
   */
  description: string;

  /**
   * Indicates the stop or gate indentifier where applicable
   */
  gate: string;

  /**
   * The indentifier of the current route for this departure.
   */
  route_id: string;

  /**
   * The human-recognizable code for the route, i.e. 6D
   */
  route_short_name: string;
  direction_id: number;
  direction_text: string;
  terminal: string;
  schedule_relationship: string;
}

export interface NexTripResultDTO {
  stops: NexTripStopGPSCoordinates[];
  alerts: NexTripAlertMessage[];
  departures: NexTripDepatureDTO[];
}
