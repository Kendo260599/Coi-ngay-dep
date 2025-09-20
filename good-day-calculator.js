// Good Day Calculator - Tính toán ngày tốt/xấu dựa trên phong thủy Việt Nam

class GoodDayCalculator {
    constructor() {
        this.lunarCalendar = new LunarCalendar();
        this.initEventData();
    }

    // Khởi tạo dữ liệu các sự kiện và quy tắc
    initEventData() {
        // Định nghĩa các ngày tốt/xấu cho từng loại sự kiện
        this.eventRules = {
            dongTho: { // Động thổ - khởi công xây dựng
                goodDays: [1, 6, 8, 9, 10, 12, 15, 18, 21, 24, 27, 30],
                badDays: [3, 5, 7, 13, 14, 17, 19, 22, 23, 26, 29],
                favorableMonths: [1, 2, 4, 5, 7, 8, 10, 11],
                avoidMonths: [3, 6, 9, 12]
            },
            khaiTruong: { // Khai trương kinh doanh
                goodDays: [1, 6, 8, 9, 12, 15, 18, 21, 24, 28],
                badDays: [4, 5, 7, 13, 14, 17, 19, 22, 23, 26, 29],
                favorableMonths: [1, 2, 3, 5, 8, 9, 10, 11],
                avoidMonths: [4, 6, 7, 12]
            },
            nhapTrach: { // Nhập trạch - chuyển nhà
                goodDays: [1, 2, 6, 8, 9, 12, 15, 18, 21, 24, 27],
                badDays: [3, 5, 7, 11, 13, 14, 17, 19, 20, 23, 26, 29],
                favorableMonths: [1, 2, 4, 5, 7, 8, 10, 11],
                avoidMonths: [3, 6, 9, 12]
            },
            khoiHanh: { // Khởi hành - đi xa
                goodDays: [1, 6, 8, 9, 12, 15, 18, 21, 24, 27, 30],
                badDays: [3, 5, 7, 13, 14, 17, 19, 22, 23, 26, 29],
                favorableMonths: [1, 3, 4, 6, 7, 9, 10, 12],
                avoidMonths: [2, 5, 8, 11]
            },
            damCuoi: { // Đám cưới
                goodDays: [2, 6, 8, 9, 12, 15, 16, 18, 21, 24, 27, 30],
                badDays: [3, 5, 7, 13, 14, 17, 19, 22, 23, 26, 29],
                favorableMonths: [1, 2, 4, 5, 6, 8, 10, 11],
                avoidMonths: [3, 7, 9, 12]
            },
            anTang: { // An táng
                goodDays: [6, 7, 8, 12, 13, 15, 18, 21, 24, 27],
                badDays: [1, 3, 5, 9, 14, 17, 19, 22, 23, 26, 29, 30],
                favorableMonths: [1, 3, 5, 7, 9, 11],
                avoidMonths: [2, 4, 6, 8, 10, 12]
            },
            khamBenh: { // Khám bệnh
                goodDays: [1, 6, 8, 12, 15, 18, 21, 24, 27, 30],
                badDays: [3, 5, 7, 9, 13, 14, 17, 19, 22, 23, 26, 29],
                favorableMonths: [1, 2, 4, 5, 7, 8, 10, 11],
                avoidMonths: [3, 6, 9, 12]
            },
            kyHopDong: { // Ký hợp đồng
                goodDays: [1, 6, 8, 9, 12, 15, 18, 21, 24, 27, 30],
                badDays: [3, 5, 7, 13, 14, 17, 19, 22, 23, 26, 29],
                favorableMonths: [1, 2, 3, 5, 8, 9, 10, 11],
                avoidMonths: [4, 6, 7, 12]
            }
        };

        // Định nghĩa các ngày đặc biệt theo âm lịch
        this.specialDays = {
            tet: { month: 1, days: [1, 2, 3, 4, 5] }, // Tết Nguyên Đán
            thanMinh: { month: 3, days: [3] }, // Thánh Minh
            phatDan: { month: 4, days: [8] }, // Phật Đản
            dongChi: { month: 11, days: [22] }, // Đông chí
            trangVong: { // Rằm và sóc âm lịch
                fullMoon: [15],
                newMoon: [1, 30]
            }
        };

        // Định nghĩa các ngày xấu theo phong thủy
        this.badLuckDays = {
            amDuong: [5, 14, 23], // Ngày âm dương bất hòa
            tuyet: [4, 13, 22, 31], // Ngày tuyệt
            hoang: [7, 16, 25], // Ngày hoang
            ly: [6, 15, 24] // Ngày ly
        };
    }

