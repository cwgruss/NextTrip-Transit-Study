/**
 * TransitRoutePlaceDTO represents Timepoint stop for a given Route/Direction.
 * Returned by the GetStops API operation.
 */
export interface TransitRoutePlaceDTO {
  /**
   * A four character id used by NexTrip to identify the node or location
   * @example '7SPK'
   */
  place_code: string;

  /**
   * The name of the stop, i.e. a brief description of a place
   * @example 7th St & Park Station
   */
  description: string;
}
