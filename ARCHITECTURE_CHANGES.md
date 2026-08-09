# Architectural Changes Plan: Traveler Information & Custom User Fields

We need to make architectural changes to collect additional traveler details and handle multiple travelers per booking.

## Requirement Analysis

1. **User Profile Fields (User details)**:
   - NID Number (`nid_no`) - String
   - Blood Group (`blood_group`) - Enum or String
   - Location / Address (`address` / thikana in Bangla) - Text
   - Emergency Contact (`emergency_contact`) - String

2. **Traveler Booking Information (Airplane-style ticket allocation)**:
   - For every booked seat, we must collect traveler details:
     - Name
     - Phone Number
     - NID Number
     - Blood Group 
     - Location (Address)
     - Emergency Contact
     - Seat Number (tied directly to the traveler)

---

## Technical Options

### Option A: Store Travelers as JSON array on Bookings
We can add a `travelers` JSON column to the `bookings` table.
- **Pros**: Easy to implement, doesn't require new tables.
- **Cons**: Hard to query/index individual traveler details or filter by NID/Phone; poor database design for reporting.

### Option B: Create a `travelers` table (Recommended)
Create a new `travelers` table linked to `bookings`.
- **Fields**:
  - `id`
  - `booking_id` (foreign key)
  - `seat_number` (string, matching the selected seat)
  - `name` (string)
  - `phone` (string)
  - `nid_no` (string, nullable)
  - `blood_group` (string, nullable)
  - `address` (text, nullable)
  - `emergency_contact` (string, nullable)
- **Pros**: Clean normalization, allows querying specific travelers, easy to export/report, highly relational.

---

## Implementation Checklist

### 1. Database Migrations
- Migration 1: Add custom fields (`nid_no`, `blood_group`, `address`, `emergency_contact`) to `users` table.
- Migration 2: Create a `travelers` table to store passenger info associated with seats.

### 2. Models
- Update `User.php` model attributes/fillable/casts.
- Create `Traveler.php` model.
- Add `hasMany` relationship on `Booking` to `Traveler`.
- Update `Booking` logic (maybe keep `seats` array column for legacy compatibility or drop it/derive it from `travelers`). Keeping the JSON `seats` column is beneficial for quick queries, but the source of truth for seats should match. Let's populate both.

### 3. Controller Modifications (`BookingController.php`)
- Validate input for each seat/traveler.
- Populate `travelers` relation when creating a booking.
- Save/update primary traveler's fields on the logged-in user profile too.

### 4. Admin Panel Pages
- Review and update admin booking details page (if any) or export sheets so admins can view traveler lists per booking.

### 5. Frontend Pages
- Update checkout page (`resources/js/pages/Booking/Index.tsx`) to show input forms for all selected seats.
- Allow copying booking user details to first seat traveler details easily.
- Add profile section inputs for NID, Blood Group, Location, Emergency Contact.

---

## Question for the User
Would you prefer:
1. **Option B (separate `travelers` table)** which is cleaner and fully relational? (Recommended)
2. **Option A (JSON on bookings)** to keep the database flat?


##User's answer:
1. option b


###user's addition
1. take nid picture instead of number, nid front and nid back

done
