// Advanced Features Module - Các tính năng nâng cao
// Bao gồm: giờ tốt, hướng xuất hành, màu sắc, đá phong thủy, lời khuyên chi tiết

class AdvancedFeaturesModule {
    constructor(lunarCalendar, goodDayCalculator) {
        this.lunarCalendar = lunarCalendar;
        this.goodDayCalculator = goodDayCalculator;
        this.initializeAdvancedData();
    }

    // Khởi tạo dữ liệu nâng cao
    initializeAdvancedData() {
        this.hourSystem = this.initHourSystem();
        this.directionSystem = this.initDirectionSystem();
        this.gemstoneSystem = this.initGemstoneSystem();
        this.numberSystem = this.initNumberSystem();
        this.animalCompatibility = this.initAnimalCompatibility();
    }

    // Hệ thống 12 giờ chi tiết
    initHourSystem() {
        return {
            "Tý": {
                time: "23:00-01:00",
                element: "Thủy",
                description: "Giờ Tý - thời điểm âm khí mạnh",
                goodFor: ["nghỉ ngơi", "thiền định", "học tập"],
                badFor: ["khai trương", "cưới hỏi", "động thổ"],
                energy: "yin",
                score: {
                    dongTho: -5, khaiTruong: -8, damCuoi: -10, nhapTrach: 5,
                    khoiHanh: -3, anTang: 8, khamBenh: 3, kyHopDong: -2
                }
            },
            "Sửu": {
                time: "01:00-03:00", 
                element: "Thổ",
                description: "Giờ Sửu - thời điểm tĩnh lặng",
                goodFor: ["lập kế hoạch", "suy nghĩ", "chuẩn bị"],
                badFor: ["tiệc tùng", "ăn uống", "giao dịch"],
                energy: "yin",
                score: {
                    dongTho: 3, khaiTruong: -5, damCuoi: -8, nhapTrach: 8,
                    khoiHanh: -5, anTang: 10, khamBenh: 5, kyHopDong: 3
                }
            },
            "Dần": {
                time: "03:00-05:00",
                element: "Mộc", 
                description: "Giờ Dần - thời điểm sinh khí mạnh",
                goodFor: ["bắt đầu việc mới", "tập thể dục", "làm việc"],
                badFor: ["nghỉ ngơi", "ăn uống nhiều"],
                energy: "yang",
                score: {
                    dongTho: 15, khaiTruong: 12, damCuoi: 8, nhapTrach: 10,
                    khoiHanh: 15, anTang: -5, khamBenh: 8, kyHopDong: 10
                }
            },
            "Mão": {
                time: "05:00-07:00",
                element: "Mộc",
                description: "Giờ Mão - thời điểm mặt trời mọc",
                goodFor: ["làm việc quan trọng", "học tập", "giao tiếp"],
                badFor: ["an táng", "việc âm"],
                energy: "yang", 
                score: {
                    dongTho: 18, khaiTruong: 15, damCuoi: 12, nhapTrach: 15,
                    khoiHanh: 18, anTang: -8, khamBenh: 12, kyHopDong: 15
                }
            },
            "Thìn": {
                time: "07:00-09:00",
                element: "Thổ",
                description: "Giờ Thìn - thời điểm vàng của ngày",
                goodFor: ["giao dịch", "hợp tác", "họp hành"],
                badFor: ["tranh cãi", "quyết định vội vàng"],
                energy: "yang",
                score: {
                    dongTho: 20, khaiTruong: 18, damCuoi: 15, nhapTrach: 12,
                    khoiHanh: 15, anTang: -3, khamBenh: 15, kyHopDong: 20
                }
            },
            "Tỵ": {
                time: "09:00-11:00",
                element: "Hỏa",
                description: "Giờ Tỵ - thời điểm năng lượng cao",
                goodFor: ["công việc quan trọng", "ra quyết định"],
                badFor: ["nghỉ ngơi", "việc cần tĩnh lặng"],
                energy: "yang",
                score: {
                    dongTho: 15, khaiTruong: 20, damCuoi: 18, nhapTrach: 8,
                    khoiHanh: 12, anTang: -5, khamBenh: 10, kyHopDong: 18
                }
            },
            "Ngọ": {
                time: "11:00-13:00",
                element: "Hỏa",
                description: "Giờ Ngọ - thời điểm đỉnh cao của ngày",
                goodFor: ["lễ cưới", "khai trương", "ký kết"],
                badFor: ["an táng", "điều trị"],
                energy: "yang",
                score: {
                    dongTho: 12, khaiTruong: 25, damCuoi: 25, nhapTrach: 5,
                    khoiHanh: 8, anTang: -10, khamBenh: 5, kyHopDong: 20
                }
            },
            "Mùi": {
                time: "13:00-15:00",
                element: "Thổ",
                description: "Giờ Mùi - thời điểm nghỉ ngơi",
                goodFor: ["ăn uống", "nghỉ ngơi", "giao lưu"],
                badFor: ["công việc quan trọng", "quyết định lớn"],
                energy: "yin",
                score: {
                    dongTho: 5, khaiTruong: 8, damCuoi: 12, nhapTrach: 10,
                    khoiHanh: -3, anTang: 5, khamBenh: 8, kyHopDong: 5
                }
            },
            "Thân": {
                time: "15:00-17:00",
                element: "Kim",
                description: "Giờ Thân - thời điểm làm việc trở lại",
                goodFor: ["kinh doanh", "đàm phán", "giao dịch"],
                badFor: ["động thổ", "việc cần yên tĩnh"],
                energy: "yang",
                score: {
                    dongTho: 8, khaiTruong: 18, damCuoi: 10, nhapTrach: 8,
                    khoiHanh: 12, anTang: 3, khamBenh: 12, kyHopDong: 18
                }
            },
            "Dậu": {
                time: "17:00-19:00",
                element: "Kim",
                description: "Giờ Dậu - thời điểm kết thúc công việc",
                goodFor: ["giải trí", "giao lưu", "tổng kết"],
                badFor: ["bắt đầu việc mới", "đầu tư lớn"],
                energy: "yin",
                score: {
                    dongTho: 3, khaiTruong: 12, damCuoi: 15, nhapTrach: 12,
                    khoiHanh: 5, anTang: 8, khamBenh: 8, kyHopDong: 10
                }
            },
            "Tuất": {
                time: "19:00-21:00",
                element: "Thổ",
                description: "Giờ Tuất - thời điểm gia đình",
                goodFor: ["sum họp gia đình", "ăn tối", "nghỉ ngơi"],
                badFor: ["công việc căng thẳng", "ra quyết định quan trọng"],
                energy: "yin",
                score: {
                    dongTho: -3, khaiTruong: 5, damCuoi: 18, nhapTrach: 15,
                    khoiHanh: -5, anTang: 10, khamBenh: 5, kyHopDong: 3
                }
            },
            "Hợi": {
                time: "21:00-23:00",
                element: "Thủy",
                description: "Giờ Hợi - thời điểm nghỉ ngơi",
                goodFor: ["nghỉ ngơi", "thiền định", "đọc sách"],
                badFor: ["tiệc tùng", "công việc căng thẳng"],
                energy: "yin",
                score: {
                    dongTho: -5, khaiTruong: -3, damCuoi: 8, nhapTrach: 12,
                    khoiHanh: -8, anTang: 12, khamBenh: 3, kyHopDong: -3
                }
            }
        };
    }

