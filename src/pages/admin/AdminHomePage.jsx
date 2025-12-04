import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './AdminHomePage.css';

const AdminHomePage = () => {
  const { t } = useLanguage();

  const adminCards = [
    { title: t('manageProduct'), path: '/admin/products' },
    { title: t('manageUser'), path: '/admin/users' },
    { title: t('manageOrders'), path: '/admin/orders' }
  ];

  return (
    <main className="admin-home">
      <div className="admin-home__container">
        <h1 className="admin-home__title">{t('adminTitle')}</h1>
        
        <div className="admin-home__cards">
          {adminCards.map((card, index) => (
            <div 
              key={card.path} 
              className="admin-home__card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h2 className="admin-home__card-title">{card.title}</h2>
              <Link to={card.path} className="admin-home__card-btn">
                {t('access')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminHomePage;
