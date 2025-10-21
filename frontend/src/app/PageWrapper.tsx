type Props = {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export default function PageWrapper({ title, actions, children }: Props) {
  return (
    <section className="space-y-4">
      {(title || actions) && (
        <div className="flex items-center justify-between">
          {title && <h1 className="text-xl font-semibold">{title}</h1>}
          {actions}
        </div>
      )}
      <div className="rounded-2xl p-4 shadow-sm text-gray-900 dark:bg-gray-900 dark:text-gray-50">
        {children}
      </div>
    </section>
  );
}