    // Hệ thống 8 hướng chi tiết
    initDirectionSystem() {
        return {
            directions: {
                "Bắc": {
                    element: "Thủy",
                    colors: ["Đen", "Xanh dương"],
                    numbers: [1, 6],
                    description: "Hướng Bắc - thuộc Thủy, chủ về trí tuệ, sự nghiệp",
                    goodFor: ["học tập", "làm việc", "suy nghĩ"],
                    season: "Đông"
                },
                "Đông Bắc": {
                    element: "Thổ",
                    colors: ["Vàng", "Nâu"],  
                    numbers: [2, 8],
                    description: "Hướng Đông Bắc - thuộc Thổ, chủ về sự thay đổi",
                    goodFor: ["chuyển đổi", "học hỏi", "phát triển"],
                    season: "Cuối đông"
                },
                "Đông": {
                    element: "Mộc",
                    colors: ["Xanh lá", "Xanh lục"],
                    numbers: [3, 4], 
                    description: "Hướng Đông - thuộc Mộc, chủ về sự phát triển",
                    goodFor: ["bắt đầu", "phát triển", "sáng tạo"],
                    season: "Xuân"
                },
                "Đông Nam": {
                    element: "Mộc",
                    colors: ["Xanh nhạt", "Xanh biển"],
                    numbers: [4, 9],
                    description: "Hướng Đông Nam - thuộc Mộc, chủ về tài lộc",
                    goodFor: ["kinh doanh", "tài chính", "giao dịch"],
                    season: "Muời xuân"
                },
                "Nam": {
                    element: "Hỏa", 
                    colors: ["Đỏ", "Cam", "Tím"],
                    numbers: [9, 5],
                    description: "Hướng Nam - thuộc Hỏa, chủ về danh tiếng",
                    goodFor: ["nổi tiếng", "thể hiện", "lãnh đạo"],
                    season: "Hè"
                },
                "Tây Nam": {
                    element: "Thổ",
                    colors: ["Vàng đất", "Nâu đỏ"],
                    numbers: [2, 5],
                    description: "Hướng Tây Nam - thuộc Thổ, chủ về tình cảm",
                    goodFor: ["tình yêu", "hôn nhân", "gia đình"],
                    season: "Cuối hè"
                },
                "Tây": {
                    element: "Kim",
                    colors: ["Trắng", "Bạc", "Vàng"],
                    numbers: [6, 7],
                    description: "Hướng Tây - thuộc Kim, chủ về con cái",
                    goodFor: ["con cái", "sáng tạo", "giải trí"],
                    season: "Thu"
                },
                "Tây Bắc": {
                    element: "Kim", 
                    colors: ["Trắng", "Xám", "Vàng kim"],
                    numbers: [6, 1],
                    description: "Hướng Tây Bắc - thuộc Kim, chủ về người giúp đỡ",
                    goodFor: ["hỗ trợ", "hợp tác", "lãnh đạo"],
                    season: "Cuối thu"
                }
            },
            
            // Hướng tốt theo năm sinh
            yearlyBestDirections: this.generateYearlyDirections(),
            
            // Hướng tốt theo từng sự kiện
            eventDirections: {
                dongTho: ["Đông", "Đông Nam", "Nam"],
                khaiTruong: ["Đông Nam", "Nam", "Tây Nam"],
                damCuoi: ["Đông", "Nam", "Tây Nam"],
                nhapTrach: ["Bắc", "Đông Bắc", "Đông"],
                khoiHanh: ["Đông", "Đông Nam", "Nam", "Tây"],
                anTang: ["Tây", "Tây Bắc", "Bắc"]
            }
        };
    }

