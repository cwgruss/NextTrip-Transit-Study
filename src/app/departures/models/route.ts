interface RouteProps {
  label: string;
  agencyId: number;
  dateFetched?: Date;
}

export interface Route {
  label: string;
  agencyId: number;
  transitRouteId: string;
}

/**
 * Provides a domain model of a Route
 */
export class NexTripRoute implements Route {
  get label(): string {
    return this._route.label;
  }

  get agencyId(): number {
    return this._route.agencyId;
  }

  get transitRouteId(): string {
    return this._id;
  }

  constructor(private _route: RouteProps, private _id: string) {}
}
