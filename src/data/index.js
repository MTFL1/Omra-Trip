const SHARED_HIGHLIGHTS = [
  'Hôtels 5 ⭐️ à 500m de la Mosquée Al-Haram, Makkah',
  'Hôtels 5 ⭐️ et 4 ⭐️ à Madina — au pied du Haram',
  'Vols directs + taxes incluses (Saudia Airlines)',
  'Visa Schengen intégralement pris en charge',
  '2×23 kg en soute + 8 kg cabine',
  'Transferts privés Makkah ↔ Madina',
  'Visites guidées & préparation spirituelle incluses',
  'Petit-déjeuner chaque matin à l\'hôtel',
]

export const offers = [
  {
    id: 'eco',
    tier: 'economique',
    prices: { double: 1450, triple: 1400, quad: 1300 },
    price: 1300,
    currency: '€',
    duration: '9 nuits',
    highlights: SHARED_HIGHLIGHTS,
    badge: null,
  },
  {
    id: 'premium',
    tier: 'premium',
    prices: { double: 1850, triple: 1750, quad: 1650 },
    price: 1650,
    currency: '€',
    duration: '9 nuits',
    highlights: SHARED_HIGHLIGHTS,
    badge: 'popular',
  },
]

export const hotels = [
  {
    id: 'meccah',
    cityKey: 'rooms.city_meccah',
    name: 'DoubleTree by Hilton Jabal Omar',
    equivalent: true,
    stars: 5,
    distanceKey: 'rooms.distance_meccah',
    amenities: ['rooms.amenity_breakfast', 'rooms.amenity_wifi', 'rooms.amenity_ac', 'rooms.amenity_kaaba_view'],
    image: null,
  },
  {
    id: 'madina',
    cityKey: 'rooms.city_madina',
    name: 'Hôtel Valy',
    equivalent: true,
    stars: 4,
    distanceKey: 'rooms.distance_madina',
    amenities: ['rooms.amenity_breakfast', 'rooms.amenity_wifi', 'rooms.amenity_ac', 'rooms.amenity_nabawi'],
    image: null,
  },
]

export const reviews = [
  {
    id: 1,
    name: 'Fatima B.',
    origin: 'Lyon, France',
    avatar: null,
    rating: 5,
    text: "Une expérience inoubliable. L'équipe d'Omra Trip a pensé à tout : l'hôtel était magnifique, le guide extraordinaire. Je recommande les yeux fermés à tous mes proches.",
    date: 'Février 2025',
    package: 'Confort',
  },
  {
    id: 2,
    name: 'Ahmed M.',
    origin: 'Marseille, France',
    avatar: null,
    rating: 5,
    text: "Alhamdulillah, notre Omra s'est déroulée dans les meilleures conditions. Organisation impeccable, hôtel proche de la Mosquée, guide très compétent. Je reviendrai inchallah !",
    date: 'Janvier 2025',
    package: 'Premium',
  },
  {
    id: 3,
    name: 'Khadija A.',
    origin: 'Bruxelles, Belgique',
    avatar: null,
    rating: 5,
    text: "Première Omra en famille avec nos trois enfants. Tout était parfaitement organisé, aucun stress. Les enfants ont adoré l'expérience. Merci infiniment à toute l'équipe.",
    date: 'Décembre 2024',
    package: 'Confort',
  },
  {
    id: 4,
    name: 'Moussa D.',
    origin: 'Paris, France',
    avatar: null,
    rating: 4,
    text: "Très bon séjour dans l'ensemble. La formule économique offre un excellent rapport qualité/prix. L'hôtel est correct et bien situé. Le guide était disponible et à l'écoute.",
    date: 'Novembre 2024',
    package: 'Économique',
  },
  {
    id: 5,
    name: 'Samira H.',
    origin: 'Montpellier, France',
    avatar: null,
    rating: 5,
    text: "Je n'ai que des éloges à faire. Du début à la fin, tout était parfait. L'assistance 24h/24 était très rassurante. Une agence sérieuse et professionnelle que je conseille sans hésitation.",
    date: 'Octobre 2024',
    package: 'Premium',
  },
]

export const faq = [
  { id: 1, questionKey: 'faq.q1', answerKey: 'faq.a1' },
  { id: 2, questionKey: 'faq.q2', answerKey: 'faq.a2' },
  { id: 3, questionKey: 'faq.q3', answerKey: 'faq.a3' },
  { id: 4, questionKey: 'faq.q4', answerKey: 'faq.a4' },
  { id: 5, questionKey: 'faq.q5', answerKey: 'faq.a5' },
  { id: 6, questionKey: 'faq.q6', answerKey: 'faq.a6' },
]