    // Hệ thống đá quý và trang sức phong thủy
    initGemstoneSystem() {
        return {
            elementStones: {
                "Mộc": {
                    primary: ["Ngọc bích", "Aventurine xanh", "Malachite"],
                    secondary: ["Peridot", "Emerald", "Jade xanh"],
                    effects: ["Tăng sức khỏe", "Phát triển sự nghiệp", "Cân bằng cảm xúc"]
                },
                "Hỏa": {
                    primary: ["Ruby", "Garnet", "Carnelian"],
                    secondary: ["Citrine", "Sunstone", "Fire Opal"],
                    effects: ["Tăng năng lượng", "Kích hoạt sự sáng tạo", "Mang lại danh tiếng"]
                },
                "Thổ": {
                    primary: ["Thạch anh vàng", "Tiger Eye", "Jasper vàng"],
                    secondary: ["Amber", "Topaz vàng", "Agate vàng"],
                    effects: ["Ổn định tài chính", "Tăng sự tự tin", "Bảo vệ sức khỏe"]
                },
                "Kim": {
                    primary: ["Thạch anh trắng", "Moonstone", "Pearl"],
                    secondary: ["Diamond", "Selenite", "Howlite"],
                    effects: ["Thanh lọc năng lượng", "Tăng trực giác", "Cải thiện giao tiếp"]
                },
                "Thủy": {
                    primary: ["Sapphire xanh", "Lapis Lazuli", "Aquamarine"],
                    secondary: ["Sodalite", "Blue Topaz", "Larimar"],
                    effects: ["Tăng trí tuệ", "Cải thiện trực giác", "Mang lại may mắn"]
                }
            },
            
            // Đá theo cung hoàng đạo Việt Nam (12 con giáp)
            zodiacStones: {
                "Chuột": ["Garnet", "Onyx", "Thạch anh đen"],
                "Trâu": ["Emerald", "Rose Quartz", "Jade"],
                "Hổ": ["Tiger Eye", "Amber", "Citrine"],
                "Mèo": ["Jade", "Aventurine", "Moonstone"],
                "Rồng": ["Amethyst", "Lapis Lazuli", "Dragon Blood Stone"],
                "Rắn": ["Carnelian", "Fire Agate", "Ruby"],
                "Ngựa": ["Peridot", "Turquoise", "Adventurine"],
                "Dê": ["Sapphire", "Pearl", "Selenite"],
                "Khỉ": ["Citrine", "Topaz", "Sunstone"],
                "Gà": ["Ruby", "Garnet", "Red Jasper"],
                "Chó": ["Lapis Lazuli", "Sodalite", "Blue Lace Agate"],
                "Lợn": ["Amethyst", "Fluorite", "Labradorite"]
            }
        };
    }

