# Basai - Student Accommodation Management System

A comprehensive web platform for students to find and book long-term accommodation near universities and colleges in Kathmandu, Nepal.

## 📋 Project Overview

Basai is a **presentation-ready** student accommodation website designed specifically for students seeking monthly or yearly room rentals near educational institutions in Kathmandu. Unlike traditional hostel booking platforms focused on short-term stays, Basai caters to students who need stable, long-term housing solutions.

### Key Features

- **Student-Focused**: Designed for students looking for accommodation near schools, colleges, and universities
- **Long-Term Rentals**: Monthly and yearly rental options (3 months, 6 months, 1 year, 2 years)
- **Local Payment Integration**: eSewa and Khalti payment options for Nepali users
- **Comprehensive Listings**: Detailed property information with amenities, reviews, and locations
- **Rich User Experience**: Multiple pages with extensive functionality from a user's perspective

## 🗂️ Project Structure

```
basai/
├── index.html              # Landing page with search and featured accommodations
├── about.html              # Company information, team, mission, and vision
├── hostels.html            # Browse page with filters and listings
├── hostel-detail.html      # Detailed property view with gallery and booking
├── booking.html            # Multi-step booking form
├── payment.html            # Payment options (eSewa, Khalti, Card, Bank, Cash)
├── contact.html            # Contact information and form
├── faq.html                # Frequently asked questions with accordion
├── reviews.html            # Student reviews and ratings
├── dashboard.html          # User dashboard with bookings and favorites
├── css/
│   └── main.css           # Complete stylesheet (~4000+ lines)
├── js/
│   ├── main.js            # Core functionality (navigation, search, animations)
│   ├── filters.js         # Browse page filtering and sorting
│   ├── faq.js             # FAQ accordion and category filtering
│   ├── payment.js         # Payment method handling and validation
│   └── booking.js         # Multi-step booking form management
└── images/
    ├── hostels/           # Property images
    ├── avatars/           # User profile pictures
    ├── team/              # Team member photos
    ├── partners/          # Partner organization logos
    ├── payments/          # Payment method logos
    ├── about/             # About page images
    └── reviews/           # Review images
```

## 🎨 Design Features

### Color Scheme
- **Primary**: #2563eb (Blue) - Trust and professionalism
- **Secondary**: #10b981 (Green) - Success and confirmation
- **Accent**: #f59e0b (Orange) - Calls-to-action and highlights
- **Dark**: #1f2937 - Text and headings
- **Light**: #f3f4f6 - Backgrounds and subtle elements

### Typography
- System font stack for optimal readability
- Font Awesome 6.4.0 for icons
- Responsive text scaling

### Layout
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Sticky navigation and sidebars
- Smooth scrolling and animations

## 🚀 Pages Overview

### 1. Landing Page (index.html)
- Hero section with search functionality
- Location, move-in date, duration, and room type filters
- Featured student accommodations (4 properties)
- Why choose Basai section
- Student testimonials
- Call-to-action section

### 2. About Page (about.html)
- Company introduction and story
- Mission and vision statements
- Company history timeline (2020-2026)
- Core values (6 values)
- Team members (4 profiles with social links)
- Statistics section (100+ hostels, 50K+ students)
- Partner organizations

### 3. Browse Accommodations (hostels.html)
- Advanced filter sidebar:
  - Location checkboxes
  - Price range slider (NPR 5,000 - 50,000)
  - Room type (Single, Shared, Dormitory)
  - Amenities (WiFi, Kitchen, Study Room, etc.)
  - Gender preference
  - Rating filter
- Sort options (Popular, Price, Rating)
- 6+ detailed property listings
- Pagination
- Results count

### 4. Property Detail (hostel-detail.html)
- Image gallery (5+ photos)
- Property description and location
- Amenities grid (12+ amenities)
- Room types with pricing (3 options)
- House rules and policies
- Reviews section with ratings
- Google Maps integration
- Booking sidebar with date selection

