interface GPSLocationProps {
  description: string;
  longitude: number;
  latitude: number;
}

export class NexTripGPSLocation {
  get longitude(): number {
    return this._coordinates.longitude;
  }

  get latitude(): number {
    return this._coordinates.latitude;
  }

  get description(): string {
    return this._coordinates.description;
  }

  get stopLocationId(): number {
    return this._id;
  }

  private constructor(
    private _coordinates: GPSLocationProps,
    private _id: number
  ) {}

  static create(coordinates: GPSLocationProps, id: number): NexTripGPSLocation {
    const model = new NexTripGPSLocation(
      {
        ...coordinates,
      },
      id
    );
    return model;
  }
}

interface DepartureProps {
  isRealTime: boolean;
  gate: string;
  shortName: string;
  destinationDescription: string;
  departureTime: Date;
}

export class NexTripDeparture {
  get isRealTime(): boolean {
    return this._departure.isRealTime;
  }

  get shortName(): string {
    return this._departure.shortName;
  }

  get destinationDescription(): string {
    return this._departure.destinationDescription;
  }

  get gate(): string {
    return this._departure.gate;
  }

  get departureTime(): Date {
    return this._departure.departureTime;
  }

  get formattedDepartureTime(): Date {
    const current = Date.now();
    const timeFromNow = this.departureTime.getTime() - current;

    return new Date(timeFromNow);
  }

  private constructor(private _departure: DepartureProps) {}

  static create(departure: DepartureProps): NexTripDeparture {
    const model = new NexTripDeparture(departure);

    return model;
  }
}

export interface RouteDepartureStops {
  stops: NexTripGPSLocation[];
}

export class NexTripDepartureAggregate implements RouteDepartureStops {
  get routeId(): string {
    return this._routeId;
  }

  get directionId(): number {
    return this._directionId;
  }

  get placeCode(): string {
    return this._placeCode;
  }

  get stops(): NexTripGPSLocation[] {
    return this._stopLocations;
  }

  get departures(): NexTripDeparture[] {
    return this._departures;
  }

  constructor(
    private _stopLocations: NexTripGPSLocation[],
    private _departures: NexTripDeparture[],
    private _routeId: string,
    private _directionId: number,
    private _placeCode: string
  ) {}
}
