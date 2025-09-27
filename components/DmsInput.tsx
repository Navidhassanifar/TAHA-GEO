
import React, { useState, useContext, useCallback } from 'react';
import { LanguageContext } from '../App';
import { DMS, ConversionResult } from '../types';
import { converter } from '../services/coordinateConverter';

interface DmsInputProps {
    onConvert: (result: ConversionResult) => void;
    onError: (error: string | null) => void;
    onClear: () => void;
}

const DmsInput: React.FC<DmsInputProps> = ({ onConvert, onError, onClear }) => {
    const { t } = useContext(LanguageContext);
    const [dms, setDms] = useState<DMS>({
        lat: { deg: 0, min: 0, sec: 0, dir: 'N' },
        lon: { deg: 0, min: 0, sec: 0, dir: 'E' }
    });

    const handleInputChange = (coord: 'lat' | 'lon', field: 'deg' | 'min' | 'sec', value: string) => {
        const numValue = value === '' ? 0 : parseFloat(value);
        if (!isNaN(numValue)) {
            setDms(prev => ({ ...prev, [coord]: { ...prev[coord], [field]: numValue } }));
        }
    };
    
    const handleDirChange = (coord: 'lat' | 'lon', value: string) => {
        if (coord === 'lat' && (value === 'N' || value === 'S')) {
            setDms(prev => ({ ...prev, lat: { ...prev.lat, dir: value }}));
        }
        if (coord === 'lon' && (value === 'E' || value === 'W')) {
            setDms(prev => ({ ...prev, lon: { ...prev.lon, dir: value }}));
        }
    };

    const validateAndConvert = useCallback(() => {
        onError(null);
        if (dms.lat.deg < 0 || dms.lat.deg > 90) { onError(t('errorDmsLat')); return; }
        if (dms.lon.deg < 0 || dms.lon.deg > 180) { onError(t('errorDmsLon')); return; }
        if (dms.lat.min < 0 || dms.lat.min >= 60 || dms.lat.sec < 0 || dms.lat.sec >= 60) { onError(t('errorDmsMinSec')); return; }
        if (dms.lon.min < 0 || dms.lon.min >= 60 || dms.lon.sec < 0 || dms.lon.sec >= 60) { onError(t('errorDmsMinSec')); return; }
        
        try {
            const dd = converter.dmsToDd(dms);
            const utm = converter.ddToUtm(dd);
            onConvert({ dms, dd, utm });
        } catch (e) {
            onError(t('errorConversionFailed'));
        }
    }, [dms, onConvert, onError, t]);

    const handleClearFields = () => {
        setDms({
            lat: { deg: 0, min: 0, sec: 0, dir: 'N' },
            lon: { deg: 0, min: 0, sec: 0, dir: 'E' }
        });
        onClear();
    }

    const renderCoordInput = (coord: 'lat' | 'lon') => {
        const dirs = coord === 'lat' ? [{val: 'N', label: t('north')}, {val: 'S', label: t('south')}] : [{val: 'E', label: t('east')}, {val: 'W', label: t('west')}];
        return (
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{coord === 'lat' ? t('latitude') : t('longitude')}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <input type="number" placeholder={t('degrees')} value={dms[coord].deg || ''} onChange={e => handleInputChange(coord, 'deg', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
                    <input type="number" placeholder={t('minutes')} value={dms[coord].min || ''} onChange={e => handleInputChange(coord, 'min', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
                    <input type="number" placeholder={t('seconds')} step="0.01" value={dms[coord].sec || ''} onChange={e => handleInputChange(coord, 'sec', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500" />
                    <select value={dms[coord].dir} onChange={e => handleDirChange(coord, e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
                        {dirs.map(d => <option key={d.val} value={d.val}>{d.label}</option>)}
                    </select>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {renderCoordInput('lat')}
            {renderCoordInput('lon')}
            <div className="flex space-x-2 rtl:space-x-reverse pt-2">
                <button onClick={validateAndConvert} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">{t('convert')}</button>
                <button onClick={handleClearFields} className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">{t('clear')}</button>
            </div>
        </div>
    );
};

export default DmsInput;
