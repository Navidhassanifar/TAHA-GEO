
import React, { useState, useContext, useCallback } from 'react';
import { LanguageContext } from '../App';
import { UTM, ConversionResult } from '../types';
import { converter } from '../services/coordinateConverter';

interface UtmInputProps {
    onConvert: (result: ConversionResult) => void;
    onError: (error: string | null) => void;
    onClear: () => void;
}

const UtmInput: React.FC<UtmInputProps> = ({ onConvert, onError, onClear }) => {
    const { t } = useContext(LanguageContext);
    const [utm, setUtm] = useState<UTM>({ zone: 39, hemisphere: 'N', easting: 0, northing: 0 });

    const handleInputChange = (field: keyof UTM, value: string) => {
        const numValue = (field === 'zone' || field === 'easting' || field === 'northing') ? (value === '' ? 0 : parseInt(value, 10)) : value;
        if (!isNaN(numValue as number) || typeof numValue === 'string') {
            setUtm(prev => ({ ...prev, [field]: numValue }));
        }
    };

    const validateAndConvert = useCallback(() => {
        onError(null);
        if (utm.zone < 1 || utm.zone > 60) { onError(t('errorUtmZone')); return; }
        if (utm.easting < 100000 || utm.easting > 999999) { onError(t('errorUtmEasting')); return; }
        if (utm.northing < 0 || utm.northing > 10000000) { onError(t('errorUtmNorthing')); return; }

        try {
            const dd = converter.utmToDd(utm);
            const dms = converter.ddToDms(dd);
            onConvert({ utm, dd, dms });
        } catch (e) {
            onError(t('errorConversionFailed'));
        }
    }, [utm, onConvert, onError, t]);

    const handleClearFields = () => {
        setUtm({ zone: 39, hemisphere: 'N', easting: 0, northing: 0 });
        onClear();
    }
    
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="zone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('zone')}</label>
                    <input id="zone" type="number" value={utm.zone || ''} onChange={e => handleInputChange('zone', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="hemisphere" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('hemisphere')}</label>
                    <select id="hemisphere" value={utm.hemisphere} onChange={e => handleInputChange('hemisphere', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
                        <option value="N">{t('north')}</option>
                        <option value="S">{t('south')}</option>
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="easting" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('easting')}</label>
                <input id="easting" type="number" placeholder="e.g., 542130" value={utm.easting || ''} onChange={e => handleInputChange('easting', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="northing" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('northing')}</label>
                <input id="northing" type="number" placeholder="e.g., 3949665" value={utm.northing || ''} onChange={e => handleInputChange('northing', e.target.value)} className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse pt-2">
                <button onClick={validateAndConvert} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">{t('convert')}</button>
                <button onClick={handleClearFields} className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">{t('clear')}</button>
            </div>
        </div>
    );
};

export default UtmInput;
