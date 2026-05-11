// Firebase 配置
// 请按照 FIREBASE_SETUP.md 的说明获取你的 Firebase 配置信息

const firebaseConfig = {
  apiKey: "AIzaSyDO-9CTJITJ-m1ZDYaD_RisZ49su2r0TuA",
  authDomain: "longqing-announcements-2acf6.firebaseapp.com",
  databaseURL: "https://longqing-announcements-2acf6-default-rtdb.firebaseio.com",
  projectId: "longqing-announcements-2acf6",
  storageBucket: "longqing-announcements-2acf6.firebasestorage.app",
  messagingSenderId: "667704774182",
  appId: "1:667704774182:web:ff3604a1294db50c8860e7"
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = firebaseConfig;
}
