/* ═══════════════════════════════════════════════════════════════
   PAGES FORWARD — Book Data
   ═══════════════════════════════════════════════════════════════ */

/**
 * Book Data Schema:
 * {
 *   id: number,
 *   title: string,
 *   author: string,
 *   subtitle: string,
 *   description: string,
 *   coverImage: string (URL),
 *   tags: {
 *     type: "Fiction" | "Non-Fiction",
 *     category: string (main category),
 *     niche: string (specific genre)
 *   },
 *   popularity: {
 *     author: number (0-1),
 *     book: number (0-1)
 *   },
 *   length: "Short" | "Medium" | "Long",
 *   status: "available" | "reserved" | "unavailable"
 * }
 */

const CATEGORIES = [
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Horror",
  "Historical",
  "Literary Fiction",
  "Business",
  "Self-Help",
  "Biography",
  "Science",
  "History",
  "Philosophy",
  "Health",
  "Mental Health",
  "Religion / Spirituality"
];

const LENGTHS = ["Short", "Medium", "Long"];

const baseBooks = [
  { id: 1, title: "A Little Life", author: "Hanya Yanagihara", subtitle: "A Novel of Friendship", description: "A profound exploration of trauma, friendship, and the limits of human endurance.", coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Literary Fiction", niche: "Contemporary" }, popularity: { author: 0.85, book: 0.92 }, length: "Long", status: "available" },
  { id: 2, title: "Animal Farm", author: "George Orwell", subtitle: "A Fairy Story", description: "A satirical allegory of Soviet totalitarianism told through a farm revolution.", coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Literary Fiction", niche: "Satire" }, popularity: { author: 0.95, book: 0.9 }, length: "Short", status: "available" },
  { id: 3, title: "Anna Karenina", author: "Leo Tolstoy", subtitle: "A Tale of Love and Society", description: "A masterpiece exploring love, family, and Russian society in the 19th century.", coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Romance", niche: "Classic" }, popularity: { author: 0.98, book: 0.95 }, length: "Long", status: "available" },
  { id: 4, title: "As I Lay Dying", author: "William Faulkner", subtitle: "A Journey Through Grief", description: "A Southern Gothic tale of a family's odyssey to bury their matriarch.", coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Literary Fiction", niche: "Southern Gothic" }, popularity: { author: 0.88, book: 0.75 }, length: "Medium", status: "available" },
  { id: 5, title: "Brave New World", author: "Aldous Huxley", subtitle: "A Dystopian Vision", description: "A chilling vision of a future society driven by technology and control.", coverImage: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Sci-Fi", niche: "Dystopian" }, popularity: { author: 0.9, book: 0.88 }, length: "Medium", status: "available" },
  { id: 6, title: "Beloved", author: "Toni Morrison", subtitle: "A Ghost Story", description: "A haunting exploration of slavery's psychological legacy.", coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Historical", niche: "African American Literature" }, popularity: { author: 0.95, book: 0.9 }, length: "Medium", status: "reserved" },
  { id: 7, title: "The Midnight Library", author: "Matt Haig", subtitle: "Infinite Realities", description: "Between life and death there is a library containing infinite books.", coverImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Fantasy", niche: "Contemporary" }, popularity: { author: 0.85, book: 0.92 }, length: "Medium", status: "available" },
  { id: 8, title: "Meditations", author: "Marcus Aurelius", subtitle: "Stoic Wisdom", description: "Personal writings of the Roman Emperor on Stoic philosophy.", coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "Philosophy", niche: "Stoicism" }, popularity: { author: 0.95, book: 0.88 }, length: "Short", status: "available" },
  { id: 9, title: "Atomic Habits", author: "James Clear", subtitle: "Tiny Changes", description: "An easy & proven way to build good habits & break bad ones.", coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "Self-Help", niche: "Productivity" }, popularity: { author: 0.9, book: 0.95 }, length: "Medium", status: "available" },
  { id: 10, title: "Dune", author: "Frank Herbert", subtitle: "A Science Fiction Epic", description: "A sweeping tale of politics, religion, and ecology on a desert planet.", coverImage: "https://images.unsplash.com/photo-1547555999-14e818e09e33?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Sci-Fi", niche: "Space Opera" }, popularity: { author: 0.92, book: 0.95 }, length: "Long", status: "available" },
  { id: 11, title: "Sapiens", author: "Yuval Noah Harari", subtitle: "A Brief History of Humankind", description: "A groundbreaking narrative of humanity's creation and evolution.", coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "History", niche: "Anthropology" }, popularity: { author: 0.95, book: 0.98 }, length: "Long", status: "available" },
  { id: 12, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", subtitle: "Two Systems of Thought", description: "A tour of the mind and the two systems that drive the way we think.", coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "Science", niche: "Psychology" }, popularity: { author: 0.88, book: 0.9 }, length: "Long", status: "reserved" },
  { id: 13, title: "1984", author: "George Orwell", subtitle: "Big Brother", description: "A dystopian masterpiece about totalitarianism and surveillance.", coverImage: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Sci-Fi", niche: "Dystopian" }, popularity: { author: 0.95, book: 0.98 }, length: "Medium", status: "available" },
  { id: 14, title: "Educated", author: "Tara Westover", subtitle: "A Memoir", description: "A memoir about a woman who leaves her survivalist family to get an education.", coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "Biography", niche: "Memoir" }, popularity: { author: 0.85, book: 0.92 }, length: "Medium", status: "available" },
  { id: 15, title: "Invisible Cities", author: "Italo Calvino", subtitle: "Marco Polo's Tales", description: "A poetic exploration of imaginary cities described by Marco Polo.", coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Fantasy", niche: "Magical Realism" }, popularity: { author: 0.82, book: 0.78 }, length: "Short", status: "available" },
  { id: 16, title: "The Silent Patient", author: "Alex Michaelides", subtitle: "A Psychological Thriller", description: "A woman shoots her husband and then never speaks another word.", coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Thriller", niche: "Psychological" }, popularity: { author: 0.78, book: 0.88 }, length: "Medium", status: "available" },
  { id: 17, title: "The Body Keeps the Score", author: "Bessel van der Kolk", subtitle: "Brain, Mind, and Body", description: "How trauma reshapes the body and brain, and innovative treatments.", coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "Mental Health", niche: "Trauma" }, popularity: { author: 0.85, book: 0.92 }, length: "Long", status: "available" },
  { id: 18, title: "Where the Crawdads Sing", author: "Delia Owens", subtitle: "A Mystery", description: "A coming-of-age murder mystery set in the marshlands of North Carolina.", coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Mystery", niche: "Literary" }, popularity: { author: 0.8, book: 0.95 }, length: "Medium", status: "available" },
  { id: 19, title: "The Power of Now", author: "Eckhart Tolle", subtitle: "Spiritual Enlightenment", description: "A guide to spiritual enlightenment through present-moment awareness.", coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "Religion / Spirituality", niche: "Mindfulness" }, popularity: { author: 0.88, book: 0.85 }, length: "Medium", status: "available" },
  { id: 20, title: "Pride and Prejudice", author: "Jane Austen", subtitle: "A Classic Romance", description: "The story of Elizabeth Bennet and Mr. Darcy's tumultuous courtship.", coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Romance", niche: "Classic" }, popularity: { author: 0.98, book: 0.95 }, length: "Medium", status: "available" },
  { id: 21, title: "The Lean Startup", author: "Eric Ries", subtitle: "Build Measure Learn", description: "How today's entrepreneurs use continuous innovation to succeed.", coverImage: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "Business", niche: "Entrepreneurship" }, popularity: { author: 0.82, book: 0.88 }, length: "Medium", status: "available" },
  { id: 22, title: "It", author: "Stephen King", subtitle: "A Horror Novel", description: "A shape-shifting monster terrorizes children in Derry, Maine.", coverImage: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Horror", niche: "Supernatural" }, popularity: { author: 0.95, book: 0.9 }, length: "Long", status: "available" },
  { id: 23, title: "Why We Sleep", author: "Matthew Walker", subtitle: "The Power of Sleep", description: "Unlocking the power of sleep and dreams for a better life.", coverImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=900&fit=crop", tags: { type: "Non-Fiction", category: "Health", niche: "Neuroscience" }, popularity: { author: 0.8, book: 0.88 }, length: "Medium", status: "available" },
  { id: 24, title: "The Great Gatsby", author: "F. Scott Fitzgerald", subtitle: "The Jazz Age", description: "A portrait of the Jazz Age in all of its decadence and excess.", coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Literary Fiction", niche: "Classic" }, popularity: { author: 0.95, book: 0.92 }, length: "Short", status: "available" },
  { id: 25, title: "The Alchemist", author: "Paulo Coelho", subtitle: "A Fable About Following Your Dream", description: "A shepherd boy's journey to find treasure and his personal legend.", coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=900&fit=crop", tags: { type: "Fiction", category: "Fantasy", niche: "Philosophical" }, popularity: { author: 0.92, book: 0.95 }, length: "Short", status: "available" }
];

// Generate ~100 books by extending base books with randomized metadata
function generateBooksData() {
  const books = [];

  for (let i = 0; i < 100; i++) {
    const seed = baseBooks[i % baseBooks.length];
    const isExtra = i >= baseBooks.length;

    books.push({
      ...seed,
      id: i + 1,
      title: isExtra ? `${seed.title} ${Math.floor(i / baseBooks.length) + 1}` : seed.title,
      tags: isExtra ? {
        type: Math.random() > 0.4 ? "Fiction" : "Non-Fiction",
        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
        niche: seed.tags.niche
      } : seed.tags,
      popularity: isExtra ? {
        author: Math.random(),
        book: Math.random()
      } : seed.popularity,
      length: isExtra ? LENGTHS[Math.floor(Math.random() * LENGTHS.length)] : seed.length,
      status: isExtra ? (Math.random() > 0.85 ? "reserved" : "available") : seed.status
    });
  }

  return books;
}

const booksData = generateBooksData();

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.PF = window.PF || {};
  window.PF.booksData = booksData;
  window.PF.CATEGORIES = CATEGORIES;
  window.PF.LENGTHS = LENGTHS;
}
