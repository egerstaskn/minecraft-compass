# Product Requirements Document (PRD)

## Proje Adı
Minecraft Compass Web Uygulaması

## Amaç
Minecraft oyunundaki pusulayı görsel olarak bir web sitesinde göstermek. Mobil cihazlarda site açıldığında, cihazın yönelim sensörlerini kullanarak gerçek kuzey yönünü göstermek. Kullanıcı ekrana tıkladığında, o anki yön referans alınacak ve pusula bu referansa göre yön gösterecek.

---

## Hedef Kitle
- Minecraft oyuncuları
- Oyun içi yön bulma deneyimini gerçek dünyada yaşamak isteyenler
- Mobil cihaz kullanıcıları

---

## Temel Özellikler

### 1. Görsel Pusula
- Minecraft’taki pusulaya benzer bir görsel arayüz.
- Pusula iğnesi gerçek kuzeyi gösterecek şekilde dönecek.

### 2. Cihaz Sensörleri ile Yön Algılama
- Mobil cihazlarda, cihazın pusula (magnetometre) ve/veya ivmeölçer sensörlerini kullanarak gerçek zamanlı yön bilgisi alınacak.
- Pusula iğnesi, kullanıcının tuttuğu yöne göre dönecek.

### 3. Referans Yön Belirleme
- Kullanıcı ekrana (veya bir butona) tıkladığında, o anki yön referans olarak kaydedilecek.
- Bundan sonra pusula, bu referans yönüne göre “seçili yön”ü gösterecek (örneğin, kullanıcı tıkladığında o anki yön “hedef” olarak işaretlenecek ve pusula bu hedefe göre yön gösterecek).

### 4. Duyarlı (Responsive) Tasarım
- Uygulama hem masaüstü hem de mobil cihazlarda düzgün çalışacak.
- Mobilde tam ekran ve dokunmatik uyumlu olacak.

---

## Teknik Gereksinimler

- **Frontend:** HTML, CSS, JavaScript (veya bir framework, ör. React, opsiyonel)
- **Sensör Erişimi:** JavaScript ile `DeviceOrientationEvent` ve/veya `DeviceMotionEvent` API’leri kullanılacak.
- **Görsel:** Minecraft pusulasına benzer SVG veya PNG kullanılacak.
- **Sunucu:** Statik site olarak barındırılabilir (ör. GitHub Pages, Vercel, Netlify).

---

## Kullanıcı Akışı

1. Kullanıcı siteyi açar.
2. Pusula görseli ekranda görünür.
3. Mobilde, cihazın yönüne göre pusula iğnesi döner.
4. Kullanıcı ekrana tıkladığında, o anki yön referans olarak alınır.
5. Pusula, bu referans yönüne göre “hedef” yönü gösterir.
6. Kullanıcı tekrar tıklarsa yeni referans yön belirlenir.

---

## Ek Özellikler (Opsiyonel)

- Hedef yön ile gerçek kuzey arasındaki açı/mesafe gösterimi
- Minecraft temalı arka plan veya ses efektleri
- Hedef yönü sıfırlama butonu

---

## Başarı Kriterleri

- Pusula görseli Minecraft’a benzer ve düzgün çalışıyor.
- Mobilde cihazın yönüne göre pusula iğnesi gerçek zamanlı dönüyor.
- Kullanıcı referans yönü kolayca belirleyebiliyor ve pusula buna göre güncelleniyor.
- Uygulama tüm modern mobil tarayıcılarda sorunsuz çalışıyor.
