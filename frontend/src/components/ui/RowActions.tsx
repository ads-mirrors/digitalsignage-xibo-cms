import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type RowWithLayout = {
  layoutId: string;
  layout?: string;
};

type RowActionsProps<T extends object> = {
  row: T;
};

export default function RowActions<T extends object>({ row }: RowActionsProps<T>) {
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function isLayoutRow(obj: unknown): obj is RowWithLayout {
    return typeof obj === 'object' && obj !== null && 'layoutId' in obj;
  }

  const handleDesign = () => {
    if (isLayoutRow(row)) {
      window.location.href = `http://localhost:80/layout/designer/${row.layoutId}`;
      // navigate(`/layouts/${row.layoutId}/edit`);
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (isLayoutRow(row) && row.layout) {
      if (confirm(`Are you sure you want to delete layout "${row.layout}"?`)) {
        console.log('Delete layout:', row.layoutId);
      }
    }
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:text-gray-700 px-4 cursor-pointer"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-10">
          <button
            onClick={handleDesign}
            className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            {t('Edit')}
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
          >
            {t('Delete')}
          </button>
        </div>
      )}
    </div>
  );
}
