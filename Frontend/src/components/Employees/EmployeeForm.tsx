import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeService } from '../../services/EmployeeService';
import { AttributeService } from '../../services/AttributeService';
import { EmployeeCreate } from '../../models/Employee';
import { Attribute } from '../../models/Attribute';
import '../../styles/components/employees.scss';

const EmployeeForm: React.FC = () => {
  const navigate = useNavigate();
  
  // Form data state
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [hasCar, setHasCar] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);
  
  // Available attributes to select from
  const [availableAttributes, setAvailableAttributes] = useState<Attribute[]>([]);
  
  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [attributesLoading, setAttributesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Fetch available attributes on component mount
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const data = await AttributeService.getAll();
        setAvailableAttributes(data);
        setAttributesLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch attributes');
        setAttributesLoading(false);
      }
    };

    fetchAttributes();
  }, []);

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!name.trim()) {
      errors.name = 'Employee name is required';
    }
    
    if (!birthDate) {
      errors.birthDate = 'Birth date is required';
    }
    
    if (!address.trim()) {
      errors.address = 'Address is required';
    }
    
    // Optional coordinates validation - if provided, both should be present and valid numbers
    if (latitude.trim() || longitude.trim()) {
      if (!latitude.trim()) {
        errors.latitude = 'Latitude is required when longitude is provided';
      } else if (isNaN(parseFloat(latitude))) {
        errors.latitude = 'Latitude must be a valid number';
      }
      
      if (!longitude.trim()) {
        errors.longitude = 'Longitude is required when latitude is provided';
      } else if (isNaN(parseFloat(longitude))) {
        errors.longitude = 'Longitude must be a valid number';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAttributeToggle = (attributeId: number) => {
    setSelectedAttributes(prev => {
      if (prev.includes(attributeId)) {
        return prev.filter(id => id !== attributeId);
      } else {
        return [...prev, attributeId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const newEmployee: EmployeeCreate = {
        name: name.trim(),
        birthDate,
        hasCar,
        address: address.trim(),
        attributeIds: selectedAttributes
      };
      
      // Add coordinates if provided
      if (latitude.trim() && longitude.trim()) {
        newEmployee.latitude = parseFloat(latitude);
        newEmployee.longitude = parseFloat(longitude);
      }
      
      await EmployeeService.create(newEmployee);
      navigate('/employees');
    } catch (err: any) {
      setError(err.message || 'Failed to create employee');
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Add New Employee</h4>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">Employee Name</label>
              <input
                type="text"
                className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter employee name"
              />
              {validationErrors.name && (
                <div className="invalid-feedback">
                  {validationErrors.name}
                </div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="birthDate" className="form-label">Birth Date</label>
              <input
                type="date"
                className={`form-control ${validationErrors.birthDate ? 'is-invalid' : ''}`}
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              {validationErrors.birthDate && (
                <div className="invalid-feedback">
                  {validationErrors.birthDate}
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="hasCar"
                checked={hasCar}
                onChange={(e) => setHasCar(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="hasCar">
                Has Car
              </label>
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
            {validationErrors.address && (
              <div className="invalid-feedback">
                {validationErrors.address}
              </div>
            )}
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="latitude" className="form-label">Latitude (Optional)</label>
              <input
                type="text"
                className={`form-control ${validationErrors.latitude ? 'is-invalid' : ''}`}
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g. 37.983810"
              />
              {validationErrors.latitude && (
                <div className="invalid-feedback">
                  {validationErrors.latitude}
                </div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="longitude" className="form-label">Longitude (Optional)</label>
              <input
                type="text"
                className={`form-control ${validationErrors.longitude ? 'is-invalid' : ''}`}
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g. 23.727539"
              />
              {validationErrors.longitude && (
                <div className="invalid-feedback">
                  {validationErrors.longitude}
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Attributes</label>
            {attributesLoading ? (
              <div className="text-center my-2">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading attributes...</span>
                </div>
              </div>
            ) : availableAttributes.length > 0 ? (
              <div className="attribute-selection">
                {availableAttributes.map(attr => (
                  <div className="form-check" key={attr.id}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`attr-${attr.id}`}
                        checked={selectedAttributes.includes(parseInt(attr.id))}
                        onChange={() => handleAttributeToggle(parseInt(attr.id))}
                    />  
                    <label className="form-check-label" htmlFor={`attr-${attr.id}`}>
                      {attr.name}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-warning">
                No attributes found. Please add attributes first.
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/employees')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || (availableAttributes.length === 0)}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating...
                </>
              ) : (
                'Create Employee'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;