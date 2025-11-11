# EventSphere - Production-Ready Event Management Platform

A modern, scalable event management application built with React, Vite, and Material-UI.

## 🚀 Features

- **Event Management**: Create, view, and manage events
- **User Roles**: Support for Admin, Volunteer, and Visitor roles
- **Authentication**: Secure JWT-based authentication with auto-login
- **Announcements**: Real-time announcement broadcasting
- **Responsive Design**: Mobile-first UI with Material-UI components
- **API Integration**: Centralized API client with automatic error handling

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Self-Lakshh/Eventsphere.git
cd Eventsphere
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and update it with your settings:
```bash
cp .env.example .env
```

Edit `.env` file:
```properties
# API Configuration
VITE_BASE_URL=https://api.eventsphere.nexiotech.cloud/api
VITE_API_KEY=visitor-key
```

### 4. Start the development server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
src/
├── components/              # Reusable React components
│   ├── admin/              # Admin dashboard components
│   ├── auth/               # Authentication components
│   └── visitors/           # Visitor-facing components
├── hooks/                  # Custom React hooks
│   ├── useAuth.js          # Authentication state management
│   └── useLayout.js        # Layout state management
├── layouts/                # Page layouts (Admin, Visitor, Volunteer)
├── lib/
│   └── api.js              # Centralized API client with axios
├── routes/                 # Route definitions for each user role
├── views/                  # Page components
│   ├── admin-view/         # Admin dashboard pages
│   ├── visitor-view/       # Public-facing pages
│   └── volunteer-view/     # Volunteer dashboard pages
├── assets/                 # Static assets
├── App.jsx                 # Main App component
├── main.jsx                # Entry point
└── theme.js                # Material-UI theme configuration
```

## 🔐 API Integration

All API calls are centralized through `src/lib/api.js`:

### Features
- Automatic JWT token injection
- Request/response interceptors
- Automatic 401 redirect on token expiry
- Environment-based configuration

### Usage Example
```javascript
import apiClient from './lib/api';

// GET request
const response = await apiClient.get('/fetch/events');

// POST request
const response = await apiClient.post('/auth/login', credentials);

// DELETE request
await apiClient.delete(`/admin/events/${eventId}`);
```

## 🔑 Environment Variables

Required environment variables in `.env`:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASE_URL` | API base URL with `/api` prefix | `https://api.example.com/api` |
| `VITE_API_KEY` | API authentication key | `visitor-key` |

## 🛡️ Authentication

The app uses JWT-based authentication with:
- **Automatic token injection**: Tokens from cookies are automatically added to request headers
- **Persistent sessions**: Tokens stored in secure cookies with 1-day expiry
- **Auto-login**: Component checks for valid token on mount and auto-logs user in
- **Session timeout**: Invalid tokens automatically clear session and redirect to login

### Login Flow
1. User submits credentials through `/login`
2. API returns JWT token
3. Token stored in secure cookie and localStorage
4. User redirected to dashboard based on role (admin/volunteer)
5. All subsequent requests automatically include token

## ✅ Form Validation

### Login Component
- Email format validation
- Password required validation
- Real-time field error messages

### SignUp Component
- Username minimum 3 characters
- Valid email format
- Password requirements: 8+ chars, 1 uppercase, 1 number, 1 special character

## ⚠️ Error Handling

- API errors are caught and displayed to users
- 401 responses trigger automatic logout
- Loading states prevent duplicate submissions
- Network errors provide helpful messages

## 🎨 Theming

Material-UI theme configuration in `src/theme.js`. Customize colors, typography, and component styles globally.

CSS variables for custom styling:
```css
--primary-color
--secondary-color
--primary-bg-color
--secondary-bg-color
--text-color
--btn-color
--btn-hover-color
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint helpers via `useLayout()` hook
- Adaptive layouts for different screen sizes

## 🚢 Deployment

### Production Build
```bash
npm run build
```

Build output is in `dist/` directory.

### Deployment Checklist
- [ ] Update `.env` with production API URL
- [ ] Verify all hardcoded URLs use environment variables
- [ ] Run `npm run lint` to check code quality
- [ ] Test authentication flow
- [ ] Test error handling with network requests
- [ ] Verify responsive design on mobile devices

### Deployment Platforms

**Vercel** (Recommended for Vite)
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm run build
# Deploy the dist/ folder
```

**Traditional Server**
```bash
npm run build
# Upload dist/ folder to your server
# Configure server to serve index.html for SPA routing
```

## 🔄 API Endpoints Used

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/auto-login` - Validate existing session

### Events
- `GET /fetch/events` - Get all events
- `GET /fetch/events/current` - Get current/upcoming events
- `POST /admin/events` - Create new event (Admin)
- `GET /admin/events` - List all events (Admin)
- `DELETE /admin/events/:id` - Delete event (Admin)

### Announcements
- `GET /fetch/announcements/latest` - Get latest announcements
- `GET /admin/announcements` - List announcements (Admin)
- `POST /admin/announcements` - Create announcement (Admin)
- `DELETE /admin/announcements/:id` - Delete announcement (Admin)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Submit a pull request

## 📝 Code Style

- ESLint configured with React best practices
- Prettier for consistent code formatting
- JSDoc comments for functions and hooks

## 🐛 Troubleshooting

### Token not persisting
- Check if cookies are enabled in browser
- Verify JWT token is being set in response

### API requests failing
- Verify `VITE_BASE_URL` in `.env` is correct
- Check browser console for CORS errors
- Ensure API server is running

### Components not rendering
- Clear browser cache: `Ctrl+Shift+Delete`
- Check console for JavaScript errors
- Verify imports use correct relative paths

## 📞 Support

For issues and questions, create an issue on GitHub or contact the development team.

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

**Last Updated**: November 11, 2025

**Version**: 1.0.0 (Production Ready)
