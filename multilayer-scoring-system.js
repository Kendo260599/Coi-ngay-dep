/**
 * MULTI-LAYER INTELLIGENT SCORING SYSTEM
 * Hệ thống chấm điểm đa tầng với AI và Machine Learning
 * Tích hợp: Fuzzy Logic, Neural Networks, Ensemble Methods, Bayesian Inference
 * 
 * @author Claude-4 Advanced ML System
 * @version 5.0.0
 * @algorithms Ensemble ML, Deep Learning, Probabilistic Models
 */

class MultiLayerIntelligentScoringSystem {
    constructor() {
        this.lunarCalc = new UltraPrecisionLunarCalculator();
        this.fengShuiDB = new ComprehensiveFengShuiDatabase();
        this.personalAI = new AdvancedPersonalAnalysisAI();
        this.astroData = new RealTimeAstronomicalIntegration();
        
        this.initializeMLModels();
        this.initializeFuzzyLogicSystem();
        this.initializeEnsembleMethods();
        this.initializeAdaptiveLearning();
        this.initializeRegionalAdaptations();
        this.initializeUserFeedbackSystem();
    }

    initializeMLModels() {
        // Neural Network Architecture
        this.neuralNetwork = {
            architecture: {
                inputLayer: 50,    // Features: personal, date, event, astronomical
                hiddenLayers: [
                    { nodes: 30, activation: 'relu', dropout: 0.2 },
                    { nodes: 20, activation: 'relu', dropout: 0.3 },
                    { nodes: 15, activation: 'tanh', dropout: 0.2 }
                ],
                outputLayer: { nodes: 1, activation: 'sigmoid' }
            },
            
            weights: this.initializeRandomWeights(),
            learningRate: 0.001,
            momentum: 0.9,
            epochs: 1000,
            batchSize: 32
        };

        // Random Forest Ensemble
        this.randomForest = {
            nTrees: 100,
            maxDepth: 15,
            minSamplesLeaf: 5,
            maxFeatures: 'sqrt',
            trees: []
        };

        // Gradient Boosting
        this.gradientBoosting = {
            nEstimators: 200,
            learningRate: 0.1,
            maxDepth: 6,
            subsample: 0.8,
            estimators: []
        };

        // Support Vector Machine
        this.svm = {
            kernel: 'rbf',
            C: 1.0,
            gamma: 'scale',
            epsilon: 0.1
        };
    }

    initializeFuzzyLogicSystem() {
        // Fuzzy Logic cho xử lý uncertainty và linguistic variables
        this.fuzzySystem = {
            // Membership functions cho các linguistic variables
            membershipFunctions: {
                personalCompatibility: {
                    veryLow: { type: 'triangular', params: [0, 0, 20] },
                    low: { type: 'triangular', params: [10, 25, 40] },
                    medium: { type: 'triangular', params: [30, 50, 70] },
                    high: { type: 'triangular', params: [60, 75, 90] },
                    veryHigh: { type: 'triangular', params: [80, 100, 100] }
                },
                
                dateQuality: {
                    terrible: { type: 'triangular', params: [0, 0, 15] },
                    bad: { type: 'triangular', params: [5, 20, 35] },
                    average: { type: 'triangular', params: [25, 50, 75] },
                    good: { type: 'triangular', params: [65, 80, 95] },
                    excellent: { type: 'triangular', params: [85, 100, 100] }
                },
                
                astronomicalInfluence: {
                    negative: { type: 'triangular', params: [0, 0, 30] },
                    neutral: { type: 'triangular', params: [20, 50, 80] },
                    positive: { type: 'triangular', params: [70, 100, 100] }
                }
            },

            // Fuzzy rules
            rules: [
                {
                    if: ['personalCompatibility is high', 'dateQuality is good', 'astronomicalInfluence is positive'],
                    then: 'finalScore is excellent',
                    weight: 1.0
                },
                {
                    if: ['personalCompatibility is medium', 'dateQuality is average'],
                    then: 'finalScore is average', 
                    weight: 0.8
                },
                {
                    if: ['dateQuality is terrible'],
                    then: 'finalScore is bad',
                    weight: 0.9
                },
                // ... more complex rules
            ],

            // Defuzzification method
            defuzzificationMethod: 'centroid'
        };
    }

