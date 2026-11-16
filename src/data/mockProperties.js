// RentConnect Property Categories Constant
export const CATEGORIES = {
  COMMERCIAL: 'Commercial Shop',
  RESIDENTIAL: 'Residential Room / PG',
};

// Sample Property Dataset
export const mockProperties = [
  // --- Commercial Shop Category (Surat Examples) ---
  {
    id: "shop-adajan-01",
    title: "Prime Commercial Shop in Adajan",
    category: CATEGORIES.COMMERCIAL,
    location: "Adajan, Surat",
    rent: 15000,
    availability: "Available for Immediate Move-in",
    description: "Main road facing commercial shop located in a busy market area of Adajan. Ideal for retail stores, electronics, pharmacy, or a boutique showroom. Features heavy foot traffic, wide road frontage, and dedicated customer parking space.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80"
    ],
    details: {
      area: "350 sq.ft",
      furnishing: "Semi-Furnished",
      floor: "Ground Floor",
      suitableFor: "Retail Store, Clinic, Pharmacy, Office",
      availableFor: "All Commercial & Retail Businesses"
    },
    ownerName: "Haresh Patel",
    ownerPhone: "+91 98250 12345",
    owner: {
      name: "Haresh Patel",
      phone: "+91 98250 12345",
      email: "haresh.patel@example.com"
    }
  },
  {
    id: "shop-vesu-02",
    title: "Modern Retail Shop in Vesu",
    category: CATEGORIES.COMMERCIAL,
    location: "Vesu, Surat",
    rent: 12000,
    availability: "Available for Immediate Move-in",
    description: "Compact and modern retail space situated near VIP Road in Vesu. Excellent visibility with dedicated parking space, 24/7 water supply, and easy access to Surat's prime residential hubs.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80"
    ],
    details: {
      area: "280 sq.ft",
      furnishing: "Unfurnished",
      floor: "1st Floor",
      suitableFor: "Boutique, Salon, Studio, Agency",
      availableFor: "Commercial Startups & Small Businesses"
    },
    ownerName: "Pravin Shah",
    ownerPhone: "+91 98980 54321",
    owner: {
      name: "Pravin Shah",
      phone: "+91 98980 54321",
      email: "pravin.shah@example.com"
    }
  },
  {
    id: "shop-citylight-03",
    title: "Premium Corner Shop in City Light",
    category: CATEGORIES.COMMERCIAL,
    location: "City Light, Surat",
    rent: 18000,
    availability: "Available from 1st of Next Month",
    description: "High footfall corner shop in a prestigious commercial complex in City Light. Features wide glass frontage, full commercial interior fit-out, high ceiling, and full power backup.",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80"
    ],
    details: {
      area: "420 sq.ft",
      furnishing: "Fully Furnished",
      floor: "Ground Floor",
      suitableFor: "Showroom, Cafe, Brand Outlet, Jewelers",
      availableFor: "Established Brands & Retailers"
    },
    ownerName: "Rajesh Desai",
    ownerPhone: "+91 98795 67890",
    owner: {
      name: "Rajesh Desai",
      phone: "+91 98795 67890",
      email: "rajesh.desai@example.com"
    }
  },

  // --- Residential Room / PG Category (Surat Examples) ---
  {
    id: "pg-adajan-01",
    title: "Comfortable PG in Adajan",
    category: CATEGORIES.RESIDENTIAL,
    location: "Adajan, Surat",
    rent: 10000,
    availability: "Ready for Immediate Occupancy",
    description: "Fully-managed PG facility with attached washroom, high-speed WiFi, RO drinking water, and wholesome home-style meals included 3 times daily. Located within walking distance to bus stops and markets.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ],
    details: {
      roomType: "Single / Twin PG",
      furnishing: "Fully Furnished",
      amenities: "Meals Included, WiFi, Daily Housekeeping, Geyser, RO Water",
      availableFor: "Students & Working Professionals"
    },
    ownerName: "Sanjay Mehta",
    ownerPhone: "+91 94261 11223",
    owner: {
      name: "Sanjay Mehta",
      phone: "+91 94261 11223",
      email: "sanjay.mehta@example.com"
    }
  },
  {
    id: "room-vesu-02",
    title: "Single Private Room in Vesu",
    category: CATEGORIES.RESIDENTIAL,
    location: "Vesu, Surat",
    rent: 7000,
    availability: "Ready for Immediate Occupancy",
    description: "Private single room in a peaceful residential apartment in Vesu. Comes with a private balcony, wardrobe, bed with mattress, study table, ceiling fan, and access to kitchen facilities.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    details: {
      roomType: "Private Single Room",
      furnishing: "Semi-Furnished",
      amenities: "Private Balcony, Power Backup, Elevator, Parking",
      availableFor: "Bachelors & College Students"
    },
    ownerName: "Kishore Jariwala",
    ownerPhone: "+91 98241 33445",
    owner: {
      name: "Kishore Jariwala",
      phone: "+91 98241 33445",
      email: "kishore.jariwala@example.com"
    }
  },
  {
    id: "room-citylight-03",
    title: "Affordable Shared Room in City Light",
    category: CATEGORIES.RESIDENTIAL,
    location: "City Light, Surat",
    rent: 5500,
    availability: "Ready for Immediate Occupancy",
    description: "Budget-friendly 2-sharing room in prime City Light area, close to colleges, shopping hubs, and public transport. Clean washroom, individual cupboards, study desks, and daily municipal water supply.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ],
    details: {
      roomType: "Double Sharing",
      furnishing: "Fully Furnished",
      amenities: "High-Speed WiFi, Refrigerator, RO Water, Bed with Storage",
      availableFor: "Students & Bachelors"
    },
    ownerName: "Dinesh Choksi",
    ownerPhone: "+91 99099 88776",
    owner: {
      name: "Dinesh Choksi",
      phone: "+91 99099 88776",
      email: "dinesh.choksi@example.com"
    }
  }
];
