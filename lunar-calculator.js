// Lunar Calendar Calculator
// Chuyển đổi từ dương lịch sang âm lịch

class LunarCalendar {
    constructor() {
        // Dữ liệu âm lịch cơ bản
        this.PI = Math.PI;
        this.TIMEZONE_OFFSET = 7; // UTC+7 for Vietnam
    }

    // Tính Julian Day Number
    getJulianDayNumber(day, month, year) {
        let a = Math.floor((14 - month) / 12);
        let y = year - a;
        let m = month + 12 * a - 3;
        
        let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        
        if (jd < 2299161) {
            jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
        }
        
        return jd;
    }

    // Tính New Moon (Sóc)
    getNewMoon(k) {
        let T = k / 1236.85; // số thế kỷ từ J2000.0
        let T2 = T * T;
        let T3 = T2 * T;
        let dr = this.PI / 180;
        
        let Jd1 = 2451550.09766 + 29.530588861 * k + 0.00015437 * T2 - 0.000000150 * T3 + 0.00000000073 * T2 * T2;
        
        let M = 2.5534 + 29.10535670 * k - 0.0000014 * T2 - 0.00000011 * T3; // Mean anomaly of the Sun
        let Mpr = 201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T2 * T2; // Mean anomaly of the Moon
        let F = 160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T2 * T2; // Moon's argument of latitude
        let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
        C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
        C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
        C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
        C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
        C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
        C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
        
        let deltat;
        if (T < -11) {
            deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
        } else {
            deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
        }
        
        return Jd1 + C1 - deltat;
    }

    // Tính Summer Solstice (Hạ chí)
    getSummerSolstice(year) {
        let T = (year - 2000) / 1000;
        let JDE0 = 2451716.56767 + 365241.62603 * T + 0.00325 * T * T + 0.00888 * T * T * T - 0.00030 * T * T * T * T;
        return JDE0;
    }

    // Tính tháng 11 âm lịch (tháng có Đông chí)
    getLunarMonth11(year) {
        let off = this.getJulianDayNumber(31, 12, year) - 2415021;
        let k = Math.floor(off / 29.530588853);
        let nm = this.getNewMoon(k);
        let sunLong = this.getSunLongitude(nm);
        
        if (sunLong >= 9) {
            nm = this.getNewMoon(k - 1);
        }
        
        return nm;
    }

    // Tính kinh độ mặt trời
    getSunLongitude(jdn) {
        let T = (jdn - 2451545.0) / 36525; // số thế kỷ từ J2000.0
        let T2 = T * T;
        let dr = this.PI / 180; // chuyển độ sang radian
        let M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T * T; // mean anomaly, degree
        let L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
        let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
        DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
        let L = L0 + DL; // true longitude, degree
        
        L = L - 360 * (Math.floor(L / 360)); // chuyển về [0, 360)
        return Math.floor(L / 30);
    }

    // Tính leap month (tháng nhuận)
    getLeapMonthOffset(a11, b11) {
        let k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
        let last = 0;
        let i = 1; // kiểm tra từ tháng 1 đến tháng 12
        let arc = this.getSunLongitude(this.getNewMoon(k + i));
        
        do {
            last = arc;
            i++;
            arc = this.getSunLongitude(this.getNewMoon(k + i));
        } while (arc != last && i < 14);
        
        return i - 1;
    }

    // Chuyển đổi từ dương lịch sang âm lịch
    solarToLunar(day, month, year) {
        let dayNumber = this.getJulianDayNumber(day, month, year);
        let k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
        let monthStart = this.getNewMoon(k + 1);
        
        if (monthStart > dayNumber) {
            monthStart = this.getNewMoon(k);
        }
        
        let a11 = this.getLunarMonth11(year);
        let b11 = a11;
        
        if (a11 >= monthStart) {
            let lunarYear = year;
            a11 = this.getLunarMonth11(year - 1);
        } else {
            let lunarYear = year + 1;
            b11 = this.getLunarMonth11(year + 1);
        }
        
        let lunarDay = dayNumber - monthStart + 1;
        let diff = Math.floor((monthStart - a11) / 29.530588853);
        let lunarLeap = 0;
        let lunarMonth = diff + 11;
        
        if (b11 - a11 > 365) {
            let leapMonthDiff = this.getLeapMonthOffset(a11, b11);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
                if (diff == leapMonthDiff) {
                    lunarLeap = 1;
                }
            }
        }
        
        if (lunarMonth > 12) {
            lunarMonth = lunarMonth - 12;
        }
        if (lunarMonth >= 11 && diff < 4) {
            let lunarYear = year - 1;
        } else {
            let lunarYear = year;
        }
        
        return {
            day: lunarDay,
            month: lunarMonth,
            year: year,
            leap: lunarLeap
        };
    }

    // Lấy tên can chi
    getCanChi(year) {
        const can = ["Giáp", "Ất", "Bình", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
        const chi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
        
        return can[(year - 4) % 10] + " " + chi[(year - 4) % 12];
    }

    // Lấy con giáp
    getZodiac(year) {
        const zodiacs = ["Chuột", "Sửu", "Hổ", "Mèo", "Rồng", "Rắn", "Ngựa", "Dê", "Khỉ", "Gà", "Chó", "Lợn"];
        return zodiacs[(year - 4) % 12];
    }

    // Lấy thông tin đầy đủ về ngày âm lịch
    getLunarInfo(day, month, year) {
        const lunar = this.solarToLunar(day, month, year);
        const canChi = this.getCanChi(lunar.year);
        const zodiac = this.getZodiac(lunar.year);
        
        return {
            day: lunar.day,
            month: lunar.month,
            year: lunar.year,
            leap: lunar.leap,
            canChi: canChi,
            zodiac: zodiac,
            lunarDateString: `${lunar.day}/${lunar.month}${lunar.leap ? ' (nhuận)' : ''}/${lunar.year}`
        };
    }
}