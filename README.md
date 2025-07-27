# Staalplatform

Een moderne web applicatie gebouwd met React, Express, en Supabase.

## 🚀 Tech Stack

### Frontend
- **React 19.1.0** - Moderne React met hooks
- **Vite 7.0.4** - Snelle build tool en dev server
- **React Router DOM 7.7.1** - Client-side routing
- **TailwindCSS 4.1.11** - Utility-first CSS framework
- **Lucide React 0.526.0** - Icon library
- **PostCSS + Autoprefixer** - CSS processing
- **TypeScript** - Type safety

### Backend
- **Node.js + Express 5.1.0** - Server framework
- **Supabase 2.49.4** - Database en authenticatie
- **OpenAI 5.3.0** - AI/LLM integratie
- **Resend 4.5.1** - Email service
- **CORS 2.8.5** - Cross-origin requests
- **Dotenv 16.5.0** - Environment variables

## 📁 Project Structuur

```
Staalplatform/
├── Frontend/
│   ├── src/
│   │   ├── components/     # Herbruikbare componenten
│   │   ├── pages/         # Page componenten
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functies
│   │   ├── App.tsx        # Hoofdcomponent
│   │   └── index.css      # Global styles + Tailwind
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
└── Backend/
    ├── index.js           # Express server
    ├── package.json
    ├── utils/             # Backend utilities
    └── env.example        # Environment variables template
```

## 🛠️ Setup Instructies

### 1. Frontend Setup

```bash
cd Frontend
npm install
```

Maak een `.env` bestand aan in de Frontend directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3001
```

Start de development server:
```bash
npm run dev
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Maak een `.env` bestand aan in de Backend directory:
```env
PORT=3001
FRONTEND_URL=http://localhost:5173

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_key

# Resend
RESEND_API_KEY=your_resend_key
```

Start de development server:
```bash
npm run dev
```

## 🎨 Styling & UI

- **Custom CSS variables** voor kleurenschema
- **Responsive design** met Tailwind breakpoints
- **Component-based styling** met `@layer components`
- **Custom button classes** (`.btn`, `.btn-primary`, etc.)

## 🛠️ Development Tools

- **ESLint 9.30.1** - Code linting
- **TypeScript** types voor React
- **Vite plugins** (React, SVGR)
- **Hot reload** en development server

## 📊 API Endpoints

- `GET /health` - Health check
- `GET /api/test` - Test endpoint

## 🚀 Deployment

- **Frontend**: Render (niet Netlify)
- **Backend**: Render (Express server)
- **Database**: Supabase (PostgreSQL)

## 💡 Best Practices

- Functionele React componenten
- Controlled forms met `preventDefault()`
- Supabase voor auth + database
- Tailwind voor responsive design
- Environment variables voor secrets
- CORS configuratie voor API calls
- Semantic HTML structuur

## 🔧 Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm run lint` - Run ESLint
- `npm run preview` - Preview build

### Backend
- `npm run dev` - Start development server met watch
- `npm start` - Start productie server

## 📝 Volgende Stappen

1. Configureer Supabase project
2. Voeg authenticatie toe
3. Maak database schema
4. Implementeer API endpoints
5. Voeg React Router toe
6. Maak page componenten
7. Implementeer form handling
8. Voeg error handling toe 