    // Hệ thống số học phong thủy
    initNumberSystem() {
        return {
            luckyNumbers: {
                1: { element: "Thủy", meaning: "Khởi đầu, độc립", colors: ["Đen", "Xanh dương"] },
                2: { element: "Thổ", meaning: "Hợp tác, cân bằng", colors: ["Vàng", "Nâu"] },
                3: { element: "Mộc", meaning: "Sáng tạo, phát triển", colors: ["Xanh lá"] },
                4: { element: "Mộc", meaning: "Ổn định, thực tế", colors: ["Xanh lục"] },
                5: { element: "Thổ", meaning: "Trung tâm, cân bằng", colors: ["Vàng"] },
                6: { element: "Kim", meaning: "Trách nhiệm, gia đình", colors: ["Trắng", "Vàng"] },
                7: { element: "Kim", meaning: "Tinh thần, trực giác", colors: ["Bạc", "Trắng"] },  
                8: { element: "Thổ", meaning: "Thành công, quyền lực", colors: ["Vàng", "Đỏ"] },
                9: { element: "Hỏa", meaning: "Hoàn thành, trí tuệ", colors: ["Đỏ", "Tím"] }
            },
            
            // Số xấu cần tránh
            unluckyNumbers: [4], // Trong một số trường hợp
            
            // Tính số mệnh từ ngày sinh
            calculateLifePath: (day, month, year) => {
                const sum = day + month + year;
                return this.reduceToSingleDigit(sum);
            }
        };
    }

