
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'fa';
export type InputMode = 'dms' | 'dd' | 'utm';

export interface DMS {
    lat: { deg: number; min: number; sec: number; dir: 'N' | 'S'; };
    lon: { deg: number; min: number; sec: number; dir: 'E' | 'W'; };
}

export interface DD {
    lat: number;
    lon: number;
}

export interface UTM {
    zone: number;
    hemisphere: 'N' | 'S';
    easting: number;
    northing: number;
}

export interface ConversionResult {
    dms: DMS;
    dd: DD;
    utm: UTM;
}

export interface ConversionHistoryItem extends ConversionResult {
    id: string;
    timestamp: number;
    inputMode: InputMode;
}
