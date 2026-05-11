/**
 * Firebase 数据同步服务
 * 用于替代 localStorage，实现跨设备数据同步
 */

class FirebaseService {
  constructor() {
    this.db = null;
    this.isInitialized = false;
    this.listeners = {};
  }

  /**
   * 初始化 Firebase
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      // 检查配置是否存在
      if (typeof firebaseConfig === 'undefined' || firebaseConfig.apiKey === 'YOUR_API_KEY') {
        console.warn('Firebase 未配置，将使用 localStorage 作为后备方案');
        this.useLocalStorage = true;
        this.isInitialized = true;
        return;
      }

      // 加载 Firebase SDK
      await this.loadFirebaseSDK();
      
      // 初始化 Firebase
      firebase.initializeApp(firebaseConfig);
      this.db = firebase.database();
      this.useLocalStorage = false;
      this.isInitialized = true;
      
      console.log('Firebase 初始化成功');
    } catch (error) {
      console.error('Firebase 初始化失败:', error);
      this.useLocalStorage = true;
      this.isInitialized = true;
    }
  }

  /**
   * 动态加载 Firebase SDK
   */
  loadFirebaseSDK() {
    return new Promise((resolve, reject) => {
      if (typeof firebase !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
      script.onload = () => {
        const dbScript = document.createElement('script');
        dbScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js';
        dbScript.onload = resolve;
        dbScript.onerror = reject;
        document.head.appendChild(dbScript);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * 获取公告数据
   */
  async getAnnouncements() {
    await this.initialize();

    if (this.useLocalStorage) {
      const data = localStorage.getItem('announcements');
      return data ? JSON.parse(data) : [];
    }

    return new Promise((resolve, reject) => {
      this.db.ref('announcements').once('value')
        .then(snapshot => {
          const data = snapshot.val();
          resolve(data ? Object.values(data).sort((a, b) => b.timestamp - a.timestamp) : []);
        })
        .catch(reject);
    });
  }

  /**
   * 保存公告数据
   */
  async saveAnnouncements(announcements) {
    await this.initialize();

    if (this.useLocalStorage) {
      localStorage.setItem('announcements', JSON.stringify(announcements));
      return;
    }

    // 将数组转换为对象以便 Firebase 存储
    const announcementsObj = {};
    announcements.forEach(announcement => {
      announcementsObj[announcement.id] = {
        ...announcement,
        timestamp: announcement.timestamp || Date.now()
      };
    });

    return this.db.ref('announcements').set(announcementsObj);
  }

  /**
   * 添加公告
   */
  async addAnnouncement(announcement) {
    await this.initialize();

    const announcements = await this.getAnnouncements();
    announcement.timestamp = Date.now();
    announcements.unshift(announcement);
    
    await this.saveAnnouncements(announcements);
    return announcement;
  }

  /**
   * 删除公告
   */
  async deleteAnnouncement(id) {
    await this.initialize();

    if (this.useLocalStorage) {
      let announcements = await this.getAnnouncements();
      announcements = announcements.filter(a => a.id !== id);
      await this.saveAnnouncements(announcements);
      return;
    }

    return this.db.ref(`announcements/${id}`).remove();
  }

  /**
   * 监听公告变化（实时同步）
   */
  async onAnnouncementsChange(callback) {
    await this.initialize();

    if (this.useLocalStorage) {
      // localStorage 不支持实时监听，返回空函数
      return () => {};
    }

    const ref = this.db.ref('announcements');
    
    ref.on('value', snapshot => {
      const data = snapshot.val();
      const announcements = data ? Object.values(data).sort((a, b) => b.timestamp - a.timestamp) : [];
      callback(announcements);
    });

    // 返回取消监听的函数
    return () => ref.off('value');
  }

  /**
   * 获取市场数据
   */
  async getMarketData() {
    await this.initialize();

    if (this.useLocalStorage) {
      const data = localStorage.getItem('marketData');
      return data ? JSON.parse(data) : {};
    }

    return new Promise((resolve, reject) => {
      this.db.ref('marketData').once('value')
        .then(snapshot => {
          resolve(snapshot.val() || {});
        })
        .catch(reject);
    });
  }

  /**
   * 保存市场数据
   */
  async saveMarketData(marketData) {
    await this.initialize();

    if (this.useLocalStorage) {
      localStorage.setItem('marketData', JSON.stringify(marketData));
      return;
    }

    return this.db.ref('marketData').set(marketData);
  }

  /**
   * 获取开发者数据
   */
  async getDeveloperData() {
    await this.initialize();

    if (this.useLocalStorage) {
      const data = localStorage.getItem('developerData');
      return data ? JSON.parse(data) : [];
    }

    return new Promise((resolve, reject) => {
      this.db.ref('developerData').once('value')
        .then(snapshot => {
          const data = snapshot.val();
          resolve(data ? Object.values(data).sort((a, b) => b.timestamp - a.timestamp) : []);
        })
        .catch(reject);
    });
  }

  /**
   * 保存开发者数据
   */
  async saveDeveloperData(developerData) {
    await this.initialize();

    if (this.useLocalStorage) {
      localStorage.setItem('developerData', JSON.stringify(developerData));
      return;
    }

    const dataObj = {};
    developerData.forEach(item => {
      dataObj[item.id] = {
        ...item,
        timestamp: item.timestamp || Date.now()
      };
    });

    return this.db.ref('developerData').set(dataObj);
  }
}

// 创建全局实例
const firebaseService = new FirebaseService();
