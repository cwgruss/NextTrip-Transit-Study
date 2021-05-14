/**
 * TransitRouteDTO elements is returned by the GetRoutes operation
 */
export interface TransitRouteDTO {
  /**
   * Route ID
   * The unique id of the bus route.
   * @type {?string}
   *
   */
  route_id: string;

  /**
   * Agency ID
   * The unique id of the regional transit provider.
   * @type {?number}
   */
  agency_id: number;

  /**
   * Route Label
   * The human-readable name of the bus route (ex: "Route 831")
   * @type {?string}
   */
  route_label: string;
}
