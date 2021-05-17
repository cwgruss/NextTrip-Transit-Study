import {Mixin, TypeGaurd} from 'src/app/core/util';
import {NexTripRoute} from '../../models/route';
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
} from '../../models/transit-route-mixins';

// ********************************************
// Transit Route Builder
// ********************************************

/**
 * The TransitRouteBuilder takes data--routes, directions, locations--from multiple
 * NexTrip API sources and constructs a single TransitRoute entity.
 *
 * The Builder pattern here lets us construct a TransitRoute step-by-step. This is important
 * because we do not have all the data at once; instead, the application has to ask the user a
 * sequence of questions and query the API for a response.
 */

// --------------------------------------------
// Mixins
// --------------------------------------------

/**
 * The below mixins compose a TransitRoute class, with each mixin attaching
 * separate functionality to the core `NexTripRoute` entity. This final `TransitRoute`
 * class combines route, direction, location, and departure, data into one aggregate.
 */

/////// 1. Route With Directions Mixins ///////
const TransitRouteWithDirectionsMixin = attachRouteDirections(NexTripRoute);

/////// 2. Route With Stop Locations Mixin ///////
const TransitRouteWithLocationsMixin = attachRouteStopLocations(
  TransitRouteWithDirectionsMixin
);
/////// 3. Route With Stop Departures Mixin ///////
const TransitRouteDeparturesMixin = attachRouteStopDepartures(
  TransitRouteWithLocationsMixin
);

/** Create an instance type from the collection of mixins above. */
export type TransitRoute = Mixin<typeof TransitRouteDeparturesMixin>;

interface TransitRouteBuilderAPI {
  /**
   * Adds the directions that are valid for a given route. Either North/South or East/West.
   * @param directions An array of directions relevant to the current route
   */
  addRouteDirections(directions: NexTripRouteDirection[]): this;

  /**
   * Adds an array of Timepoint stops for the given Route and Direction
   * @param directionId The unique identifier corresponding to the location's direction
   * @param location
   */
  addRouteLocationStops(
    directionId: number,
    location: NexTripRouteLocation[]
  ): this;

  /**
   * Sets the currently relevant route location for the query
   * @param location
   */
  setRouteLocationStop(location: NexTripRouteLocation): this;

  /**
   * Initializes a transit route
   * @param route The source data from which to create the route
   */
  createRoute(route: NexTripRoute): this;

  /**
   * Returns the constructed TransitRoute
   */
  build(): TransitRoute;
}

/**
 *
 */
export class TransitRouteBuilder implements TransitRouteBuilderAPI {
  private _route?: TransitRoute;

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
    this._throwErrorIfRouteIsUndefined();

    this._route!.addStopLocations(directionId, locations);
    return this;
  }

  setRouteLocationStop(location: NexTripRouteLocation) {
    this._throwErrorIfRouteIsUndefined();

    this._route!.setStopLocation(location);

    return this;
  }

  createRoute(route: NexTripRoute): this {
    if (TypeGaurd.isNullOrUndefined(route)) {
      throw new Error(
        `TransitRouteBuilder: unable to create route from undefined data`
      );
    }
    this._route = new TransitRouteDeparturesMixin(route, route.transitRouteId);
    return this;
  }

  build(): TransitRoute {
    this._throwErrorIfRouteIsUndefined();
    return this._route!;
  }

  addRouteDepartures(
    routeLocation: NexTripRouteLocation,
    departureAggregate: NexTripDepartureAggregate
  ): this {
    this._throwErrorIfRouteIsUndefined();

    const departingLocation = new TransitLocationWithDeparturesMixin(
      routeLocation,
      routeLocation.placeCode
    );
    departingLocation.setDepartures(departureAggregate.departures);
    this._route!.setDepartures([departingLocation]);
    this._route!.setStops(departureAggregate.stops);
    return this;
  }

  private _throwErrorIfRouteIsUndefined(): boolean {
    if (TypeGaurd.isNullOrUndefined(this._route)) {
      throw new Error(
        'A transit route has not been created. First create a route with createTransitRoute'
      );
    }

    return true;
  }
}
