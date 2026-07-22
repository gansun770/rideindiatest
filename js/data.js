/* ==========================================================================
   data.js — mock/dummy data (frontend only, no API)
   ========================================================================== */
(function () {
  "use strict";

  var IMG = "assets/img/";

  var CATEGORIES = [
    { name: "Hatchback", price: "From ₹999/day",   feature: "Great on fuel",       icon: "fuel",      img: IMG + "473001058d5b.png" },
    { name: "Sedan",     price: "From ₹1,499/day", feature: "Comfort & style",     icon: "car",       img: IMG + "87fca18021d0.png" },
    { name: "SUV",       price: "From ₹1,999/day", feature: "Space for adventure", icon: "gauge",     img: IMG + "f4d0ee9c2e54.png" },
    { name: "Luxury",    price: "From ₹4,999/day", feature: "Travel in elegance",  icon: "star",      img: IMG + "d31bb4b8316a.png" },
    { name: "Electric",  price: "From ₹2,499/day", feature: "Zero emissions",      icon: "snowflake", img: IMG + "2d54e6e56bc6.png" },
    { name: "MUV",       price: "From ₹2,999/day", feature: "Room for everyone",   icon: "users",     img: IMG + "d3ab6c863857.png" }
  ];

  var BENEFITS = [
    { icon: "tag",          title: "Transparent Pricing",     text: "What you see is what you pay. No hidden service fees or surprise insurance costs." },
    { icon: "map-pin",      title: "Flexible Pickup & Return",text: "Choose from 500+ locations across India or opt for doorstep delivery and one-way rentals." },
    { icon: "car",          title: "Wide Selection",          text: "From nimble hatchbacks to premium luxury SUVs, always available across major Indian cities." },
    { icon: "clock",        title: "Instant Booking",         text: "Verified bookings in under 2 minutes. Fully digital process from start to finish." },
    { icon: "shield-check", title: "Insurance Included",      text: "Travel with peace of mind. Comprehensive coverage is standard with every rental." },
    { icon: "headphones",   title: "24/7 Support",            text: "Round-the-clock roadside assistance and customer help just a tap away." }
  ];

  var REVIEWS = [
    { stars: 5, quote: "The booking process was incredibly smooth. I found the perfect Innova for my family trip to Goa in under a minute, and the pricing was exactly what was quoted — no surprises!", name: "Priya S.",  role: "Business Traveler", img: IMG + "d07aa5b51e02.png" },
    { stars: 5, quote: "I love the flexible pickup options. Being able to get the car delivered to my hotel in Jaipur saved me so much time during my Rajasthan trip.", name: "Rajesh K.", role: "Tourist",           img: IMG + "1982d18fae68.png" },
    { stars: 5, quote: "Best rental experience I have ever had. The electric vehicle selection is fantastic, and the insurance included gives real peace of mind on long drives.", name: "Ananya M.", role: "Daily Commuter",     img: IMG + "eb9ef5b2207c.png" }
  ];

  var LOCATIONS = [
    { name: "Mumbai",    count: "450 Vehicles", img: IMG + "688e1c0ddb3e.png" },
    { name: "Delhi NCR", count: "520 Vehicles", img: IMG + "09b6ab7ac7b5.png" },
    { name: "Bangalore", count: "380 Vehicles", img: IMG + "33c2c443a93c.png" },
    { name: "Chennai",   count: "290 Vehicles", img: IMG + "79e19febd21a.png" },
    { name: "Hyderabad", count: "310 Vehicles", img: IMG + "64eecd9de541.png" },
    { name: "Pune",      count: "250 Vehicles", img: IMG + "07364320b349.png" }
  ];

  /* Full fleet — booking flow uses these. `rate` = ₹/day (number). */
  var CARS = [
    { id: "innova-crysta", name: "Toyota Innova Crysta", type: "SUV",         seats: 7, transmission: "Automatic", fuel: "Diesel", rate: 4500, rating: 4.7, reviews: 210, mileage: "12 km/l", img: IMG + "62182f2e6872.png", desc: "The Toyota Innova Crysta is the definitive family MPV — spacious, supremely comfortable, and built to devour highways. A torquey diesel engine, captain seats, and Toyota's legendary reliability make it the go-to for group travel and long road trips across India." },
    { id: "hyundai-i20",   name: "Hyundai i20",          type: "Hatchback",   seats: 5, transmission: "Manual",    fuel: "Petrol", rate: 1800, rating: 4.4, reviews: 156, mileage: "20 km/l", img: IMG + "02969265fcfd.png", desc: "The premium Hyundai i20 blends European styling with a feature-loaded cabin. Responsive handling, a punchy petrol engine and generous tech make it a joy in the city and confident on the open road." },
    { id: "honda-city",    name: "Honda City",           type: "Sedan",       seats: 5, transmission: "Automatic", fuel: "Petrol", rate: 3200, rating: 4.6, reviews: 189, mileage: "18 km/l", img: IMG + "435fdceaba61.png", desc: "The Honda City is the benchmark mid-size sedan — refined, roomy and effortlessly elegant. A smooth CVT automatic and airy cabin deliver a premium, fuss-free drive for business or leisure." },
    { id: "mahindra-thar", name: "Mahindra Thar",        type: "4x4 SUV",     seats: 4, transmission: "Manual",    fuel: "Diesel", rate: 3800, rating: 4.8, reviews: 142, mileage: "15 km/l", img: IMG + "cfd0b4e2d931.png", desc: "The iconic Mahindra Thar is pure adventure. With genuine 4x4 capability, rugged looks and a go-anywhere attitude, it turns every weekend into an expedition — from beach trails to mountain passes." },
    { id: "maruti-swift",  name: "Maruti Swift",         type: "Hatchback",   seats: 5, transmission: "Manual",    fuel: "Petrol", rate: 999,  rating: 4.5, reviews: 124, mileage: "22 km/l", img: IMG + "583e370826c8.png", detailImg: IMG + "abc77946882f.png", desc: "The Maruti Swift is the ultimate choice for practical urban mobility. Known for its peppy performance and exceptional fuel efficiency, it navigates congested city streets with ease. Powered by a refined 1.2L DualJet petrol engine, the Swift delivers a spirited drive while returning impressive economy. Inside, the cabin features a SmartPlay infotainment system, automatic climate control, and premium materials. Safety highlights include dual airbags, ABS with EBD, and a high-strength body structure." },
    { id: "kia-seltos",    name: "Kia Seltos",           type: "Compact SUV", seats: 5, transmission: "Automatic", fuel: "Petrol", rate: 2900, rating: 4.6, reviews: 178, mileage: "17 km/l", img: IMG + "e32dd15d1721.png", desc: "The Kia Seltos is a bold, tech-forward compact SUV. A commanding driving position, striking design and a cabin packed with connected-car features make it equally at home in the city and on the highway." }
  ];

  window.DATA = {
    IMG: IMG,
    categories: CATEGORIES,
    benefits: BENEFITS,
    reviews: REVIEWS,
    locations: LOCATIONS,
    cars: CARS,
    carById: function (id) { return CARS.filter(function (c) { return c.id === id; })[0] || CARS[4]; }
  };

  /* format "2026-07-10" -> "Jul 10, 2026" */
  window.fmtDate = function (iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    var m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return m[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  };
  window.inr = function (n) { return "₹" + Number(n).toLocaleString("en-IN"); };

  /* Booking draft persisted across the flow (available → details → payment → confirmation) */
  window.Booking = {
    KEY: "rideindia_booking",
    get: function () { try { return JSON.parse(sessionStorage.getItem(this.KEY)) || {}; } catch (e) { return {}; } },
    set: function (patch) {
      var data = Object.assign(this.get(), patch);
      sessionStorage.setItem(this.KEY, JSON.stringify(data));
      return data;
    },
    clear: function () { sessionStorage.removeItem(this.KEY); }
  };
})();
