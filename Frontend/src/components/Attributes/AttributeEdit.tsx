import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AttributeService } from '../../services/AttributeService';
import { Attribute } from '../../models/Attribute';
import '../../styles/components/attributes.scss';

const AttributeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const attributeId = parseInt(id || '0', 10);
  
  const [attribute, setAttribute] = useState<Attribute | null>(null);
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  useEffect(() => {
    const fetchAttribute = async () => {
      try {
        const data = await AttributeService.getById(attributeId);
        setAttribute(data);
        setName(data.name);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch attribute');
        setLoading(false);
      }
    };

    if (attributeId) {
      fetchAttribute();
    }
  }, [attributeId]);

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setValidationError('Attribute name is required');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !attribute) {
      return;
    }
    
    setSaving(true);
    
    try {
      await AttributeService.update({
        id: attribute.id,
        name: name.trim()
      });
      navigate('/attributes');
    } catch (err: any) {
      setError(err.message || 'Failed to update attribute');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!attribute) return;
    
    setDeleting(true);
    
    try {
      await AttributeService.delete(parseInt(attribute.id));
      navigate('/attributes');
    } catch (err: any) {
      setError(err.message || 'Failed to delete attribute');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !attribute) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Edit Attribute</h4>
        <button 
          className="btn btn-sm btn-danger" 
          onClick={() => setShowDeleteConfirm(true)}
          disabled={deleting}
        >
          Delete
        </button>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Attribute Name</label>
            <input
              type="text"
              className={`form-control ${validationError ? 'is-invalid' : ''}`}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter attribute name"
              required
            />
            {validationError && (
              <div className="invalid-feedback">
                {validationError}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/attributes')}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={deleting}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete the attribute "{attribute?.name}"?</p>
                  <p className="text-danger">This will remove this attribute from all employees who have it.</p>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={deleting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttributeEdit;