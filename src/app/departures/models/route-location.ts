import {Constructor, Mixin} from 'src/app/core/util';
import {NexTripDeparture} from './route-departure';

interface LocationProps {
  description: string;
  directionId: number;
  dateFetched?: Date;
}

/**
 * Provides a domain model of a Route
 */
export class NexTripRouteLocation {
  get description(): string {
    return this._place.description;
  }

  get directionId(): number {
    return this._place.directionId;
  }

  get placeCode(): string {
    return this._id;
  }

  get locationUUID(): string {
    return NexTripRouteLocation.createLocationUUID(
      this.directionId,
      this.placeCode
    );
  }

  constructor(private _place: LocationProps, private _id: string) {}

  static create(place: LocationProps, id: string): NexTripRouteLocation {
    const model = new NexTripRouteLocation(
      {
        ...place,
        dateFetched: place.dateFetched ? place.dateFetched : new Date(),
      },
      id
    );

    return model;
  }

  static createLocationUUID(directionId: number, placeCode: string): string {
    return `dir-${directionId}__place-${placeCode}`;
  }
}

interface hasRouteStopDepartures {
  departures: NexTripDeparture[];
}

export function attachRouteDepartures<
  TBase extends Constructor<NexTripRouteLocation>
>(Base: TBase) {
  return class extends Base implements hasRouteStopDepartures {
    private _departures: NexTripDeparture[] = [];

    get departures(): NexTripDeparture[] {
      return this._departures;
    }

    constructor(...args: any[]) {
      super(...args);
    }

    setDepartures(departures: NexTripDeparture[]): void {
      this._departures = departures;
    }
  };
}

export const TransitLocationWithDeparturesMixin =
  attachRouteDepartures(NexTripRouteLocation);

export type TransitLocationWithDepartures = Mixin<
  typeof TransitLocationWithDeparturesMixin
>;
