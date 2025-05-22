// Employee Service
import { Employee, EmployeeCreate, EmployeeUpdate } from '../models/Employee';
import { get, post, put, del } from '../utils/api';

const BASE_URL = '/employees';

export const EmployeeService = {
  // Get all employees
  getAll: (): Promise<Employee[]> => {
    return get<Employee[]>(BASE_URL);
  },
  
  // Get employee by ID
  getById: (id: number): Promise<Employee> => {
    return get<Employee>(`${BASE_URL}/${id}`);
  },
  
  // Create a new employee
  create: (employee: EmployeeCreate): Promise<Employee> => {
    return post<Employee>(BASE_URL, employee);
  },
  
  // Update an existing employee
  update: (employee: EmployeeUpdate): Promise<Employee> => {
    return put<Employee>(`${BASE_URL}/${employee.id}`, employee);
  },
  
  // Delete an employee
  delete: (id: number): Promise<void> => {
    return del<void>(`${BASE_URL}/${id}`);
  },
  
  // Filter employees by attribute
  getByAttribute: (attributeId: number): Promise<Employee[]> => {
    return get<Employee[]>(`${BASE_URL}/filter`, { attributeId });
  }
};