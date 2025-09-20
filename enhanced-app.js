// Enhanced Main Application - Ứng dụng nâng cấp với các tính năng mới
// Tích hợp hệ thống tính toán nâng cao và giao diện tốt hơn

class EnhancedGoodDayApp {
    constructor() {
        this.lunarCalendar = new EnhancedLunarCalendar();
        this.calculator = new EnhancedGoodDayCalculator();
        this.advancedFeatures = new AdvancedFeaturesModule(this.lunarCalendar, this.calculator);
        
        // Cache system
        this.cache = new Map();
        this.cacheTimeout = 1000 * 60 * 30; // 30 phút
        
        this.initializeApp();
    }

    // Khởi tạo ứng dụng
    initializeApp() {
        this.populateSelectOptions();
        this.bindEvents();
        this.initializeTooltips();
        this.showWelcomeMessage();
        this.preloadData();
    }

    // Tạo các option nâng cao cho select elements
    populateSelectOptions() {
        // Tạo option cho ngày
        const daySelect = document.getElementById('birthDay');
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // Tạo option cho tháng sinh với tên đầy đủ
        const monthSelect = document.getElementById('birthMonth');
        const months = [
            { value: 1, name: 'Tháng 1 (Giêng)' },
            { value: 2, name: 'Tháng 2 (Hai)' },
            { value: 3, name: 'Tháng 3 (Ba)' },
            { value: 4, name: 'Tháng 4 (Tư)' },
            { value: 5, name: 'Tháng 5 (Năm)' },
            { value: 6, name: 'Tháng 6 (Sáu)' },
            { value: 7, name: 'Tháng 7 (Bảy)' },
            { value: 8, name: 'Tháng 8 (Tám)' },
            { value: 9, name: 'Tháng 9 (Chín)' },
            { value: 10, name: 'Tháng 10 (Mười)' },
            { value: 11, name: 'Tháng 11 (Một)' },
            { value: 12, name: 'Tháng 12 (Chạp)' }
        ];
        months.forEach(month => {
            const option = document.createElement('option');
            option.value = month.value;
            option.textContent = month.name;
            monthSelect.appendChild(option);
        });

        // Tạo option cho năm sinh (từ 1940 đến 2015)
        const yearSelect = document.getElementById('birthYear');
        const currentYear = new Date().getFullYear();
        for (let year = 1940; year <= 2015; year++) {
            const option = document.createElement('option');
            option.value = year;
            
            // Thêm thông tin can chi và con giáp
            const yearInfo = this.lunarCalendar.getYearCanChi(year);
            option.textContent = `${year} (${yearInfo.canChi} - ${yearInfo.zodiac})`;
            option.setAttribute('data-canchi', yearInfo.canChi);
            option.setAttribute('data-zodiac', yearInfo.zodiac);
            
            yearSelect.appendChild(option);
        }

        // Tạo option cho tháng xem
        const fromMonthSelect = document.getElementById('fromMonth');
        months.forEach(month => {
            const option = document.createElement('option');
            option.value = month.value;
            option.textContent = month.name;
            fromMonthSelect.appendChild(option);
        });

        // Tạo option cho năm xem (từ năm hiện tại đến 2 năm sau)
        const fromYearSelect = document.getElementById('fromYear');
        for (let year = currentYear; year <= currentYear + 2; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            fromYearSelect.appendChild(option);
        }

        // Set giá trị mặc định
        const now = new Date();
        fromMonthSelect.value = now.getMonth() + 1;
        fromYearSelect.value = now.getFullYear();
    }

    // Gắn kết sự kiện nâng cao
    bindEvents() {
        const form = document.getElementById('personalForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.validateInput(input);
                this.updatePersonalInfo(input);
            });
            
