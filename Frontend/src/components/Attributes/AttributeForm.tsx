import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AttributeService } from '../../services/AttributeService';
import { Attribute } from '../../models/Attribute';
import '../../styles/components/attributes.scss';

const AttributesList: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const data = await AttributeService.getAll();
        setAttributes(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch attributes');
        setLoading(false);
      }
    };

    fetchAttributes();
  }, []);

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
    <div className="attributes-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Attributes</h2>
        <Link to="/attributes/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add Attribute
        </Link>
      </div>

      {attributes.length === 0 ? (
        <div className="alert alert-info">
          No attributes found. Please add one using the 'Add Attribute' button.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attribute) => (
                <tr key={attribute.id}>
                  <td>{attribute.id}</td>
                  <td>{attribute.name}</td>
                  <td>
                    <Link 
                      to={`/attributes/${attribute.id}`} 
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

export default AttributesList;