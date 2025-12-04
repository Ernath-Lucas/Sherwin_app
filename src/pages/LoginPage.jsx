import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <main className="login-page">
      <div className="login-page__container">
        <h1 className="login-page__title">{t('loginTitle')}</h1>

        <div className="login-page__form-wrapper">
          <div className="login-page__form" role="form">
            <div className="login-page__field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email')}
                className="login-page__input"
                autoComplete="email"
              />
            </div>
            
            <div className="login-page__field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('password')}
                className="login-page__input"
                autoComplete="current-password"
              />
            </div>
            
            <a href="#" className="login-page__forgot">
              {t('forgotPassword')}
            </a>

            {error && <p className="login-page__error">{error}</p>}
            
            <button 
              type="button"
              onClick={handleSubmit}
              className="login-page__submit"
            >
              {t('login')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
