import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmployeeService } from '../../services/EmployeeService';
import { Employee } from '../../models/Employee';
import '../../styles/components/employees.scss';

const EmployeesList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await EmployeeService.getAll();
        setEmployees(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Format date from YYYY-MM-DD to a more readable format
  // ...existing code...
  // Format date from YYYY-MM-DD to a more readable format
  const formatDate = (d: string | Date) => {
    const date = typeof d === 'string' ? new Date(d) : d;
    return date.toLocaleDateString();
  };
// ...existing code...

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="employees-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employees</h2>
        <Link to="/employees/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add Employee
        </Link>
      </div>

      {employees.length === 0 ? (
        <div className="alert alert-info">
          No employees found. Please add one using the 'Add Employee' button.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Has Car</th>
                <th>Address</th>
                <th>Attributes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{formatDate(employee.birthDate)}</td>
                  <td>
                    {employee.hasCar ? (
                      <span className="badge bg-success">Yes</span>
                    ) : (
                      <span className="badge bg-secondary">No</span>
                    )}
                  </td>
                  <td>{employee.address}</td>
                  <td>
                    <div className="attribute-tags">
                      {employee.attributes.map((attr) => (
                        <span key={attr.id} className="badge bg-info me-1">
                          {attr.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <Link 
                      to={`/employees/${employee.id}`} 
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeesList;