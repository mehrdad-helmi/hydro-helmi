# Hydro Helmi

> A minimalistic and professional groundwater well logging and aquifer data
> management app.

Hydro Helmi provides a clean, technical UI for engineers and researchers to
record, visualize, and manage well construction data, aquifer layers, and
related hydrological information.

---

## ✨ Features

* 📑 **Well Form Management** – Create and edit detailed forms for drilling
	company, well owner, depth, casing, screen, and more.
* 🌊 **Aquifer Visualization** – Cross-section diagrams of wells and aquifer
	layers.
* 🔍 **Search & Filter** – Quickly find wells by location, depth, or owner.
* 📊 **Data Export** – Export reports and well logs in multiple formats (PDF,
	CSV).

---

## 🛠 Tech Stack

* **Frontend**: React + TypeScript + TailwindCSS
* **State Management**: React Query / Context API
* **UI/UX**: Custom acrylic-style components
* **Database (server-less)**: Supabase
* **Deployment**: Vercel

---

## 📦 Installation

Clone the repository:

```
git clone https://github.com/your-username/hydro-helmi.git
cd hydro-helmi
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Build for production:

```
npm run build
```

Preview production build:

```
npm run preview
```

---

## 📂 Project Structure

```
hydro-helmi/
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main pages (Dashboard, Form, Viewer)
│   ├── assets/         # Fonts, images, icons
│   ├── styles/         # Global styles & Tailwind config
│   └── utils/          # Helper functions
│
│── public/             # Static assets
│── package.json
│── tsconfig.json
│── tailwind.config.js
│── README.md
```

---

## 🚀 Usage

1. Open the app in your browser (default: `http://localhost:4242/`).
2. Navigate to **New Well Form** to add a well entry.
3. Use the **Visualizer** to view aquifer cross-sections.
4. Export reports as PDF/CSV from the dashboard.

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use, modify,
and distribute.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR if you'd like to
improve Hydro Helmi.

---

## 👨‍💻 Author

Developed with ❤️ by **Mehrdad**