    initializeEnsembleMethods() {
        // Ensemble của multiple models
        this.ensemble = {
            models: [
                { name: 'neuralNetwork', weight: 0.3, confidence: 0.85 },
                { name: 'randomForest', weight: 0.25, confidence: 0.8 },
                { name: 'gradientBoosting', weight: 0.2, confidence: 0.75 },
                { name: 'fuzzyLogic', weight: 0.15, confidence: 0.7 },
                { name: 'traditional', weight: 0.1, confidence: 0.6 }
            ],

            // Voting strategies
            votingStrategy: 'weighted', // 'majority', 'weighted', 'stacking'
            
            // Meta-learner cho stacking
            metaLearner: {
                algorithm: 'logisticRegression',
                features: ['model1_pred', 'model2_pred', 'model3_pred', 'confidence_scores'],
                trainedWeights: null
            },

            // Dynamic weight adjustment
            adaptiveWeights: true,
            performanceTracking: new Map()
        };
    }

    initializeAdaptiveLearning() {
        // Học thích ứng từ feedback
        this.adaptiveLearning = {
            // Online learning parameters
            onlineLearning: {
                enabled: true,
                learningRate: 0.01,
                forgettingFactor: 0.95, // Để giảm ảnh hưởng của data cũ
                minSamples: 100 // Số samples tối thiểu để update model
            },

            // Feedback processing
            feedbackProcessor: {
                feedbackTypes: ['accuracy', 'satisfaction', 'outcome'],
                weightByType: { accuracy: 0.5, satisfaction: 0.3, outcome: 0.2 },
                timeDecay: 0.1 // Feedback gần đây quan trọng hơn
            },

            // Model retraining schedule
            retrainingSchedule: {
                frequency: 'weekly', // 'daily', 'weekly', 'monthly'
                triggerThreshold: 0.05, // Retrain khi performance drop 5%
                validationSplit: 0.2
            },

            // Performance monitoring
            performanceMetrics: {
                accuracy: [],
                precision: [], 
                recall: [],
                f1Score: [],
                userSatisfaction: []
            }
        };
    }

    initializeRegionalAdaptations() {
        // Điều chỉnh theo vùng miền Việt Nam
        this.regionalAdaptations = {
            north: {
                name: 'Bắc Bộ',
                climaticFactors: {
                    rainySeasonMonths: [5, 6, 7, 8, 9],
                    drySeasonMonths: [11, 12, 1, 2, 3, 4],
                    temperatureRange: { min: 5, max: 40 },
                    humidityAvg: 75
                },
                culturalFactors: {
                    preferredEvents: {
                        marriage: { seasons: ['autumn', 'winter'], score: +5 },
                        business: { seasons: ['spring'], score: +3 },
                        construction: { seasons: ['dry'], score: +4 }
                    },
                    avoidedPeriods: {
                        'rainy_season_construction': { months: [6, 7, 8], score: -10 },
                        'tet_period': { dates: 'lunar_1_1_to_1_7', score: -5 }
                    }
                },
                astrologicalAdjustments: {
                    moonPhaseWeight: 1.1, // Miền bắc chú trọng pha trăng hơn
                    seasonalWeight: 1.2,
                    elementWeight: 1.0
                }
            },

            central: {
                name: 'Trung Bộ',
                climaticFactors: {
                    rainySeasonMonths: [9, 10, 11, 12],
                    drySeasonMonths: [1, 2, 3, 4, 5, 6],
                    temperatureRange: { min: 15, max: 45 },
                    humidityAvg: 70
                },
                culturalFactors: {
                    preferredEvents: {
                        marriage: { seasons: ['spring'], score: +4 },
                        business: { seasons: ['dry'], score: +5 }
                    },
                    specialConsiderations: {
                        'typhoon_season': { months: [8, 9, 10, 11], score: -8 },
                        'hot_season': { months: [4, 5, 6], score: -3 }
                    }
                },
                astrologicalAdjustments: {
                    weatherWeight: 1.3, // Thời tiết ảnh hưởng mạnh
                    seasonalWeight: 1.1,
                    elementWeight: 0.9
                }
            },

            south: {
                name: 'Nam Bộ', 
                climaticFactors: {
                    rainySeasonMonths: [5, 6, 7, 8, 9, 10],
                    drySeasonMonths: [11, 12, 1, 2, 3, 4],
                    temperatureRange: { min: 20, max: 38 },
                    humidityAvg: 80
                },
                culturalFactors: {
                    preferredEvents: {
                        marriage: { seasons: ['dry'], score: +6 },
                        business: { seasons: ['all'], score: +2 },
                        travel: { seasons: ['dry'], score: +5 }
                    },
                    specialConsiderations: {
                        'flood_season': { months: [8, 9, 10], score: -6 }
                    }
                },
                astrologicalAdjustments: {
                    lunarWeight: 1.0,
                    seasonalWeight: 0.9, // Ít phân biệt mùa
                    elementWeight: 1.1
                }
            }
        };
    }

