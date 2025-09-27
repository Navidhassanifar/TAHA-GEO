
import React, { useState, useContext, useCallback } from 'react';
import { LanguageContext } from '../App';
import { DD, ConversionResult } from '../types';
import { converter } from '../services/coordinateConverter';

interface DdInputProps {
    onConvert: (result: ConversionResult) => void;
    onError: (error: string | null) => void;
    onClear: () => void;
}

const DdInput: React.FC<DdInputProps> = ({ onConvert, onError, onClear }) => {
    const { t } = useContext(LanguageContext);
    const [dd, setDd] = useState<DD>({ lat: 0, lon: 0 });

    const handleInputChange = (coord: 'lat' | 'lon', value: string) => {
        const numValue = value === '' ? 0 : parseFloat(value);
        if (!isNaN(numValue)) {
            setDd(prev => ({ ...prev, [coord]: numValue }));
        }
    };
    
    const validateAndConvert = useCallback(() => {
        onError(null);
        if (dd.lat < -90 || dd.lat > 90) { onError(t('errorDdLat')); return; }
        if (dd.lon < -180 || dd.lon > 180) { onError(t('errorDdLon')); return; }

        try {
            const dms = converter.ddToDms(dd);
            const utm = converter.ddToUtm(dd);
            onConvert({ dd, dms, utm });
        } catch (e) {
            onError(t('errorConversionFailed'));
        }
    }, [dd, onConvert, onError, t]);

    const handleClearFields = () => {
        setDd({ lat: 0, lon: 0 });
        onClear();
    }

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="lat-dd" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('latitude')} ({t('decimalDegrees')})</label>
                <input id="lat-dd" type="number" step="any" placeholder={t('latPlaceholder')} value={dd.lat || ''} onChange={e => handleInputChange('lat', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="lon-dd" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('longitude')} ({t('decimalDegrees')})</label>
                <input id="lon-dd" type="number" step="any" placeholder={t('lonPlaceholder')} value={dd.lon || ''} onChange={e => handleInputChange('lon', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse pt-2">
                <button onClick={validateAndConvert} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">{t('convert')}</button>
                <button onClick={handleClearFields} className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">{t('clear')}</button>
            </div>
        </div>
    );
};

export default DdInput;
