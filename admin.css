// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    loadAdminAnnouncements();
    setupImagePreview();
});

// 设置图片预览
function setupImagePreview() {
    const imageInput = document.getElementById('announcement-image');
    const previewDiv = document.getElementById('image-preview');
    
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    previewDiv.innerHTML = `
                        <img src="${event.target.result}" style="max-width: 200px; max-height: 200px; border-radius: 5px; border: 2px solid #323232;">
                        <p style="color: #666; font-size: 12px; margin-top: 5px;">已选择图片</p>
                    `;
                };
                reader.readAsDataURL(file);
            } else {
                previewDiv.innerHTML = '';
            }
        });
    }
}

// 添加公告
function addAnnouncement() {
    const title = document.getElementById('announcement-title').value;
    const content = document.getElementById('announcement-content').value;
    const priority = document.getElementById('announcement-priority').value;
    const imageInput = document.getElementById('announcement-image');
    
    if (!title || !content) {
        alert('请填写标题和内容');
        return;
    }
    
    // 处理图片
    const processAnnouncement = (imageData) => {
        const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        announcements.unshift({
            id: Date.now(),
            title,
            content,
            priority,
            image: imageData || null,
            time: new Date().toLocaleString('zh-CN'),
            date: new Date().toISOString()
        });
        
        localStorage.setItem('announcements', JSON.stringify(announcements));
        
        // 清空表单
        document.getElementById('announcement-title').value = '';
        document.getElementById('announcement-content').value = '';
        document.getElementById('announcement-priority').value = 'normal';
        imageInput.value = '';
        document.getElementById('image-preview').innerHTML = '';
        
        loadAdminAnnouncements();
        alert('公告发布成功！');
    };
    
    // 如果有图片，转换为Base64
    if (imageInput && imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            processAnnouncement(e.target.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        processAnnouncement(null);
    }
}

// 加载管理端公告列表
function loadAdminAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    const container = document.getElementById('admin-announcements-container');
    
    if (announcements.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">暂无公告</p>';
        return;
    }
    
    container.innerHTML = announcements.map(item => `
        <div class="announcement-item">
            <div>
                <strong>${item.title}</strong>
                ${item.image ? `<br><img src="${item.image}" style="max-width: 150px; max-height: 150px; margin-top: 10px; border-radius: 5px; border: 2px solid #e0e0e0;">` : ''}
                <p style="color: #666; margin-top: 5px;">${item.content.substring(0, 100)}...</p>
                <small style="color: #999;">${new Date(item.date).toLocaleString()} | 优先级: ${item.priority}</small>
            </div>
            <div class="item-actions">
                <button class="delete-btn" onclick="deleteAnnouncement(${item.id})">删除</button>
            </div>
        </div>
    `).join('');
}

// 删除公告
function deleteAnnouncement(id) {
    if (!confirm('确定要删除这条公告吗？')) return;
    
    let announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    announcements = announcements.filter(item => item.id !== id);
    localStorage.setItem('announcements', JSON.stringify(announcements));
    
    loadAdminAnnouncements();
}