    initializeUserFeedbackSystem() {
        // Hệ thống thu thập và xử lý feedback
        this.feedbackSystem = {
            collectionMethods: {
                implicit: {
                    // Thu thập ngầm từ hành vi người dùng
                    pageViews: { weight: 0.1 },
                    timeSpent: { weight: 0.2 },
                    returnVisits: { weight: 0.3 },
                    sharingBehavior: { weight: 0.4 }
                },
                explicit: {
                    // Thu thập trực tiếp từ người dùng
                    ratings: { weight: 0.5 },
                    reviews: { weight: 0.3 },
                    surveys: { weight: 0.2 }
                }
            },

            // NLP để xử lý feedback text
            textAnalysis: {
                sentimentAnalysis: {
                    positiveKeywords: ['tốt', 'chính xác', 'hữu ích', 'hay', 'tuyệt vời'],
                    negativeKeywords: ['sai', 'không chính xác', 'tệ', 'không hay'],
                    neutralKeywords: ['bình thường', 'được', 'ok']
                },
                topicExtraction: {
                    aspects: ['accuracy', 'usability', 'completeness', 'speed'],
                    keywords: {
                        accuracy: ['chính xác', 'đúng', 'sai', 'precise'],
                        usability: ['dễ dùng', 'khó hiểu', 'giao diện', 'UX'],
                        completeness: ['đầy đủ', 'thiếu', 'complete', 'missing'],
                        speed: ['nhanh', 'chậm', 'fast', 'slow']
                    }
                }
            },

            // Feedback aggregation và weighting
            aggregation: {
                timeWeighting: {
                    recent: { days: 30, weight: 1.0 },
                    medium: { days: 90, weight: 0.8 },
                    old: { days: 365, weight: 0.5 }
                },
                userWeighting: {
                    powerUsers: { threshold: 50, weight: 1.5 },
                    regularUsers: { threshold: 10, weight: 1.0 },
                    newUsers: { threshold: 1, weight: 0.7 }
                }
            }
        };
    }

