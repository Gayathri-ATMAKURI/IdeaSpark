# 💡 Idea Spark – AI-Powered Swipe-Based Idea Recommender

**Idea Spark** is a beautiful, swipe-based idea exploration tool that helps users discover and save innovative startup, tech, and content ideas — one card at a time. Inspired by Tinder-style interactions and Stripe-level design polish, this web app was built to **win frontend hackathons** with rich animations, smooth UX, and crisp visuals.


## 🚀 Live Demo

🌐 [View it on Vercel]((https://idea-spark-r4xb.vercel.app/swipe))

---

## 🎯 Features

✅ Swipe left ❌ or right ✅ to like or skip ideas  
✅ View your liked ideas at the end of the session  
✅ Restart the stack and discover more ideas  
✅ Responsive layout for mobile and desktop  
✅ Animated transitions and motion effects  
✅ Supports category-based filtering (coming soon)  
✅ Fun UI with emoji reactions and planned confetti celebration  
✅ Built for frontend hackathon success 🏆  

---

## 🎨 Color Palette

| Element         | Color        | Description            |
|-----------------|--------------|------------------------|
| Background      | `#F6F9FC`    | Soft off-white         |
| Primary Accent  | `#635BFF`    | Stripe Indigo          |
| Secondary       | `#00B8D9`    | Cool Cyan              |
| Highlight Pink  | `#FF5CA2`    | Pop Magenta            |
| Text Main       | `#0A2540`    | Modern Dark Navy       |

---

## 📺 Screens

- **Landing Page** – Animated headline, CTA to “Start Swiping”
- **Swipe Deck** – Central card stack with smooth swipes, reactions, and glowing shadow
- **Results Page** – Grid of liked ideas, with options to restart
- *(Planned)*: Filters, shareable idea lists, AI-powered idea generator

---

## 🛠 Tech Stack

- ⚛️ React + TypeScript (Vite)
- 💨 Tailwind CSS for rapid styling
- 🎴 `react-tinder-card` for swipe interactions
- 🎥 Framer Motion for animations
- 🔄 Zustand or Context API for state
- 🪄 Confetti.js *(coming soon)*
- 🌐 Vercel for deployment

---

## 📁 Folder Structure

/src
├── assets/
├── components/
│ ├── IdeaCard.tsx
│ ├── SwipeDeck.tsx
│ ├── Results.tsx
│ └── FilterBar.tsx
├── pages/
│ ├── Home.tsx
│ └── Swipe.tsx
├── context/
├── data/
└── App.tsx
