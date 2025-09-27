
import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import { ConversionHistoryItem } from '../types';

interface HistoryProps {
    history: ConversionHistoryItem[];
    onSelect: (item: ConversionHistoryItem) => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect }) => {
    const { t } = useContext(LanguageContext);

    const getShortString = (item: ConversionHistoryItem) => {
        switch(item.inputMode) {
            case 'dms': return `${item.dms.lat.deg}° ${item.dms.lat.dir}, ${item.dms.lon.deg}° ${item.dms.lon.dir}`;
            case 'dd': return `${item.dd.lat.toFixed(2)}, ${item.dd.lon.toFixed(2)}`;
            case 'utm': return `Zone ${item.utm.zone}${item.utm.hemisphere}`;
            default: return 'N/A';
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">{t('historyTitle')}</h3>
            {history.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">{t('noHistory')}</p>
            ) : (
                <ul className="space-y-2">
                    {history.map(item => (
                        <li key={item.id}>
                            <button 
                                onClick={() => onSelect(item)} 
                                className="w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="text-xs font-semibold uppercase bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded px-2 py-1 ltr:mr-2 rtl:ml-2">
                                    {item.inputMode}
                                </span>
                                <span className="font-mono text-sm">{getShortString(item)}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default History;
