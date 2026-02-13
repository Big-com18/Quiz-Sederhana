# 🧠 Quiz App - React Vite

Project ini adalah aplikasi kuis interaktif berbasis web yang dibangun menggunakan ekosistem modern React dan Vite. Aplikasi ini dirancang untuk mendemonstrasikan pengelolaan state yang efisien, struktur folder yang modular, dan antarmuka yang responsif.

> **ℹ️ Note:** Project ini dikembangkan sebagai bagian dari **Technical Assignment / Internship Program di Dot Indonesia**.

---

## 🚀 Fitur Utama

* **Interactive Quiz Interface**: Transisi soal yang mulus dan responsif.
* **State Management**: Menggunakan Custom Hooks (`useQuiz`) untuk logika permainan.
* **Clean Architecture**: Struktur folder terpisah antara `components`, `hooks`, dan `services`.
* **Result Calculation**: Penghitungan skor otomatis di akhir sesi.

## 🛠️ Teknologi yang Digunakan

* **React JS** (v18+) - Library UI utama.
* **Vite** - Build tool untuk performa pengembangan yang super cepat.
* **JavaScript (ES6+)** - Logika pemrograman.git add .
* **CSS 3** - Styling komponen.

---

## 📂 Struktur Project

Struktur folder disusun agar mudah dikembangkan (scalable):

```bash
src/
├── components/    # Komponen UI (Button, Card, Form)
│   ├── LoginForm.jsx
│   ├── QuestionCard.jsx
│   └── ...
├── hooks/         # Custom Hooks (Logic pemisah)
│   └── useQuiz.js
├── services/      # API Calls / Data handling
│   └── api.js
├── App.jsx        # Root Component
└── main.jsx       # Entry Point


📦 Cara Menjalankan (Installation)
Pastikan Node.js sudah terinstall, lalu jalankan perintah berikut di terminal:

Bash
# 1. Install Dependencies (WAJIB DILAKUKAN)
# Jangan lupa langkah ini agar aplikasi tidak error!
npm install