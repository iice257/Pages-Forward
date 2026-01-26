TRUNCATE TABLE books CASCADE;
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'A Little Life', 'a-little-life', 'Hanya Yanagihara', 'A Novel of Friendship', 'A profound exploration of trauma, friendship, and the limits of human endurance.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Fiction', 'Literary Fiction', 'Contemporary',
    0.85, 0.92
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Animal Farm', 'animal-farm', 'George Orwell', 'A Fairy Story', 'A satirical allegory of Soviet totalitarianism told through a farm revolution.', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Literary Fiction', 'Satire',
    0.95, 0.90
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Anna Karenina', 'anna-karenina', 'Leo Tolstoy', 'A Tale of Love and Society', 'A masterpiece exploring love, family, and Russian society in the 19th century.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Fiction', 'Romance', 'Classic',
    0.98, 0.95
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'As I Lay Dying', 'as-i-lay-dying', 'William Faulkner', 'A Journey Through Grief', 'A Southern Gothic tale of a family''s odyssey to bury their matriarch.', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Literary Fiction', 'Southern Gothic',
    0.88, 0.75
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Brave New World', 'brave-new-world', 'Aldous Huxley', 'A Dystopian Vision', 'A chilling vision of a future society driven by technology and control.', 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Sci-Fi', 'Dystopian',
    0.90, 0.88
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Beloved', 'beloved', 'Toni Morrison', 'A Ghost Story', 'A haunting exploration of slavery''s psychological legacy.', 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=900&fit=crop', 
    10000, 5, 'reserved', 'Medium',
    'Fiction', 'Historical', 'African American Literature',
    0.95, 0.90
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Midnight Library', 'the-midnight-library', 'Matt Haig', 'Infinite Realities', 'Between life and death there is a library containing infinite books.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Fantasy', 'Contemporary',
    0.85, 0.92
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Meditations', 'meditations', 'Marcus Aurelius', 'Stoic Wisdom', 'Personal writings of the Roman Emperor on Stoic philosophy.', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Non-fiction', 'Philosophy', 'Stoicism',
    0.95, 0.88
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Atomic Habits', 'atomic-habits', 'James Clear', 'Tiny Changes', 'An easy & proven way to build good habits & break bad ones.', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Non-fiction', 'Self-Help', 'Productivity',
    0.90, 0.95
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Dune', 'dune', 'Frank Herbert', 'A Science Fiction Epic', 'A sweeping tale of politics, religion, and ecology on a desert planet.', 'https://images.unsplash.com/photo-1547555999-14e818e09e33?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Fiction', 'Sci-Fi', 'Space Opera',
    0.92, 0.95
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Sapiens', 'sapiens', 'Yuval Noah Harari', 'A Brief History of Humankind', 'A groundbreaking narrative of humanity''s creation and evolution.', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Non-fiction', 'History', 'Anthropology',
    0.95, 0.98
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Thinking, Fast and Slow', 'thinking-fast-and-slow', 'Daniel Kahneman', 'Two Systems of Thought', 'A tour of the mind and the two systems that drive the way we think.', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=900&fit=crop', 
    10000, 5, 'reserved', 'Long',
    'Non-fiction', 'Science', 'Psychology',
    0.88, 0.90
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    '1984', '1984', 'George Orwell', 'Big Brother', 'A dystopian masterpiece about totalitarianism and surveillance.', 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Sci-Fi', 'Dystopian',
    0.95, 0.98
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Educated', 'educated', 'Tara Westover', 'A Memoir', 'A memoir about a woman who leaves her survivalist family to get an education.', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Non-fiction', 'Biography', 'Memoir',
    0.85, 0.92
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Invisible Cities', 'invisible-cities', 'Italo Calvino', 'Marco Polo''s Tales', 'A poetic exploration of imaginary cities described by Marco Polo.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Fantasy', 'Magical Realism',
    0.82, 0.78
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Silent Patient', 'the-silent-patient', 'Alex Michaelides', 'A Psychological Thriller', 'A woman shoots her husband and then never speaks another word.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Thriller', 'Psychological',
    0.78, 0.88
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Body Keeps the Score', 'the-body-keeps-the-score', 'Bessel van der Kolk', 'Brain, Mind, and Body', 'How trauma reshapes the body and brain, and innovative treatments.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Non-fiction', 'Mental Health', 'Trauma',
    0.85, 0.92
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Where the Crawdads Sing', 'where-the-crawdads-sing', 'Delia Owens', 'A Mystery', 'A coming-of-age murder mystery set in the marshlands of North Carolina.', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Mystery', 'Literary',
    0.80, 0.95
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Power of Now', 'the-power-of-now', 'Eckhart Tolle', 'Spiritual Enlightenment', 'A guide to spiritual enlightenment through present-moment awareness.', 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Non-fiction', 'Religion / Spirituality', 'Mindfulness',
    0.88, 0.85
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Pride and Prejudice', 'pride-and-prejudice', 'Jane Austen', 'A Classic Romance', 'The story of Elizabeth Bennet and Mr. Darcy''s tumultuous courtship.', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Romance', 'Classic',
    0.98, 0.95
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Lean Startup', 'the-lean-startup', 'Eric Ries', 'Build Measure Learn', 'How today''s entrepreneurs use continuous innovation to succeed.', 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Non-fiction', 'Business', 'Entrepreneurship',
    0.82, 0.88
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'It', 'it', 'Stephen King', 'A Horror Novel', 'A shape-shifting monster terrorizes children in Derry, Maine.', 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Fiction', 'Horror', 'Supernatural',
    0.95, 0.90
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Why We Sleep', 'why-we-sleep', 'Matthew Walker', 'The Power of Sleep', 'Unlocking the power of sleep and dreams for a better life.', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Non-fiction', 'Health', 'Neuroscience',
    0.80, 0.88
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Great Gatsby', 'the-great-gatsby', 'F. Scott Fitzgerald', 'The Jazz Age', 'A portrait of the Jazz Age in all of its decadence and excess.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Literary Fiction', 'Classic',
    0.95, 0.92
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Alchemist', 'the-alchemist', 'Paulo Coelho', 'A Fable About Following Your Dream', 'A shepherd boy''s journey to find treasure and his personal legend.', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Fantasy', 'Philosophical',
    0.92, 0.95
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'A Little Life 2', 'a-little-life-2', 'Hanya Yanagihara', 'A Novel of Friendship', 'A profound exploration of trauma, friendship, and the limits of human endurance.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Fiction', 'Thriller', 'Contemporary',
    0.88, 0.36
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Animal Farm 2', 'animal-farm-2', 'George Orwell', 'A Fairy Story', 'A satirical allegory of Soviet totalitarianism told through a farm revolution.', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Business', 'Satire',
    0.86, 0.27
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Anna Karenina 2', 'anna-karenina-2', 'Leo Tolstoy', 'A Tale of Love and Society', 'A masterpiece exploring love, family, and Russian society in the 19th century.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Mystery', 'Classic',
    0.57, 0.85
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'As I Lay Dying 2', 'as-i-lay-dying-2', 'William Faulkner', 'A Journey Through Grief', 'A Southern Gothic tale of a family''s odyssey to bury their matriarch.', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Health', 'Southern Gothic',
    0.12, 0.34
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Brave New World 2', 'brave-new-world-2', 'Aldous Huxley', 'A Dystopian Vision', 'A chilling vision of a future society driven by technology and control.', 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Non-fiction', 'Fantasy', 'Dystopian',
    0.96, 0.49
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Beloved 2', 'beloved-2', 'Toni Morrison', 'A Ghost Story', 'A haunting exploration of slavery''s psychological legacy.', 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=900&fit=crop', 
    10000, 5, 'reserved', 'Long',
    'Non-fiction', 'Horror', 'African American Literature',
    0.53, 0.10
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Midnight Library 2', 'the-midnight-library-2', 'Matt Haig', 'Infinite Realities', 'Between life and death there is a library containing infinite books.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Self-Help', 'Contemporary',
    0.70, 0.56
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Meditations 2', 'meditations-2', 'Marcus Aurelius', 'Stoic Wisdom', 'Personal writings of the Roman Emperor on Stoic philosophy.', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=900&fit=crop', 
    10000, 5, 'reserved', 'Medium',
    'Fiction', 'History', 'Stoicism',
    0.67, 0.84
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Atomic Habits 2', 'atomic-habits-2', 'James Clear', 'Tiny Changes', 'An easy & proven way to build good habits & break bad ones.', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=900&fit=crop', 
    10000, 5, 'reserved', 'Medium',
    'Non-fiction', 'Romance', 'Productivity',
    0.56, 0.49
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Dune 2', 'dune-2', 'Frank Herbert', 'A Science Fiction Epic', 'A sweeping tale of politics, religion, and ecology on a desert planet.', 'https://images.unsplash.com/photo-1547555999-14e818e09e33?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Fiction', 'Health', 'Space Opera',
    0.11, 0.60
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Sapiens 2', 'sapiens-2', 'Yuval Noah Harari', 'A Brief History of Humankind', 'A groundbreaking narrative of humanity''s creation and evolution.', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Self-Help', 'Anthropology',
    0.66, 0.27
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Thinking, Fast and Slow 2', 'thinking-fast-and-slow-2', 'Daniel Kahneman', 'Two Systems of Thought', 'A tour of the mind and the two systems that drive the way we think.', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Mental Health', 'Psychology',
    0.61, 0.19
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    '1984 2', '1984-2', 'George Orwell', 'Big Brother', 'A dystopian masterpiece about totalitarianism and surveillance.', 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Fiction', 'Historical', 'Dystopian',
    0.32, 0.49
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Educated 2', 'educated-2', 'Tara Westover', 'A Memoir', 'A memoir about a woman who leaves her survivalist family to get an education.', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Fiction', 'Literary Fiction', 'Memoir',
    0.19, 0.61
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Invisible Cities 2', 'invisible-cities-2', 'Italo Calvino', 'Marco Polo''s Tales', 'A poetic exploration of imaginary cities described by Marco Polo.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Philosophy', 'Magical Realism',
    0.43, 0.20
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Silent Patient 2', 'the-silent-patient-2', 'Alex Michaelides', 'A Psychological Thriller', 'A woman shoots her husband and then never speaks another word.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Philosophy', 'Psychological',
    0.75, 0.13
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Body Keeps the Score 2', 'the-body-keeps-the-score-2', 'Bessel van der Kolk', 'Brain, Mind, and Body', 'How trauma reshapes the body and brain, and innovative treatments.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Literary Fiction', 'Trauma',
    0.95, 0.68
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Where the Crawdads Sing 2', 'where-the-crawdads-sing-2', 'Delia Owens', 'A Mystery', 'A coming-of-age murder mystery set in the marshlands of North Carolina.', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Non-fiction', 'Literary Fiction', 'Literary',
    0.18, 0.48
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Power of Now 2', 'the-power-of-now-2', 'Eckhart Tolle', 'Spiritual Enlightenment', 'A guide to spiritual enlightenment through present-moment awareness.', 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Non-fiction', 'Romance', 'Mindfulness',
    0.09, 0.87
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Pride and Prejudice 2', 'pride-and-prejudice-2', 'Jane Austen', 'A Classic Romance', 'The story of Elizabeth Bennet and Mr. Darcy''s tumultuous courtship.', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Non-fiction', 'Literary Fiction', 'Classic',
    0.30, 0.79
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Lean Startup 2', 'the-lean-startup-2', 'Eric Ries', 'Build Measure Learn', 'How today''s entrepreneurs use continuous innovation to succeed.', 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=900&fit=crop', 
    5000, 5, 'reserved', 'Short',
    'Fiction', 'Self-Help', 'Entrepreneurship',
    0.72, 0.32
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'It 2', 'it-2', 'Stephen King', 'A Horror Novel', 'A shape-shifting monster terrorizes children in Derry, Maine.', 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=900&fit=crop', 
    5000, 5, 'available', 'Short',
    'Fiction', 'Business', 'Supernatural',
    0.95, 0.64
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'Why We Sleep 2', 'why-we-sleep-2', 'Matthew Walker', 'The Power of Sleep', 'Unlocking the power of sleep and dreams for a better life.', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=900&fit=crop', 
    10000, 5, 'reserved', 'Long',
    'Non-fiction', 'Philosophy', 'Neuroscience',
    0.29, 0.16
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Great Gatsby 2', 'the-great-gatsby-2', 'F. Scott Fitzgerald', 'The Jazz Age', 'A portrait of the Jazz Age in all of its decadence and excess.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Long',
    'Non-fiction', 'Religion / Spirituality', 'Classic',
    0.19, 0.75
  );
INSERT INTO books (
    title, slug, author, subtitle, description, cover_image, 
    price, stock, status, length, 
    primary_type, main_category, niche,
    author_popularity, book_popularity
  ) VALUES (
    'The Alchemist 2', 'the-alchemist-2', 'Paulo Coelho', 'A Fable About Following Your Dream', 'A shepherd boy''s journey to find treasure and his personal legend.', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=900&fit=crop', 
    10000, 5, 'available', 'Medium',
    'Fiction', 'Philosophy', 'Philosophical',
    0.76, 0.22
  );
