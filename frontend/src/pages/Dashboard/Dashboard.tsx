import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{t('Dashboard')}</h2>
      <p>{t('Welcome to the %productName% CMS', { productName: 'Prototype' })}</p>
    </section>
  );
}
