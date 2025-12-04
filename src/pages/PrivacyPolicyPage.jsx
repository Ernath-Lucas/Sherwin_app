import { useLanguage } from '../context/LanguageContext';
import './LegalPage.css';

const PrivacyPolicyPage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdate: "Last updated: December 2024",
      sections: [
        {
          title: "1. Data Controller",
          content: "Sherwin-Williams Company is the data controller responsible for your personal data. Contact: privacy@sherwin-williams.com"
        },
        {
          title: "2. Data We Collect",
          content: `We collect the following personal data:
• Account information (email, name)
• Order history and preferences
• Technical data (cookies, IP address)
• Communication preferences`
        },
        {
          title: "3. Legal Basis for Processing",
          content: `We process your data based on:
• Contract performance (processing orders)
• Legitimate interest (improving our services)
• Your consent (marketing communications)
• Legal obligations (tax, accounting)`
        },
        {
          title: "4. Your Rights (GDPR)",
          content: `Under GDPR, you have the right to:
• Access your personal data
• Rectify inaccurate data
• Request deletion of your data
• Object to data processing
• Data portability
• Withdraw consent at any time
• Lodge a complaint with supervisory authority

To exercise your rights, contact: privacy@sherwin-williams.com`
        },
        {
          title: "5. Data Retention",
          content: "We retain your data for as long as necessary to fulfill the purposes outlined in this policy, typically 3 years after your last interaction."
        },
        {
          title: "6. Data Security",
          content: "We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction."
        },
        {
          title: "7. Third-Party Sharing",
          content: "We do not sell your data. We may share data with service providers (payment processors, shipping companies) who are contractually bound to protect it."
        },
        {
          title: "8. Cookies",
          content: "We use cookies to improve your experience. You can manage cookie preferences through our cookie banner or browser settings."
        },
        {
          title: "9. International Transfers",
          content: "If we transfer data outside the EU, we ensure appropriate safeguards are in place (Standard Contractual Clauses, adequacy decisions)."
        },
        {
          title: "10. Contact",
          content: "For any questions regarding this policy: privacy@sherwin-williams.com"
        }
      ]
    },
    fr: {
      title: "Politique de Confidentialité",
      lastUpdate: "Dernière mise à jour : Décembre 2024",
      sections: [
        {
          title: "1. Responsable du Traitement",
          content: "Sherwin-Williams Company est le responsable du traitement de vos données personnelles. Contact : privacy@sherwin-williams.com"
        },
        {
          title: "2. Données Collectées",
          content: `Nous collectons les données personnelles suivantes :
• Informations de compte (email, nom)
• Historique des commandes et préférences
• Données techniques (cookies, adresse IP)
• Préférences de communication`
        },
        {
          title: "3. Base Légale du Traitement",
          content: `Nous traitons vos données sur la base de :
• Exécution du contrat (traitement des commandes)
• Intérêt légitime (amélioration de nos services)
• Votre consentement (communications marketing)
• Obligations légales (fiscalité, comptabilité)`
        },
        {
          title: "4. Vos Droits (RGPD)",
          content: `Conformément au RGPD, vous disposez des droits suivants :
• Accès à vos données personnelles
• Rectification des données inexactes
• Suppression de vos données
• Opposition au traitement
• Portabilité des données
• Retrait du consentement à tout moment
• Réclamation auprès de la CNIL

Pour exercer vos droits : privacy@sherwin-williams.com`
        },
        {
          title: "5. Conservation des Données",
          content: "Nous conservons vos données aussi longtemps que nécessaire pour les finalités décrites, généralement 3 ans après votre dernière interaction."
        },
        {
          title: "6. Sécurité des Données",
          content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès, modification ou destruction non autorisés."
        },
        {
          title: "7. Partage avec des Tiers",
          content: "Nous ne vendons pas vos données. Nous pouvons partager des données avec des prestataires (processeurs de paiement, sociétés de livraison) contractuellement tenus de les protéger."
        },
        {
          title: "8. Cookies",
          content: "Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences via notre bandeau cookies ou les paramètres de votre navigateur."
        },
        {
          title: "9. Transferts Internationaux",
          content: "Si nous transférons des données hors UE, nous nous assurons que des garanties appropriées sont en place (Clauses Contractuelles Types, décisions d'adéquation)."
        },
        {
          title: "10. Contact",
          content: "Pour toute question concernant cette politique : privacy@sherwin-williams.com"
        }
      ]
    }
  };

  const data = content[language];

  return (
    <main className="legal-page">
      <div className="legal-page__container">
        <h1 className="legal-page__title">{data.title}</h1>
        <p className="legal-page__update">{data.lastUpdate}</p>

        {data.sections.map((section, index) => (
          <section key={index} className="legal-page__section">
            <h2 className="legal-page__section-title">{section.title}</h2>
            <p className="legal-page__section-content">{section.content}</p>
          </section>
        ))}
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
