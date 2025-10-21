import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation();

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{t('Settings')}</h2>
      <p>{t('CMS Settings here!')}</p>
    </section>
  );
}
