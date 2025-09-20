// Enhanced Good Day Calculator - Hệ thống tính toán ngày tốt/xấu nâng cấp
// Dựa trên dữ liệu phong thủy truyền thống Việt Nam và Trung Quốc

class EnhancedGoodDayCalculator {
    constructor() {
        this.lunarCalendar = new EnhancedLunarCalendar();
        this.initializeDatabase();
    }

    // Khởi tạo cơ sở dữ liệu phong thủy đầy đủ
    initializeDatabase() {
        this.initEventRules();
        this.initSpecialDays();
        this.initBadLuckDays();
        this.initPersonalitySystem();
        this.initDirectionalSystem();
        this.initTimeSystem();
        this.initColorSystem();
    }

    // Quy tắc chi tiết cho từng loại sự kiện
    initEventRules() {
        this.eventRules = {
            dongTho: {
                name: "Động thổ",
                description: "Khởi công xây dựng, đào móng",
                favorableDays: {
                    canchi: ["Giáp Tý", "Ất Sửu", "Bình Dần", "Đinh Mão", "Mậu Thìn", "Canh Ngọ", "Tân Mùi", "Nhâm Thân"],
                    lunar: [1, 3, 6, 8, 9, 12, 15, 18, 21, 24, 27, 30],
                    constellation: ["Giác", "Phòng", "Vĩ", "Cơ", "Đẩu", "Thất", "Bích", "Lâu", "Vị", "Tỉnh", "Trương", "Chẩn"]
                },
                unfavorableDays: {
                    canchi: ["Kỷ Tỵ", "Quý Dậu", "Đinh Hợi"],
                    lunar: [5, 7, 13, 14, 17, 19, 22, 23, 26, 29],
                    constellation: ["Cang", "Đê", "Tâm", "Ngưu", "Nữ", "Hư", "Nguy", "Khôi", "Mão", "Chủy", "Quỷ", "Liễu", "Tinh", "Dực"]
                },
                elementCompatibility: {
                    favorable: ["Thổ", "Kim"],
                    unfavorable: ["Mộc"],
                    neutral: ["Hỏa", "Thủy"]
                },
                monthRules: {
                    bestMonths: [1, 2, 4, 5, 7, 8, 10, 11],
                    avoidMonths: [3, 6, 9, 12],
                    neutralMonths: []
                },
                timeRules: {
                    bestHours: ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Ngọ"],
                    avoidHours: ["Tỵ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]
                }
            },
            khaiTruong: {
                name: "Khai trương",
                description: "Khai trương kinh doanh, mở cửa hàng",
                favorableDays: {
                    canchi: ["Giáp Tý", "Ất Sửu", "Bình Dần", "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Tân Mùi", "Nhâm Thân", "Quý Dậu"],
                    lunar: [1, 6, 8, 9, 12, 15, 18, 21, 24, 28],
                    constellation: ["Giác", "Phòng", "Vĩ", "Cơ", "Đẩu", "Thất", "Bích", "Lâu", "Vị", "Tỉnh", "Trương", "Chẩn"]
                },
                unfavorableDays: {
                    canchi: ["Đinh Mão", "Đinh Hợi", "Nhâm Tý"],
                    lunar: [4, 5, 7, 13, 14, 17, 19, 22, 23, 26, 29],
                    constellation: ["Cang", "Đê", "Tâm", "Ngưu", "Nữ", "Hư", "Nguy", "Khôi", "Mão", "Chủy", "Quỷ", "Liễu", "Tinh", "Dực"]
                },
                elementCompatibility: {
                    favorable: ["Kim", "Thủy"],
                    unfavorable: ["Hỏa"],
                    neutral: ["Mộc", "Thổ"]
                },
                monthRules: {
                    bestMonths: [1, 2, 3, 5, 8, 9, 10, 11],
                    avoidMonths: [4, 6, 7, 12],
                    neutralMonths: []
                },
                timeRules: {
                    bestHours: ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ"],
                    avoidHours: ["Mùi", "Thân", "Dậu", "Tuất", "Hợi"]
                }
            },
            nhapTrach: {
                name: "Nhập trạch",
                description: "Chuyển nhà, dọn về nhà mới",
                favorableDays: {
                    canchi: ["Giáp Tý", "Ất Sửu", "Bình Dần", "Đinh Mão", "Mậu Thìn", "Canh Ngọ", "Tân Mùi"],
                    lunar: [1, 2, 6, 8, 9, 12, 15, 18, 21, 24, 27],
                    constellation: ["Giác", "Phòng", "Vĩ", "Cơ", "Đẩu", "Thất", "Bích", "Lâu", "Vị", "Tỉnh", "Chẩn"]
                },
                unfavorableDays: {
                    canchi: ["Kỷ Tỵ", "Nhâm Thân", "Quý Dậu", "Đinh Hợi"],
                    lunar: [3, 5, 7, 11, 13, 14, 17, 19, 20, 23, 26, 29],
                    constellation: ["Cang", "Đê", "Tâm", "Ngưu", "Nữ", "Hư", "Nguy", "Khôi", "Mão", "Chủy", "Quỷ", "Liễu", "Tinh", "Dực", "Trương"]
                },
                elementCompatibility: {
                    favorable: ["Thổ", "Thủy"],
                    unfavorable: ["Mộc", "Hỏa"],
                    neutral: ["Kim"]
                },
                monthRules: {
                    bestMonths: [1, 2, 4, 5, 7, 8, 10, 11],
                    avoidMonths: [3, 6, 9, 12],
                    neutralMonths: []
                }
            },
            damCuoi: {
                name: "Đám cưới",
                description: "Lễ cưới, thành hôn",
                favorableDays: {
                    canchi: ["Giáp Tý", "Ất Sửu", "Bình Dần", "Đinh Mão", "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Tân Mùi"],
                    lunar: [2, 6, 8, 9, 12, 15, 16, 18, 21, 24, 27, 30],
                    constellation: ["Giác", "Phòng", "Vĩ", "Cơ", "Đẩu", "Thất", "Bích", "Lâu", "Vị", "Tỉnh", "Trương", "Chẩn"]
                },
                unfavorableDays: {
                    canchi: ["Nhâm Thân", "Quý Dậu", "Giáp Tuất", "Ất Hợi"],
                    lunar: [3, 5, 7, 13, 14, 17, 19, 22, 23, 26, 29],
                    constellation: ["Cang", "Đê", "Tâm", "Ngưu", "Nữ", "Hư", "Nguy", "Khôi", "Mão", "Chủy", "Quỷ", "Liễu", "Tinh", "Dực"]
                },
                elementCompatibility: {
                    favorable: ["Hỏa", "Thổ"],
                    unfavorable: ["Kim", "Thủy"],
                    neutral: ["Mộc"]
                },
                monthRules: {
                    bestMonths: [1, 2, 4, 5, 6, 8, 10, 11],
                    avoidMonths: [3, 7, 9, 12],
                    neutralMonths: []
                },
                genderRules: {
                    bride: {
                        avoidMonths: [], // Dựa trên tuổi cô dâu
                        favorableCanChi: ["Giáp Tý", "Ất Sửu", "Bình Dần", "Đinh Mão"]
                    },
                    groom: {
                        avoidMonths: [], // Dựa trên tuổi chú rể  
                        favorableCanChi: ["Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Tân Mùi"]
                    }
                }
            }
            // Có thể mở rộng thêm các sự kiện khác...
        };
    }

    // Ngày đặc biệt chi tiết
    initSpecialDays() {
        this.specialDays = {
            // Tết cổ truyền
            traditionalFestivals: {
                tetNguyen: { lunar: { month: 1, days: [1, 2, 3, 4, 5, 6, 7] }, score: 10, suitable: ["damCuoi", "thapHuong"] },
                tetHanThuc: { lunar: { month: 3, days: [3] }, score: -5, suitable: ["anTang"] },
                phatDan: { lunar: { month: 4, days: [8] }, score: 15, suitable: ["thapHuong", "lamPhuc"] },
                tetDoanNgo: { lunar: { month: 5, days: [5] }, score: 5, suitable: ["dongTho", "nhapTrach"] },
                thangCo: { lunar: { month: 7, days: [15, 16, 17] }, score: -10, suitable: ["anTang", "thapHuong"] },
                tetTrungThu: { lunar: { month: 8, days: [15] }, score: 8, suitable: ["damCuoi", "khaiTruong"] },
                tetTrungCuu: { lunar: { month: 9, days: [9] }, score: 5, suitable: ["dongTho", "khaiTruong"] }
            },
            
            // Ngày âm dương 
            lunarPhases: {
                soc: { days: [1, 30], score: 5, suitable: ["dongTho", "khaiTruong"] },
                thuongNguyen: { days: [8], score: 8, suitable: ["thapHuong", "lamPhuc"] },
                rangMuoi: { days: [15], score: 10, suitable: ["damCuoi", "khaiTruong", "thapHuong"] },
                haHuyen: { days: [23], score: -3, suitable: [] }
            },

            // 24 tiết khí
            solarTerms: {
                xuanPhan: { score: 15, suitable: ["dongTho", "khaiTruong", "damCuoi"] },
                thanMinh: { score: -5, suitable: ["anTang", "taoMo"] },
                haThi: { score: 10, suitable: ["dongTho", "nhapTrach"] },
                dongChi: { score: -8, suitable: ["anTang"] },
                tieuHan: { score: -5, suitable: [] },
                daiHan: { score: -8, suitable: [] }
            }
        };
    }

    // Ngày xấu chi tiết theo nhiều hệ thống
    initBadLuckDays() {
        this.badLuckDays = {
            // Hệ thống Tam Niang Sát
            tamNiangSat: {
                days: [3, 7, 13, 18, 22, 27], // Trong tháng
                description: "Tam Niang Sát - ngày rất xấu cho mọi việc",
                score: -20
            },
            
            // Hệ thống Dương Công Kỵ Nhật
            duongCongKyNhat: {
                days: [1, 5, 6, 12, 14, 15, 23, 24, 25, 26, 27, 28, 29, 30],
                description: "Dương Công Kỵ Nhật - tránh làm việc quan trọng",
                score: -15
            },

            // Hệ thống Âm Phủ Kỵ Nhật  
            amPhuKyNhat: {
                days: [2, 4, 8, 10, 16, 17, 19, 20, 21, 22],
                description: "Âm Phủ Kỵ Nhật - ngày âm khí nặng",
                score: -12
            },

            // Hệ thống Tứ Ly Tứ Tuyệt
            tuLyTuTuyet: {
                description: "Tứ Ly Tứ Tuyệt - ngày giao mùa không tốt",
                dates: [], // Tính toán động dựa trên 24 tiết khí
                score: -18
            },

            // Ngày Hoang, Phá, Đại Hao
            specialBadDays: {
                hoang: { days: [7, 16, 25], score: -10, description: "Ngày Hoang - tránh khởi công" },
                pha: { days: [4, 13, 22], score: -15, description: "Ngày Phá - phá hoại mọi việc" },
                daiHao: { days: [6, 15, 24], score: -12, description: "Ngày Đại Hao - tiêu hao tài lộc" }
            }
        };
    }

    // Hệ thống tính cách cá nhân (dựa trên năm sinh, giới tính)
    initPersonalitySystem() {
        this.personalitySystem = {
            // Hệ thống Bát Tự (simplified)
            birthYearElements: {
                // Mỗi năm có một mệnh chính và phụ
                elements: this.generateBirthYearElements(),
                compatibility: this.generateElementCompatibilityMatrix()
            },
            
            // Hệ thống Cung Mệnh (9 cung số)
            destinyPalace: this.generateDestinyPalaces(),
            
            // Tuổi và giới tính
            ageGenderRules: {
                male: {
                    favorableAges: [25, 30, 35, 40, 45, 50, 55, 60],
                    unfavorableAges: [19, 29, 39, 49, 59]
                },
                female: {
                    favorableAges: [24, 28, 32, 36, 40, 44, 48, 52],
                    unfavorableAges: [18, 27, 36, 45, 54]
                }
            }
        };
    }

    // Hệ thống hướng (8 hướng + trung ương)
    initDirectionalSystem() {
        this.directionalSystem = {
            directions: {
                north: { element: "Thủy", color: "Đen", number: 1 },
                northeast: { element: "Thổ", color: "Vàng", number: 8 },
                east: { element: "Mộc", color: "Xanh lá", number: 3 },
                southeast: { element: "Mộc", color: "Xanh lục", number: 4 },
                south: { element: "Hỏa", color: "Đỏ", number: 9 },
                southwest: { element: "Thổ", color: "Vàng đất", number: 2 },
                west: { element: "Kim", color: "Trắng", number: 7 },
                northwest: { element: "Kim", color: "Bạc", number: 6 },
                center: { element: "Thổ", color: "Vàng", number: 5 }
            },
            
            // Hướng tốt theo năm sinh
            yearlyDirections: this.generateYearlyDirections()
        };
    }

    // Hệ thống thời gian trong ngày (12 giờ)
    initTimeSystem() {
        this.timeSystem = {
            hours: {
                ty: { time: "23:00-01:00", element: "Thủy", good: ["rest", "meditation"] },
                suu: { time: "01:00-03:00", element: "Thổ", good: ["study", "planning"] },
                dan: { time: "03:00-05:00", element: "Mộc", good: ["exercise", "start"] },
                mao: { time: "05:00-07:00", element: "Mộc", good: ["work", "study"] },
                thin: { time: "07:00-09:00", element: "Thổ", good: ["business", "meeting"] },
                ty2: { time: "09:00-11:00", element: "Hỏa", good: ["important work"] },
                ngo: { time: "11:00-13:00", element: "Hỏa", good: ["ceremony", "celebration"] },
                mui: { time: "13:00-15:00", element: "Thổ", good: ["rest", "light work"] },
                than: { time: "15:00-17:00", element: "Kim", good: ["business", "negotiation"] },
                dau: { time: "17:00-19:00", element: "Kim", good: ["social", "entertainment"] },
                tuat: { time: "19:00-21:00", element: "Thổ", good: ["family", "rest"] },
                hoi: { time: "21:00-23:00", element: "Thủy", good: ["rest", "sleep"] }
            }
        };
    }

    // Hệ thống màu sắc
    initColorSystem() {
        this.colorSystem = {
            elementColors: {
                "Mộc": ["Xanh lá", "Xanh lục", "Xanh ngọc"],
                "Hỏa": ["Đỏ", "Cam", "Hồng", "Tím"],
                "Thổ": ["Vàng", "Nâu", "Be", "Màu đất"],
                "Kim": ["Trắng", "Bạc", "Xám", "Vàng kim"],
                "Thủy": ["Đen", "Xanh dương", "Xanh navy"]
            },
            
            // Màu may mắn theo năm sinh
            luckyColors: this.generateLuckyColors()
        };
    }

    // Generate helper functions
    generateBirthYearElements() {
        const elements = {};
        for (let year = 1900; year <= 2100; year++) {
            const heavenlyIndex = (year - 4) % 10;
            const earthlyIndex = (year - 4) % 12;
            
            elements[year] = {
                heavenly: this.lunarCalendar.heavenlyStemElements[heavenlyIndex],
                earthly: this.lunarCalendar.earthlyBranchElements[earthlyIndex],
                primary: this.lunarCalendar.heavenlyStemElements[heavenlyIndex]
            };
        }
        return elements;
    }

    generateElementCompatibilityMatrix() {
        return {
            "Mộc": { 
                veryGood: ["Thủy"], 
                good: ["Mộc"], 
                neutral: [], 
                bad: ["Kim"], 
                veryBad: ["Thổ"] 
            },
            "Hỏa": { 
                veryGood: ["Mộc"], 
                good: ["Hỏa"], 
                neutral: ["Thổ"], 
                bad: ["Thủy"], 
                veryBad: ["Kim"] 
            },
            "Thổ": { 
                veryGood: ["Hỏa"], 
                good: ["Thổ"], 
                neutral: ["Kim"], 
                bad: ["Mộc"], 
                veryBad: ["Thủy"] 
            },
            "Kim": { 
                veryGood: ["Thổ"], 
                good: ["Kim"], 
                neutral: ["Thủy"], 
                bad: ["Hỏa"], 
                veryBad: ["Mộc"] 
            },
            "Thủy": { 
                veryGood: ["Kim"], 
                good: ["Thủy"], 
                neutral: ["Mộc"], 
                bad: ["Thổ"], 
                veryBad: ["Hỏa"] 
            }
        };
    }

    generateDestinyPalaces() {
        // Simplified 9-palace system
        return {
            1: { element: "Thủy", direction: "North", character: "Trí tuệ" },
            2: { element: "Thổ", direction: "Southwest", character: "Khoan dung" },
            3: { element: "Mộc", direction: "East", character: "Năng động" },
            4: { element: "Mộc", direction: "Southeast", character: "Linh hoạt" },
            5: { element: "Thổ", direction: "Center", character: "Ổn định" },
            6: { element: "Kim", direction: "Northwest", character: "Nghiêm túc" },
            7: { element: "Kim", direction: "West", character: "Sáng tạo" },
            8: { element: "Thổ", direction: "Northeast", character: "Kiên định" },
            9: { element: "Hỏa", direction: "South", character: "Nhiệt huyết" }
        };
    }

    generateYearlyDirections() {
        const directions = {};
        for (let year = 1900; year <= 2100; year++) {
            const index = (year - 4) % 12;
            const directionMap = ["North", "Northeast", "East", "Southeast", "South", "Southwest", 
                                 "West", "Northwest", "North", "Northeast", "East", "Southeast"];
            directions[year] = {
                favorable: [directionMap[index], directionMap[(index + 4) % 8]],
                unfavorable: [directionMap[(index + 2) % 8], directionMap[(index + 6) % 8]]
            };
        }
        return directions;
    }

    generateLuckyColors() {
        const colors = {};
        for (let year = 1900; year <= 2100; year++) {
            const element = this.generateBirthYearElements()[year]?.primary;
            if (element) {
                colors[year] = this.colorSystem?.elementColors[element] || [];
            }
        }
        return colors;
    }

    // Tính điểm số nâng cao
    calculateAdvancedDayScore(solarDate, lunarInfo, eventType, personalInfo) {
        let score = 50; // Điểm cơ bản
        const rules = this.eventRules[eventType];
        
        if (!rules) return score;

        // 1. Kiểm tra can chi của ngày
        const dayCanChi = lunarInfo.canChi.day.canChi;
        if (rules.favorableDays.canchi.includes(dayCanChi)) {
            score += 25;
        } else if (rules.unfavorableDays.canchi.includes(dayCanChi)) {
            score -= 25;
        }

        // 2. Kiểm tra ngày âm lịch
        if (rules.favorableDays.lunar.includes(lunarInfo.lunar.day)) {
            score += 15;
        } else if (rules.unfavorableDays.lunar.includes(lunarInfo.lunar.day)) {
            score -= 15;
        }

        // 3. Kiểm tra 28 su (constellation)
        if (rules.favorableDays.constellation.includes(lunarInfo.constellation.name)) {
            score += 20;
        } else if (rules.unfavorableDays.constellation.includes(lunarInfo.constellation.name)) {
            score -= 20;
        }

        // 4. Kiểm tra tương sinh tương khắc ngũ hành
        const personElement = this.personalitySystem.birthYearElements[personalInfo.birthYear]?.primary;
        const dayElement = lunarInfo.elements.dayElement;
        
        if (personElement && dayElement) {
            const compatibility = lunarInfo.elements.compatibility;
            switch (compatibility) {
                case "generates": score += 15; break;
                case "generatedBy": score += 10; break;
                case "same": score += 5; break;
                case "destroys": score -= 15; break;
                case "destroyedBy": score -= 10; break;
            }
        }

        // 5. Kiểm tra tháng âm lịch
        if (rules.monthRules.bestMonths.includes(lunarInfo.lunar.month)) {
            score += 10;
        } else if (rules.monthRules.avoidMonths.includes(lunarInfo.lunar.month)) {
            score -= 10;
        }

        // 6. Kiểm tra các ngày đặc biệt
        score += this.checkSpecialDays(lunarInfo);

        // 7. Kiểm tra các ngày xấu
        score += this.checkBadLuckDays(lunarInfo);

        // 8. Kiểm tra tuổi và giới tính
        const age = this.calculateAge(personalInfo.birthYear, solarDate.getFullYear());
        score += this.checkAgeGenderCompatibility(age, personalInfo.gender, eventType);

        // 9. Kiểm tra cung mệnh
        const destinyPalace = this.calculateDestinyPalace(personalInfo.birthYear, personalInfo.gender);
        score += this.checkDestinyPalaceCompatibility(destinyPalace, lunarInfo, eventType);

        // 10. Bonus cho các yếu tố đặc biệt
        score += this.calculateBonusScore(lunarInfo, personalInfo, eventType);

        // Giới hạn điểm số 0-100
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    // Kiểm tra ngày đặc biệt
    checkSpecialDays(lunarInfo) {
        let bonus = 0;
        
        // Kiểm tra lễ hội truyền thống
        Object.values(this.specialDays.traditionalFestivals).forEach(festival => {
            if (festival.lunar.month === lunarInfo.lunar.month &&
                festival.lunar.days.includes(lunarInfo.lunar.day)) {
                bonus += festival.score;
            }
        });

        // Kiểm tra pha mặt trăng
        Object.values(this.specialDays.lunarPhases).forEach(phase => {
            if (phase.days.includes(lunarInfo.lunar.day)) {
                bonus += phase.score;
            }
        });

        return bonus;
    }

    // Kiểm tra ngày xấu
    checkBadLuckDays(lunarInfo) {
        let penalty = 0;
        
        // Tam Niang Sát
        if (this.badLuckDays.tamNiangSat.days.includes(lunarInfo.lunar.day)) {
            penalty += this.badLuckDays.tamNiangSat.score;
        }

        // Dương Công Kỵ Nhật
        if (this.badLuckDays.duongCongKyNhat.days.includes(lunarInfo.lunar.day)) {
            penalty += this.badLuckDays.duongCongKyNhat.score;
        }

        // Âm Phủ Kỵ Nhật
        if (this.badLuckDays.amPhuKyNhat.days.includes(lunarInfo.lunar.day)) {
            penalty += this.badLuckDays.amPhuKyNhat.score;
        }

        // Ngày Hoang, Phá, Đại Hao
        Object.values(this.badLuckDays.specialBadDays).forEach(badDay => {
            if (badDay.days.includes(lunarInfo.lunar.day)) {
                penalty += badDay.score;
            }
        });

        return penalty;
    }

    // Kiểm tra tuổi và giới tính
    checkAgeGenderCompatibility(age, gender, eventType) {
        let bonus = 0;
        const genderRules = this.personalitySystem.ageGenderRules[gender];
        
        if (genderRules) {
            if (genderRules.favorableAges.includes(age)) {
                bonus += 8;
            } else if (genderRules.unfavorableAges.includes(age)) {
                bonus -= 8;
            }
        }

        return bonus;
    }

    // Tính cung mệnh
    calculateDestinyPalace(birthYear, gender) {
        // Simplified calculation
        const base = gender === 'male' ? 10 : 5;
        return ((base - (birthYear % 9)) % 9) + 1;
    }

    // Kiểm tra tương thích cung mệnh
    checkDestinyPalaceCompatibility(destinyPalace, lunarInfo, eventType) {
        const palace = this.personalitySystem.destinyPalace[destinyPalace];
        if (!palace) return 0;

        let bonus = 0;
        
        // Kiểm tra tương thích ngũ hành
        const palaceElement = palace.element;
        const dayElement = lunarInfo.elements.dayElement;
        
        const compatibility = this.lunarCalendar.getElementCompatibility(palaceElement, dayElement);
        switch (compatibility) {
            case "generates": bonus += 5; break;
            case "generatedBy": bonus += 3; break;
            case "same": bonus += 2; break;
            case "destroys": bonus -= 5; break;
            case "destroyedBy": bonus -= 3; break;
        }

        return bonus;
    }

    // Tính điểm bonus đặc biệt
    calculateBonusScore(lunarInfo, personalInfo, eventType) {
        let bonus = 0;

        // Bonus cho ngày đẹp trong tuần
        const solarDate = new Date(lunarInfo.solar.year, lunarInfo.solar.month - 1, lunarInfo.solar.day);
        const weekday = solarDate.getDay();
        
        // Thứ 2, 4, 6 tốt cho khởi công
        if (eventType === 'dongTho' && [1, 3, 5].includes(weekday)) {
            bonus += 3;
        }
        
        // Thứ 6, 7, CN tốt cho đám cưới
        if (eventType === 'damCuoi' && [5, 6, 0].includes(weekday)) {
            bonus += 5;
        }

        // Bonus cho ngày có số đẹp
        if ([6, 8, 9].includes(lunarInfo.lunar.day % 10)) {
            bonus += 2;
        }

        // Penalty cho ngày có số xấu
        if ([4, 7].includes(lunarInfo.lunar.day % 10)) {
            bonus -= 2;
        }

        return bonus;
    }

    // Tính tuổi
    calculateAge(birthYear, currentYear) {
        return currentYear - birthYear + 1;
    }

    // Tìm ngày tốt nâng cao
    findAdvancedGoodDays(fromMonth, fromYear, eventType, personalInfo, daysToCheck = 90) {
        const results = [];
        const startDate = new Date(fromYear, fromMonth - 1, 1);
        
        for (let i = 0; i < daysToCheck; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            try {
                const lunarInfo = this.lunarCalendar.getCompleteLunarInfo(
                    currentDate.getDate(),
                    currentDate.getMonth() + 1,
                    currentDate.getFullYear()
                );
                
                const score = this.calculateAdvancedDayScore(currentDate, lunarInfo, eventType, personalInfo);
                const description = this.getAdvancedDayDescription(score, eventType, lunarInfo);
                const recommendations = this.getDetailedRecommendations(lunarInfo, personalInfo, eventType);
                
                results.push({
                    solarDate: {
                        day: currentDate.getDate(),
                        month: currentDate.getMonth() + 1,
                        year: currentDate.getFullYear(),
                        weekday: currentDate.toLocaleDateString('vi-VN', { weekday: 'long' }),
                        date: currentDate
                    },
                    lunarInfo: lunarInfo,
                    score: score,
                    quality: description.quality,
                    advice: description.advice,
                    category: this.getScoreCategory(score),
                    recommendations: recommendations,
                    analysis: this.getDetailedAnalysis(lunarInfo, personalInfo, eventType, score)
                });
            } catch (error) {
                console.warn(`Error calculating for ${currentDate.toDateString()}:`, error);
            }
        }
        
        // Sắp xếp theo điểm số giảm dần
        results.sort((a, b) => b.score - a.score);
        
        return results;
    }

    // Mô tả chi tiết về ngày
    getAdvancedDayDescription(score, eventType, lunarInfo) {
        const eventNames = {
            dongTho: "động thổ",
            khaiTruong: "khai trương", 
            nhapTrach: "nhập trạch",
            khoiHanh: "khởi hành",
            damCuoi: "đám cưới",
            anTang: "an táng"
        };

        let quality, advice;
        
        if (score >= 85) {
            quality = "Đại cát";
            advice = `Ngày đại cát cho việc ${eventNames[eventType]}. Rất tốt để thực hiện.`;
        } else if (score >= 75) {
            quality = "Rất tốt";
            advice = `Ngày rất tốt cho việc ${eventNames[eventType]}. Nên thực hiện.`;
        } else if (score >= 65) {
            quality = "Tốt";
            advice = `Ngày tốt cho việc ${eventNames[eventType]}. Có thể thực hiện.`;
        } else if (score >= 50) {
            quality = "Bình thường";
            advice = `Ngày bình thường cho việc ${eventNames[eventType]}. Cân nhắc kỹ.`;
        } else if (score >= 35) {
            quality = "Không tốt";
            advice = `Ngày không tốt cho việc ${eventNames[eventType]}. Nên tránh.`;
        } else {
            quality = "Đại hung";
            advice = `Ngày đại hung cho việc ${eventNames[eventType]}. Tuyệt đối tránh.`;
        }

        return { quality, advice };
    }

    // Đưa ra khuyến nghị chi tiết
    getDetailedRecommendations(lunarInfo, personalInfo, eventType) {
        const recommendations = {
            time: [],
            direction: [],
            color: [],
            items: [],
            precautions: []
        };

        // Khuyến nghị về thời gian
        const favorableHours = this.eventRules[eventType]?.timeRules?.bestHours || [];
        if (favorableHours.length > 0) {
            recommendations.time.push(`Nên thực hiện vào giờ: ${favorableHours.join(', ')}`);
        }

        // Khuyến nghị về hướng
        const yearDirections = this.directionalSystem.yearlyDirections[personalInfo.birthYear];
        if (yearDirections) {
            recommendations.direction.push(`Hướng tốt: ${yearDirections.favorable.join(', ')}`);
            recommendations.direction.push(`Tránh hướng: ${yearDirections.unfavorable.join(', ')}`);
        }

        // Khuyến nghị về màu sắc
        const luckyColors = this.colorSystem.luckyColors[personalInfo.birthYear];
        if (luckyColors && luckyColors.length > 0) {
            recommendations.color.push(`Màu may mắn: ${luckyColors.join(', ')}`);
        }

        // Khuyến nghị về vật phẩm và lưu ý
        if (eventType === 'damCuoi') {
            recommendations.items.push("Nên chuẩn bị: hoa sen, nến đỏ, bánh kẹo");
            recommendations.precautions.push("Tránh mặc màu đen hoặc trắng");
        } else if (eventType === 'dongTho') {
            recommendations.items.push("Nên chuẩn bị: hương, cúng lễ, rượu");
            recommendations.precautions.push("Tránh làm việc vào giờ xấu");
        }

        return recommendations;
    }

    // Phân tích chi tiết
    getDetailedAnalysis(lunarInfo, personalInfo, eventType, score) {
        const analysis = {
            strengths: [],
            weaknesses: [],
            personalFit: "",
            overallAssessment: ""
        };

        // Điểm mạnh
        if (lunarInfo.constellation.lucky) {
            analysis.strengths.push(`28 su "${lunarInfo.constellation.name}" thuộc nhóm tốt`);
        }

        if (lunarInfo.elements.compatibility === "generates") {
            analysis.strengths.push("Ngũ hành tương sinh với mệnh chủ");
        }

        // Điểm yếu
        if (this.badLuckDays.tamNiangSat.days.includes(lunarInfo.lunar.day)) {
            analysis.weaknesses.push("Ngày Tam Niang Sát - cần thận trọng");
        }

        // Đánh giá cá nhân
        const personalElement = this.personalitySystem.birthYearElements[personalInfo.birthYear]?.primary;
        analysis.personalFit = `Mệnh ${personalElement} ${lunarInfo.elements.compatibility === "generates" ? "tương hợp" : "cần cân nhắc"} với ngày này`;

        // Đánh giá tổng thể
        if (score >= 75) {
            analysis.overallAssessment = "Ngày rất tốt, nên thực hiện";
        } else if (score >= 50) {
            analysis.overallAssessment = "Ngày khá tốt, có thể thực hiện";
        } else {
            analysis.overallAssessment = "Ngày không tốt, nên tránh";
        }

        return analysis;
    }

    // Phân loại điểm số
    getScoreCategory(score) {
        if (score >= 75) return 'excellent';
        if (score >= 65) return 'good';
        if (score >= 50) return 'neutral';
        if (score >= 35) return 'bad';
        return 'terrible';
    }

    // Lấy thống kê chi tiết
    getAdvancedSummaryStats(results) {
        const excellent = results.filter(r => r.category === 'excellent').length;
        const good = results.filter(r => r.category === 'good').length;
        const neutral = results.filter(r => r.category === 'neutral').length;
        const bad = results.filter(r => r.category === 'bad').length;
        const terrible = results.filter(r => r.category === 'terrible').length;
        
        const bestDay = results[0];
        const averageScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
        
        return {
            total: results.length,
            excellent: excellent,
            good: good,
            neutral: neutral,
            bad: bad,
            terrible: terrible,
            bestDay: bestDay,
            averageScore: Math.round(averageScore),
            recommendation: this.getOverallRecommendation(excellent, good, neutral, bad, terrible)
        };
    }

    // Đưa ra khuyến nghị tổng thể
    getOverallRecommendation(excellent, good, neutral, bad, terrible) {
        const total = excellent + good + neutral + bad + terrible;
        const goodRatio = (excellent + good) / total;
        
        if (goodRatio >= 0.7) {
            return "Thời gian này rất thuận lợi cho sự kiện của bạn";
        } else if (goodRatio >= 0.5) {
            return "Thời gian này khá tốt, có nhiều ngày thuận lợi";
        } else if (goodRatio >= 0.3) {
            return "Thời gian này bình thường, nên chọn kỹ ngày tốt";
        } else {
            return "Thời gian này không thuận lợi, nên cân nhắc dời sang thời điểm khác";
        }
    }
}