### 5. Booking Page (booking.html)
- Multi-step form (3 steps):
  1. Guest Information (Name, email, phone, student ID)
  2. Arrival Information (Move-in date, duration, preferences)
  3. Additional Services (Meals, laundry, tours, bike rental)
- Cancellation policy
- Booking summary sidebar
- Price breakdown (base + services + tax + deposit)

### 6. Payment Page (payment.html)
- 5 payment options:
  1. **eSewa**: Mobile wallet payment
  2. **Khalti**: Digital wallet payment
  3. **Credit/Debit Card**: Card payment form
  4. **Bank Transfer**: Account details and receipt upload
  5. **Pay at Hostel**: Cash payment option
- Order summary
- Security notices
- Payment validation

### 7. Contact Page (contact.html)
- Contact methods (Address, Phone, Email, Hours)
- Contact form (Name, Email, Subject, Message)
- Social media links
- Google Maps embed

### 8. FAQ Page (faq.html)
- Category filters (All, Booking, Payment, Policies, Facilities)
- 16 questions with accordion functionality
- Searchable FAQ system
- Organized by topic

### 9. Reviews Page (reviews.html)
- Overall rating statistics (4.7/5.0 from 1,234 reviews)
- Rating distribution bars
- Category ratings (Cleanliness, Location, Value, etc.)
- Filter options (All, Verified, Recent, Highest)
- 6+ detailed review cards
- Student photos and testimonials
- Helpful voting system
- Load more functionality

### 10. Dashboard (dashboard.html)
- User profile section
- Navigation sidebar (8 menu items)
- Quick statistics (4 stat cards)
- Upcoming bookings (2 active bookings)
- Favorite accommodations grid
- Activity timeline
- Personalized recommendations

## 💻 JavaScript Functionality

### main.js - Core Features
- Mobile navigation toggle
- Sticky navbar on scroll
- Search form handling
- Smooth scrolling
- Favorite/wishlist toggle
- Image gallery lightbox
- Notification system
- Form validation
- Review helpful buttons
- Price range slider
- Animation on scroll

### filters.js - Browse Page
- Dynamic filtering system
- Location, price, room type, amenities filters
- Gender preference filtering
- Rating filters
- Sort functionality (Price, Rating, Popular)
- Real-time results update
- Clear filters option
- No results handling

### faq.js - FAQ Management
- Accordion functionality
- Category filtering
- FAQ search
- Text highlighting
- Results count
- No results message
- Deep linking to specific questions

### payment.js - Payment Processing
- Payment method selection
- Form validation per method
- Card number formatting and validation
- Luhn algorithm check
- Card type detection (Visa, Mastercard, etc.)
- File upload preview
- Payment simulation
- Success modal
- Error handling

### booking.js - Booking Management
- Multi-step form navigation
- Step validation
- Real-time form validation
- Email and phone validation
- Service selection
- Dynamic price calculation
- Auto-save form data
- Booking submission
- Session storage management

## 🎯 Target Audience

- **Students** attending universities and colleges in Kathmandu
- **International students** seeking long-term accommodation
- **Local students** moving for higher education
- **Parents** looking for safe housing for their children

## 🏫 Featured Locations

- Near Tribhuvan University (TU)
- Patan Campus, Lalitpur
- Kathmandu University (KU)
- Thamel area
- Boudha area
- Swayambhu area

## 💰 Pricing Structure

- **Monthly Rentals**: NPR 12,000 - 20,000 per month
- **Additional Services**:
  - Meal Plans: NPR 3,000/month
  - Laundry Service: NPR 1,000/month
  - Guided Tours: NPR 2,500/month
  - Bike Rental: NPR 1,500/month
- **Security Deposit**: 1 month's rent (refundable)
- **Tax**: 13% VAT

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: 
  - Custom properties (CSS variables)
  - Flexbox and Grid
  - Transitions and animations
  - Media queries for responsiveness
