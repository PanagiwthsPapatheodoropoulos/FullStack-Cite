export interface Location {
  latitude: number;
  longitude: number;
}

export interface MapEmployee {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  hasCar: boolean;
  isSelected: boolean;
}

export interface RouteOptions {
  travelMode: 'DRIVING' | 'WALKING';
  origin: Location;
  destinations: Location[];
}