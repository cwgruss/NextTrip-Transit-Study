export interface RouteDirectionProps {
  routeId: string;

  name: string;

  dateFetched?: Date;
}

export class NexTripRouteDirection {
  get directionId(): number {
    return this._directionId;
  }

  get transitRouteId(): string {
    return this._direction.routeId;
  }

  get name(): string {
    return this._direction.name;
  }

  private constructor(
    private _direction: RouteDirectionProps,
    private _directionId: number
  ) {}

  static create(
    direction: RouteDirectionProps,
    id: number
  ): NexTripRouteDirection {
    const model = new NexTripRouteDirection(
      {
        ...direction,
        dateFetched: direction.dateFetched ? direction.dateFetched : new Date(),
      },
      id
    );

    return model;
  }
}