    // Tính năm tuổi từ ngày sinh
    calculateAge(birthYear, currentYear) {
        return currentYear - birthYear + 1;
    }

    // Tính can chi của người dùng
    getPersonCanChi(birthYear) {
        return this.lunarCalendar.getCanChi(birthYear);
    }

    // Tính mệnh của người dùng dựa trên năm sinh
    getPersonDestiny(birthYear) {
        const destinyMap = {
            0: "Kim", 1: "Kim", // Canh, Tân
            2: "Thủy", 3: "Thủy", // Nhâm, Quý
            4: "Mộc", 5: "Mộc", // Giáp, Ất
            6: "Hỏa", 7: "Hỏa", // Bình, Đinh
            8: "Thổ", 9: "Thổ"  // Mậu, Kỷ
        };
        return destinyMap[(birthYear - 4) % 10];
    }

    // Kiểm tra tương khắc giữa mệnh và ngày
    checkElementCompatibility(personElement, dayElement) {
        const compatibility = {
            "Kim": { good: ["Thủy", "Thổ"], bad: ["Hỏa", "Mộc"], neutral: ["Kim"] },
            "Mộc": { good: ["Hỏa", "Thủy"], bad: ["Kim", "Thổ"], neutral: ["Mộc"] },
            "Thủy": { good: ["Mộc", "Kim"], bad: ["Thổ", "Hỏa"], neutral: ["Thủy"] },
            "Hỏa": { good: ["Thổ", "Mộc"], bad: ["Thủy", "Kim"], neutral: ["Hỏa"] },
            "Thổ": { good: ["Kim", "Hỏa"], bad: ["Mộc", "Thủy"], neutral: ["Thổ"] }
        };

        if (compatibility[personElement].good.includes(dayElement)) return 1;
        if (compatibility[personElement].bad.includes(dayElement)) return -1;
        return 0;
    }

    // Tính điểm số ngày tốt/xấu
    calculateDayScore(solarDate, lunarDate, eventType, personalInfo) {
        let score = 50; // Điểm cơ bản
        const rules = this.eventRules[eventType];
        
        if (!rules) return score;

        // Kiểm tra ngày tốt/xấu theo sự kiện
        if (rules.goodDays.includes(lunarDate.day)) {
            score += 20;
        } else if (rules.badDays.includes(lunarDate.day)) {
            score -= 20;
        }

        // Kiểm tra tháng tốt/xấu
        if (rules.favorableMonths.includes(lunarDate.month)) {
            score += 10;
        } else if (rules.avoidMonths.includes(lunarDate.month)) {
            score -= 10;
        }

        // Kiểm tra các ngày đặc biệt
        if (this.isSpecialDay(lunarDate)) {
            if (eventType === 'damCuoi' || eventType === 'khaiTruong') {
                score += 15; // Ngày lễ tốt cho cưới hỏi và khai trương
            } else {
                score -= 10; // Ngày lễ nên tránh các sự kiện khác
            }
        }

        // Kiểm tra ngày xấu theo phong thủy
        if (this.isBadLuckDay(lunarDate.day)) {
            score -= 15;
        }

        // Kiểm tra tương khắc mệnh
        const personDestiny = this.getPersonDestiny(personalInfo.birthYear);
        const dayDestiny = this.getDayDestiny(solarDate);
        const compatibility = this.checkElementCompatibility(personDestiny, dayDestiny);
        score += compatibility * 10;

        // Kiểm tra tuổi và ngày
        const age = this.calculateAge(personalInfo.birthYear, solarDate.getFullYear());
        if (this.isAgeCompatible(age, lunarDate.day)) {
            score += 5;
        }

        // Giới hạn điểm số từ 0-100
        return Math.max(0, Math.min(100, score));
    }

