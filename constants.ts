
export const translations = {
    en: {
        // Header
        appTitle: 'GeoConvert',
        language: 'Language',
        persian: 'فارسی',
        english: 'English',
        theme: 'Theme',
        
        // Converter
        converterTitle: 'Coordinate Converter',
        dms: 'DMS',
        dd: 'DD',
        utm: 'UTM',
        convert: 'Convert',
        clear: 'Clear',
        
        // DMS Input
        latitude: 'Latitude',
        longitude: 'Longitude',
        degrees: 'Degrees',
        minutes: 'Minutes',
        seconds: 'Seconds',
        north: 'N',
        south: 'S',
        east: 'E',
        west: 'W',
        
        // DD Input
        decimalDegrees: 'Decimal Degrees',
        latPlaceholder: 'e.g., 35.6892',
        lonPlaceholder: 'e.g., 51.3890',
        
        // UTM Input
        zone: 'Zone',
        hemisphere: 'Hemisphere',
        easting: 'Easting',
        northing: 'Northing',
        
        // Results
        resultsTitle: 'Conversion Results',
        showOnMap: 'Show on Map',
        download: 'Download',
        downloadAs: 'Download as',
        copied: 'Copied!',
        
        // History
        historyTitle: 'Conversion History (Last 10)',
        noHistory: 'No conversions yet.',
        
        // Info Section
        infoTitle: 'About Coordinate Systems',
        infoDmsTitle: 'DMS (Degrees, Minutes, Seconds)',
        infoDmsText: 'This is the most traditional format for geographic coordinates, often seen on maps and in navigation. It divides one degree into 60 minutes, and one minute into 60 seconds, allowing for very precise location marking. For example, a geologist might record an outcrop location as 35° 41\' 22" N, 51° 25\' 23" E.',
        infoDdTitle: 'DD (Decimal Degrees)',
        infoDdText: 'Decimal Degrees express latitude and longitude as decimal fractions. It is simpler for mathematical calculations and is the standard format used in most GIS (Geographic Information Systems) and web mapping applications. South latitudes and West longitudes are represented with negative numbers. The previous DMS example becomes 35.6894° N, 51.4231° E.',
        infoUtmTitle: 'UTM (Universal Transverse Mercator)',
        infoUtmText: 'UTM is a grid-based system rather than using latitude and longitude. It divides the Earth into 60 zones, each 6 degrees of longitude wide. Locations are measured in meters (Easting for east-west and Northing for north-south) from a central meridian in each zone. This system is ideal for fieldwork and local-scale mapping because it provides constant distances and angles, making it easy to measure areas and distances directly on a map. A field geologist might use UTM to map a geological fault over several kilometers.',
        
        // Errors
        errorInvalidInput: 'Invalid input. Please check the values.',
        errorDmsLat: 'Lat Degrees must be 0-90.',
        errorDmsLon: 'Lon Degrees must be 0-180.',
        errorDmsMinSec: 'Minutes/Seconds must be 0-59.99.',
        errorDdLat: 'Latitude must be between -90 and 90.',
        errorDdLon: 'Longitude must be between -180 and 180.',
        errorUtmZone: 'Zone must be between 1 and 60.',
        errorUtmEasting: 'Easting is out of range.',
        errorUtmNorthing: 'Northing is out of range.',
        errorConversionFailed: 'Conversion failed. Please check inputs.',

        // Footer
        footerText: 'Designed for Geologists & Researchers | Built with React & Tailwind CSS'
    },
    fa: {
        // Header
        appTitle: 'جئوکانورت',
        language: 'زبان',
        persian: 'فارسی',
        english: 'English',
        theme: 'پوسته',

        // Converter
        converterTitle: 'مبدل مختصات',
        dms: 'درجه، دقیقه، ثانیه',
        dd: 'درجات اعشاری',
        utm: 'یو تی ام',
        convert: 'تبدیل',
        clear: 'پاک کردن',

        // DMS Input
        latitude: 'عرض جغرافیایی',
        longitude: 'طول جغرافیایی',
        degrees: 'درجه',
        minutes: 'دقیقه',
        seconds: 'ثانیه',
        north: 'شمالی',
        south: 'جنوبی',
        east: 'شرقی',
        west: 'غربی',

        // DD Input
        decimalDegrees: 'درجات اعشاری',
        latPlaceholder: 'مثال: 35.6892',
        lonPlaceholder: 'مثال: 51.3890',

        // UTM Input
        zone: 'زون',
        hemisphere: 'نیمکره',
        easting: 'شرقیا',
        northing: 'شمالیا',

        // Results
        resultsTitle: 'نتایج تبدیل',
        showOnMap: 'نمایش روی نقشه',
        download: 'دانلود',
        downloadAs: 'دانلود به عنوان',
        copied: 'کپی شد!',

        // History
        historyTitle: 'تاریخچه تبدیل (۱۰ مورد اخیر)',
        noHistory: 'هنوز تبدیلی انجام نشده است.',

        // Info Section
        infoTitle: 'درباره سیستم‌های مختصات',
        infoDmsTitle: 'DMS (درجه، دقیقه، ثانیه)',
        infoDmsText: 'این سنتی‌ترین قالب برای مختصات جغرافیایی است که اغلب روی نقشه‌ها و در ناوبری دیده می‌شود. این سیستم یک درجه را به ۶۰ دقیقه و یک دقیقه را به ۶۰ ثانیه تقسیم می‌کند و امکان علامت‌گذاری بسیار دقیق مکان را فراهم می‌کند. به عنوان مثال، یک زمین‌شناس ممکن است مکان یک رخنمون سنگی را به صورت ۳۵° ۴۱\' ۲۲" شمالی، ۵۱° ۲۵\' ۲۳" شرقی ثبت کند.',
        infoDdTitle: 'DD (درجات اعشاری)',
        infoDdText: 'درجات اعشاری عرض و طول جغرافیایی را به صورت کسر اعشاری بیان می‌کنند. این روش برای محاسبات ریاضی ساده‌تر است و فرمت استانداردی است که در اکثر سیستم‌های اطلاعات جغرافیایی (GIS) و برنامه‌های نقشه‌برداری وب استفاده می‌شود. عرض‌های جنوبی و طول‌های غربی با اعداد منفی نمایش داده می‌شوند. مثال DMS قبلی به ۳۵.۶۸۹۴° شمالی، ۵۱.۴۲۳۱° شرقی تبدیل می‌شود.',
        infoUtmTitle: 'UTM (سیستم مرکاتور معکوس جهانی)',
        infoUtmText: 'UTM یک سیستم مبتنی بر شبکه است به جای استفاده از عرض و طول جغرافیایی. این سیستم زمین را به ۶۰ زون تقسیم می‌کند که هر کدام ۶ درجه طول جغرافیایی عرض دارند. مکان‌ها بر حسب متر (Easting برای شرق-غرب و Northing برای شمال-جنوب) از یک نصف‌النهار مرکزی در هر زون اندازه‌گیری می‌شوند. این سیستم برای کارهای میدانی و نقشه‌برداری در مقیاس محلی ایده‌آل است زیرا فواصل و زوایای ثابتی را ارائه می‌دهد و اندازه‌گیری مساحت‌ها و فواصل را مستقیماً روی نقشه آسان می‌کند. یک زمین‌شناس میدانی ممکن است از UTM برای نقشه‌برداری یک گسل زمین‌شناسی در طول چندین کیلومتر استفاده کند.',
        
        // Errors
        errorInvalidInput: 'ورودی نامعتبر است. لطفاً مقادیر را بررسی کنید.',
        errorDmsLat: 'درجه عرض باید بین ۰-۹۰ باشد.',
        errorDmsLon: 'درجه طول باید بین ۰-۱۸۰ باشد.',
        errorDmsMinSec: 'دقیقه/ثانیه باید بین ۰-۵۹.۹۹ باشد.',
        errorDdLat: 'عرض جغرافیایی باید بین ۹۰- و ۹۰ باشد.',
        errorDdLon: 'طول جغرافیایی باید بین ۱۸۰- و ۱۸۰ باشد.',
        errorUtmZone: 'زون باید بین ۱ و ۶۰ باشد.',
        errorUtmEasting: 'مقدار Easting خارج از محدوده است.',
        errorUtmNorthing: 'مقدار Northing خارج از محدوده است.',
        errorConversionFailed: 'تبدیل ناموفق بود. لطفاً ورودی‌ها را بررسی کنید.',
        
        // Footer
        footerText: 'طراحی شده برای زمین‌شناسان و پژوهشگران | ساخته شده با React و Tailwind CSS'
    }
};
