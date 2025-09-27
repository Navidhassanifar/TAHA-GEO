
import { DMS, DD, UTM } from '../types';

// WGS84 Ellipsoid Constants
const WGS84_A = 6378137.0; // Semi-major axis
const WGS84_E2 = 0.00669437999014; // Eccentricity squared

const degToRad = (deg: number) => deg * Math.PI / 180;
const radToDeg = (rad: number) => rad * 180 / Math.PI;

class CoordinateConverter {
    // --- DMS to DD ---
    dmsToDd(dms: DMS): DD {
        const latSign = dms.lat.dir === 'S' ? -1 : 1;
        const lonSign = dms.lon.dir === 'W' ? -1 : 1;
        
        const lat = latSign * (dms.lat.deg + dms.lat.min / 60 + dms.lat.sec / 3600);
        const lon = lonSign * (dms.lon.deg + dms.lon.min / 60 + dms.lon.sec / 3600);
        
        return { lat, lon };
    }

    // --- DD to DMS ---
    ddToDms(dd: DD): DMS {
        const latDir = dd.lat >= 0 ? 'N' : 'S';
        const lonDir = dd.lon >= 0 ? 'E' : 'W';

        const latAbs = Math.abs(dd.lat);
        let latDeg = Math.floor(latAbs);
        let latMin = Math.floor((latAbs - latDeg) * 60);
        let latSec = (((latAbs - latDeg) * 60) - latMin) * 60;

        const lonAbs = Math.abs(dd.lon);
        let lonDeg = Math.floor(lonAbs);
        let lonMin = Math.floor((lonAbs - lonDeg) * 60);
        let lonSec = (((lonAbs - lonDeg) * 60) - lonMin) * 60;
        
        if (latSec >= 60) { latSec -= 60; latMin++; }
        if (latMin >= 60) { latMin -= 60; latDeg++; }
        if (lonSec >= 60) { lonSec -= 60; lonMin++; }
        if (lonMin >= 60) { lonMin -= 60; lonDeg++; }


        return {
            lat: { deg: latDeg, min: latMin, sec: parseFloat(latSec.toFixed(2)), dir: latDir },
            lon: { deg: lonDeg, min: lonMin, sec: parseFloat(lonSec.toFixed(2)), dir: lonDir }
        };
    }
    
    // --- DD to UTM ---
    ddToUtm(dd: DD): UTM {
        const { lat, lon } = dd;
        
        const zone = Math.floor((lon + 180) / 6) + 1;
        const lon0 = degToRad((zone - 1) * 6 - 180 + 3); // Central meridian

        const latRad = degToRad(lat);
        const lonRad = degToRad(lon);

        const e2 = WGS84_E2;
        const a = WGS84_A;
        const k0 = 0.9996; // Scale factor
        const falseEasting = 500000;
        const falseNorthing = lat < 0 ? 10000000 : 0;

        const N = a / Math.sqrt(1 - e2 * Math.sin(latRad) ** 2);
        const T = Math.tan(latRad) ** 2;
        const C = e2 / (1 - e2) * Math.cos(latRad) ** 2;
        const A = (lonRad - lon0) * Math.cos(latRad);

        const M = a * (
            (1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256) * latRad -
            (3 * e2 / 8 + 3 * e2 ** 2 / 32 + 45 * e2 ** 3 / 1024) * Math.sin(2 * latRad) +
            (15 * e2 ** 2 / 256 + 45 * e2 ** 3 / 1024) * Math.sin(4 * latRad) -
            (35 * e2 ** 3 / 3072) * Math.sin(6 * latRad)
        );

        const easting = falseEasting + k0 * N * (A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T ** 2 + 72 * C - 58 * e2) * A ** 5 / 120);
        const northing = falseNorthing + k0 * (M + N * Math.tan(latRad) * (A ** 2 / 2 + (5 - T + 9 * C + 4 * C ** 2) * A ** 4 / 24 + (61 - 58 * T + T ** 2 + 600 * C - 330 * e2) * A ** 6 / 720));

        return {
            zone: zone,
            hemisphere: lat >= 0 ? 'N' : 'S',
            easting: parseFloat(easting.toFixed(2)),
            northing: parseFloat(northing.toFixed(2))
        };
    }
    
    // --- UTM to DD ---
    utmToDd(utm: UTM): DD {
        const { zone, hemisphere, easting, northing } = utm;

        const k0 = 0.9996;
        const a = WGS84_A;
        const e2 = WGS84_E2;
        const e = Math.sqrt(e2);
        const e_prime2 = e2 / (1 - e2);

        const falseEasting = 500000;
        const falseNorthing = hemisphere === 'S' ? 10000000 : 0;

        const x = easting - falseEasting;
        const y = northing - falseNorthing;
        
        const lon0 = degToRad((zone - 1) * 6 - 180 + 3);

        const M = y / k0;
        const mu = M / (a * (1 - e2/4 - 3*e2*e2/64 - 5*e2*e2*e2/256));
        
        const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1-e2));

        const lat1 = mu + 
                    (3*e1/2 - 27*e1*e1*e1/32) * Math.sin(2*mu) +
                    (21*e1*e1/16 - 55*e1*e1*e1*e1/32) * Math.sin(4*mu) +
                    (151*e1*e1*e1/96) * Math.sin(6*mu);

        const C1 = e_prime2 * Math.cos(lat1)**2;
        const T1 = Math.tan(lat1)**2;
        const N1 = a / Math.sqrt(1-e2*Math.sin(lat1)**2);
        const R1 = a * (1-e2) / Math.pow(1-e2*Math.sin(lat1)**2, 1.5);
        const D = x / (N1*k0);

        const lat = lat1 - (N1*Math.tan(lat1)/R1) * (D*D/2 - (5 + 3*T1 + 10*C1 - 4*C1*C1 - 9*e_prime2)*D*D*D*D/24 + (61 + 90*T1 + 298*C1 + 45*T1*T1 - 252*e_prime2 - 3*C1*C1)*D*D*D*D*D*D/720);
        const lon = lon0 + (D - (1+2*T1+C1)*D*D*D/6 + (5 - 2*C1 + 28*T1 - 3*C1*C1 + 8*e_prime2 + 24*T1*T1)*D*D*D*D*D/120) / Math.cos(lat1);

        return {
            lat: parseFloat(radToDeg(lat).toFixed(6)),
            lon: parseFloat(radToDeg(lon).toFixed(6))
        };
    }
}

export const converter = new CoordinateConverter();