    // Hệ thống tương hợp 12 con giáp
    initAnimalCompatibility() {
        return {
            compatibility: {
                "Chuột": { 
                    best: ["Rồng", "Khỉ", "Trâu"], 
                    good: ["Chuột", "Hổ"], 
                    bad: ["Ngựa", "Dê", "Gà"] 
                },
                "Trâu": { 
                    best: ["Rắn", "Gà", "Chuột"], 
                    good: ["Trâu", "Hợi"], 
                    bad: ["Dê", "Ngựa", "Chó"] 
                },
                "Hổ": { 
                    best: ["Ngựa", "Chó", "Hợi"], 
                    good: ["Hổ", "Rồng"], 
                    bad: ["Khỉ", "Rắn"] 
                },
                "Mèo": { 
                    best: ["Dê", "Hợi", "Chó"], 
                    good: ["Mèo", "Rồng"], 
                    bad: ["Gà", "Chuột", "Rồng"] 
                },
                "Rồng": { 
                    best: ["Chuột", "Khỉ", "Gà"], 
                    good: ["Rồng", "Hổ", "Rắn"], 
                    bad: ["Chó", "Mèo", "Rồng"] 
                },
                "Rắn": { 
                    best: ["Trâu", "Gà"], 
                    good: ["Rắn", "Rồng"], 
                    bad: ["Hợi", "Hổ", "Khỉ"] 
                },
                "Ngựa": { 
                    best: ["Hổ", "Chó", "Dê"], 
                    good: ["Ngựa", "Rồng"], 
                    bad: ["Chuột", "Trâu", "Mèo"] 
                },
                "Dê": { 
                    best: ["Mèo", "Hợi", "Ngựa"], 
                    good: ["Dê", "Khỉ"], 
                    bad: ["Trâu", "Chó", "Chuột"] 
                },
                "Khỉ": { 
                    best: ["Chuột", "Rồng"], 
                    good: ["Khỉ", "Dê", "Rắn"], 
                    bad: ["Hổ", "Hợi"] 
                },
                "Gà": { 
                    best: ["Trâu", "Rắn", "Rồng"], 
                    good: ["Gà"], 
                    bad: ["Mèo", "Chó", "Chuột"] 
                },
                "Chó": { 
                    best: ["Hổ", "Ngựa", "Mèo"], 
                    good: ["Chó", "Hợi"], 
                    bad: ["Rồng", "Dê", "Gà"] 
                },
                "Hợi": { 
                    best: ["Mèo", "Dê", "Hổ"], 
                    good: ["Chó", "Hợi"], 
                    bad: ["Rắn", "Khỉ", "Hợi"] 
                }
            }
        };
    }

    // Tạo hướng tốt theo năm sinh
    generateYearlyDirections() {
        const directions = {};
        const directionNames = ["Bắc", "Đông Bắc", "Đông", "Đông Nam", "Nam", "Tây Nam", "Tây", "Tây Bắc"];
        
        for (let year = 1900; year <= 2100; year++) {
            const index = (year - 4) % 8;
            directions[year] = {
                best: directionNames[index],
                good: [directionNames[(index + 2) % 8], directionNames[(index + 6) % 8]],
                avoid: directionNames[(index + 4) % 8]
            };
        }
        return directions;
    }

    // Rút gọn số về chữ số đơn
    reduceToSingleDigit(num) {
        while (num > 9) {
            num = Math.floor(num / 10) + (num % 10);
        }
        return num;
    }

    // Tính giờ tốt cho ngày
    calculateBestHours(lunarInfo, eventType, personalInfo) {
        const scores = {};
        
        Object.keys(this.hourSystem).forEach(hour => {
            const hourData = this.hourSystem[hour];
            let score = hourData.score[eventType] || 0;
            
            // Tương sinh tương khắc với mệnh
            const personElement = this.goodDayCalculator.personalitySystem.birthYearElements[personalInfo.birthYear]?.primary;
            if (personElement) {
                const compatibility = this.lunarCalendar.getElementCompatibility(personElement, hourData.element);
                switch (compatibility) {
                    case "generates": score += 5; break;
                    case "generatedBy": score += 3; break;
                    case "same": score += 2; break;
                    case "destroys": score -= 5; break;
                    case "destroyedBy": score -= 3; break;
                }
            }
            
            scores[hour] = score;
        });
        
        // Sắp xếp theo điểm số
        const sortedHours = Object.entries(scores).sort(([,a], [,b]) => b - a);
        
        return {
            best: sortedHours.slice(0, 3).map(([hour, score]) => ({
                hour,
                time: this.hourSystem[hour].time,
                score,
                description: this.hourSystem[hour].description
            })),
            avoid: sortedHours.slice(-3).map(([hour, score]) => ({
                hour,
                time: this.hourSystem[hour].time,
                score,
                description: this.hourSystem[hour].description
            }))
        };
    }

