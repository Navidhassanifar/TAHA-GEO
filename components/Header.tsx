
import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import { Language } from '../types';
import { SunIcon, MoonIcon, GlobeIcon } from './icons';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { language, setLanguage, t } = useContext(LanguageContext);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as Language);
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {t('appTitle')}
                </h1>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <div className="relative">
                        <GlobeIcon className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            aria-label={t('language')}
                            className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md py-2 ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="en">{t('english')}</option>
                            <option value="fa">{t('persian')}</option>
                        </select>
                    </div>
                    
                    <button
                        onClick={toggleTheme}
                        aria-label={t('theme')}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        {theme === 'light' ? <MoonIcon className="w-6 h-6"/> : <SunIcon className="w-6 h-6"/>}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
