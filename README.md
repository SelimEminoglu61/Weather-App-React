# 🌦️ Weather App (React + Vite)

Modern, kullanıcı dostu bir hava durumu uygulaması. React ve Vite kullanılarak geliştirilmiş, performans ve kullanıcı deneyimi odaklıdır.

---

## 🚀 Canlı Demo

👉 [https://weather-app-react-1-self.vercel.app/](https://weather-app-react-1-self.vercel.app/)

---

## 🧠 Proje Amacı

Bu proje, sadece API’den veri çekmek yerine:

* Performans optimizasyonu
* Kullanıcı deneyimi (UX)
* Modern UI tasarımı

konularında pratik yapmak amacıyla geliştirilmiştir.

---

## ⚙️ Kullanılan Teknolojiler

* React
* Vite
* CSS (Custom styling)
* OpenWeather API

---

## ✨ Özellikler

### 🔍 Şehir Arama

* Anlık arama (debounce ile optimize edildi)
* Gereksiz API çağrıları engellendi

### ⚡ Performans

* Debounce kullanımı
* AbortController ile eski isteklerin iptali
* React.memo ile gereksiz render optimizasyonu

### ⭐ Favori Şehirler

* Favori ekleme / çıkarma
* Sidebar üzerinden hızlı erişim
* LocalStorage ile kalıcılık

### 🕘 Recent Searches

* Son aranan şehirleri listeleme
* Tekrar seçim kolaylığı

### 🎨 UI / UX

* Dark / Light tema
* Glassmorphism kart tasarımı (blur + transparency)
* Hover efektleri ve animasyonlar
* Fade-in geçişler

### 💾 Kalıcılık

* Theme ve favoriler localStorage ile saklanır

---

## 📦 Kurulum

Projeyi lokal ortamda çalıştırmak için:

```bash
npm install
npm run dev
```

Build almak için:

```bash
npm run build
npm run preview
```

---

## 🔐 Environment Variables

API key için `.env` dosyası oluştur:

```env
VITE_API_KEY=your_api_key
```

---

## 📁 Proje Yapısı (özet)

```
src/
 ├── components/
 │    ├── WeatherCard.jsx
 │    ├── FavoritesCities.jsx
 │
 ├── hooks/
 │    ├── useDebounce.js
 │    ├── useFetch.js
 │
 ├── pages/
 │    └── MainPage.jsx
```

---

## 🚀 Deploy

Proje Vercel üzerinden deploy edilmiştir.

---

## 🧩 Geliştirme Fikirleri (V2)

* Responsive iyileştirmeler
* Hava durumuna göre dinamik arka plan
* Animasyonların geliştirilmesi
* Daha detaylı hava bilgisi (hourly / weekly)

---

## 👨‍💻 Geliştirici

Selim

---

## ⭐ Not

Bu proje, frontend geliştirme sürecimde öğrendiklerimi uyguladığım önemli bir adımdır. Geri bildirimlere açığım 🙌

