# 演唱會視角上傳平台 Look For

提供演唱會資訊、座位視角及場地資訊整合，觀眾可以在購票前先行預覽座位視角；  
提供發放粉絲應援物品資訊彙整專區，可以更好的規畫當天觀看演唱會的時間。  
以臺北流行音樂中心做為主要開發方向

## 主要功能  
* 發佈座位視角
* 各座位視角瀏覽、留言互動
* 交通資訊、附近停車場資訊與剩餘停車位數量
* 演唱會資訊彙整
* 發佈應援物品發放資訊
* 收藏應援物品貼文、發放資訊更動通知

## 使用說明  
1. 點擊 Header 的「北流視角」，選擇區域、排數、位置即可看見該位置視野 (有貼文的排數及位置有標示提醒)
2. 點擊「發佈視角」，選擇要發佈的位置、填入資訊及選擇照片，即可發佈 (若上傳明顯人物照片會進行阻擋)
3. 點擊 Header 的「演唱會資訊」，可以在搜尋欄搜尋地點、演唱會名稱
4. 進入演唱會畫面，點擊應援物發放資訊，點擊發佈資訊即可發文
  
## 開發技術   
**前端**  
&ensp; **React + TypeScript：**  
&ensp; 使用 React 搭配 TypeScript 進行開發，透過型別的檢查機制確保程式碼的穩定性，以提升程式碼品質
  
&ensp; **Styled Components：**  
&ensp; 使用 Styled Components 進行樣式的設計，以元件為單位開發，避免樣式汙染，透過傳入 props 讓樣式有更彈性的變化
  
&ensp; **狀態管理：**
  * 使用 useReducer 管理狀態，如發文、留言資料和畫面的變化。
  * 登入的狀態則使用 useContext 進行全域管理。
  
 &ensp; **custom Hook：**  
&ensp; 將多數頁面會使用到的元件及事件封裝為可重複使用的函數，提高程式的可讀性與元件的可重用性
  
**後端**  
&ensp; **Firebase Authentication：**  
&ensp; 完成註冊、登入與 Google 第三方登入
  
&ensp; **Firestore：**  
&ensp; 儲存座位、文章、留言、演唱會資訊、使用者等資料，完成文章、留言的同步更新
  
&ensp; **Firestorage：**  
&ensp; 儲存使用者發佈視角、應援物及大頭貼的照片  
  
**API串接**   
&ensp; **臺北市停車場資訊、剩餘停車位數：**
  * 透過串接臺北市停車場資訊獲取台北流行音樂中心周邊鄰近停車場資訊
  * 透過停車場資訊內的 ID 取得剩餘停車位數的資訊  

&ensp; **Google Map API：**  
&ensp; 讓使用者可以查看地理位置及標示出停車場所在位置
    
&ensp; **Google Vision API：**  
&ensp; 由於演唱會中禁止拍攝，因此串接 Google Vision API 對使用者上傳視角的照片進行圖片辨識，初步篩選圖片是否符合規範

## 聯繫
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:smexoshinee17@gmail.com)
