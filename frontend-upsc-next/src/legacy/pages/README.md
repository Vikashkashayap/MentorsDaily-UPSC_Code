# Pages Directory Structure

This directory is organized by user roles and features for better scalability:

## Structure:
```
pages/
├── public/           # Public pages (no authentication required)
│   ├── auth/         # Authentication pages
│   ├── blogs/        # Blog pages
│   ├── courses/      # Course-related pages
│   ├── mentorship/   # Mentorship pages
│   ├── currentAffairs/ # Current affairs pages
│   ├── utils/        # Utility pages (contact, about, etc.)
│   └── ...           # Other public pages
├── admin/            # Admin-only pages
├── user/             # User dashboard pages
└── shared/           # Shared components between roles
```

## Adding New Pages:

### For Public Pages:
1. Create your component in the appropriate subfolder under `public/`
2. Add the route in `src/routes/PublicRoutes.jsx`
3. Add route constant in `src/constants/routesEnum.js` if needed

### For Admin Pages:
1. Create your component in `admin/`
2. Add the route in `src/routes/AdminRoutes.jsx`
3. Add route constant in `src/constants/routesEnum.js`

### For User Pages:
1. Create your component in `user/`
2. Add the route in `src/routes/UserRoutes.jsx`
3. Add route constant in `src/constants/routesEnum.js`

### For Blog Pages:
1. Create your component in `public/blogs/`
2. Add the route in `src/routes/BlogRoutes.jsx`

This structure makes it easy to:
- Find pages by their purpose
- Add new pages without cluttering
- Maintain role-based access control
- Scale the application efficiently