            input.addEventListener('input', () => {
                this.debounce(() => this.validateInput(input), 300)();
            });
        });

        // Thêm event cho advanced options
        this.bindAdvancedEvents();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.handleFormSubmit();
            }
        });
    }

    // Gắn kết sự kiện nâng cao
    bindAdvancedEvents() {
        // Toggle advanced settings
        const advancedToggle = document.getElementById('advancedToggle');
        if (advancedToggle) {
            advancedToggle.addEventListener('click', () => {
                this.toggleAdvancedSettings();
            });
        }
        
        // Export results
        const exportBtn = document.getElementById('exportResults');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportResults();
            });
        }
        
        // Save favorite settings
        const saveBtn = document.getElementById('saveSettings');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveUserSettings();
            });
        }
    }

    // Khởi tạo tooltips
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    // Hiển thị thông báo chào mừng nâng cao
    showWelcomeMessage() {
        const now = new Date();
        const lunarInfo = this.lunarCalendar.getCompleteLunarInfo(
            now.getDate(), 
            now.getMonth() + 1, 
            now.getFullYear()
        );
        
        const welcomeMessage = `
            <div class="welcome-info">
                <h3>📅 Hôm nay: ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}</h3>
                <p><strong>Âm lịch:</strong> ${lunarInfo.lunar.dateString}</p>
                <p><strong>Can Chi:</strong> ${lunarInfo.canChi.day.canChi}</p>
                <p><strong>28 Su:</strong> ${lunarInfo.constellation.name} (${lunarInfo.constellation.element})</p>
                <p><strong>Mệnh ngày:</strong> ${lunarInfo.elements.dayElement}</p>
            </div>
        `;
        
        // Hiển thị thông tin trong header hoặc popup
        this.showInfoPopup('Thông tin hôm nay', welcomeMessage);
    }

    // Preload dữ liệu quan trọng
    preloadData() {
        // Preload một số tháng gần đây để tăng tốc độ
        const now = new Date();
        for (let i = 0; i < 3; i++) {
            const month = now.getMonth() + 1 + i;
            const year = now.getFullYear() + Math.floor(month / 12);
            const actualMonth = month > 12 ? month - 12 : month;
            
            setTimeout(() => {
                this.preloadMonthData(actualMonth, year);
            }, i * 1000);
        }
    }

    // Preload dữ liệu tháng
    preloadMonthData(month, year) {
        try {
            for (let day = 1; day <= 31; day++) {
                try {
                    const lunarInfo = this.lunarCalendar.getCompleteLunarInfo(day, month, year);
                    const cacheKey = `${day}-${month}-${year}`;
                    this.cache.set(cacheKey, {
                        data: lunarInfo,
                        timestamp: Date.now()
                    });
                } catch (e) {
                    // Ngày không hợp lệ (ví dụ 31/2), bỏ qua
                }
            }
        } catch (error) {
            console.warn(`Preload failed for ${month}/${year}:`, error);
        }
    }

    // Xử lý khi submit form nâng cao
    async handleFormSubmit() {
        const formData = this.getFormData();
        
        if (!this.validateFormData(formData)) {
            return;
        }

        this.showLoading();
        
        try {
            // Tính toán với progress indicator
            const results = await this.calculateWithProgress(formData);
            
            // Hiển thị kết quả nâng cao
            await this.displayEnhancedResults(results, formData);
            
            // Lưu vào localStorage
            this.saveRecentSearch(formData, results);
            
        } catch (error) {
            this.showError('Có lỗi xảy ra khi tính toán. Vui lòng thử lại.', error);
            console.error('Calculation error:', error);
        } finally {
            this.hideLoading();
        }
    }

    // Tính toán với progress indicator
    async calculateWithProgress(formData) {
        const progressBar = this.createProgressBar();
        let progress = 0;
        
        try {
            // Cập nhật progress
            this.updateProgress(progressBar, 10, "Khởi tạo dữ liệu...");
            
            const results = this.calculator.findAdvancedGoodDays(
                formData.fromMonth,
                formData.fromYear,
                formData.eventType,
                {
                    name: formData.fullName,
                    birthYear: formData.birthYear,
                    birthMonth: formData.birthMonth,
                    birthDay: formData.birthDay,
                    gender: formData.gender
                },
                90 // 3 tháng
            );
            
            this.updateProgress(progressBar, 50, "Tính toán ngày tốt...");
            
            // Thêm thông tin nâng cao cho mỗi ngày
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                
                // Tính toán thông tin nâng cao
                result.advancedInfo = this.advancedFeatures.generateDetailedReport(
                    result.lunarInfo,
                    {
                        birthYear: formData.birthYear,
                        birthMonth: formData.birthMonth,
                        birthDay: formData.birthDay,
                        gender: formData.gender
                    },
                    formData.eventType
                );
                
                // Cập nhật progress
                const progressPercent = 50 + (i / results.length) * 40;
                this.updateProgress(progressBar, progressPercent, `Phân tích ngày ${i + 1}/${results.length}...`);
                
                // Yield để không block UI
                if (i % 10 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
            }
            
            this.updateProgress(progressBar, 100, "Hoàn thành!");
            
            setTimeout(() => {
                progressBar.remove();
            }, 1000);
            
            return results;
            
        } catch (error) {
            progressBar.remove();
            throw error;
        }
    }

    // Tạo progress bar
    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="progress-text">Bắt đầu tính toán...</div>
        `;
        
        const resultSection = document.getElementById('resultSection');
        resultSection.appendChild(progressContainer);
        
        return progressContainer;
    }

    // Cập nhật progress
    updateProgress(progressBar, percent, text) {
        const fill = progressBar.querySelector('.progress-fill');
        const textElement = progressBar.querySelector('.progress-text');
        
        fill.style.width = `${percent}%`;
        textElement.textContent = text;
    }

    // Hiển thị kết quả nâng cao
    async displayEnhancedResults(results, formData) {
        const resultSection = document.getElementById('resultSection');
        const stats = this.calculator.getAdvancedSummaryStats(results);
        
        const eventNames = {
            dongTho: "Động thổ",
            khaiTruong: "Khai trương", 
            nhapTrach: "Nhập trạch",
            khoiHanh: "Khởi hành",
            damCuoi: "Đám cưới",
            anTang: "An táng",
            khamBenh: "Khám bệnh",
            kyHopDong: "Ký hợp đồng"
        };

        // Tạo header với thông tin tổng quan
        let html = `
            <div class="enhanced-results">
                <div class="results-header">
                    <h2><i class="fas fa-calendar-check"></i> Kết Quả Xem Ngày Chi Tiết</h2>
                    <div class="results-actions">
                        <button class="btn-secondary" onclick="goodDayApp.exportResults()">
                            <i class="fas fa-download"></i> Xuất kết quả
                        </button>
                        <button class="btn-secondary" onclick="goodDayApp.shareResults()">
                            <i class="fas fa-share"></i> Chia sẻ
                        </button>
                    </div>
                </div>
                
                <div class="summary-section">
                    <h3>📊 Thông Tin Tổng Quan</h3>
                    <div class="personal-info">
                        <div class="info-row">
                            <span class="label">Họ tên:</span>
                            <span class="value">${formData.fullName}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Năm sinh:</span>
                            <span class="value">${formData.birthYear} (${this.lunarCalendar.getYearCanChi(formData.birthYear).canChi} - ${this.lunarCalendar.getYearCanChi(formData.birthYear).zodiac})</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Mệnh:</span>
                            <span class="value">${this.calculator.personalitySystem.birthYearElements[formData.birthYear]?.primary || 'Không xác định'}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Sự kiện:</span>
                            <span class="value">${eventNames[formData.eventType]}</span>
                        </div>
                    </div>
                    
                    <div class="summary-stats">
                        <div class="stat-item excellent">
                            <span class="stat-number">${stats.excellent}</span>
                            <span class="stat-label">Đại cát</span>
                        </div>
                        <div class="stat-item good">
                            <span class="stat-number">${stats.good}</span>
                            <span class="stat-label">Tốt</span>
                        </div>
                        <div class="stat-item neutral">
                            <span class="stat-number">${stats.neutral}</span>
                            <span class="stat-label">Bình thường</span>
                        </div>
                        <div class="stat-item bad">
                            <span class="stat-number">${stats.bad}</span>
                            <span class="stat-label">Không tốt</span>
                        </div>
                        <div class="stat-item terrible">
                            <span class="stat-number">${stats.terrible}</span>
                            <span class="stat-label">Đại hung</span>
                        </div>
                    </div>
                    
                    <div class="overall-recommendation">
                        <i class="fas fa-lightbulb"></i>
                        <strong>Khuyến nghị:</strong> ${stats.recommendation}
                    </div>
                </div>

                <div class="tabs-container">
                    <div class="tabs">
                        <button class="tab-button active" data-tab="calendar">📅 Lịch ngày tốt</button>
                        <button class="tab-button" data-tab="top-days">⭐ Ngày đề xuất</button>
                        <button class="tab-button" data-tab="analysis">📈 Phân tích chi tiết</button>
                        <button class="tab-button" data-tab="recommendations">💡 Lời khuyên</button>
                    </div>
                    
                    <div class="tab-content">
                        <div class="tab-panel active" id="calendar-panel">
                            ${this.generateCalendarView(results, formData)}
                        </div>
                        
                        <div class="tab-panel" id="top-days-panel">
                            ${this.generateTopDaysView(results.slice(0, 10))}
                        </div>
                        
                        <div class="tab-panel" id="analysis-panel">
                            ${this.generateAnalysisView(results, stats, formData)}
                        </div>
                        
                        <div class="tab-panel" id="recommendations-panel">
                            ${this.generateRecommendationsView(results, formData)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        resultSection.innerHTML = html;
        resultSection.style.display = 'block';
        
        // Bind tab events
        this.bindTabEvents();
        
        // Smooth scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
        
        // Thêm animations
        this.animateResults();
    }

    // Tạo view lịch
    generateCalendarView(results, formData) {
        // Nhóm kết quả theo tháng
        const monthGroups = {};
        results.forEach(result => {
            const monthKey = `${result.solarDate.month}-${result.solarDate.year}`;
            if (!monthGroups[monthKey]) {
                monthGroups[monthKey] = [];
            }
            monthGroups[monthKey].push(result);
        });

        let html = '<div class="calendar-view">';
        
        Object.keys(monthGroups).forEach(monthKey => {
            const [month, year] = monthKey.split('-');
            const monthResults = monthGroups[monthKey];
            
            html += `
                <div class="month-calendar">
                    <h4>Tháng ${month}/${year}</h4>
                    <div class="calendar-grid">
            `;
            
            monthResults.forEach(result => {
                const categoryClass = this.getCategoryClass(result.category);
                html += `
                    <div class="calendar-day ${categoryClass}" 
                         data-score="${result.score}"
                         data-tooltip="${result.advice}">
                        <div class="day-number">${result.solarDate.day}</div>
                        <div class="day-lunar">${result.lunarInfo.lunar.day}/${result.lunarInfo.lunar.month}</div>
                        <div class="day-score">${result.score}</div>
                        <div class="day-quality">${result.quality}</div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    // Tạo view top ngày
    generateTopDaysView(topResults) {
        let html = '<div class="top-days-view">';
        
        topResults.forEach((result, index) => {
            const categoryClass = this.getCategoryClass(result.category);
            const rankIcon = index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`;
            
            html += `
                <div class="top-day-card ${categoryClass}">
                    <div class="rank">${rankIcon}</div>
                    <div class="day-main-info">
                        <div class="solar-date">
                            <strong>${result.solarDate.day}/${result.solarDate.month}/${result.solarDate.year}</strong>
                            <span class="weekday">(${result.solarDate.weekday})</span>
                        </div>
                        <div class="lunar-date">AL: ${result.lunarInfo.lunar.dateString}</div>
                        <div class="canchi">Can Chi: ${result.lunarInfo.canChi.day.canChi}</div>
                    </div>
                    <div class="day-score-info">
                        <div class="score-circle ${categoryClass}">
                            <span class="score-value">${result.score}</span>
                            <span class="score-label">điểm</span>
                        </div>
                        <div class="quality-badge ${categoryClass}">${result.quality}</div>
                    </div>
                    <div class="day-details">
                        <div class="constellation">28 Su: ${result.lunarInfo.constellation.name}</div>
                        <div class="element">Mệnh ngày: ${result.lunarInfo.elements.dayElement}</div>
                        ${result.advancedInfo ? this.generateAdvancedInfoSummary(result.advancedInfo) : ''}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    // Tạo view phân tích
    generateAnalysisView(results, stats, formData) {
        const personElement = this.calculator.personalitySystem.birthYearElements[formData.birthYear]?.primary;
        
        return `
            <div class="analysis-view">
                <div class="analysis-section">
                    <h4>📊 Phân tích thống kê</h4>
                    <div class="chart-container">
                        <canvas id="scoreChart" width="400" height="200"></canvas>
                    </div>
                    <div class="stats-details">
                        <p><strong>Điểm trung bình:</strong> ${stats.averageScore}/100</p>
                        <p><strong>Ngày tốt nhất:</strong> ${stats.bestDay.solarDate.day}/${stats.bestDay.solarDate.month}/${stats.bestDay.solarDate.year} (${stats.bestDay.score} điểm)</p>
                        <p><strong>Tỷ lệ ngày tốt:</strong> ${Math.round((stats.excellent + stats.good) / stats.total * 100)}%</p>
                    </div>
                </div>
                
                <div class="analysis-section">
                    <h4>🔮 Phân tích mệnh lý</h4>
                    <div class="destiny-analysis">
                        <p><strong>Mệnh của bạn:</strong> ${personElement}</p>
                        <p><strong>Màu may mắn:</strong> ${this.calculator.colorSystem.elementColors[personElement]?.join(', ') || 'Không xác định'}</p>
                        <p><strong>Con giáp:</strong> ${this.lunarCalendar.getYearCanChi(formData.birthYear).zodiac}</p>
                        <div class="element-compatibility">
                            <h5>Tương hợp ngũ hành:</h5>
                            ${this.generateElementCompatibilityChart(personElement)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Tạo view khuyến nghị
    generateRecommendationsView(results, formData) {
        const bestDays = results.filter(r => r.category === 'excellent' || r.category === 'good').slice(0, 5);
        
        let html = `
            <div class="recommendations-view">
                <div class="recommendation-section">
                    <h4>🎯 Khuyến nghị ngày tốt</h4>
                    <div class="recommended-days">
        `;
        
        bestDays.forEach(day => {
            if (day.advancedInfo) {
                html += `
                    <div class="recommended-day">
                        <div class="day-header">
                            <strong>${day.solarDate.day}/${day.solarDate.month}/${day.solarDate.year}</strong>
                            <span class="score-badge ${this.getCategoryClass(day.category)}">${day.score} điểm</span>
                        </div>
                        
                        <div class="day-recommendations">
                            <div class="time-rec">
                                <strong>⏰ Giờ tốt:</strong>
                                ${day.advancedInfo.hours.best.map(h => `${h.hour} (${h.time})`).join(', ')}
                            </div>
                            
                            <div class="direction-rec">
                                <strong>🧭 Hướng tốt:</strong>
                                ${day.advancedInfo.directions.slice(0, 3).map(d => d.direction).join(', ')}
                            </div>
                            
                            <div class="color-rec">
                                <strong>🎨 Màu may mắn:</strong>
                                ${day.advancedInfo.colors.primary.slice(0, 3).join(', ')}
                            </div>
                            
                            ${day.advancedInfo.specialAdvice.length > 0 ? `
                                <div class="special-advice">
                                    <strong>💡 Lời khuyên:</strong>
                                    <ul>
                                        ${day.advancedInfo.specialAdvice.slice(0, 2).map(advice => `<li>${advice}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }
        });
        
        html += `
                    </div>
                </div>
                
                <div class="recommendation-section">
                    <h4>⚠️ Lưu ý quan trọng</h4>
                    <div class="important-notes">
                        <ul>
                            <li>Kết quả chỉ mang tính chất tham khảo dựa trên phong thủy truyền thống</li>
                            <li>Nên kết hợp với điều kiện thực tế và ý kiến chuyên gia</li>
                            <li>Ngày có điểm số từ 75 trở lên được coi là rất tốt</li>
                            <li>Tránh các ngày có điểm số dưới 35</li>
                            <li>Thời gian tốt nhất trong ngày được tính theo giờ địa phương</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }

    // Helper functions
    getCategoryClass(category) {
        const classMap = {
            'excellent': 'category-excellent',
            'good': 'category-good', 
            'neutral': 'category-neutral',
            'bad': 'category-bad',
            'terrible': 'category-terrible'
        };
        return classMap[category] || 'category-neutral';
    }

    generateAdvancedInfoSummary(advancedInfo) {
        return `
            <div class="advanced-summary">
                <span class="best-hour">⏰ ${advancedInfo.hours.best[0]?.hour}</span>
                <span class="best-direction">🧭 ${advancedInfo.directions[0]?.direction}</span>
                <span class="lucky-color">🎨 ${advancedInfo.colors.primary[0]}</span>
            </div>
        `;
    }

    generateElementCompatibilityChart(personElement) {
        const compatibility = this.calculator.personalitySystem.birthYearElements.compatibility[personElement];
        if (!compatibility) return '<p>Không có dữ liệu</p>';
        
        return `
            <div class="compatibility-chart">
                <div class="compat-row very-good">
                    <span class="label">Rất tốt:</span>
                    <span class="elements">${compatibility.veryGood.join(', ')}</span>
                </div>
                <div class="compat-row good">
                    <span class="label">Tốt:</span>
                    <span class="elements">${compatibility.good.join(', ')}</span>
                </div>
                <div class="compat-row bad">
                    <span class="label">Không tốt:</span>
                    <span class="elements">${compatibility.bad.join(', ')}</span>
                </div>
            </div>
        `;
    }

    // Bind tab events
    bindTabEvents() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                document.getElementById(`${tabName}-panel`).classList.add('active');
            });
        });
    }

    // Animation effects
    animateResults() {
        const elements = document.querySelectorAll('.enhanced-results .summary-section, .top-day-card, .calendar-day');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-popup';
        tooltip.textContent = text;
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) + 'px';
        tooltip.style.top = rect.top - 10 + 'px';
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);
    }

    hideTooltip() {
        const tooltips = document.querySelectorAll('.tooltip-popup');
        tooltips.forEach(tooltip => {
            tooltip.classList.remove('show');
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        });
    }

    showInfoPopup(title, content) {
        // Implementation for info popup
        console.log(`${title}: ${content}`);
    }

    // Export and sharing functions
    exportResults() {
        // Implementation for exporting results
        this.showSuccess('Tính năng xuất kết quả sẽ được cập nhật sớm!');
    }

    shareResults() {
        // Implementation for sharing results
        if (navigator.share) {
            navigator.share({
                title: 'Kết quả xem ngày tốt',
                text: 'Tôi vừa sử dụng ứng dụng Xem Ngày Tốt để tìm ngày đẹp!',
                url: window.location.href
            });
        } else {
            // Fallback to copy link
            navigator.clipboard.writeText(window.location.href);
            this.showSuccess('Đã copy link chia sẻ!');
        }
    }

    // Rest of the methods from original app.js with enhancements...
    getFormData() {
        return {
            fullName: document.getElementById('fullName').value.trim(),
            birthDay: parseInt(document.getElementById('birthDay').value),
            birthMonth: parseInt(document.getElementById('birthMonth').value),
            birthYear: parseInt(document.getElementById('birthYear').value),
            gender: document.getElementById('gender').value,
            eventType: document.getElementById('eventType').value,
            fromMonth: parseInt(document.getElementById('fromMonth').value),
            fromYear: parseInt(document.getElementById('fromYear').value)
        };
    }

    validateFormData(data) {
        const errors = [];

        if (!data.fullName) {
            errors.push('Vui lòng nhập họ và tên');
        }

        if (!data.birthDay || !data.birthMonth || !data.birthYear) {
            errors.push('Vui lòng chọn đầy đủ ngày tháng năm sinh');
        }

        if (!data.gender) {
            errors.push('Vui lòng chọn giới tính');
        }

        if (!data.eventType) {
            errors.push('Vui lòng chọn loại sự kiện');
        }

        if (!data.fromMonth || !data.fromYear) {
            errors.push('Vui lòng chọn thời gian muốn xem');
        }

        // Validate ngày sinh hợp lệ
        if (data.birthDay && data.birthMonth && data.birthYear) {
            const birthDate = new Date(data.birthYear, data.birthMonth - 1, data.birthDay);
            if (birthDate.getDate() !== data.birthDay) {
                errors.push('Ngày sinh không hợp lệ');
            }
        }

        if (errors.length > 0) {
            this.showError(errors.join('\n'));
            return false;
        }

        return true;
    }

    validateInput(input) {
        input.classList.remove('error');
        
        if (input.hasAttribute('required') && !input.value) {
            input.classList.add('error');
        }
    }

    updatePersonalInfo(input) {
        // Real-time updates for personal info display
        // Implementation for live preview
    }

    showLoading() {
        const resultSection = document.getElementById('resultSection');
        resultSection.style.display = 'block';
        resultSection.innerHTML = `
            <div class="enhanced-loading">
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <h3>Đang tính toán ngày tốt cho bạn...</h3>
                <p>Vui lòng chờ trong giây lát</p>
            </div>
        `;
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    hideLoading() {
        // Loading sẽ được thay thế bởi kết quả
    }

    showError(message, error = null) {
        const resultSection = document.getElementById('resultSection');
        resultSection.innerHTML = `
            <div class="enhanced-error">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Có lỗi xảy ra</h3>
                <div class="error-message">${message.replace(/\n/g, '<br>')}</div>
                <button class="btn-primary" onclick="location.reload()">
                    <i class="fas fa-refresh"></i> Thử lại
                </button>
            </div>
        `;
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    showSuccess(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    saveRecentSearch(formData, results) {
        const searchData = {
            formData,
            timestamp: Date.now(),
            resultCount: results.length,
            bestScore: results[0]?.score || 0
        };
        
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        recentSearches.unshift(searchData);
        recentSearches = recentSearches.slice(0, 10); // Giữ 10 tìm kiếm gần nhất
        
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }

    saveUserSettings() {
        const formData = this.getFormData();
        localStorage.setItem('userSettings', JSON.stringify(formData));
        this.showSuccess('Đã lưu cài đặt!');
    }

    loadUserSettings() {
        const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        
        Object.keys(settings).forEach(key => {
            const element = document.getElementById(key);
            if (element && settings[key]) {
                element.value = settings[key];
            }
        });
    }
}

// Khởi tạo ứng dụng nâng cấp khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra browser support
    if (!window.Promise || !window.Map) {
        alert('Trình duyệt của bạn không được hỗ trợ. Vui lòng sử dụng Chrome, Firefox, Safari hoặc Edge phiên bản mới.');
        return;
    }
    
    window.goodDayApp = new EnhancedGoodDayApp();
    console.log('✅ Ứng dụng Xem Ngày Tốt Nâng Cấp đã sẵn sàng!');
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    if (window.goodDayApp) {
        window.goodDayApp.showError('Có lỗi không mong muốn xảy ra. Vui lòng tải lại trang.');
    }
});

// Service Worker registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}