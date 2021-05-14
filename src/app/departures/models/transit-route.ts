import {Constructor, Mixin} from 'src/app/core/util';
import {
  NexTripRouteLocation,
  TransitLocationWithDepartures,
  TransitLocationWithDeparturesMixin,
} from './route-location';
import {NexTripRoute} from './route';
import {NexTripRouteDirection} from './route-direction';
import {NexTripGPSLocation} from './route-departure';

export interface hasRouteDirections {
  directions: NexTripRouteDirection[];
  setDirections(directions: NexTripRouteDirection[]): void;
}

export interface hasRouteStopLocations {
  getStopLocationsByDirectionId(directionId: number): NexTripRouteLocation[];
  addStopLocations(
    directionId: number,
    locations: NexTripRouteLocation[]
  ): void;

  setStopLocation(locations: NexTripRouteLocation): void;
}

export type HasDirectionsCtor = Constructor<hasRouteDirections>;
export type HasStopLocationsCtor = Constructor<hasRouteStopLocations>;

export function attachRouteDirections<TBase extends Constructor<NexTripRoute>>(
  Base: TBase,
  directions: NexTripRouteDirection[] = []
): HasDirectionsCtor & TBase {
  return class extends Base implements hasRouteDirections {
    private _directions: NexTripRouteDirection[] = directions;

    get directions(): NexTripRouteDirection[] {
      return this._directions;
    }

    constructor(...args: any[]) {
      super(...args);
    }

    setDirections(directions: NexTripRouteDirection[]): void {
      this._directions = directions;
    }
  };
}

export function attachRouteStopLocations<
  TBase extends Constructor<NexTripRoute>
>(Base: TBase) {
  return class extends Base implements hasRouteStopLocations {
    private _stopLocationMap: Map<number, NexTripRouteLocation[]> = new Map();
    private _sourceLocation: NexTripRouteLocation | undefined;

    getStopLocationsByDirectionId(directionId: number): NexTripRouteLocation[] {
      const allLocations = this._stopLocationMap.get(directionId) || [];
      return allLocations;
    }

    getAllStopLocations(): NexTripRouteLocation[] {
      const allLocations = Array.from(this._stopLocationMap.values());
      return allLocations.flat();
    }

    constructor(...args: any[]) {
      super(...args);
    }

    addStopLocations(
      directionId: number,
      locations: NexTripRouteLocation[]
    ): void {
      this._stopLocationMap.set(directionId, locations);
    }

    setStopLocation(location: NexTripRouteLocation): void {
      this._sourceLocation = location;
    }
  };
}

interface hasDepartingLocations {
  getDepatures(
    directionId: number,
    placeCode: string
  ): TransitLocationWithDepartures[];
  setDepartures(departures: TransitLocationWithDepartures[]): void;
  setStops(stops: NexTripGPSLocation[]): void;
  getStops(): NexTripGPSLocation[];
}

export function attachRouteStopDepartures<
  TBase extends Constructor<NexTripRoute>
>(Base: TBase) {
  return class extends Base implements hasDepartingLocations {
    private _departures: Map<string, TransitLocationWithDepartures[]> = new Map<
      string,
      TransitLocationWithDepartures[]
    >();
    private _stops: NexTripGPSLocation[] = [];

    get stopLocationId(): string {
      const firstStop = this.getStops()[0];
      return `${firstStop.stopLocationId}`;
    }

    constructor(...args: any[]) {
      super(...args);
    }

    getStops(): NexTripGPSLocation[] {
      return this._stops;
    }

    getDepatures(
      directionId: number,
      placeCode: string
    ): TransitLocationWithDepartures[] {
      const departureKey =
        TransitLocationWithDeparturesMixin.createLocationUUID(
          directionId,
          placeCode
        );
      return this._departures.get(departureKey) || [];
    }

    setDepartures(departures: TransitLocationWithDepartures[]): void {
      const firstDeparture = departures[0];
      const departureKey = firstDeparture.locationUUID;
      this._departures.set(departureKey, departures);
      return;
    }

    setStops(stops: NexTripGPSLocation[]): void {
      this._stops = stops;
    }
  };
}
