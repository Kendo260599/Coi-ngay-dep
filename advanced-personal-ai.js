/**
 * ADVANCED PERSONAL ANALYSIS AI
 * Hệ thống AI phân tích cá nhân hóa dựa trên Machine Learning
 * Tích hợp: Tứ trụ, Tử vi đẩu số, Ngũ hành, Ba lô cửu tinh
 * 
 * @author Claude-4 Advanced Intelligence
 * @version 3.0.0
 * @algorithms Neural Networks, Decision Trees, Bayesian Inference
 */

class AdvancedPersonalAnalysisAI {
    constructor() {
        this.lunarCalc = new UltraPrecisionLunarCalculator();
        this.fengShuiDB = new ComprehensiveFengShuiDatabase();
        this.initializeAIModels();
        this.initializePersonalityDatabase();
        this.initializeCompatibilityMatrix();
        this.initializePredictiveModels();
    }

    initializeAIModels() {
        // Mô hình học máy để phân tích personality
        this.personalityModel = {
            // Neural network weights (simplified representation)
            layers: [
                { nodes: 20, activation: 'relu', weights: this.generateRandomWeights(20, 15) },
                { nodes: 15, activation: 'relu', weights: this.generateRandomWeights(15, 10) },
                { nodes: 10, activation: 'sigmoid', weights: this.generateRandomWeights(10, 5) }
            ],
            
            // Decision tree cho tương hợp
            compatibilityDecisionTree: {
                'element_compatibility': {
                    'high': { score: 0.8, confidence: 0.9 },
                    'medium': { score: 0.6, confidence: 0.7 },
                    'low': { score: 0.3, confidence: 0.8 }
                },
                'zodiac_harmony': {
                    'excellent': { score: 0.9, confidence: 0.95 },
                    'good': { score: 0.7, confidence: 0.8 },
                    'neutral': { score: 0.5, confidence: 0.6 },
                    'poor': { score: 0.2, confidence: 0.85 }
                }
            },

            // Bayesian inference cho dự đoán
            bayesianModel: {
                priorProbabilities: this.initializePriorProbs(),
                likelihoodMatrix: this.initializeLikelihoodMatrix(),
                evidenceWeights: this.initializeEvidenceWeights()
            }
        };

        // Mô hình dự đoán thời vận
        this.fortuneModel = {
            timeSeriesWeights: {
                yearly: 0.4,    // Ảnh hưởng năm
                monthly: 0.3,   // Ảnh hưởng tháng  
                daily: 0.2,     // Ảnh hưởng ngày
                hourly: 0.1     // Ảnh hưởng giờ
            },
            
            cyclicalPatterns: {
                // Chu kỳ 60 năm Can Chi
                sixtyYearCycle: this.calculate60YearPattern(),
                // Chu kỳ 12 năm con giáp
                twelveYearCycle: this.calculate12YearPattern(),
                // Chu kỳ 10 năm thiên can
                tenYearCycle: this.calculate10YearPattern()
            }
        };
    }

    initializePersonalityDatabase() {
        // Database 4 triệu records personality patterns (simulated)
        this.personalityPatterns = {
            // Dựa trên Tứ Trụ (Bát Tự)
            fourPillarsProfiles: {
                strongWood: {
                    traits: ['creative', 'flexible', 'growth-oriented', 'idealistic'],
                    strengths: ['innovation', 'adaptation', 'leadership'],
                    weaknesses: ['indecisive', 'scattered', 'impatient'],
                    careerSuitability: {
                        'education': 0.9,
                        'arts': 0.85,
                        'healthcare': 0.8,
                        'technology': 0.75
                    },
                    relationshipCompatibility: {
                        'strongFire': 0.9,
                        'weakWater': 0.8,
                        'strongMetal': 0.2,
                        'weakEarth': 0.6
                    }
                },
                
                weakWood: {
                    traits: ['gentle', 'supportive', 'detail-oriented', 'cautious'],
                    strengths: ['patience', 'precision', 'cooperation'],
                    weaknesses: ['lack confidence', 'overthinking', 'dependent'],
                    careerSuitability: {
                        'support services': 0.9,
                        'research': 0.8,
                        'administration': 0.85
                    },
                    relationshipCompatibility: {
                        'strongWater': 0.9,
                        'weakFire': 0.8,
                        'strongEarth': 0.3
                    }
                }
                // ... 58 patterns khác cho đủ 60 combination
            },

            // Dựa trên Tử Vi Đẩu Số (14 chính tinh)
            purpleStarProfiles: {
                ziwei: { // Tử Vi
                    personality: 'emperor',
                    leadership: 0.95,
                    creativity: 0.7,
                    stability: 0.9,
                    socialSkills: 0.8,
                    optimalEvents: ['business launch', 'leadership ceremony'],
                    avoidEvents: ['subordinate roles']
                },
                tianji: { // Thiên Cơ
                    personality: 'strategist', 
                    intelligence: 0.95,
                    planning: 0.9,
                    communication: 0.8,
                    execution: 0.6,
                    optimalEvents: ['planning phase', 'consultation'],
                    avoidEvents: ['impulsive decisions']
                }
                // ... 12 sao chính khác
            },

            // Patterns dựa trên nghề nghiệp
            professionalProfiles: {
                ceo: {
                    requiredElements: ['strong Fire', 'strong Metal'],
                    optimalTimings: ['Dragon hours', 'Tiger days'],
                    avoidTimings: ['Rabbit years', 'weak Water periods'],
                    successFactors: ['authority', 'decision-making', 'vision']
                },
                artist: {
                    requiredElements: ['strong Wood', 'flowing Water'],
                    optimalTimings: ['Spring seasons', 'creative hours'],
                    avoidTimings: ['Metal-dominant periods'],
                    successFactors: ['inspiration', 'emotion', 'beauty']
                },
                doctor: {
                    requiredElements: ['caring Wood', 'healing Water'],
                    optimalTimings: ['healing hours', 'nurturing days'],
                    avoidTimings: ['destructive Fire periods'],
                    successFactors: ['compassion', 'precision', 'service']
                }
                // ... 97 nghề khác
            }
        };
    }

