// ==================== 管理者页面专属功能 ====================

// 覆盖用户页面的渲染函数，添加管理功能

// 重新定义渲染公告函数（带删除按钮）
function renderAnnouncements() {
    const container = document.getElementById('announcements-container');
    const countElement = document.getElementById('announcement-count');
    
    if (countElement) {
        countElement.textContent = announcements.length;
    }
    
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
            <div class="admin-actions">
                <button class="edit-btn uiverse-btn uiverse-btn-sm" onclick="editAnnouncement(${announcement.id})">编辑</button>
                <button class="delete-btn uiverse-btn uiverse-btn-sm" onclick="deleteAnnouncement(${announcement.id})">删除</button>
            </div>
        </div>
    `).join('');
}

// 编辑公告
function editAnnouncement(id) {
    const announcement = announcements.find(a => a.id === id);
    if (!announcement) return;
    
    document.getElementById('announcement-title').value = announcement.title;
    document.getElementById('announcement-content').value = announcement.content;
    document.getElementById('announcement-priority').value = announcement.priority;
    
    // 删除旧公告
    announcements = announcements.filter(a => a.id !== id);
    saveAnnouncements();
    renderAnnouncements();
    
    alert('请修改后重新发布公告');
}

// 重新定义渲染开发者数据函数（带编辑和删除按钮）
function renderDeveloperData(dataToRender = null) {
    const container = document.getElementById('data-container');
    const data = dataToRender || developerData;
    
    // 更新统计数据
    updateDataStats();
    
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
            <div class="admin-actions">
                <button class="edit-btn uiverse-btn uiverse-btn-sm" onclick="editDeveloperData(${item.id})">编辑</button>
                <button class="delete-btn uiverse-btn uiverse-btn-sm" onclick="deleteDeveloperData(${item.id})">删除</button>
            </div>
        </div>
    `).join('');
}

// 编辑开发者数据
function editDeveloperData(id) {
    const data = developerData.find(d => d.id === id);
    if (!data) return;
    
    document.getElementById('data-name').value = data.name;
    document.getElementById('data-category').value = data.category;
    document.getElementById('data-type').value = data.type;
    document.getElementById('data-value').value = data.value;
    document.getElementById('data-description').value = data.description || '';
    
    // 删除旧数据
    developerData = developerData.filter(d => d.id !== id);
    saveDeveloperData();
    renderDeveloperData();
    updateCategoryFilter();
    
    alert('请修改后重新添加数据');
}

// 更新数据统计
function updateDataStats() {
    const totalData = document.getElementById('total-data');
    const totalCategories = document.getElementById('total-categories');
    const totalText = document.getElementById('total-text');
    const totalNumber = document.getElementById('total-number');
    
    if (totalData) {
        totalData.textContent = developerData.length;
    }
    
    if (totalCategories) {
        const categories = new Set(developerData.map(d => d.category));
        totalCategories.textContent = categories.size;
    }
    
    if (totalText) {
        totalText.textContent = developerData.filter(d => d.type === 'text').length;
    }
    
    if (totalNumber) {
        totalNumber.textContent = developerData.filter(d => d.type === 'number').length;
    }
}

// 页面切换功能（管理者页面）
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

// 管理者页面初始化
document.addEventListener('DOMContentLoaded', function() {
    renderAnnouncements();
    renderDeveloperData();
    updateCategoryFilter();
    updateDataStats();
    loadMarketData();
});