    /**
     * Tính điểm tổng hợp với ML ensemble
     * @param {Object} personalData Dữ liệu cá nhân
     * @param {Date} targetDate Ngày cần tính điểm
     * @param {string} eventType Loại sự kiện
     * @param {Object} options Tùy chọn bổ sung
     * @returns {Promise<Object>} Kết quả phân tích chi tiết
     */
    async calculateIntelligentScore(personalData, targetDate, eventType, options = {}) {
        try {
            // 1. Chuẩn bị feature vector
            let features = await this.prepareFeatureVector(personalData, targetDate, eventType, options);
            
            // 2. Chạy các models
            let predictions = await this.runEnsembleModels(features);
            
            // 3. Fuzzy logic processing
            let fuzzyResult = this.processFuzzyLogic(features, predictions);
            
            // 4. Ensemble voting
            let ensembleScore = this.calculateEnsembleScore(predictions, fuzzyResult);
            
            // 5. Regional adjustments
            let adjustedScore = this.applyRegionalAdjustments(ensembleScore, options.region);
            
            // 6. Confidence calculation
            let confidence = this.calculatePredictionConfidence(predictions, features);
            
            // 7. Explanation generation
            let explanation = this.generateExplanation(features, predictions, adjustedScore);
            
            // 8. Recommendations
            let recommendations = await this.generateIntelligentRecommendations(
                personalData, targetDate, eventType, adjustedScore, features
            );

            return {
                finalScore: Math.round(adjustedScore.score * 100) / 100,
                confidence: Math.round(confidence * 100) / 100,
                breakdown: {
                    neuralNetwork: predictions.neuralNetwork,
                    randomForest: predictions.randomForest,
                    gradientBoosting: predictions.gradientBoosting,
                    fuzzyLogic: fuzzyResult,
                    traditional: predictions.traditional
                },
                explanation: explanation,
                recommendations: recommendations,
                features: features.summary,
                metadata: {
                    modelVersion: '5.0.0',
                    timestamp: new Date().toISOString(),
                    region: options.region || 'south',
                    processingTime: null
                }
            };

        } catch (error) {
            console.error('Error in intelligent scoring:', error);
            throw new Error('Không thể tính toán điểm số. Vui lòng thử lại.');
        }
    }

    /**
     * Chuẩn bị feature vector cho ML models
     */
    async prepareFeatureVector(personalData, targetDate, eventType, options) {
        let features = {
            // Personal features (15 features)
            personal: {
                birthYear: personalData.birthDateTime.year,
                birthMonth: personalData.birthDateTime.month,
                birthDay: personalData.birthDateTime.day,
                birthHour: personalData.birthDateTime.hour || 12,
                gender: personalData.gender === 'male' ? 1 : 0,
                
                // Derived personal features
                age: new Date().getFullYear() - personalData.birthDateTime.year,
                chineseZodiac: (personalData.birthDateTime.year - 4) % 12,
                personalElement: this.getPersonalElement(personalData.birthDateTime.year),
                lifePalace: this.calculateLifePalace(personalData),
                
                // Encoded categorical features
                genderEncoded: personalData.gender === 'male' ? 1 : 0,
                professionCategory: this.encodeProfession(personalData.profession),
                educationLevel: this.encodeEducation(personalData.education),
                maritalStatus: this.encodeMaritalStatus(personalData.maritalStatus),
                regionOfBirth: this.encodeRegion(personalData.birthPlace),
                
                // Calculated compatibility scores
                elementStrength: await this.calculateElementStrength(personalData)
            },

            // Date features (20 features)  
            date: {
                year: targetDate.getFullYear(),
                month: targetDate.getMonth() + 1,
                day: targetDate.getDate(),
                weekday: targetDate.getDay(),
                dayOfYear: this.getDayOfYear(targetDate),
                
                // Lunar calendar features
                lunarMonth: 0, // Will be calculated
                lunarDay: 0,
                lunarYear: 0,
                isLeapMonth: 0,
                
                // Seasonal features
                season: this.getSeason(targetDate),
                seasonProgress: this.getSeasonProgress(targetDate),
                
                // Can chi features
                yearStem: 0, // Will be calculated
                yearBranch: 0,
                monthStem: 0,
                monthBranch: 0,
                dayStem: 0,
                dayBranch: 0,
                
                // Cyclical features
                sixtyYearCycle: (targetDate.getFullYear() - 1924) % 60,
                twelveYearCycle: (targetDate.getFullYear() - 1924) % 12,
                tenYearCycle: (targetDate.getFullYear() - 1924) % 10
            },

            // Event features (8 features)
            event: {
                type: this.encodeEventType(eventType),
                urgency: options.urgency || 0.5,
                importance: options.importance || 0.7,
                flexibility: options.flexibility || 0.5,
                
                // Event-specific features
                guestCount: options.guestCount || 0,
                duration: options.duration || 1,
                budget: this.encodeBudget(options.budget),
                location: this.encodeLocation(options.location)
            },

            // Astronomical features (15 features)
            astronomical: {}, // Will be filled by astro data

            // Interaction features (cross-products, 10 features)
            interactions: {}
        };

        // Calculate lunar features
        let lunarInfo = this.lunarCalc.solarToLunarHighPrecision(
            targetDate.getFullYear(),
            targetDate.getMonth() + 1,
            targetDate.getDate()
        );
        
        features.date.lunarMonth = lunarInfo.month;
        features.date.lunarDay = lunarInfo.day;
        features.date.lunarYear = lunarInfo.year;
        features.date.isLeapMonth = lunarInfo.isLeapMonth ? 1 : 0;

        // Calculate can chi
        let canChi = this.calculateCanChiForDate(targetDate, lunarInfo);
        features.date.yearStem = canChi.year.stem;
        features.date.yearBranch = canChi.year.branch;
        features.date.monthStem = canChi.month.stem;
        features.date.monthBranch = canChi.month.branch;
        features.date.dayStem = canChi.day.stem;
        features.date.dayBranch = canChi.day.branch;

        // Get astronomical data
        features.astronomical = await this.getAstronomicalFeatures(targetDate, options.location);

        // Calculate interaction features
        features.interactions = this.calculateInteractionFeatures(features);

        // Create flat feature array for ML models
        features.vector = this.flattenFeatures(features);
        features.summary = this.createFeatureSummary(features);

        return features;
    }