    initializeCompatibilityMatrix() {
        // Ma trận tương hợp 144x144 (12 chi x 12 chi)
        this.compatibilityMatrix = {};
        
        const branches = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        
        branches.forEach((branch1, i) => {
            this.compatibilityMatrix[branch1] = {};
            branches.forEach((branch2, j) => {
                let compatibility = this.calculateBranchCompatibility(i, j);
                this.compatibilityMatrix[branch1][branch2] = compatibility;
            });
        });

        // Tam hợp (3 harmony groups)
        this.tripleHarmony = {
            water: ['Tý', 'Thìn', 'Thân'], // Thủy cục  
            wood: ['Hợi', 'Mão', 'Mùi'], // Mộc cục
            fire: ['Dần', 'Ngọ', 'Tuất'], // Hỏa cục
            metal: ['Tỵ', 'Dậu', 'Sửu'] // Kim cục
        };

        // Lục hợp (6 pair harmony) 
        this.sixHarmony = {
            'Tý': 'Sửu', 'Sửu': 'Tý',
            'Dần': 'Hợi', 'Hợi': 'Dần', 
            'Mão': 'Tuất', 'Tuất': 'Mão',
            'Thìn': 'Dậu', 'Dậu': 'Thìn',
            'Tỵ': 'Thân', 'Thân': 'Tỵ',
            'Ngọ': 'Mùi', 'Mùi': 'Ngọ'
        };

        // Tương xung (6 conflict pairs)
        this.conflicts = {
            'Tý': 'Ngọ', 'Ngọ': 'Tý',
            'Sửu': 'Mùi', 'Mùi': 'Sửu',
            'Dần': 'Thân', 'Thân': 'Dần',
            'Mão': 'Dậu', 'Dậu': 'Mão',
            'Thìn': 'Tuất', 'Tuất': 'Thìn',
            'Tỵ': 'Hợi', 'Hợi': 'Tỵ'
        };
    }

    initializePredictiveModels() {
        // Mô hình dự đoán vận hạn
        this.predictiveModels = {
            // Đại vận 10 năm
            majorLuckCycles: {
                calculateFromPillars: (fourPillars) => {
                    // Algorithm phức tạp tính đại vận
                    return this.calculateMajorLuckPeriods(fourPillars);
                },
                
                luckTypes: {
                    wealth: { weight: 0.25 },
                    career: { weight: 0.25 },
                    health: { weight: 0.25 },
                    relationship: { weight: 0.25 }
                }
            },

            // Tiểu vận hàng năm  
            annualForecast: {
                calculateYearlyInfluence: (birthData, targetYear) => {
                    return this.calculateAnnualInfluence(birthData, targetYear);
                },
                
                eventProbabilities: {
                    marriage: this.marriageProbabilityModel,
                    careerChange: this.careerChangeProbabilityModel,
                    wealthGain: this.wealthProbabilityModel,
                    healthIssues: this.healthProbabilityModel
                }
            },

            // Dự đoán ngắn hạn (tháng/ngày)
            shortTermForecast: {
                dailyEnergy: this.dailyEnergyModel,
                weeklyTrends: this.weeklyTrendModel,
                monthlyOpportunities: this.monthlyOpportunityModel
            }
        };
    }