    // Tính hướng tốt cho sự kiện
    calculateBestDirections(eventType, personalInfo) {
        const eventDirections = this.directionSystem.eventDirections[eventType] || [];
        const yearlyDirections = this.directionSystem.yearlyBestDirections[personalInfo.birthYear];
        
        // Kết hợp hướng tốt cho sự kiện và năm sinh
        const recommendations = eventDirections.map(direction => {
            let score = 10; // Điểm cơ bản
            
            if (yearlyDirections?.best === direction) score += 15;
            else if (yearlyDirections?.good.includes(direction)) score += 8;
            else if (yearlyDirections?.avoid === direction) score -= 15;
            
            return {
                direction,
                score,
                description: this.directionSystem.directions[direction].description,
                element: this.directionSystem.directions[direction].element,
                colors: this.directionSystem.directions[direction].colors
            };
        });
        
        return recommendations.sort((a, b) => b.score - a.score);
    }

    // Tính màu sắc may mắn
    calculateLuckyColors(personalInfo, lunarInfo) {
        const personElement = this.goodDayCalculator.personalitySystem.birthYearElements[personalInfo.birthYear]?.primary;
        const dayElement = lunarInfo.elements.dayElement;
        
        const colors = {
            primary: [],
            secondary: [],
            avoid: []
        };
        
        // Màu của mệnh bản mệnh
        if (personElement && this.goodDayCalculator.colorSystem.elementColors[personElement]) {
            colors.primary = [...this.goodDayCalculator.colorSystem.elementColors[personElement]];
        }
        
        // Màu tương sinh
        const compatibility = this.lunarCalendar.getElementCompatibility(personElement, dayElement);
        if (compatibility === "generates" || compatibility === "generatedBy") {
            if (this.goodDayCalculator.colorSystem.elementColors[dayElement]) {
                colors.secondary = [...this.goodDayCalculator.colorSystem.elementColors[dayElement]];
            }
        }
        
        // Màu cần tránh (tương khắc)
        if (compatibility === "destroys" || compatibility === "destroyedBy") {
            if (this.goodDayCalculator.colorSystem.elementColors[dayElement]) {
                colors.avoid = [...this.goodDayCalculator.colorSystem.elementColors[dayElement]];
            }
        }
        
        return colors;
    }

    // Tính đá quý phù hợp
    calculateSuitableGemstones(personalInfo, lunarInfo) {
        const personElement = this.goodDayCalculator.personalitySystem.birthYearElements[personalInfo.birthYear]?.primary;
        const zodiac = this.lunarCalendar.zodiacAnimals[(personalInfo.birthYear - 4) % 12];
        
        const gemstones = {
            element: [],
            zodiac: [],
            day: []
        };
        
        // Đá theo mệnh
        if (personElement && this.gemstoneSystem.elementStones[personElement]) {
            gemstones.element = [
                ...this.gemstoneSystem.elementStones[personElement].primary,
                ...this.gemstoneSystem.elementStones[personElement].secondary
            ];
        }
        
        // Đá theo con giáp
        if (this.gemstoneSystem.zodiacStones[zodiac]) {
            gemstones.zodiac = [...this.gemstoneSystem.zodiacStones[zodiac]];
        }
        
        // Đá phù hợp với ngày
        const dayElement = lunarInfo.elements.dayElement;
        if (this.gemstoneSystem.elementStones[dayElement]) {
            gemstones.day = [
                ...this.gemstoneSystem.elementStones[dayElement].primary
            ];
        }
        
        return gemstones;
    }

    // Tính số may mắn
    calculateLuckyNumbers(personalInfo, lunarInfo) {
        const birthNumbers = this.numberSystem.calculateLifePath(
            personalInfo.birthDay || 1,
            personalInfo.birthMonth || 1, 
            personalInfo.birthYear
        );
        
        const dayNumber = this.reduceToSingleDigit(lunarInfo.lunar.day);
        const monthNumber = this.reduceToSingleDigit(lunarInfo.lunar.month);
        
        return {
            personal: birthNumbers,
            day: dayNumber,
            month: monthNumber,
            combination: this.reduceToSingleDigit(birthNumbers + dayNumber + monthNumber),
            meaning: this.numberSystem.luckyNumbers[birthNumbers]?.meaning || "Không xác định"
        };
    }

