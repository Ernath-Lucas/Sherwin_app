import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Modal from '../../components/Modal';
import './AdminUsersPage.css';

// Mock data for password requests
const mockPasswordRequests = [
  { id: 1, name: 'John Doe', email: 'john@example.com', expanded: false },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', expanded: false },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', expanded: false },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', expanded: false },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', expanded: false },
];

const AdminUsersPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Delete user state
  const [deleteName, setDeleteName] = useState('');
  const [deleteEmail, setDeleteEmail] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Password requests state
  const [passwordRequests, setPasswordRequests] = useState(mockPasswordRequests);
  const [passwords, setPasswords] = useState({});

  const handleDeleteUser = (e) => {
    e.preventDefault();
    if (deleteName && deleteEmail) {
      setUserToDelete({ name: deleteName, email: deleteEmail });
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    if (userToDelete) {
      // In production, this would call an API
      console.log('Deleting user:', userToDelete);
      setDeleteName('');
      setDeleteEmail('');
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const toggleExpand = (id) => {
    setPasswordRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, expanded: !req.expanded } : req
      )
    );
  };

  const handlePasswordChange = (id, field, value) => {
    setPasswords(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleValidatePassword = (request) => {
    const pwd = passwords[request.id];
    if (pwd?.newPassword && pwd?.confirmPassword) {
      if (pwd.newPassword === pwd.confirmPassword) {
        // In production, this would call an API
        console.log('Setting new password for:', request.email);
        alert(`Password updated for ${request.name}`);
        setPasswordRequests(prev => prev.filter(req => req.id !== request.id));
        setPasswords(prev => {
          const newPwd = { ...prev };
          delete newPwd[request.id];
          return newPwd;
        });
      } else {
        alert('Passwords do not match');
      }
    }
  };

  return (
    <main className="admin-users">
      <div className="admin-users__container">
        <button onClick={() => navigate('/admin')} className="admin-users__back-btn">
          ← {t('back')}
        </button>
        <h1 className="admin-users__title">{t('adminUserTitle')}</h1>
        
        {/* Delete User Section */}
        <section className="admin-users__section">
          <h2 className="admin-users__section-title">{t('deleteUser')}</h2>
          
          <div className="admin-users__form">
            <div className="admin-users__field">
              <label className="admin-users__label">{t('name')}</label>
              <input
                type="text"
                value={deleteName}
                onChange={(e) => setDeleteName(e.target.value)}
                className="admin-users__input"
              />
            </div>
            
            <div className="admin-users__field">
              <label className="admin-users__label">{t('email')}</label>
              <input
                type="email"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                className="admin-users__input"
              />
            </div>
            
            <button 
              onClick={handleDeleteUser}
              className="admin-users__btn"
            >
              {t('validate')}
            </button>
          </div>
        </section>
        
        {/* Password Requests Section */}
        <section className="admin-users__section">
          <h2 className="admin-users__section-title">{t('forgottenPasswordRequest')}</h2>
          
          <div className="admin-users__requests">
            {passwordRequests.map((request) => (
              <div key={request.id} className="admin-users__request">
                <button 
                  className="admin-users__request-header"
                  onClick={() => toggleExpand(request.id)}
                >
                  <span className="admin-users__request-text">
                    {request.name} {t('passwordRequest')}
                  </span>
                  <span className={`admin-users__request-arrow ${request.expanded ? 'expanded' : ''}`}>
                    →
                  </span>
                </button>
                
                {request.expanded && (
                  <div className="admin-users__request-form">
                    <div className="admin-users__request-field">
                      <label className="admin-users__request-label">{t('newPassword')}</label>
                      <input
                        type="password"
                        value={passwords[request.id]?.newPassword || ''}
                        onChange={(e) => handlePasswordChange(request.id, 'newPassword', e.target.value)}
                        className="admin-users__request-input"
                      />
                    </div>
                    
                    <div className="admin-users__request-field">
                      <label className="admin-users__request-label">{t('confirmPassword')}</label>
                      <input
                        type="password"
                        value={passwords[request.id]?.confirmPassword || ''}
                        onChange={(e) => handlePasswordChange(request.id, 'confirmPassword', e.target.value)}
                        className="admin-users__request-input"
                      />
                    </div>
                    
                    <button 
                      onClick={() => handleValidatePassword(request)}
                      className="admin-users__request-btn"
                    >
                      {t('validate')}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={cancelDelete}>
        <div className="admin-users__modal">
          <h2 className="admin-users__modal-title">{t('confirmDelete')}</h2>
          <p className="admin-users__modal-text">
            {t('deleteUserConfirm')} <strong>{userToDelete?.name}</strong> ({userToDelete?.email})?
          </p>
          <div className="admin-users__modal-actions">
            <button onClick={cancelDelete} className="admin-users__modal-btn admin-users__modal-btn--cancel">
              {t('cancel')}
            </button>
            <button onClick={confirmDelete} className="admin-users__modal-btn admin-users__modal-btn--confirm">
              {t('delete')}
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default AdminUsersPage;