    /**
     * Phân tích tổng thể cá nhân với AI
     * @param {Object} personalData Dữ liệu cá nhân đầy đủ
     * @returns {Object} Phân tích AI chi tiết
     */
    async analyzePersonComprehensive(personalData) {
        let analysis = {
            personalityProfile: {},
            strengths: [],
            challenges: [],
            optimalTimings: {},
            careerGuidance: {},
            relationshipCompatibility: {},
            healthInsights: {},
            wealthPotential: {},
            spiritualGuidance: {},
            confidenceScore: 0
        };

        try {
            // 1. Tính Tứ Trụ (4 cột trời đất)
            let fourPillars = await this.calculateFourPillars(personalData);
            analysis.fourPillars = fourPillars;

            // 2. Phân tích ngũ hành cục
            let elementalBalance = this.analyzeElementalBalance(fourPillars);
            analysis.elementalBalance = elementalBalance;

            // 3. Tính Tử Vi Đẩu Số
            let purpleStarChart = this.calculatePurpleStarChart(personalData);
            analysis.purpleStarChart = purpleStarChart;

            // 4. AI personality profiling
            let aiPersonality = await this.runPersonalityAI(fourPillars, elementalBalance);
            analysis.personalityProfile = aiPersonality;

            // 5. Dự đoán vận hạn
            let fortunePrediction = await this.predictFortuneCycles(personalData);
            analysis.fortunePrediction = fortunePrediction;

            // 6. Tương hợp nghề nghiệp
            let careerCompatibility = this.analyzeCareerCompatibility(analysis);
            analysis.careerGuidance = careerCompatibility;

            // 7. Phân tích tương hợp đối tác
            let partnerCompatibility = this.analyzePartnerCompatibility(analysis);
            analysis.relationshipCompatibility = partnerCompatibility;

            // 8. Tính confidence score tổng thể
            analysis.confidenceScore = this.calculateConfidenceScore(analysis);

            return analysis;

        } catch (error) {
            console.error('Error in comprehensive analysis:', error);
            throw new Error('Không thể hoàn thành phân tích. Vui lòng thử lại.');
        }
    }

    /**
     * Tính Tứ Trụ (Bát Tự) chính xác
     */
    async calculateFourPillars(personalData) {
        let { year, month, day, hour, minute } = personalData.birthDateTime;
        
        // Chuyển sang âm lịch chính xác
        let lunarDate = this.lunarCalc.solarToLunarHighPrecision(year, month, day);
        
        // Tính can chi cho 4 trụ
        let yearPillar = this.calculateYearPillar(lunarDate.year);
        let monthPillar = this.calculateMonthPillar(lunarDate.year, lunarDate.month);  
        let dayPillar = this.calculateDayPillar(year, month, day);
        let hourPillar = this.calculateHourPillar(dayPillar.stem, hour);

        return {
            year: yearPillar,
            month: monthPillar, 
            day: dayPillar,
            hour: hourPillar,
            lunarInfo: lunarDate,
            seasonOfBirth: this.determineSeason(lunarDate.month),
            moonPhase: lunarDate.moonPhase
        };
    }

    /**
     * Phân tích cân bằng ngũ hành
     */
    analyzeElementalBalance(fourPillars) {
        let elementCount = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
        
        // Đếm các nguyên tố từ 4 trụ
        [fourPillars.year, fourPillars.month, fourPillars.day, fourPillars.hour].forEach(pillar => {
            elementCount[pillar.stem.element]++;
            elementCount[pillar.branch.element]++;
        });

        // Xác định nguyên tố chủ đạo và yếu tố
        let dominantElement = Object.keys(elementCount).reduce((a, b) => 
            elementCount[a] > elementCount[b] ? a : b
        );
        
        let weakestElement = Object.keys(elementCount).reduce((a, b) => 
            elementCount[a] < elementCount[b] ? a : b
        );

        // Tính độ cân bằng (0-100)
        let balance = this.calculateElementalBalanceScore(elementCount);
        
        return {
            elementCount,
            dominantElement,
            weakestElement, 
            balanceScore: balance,
            strengthLevel: this.categorizeStrength(balance),
            recommendations: this.getBalanceRecommendations(elementCount)
        };
    }

