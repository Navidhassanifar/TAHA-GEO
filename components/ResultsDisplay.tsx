
import React, { useState, useContext, useCallback } from 'react';
import { LanguageContext } from '../App';
import { ConversionResult } from '../types';
import { CopyIcon, MapIcon, DownloadIcon } from './icons';

interface ResultsDisplayProps {
    result: ConversionResult;
}

const CopyButton: React.FC<{textToCopy: string}> = ({ textToCopy }) => {
    const { t } = useContext(LanguageContext);
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [textToCopy]);

    return (
        <button onClick={handleCopy} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors relative">
            <CopyIcon className="w-5 h-5" />
            {copied && <span className="absolute -top-7 ltr:-left-1 rtl:-right-1 bg-gray-800 text-white text-xs rounded px-2 py-1">{t('copied')}</span>}
        </button>
    );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
    const { t } = useContext(LanguageContext);
    const { dms, dd, utm } = result;

    const dmsString = `${dms.lat.deg}° ${dms.lat.min}' ${dms.lat.sec}" ${dms.lat.dir}, ${dms.lon.deg}° ${dms.lon.min}' ${dms.lon.sec}" ${dms.lon.dir}`;
    const ddString = `${dd.lat.toFixed(6)}, ${dd.lon.toFixed(6)}`;
    const utmString = `Zone ${utm.zone}${utm.hemisphere}, E: ${utm.easting}, N: ${utm.northing}`;

    const handleDownload = (format: 'csv' | 'txt') => {
        let content = '';
        const filename = `conversion_results.${format}`;
        
        if (format === 'csv') {
            content = 'System,Value\r\n';
            content += `DMS,"${dmsString}"\r\n`;
            content += `DD,"${ddString}"\r\n`;
            content += `UTM,"${utmString}"\r\n`;
        } else {
            content = 'Coordinate Conversion Results\r\n\r\n';
            content += `DMS: ${dmsString}\r\n`;
            content += `DD: ${ddString}\r\n`;
            content += `UTM: ${utmString}\r\n`;
        }
        
        const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">{t('resultsTitle')}</h3>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <a href={`https://www.openstreetmap.org/?mlat=${dd.lat}&mlon=${dd.lon}#map=15/${dd.lat}/${dd.lon}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title={t('showOnMap')}>
                        <MapIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </a>
                    <div className="relative group">
                         <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title={t('download')}>
                            <DownloadIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        <div className="absolute top-full ltr:right-0 rtl:left-0 mt-2 w-32 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-10">
                            <button onClick={() => handleDownload('csv')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">CSV</button>
                            <button onClick={() => handleDownload('txt')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">TXT</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('dms')}</span>
                        <CopyButton textToCopy={dmsString} />
                    </div>
                    <p className="font-mono text-gray-800 dark:text-gray-200 text-sm md:text-base">{dmsString}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('dd')}</span>
                        <CopyButton textToCopy={ddString} />
                    </div>
                    <p className="font-mono text-gray-800 dark:text-gray-200 text-sm md:text-base">{ddString}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('utm')}</span>
                        <CopyButton textToCopy={utmString} />
                    </div>
                    <p className="font-mono text-gray-800 dark:text-gray-200 text-sm md:text-base">{utmString}</p>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