- **JavaScript (ES6+)**:
  - Classes and modules
  - Event handling
  - DOM manipulation
  - LocalStorage/SessionStorage
  - Form validation
- **Font Awesome 6.4.0**: Icon library
- **Google Maps**: Location embedding

## 📱 Responsive Design

- **Desktop**: Full-featured layout with sidebars
- **Tablet**: Adjusted grid layouts
- **Mobile**: Stacked layout, hamburger navigation, touch-optimized

### Breakpoints
- Large Desktop: 1200px+
- Desktop: 992px - 1199px
- Tablet: 768px - 991px
- Mobile: < 768px

## 🚦 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for presentation mode

### Installation

1. **Clone or download the project**
   ```bash
   cd /your/desired/directory
   cp -r /home/shubham/dev/basai .
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (optional):
     ```bash
     cd basai
     python -m http.server 8000
     # Visit http://localhost:8000
     ```

3. **For development**
   - Open the project folder in VS Code or your preferred editor
   - Use Live Server extension for auto-reload

## 🖼️ Adding Images

The project includes placeholder image references. To add actual images:

1. Navigate to the `images/` directory
2. Add images to the appropriate subdirectories:
   - `hostels/` - Property photos (1200x800px recommended)
   - `avatars/` - Student photos (200x200px)
   - `team/` - Team member photos (400x400px)
   - `partners/` - Partner logos (PNG with transparency)

3. Replace placeholder paths in HTML files or use image services:
   - Unsplash: https://unsplash.com/
   - Pexels: https://pexels.com/
   - Placeholder: https://via.placeholder.com/1200x800

## ⚙️ Customization

### Changing Colors
Edit CSS variables in `css/main.css`:
```css
:root {
    --primary-color: #2563eb;    /* Change primary color */
    --secondary-color: #10b981;  /* Change secondary color */
    --accent-color: #f59e0b;     /* Change accent color */
}
```

### Adding New Properties
Edit `hostels.html` and duplicate a `.hostel-list-item` block with new details.

### Modifying Prices
Update pricing in:
- `index.html` - Featured properties
- `hostels.html` - Browse listings
- `hostel-detail.html` - Room types
- `booking.html` - Service prices

## 📊 Features Summary

### Implemented
✅ 10+ interconnected HTML pages  
✅ Comprehensive CSS styling (~4000+ lines)  
✅ Full JavaScript functionality (5 JS files)  
✅ Responsive mobile design  
✅ Student-focused long-term rentals  
✅ Local payment integration (eSewa, Khalti)  
✅ Multi-step booking process  
✅ Advanced filtering system  
✅ Review and rating system  
✅ User dashboard  
✅ FAQ with search  
✅ Image gallery lightbox  
✅ Form validation  
✅ Animation and transitions  

### Presentation Mode
- All pages are visually complete and functional from a user perspective
- JavaScript provides interactivity and validation
- Forms collect data but don't submit to a backend
- Payment processing is simulated
- No database or server required

## 🔮 Future Enhancements (Not Implemented)

For a fully functional production system, consider adding:
- Backend API (Node.js, Python Django/Flask, PHP)
- Database (MySQL, PostgreSQL, MongoDB)
- User authentication system
- Real payment gateway integration
- Email notifications
- SMS verification
- Admin panel for property management
- Booking calendar with availability
- Chat/messaging system
- Review moderation
- Map-based search
- Mobile app (React Native, Flutter)

## 📝 License

This is a presentation/demonstration project created for showcase purposes.

## 👥 Contact

For questions about this project:
- Email: info@basai.com.np
- Location: Kathmandu, Nepal

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Unsplash/Pexels for stock photo references
- Kathmandu student community for inspiration

---

**Note**: This is a presentation website designed to showcase features and user experience. It is not connected to a backend server or database. All data is static or stored in browser storage (localStorage/sessionStorage).

**Version**: 1.0.0  
**Last Updated**: January 2, 2026  
**Project**: Basai Student Accommodation Management System
