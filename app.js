// ==================== 全局变量和数据存储 ====================
let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
let developerData = JSON.parse(localStorage.getItem('developerData')) || [];

// ==================== 页面切换功能 ====================
function showSection(sectionId) {
    // 隐藏所有section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // 移除所有导航按钮的active状态
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 显示选中的section
    document.getElementById(sectionId).classList.add('active');

    // 添加active状态到对应的按钮
    event.target.classList.add('active');
}

// ==================== 公告功能 ====================
function addAnnouncement() {
    const title = document.getElementById('announcement-title').value.trim();
    const content = document.getElementById('announcement-content').value.trim();
    const priority = document.getElementById('announcement-priority').value;

    if (!title || !content) {
        alert('请填写公告标题和内容！');
        return;
    }

    const announcement = {
        id: Date.now(),
        title: title,
        content: content,
        priority: priority,
        time: new Date().toLocaleString('zh-CN')
    };

    announcements.unshift(announcement);
    saveAnnouncements();
    renderAnnouncements();

    // 清空表单
    document.getElementById('announcement-title').value = '';
    document.getElementById('announcement-content').value = '';
    document.getElementById('announcement-priority').value = 'normal';

    alert('公告发布成功！');
}

function deleteAnnouncement(id) {
    if (confirm('确定要删除这条公告吗？')) {
        announcements = announcements.filter(a => a.id !== id);
        saveAnnouncements();
        renderAnnouncements();
    }
}

function saveAnnouncements() {
    localStorage.setItem('announcements', JSON.stringify(announcements));
}

function renderAnnouncements() {
    const container = document.getElementById('announcements-container');

    if (announcements.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">暂无公告</p>';
        return;
    }

    container.innerHTML = announcements.map(announcement => `
        <div class="announcement-item ${announcement.priority}">
            <div class="announcement-header">
                <div class="announcement-title">${escapeHtml(announcement.title)}</div>
                <div class="announcement-time">${announcement.time}</div>
            </div>
            <div class="announcement-content">${escapeHtml(announcement.content)}</div>
            <span class="priority-badge ${announcement.priority}">
                ${getPriorityText(announcement.priority)}
            </span>
        </div>
    `).join('');
}

function getPriorityText(priority) {
    const map = {
        'normal': '普通',
        'important': '重要',
        'urgent': '紧急'
    };
    return map[priority] || '普通';
}

// ==================== 计算器功能 ====================
let calcExpression = '';

