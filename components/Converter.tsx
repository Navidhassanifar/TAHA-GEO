
import React, { useState, useContext } from 'react';
import { InputMode, ConversionResult, ConversionHistoryItem } from '../types';
import { LanguageContext } from '../App';
import DmsInput from './DmsInput';
import DdInput from './DdInput';
import UtmInput from './UtmInput';
import ResultsDisplay from './ResultsDisplay';
import History from './History';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Converter: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [inputMode, setInputMode] = useState<InputMode>('dms');
    const [result, setResult] = useState<ConversionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useLocalStorage<ConversionHistoryItem[]>('conversionHistory', []);

    const handleConversion = (conversionResult: ConversionResult) => {
        setResult(conversionResult);
        setError(null);
        
        const newHistoryItem: ConversionHistoryItem = {
            ...conversionResult,
            id: new Date().toISOString(),
            timestamp: Date.now(),
            inputMode: inputMode
        };

        const newHistory = [newHistoryItem, ...history].slice(0, 10);
        setHistory(newHistory);
    };

    const handleHistorySelect = (item: ConversionHistoryItem) => {
        setResult(item);
        setError(null);
    };

    const handleClear = () => {
        setResult(null);
        setError(null);
    };

    const tabs: { id: InputMode; label: string; }[] = [
        { id: 'dms', label: t('dms') },
        { id: 'dd', label: t('dd') },
        { id: 'utm', label: t('utm') },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">{t('converterTitle')}</h2>
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                        <nav className="-mb-px flex space-x-4 rtl:space-x-reverse" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setInputMode(tab.id); handleClear(); }}
                                    className={`${
                                        inputMode === tab.id
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-600'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div>
                        {inputMode === 'dms' && <DmsInput onConvert={handleConversion} onError={setError} onClear={handleClear} />}
                        {inputMode === 'dd' && <DdInput onConvert={handleConversion} onError={setError} onClear={handleClear} />}
                        {inputMode === 'utm' && <UtmInput onConvert={handleConversion} onError={setError} onClear={handleClear} />}
                    </div>

                    {error && <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md text-sm">{error}</div>}
                    
                    {result && <ResultsDisplay result={result} />}
                </div>
            </div>
            <div className="lg:col-span-1">
                <History history={history} onSelect={handleHistorySelect} />
            </div>
        </div>
    );
};

export default Converter;