    // Kiểm tra ngày đặc biệt
    isSpecialDay(lunarDate) {
        // Kiểm tra Tết
        if (lunarDate.month === 1 && this.specialDays.tet.days.includes(lunarDate.day)) {
            return true;
        }
        
        // Kiểm tra rằm và sóc
        if (this.specialDays.trangVong.fullMoon.includes(lunarDate.day) || 
            this.specialDays.trangVong.newMoon.includes(lunarDate.day)) {
            return true;
        }

        return false;
    }

    // Kiểm tra ngày xấu
    isBadLuckDay(day) {
        return Object.values(this.badLuckDays).some(days => days.includes(day));
    }

    // Lấy mệnh của ngày
    getDayDestiny(date) {
        const elements = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"];
        return elements[date.getDate() % 5];
    }

    // Kiểm tra tuổi có hợp với ngày không
    isAgeCompatible(age, day) {
        return (age + day) % 2 === 0; // Quy tắc đơn giản: tổng chẵn thì tốt
    }

    // Lấy mô tả chi tiết về ngày
    getDayDescription(score, eventType) {
        const eventNames = {
            dongTho: "động thổ",
            khaiTruong: "khai trương",
            nhapTrach: "nhập trạch",
            khoiHanh: "khởi hành",
            damCuoi: "đám cưới",
            anTang: "an táng",
            khamBenh: "khám bệnh",
            kyHopDong: "ký hợp đồng"
        };

        let quality, advice;
        
        if (score >= 80) {
            quality = "Rất tốt";
            advice = `Ngày rất tốt cho việc ${eventNames[eventType]}. Nên thực hiện.`;
        } else if (score >= 65) {
            quality = "Tốt";
            advice = `Ngày tốt cho việc ${eventNames[eventType]}. Có thể thực hiện.`;
        } else if (score >= 45) {
            quality = "Bình thường";
            advice = `Ngày bình thường cho việc ${eventNames[eventType]}. Cân nhắc kỹ.`;
        } else if (score >= 30) {
            quality = "Không tốt";
            advice = `Ngày không tốt cho việc ${eventNames[eventType]}. Nên tránh.`;
        } else {
            quality = "Rất xấu";
            advice = `Ngày rất xấu cho việc ${eventNames[eventType]}. Tuyệt đối tránh.`;
        }

        return { quality, advice };
    }

    // Tìm ngày tốt trong khoảng thời gian
    findGoodDays(fromMonth, fromYear, eventType, personalInfo, daysToCheck = 60) {
        const results = [];
        const startDate = new Date(fromYear, fromMonth - 1, 1);
        
        for (let i = 0; i < daysToCheck; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const lunarInfo = this.lunarCalendar.getLunarInfo(
                currentDate.getDate(),
                currentDate.getMonth() + 1,
                currentDate.getFullYear()
            );
            
            const score = this.calculateDayScore(currentDate, lunarInfo, eventType, personalInfo);
            const description = this.getDayDescription(score, eventType);
            
            results.push({
                solarDate: {
                    day: currentDate.getDate(),
                    month: currentDate.getMonth() + 1,
                    year: currentDate.getFullYear(),
                    weekday: currentDate.toLocaleDateString('vi-VN', { weekday: 'long' })
                },
                lunarDate: lunarInfo,
                score: score,
                quality: description.quality,
                advice: description.advice,
                category: this.getScoreCategory(score)
            });
        }
        
        // Sắp xếp theo điểm số giảm dần
        results.sort((a, b) => b.score - a.score);
        
        return results;
    }

    // Phân loại điểm số
    getScoreCategory(score) {
        if (score >= 65) return 'good';
        if (score >= 45) return 'neutral';
        return 'bad';
    }

    // Lấy thống kê tổng quan
    getSummaryStats(results) {
        const good = results.filter(r => r.category === 'good').length;
        const neutral = results.filter(r => r.category === 'neutral').length;
        const bad = results.filter(r => r.category === 'bad').length;
        const bestDay = results[0];
        
        return {
            total: results.length,
            good: good,
            neutral: neutral,
            bad: bad,
            bestDay: bestDay
        };
    }
}