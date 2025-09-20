// Main Application JavaScript
// Xử lý giao diện và tương tác người dùng

class GoodDayApp {
    constructor() {
        this.calculator = new GoodDayCalculator();
        this.initializeApp();
    }

    // Khởi tạo ứng dụng
    initializeApp() {
        this.populateSelectOptions();
        this.bindEvents();
        this.showWelcomeMessage();
    }

    // Tạo các option cho select elements
    populateSelectOptions() {
        // Tạo option cho ngày
        const daySelect = document.getElementById('birthDay');
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // Tạo option cho tháng sinh
        const monthSelect = document.getElementById('birthMonth');
        const months = [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ];
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        // Tạo option cho năm sinh (từ 1940 đến 2010)
        const yearSelect = document.getElementById('birthYear');
        const currentYear = new Date().getFullYear();
        for (let year = 1940; year <= 2010; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }

        // Tạo option cho tháng xem (từ tháng hiện tại)
        const fromMonthSelect = document.getElementById('fromMonth');
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = month;
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

    // Gắn kết sự kiện
    bindEvents() {
        const form = document.getElementById('personalForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Validation khi thay đổi input
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.validateInput(input);
            });
        });
    }

    // Hiển thị thông báo chào mừng
    showWelcomeMessage() {
        const now = new Date();
        const lunarInfo = this.calculator.lunarCalendar.getLunarInfo(
            now.getDate(), 
            now.getMonth() + 1, 
            now.getFullYear()
        );
        
        console.log(`Hôm nay là ngày ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`);
        console.log(`Âm lịch: ${lunarInfo.lunarDateString} - ${lunarInfo.canChi}`);
    }

    // Xử lý khi submit form
    async handleFormSubmit() {
        const formData = this.getFormData();
        
        if (!this.validateFormData(formData)) {
            return;
        }

        this.showLoading();

        try {
            const results = this.calculator.findGoodDays(
                formData.fromMonth,
                formData.fromYear,
                formData.eventType,
                {
                    name: formData.fullName,
                    birthYear: formData.birthYear,
                    gender: formData.gender
                }
            );

            this.displayResults(results, formData);
        } catch (error) {
            this.showError('Có lỗi xảy ra khi tính toán. Vui lòng thử lại.');
            console.error('Calculation error:', error);
        } finally {
            this.hideLoading();
        }
    }

    // Lấy dữ liệu từ form
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

    // Validate dữ liệu form
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

    // Validate input individual
    validateInput(input) {
        input.classList.remove('error');
        
        if (input.hasAttribute('required') && !input.value) {
            input.classList.add('error');
        }
    }

    // Hiển thị loading
    showLoading() {
        const resultSection = document.getElementById('resultSection');
        resultSection.style.display = 'block';
        resultSection.innerHTML = `
            <div class="card">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Đang tính toán ngày tốt cho bạn...</p>
                </div>
            </div>
        `;
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Ẩn loading
    hideLoading() {
        // Loading sẽ được thay thế bởi kết quả
    }

    // Hiển thị kết quả
    displayResults(results, formData) {
        const resultSection = document.getElementById('resultSection');
        const stats = this.calculator.getSummaryStats(results);
        
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

        let html = `
            <div class="card">
                <h2><i class="fas fa-calendar-check"></i> Kết Quả Xem Ngày</h2>
                
                <div class="summary-section">
                    <h3>Thông Tin Tổng Quan</h3>
                    <p><strong>Họ tên:</strong> ${formData.fullName}</p>
                    <p><strong>Năm sinh:</strong> ${formData.birthYear} (${this.calculator.lunarCalendar.getCanChi(formData.birthYear)})</p>
                    <p><strong>Mệnh:</strong> ${this.calculator.getPersonDestiny(formData.birthYear)}</p>
                    <p><strong>Sự kiện:</strong> ${eventNames[formData.eventType]}</p>
                    
                    <div class="summary-stats">
                        <div class="stat-item">
                            <span class="stat-number">${stats.good}</span>
                            <span class="stat-label">Ngày tốt</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${stats.neutral}</span>
                            <span class="stat-label">Ngày bình thường</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${stats.bad}</span>
                            <span class="stat-label">Ngày nên tránh</span>
                        </div>
                    </div>
                </div>

                <h3><i class="fas fa-star"></i> Ngày Được Đề Xuất</h3>
                <div class="good-days-grid">
        `;

        // Hiển thị top 20 ngày tốt nhất
        results.slice(0, 20).forEach(day => {
            const solarDateStr = `${day.solarDate.day}/${day.solarDate.month}/${day.solarDate.year}`;
            const lunarDateStr = `${day.lunarDate.day}/${day.lunarDate.month}${day.lunarDate.leap ? ' (nhuận)' : ''}`;
            
            html += `
                <div class="day-card ${day.category}" title="${day.advice}">
                    <div class="day-date">${solarDateStr}</div>
                    <div class="day-lunar">AL: ${lunarDateStr}</div>
                    <div class="day-score">${day.score} điểm - ${day.quality}</div>
                    <div class="day-events">${day.solarDate.weekday}</div>
                </div>
            `;
        });

        html += `
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                    <h4><i class="fas fa-info-circle"></i> Lưu Ý</h4>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Kết quả chỉ mang tính chất tham khảo</li>
                        <li>Nên kết hợp với tình hình thực tế để quyết định</li>
                        <li>Ngày tốt nhất là ngày có điểm số từ 80 trở lên</li>
                        <li>Nên tránh các ngày có điểm dưới 45</li>
                    </ul>
                </div>
            </div>
        `;

        resultSection.innerHTML = html;
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Hiển thị lỗi
    showError(message) {
        const resultSection = document.getElementById('resultSection');
        resultSection.innerHTML = `
            <div class="card">
                <div class="message error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Có lỗi xảy ra:</strong><br>
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
            </div>
        `;
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Hiển thị thành công
    showSuccess(message) {
        const resultSection = document.getElementById('resultSection');
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div class="message success">
                <i class="fas fa-check-circle"></i>
                <div>${message}</div>
            </div>
        `;
        resultSection.prepend(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Khởi tạo ứng dụng khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    window.goodDayApp = new GoodDayApp();
    console.log('✅ Ứng dụng Xem Ngày Tốt đã sẵn sàng!');
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});

// Utility functions
function formatDate(date) {
    return date.toLocaleDateString('vi-VN');
}

function getVietnameseWeekday(date) {
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return weekdays[date.getDay()];
}