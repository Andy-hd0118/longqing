# 快速部署指南

## 🚀 最简单的方法 - 使用 Netlify Drop（无需注册，30秒完成）

1. **打开网站**：访问 https://app.netlify.com/drop
   
2. **拖拽文件夹**：将 `static` 文件夹直接拖拽到网页上的虚线框内

3. **等待上传**：几秒钟后会自动生成一个网址

4. **获取网址**：你会得到一个类似 `https://xxxxx.netlify.app` 的网址

5. **分享网址**：将这个网址发给任何人，他们就可以在手机上和电脑上访问了！

---

## 📱 本地测试方法

### 方法一：直接打开（最简单）
双击 `index.html` 文件，直接在浏览器中打开

### 方法二：使用 Python（如果已安装）
```bash
cd src/main/resources/static
python -m http.server 8080
```
然后访问：http://localhost:8080

### 方法三：使用 Node.js（如果已安装）
```bash
npm install -g http-server
cd src/main/resources/static
http-server -p 8080
```
然后访问：http://localhost:8080

---

## 🌐 其他免费部署平台

### GitHub Pages
1. 创建 GitHub 账号
2. 新建仓库
3. 上传 static 文件夹内容
4. 开启 Pages 功能
5. 获得网址

### Vercel
1. 访问 https://vercel.com
2. 注册账号
3. 导入项目
4. 自动部署获得网址

### Cloudflare Pages
1. 访问 https://pages.cloudflare.com
2. 注册账号
3. 连接 GitHub 或直接上传
4. 获得网址

---

## ✨ 推荐：Netlify Drop（最快速）

**优势：**
- ✅ 无需注册账号
- ✅ 无需 Git
- ✅ 拖拽即可部署
- ✅ 自动生成 HTTPS 网址
- ✅ 全球 CDN 加速
- ✅ 完全免费
- ✅ 手机电脑都能访问

**步骤：**
1. 访问：https://app.netlify.com/drop
2. 拖拽 `static` 文件夹
3. 获得网址
4. 分享给朋友！

---

## 📝 注意事项

1. **数据独立性**：每个访问者的数据是独立存储在他们自己浏览器的
2. **数据持久化**：数据保存在浏览器 LocalStorage，清除浏览器数据会丢失
3. **跨设备**：不同设备之间数据不共享
4. **隐私安全**：所有数据都存储在用户自己的浏览器中，非常安全

---

## 🎯 使用建议

**个人使用：**
- 直接打开 index.html 文件即可

**分享给他人：**
- 使用 Netlify Drop 部署
- 获得网址后分享给朋友
- 朋友可以在任何设备上访问

**团队协作：**
- 建议使用 GitHub Pages
- 可以版本控制
- 方便更新和维护

---

祝你使用愉快！🎉