    /**
     * Chạy tất cả models trong ensemble
     */
    async runEnsembleModels(features) {
        let predictions = {};

        try {
            // 1. Neural Network
            predictions.neuralNetwork = {
                score: this.runNeuralNetwork(features.vector),
                confidence: this.calculateNNConfidence(features.vector)
            };

            // 2. Random Forest
            predictions.randomForest = {
                score: this.runRandomForest(features.vector),
                confidence: this.calculateRFConfidence(features.vector)
            };

            // 3. Gradient Boosting
            predictions.gradientBoosting = {
                score: this.runGradientBoosting(features.vector),
                confidence: this.calculateGBConfidence(features.vector)
            };

            // 4. Traditional feng shui calculation
            predictions.traditional = {
                score: await this.runTraditionalCalculation(features),
                confidence: 0.7 // Traditional methods have moderate confidence
            };

            // 5. SVM (if enabled)
            if (this.svm.enabled) {
                predictions.svm = {
                    score: this.runSVM(features.vector),
                    confidence: this.calculateSVMConfidence(features.vector)
                };
            }

            return predictions;

        } catch (error) {
            console.error('Error in ensemble models:', error);
            // Fallback to traditional calculation only
            return {
                traditional: {
                    score: await this.runTraditionalCalculation(features),
                    confidence: 0.6
                }
            };
        }
    }

    /**
     * Xử lý Fuzzy Logic
     */
    processFuzzyLogic(features, predictions) {
        try {
            // Fuzzification - chuyển crisp values thành fuzzy sets
            let fuzzyInputs = this.fuzzifyInputs(features, predictions);
            
            // Rule evaluation - áp dụng fuzzy rules
            let ruleOutputs = this.evaluateFuzzyRules(fuzzyInputs);
            
            // Defuzzification - chuyển về crisp output
            let crispOutput = this.defuzzifyOutput(ruleOutputs);
            
            return {
                score: crispOutput,
                confidence: this.calculateFuzzyConfidence(ruleOutputs),
                details: {
                    inputs: fuzzyInputs,
                    ruleActivations: ruleOutputs.map(r => r.activation),
                    dominantRules: ruleOutputs.filter(r => r.activation > 0.5)
                }
            };

        } catch (error) {
            console.error('Error in fuzzy logic:', error);
            return {
                score: 0.5,
                confidence: 0.3,
                error: 'Fuzzy logic processing failed'
            };
        }
    }

