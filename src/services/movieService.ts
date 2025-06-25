// Mock data for movies
const mockMovies = [
  {
    id: 1,
    title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    posterPath: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    releaseYear: "2016",
    rating: 95,
    genre: ["Sci-Fi", "Drama", "Mystery"],
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"]
  },
  {
    id: 2,
    title: "The Witcher",
    overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    posterPath: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/bKxiLRPVWe2nZXCzt6JPr5HNWYm.jpg",
    releaseYear: "2019",
    rating: 88,
    genre: ["Fantasy", "Action", "Adventure"],
    cast: ["Henry Cavill", "Freya Allan", "Anya Chalotra"]
  },
  {
    id: 3,
    title: "Money Heist",
    overview: "A criminal mastermind who goes by 'The Professor' has a plan to pull off the biggest heist in recorded history -- to print billions of euros in the Royal Mint of Spain.",
    posterPath: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg",
    releaseYear: "2017",
    rating: 92,
    genre: ["Crime", "Drama"],
    cast: ["Úrsula Corberó", "Álvaro Morte", "Pedro Alonso"]
  },
  {
    id: 4,
    title: "The Queen's Gambit",
    overview: "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
    posterPath: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg",
    releaseYear: "2020",
    rating: 97,
    genre: ["Drama"],
    cast: ["Anya Taylor-Joy", "Thomas Brodie-Sangster", "Harry Melling"]
  },
  {
    id: 5,
    title: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    posterPath: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    releaseYear: "2008",
    rating: 98,
    genre: ["Crime", "Drama", "Thriller"],
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"]
  },
  {
    id: 6,
    title: "Dark",
    overview: "A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.",
    posterPath: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/3lBDg3i6nn5R2NKFCJ6oRYgkps7.jpg",
    releaseYear: "2017",
    rating: 93,
    genre: ["Sci-Fi", "Mystery", "Drama"],
    cast: ["Louis Hofmann", "Lisa Vicari", "Maja Schöne"]
  },
  {
    id: 7,
    title: "The Crown",
    overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    posterPath: "https://image.tmdb.org/t/p/w500/7IbRSKiDnW2AXcbXUNL7C6udOVX.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/hTExR8VDu5rUuZR1e95scVTJKwW.jpg",
    releaseYear: "2016",
    rating: 90,
    genre: ["Drama", "History"],
    cast: ["Olivia Colman", "Tobias Menzies", "Helena Bonham Carter"]
  },
  {
    id: 8,
    title: "Squid Game",
    overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    posterPath: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/oaGvjB0DvdhXhOAuADfHb261ZHa.jpg",
    releaseYear: "2021",
    rating: 91,
    genre: ["Action", "Mystery", "Drama"],
    cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-jun"]
  }
];

// Categories
const categories = {
  trending: [1, 3, 8, 5, 2, 7],
  popular: [4, 2, 8, 1, 6, 3],
  newReleases: [8, 7, 4, 2],
  myList: [1, 5, 7],
  tvShows: [1, 3, 4, 5, 6, 7],
  movies: [2, 8],
};

// Get all movies
export const getAllMovies = () => {
  return Promise.resolve(mockMovies);
};

// Get movies by category
export const getMoviesByCategory = (category: string) => {
  const categoryIds = categories[category as keyof typeof categories] || [];
  const filteredMovies = mockMovies.filter(movie => categoryIds.includes(movie.id));
  return Promise.resolve(filteredMovies);
};

// Get movie by ID
export const getMovieById = (id: number) => {
  const movie = mockMovies.find(movie => movie.id === id);
  return Promise.resolve(movie);
};

// Search movies
export const searchMovies = (query: string) => {
  const results = mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) || 
    movie.overview.toLowerCase().includes(query.toLowerCase())
  );
  return Promise.resolve(results);
};

// Export categories for easy access
export const movieCategories = {
  trending: "Trending Now",
  popular: "Popular on Netflux",
  newReleases: "New Releases",
  myList: "My List",
  tvShows: "TV Shows",
  movies: "Movies"
}; 