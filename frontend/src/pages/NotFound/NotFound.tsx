import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-widest text-gray-500">{t('Error 404')}</p>
        <h1 className="mt-1 text-3xl font-semibold">{t('Page not found')}</h1>
        <p className="mt-2 text-gray-600">
          {t('We couldn’t find ')}
          <span className="font-mono text-gray-800">{pathname}</span>.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleBack}
          className="rounded-md cursor-pointer hover:text-sky-900 border px-4 py-2"
        >
          {t('Go back')}
        </button>
        <Link to="/" className="rounded-md bg-gray-900 hover:bg-gray-700 px-4 py-2 text-white">
          {t('Go home')}
        </Link>
      </div>
    </section>
  );
}
