[
  {direction_id: 0, direction_name: 'Eastbound'},
  {direction_id: 1, direction_name: 'Westbound'},
];

export interface TransitRouteDirectionDTO {
  /**
   * Route Direction ID
   * The unique id of the route direction.
   * @type {?number}
   *
   */
  direction_id: number;

  /**
   * Direction Name
   * The display name--North, East, etc--for the route direction.
   * @type {?string}
   */
  direction_name: string;
}
