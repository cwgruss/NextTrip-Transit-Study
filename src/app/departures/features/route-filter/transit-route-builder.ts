import {Mixin} from 'src/app/core/util';
import {NexTripRoute, Route} from '../../models/route';
import {NexTripDepartureAggregate} from '../../models/route-departure';
import {NexTripRouteDirection} from '../../models/route-direction';
import {
  NexTripRouteLocation,
  TransitLocationWithDeparturesMixin,
} from '../../models/route-location';
import {
  attachRouteDirections,
  attachRouteStopDepartures,
  attachRouteStopLocations,
} from '../../models/transit-route';

const TransitRouteWithDirectionsMixin = attachRouteDirections(NexTripRoute);
const TransitRouteWithLocationsMixin = attachRouteStopLocations(
  TransitRouteWithDirectionsMixin
);
const TransitRouteDeparturesMixin = attachRouteStopDepartures(
  TransitRouteWithLocationsMixin
);
export type TransitRoute = Mixin<typeof TransitRouteDeparturesMixin>;

interface TransitRouteBuilderAPI {
  addRouteDirections(directions: NexTripRouteDirection[]): this;
  addRouteLocationStops(
    directionId: number,
    location: NexTripRouteLocation[]
  ): this;
  setRouteLocationStop(location: NexTripRouteLocation): this;
  createRoute(route: NexTripRoute): this;
  build(): TransitRoute;
}

export class TransitRouteBuilder implements TransitRouteBuilderAPI {
  private _route!: TransitRoute;

  constructor() {}

  addRouteDirections(directions: NexTripRouteDirection[]): this {
    if (!this._route) {
      throw new Error(
        'A transit route has not been created. First create a route with createTransitRoute'
      );
    }

    this._route.setDirections(directions);

    return this;
  }

  addRouteLocationStops(
    directionId: number,
    locations: NexTripRouteLocation[]
  ): this {
    this._route.addStopLocations(directionId, locations);
    return this;
  }

  setRouteLocationStop(location: NexTripRouteLocation) {
    if (!this._route) {
      throw new Error(
        'A transit route has not been created. First create a route with createTransitRoute'
      );
    }

    this._route.setStopLocation(location);

    return this;
  }

  createRoute(route: NexTripRoute): this {
    this._route = new TransitRouteDeparturesMixin(route, route.transitRouteId);
    return this;
  }

  build(): TransitRoute {
    return this._route;
  }

  addRouteDepartures(
    routeLocation: NexTripRouteLocation,
    departureAggregate: NexTripDepartureAggregate
  ): this {
    const departingLocation = new TransitLocationWithDeparturesMixin(
      routeLocation,
      routeLocation.placeCode
    );
    departingLocation.setDepartures(departureAggregate.departures);
    this._route.setDepartures([departingLocation]);
    this._route.setStops(departureAggregate.stops);
    return this;
  }
}
