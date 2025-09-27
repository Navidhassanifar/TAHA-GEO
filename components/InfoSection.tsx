
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import { ChevronDownIcon } from './icons';

const InfoSection: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);

    const sections = [
        { title: 'infoDmsTitle', text: 'infoDmsText' },
        { title: 'infoDdTitle', text: 'infoDdText' },
        { title: 'infoUtmTitle', text: 'infoUtmText' },
    ];

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex justify-between items-center text-left"
            >
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{t('infoTitle')}</h2>
                <ChevronDownIcon className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-6 pb-6 space-y-4">
                    {sections.map(section => (
                        <div key={section.title}>
                            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">{t(section.title)}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t(section.text)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InfoSection;