function showCalcTab(tabName) {
    // 隐藏所有计算面板
    document.querySelectorAll('.calc-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // 移除所有标签的active状态
    document.querySelectorAll('.calc-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // 显示选中的面板
    document.getElementById(tabName + '-calc').classList.add('active');

    // 添加active状态到对应的标签
    event.target.classList.add('active');

    // 如果是单位转换器，初始化选项
    if (tabName === 'converter') {
        updateConverter();
    }
}

function appendCalc(value) {
    calcExpression += value;
    document.getElementById('calc-display').value = calcExpression;
}

function clearCalc() {
    calcExpression = '';
    document.getElementById('calc-display').value = '';
}

function calculate() {
    try {
        const result = eval(calcExpression);
        document.getElementById('calc-display').value = result;
        calcExpression = result.toString();
    } catch (error) {
        document.getElementById('calc-display').value = '错误';
        calcExpression = '';
    }
}

// ==================== 统计分析功能 ====================
function calculateStats() {
    const dataStr = document.getElementById('stats-data').value.trim();

    if (!dataStr) {
        alert('请输入数据！');
        return;
    }

    // 解析数据（支持逗号和换行分隔）
    const data = dataStr.split(/[,，\n]/)
        .map(item => parseFloat(item.trim()))
        .filter(item => !isNaN(item));

    if (data.length === 0) {
        alert('没有有效的数字数据！');
        return;
    }

    // 计算统计值
    const count = data.length;
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // 计算中位数
    const sorted = [...data].sort((a, b) => a - b);
    const median = count % 2 === 0
        ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        : sorted[Math.floor(count / 2)];

    // 计算方差和标准差
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    // 显示结果
    const resultsDiv = document.getElementById('stats-results');
    resultsDiv.innerHTML = `
        <h3 style="margin-bottom: 15px; color: #667eea;">统计结果</h3>
        <div class="stat-item">
            <span class="stat-label">数据个数</span>
            <span class="stat-value">${count}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">总和</span>
            <span class="stat-value">${sum.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">平均值</span>
            <span class="stat-value">${mean.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">中位数</span>
            <span class="stat-value">${median.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">最小值</span>
            <span class="stat-value">${min.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">最大值</span>
            <span class="stat-value">${max.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">极差</span>
            <span class="stat-value">${range.toFixed(2)}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">标准差</span>
            <span class="stat-value">${stdDev.toFixed(2)}</span>
        </div>
    `;
}

// ==================== 单位转换功能 ====================
const conversionUnits = {
    length: {
        units: ['米', '千米', '厘米', '毫米', '英里', '码', '英尺', '英寸'],
        toBase: [1, 1000, 0.01, 0.001, 1609.344, 0.9144, 0.3048, 0.0254]
    },
    weight: {
        units: ['千克', '克', '毫克', '吨', '磅', '盎司'],
        toBase: [1, 0.001, 0.000001, 1000, 0.453592, 0.0283495]
    },
    temperature: {
        units: ['摄氏度', '华氏度', '开尔文'],
        special: true
    }
};

function updateConverter() {
    const type = document.getElementById('convert-type').value;
    const fromSelect = document.getElementById('convert-from');
    const toSelect = document.getElementById('convert-to');

    const units = conversionUnits[type].units;

    fromSelect.innerHTML = units.map((unit, i) =>
        `<option value="${i}">${unit}</option>`
    ).join('');

    toSelect.innerHTML = units.map((unit, i) =>
        `<option value="${i}" ${i === 1 ? 'selected' : ''}>${unit}</option>`
    ).join('');
}

function convert() {
    const type = document.getElementById('convert-type').value;
    const value = parseFloat(document.getElementById('convert-value').value);
    const fromIndex = parseInt(document.getElementById('convert-from').value);
    const toIndex = parseInt(document.getElementById('convert-to').value);

    if (isNaN(value)) {
        alert('请输入有效的数值！');
        return;
    }

    let result;

    if (type === 'temperature') {
        result = convertTemperature(value, fromIndex, toIndex);
    } else {
        const config = conversionUnits[type];
        // 转换为基准单位，再转换为目标单位
        const baseValue = value * config.toBase[fromIndex];
        result = baseValue / config.toBase[toIndex];
    }

    document.getElementById('convert-result').value = result.toFixed(4);
}

function convertTemperature(value, from, to) {
    // 先转换为摄氏度
    let celsius;
    if (from === 0) { // 摄氏度
        celsius = value;
    } else if (from === 1) { // 华氏度
        celsius = (value - 32) * 5 / 9;
    } else { // 开尔文
        celsius = value - 273.15;
    }

    // 从摄氏度转换为目标单位
    if (to === 0) { // 摄氏度
        return celsius;
    } else if (to === 1) { // 华氏度
        return celsius * 9 / 5 + 32;
    } else { // 开尔文
        return celsius + 273.15;
    }
}

// ==================== 开发者数据功能 ====================
function addDeveloperData() {
    const name = document.getElementById('data-name').value.trim();
    const category = document.getElementById('data-category').value.trim();
    const type = document.getElementById('data-type').value;
    const value = document.getElementById('data-value').value.trim();
    const description = document.getElementById('data-description').value.trim();

    if (!name || !category || !value) {
        alert('请填写数据名称、分类和值！');
        return;
    }

    const data = {
        id: Date.now(),
        name: name,
        category: category,
        type: type,
        value: value,
        description: description,
        time: new Date().toLocaleString('zh-CN')
    };

    developerData.unshift(data);
    saveDeveloperData();
    renderDeveloperData();
    updateCategoryFilter();

    // 清空表单
    document.getElementById('data-name').value = '';
    document.getElementById('data-category').value = '';
    document.getElementById('data-type').value = 'text';
    document.getElementById('data-value').value = '';
    document.getElementById('data-description').value = '';

    alert('数据添加成功！');
}

function deleteDeveloperData(id) {
    if (confirm('确定要删除这条数据吗？')) {
        developerData = developerData.filter(d => d.id !== id);
        saveDeveloperData();
        renderDeveloperData();
        updateCategoryFilter();
    }
}

function saveDeveloperData() {
    localStorage.setItem('developerData', JSON.stringify(developerData));
}

function renderDeveloperData(dataToRender = null) {
    const container = document.getElementById('data-container');
    const data = dataToRender || developerData;

    if (data.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px; grid-column: 1/-1;">暂无数据</p>';
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="data-card">
            <div class="data-card-header">
                <div>
                    <div class="data-name">${escapeHtml(item.name)}</div>
                    <span class="data-category">${escapeHtml(item.category)}</span>
                    <span class="data-type">${getTypeText(item.type)}</span>
                </div>
            </div>
            <div class="data-value">
                ${formatDataValue(item)}
            </div>
            ${item.description ? `<div class="data-description">${escapeHtml(item.description)}</div>` : ''}
            <div class="data-time">${item.time}</div>
        </div>
    `).join('');
}

function formatDataValue(item) {
    if (item.type === 'link') {
        return `<a href="${escapeHtml(item.value)}" target="_blank">${escapeHtml(item.value)}</a>`;
    }
    return escapeHtml(item.value);
}

function getTypeText(type) {
    const map = {
        'text': '文本',
        'number': '数字',
        'link': '链接'
    };
    return map[type] || '文本';
}

function updateCategoryFilter() {
    const categories = [...new Set(developerData.map(d => d.category))];
    const filterSelect = document.getElementById('filter-category');

    filterSelect.innerHTML = '<option value="">全部分类</option>' +
        categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
}

function filterData() {
    const searchTerm = document.getElementById('search-data').value.toLowerCase();
    const categoryFilter = document.getElementById('filter-category').value;
    const typeFilter = document.getElementById('filter-type').value;

    let filtered = developerData;

    if (searchTerm) {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm) ||
            item.value.toLowerCase().includes(searchTerm) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))
        );
    }

    if (categoryFilter) {
        filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (typeFilter) {
        filtered = filtered.filter(item => item.type === typeFilter);
    }

    renderDeveloperData(filtered);
}

// ==================== 工具函数 ====================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    renderAnnouncements();
    renderDeveloperData();
    updateCategoryFilter();
    updateConverter();
    loadMarketData();
});

// ==================== 宠物收益率计算功能 ====================

// 更新模式专属输入框
function updateYieldInputs() {
    const mode = document.querySelector('input[name="yield-mode"]:checked').value;

    // 隐藏所有模式专属输入框
    document.getElementById('rental-inputs').style.display = 'none';
    document.getElementById('convoy-inputs').style.display = 'none';
    document.getElementById('pvp-inputs').style.display = 'none';

    // 显示选中模式的输入框
    if (mode === 'rental') {
        document.getElementById('rental-inputs').style.display = 'block';
    } else if (mode === 'convoy') {
        document.getElementById('convoy-inputs').style.display = 'block';
    } else if (mode === 'pvp') {
        document.getElementById('pvp-inputs').style.display = 'block';
    }
}

// 计算宠物收益率
function calculatePetYield() {
    // 获取基础数据
    const petPrice = parseFloat(document.getElementById('pet-price').value);
    const goldCupExchange = parseFloat(document.getElementById('gold-cup-exchange').value);
    const goldCupPrice = parseFloat(document.getElementById('gold-cup-price').value);

    // 验证基础数据
    if (!petPrice || !goldCupExchange || !goldCupPrice) {
        alert('请填写宠物价格、金杯兑换灵石数量和金杯单价！');
        return;
    }

    if (petPrice <= 0 || goldCupExchange <= 0 || goldCupPrice <= 0) {
        alert('所有数值必须大于0！');
        return;
    }

    const mode = document.querySelector('input[name="yield-mode"]:checked').value;
    let yieldRate = 0;
    let formula = '';
    let paybackDays = 0;

    if (mode === 'rental') {
        // 出租模式：收益率 = 出租收益灵石数量 / 1金杯可兑换灵石数量 × 金杯价格 / 宠物本体价格
        const rentalIncome = parseFloat(document.getElementById('rental-income').value);

        if (!rentalIncome || rentalIncome <= 0) {
            alert('请输入有效的出租收益灵石数量！');
            return;
        }

        yieldRate = (rentalIncome / goldCupExchange * goldCupPrice) / petPrice;
        formula = `出租收益灵石数量 ÷ 1金杯可兑换灵石数量 × 金杯价格 ÷ 宠物本体价格<br>${rentalIncome} ÷ ${goldCupExchange} × ${goldCupPrice} ÷ ${petPrice}`;
        paybackDays = 1 / yieldRate;

    } else if (mode === 'convoy') {
        // 发车模式：收益率 = 每只宠物预计一天发车灵石收益 / 1金杯可兑换灵石数量 × 金杯价格 / 宠物本体价格
        const convoyIncome = parseFloat(document.getElementById('convoy-income').value);

        if (!convoyIncome || convoyIncome <= 0) {
            alert('请输入有效的每天发车灵石收益！');
            return;
        }

        yieldRate = (convoyIncome / goldCupExchange * goldCupPrice) / petPrice;
        formula = `每只宠物预计一天发车灵石收益 ÷ 1金杯可兑换灵石数量 × 金杯价格 ÷ 宠物本体价格<br>${convoyIncome} ÷ ${goldCupExchange} × ${goldCupPrice} ÷ ${petPrice}`;
        paybackDays = 1 / yieldRate;

    } else if (mode === 'pvp') {
        // PVP 模式：收益率 = 每日获取金杯数量 × 金杯价格 / 成本
        const pvpCups = parseFloat(document.getElementById('pvp-cups').value);

        if (!pvpCups || pvpCups < 0) {
            alert('请输入有效的掉落金杯数！');
            return;
        }

        yieldRate = (pvpCups * goldCupPrice) / petPrice;
        formula = `每日获取金杯数 × 金杯价格 ÷ 成本<br>${pvpCups} × ${goldCupPrice} ÷ ${petPrice}`;
        paybackDays = yieldRate > 0 ? 1 / yieldRate : Infinity;
    }

    // 显示结果
    displayYieldResult(yieldRate, formula, paybackDays, mode);
}

// 显示收益率结果
function displayYieldResult(yieldRate, formula, paybackDays, mode) {
    const resultDiv = document.getElementById('yield-result');
    const percentageElement = document.getElementById('yield-percentage');
    const formulaElement = document.getElementById('yield-formula');
    const paybackDaysElement = document.getElementById('payback-days');
    const badgeElement = document.getElementById('yield-badge');

    // 转换为百分比
    const percentage = (yieldRate * 100).toFixed(2);

    // 设置收益率显示
    percentageElement.textContent = percentage + '%';

    // 设置公式显示
    formulaElement.innerHTML = formula;

    // 设置回本天数
    if (paybackDays === Infinity || paybackDays <= 0) {
        paybackDaysElement.textContent = '无法回本';
    } else {
        paybackDaysElement.textContent = paybackDays.toFixed(1) + ' 天';
    }

    // 设置评级徽章
    let badgeText = '';
    let badgeClass = '';

    if (yieldRate > 0.02) {
        badgeText = '优秀';
        badgeClass = 'excellent';
    } else if (yieldRate >= 0.015) {
        badgeText = '良好';
        badgeClass = 'good';
    } else {
        badgeText = '一般';
        badgeClass = 'normal';
    }

    badgeElement.textContent = badgeText;
    badgeElement.className = 'result-badge ' + badgeClass;

    // 显示结果区域
    resultDiv.style.display = 'block';

    // 滚动到结果区域
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 清空所有输入数据
function clearAllInputs() {
    // 清空基础输入字段
    document.getElementById('pet-price').value = '';
    document.getElementById('gold-cup-exchange').value = '';
    document.getElementById('gold-cup-price').value = '';

    // 清空模式特定输入字段
    document.getElementById('rental-income').value = '';
    document.getElementById('convoy-income').value = '';
    document.getElementById('pvp-cups').value = '';

    // 隐藏结果区域
    document.getElementById('yield-result').style.display = 'none';
}

// ==================== 市场数据管理功能 ====================

// 加载市场数据
function loadMarketData() {
    const marketData = JSON.parse(localStorage.getItem('marketData')) || {};

    const goldCupPrice = marketData.goldCupPrice || '--';
    const petPrice = marketData.petPrice || '--';
    const goldCupExchange = marketData.goldCupExchange || '--';

    document.getElementById('display-gold-cup-price').textContent = goldCupPrice;
    document.getElementById('display-pet-price').textContent = petPrice;
    document.getElementById('display-gold-cup-exchange').textContent = goldCupExchange;
}

// 切换编辑模式
function toggleMarketDataEdit() {
    const displayDiv = document.getElementById('market-data-display');
    const editDiv = document.getElementById('market-data-edit');

    if (editDiv.style.display === 'none') {
        // 显示编辑表单
        displayDiv.style.display = 'none';
        editDiv.style.display = 'block';

        // 填充当前数据
        const marketData = JSON.parse(localStorage.getItem('marketData')) || {};
        document.getElementById('market-gold-cup-price').value = marketData.goldCupPrice || '';
        document.getElementById('market-pet-price').value = marketData.petPrice || '';
        document.getElementById('market-gold-cup-exchange').value = marketData.goldCupExchange || '';
    } else {
        // 隐藏编辑表单
        displayDiv.style.display = 'grid';
        editDiv.style.display = 'none';
    }
}

// 保存市场数据
function saveMarketData() {
    const goldCupPrice = document.getElementById('market-gold-cup-price').value.trim();
    const petPrice = document.getElementById('market-pet-price').value.trim();
    const goldCupExchange = document.getElementById('market-gold-cup-exchange').value.trim();

    if (!goldCupPrice || !petPrice || !goldCupExchange) {
        alert('请填写所有市场数据！');
        return;
    }

    const marketData = {
        goldCupPrice: parseFloat(goldCupPrice),
        petPrice: parseFloat(petPrice),
        goldCupExchange: parseInt(goldCupExchange),
        updateTime: new Date().toLocaleString('zh-CN')
    };

    localStorage.setItem('marketData', JSON.stringify(marketData));

    // 更新显示
    loadMarketData();

    // 隐藏编辑表单
    toggleMarketDataEdit();

    alert('市场数据保存成功！');
}