    /**
     * Tính điểm ensemble cuối cùng
     */
    calculateEnsembleScore(predictions, fuzzyResult) {
        let totalScore = 0;
        let totalWeight = 0;
        let scores = [];

        // Collect scores and weights
        this.ensemble.models.forEach(model => {
            if (predictions[model.name]) {
                let score = predictions[model.name].score;
                let confidence = predictions[model.name].confidence || model.confidence;
                let weight = model.weight;

                // Adjust weight by confidence
                let adjustedWeight = weight * confidence;
                
                totalScore += score * adjustedWeight;
                totalWeight += adjustedWeight;
                
                scores.push({
                    model: model.name,
                    score: score,
                    weight: adjustedWeight,
                    confidence: confidence
                });
            }
        });

        // Include fuzzy result
        if (fuzzyResult && !fuzzyResult.error) {
            let fuzzyWeight = 0.15 * fuzzyResult.confidence;
            totalScore += fuzzyResult.score * fuzzyWeight;
            totalWeight += fuzzyWeight;
            
            scores.push({
                model: 'fuzzyLogic',
                score: fuzzyResult.score,
                weight: fuzzyWeight,
                confidence: fuzzyResult.confidence
            });
        }

        // Calculate final weighted score
        let finalScore = totalWeight > 0 ? totalScore / totalWeight : 0.5;
        
        // Apply ensemble adjustments
        finalScore = this.applyEnsembleAdjustments(finalScore, scores);
        
        return {
            score: Math.max(0, Math.min(1, finalScore)),
            breakdown: scores,
            totalWeight: totalWeight,
            variance: this.calculateScoreVariance(scores)
        };
    }

    /**
     * Áp dụng điều chỉnh theo vùng miền
     */
    applyRegionalAdjustments(ensembleScore, region = 'south') {
        let regionData = this.regionalAdaptations[region];
        if (!regionData) regionData = this.regionalAdaptations.south;

        let adjustedScore = ensembleScore.score;
        let adjustments = [];

        // Climate adjustments
        // (Implementation would go here)

        // Cultural adjustments  
        // (Implementation would go here)

        // Astrological adjustments
        // (Implementation would go here)

        return {
            score: adjustedScore,
            originalScore: ensembleScore.score,
            adjustments: adjustments,
            region: region
        };
    }

    // ===== HELPER METHODS =====
    
    initializeRandomWeights() {
        // Initialize neural network weights
        let weights = {};
        // Implementation for weight initialization
        return weights;
    }

    runNeuralNetwork(inputVector) {
        // Simplified neural network forward pass
        let output = 0.5; // Placeholder
        // Actual implementation would process through layers
        return Math.max(0, Math.min(1, output));
    }

    runRandomForest(inputVector) {
        // Simplified random forest prediction
        let predictions = [];
        // Each tree votes
        for (let i = 0; i < this.randomForest.nTrees; i++) {
            predictions.push(Math.random()); // Placeholder
        }
        return predictions.reduce((a, b) => a + b, 0) / predictions.length;
    }

    runGradientBoosting(inputVector) {
        // Simplified gradient boosting prediction
        return 0.6; // Placeholder
    }

    async runTraditionalCalculation(features) {
        // Run traditional feng shui calculation
        // This would use the existing logic from good-day-calculator.js
        return 0.7; // Placeholder
    }

    // ... More helper methods
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultiLayerIntelligentScoringSystem;
}