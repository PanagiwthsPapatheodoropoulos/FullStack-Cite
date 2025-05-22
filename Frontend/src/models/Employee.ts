import { Attribute } from './Attribute';

export interface Employee {
    id : number;
    name : string;
    birthDate : Date;
    hasCar : boolean;
    address : string;
    latitude ?: number;
    longitude ?: number;
    attributes : Attribute[];
}

export interface EmployeeCreate {
    name : string;
    birthDate : string;
    hasCar : boolean;
    address : string;
    latitude ?: number;
    longitude ?: number;
    attributeIds : number[];
}

export interface EmployeeUpdate {
    id: number;
  name: string;
  birthDate: string;
  hasCar: boolean;
  address: string;
  latitude?: number;
  longitude?: number;
  attributeIds: number[];
}
