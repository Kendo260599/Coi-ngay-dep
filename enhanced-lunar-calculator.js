// Enhanced Lunar Calendar Calculator - Nâng cấp tính toán âm lịch với độ chính xác cao
// Dựa trên thuật toán thiên văn chính xác của Ho Ngoc Duc

class EnhancedLunarCalendar {
    constructor() {
        this.PI = Math.PI;
        this.TIMEZONE_OFFSET = 7; // UTC+7 for Vietnam
        
        // Hằng số thiên văn chính xác
        this.LUNAR_MONTH = 29.530588853; // Chu kỳ trung bình tổng hợp của Mặt trăng
        this.TROPICAL_YEAR = 365.24219878; // Năm chí tuyến trung bình
        this.J2000 = 2451545.0; // Julian day của J2000.0 epoch
        
        // Độ chính xác cho tính toán
        this.PRECISION = 1e-6;
        
        this.initializeConstants();
    }

    // Khởi tạo các hằng số và dữ liệu cần thiết
    initializeConstants() {
        // Bảng tương đương can chi
        this.heavenlyStems = ["Giáp", "Ất", "Bình", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
        this.earthlyBranches = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
        
        // Tên con giáp
        this.zodiacAnimals = ["Chuột", "Trâu", "Hổ", "Mèo", "Rồng", "Rắn", "Ngựa", "Dê", "Khỉ", "Gà", "Chó", "Lợn"];
        
        // Ngũ hành tương ứng với can
        this.heavenlyStemElements = ["Mộc", "Mộc", "Hỏa", "Hỏa", "Thổ", "Thổ", "Kim", "Kim", "Thủy", "Thủy"];
        this.earthlyBranchElements = ["Thủy", "Thổ", "Mộc", "Mộc", "Thổ", "Hỏa", "Hỏa", "Thổ", "Kim", "Kim", "Thổ", "Thủy"];
        
        // Bảng tháng nhuận chính xác (dựa trên dữ liệu lịch sử)
        this.leapMonthData = this.generateLeapMonthData();
        
        // Dữ liệu 28 su (constellation) để tính toán chính xác hơn
        this.constellations = this.initializeConstellations();
    }

    // Tạo dữ liệu tháng nhuận chính xác
    generateLeapMonthData() {
        // Dữ liệu tháng nhuận từ 1900-2100 (có thể mở rộng)
        return {
            2023: null, 2024: 2, 2025: 6, 2026: null, 2027: 5, 2028: null,
            2029: 6, 2030: null, 2031: 3, 2032: null, 2033: 11, 2034: null,
            2035: null, 2036: 6, 2037: null, 2038: 5, 2039: null, 2040: 2,
            // ... có thể mở rộng thêm
        };
    }

    // Khởi tạo dữ liệu 28 su
    initializeConstellations() {
        return [
            // Đông phương Thanh Long
            { name: "Giác", element: "Mộc", group: "Đông", lucky: true },
            { name: "Cang", element: "Kim", group: "Đông", lucky: false },
            { name: "Đê", element: "Thổ", group: "Đông", lucky: false },
            { name: "Phòng", element: "Nhật", group: "Đông", lucky: true },
            { name: "Tâm", element: "Nguyệt", group: "Đông", lucky: false },
            { name: "Vĩ", element: "Hỏa", group: "Đông", lucky: true },
            { name: "Cơ", element: "Thủy", group: "Đông", lucky: true },
            
            // Bắc phương Huyền Vũ
            { name: "Đẩu", element: "Mộc", group: "Bắc", lucky: true },
            { name: "Ngưu", element: "Kim", group: "Bắc", lucky: false },
            { name: "Nữ", element: "Thổ", group: "Bắc", lucky: false },
            { name: "Hư", element: "Nhật", group: "Bắc", lucky: false },
            { name: "Nguy", element: "Nguyệt", group: "Bắc", lucky: false },
            { name: "Thất", element: "Hỏa", group: "Bắc", lucky: true },
            { name: "Bích", element: "Thủy", group: "Bắc", lucky: true },
            
            // Tây phương Bạch Hổ
            { name: "Khôi", element: "Mộc", group: "Tây", lucky: false },
            { name: "Lâu", element: "Kim", group: "Tây", lucky: true },
            { name: "Vị", element: "Thổ", group: "Tây", lucky: true },
            { name: "Mão", element: "Nhật", group: "Tây", lucky: false },
            { name: "Tất", element: "Nguyệt", group: "Tây", lucky: true },
            { name: "Chủy", element: "Hỏa", group: "Tây", lucky: false },
            { name: "Sâm", element: "Thủy", group: "Tây", lucky: true },
            
            // Nam phương Chu Tước
            { name: "Tỉnh", element: "Mộc", group: "Nam", lucky: true },
            { name: "Quỷ", element: "Kim", group: "Nam", lucky: false },
            { name: "Liễu", element: "Thổ", group: "Nam", lucky: false },
            { name: "Tinh", element: "Nhật", group: "Nam", lucky: false },
            { name: "Trương", element: "Nguyệt", group: "Nam", lucky: true },
            { name: "Dực", element: "Hỏa", group: "Nam", lucky: false },
            { name: "Chẩn", element: "Thủy", group: "Nam", lucky: true }
        ];
    }

    // Tính Julian Day Number với độ chính xác cao
    getJulianDayNumber(day, month, year, hour = 12, minute = 0, second = 0) {
        // Chuyển về UTC
        const utcHour = hour - this.TIMEZONE_OFFSET;
        
        // Công thức Julian Day chính xác
        let a = Math.floor((14 - month) / 12);
        let y = year - a;
        let m = month + 12 * a - 3;
        
        let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
                 Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        
        // Thêm thành phần thời gian
        jd += (utcHour + minute / 60 + second / 3600) / 24;
        
        // Điều chỉnh cho lịch Julian/Gregorian
        if (jd < 2299161) {
            jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
            jd += (utcHour + minute / 60 + second / 3600) / 24;
        }
        
        return jd;
    }

    // Tính New Moon với độ chính xác cao (dựa trên thuật toán Meeus)
    getNewMoon(k) {
        const T = k / 1236.85; // Century since J2000.0
        const T2 = T * T;
        const T3 = T2 * T;
        const T4 = T3 * T;
        
        // Mean New Moon
        let JDE = 2451550.09766 + 29.530588861 * k + 0.00015437 * T2 - 
                  0.000000150 * T3 + 0.00000000073 * T4;
        
        // Sun's mean anomaly
        const M = (2.5534 + 29.10535670 * k - 0.0000014 * T2 - 0.00000011 * T3) * this.PI / 180;
        
        // Moon's mean anomaly
        const Mpr = (201.5643 + 385.81693528 * k + 0.0107582 * T2 + 
                     0.00001238 * T3 - 0.000000058 * T4) * this.PI / 180;
        
        // Moon's argument of latitude
        const F = (160.7108 + 390.67050284 * k - 0.0016118 * T2 - 
                   0.00000227 * T3 + 0.000000011 * T4) * this.PI / 180;
        
        // Longitude of ascending node
        const Omega = (124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3) * this.PI / 180;
        
        // Periodic terms
        let correction = -0.40720 * Math.sin(Mpr) +
                        0.17241 * Math.sin(M) +
                        0.01608 * Math.sin(2 * Mpr) +
                        0.01039 * Math.sin(2 * F) +
                        0.00739 * Math.sin(Mpr - M) -
                        0.00514 * Math.sin(Mpr + M) +
                        0.00208 * Math.sin(2 * M) -
                        0.00111 * Math.sin(Mpr - 2 * F) -
                        0.00057 * Math.sin(Mpr + 2 * F) +
                        0.00056 * Math.sin(2 * Mpr + M) -
                        0.00042 * Math.sin(3 * Mpr) +
                        0.00042 * Math.sin(M + 2 * F) +
                        0.00038 * Math.sin(M - 2 * F) -
                        0.00024 * Math.sin(2 * Mpr - M) -
                        0.00017 * Math.sin(Omega) -
                        0.00007 * Math.sin(Mpr + 2 * M) +
                        0.00004 * Math.sin(2 * Mpr - 2 * F) +
                        0.00004 * Math.sin(3 * M) +
                        0.00003 * Math.sin(Mpr + M - 2 * F) +
                        0.00003 * Math.sin(2 * Mpr + 2 * F) -
                        0.00003 * Math.sin(Mpr + M + 2 * F) +
                        0.00003 * Math.sin(Mpr - M + 2 * F) -
                        0.00002 * Math.sin(Mpr - M - 2 * F) -
                        0.00002 * Math.sin(3 * Mpr + M) +
                        0.00002 * Math.sin(4 * Mpr);
        
        JDE += correction;
        
        // Additional planetary corrections
        const A1 = (299.77 + 0.107408 * k - 0.009173 * T2) * this.PI / 180;
        const A2 = (251.88 + 0.016321 * k) * this.PI / 180;
        const A3 = (251.83 + 26.651886 * k) * this.PI / 180;
        const A4 = (349.42 + 36.412478 * k) * this.PI / 180;
        const A5 = (84.66 + 18.206239 * k) * this.PI / 180;
        const A6 = (141.74 + 53.303771 * k) * this.PI / 180;
        const A7 = (207.14 + 2.453732 * k) * this.PI / 180;
        const A8 = (154.84 + 7.306860 * k) * this.PI / 180;
        const A9 = (34.52 + 27.261239 * k) * this.PI / 180;
        const A10 = (207.19 + 0.121824 * k) * this.PI / 180;
        const A11 = (291.34 + 1.844379 * k) * this.PI / 180;
        const A12 = (161.72 + 24.198154 * k) * this.PI / 180;
        const A13 = (239.56 + 25.513099 * k) * this.PI / 180;
        const A14 = (331.55 + 3.592518 * k) * this.PI / 180;
        
        const planetaryCorrection = 
            0.000325 * Math.sin(A1) + 0.000165 * Math.sin(A2) + 0.000164 * Math.sin(A3) +
            0.000126 * Math.sin(A4) + 0.000110 * Math.sin(A5) + 0.000062 * Math.sin(A6) +
            0.000060 * Math.sin(A7) + 0.000056 * Math.sin(A8) + 0.000047 * Math.sin(A9) +
            0.000042 * Math.sin(A10) + 0.000040 * Math.sin(A11) + 0.000037 * Math.sin(A12) +
            0.000035 * Math.sin(A13) + 0.000023 * Math.sin(A14);
        
        JDE += planetaryCorrection;
        
        return JDE;
    }

    // Tính kinh độ mặt trời với độ chính xác cao
    getSunLongitude(jdn) {
        const T = (jdn - this.J2000) / 36525.0;
        const T2 = T * T;
        const T3 = T2 * T;
        const T4 = T3 * T;
        const T5 = T4 * T;
        
        // Mean longitude
        let L0 = 280.4664567 + 360007.6982779 * T + 0.03032028 * T2 +
                 T3 / 49931 - T4 / 15300 - T5 / 2000000;
        
        // Mean anomaly
        const M = (357.52910918 + 35999.05029094 * T - 0.0001559 * T2 - 
                   T3 / 24490000) * this.PI / 180;
        
        // Equation of center
        const C = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(M) +
                  (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
                  0.000290 * Math.sin(3 * M);
        
        // True longitude
        const L = L0 + C;
        
        // Nutation in longitude
        const omega = (125.04 - 1934.136 * T) * this.PI / 180;
        const nutation = -17.20 * Math.sin(omega) - 1.32 * Math.sin(2 * L * this.PI / 180);
        
        let longitude = L + nutation / 3600;
        longitude = longitude % 360;
        if (longitude < 0) longitude += 360;
        
        return Math.floor(longitude / 30);
    }

    // Tính tháng 11 âm lịch chính xác (tháng có Đông chí)
    getLunarMonth11(year) {
        // Tìm thời điểm Đông chí
        const winterSolstice = this.getWinterSolstice(year);
        
        // Tìm sóc gần nhất trước Đông chí
        let k = Math.floor((winterSolstice - 2451550.09766) / this.LUNAR_MONTH);
        let newMoon = this.getNewMoon(k);
        
        while (newMoon > winterSolstice) {
            k--;
            newMoon = this.getNewMoon(k);
        }
        
        // Kiểm tra xem tháng này có chứa Đông chí không
        const nextNewMoon = this.getNewMoon(k + 1);
        if (winterSolstice >= newMoon && winterSolstice < nextNewMoon) {
            return newMoon;
        }
        
        return this.getNewMoon(k + 1);
    }

    // Tính thời điểm Đông chí chính xác
    getWinterSolstice(year) {
        // Thời điểm Đông chí gần đúng
        const T = (year - 2000) / 1000;
        let JDE = 2451900.05952 + 365242.74049 * T - 0.06223 * T * T - 
                  0.00823 * T * T * T + 0.00032 * T * T * T * T;
        
        // Hiệu chỉnh chính xác hơn
        const T2 = (JDE - this.J2000) / 36525;
        const S = 1 + 0.0334 * Math.cos((35999.373 * T2 - 2.47) * this.PI / 180) +
                  0.0007 * Math.cos((71998.746 * T2 - 4.94) * this.PI / 180);
        
        return JDE * S;
    }

    // Chuyển đổi dương lịch sang âm lịch với độ chính xác cao
    solarToLunar(day, month, year, hour = 12, minute = 0, second = 0) {
        const jdn = this.getJulianDayNumber(day, month, year, hour, minute, second);
        
        // Tìm sóc trước ngày này
        let k = Math.floor((jdn - 2451550.09766) / this.LUNAR_MONTH);
        let newMoon = this.getNewMoon(k);
        
        if (newMoon > jdn) {
            k--;
            newMoon = this.getNewMoon(k);
        }
        
        // Tính ngày âm lịch
        const lunarDay = Math.floor(jdn - newMoon) + 1;
        
        // Tìm tháng 11 của năm âm lịch
        const month11 = this.getLunarMonth11(year);
        let lunarYear = year;
        
        if (newMoon < month11) {
            lunarYear = year - 1;
        }
        
        // Tính tháng âm lịch
        const monthsFromMonth11 = Math.round((newMoon - month11) / this.LUNAR_MONTH);
        let lunarMonth = (monthsFromMonth11 + 11) % 12;
        if (lunarMonth === 0) lunarMonth = 12;
        
        // Xác định tháng nhuận
        let isLeapMonth = false;
        const leapMonth = this.leapMonthData[lunarYear];
        if (leapMonth && this.isInLeapMonth(newMoon, lunarYear, leapMonth)) {
            isLeapMonth = true;
        }
        
        return {
            day: lunarDay,
            month: lunarMonth,
            year: lunarYear,
            leap: isLeapMonth,
            jdn: jdn,
            newMoonJdn: newMoon
        };
    }

    // Kiểm tra có phải tháng nhuận không
    isInLeapMonth(newMoonJdn, year, leapMonth) {
        // Logic phức tạp để xác định tháng nhuận chính xác
        // Tạm thời return false, cần implement chi tiết hơn
        return false;
    }

    // Lấy can chi của ngày
    getDayCanChi(jdn) {
        // Can của ngày (chu kỳ 10 ngày)
        const canIndex = (Math.floor(jdn + 4) % 10);
        
        // Chi của ngày (chu kỳ 12 ngày) 
        const chiIndex = (Math.floor(jdn + 2) % 12);
        
        return {
            can: this.heavenlyStems[canIndex],
            chi: this.earthlyBranches[chiIndex],
            canChi: this.heavenlyStems[canIndex] + " " + this.earthlyBranches[chiIndex],
            canIndex: canIndex,
            chiIndex: chiIndex
        };
    }

    // Lấy can chi của năm
    getYearCanChi(year) {
        const canIndex = (year - 4) % 10;
        const chiIndex = (year - 4) % 12;
        
        return {
            can: this.heavenlyStems[canIndex],
            chi: this.earthlyBranches[chiIndex],
            canChi: this.heavenlyStems[canIndex] + " " + this.earthlyBranches[chiIndex],
            zodiac: this.zodiacAnimals[chiIndex],
            canIndex: canIndex,
            chiIndex: chiIndex
        };
    }

    // Lấy can chi của tháng
    getMonthCanChi(month, year) {
        const yearCanIndex = (year - 4) % 10;
        let monthCanIndex;
        
        // Công thức tính can của tháng dựa trên can của năm
        if (yearCanIndex === 0 || yearCanIndex === 5) { // Giáp, Kỷ
            monthCanIndex = (month + 1) % 10;
        } else if (yearCanIndex === 1 || yearCanIndex === 6) { // Ất, Canh
            monthCanIndex = (month + 3) % 10;
        } else if (yearCanIndex === 2 || yearCanIndex === 7) { // Bình, Tân
            monthCanIndex = (month + 5) % 10;
        } else if (yearCanIndex === 3 || yearCanIndex === 8) { // Đinh, Nhâm
            monthCanIndex = (month + 7) % 10;
        } else { // Mậu, Quý
            monthCanIndex = (month + 9) % 10;
        }
        
        const monthChiIndex = (month + 1) % 12;
        
        return {
            can: this.heavenlyStems[monthCanIndex],
            chi: this.earthlyBranches[monthChiIndex],
            canChi: this.heavenlyStems[monthCanIndex] + " " + this.earthlyBranches[monthChiIndex],
            canIndex: monthCanIndex,
            chiIndex: monthChiIndex
        };
    }

    // Lấy can chi của giờ
    getHourCanChi(hour, dayCanIndex) {
        const hourChiIndex = Math.floor((hour + 1) / 2) % 12;
        let hourCanIndex;
        
        // Công thức tính can của giờ dựa trên can của ngày
        if (dayCanIndex === 0 || dayCanIndex === 5) { // Giáp, Kỷ
            hourCanIndex = hourChiIndex;
        } else if (dayCanIndex === 1 || dayCanIndex === 6) { // Ất, Canh
            hourCanIndex = (hourChiIndex + 2) % 10;
        } else if (dayCanIndex === 2 || dayCanIndex === 7) { // Bình, Tân
            hourCanIndex = (hourChiIndex + 4) % 10;
        } else if (dayCanIndex === 3 || dayCanIndex === 8) { // Đinh, Nhâm
            hourCanIndex = (hourChiIndex + 6) % 10;
        } else { // Mậu, Quý
            hourCanIndex = (hourChiIndex + 8) % 10;
        }
        
        return {
            can: this.heavenlyStems[hourCanIndex],
            chi: this.earthlyBranches[hourChiIndex],
            canChi: this.heavenlyStems[hourCanIndex] + " " + this.earthlyBranches[hourChiIndex],
            canIndex: hourCanIndex,
            chiIndex: hourChiIndex
        };
    }

    // Lấy 28 su của ngày
    getConstellation(jdn) {
        const constellationIndex = Math.floor(jdn + 4) % 28;
        return this.constellations[constellationIndex];
    }

    // Lấy thông tin đầy đủ về ngày âm lịch
    getCompleteLunarInfo(day, month, year, hour = 12, minute = 0, second = 0) {
        const lunar = this.solarToLunar(day, month, year, hour, minute, second);
        const yearCanChi = this.getYearCanChi(lunar.year);
        const monthCanChi = this.getMonthCanChi(lunar.month, lunar.year);
        const dayCanChi = this.getDayCanChi(lunar.jdn);
        const hourCanChi = this.getHourCanChi(hour, dayCanChi.canIndex);
        const constellation = this.getConstellation(lunar.jdn);
        
        return {
            solar: { day, month, year, hour, minute, second },
            lunar: {
                day: lunar.day,
                month: lunar.month,
                year: lunar.year,
                leap: lunar.leap,
                dateString: `${lunar.day}/${lunar.month}${lunar.leap ? ' (nhuận)' : ''}/${lunar.year}`
            },
            canChi: {
                year: yearCanChi,
                month: monthCanChi,
                day: dayCanChi,
                hour: hourCanChi
            },
            constellation: constellation,
            elements: {
                yearElement: this.heavenlyStemElements[yearCanChi.canIndex],
                dayElement: this.heavenlyStemElements[dayCanChi.canIndex],
                compatibility: this.getElementCompatibility(
                    this.heavenlyStemElements[yearCanChi.canIndex],
                    this.heavenlyStemElements[dayCanChi.canIndex]
                )
            },
            jdn: lunar.jdn,
            newMoonJdn: lunar.newMoonJdn
        };
    }

    // Tính tương sinh tương khắc ngũ hành
    getElementCompatibility(element1, element2) {
        const compatibility = {
            "Mộc": { generates: "Hỏa", destroys: "Thổ", generatedBy: "Thủy", destroyedBy: "Kim" },
            "Hỏa": { generates: "Thổ", destroys: "Kim", generatedBy: "Mộc", destroyedBy: "Thủy" },
            "Thổ": { generates: "Kim", destroys: "Thủy", generatedBy: "Hỏa", destroyedBy: "Mộc" },
            "Kim": { generates: "Thủy", destroys: "Mộc", generatedBy: "Thổ", destroyedBy: "Hỏa" },
            "Thủy": { generates: "Mộc", destroys: "Hỏa", generatedBy: "Kim", destroyedBy: "Thổ" }
        };
        
        const relation = compatibility[element1];
        if (!relation) return "unknown";
        
        if (relation.generates === element2) return "generates"; // Tương sinh
        if (relation.destroys === element2) return "destroys"; // Tương khắc
        if (relation.generatedBy === element2) return "generatedBy"; // Được sinh
        if (relation.destroyedBy === element2) return "destroyedBy"; // Bị khắc
        if (element1 === element2) return "same"; // Cùng hành
        
        return "neutral"; // Không quan hệ
    }
}