# Profile Page Components Structure

## 📁 File Structure

```
src/profile/
├── page.tsx                          # Main profile page
└── components/
    ├── ProfileNavbar.tsx             # Fixed navigation bar
    ├── ProfileBanner.tsx             # Profile banner image
    ├── ProfileHeader.tsx             # Profile info card
    ├── ProfileActions.tsx            # Action buttons with dropdowns
    ├── ProfessionalJourney.tsx       # Work & education summary
    ├── AboutSection.tsx              # About me & intro video
    ├── ExperienceSection.tsx         # Work experience cards
    ├── EducationSection.tsx          # Education details
    ├── PremiumFeatures.tsx           # Feature showcase
    ├── ActivitySection.tsx           # Posts and activity feed
    ├── SkillsSection.tsx             # Skills listing
    ├── InterestsSection.tsx          # Following/interests
    ├── AnalyticsDashboard.tsx        # Analytics cards
    ├── ProfileProgress.tsx           # Sidebar - Progress tracker
    └── PeopleYouMayKnow.tsx         # Sidebar - Suggestions
```

## 🎨 Component Breakdown

### Main Layout Components

#### 1. **ProfileNavbar.tsx**
- Fixed top navigation
- Props: `profileImage`, `userName`
- Features: Search bar, nav links, dropdown menu

#### 2. **ProfileBanner.tsx**
- Banner image with overlay
- Props: `bannerImage`
- Features: Hover effects, gradient overlay

#### 3. **ProfileHeader.tsx**
- Main profile card with photo and info
- Props: `profileImage`, `name`, `pronouns`, `role`, `company`, `description`, `location`, `followers`, `connections`
- Features: Animated profile pic, location, follower counts

#### 4. **ProfileActions.tsx**
- Four action buttons with expandable content
- No props (manages own state)
- Features: Toggle sections for Open To, Add Profile, Enhance, Resources

### Content Sections

#### 5. **ProfessionalJourney.tsx**
- Timeline-style work/education cards
- No props
- Features: 2-column grid, hover animations

#### 6. **AboutSection.tsx**
- About me text & video placeholder
- No props
- Features: Editable text, highlight functionality

#### 7. **ExperienceSection.tsx**
- Horizontal scrollable experience cards
- No props
- Features: Horizontal scroll, card animations

#### 8. **EducationSection.tsx**
- Education details with specialization
- No props
- Features: Degree badge, tags, icons from lucide-react

#### 9. **PremiumFeatures.tsx**
- 3-column feature showcase
- No props
- Features: Icon animations, gradient effects

#### 10. **ActivitySection.tsx**
- Activity feed with posts
- Props: `posts` (array of post objects)
- Features: Tab navigation, like/comment/share buttons

#### 11. **SkillsSection.tsx**
- Skills listing with progress bars
- No props
- Features: Skill cards, progress visualization

#### 12. **InterestsSection.tsx**
- Following/interests with profile cards
- No props
- Features: Tab navigation, follow buttons, growth badges

#### 13. **AnalyticsDashboard.tsx**
- Analytics cards with metrics
- No props
- Features: 3 metric cards, progress bars, percentage changes

### Sidebar Components

#### 14. **ProfileProgress.tsx**
- Progress tracker for profile completion
- No props
- Features: 3 progress cards with percentages

#### 15. **PeopleYouMayKnow.tsx**
- Connection suggestions
- No props
- Features: Sticky positioning, avatar initials, connect buttons

## 🚀 Usage

### In your `page.tsx`:

```typescript
import ProfileNavbar from './components/ProfileNavbar';
import ProfileBanner from './components/ProfileBanner';
// ... import other components

export default function ProfilePage() {
  const profileData = {
    profileImage: 'your-image-url',
    bannerImage: 'your-banner-url',
    // ... other data
  };

  return (
    <div className="min-h-screen bg-[#f6ede8]">
      <ProfileNavbar 
        profileImage={profileData.profileImage} 
        userName={profileData.userName} 
      />
      
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <ProfileBanner bannerImage={profileData.bannerImage} />
          <ProfileHeader {...profileData} />
          {/* ... other components */}
        </div>

        {/* Sidebar */}
        <div className="w-80">
          <ProfileProgress />
          <PeopleYouMayKnow />
        </div>
      </div>
    </div>
  );
}
```

## 📦 Dependencies

Make sure you have these installed:

```bash
npm install lucide-react
# or
yarn add lucide-react
```

## 🎯 Props Interface

### ActivitySection Props:
```typescript
interface Post {
  text: string;
  image: string;
  likes: number;
  comments: number;
  reposts: number;
  time: string;
}

interface ActivitySectionProps {
  posts: Post[];
}
```

### ProfileHeader Props:
```typescript
interface ProfileHeaderProps {
  profileImage: string;
  name: string;
  pronouns: string;
  role: string;
  company: string;
  description: string;
  location: string;
  followers: number;
  connections: string;
}
```

## 🎨 Design System

### Color Palette:
- Primary: `#4a3728` (Dark Brown)
- Secondary: `#7a5c3e` (Medium Brown)
- Accent: `#8b6f47` (Light Brown)
- Background: `#f6ede8` (Cream)
- Background Alt: `#e0d8cf` (Light Beige)

### Key Features:
- ✅ Fully responsive design
- ✅ Smooth animations & transitions
- ✅ Glassmorphism effects
- ✅ Gradient overlays
- ✅ Hover states on all interactive elements
- ✅ Loading states
- ✅ Protected route with authentication

## 🔧 Customization

### To customize colors:
Replace all instances of:
- `#4a3728` → Your primary color
- `#f6ede8` → Your background color
- Update gradient classes accordingly

### To add more sections:
1. Create a new component in `components/`
2. Import it in `page.tsx`
3. Add it to the main content or sidebar div

## 📱 Responsive Behavior

- **Desktop (>768px)**: Two-column layout (main + sidebar)
- **Tablet**: Stacked layout with full-width sections
- **Mobile**: Optimized single-column view with collapsible navbar

## ⚡ Performance Notes

- All images use lazy loading
- Components are client-side rendered (`'use client'`)
- Animations use CSS transforms for better performance
- Sticky positioning used for navbar and sidebar

## 🐛 Troubleshooting

### If images don't load:
- Check image URLs are correct
- Ensure CORS is configured if using external sources

### If icons don't show:
- Verify `lucide-react` is installed
- Check import paths

### If layout breaks:
- Ensure Tailwind CSS is properly configured
- Check parent container has proper max-width

## 📄 License

MIT - Feel free to use in your projects!