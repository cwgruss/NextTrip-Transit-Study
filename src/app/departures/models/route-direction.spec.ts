import {NexTripRouteDirection} from './route-direction';

describe('RouteDirection', () => {
  it('should create an instance', () => {
    const instance = NexTripRouteDirection.create(
      {
        routeId: '900',
        name: 'test',
      },
      0
    );
    expect(instance).toBeTruthy();
  });
});