    // Kiểm tra tương hợp con giáp (cho đám cưới)
    checkZodiacCompatibility(groomYear, brideYear) {
        const groomZodiac = this.lunarCalendar.zodiacAnimals[(groomYear - 4) % 12];
        const brideZodiac = this.lunarCalendar.zodiacAnimals[(brideYear - 4) % 12];
        
        const groomCompat = this.animalCompatibility.compatibility[groomZodiac];
        let compatibility = "neutral";
        let score = 0;
        
        if (groomCompat.best.includes(brideZodiac)) {
            compatibility = "excellent";
            score = 20;
        } else if (groomCompat.good.includes(brideZodiac)) {
            compatibility = "good";
            score = 10;
        } else if (groomCompat.bad.includes(brideZodiac)) {
            compatibility = "bad";
            score = -10;
        }
        
        return {
            groomZodiac,
            brideZodiac,
            compatibility,
            score,
            description: this.getCompatibilityDescription(compatibility)
        };
    }

    // Mô tả về độ tương hợp
    getCompatibilityDescription(compatibility) {
        const descriptions = {
            excellent: "Rất hợp, thiên định tiền duyên",
            good: "Khá hợp, có thể hạnh phúc",
            neutral: "Bình thường, cần nỗ lực",
            bad: "Không hợp, cần thận trọng"
        };
        return descriptions[compatibility] || "Không xác định";
    }

    // Tạo báo cáo chi tiết cho ngày
    generateDetailedReport(lunarInfo, personalInfo, eventType) {
        const report = {
            basicInfo: {
                solarDate: `${lunarInfo.solar.day}/${lunarInfo.solar.month}/${lunarInfo.solar.year}`,
                lunarDate: lunarInfo.lunar.dateString,
                dayCanChi: lunarInfo.canChi.day.canChi,
                constellation: lunarInfo.constellation.name
            },
            
            hours: this.calculateBestHours(lunarInfo, eventType, personalInfo),
            directions: this.calculateBestDirections(eventType, personalInfo),
            colors: this.calculateLuckyColors(personalInfo, lunarInfo),
            gemstones: this.calculateSuitableGemstones(personalInfo, lunarInfo),
            numbers: this.calculateLuckyNumbers(personalInfo, lunarInfo),
            
            specialAdvice: this.generateSpecialAdvice(lunarInfo, personalInfo, eventType)
        };
        
        // Nếu là đám cưới và có thông tin hai người
        if (eventType === 'damCuoi' && personalInfo.partnerBirthYear) {
            report.zodiacCompatibility = this.checkZodiacCompatibility(
                personalInfo.birthYear, 
                personalInfo.partnerBirthYear
            );
        }
        
        return report;
    }

    // Tạo lời khuyên đặc biệt
    generateSpecialAdvice(lunarInfo, personalInfo, eventType) {
        const advice = [];
        
        // Lời khuyên dựa trên can chi
        if (lunarInfo.canChi.day.canChi.includes("Giáp")) {
            advice.push("Ngày Giáp - tốt cho việc khởi đầu, nên bắt đầu công việc từ sớm");
        }
        
        // Lời khuyên dựa trên 28 su
        if (lunarInfo.constellation.lucky) {
            advice.push(`28 su ${lunarInfo.constellation.name} thuộc nhóm tốt - có thể yên tâm thực hiện`);
        } else {
            advice.push(`28 su ${lunarInfo.constellation.name} cần thận trọng - nên chuẩn bị kỹ lưỡng`);
        }
        
        // Lời khuyên theo sự kiện
        if (eventType === 'dongTho') {
            advice.push("Nên chuẩn bị lễ vật: hương, bánh, rượu, hoa quả");
            advice.push("Tránh ồn ào, nên giữ không gian trang nghiêm");
        } else if (eventType === 'damCuoi') {
            advice.push("Nên chọn hoa sen hoặc hoa hồng đỏ");
            advice.push("Tránh mặc màu đen hoặc trắng");
        }
        
        return advice;
    }
}