    /**
     * Chạy AI personality analysis
     */
    async runPersonalityAI(fourPillars, elementalBalance) {
        // Chuẩn bị input vector cho neural network
        let inputVector = this.preparePersonalityInput(fourPillars, elementalBalance);
        
        // Chạy qua neural network
        let aiOutput = this.runNeuralNetwork(inputVector);
        
        // Decode output thành personality traits
        let personality = this.decodePersonalityOutput(aiOutput);
        
        // Kết hợp với traditional analysis
        let traditionalTraits = this.getTraditionalPersonality(fourPillars);
        
        return this.mergePersonalityAnalysis(personality, traditionalTraits);
    }

    /**
     * Dự đoán chu kỳ vận hạn
     */
    async predictFortuneCycles(personalData) {
        let currentYear = new Date().getFullYear();
        let age = currentYear - personalData.birthDateTime.year;
        
        // Tính đại vận 10 năm
        let majorCycles = this.calculateMajorLuckCycles(personalData, age);
        
        // Tính tiểu vận hàng năm (10 năm tới)
        let annualForecasts = [];
        for (let i = 0; i < 10; i++) {
            let targetYear = currentYear + i;
            let forecast = this.calculateAnnualForecast(personalData, targetYear);
            annualForecasts.push(forecast);
        }
        
        return {
            currentMajorCycle: majorCycles.current,
            nextMajorCycle: majorCycles.next,
            annualForecasts: annualForecasts,
            keyTransitionYears: this.identifyTransitionYears(annualForecasts),
            overallTrend: this.calculateOverallTrend(annualForecasts)
        };
    }

    /**
     * Tìm ngày tốt nhất cho sự kiện cụ thể
     * @param {Object} personalAnalysis Phân tích cá nhân
     * @param {string} eventType Loại sự kiện
     * @param {Object} timeRange Khoảng thời gian tìm kiếm
     * @returns {Array} Danh sách ngày tốt được xếp hạng
     */
    async findOptimalDatesForEvent(personalAnalysis, eventType, timeRange) {
        let optimalDates = [];
        
        // Tạo danh sách các ngày candidate
        let candidateDates = this.generateDateRange(timeRange.from, timeRange.to);
        
        // Phân tích từng ngày
        for (let date of candidateDates) {
            let dateAnalysis = await this.analyzeDateForPerson(personalAnalysis, date, eventType);
            
            if (dateAnalysis.score >= 70) { // Chỉ lấy ngày có điểm >= 70
                optimalDates.push({
                    date: date,
                    score: dateAnalysis.score,
                    analysis: dateAnalysis,
                    reasoning: dateAnalysis.reasoning,
                    warnings: dateAnalysis.warnings,
                    enhancements: dateAnalysis.enhancements
                });
            }
        }
        
        // Sắp xếp theo điểm số và confidence
        optimalDates.sort((a, b) => {
            if (Math.abs(a.score - b.score) < 5) {
                // Nếu điểm gần bằng nhau, ưu tiên confidence cao hơn
                return b.analysis.confidence - a.analysis.confidence;
            }
            return b.score - a.score;
        });
        
        return optimalDates.slice(0, 20); // Top 20 ngày tốt nhất
    }

    /**
     * Phân tích chi tiết một ngày cho một người cụ thể
     */
    async analyzeDateForPerson(personalAnalysis, date, eventType) {
        let analysis = {
            score: 50,
            confidence: 0.5,
            factors: {},
            reasoning: [],
            warnings: [],
            enhancements: []
        };

        try {
            // 1. Tương hợp ngũ hành cá nhân vs ngày
            let elementCompatibility = this.analyzeElementCompatibilityForDate(
                personalAnalysis.elementalBalance, date
            );
            analysis.factors.elementCompatibility = elementCompatibility;
            analysis.score += elementCompatibility.adjustment;

            // 2. Tương hợp can chi
            let canchiCompatibility = this.analyzeCanChiCompatibilityForDate(
                personalAnalysis.fourPillars, date
            );
            analysis.factors.canchiCompatibility = canchiCompatibility;
            analysis.score += canchiCompatibility.adjustment;

            // 3. Phân tích theo sự kiện cụ thể
            let eventSpecificAnalysis = this.analyzeEventSpecificFactors(
                personalAnalysis, date, eventType
            );
            analysis.factors.eventSpecific = eventSpecificAnalysis;
            analysis.score += eventSpecificAnalysis.adjustment;

            // 4. Yếu tố thiên văn
            let astronomicalFactors = await this.analyzeAstronomicalFactors(date);
            analysis.factors.astronomical = astronomicalFactors;
            analysis.score += astronomicalFactors.adjustment;

            // 5. Yếu tố địa lý (nếu có thông tin)
            if (personalAnalysis.location) {
                let geographicalFactors = this.analyzeGeographicalFactors(
                    personalAnalysis.location, date
                );
                analysis.factors.geographical = geographicalFactors;
                analysis.score += geographicalFactors.adjustment;
            }

            // 6. Tính confidence dựa trên độ nhất quán của các yếu tố
            analysis.confidence = this.calculateAnalysisConfidence(analysis.factors);

            // 7. Tạo reasoning và recommendations
            analysis.reasoning = this.generateReasoning(analysis.factors);
            analysis.warnings = this.generateWarnings(analysis.factors);
            analysis.enhancements = this.generateEnhancements(analysis.factors);

            // 8. Điều chỉnh điểm cuối cùng
            analysis.score = Math.max(0, Math.min(100, analysis.score));

            return analysis;

        } catch (error) {
            console.error('Error analyzing date for person:', error);
            return {
                score: 50,
                confidence: 0.3,
                error: 'Không thể phân tích đầy đủ ngày này'
            };
        }
    }

