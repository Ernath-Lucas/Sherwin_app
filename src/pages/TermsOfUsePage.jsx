import { useLanguage } from '../context/LanguageContext';
import './LegalPage.css';

const TermsOfUsePage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Terms of Use",
      lastUpdate: "Last updated: December 2024",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing and using this portal, you accept and agree to be bound by these Terms of Use."
        },
        {
          title: "2. Account Registration",
          content: "You must be an authorized Sherwin-Williams customer to access this portal. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          title: "3. Use of Service",
          content: `You agree to:
• Use the portal only for lawful purposes
• Provide accurate and complete information
• Not attempt to gain unauthorized access
• Not interfere with the portal's operation`
        },
        {
          title: "4. Orders and Pricing",
          content: "All orders are subject to acceptance and product availability. Prices are subject to change without notice. We reserve the right to refuse or cancel any order."
        },
        {
          title: "5. Intellectual Property",
          content: "All content on this portal, including trademarks, logos, and text, is the property of Sherwin-Williams Company and is protected by copyright laws."
        },
        {
          title: "6. Limitation of Liability",
          content: "Sherwin-Williams shall not be liable for any indirect, incidental, or consequential damages arising from your use of this portal."
        },
        {
          title: "7. Termination",
          content: "We reserve the right to terminate or suspend your account at any time for violation of these terms."
        },
        {
          title: "8. Governing Law",
          content: "These terms shall be governed by and construed in accordance with applicable laws."
        },
        {
          title: "9. Changes to Terms",
          content: "We reserve the right to modify these terms at any time. Continued use of the portal constitutes acceptance of modified terms."
        },
        {
          title: "10. Contact",
          content: "For questions about these terms: support@sherwin-williams.com"
        }
      ]
    },
    fr: {
      title: "Conditions d'Utilisation",
      lastUpdate: "Dernière mise à jour : Décembre 2024",
      sections: [
        {
          title: "1. Acceptation des Conditions",
          content: "En accédant et en utilisant ce portail, vous acceptez d'être lié par ces Conditions d'Utilisation."
        },
        {
          title: "2. Inscription au Compte",
          content: "Vous devez être un client autorisé Sherwin-Williams pour accéder à ce portail. Vous êtes responsable de la confidentialité de vos identifiants."
        },
        {
          title: "3. Utilisation du Service",
          content: `Vous vous engagez à :
• Utiliser le portail uniquement à des fins légales
• Fournir des informations exactes et complètes
• Ne pas tenter d'accès non autorisé
• Ne pas interférer avec le fonctionnement du portail`
        },
        {
          title: "4. Commandes et Tarifs",
          content: "Toutes les commandes sont soumises à acceptation et disponibilité. Les prix sont susceptibles de changer sans préavis. Nous nous réservons le droit de refuser ou annuler toute commande."
        },
        {
          title: "5. Propriété Intellectuelle",
          content: "Tout le contenu de ce portail, y compris les marques, logos et textes, est la propriété de Sherwin-Williams Company et protégé par les lois sur le droit d'auteur."
        },
        {
          title: "6. Limitation de Responsabilité",
          content: "Sherwin-Williams ne sera pas responsable des dommages indirects, accessoires ou consécutifs découlant de votre utilisation de ce portail."
        },
        {
          title: "7. Résiliation",
          content: "Nous nous réservons le droit de résilier ou suspendre votre compte à tout moment en cas de violation de ces conditions."
        },
        {
          title: "8. Loi Applicable",
          content: "Ces conditions sont régies et interprétées conformément aux lois applicables."
        },
        {
          title: "9. Modifications des Conditions",
          content: "Nous nous réservons le droit de modifier ces conditions à tout moment. L'utilisation continue du portail constitue une acceptation des conditions modifiées."
        },
        {
          title: "10. Contact",
          content: "Pour toute question sur ces conditions : support@sherwin-williams.com"
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

export default TermsOfUsePage;
