// Map Service
import { MapEmployee, RouteOptions } from '../models/Location';
import { get } from '../utils/api';

const BASE_URL = '/map';

export const MapService = {
  // Get all employees with location data
  getEmployeesWithLocation: (): Promise<MapEmployee[]> => {
    return get<MapEmployee[]>(`${BASE_URL}/employees`);
  },
  
  // Get employees filtered by attribute with location data
  getEmployeesByAttribute: (attributeId: number): Promise<MapEmployee[]> => {
    return get<MapEmployee[]>(`${BASE_URL}/employees/filter`, { attributeId });
  },
  
  // Get route information
  getRoute: (options: RouteOptions): Promise<any> => {
    return get<any>(`${BASE_URL}/route`, options);
  }
};