/**
 * TransitRouteDirectionDTO is returned by the GetDirections API operation.
 * Two directions are valid for a given route. Either North/South or East/West.
 */
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
