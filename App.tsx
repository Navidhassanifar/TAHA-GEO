
import React, { useState, useEffect, useMemo } from 'react';
import { Language, Theme } from './types';
import { translations } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Converter from './components/Converter';
import InfoSection from './components/InfoSection';

export const ThemeContext = React.createContext<{ theme: Theme; toggleTheme: () => void; }>({ theme: 'light', toggleTheme: () => {} });
export const LanguageContext = React.createContext<{ language: Language; setLanguage: (lang: Language) => void; t: (key: string) => string; }>({ language: 'en', setLanguage: () => {}, t: () => '' });

const App: React.FC = () => {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
    const [language, setLanguage] = useLocalStorage<Language>('language', 'en');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        root.lang = language;
        root.dir = language === 'fa' ? 'rtl' : 'ltr';
        document.body.style.fontFamily = language === 'fa' ? "'Vazirmatn', sans-serif" : "'Inter', sans-serif";
    }, [theme, language]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };
    
    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    const languageContextValue = useMemo(() => ({
        language,
        setLanguage,
        t
    }), [language, setLanguage]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <LanguageContext.Provider value={languageContextValue}>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                    <Header />
                    <main className="container mx-auto px-4 py-8">
                        <Converter />
                        <InfoSection />
                    </main>
                    <footer className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                        <p>{t('footerText')}</p>
                    </footer>
                </div>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
