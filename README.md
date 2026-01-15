# ⚡ Home Chore Hero - Gamified Family Tasks

**Home Chore Hero** is a stunning, mobile-first web application designed to transform boring household chores into an epic family quest. Motivate your kids, track achievements, and foster a spirit of friendly competition with a live family leaderboard.

![Landing Page Preview](public/preview-landing.png)

## 🌟 Features

- **Multi-Tenant System**: Create your own unique household and manage it independently.
- **Epic Missions**: Define Daily, Weekly, Monthly, or One-time quests with custom point values.
- **Profile Selector**: Optimized for shared devices (like a kitchen tablet). Simply tap a chore and select who completed it.
- **Live Leaderboard**: Watch your family's "Hall of Heroes" update in real-time as missions are completed.
- **Smart Analytics**: Track total points and recent achievements across the entire household.
- **Admin Control**: Parents have full control over members and the chore library.
- **Playful UX**: Built with vibrant colors, smooth animations (Framer Motion), and celebratory confetti!

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+ (App Router), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Next.js API Routes, NextAuth.js (Email/Password), Mongoose.
- **Database**: MongoDB (Atlas or Local).
- **Icons**: Lucide React.
- **Aesthetics**: Custom Outfit Typography and curated HSL color palettes.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/panda437/Housechores.git
   cd Housechores
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Start Questing**:
   Open [http://localhost:3000](http://localhost:3000) and sign up to create your first household!

## 📱 Mobile-First Design

Designed specifically to feel like a native app on mobile and tablets. Perfect for pinning to your home screen or mounting on a central family tablet.

## 🤝 Contributing

Feel free to open issues or submit pull requests to make Home Chore Hero even better!

---
Built with ❤️ for happy households.