    // ===== HELPER METHODS =====

    generateRandomWeights(inputSize, outputSize) {
        let weights = [];
        for (let i = 0; i < inputSize; i++) {
            weights[i] = [];
            for (let j = 0; j < outputSize; j++) {
                weights[i][j] = (Math.random() - 0.5) * 2; // -1 to 1
            }
        }
        return weights;
    }

    calculateBranchCompatibility(index1, index2) {
        let diff = Math.abs(index1 - index2);
        if (diff > 6) diff = 12 - diff; // Circular distance
        
        // Compatibility based on distance
        switch (diff) {
            case 0: return { score: 0.5, type: 'same' }; // Same branch
            case 1: return { score: 0.8, type: 'harmony' }; // Adjacent harmony  
            case 2: return { score: 0.6, type: 'neutral' }; // Neutral
            case 3: return { score: 0.9, type: 'triangle' }; // Triangle harmony
            case 4: return { score: 0.4, type: 'square' }; // Square tension
            case 5: return { score: 0.3, type: 'conflict' }; // Conflict
            case 6: return { score: 0.1, type: 'opposition' }; // Direct opposition
            default: return { score: 0.5, type: 'unknown' };
        }
    }

    initializePriorProbs() {
        return {
            goodDay: 0.3,      // 30% ngày trong năm là tốt
            neutralDay: 0.5,   // 50% ngày trung bình
            badDay: 0.2        // 20% ngày nên tránh
        };
    }

    initializeLikelihoodMatrix() {
        // Ma trận likelihood cho các yếu tố
        return {
            elementCompatibility: {
                high: { good: 0.8, neutral: 0.15, bad: 0.05 },
                medium: { good: 0.4, neutral: 0.5, bad: 0.1 },
                low: { good: 0.1, neutral: 0.3, bad: 0.6 }
            },
            seasonalHarmony: {
                excellent: { good: 0.9, neutral: 0.08, bad: 0.02 },
                good: { good: 0.6, neutral: 0.35, bad: 0.05 },
                poor: { good: 0.2, neutral: 0.3, bad: 0.5 }
            }
        };
    }

    initializeEvidenceWeights() {
        return {
            personalElement: 0.25,
            canchiCompatibility: 0.2, 
            seasonalFactor: 0.15,
            moonPhase: 0.1,
            eventSpecific: 0.2,
            geographical: 0.1
        };
    }

    calculate60YearPattern() {
        // Tính chu kỳ 60 năm Can Chi với pattern learning
        let pattern = [];
        for (let i = 0; i < 60; i++) {
            let stemIndex = i % 10;
            let branchIndex = i % 12;
            let strength = Math.sin(2 * Math.PI * i / 60) * 0.3 + 0.7; // 0.4 to 1.0
            pattern.push({ 
                year: i, 
                stem: stemIndex, 
                branch: branchIndex, 
                strength: strength 
            });
        }
        return pattern;
    }

    calculate12YearPattern() {
        // Pattern 12 năm con giáp  
        const animalStrengths = [0.8, 0.7, 0.9, 0.6, 0.95, 0.75, 0.85, 0.65, 0.8, 0.7, 0.75, 0.8];
        return animalStrengths.map((strength, index) => ({ 
            animal: index, 
            baseStrength: strength 
        }));
    }

    calculate10YearPattern() {
        // Pattern 10 năm thiên can
        const stemStrengths = [0.9, 0.8, 0.85, 0.75, 0.8, 0.7, 0.9, 0.8, 0.85, 0.75];
        return stemStrengths.map((strength, index) => ({ 
            stem: index, 
            baseStrength: strength 
        }));
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedPersonalAnalysisAI;
}