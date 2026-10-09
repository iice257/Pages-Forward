// Generates db-seed.json with 100+ real books with Open Library cover URLs
const fs = require('fs');
const path = require('path');

// Cover URL helper — Open Library Covers API
function cover(isbn) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
}

const books = [
  // ═══════════ FICTION ═══════════
  b("midnight-library", "The Midnight Library", "Matt Haig", "Fiction", "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.", 4.5, 304, 2020, 16.99, "9780525559474", "#1a1a4e", "#6366f1", ["bestseller", "award-winner"]),
  b("where-crawdads-sing", "Where the Crawdads Sing", "Delia Owens", "Fiction", "For years, rumors of the 'Marsh Girl' haunted Barkley Cove. Kya Clark is barefoot and wild, but she's more intelligent and resourceful than anyone imagines.", 4.5, 384, 2018, 16.99, "9780735219106", "#064e3b", "#34d399", ["bestseller"]),
  b("song-of-achilles", "The Song of Achilles", "Madeline Miller", "Fiction", "A dazzling literary feat that brilliantly reimagines Homer's Iliad — a tale of gods, kings, immortal fame, and the human heart.", 4.6, 352, 2012, 15.99, "9780062060624", "#1e3a5f", "#fbbf24", ["award-winner"]),
  b("normal-people", "Normal People", "Sally Rooney", "Fiction", "Connell and Marianne grow up in the same small town in rural Ireland. A story of mutual fascination, friendship and love.", 4.1, 288, 2018, 14.99, "9781984822178", "#e8e0d0", "#2d5016", ["bestseller"]),
  b("great-gatsby", "The Great Gatsby", "F. Scott Fitzgerald", "Fiction", "The story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan, amid the excess of the Jazz Age.", 4.4, 180, 1925, 12.99, "9780743273565", "#1a2744", "#f5c842", ["award-winner"]),
  b("little-fires", "Little Fires Everywhere", "Celeste Ng", "Fiction", "In Shaker Heights, a placid progressive suburb of Cleveland, everything is planned — until a mysterious artist and her daughter arrive.", 4.2, 338, 2017, 15.99, "9780735224315", "#4a1c1c", "#ef4444", ["bestseller"]),
  b("invisible-life", "The Invisible Life of Addie LaRue", "V.E. Schwab", "Fiction", "A life no one will remember. A story you will never forget. Addie LaRue makes a Faustian bargain to live forever but is cursed to be forgotten.", 4.3, 448, 2020, 16.99, "9780765387561", "#1a0a2e", "#c084fc", ["bestseller", "new-release"]),
  b("goldfinch", "The Goldfinch", "Donna Tartt", "Fiction", "A boy in New York survives a disaster that kills his mother. Abandoned by his father, he clings to a small painting that draws him into the underworld of art.", 4.1, 771, 2013, 18.99, "9780316055437", "#3d2b1f", "#d4a574", ["award-winner"]),
  b("alchemist", "The Alchemist", "Paulo Coelho", "Fiction", "A shepherd boy travels from Spain to the Egyptian desert in search of treasure. Along the way he learns the true treasure is the journey itself.", 4.3, 208, 1988, 14.99, "9780062315007", "#fef3c7", "#b45309", ["bestseller"]),
  b("kite-runner", "The Kite Runner", "Khaled Hosseini", "Fiction", "The unforgettable story of two boys growing up in Afghanistan. A devastating tale of friendship, betrayal, and the power of redemption.", 4.4, 371, 2003, 14.99, "9781594631931", "#7c3aed", "#e0d5c7", ["bestseller"]),
  b("handmaids-tale", "The Handmaid's Tale", "Margaret Atwood", "Fiction", "In the Republic of Gilead, fertile women are assigned to powerful men as Handmaids. Offred can remember the days before, when she was free.", 4.4, 311, 1985, 14.99, "9780385490818", "#dc2626", "#f5f0e8", ["award-winner"]),
  b("1984", "1984", "George Orwell", "Fiction", "A dystopian masterpiece about a totalitarian regime that controls every aspect of life. Winston Smith dares to think independently.", 4.5, 328, 1949, 12.99, "9780451524935", "#1c1917", "#ef4444", ["award-winner"]),
  b("catch-22", "Catch-22", "Joseph Heller", "Fiction", "Set in Italy during World War II, Yossarian is a bombardier who is convinced everyone is trying to kill him. The novel that invented its own literary genre.", 4.2, 453, 1961, 14.99, "9781451626650", "#fef9c3", "#854d0e", ["award-winner"]),
  b("beloved", "Beloved", "Toni Morrison", "Fiction", "Sethe, a formerly enslaved woman, is haunted by the ghost of her dead child. A powerful meditation on the legacy of slavery in America.", 4.1, 324, 1987, 15.99, "9781400033416", "#1c1917", "#d4a574", ["award-winner"]),
  b("norwegian-wood", "Norwegian Wood", "Haruki Murakami", "Fiction", "Toru Watanabe navigates love, loss, and sexuality in 1960s Tokyo. A nostalgic story of one college student's experiences.", 4.2, 296, 1987, 15.99, "9780375704024", "#1a3520", "#4ade80", ["bestseller"]),
  b("anxious-people", "Anxious People", "Fredrik Backman", "Fiction", "A failed bank robber holds everyone in an apartment viewing hostage. This darkly comic novel is about the absurdity of the human condition.", 4.2, 352, 2020, 15.99, "9781501160837", "#fef3c7", "#b45309", ["new-release"]),

  // ═══════════ SCI-FI ═══════════
  b("project-hail-mary", "Project Hail Mary", "Andy Weir", "Sci-Fi", "Ryland Grace is the sole survivor on a desperate, last-chance mission. If he fails, humanity and the earth itself will perish.", 4.8, 496, 2021, 18.99, "9780593135204", "#0c1445", "#f59e0b", ["bestseller", "new-release"]),
  b("dune", "Dune", "Frank Herbert", "Sci-Fi", "Set on the desert planet Arrakis, Dune is the story of Paul Atreides and his family's ambition to bring to fruition humankind's most ancient dream.", 4.6, 688, 1965, 14.99, "9780441172719", "#451a03", "#f59e0b", ["award-winner"]),
  b("neuromancer", "Neuromancer", "William Gibson", "Sci-Fi", "Case was the sharpest data thief in the matrix — until he crossed the wrong people. Now a mysterious employer recruits him for one last run.", 4.1, 271, 1984, 13.99, "9780441569595", "#000000", "#06b6d4", ["award-winner"]),
  b("dark-matter", "Dark Matter", "Blake Crouch", "Sci-Fi", "Jason Dessen is abducted and awakens in a reality that is not his own. In this world, his life is very different — and very terrifying.", 4.4, 342, 2016, 14.99, "9781101904220", "#030712", "#22d3ee", ["bestseller"]),
  b("klara-and-sun", "Klara and the Sun", "Kazuo Ishiguro", "Sci-Fi", "Klara is an Artificial Friend with outstanding observational qualities who watches carefully the behavior of those who come in to browse.", 4.2, 303, 2021, 17.99, "9780593318171", "#fffbeb", "#f59e0b", ["new-release", "award-winner"]),
  b("left-hand-darkness", "The Left Hand of Darkness", "Ursula K. Le Guin", "Sci-Fi", "A lone human envoy is sent to the planet Gethen to convince its nations to join an interplanetary alliance.", 4.3, 304, 1969, 14.99, "9780441478125", "#1a1a2e", "#818cf8", ["award-winner"]),
  b("enders-game", "Ender's Game", "Orson Scott Card", "Sci-Fi", "In order to develop a secure defense against a hostile alien race, the government breeds child geniuses and trains them as soldiers.", 4.5, 324, 1985, 13.99, "9780812550702", "#0a0a0a", "#22c55e", ["bestseller", "award-winner"]),
  b("three-body-problem", "The Three-Body Problem", "Liu Cixin", "Sci-Fi", "Set against the backdrop of China's Cultural Revolution, a secret military project sends signals into space. An alien civilization captures the signal.", 4.3, 400, 2008, 16.99, "9780765382030", "#0f172a", "#ef4444", ["award-winner"]),
  b("recursion", "Recursion", "Blake Crouch", "Sci-Fi", "A mysterious affliction called False Memory Syndrome is sweeping the globe. A neuroscientist's research into memory has been hijacked.", 4.2, 320, 2019, 15.99, "9781524759780", "#1e1b4b", "#a78bfa", ["bestseller"]),
  b("martian", "The Martian", "Andy Weir", "Sci-Fi", "Stranded on Mars after a dust storm, astronaut Mark Watney must rely on his ingenuity to survive and find a way to signal Earth.", 4.7, 369, 2011, 15.99, "9780553418026", "#7c2d12", "#fb923c", ["bestseller"]),
  b("fahrenheit-451", "Fahrenheit 451", "Ray Bradbury", "Sci-Fi", "In a future where books are banned, fireman Guy Montag's job is to burn any that are found. Then he begins to question everything.", 4.3, 194, 1953, 13.99, "9781451673319", "#7f1d1d", "#fca5a5", ["award-winner"]),
  b("slaughterhouse-five", "Slaughterhouse-Five", "Kurt Vonnegut", "Sci-Fi", "Billy Pilgrim has come unstuck in time. He travels between his life as an American soldier in WWII and his abduction by aliens.", 4.3, 275, 1969, 14.99, "9780385333481", "#1e3a5f", "#60a5fa", ["award-winner"]),

  // ═══════════ FANTASY ═══════════
  b("name-of-the-wind", "The Name of the Wind", "Patrick Rothfuss", "Fantasy", "The tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen.", 4.7, 662, 2007, 15.99, "9780756404741", "#1a0a00", "#dc2626", ["award-winner"]),
  b("circe", "Circe", "Madeline Miller", "Fantasy", "In the house of Helios, a daughter is born. Circe discovers she possesses the power of witchcraft, which can transform rivals into monsters.", 4.5, 393, 2018, 15.99, "9780316556347", "#1e1b4b", "#a78bfa", ["bestseller", "award-winner"]),
  b("mistborn", "Mistborn: The Final Empire", "Brandon Sanderson", "Fantasy", "For a thousand years the ash fell. In a world of darkness, an evil overlord reigns. A thief with extraordinary abilities leads a revolution.", 4.7, 541, 2006, 15.99, "9780765350381", "#1c1917", "#a3a3a3", ["bestseller"]),
  b("piranesi", "Piranesi", "Susanna Clarke", "Fantasy", "Piranesi's house is no ordinary building: its rooms are infinite, its corridors endless, its walls lined with thousands of statues.", 4.3, 272, 2020, 14.99, "9781635575996", "#0e4d64", "#67e8f9", ["award-winner"]),
  b("fifth-season", "The Fifth Season", "N.K. Jemisin", "Fantasy", "A season of endings has begun. Every few centuries, catastrophic climate change sweeps the land. This is the Stillness.", 4.5, 468, 2015, 16.99, "9780316229296", "#292524", "#f97316", ["award-winner"]),
  b("way-of-kings", "The Way of Kings", "Brandon Sanderson", "Fantasy", "Roshar is a world of stone and storms. Kaladin struggles to protect his men while leading them through endless battles.", 4.7, 1007, 2010, 19.99, "9780765326355", "#1e3a5f", "#60a5fa", ["bestseller"]),
  b("hobbit", "The Hobbit", "J.R.R. Tolkien", "Fantasy", "Bilbo Baggins is a hobbit who enjoys a comfortable life. When Gandalf and thirteen dwarves arrive, his life is changed forever.", 4.7, 310, 1937, 14.99, "9780547928227", "#1a3520", "#4ade80", ["bestseller"]),
  b("priory-orange", "The Priory of the Orange Tree", "Samantha Shannon", "Fantasy", "A world divided. A queendom without an heir. An ancient enemy awakens. A sweeping epic about a world on the brink of war with dragons.", 4.2, 848, 2019, 18.99, "9781635570298", "#4a1c0a", "#fb923c", ["new-release"]),
  b("fellowship-ring", "The Fellowship of the Ring", "J.R.R. Tolkien", "Fantasy", "One Ring to rule them all. In a sleepy village in the Shire, young Frodo Baggins must begin a perilous quest to destroy the One Ring.", 4.7, 423, 1954, 15.99, "9780547928210", "#2d1b2e", "#d4a574", ["award-winner"]),
  b("game-of-thrones", "A Game of Thrones", "George R.R. Martin", "Fantasy", "In a land where seasons can last decades, winter is coming. Political intrigue, honor, and treachery await in the Seven Kingdoms.", 4.5, 694, 1996, 16.99, "9780553593716", "#1c1917", "#ef4444", ["bestseller"]),
  b("bear-and-nightingale", "The Bear and the Nightingale", "Katherine Arden", "Fantasy", "At the edge of the Russian wilderness, winter lasts most of the year. Vasya's gifts draw the attention of forces both dark and magical.", 4.3, 322, 2017, 14.99, "9781101885956", "#0f2d3d", "#67e8f9", ["new-release"]),

  // ═══════════ MYSTERY ═══════════
  b("gone-girl", "Gone Girl", "Gillian Flynn", "Mystery", "On their fifth wedding anniversary, Nick Dunne's clever wife disappears. As the police and media descend, everyone is asking: what did Nick do?", 4.3, 432, 2012, 14.99, "9780307588371", "#2d1b2e", "#ec4899", ["bestseller"]),
  b("silent-patient", "The Silent Patient", "Alex Michaelides", "Mystery", "Alicia Berenson shoots her husband five times and then never speaks another word. A psychotherapist is determined to unravel the mystery.", 4.2, 325, 2019, 14.99, "9781250301697", "#1f2937", "#ef4444", ["bestseller"]),
  b("girl-on-train", "The Girl on the Train", "Paula Hawkins", "Mystery", "Rachel takes the same commuter train every day, watching a couple from afar. When the woman disappears, Rachel becomes entangled.", 4.0, 323, 2015, 13.99, "9781594634024", "#1f2937", "#ef4444", ["bestseller"]),
  b("da-vinci-code", "The Da Vinci Code", "Dan Brown", "Mystery", "A murder inside the Louvre leads Harvard professor Robert Langdon on a trail of clues hidden in the works of Leonardo da Vinci.", 3.9, 454, 2003, 15.99, "9780307474278", "#2d1b2e", "#dc2626", ["bestseller"]),
  b("in-the-woods", "In the Woods", "Tana French", "Mystery", "When he was twelve, something terrible happened in the woods. Twenty years later, Detective Rob Ryan investigates a murder in the same area.", 4.1, 429, 2007, 14.99, "9780143113492", "#1a2e1a", "#6ee7b7", ["award-winner"]),
  b("big-little-lies", "Big Little Lies", "Liane Moriarty", "Mystery", "A murder, a school trivia night, and the dangerous lies that lurk beneath perfect-seeming suburban lives.", 4.3, 460, 2014, 15.99, "9780425274866", "#fce7f3", "#be185d", ["bestseller"]),
  b("woman-in-window", "The Woman in the Window", "A.J. Finn", "Mystery", "Anna Fox lives alone. She watches her neighbors. Then she sees something she shouldn't in the house across the way.", 4.0, 427, 2018, 14.99, "9780062678416", "#0f172a", "#94a3b8", ["bestseller"]),
  b("and-then-none", "And Then There Were None", "Agatha Christie", "Mystery", "Ten strangers are lured to an isolated island mansion. One by one, the guests share a dark secret — and one by one, they die.", 4.5, 272, 1939, 13.99, "9780062073488", "#1c1917", "#a8a29e", ["award-winner"]),
  b("girl-dragon-tattoo", "The Girl with the Dragon Tattoo", "Stieg Larsson", "Mystery", "A journalist and a computer hacker investigate a decades-old disappearance in an industrialist family.", 4.2, 672, 2005, 15.99, "9780307454546", "#030712", "#ef4444", ["bestseller"]),

  // ═══════════ ROMANCE ═══════════
  b("beach-read", "Beach Read", "Emily Henry", "Romance", "Two writers swap genres for the summer. Augustus writes literary fiction; January writes romance. Funnier and more tender than expected.", 4.1, 361, 2020, 13.99, "9781984806734", "#fef3c7", "#f97316", ["bestseller"]),
  b("it-ends-with-us", "It Ends with Us", "Colleen Hoover", "Romance", "Lily meets Ryle, a neurosurgeon who sweeps her off her feet. But as questions surface, everything she knew is upended.", 4.4, 385, 2016, 14.99, "9781501110368", "#fce7f3", "#db2777", ["bestseller"]),
  b("people-we-meet", "People We Meet on Vacation", "Emily Henry", "Romance", "Alex and Poppy have nothing in common except a love of travel and each other. After a falling out, Poppy proposes one more trip.", 4.2, 364, 2021, 14.99, "9781984806758", "#e0f2fe", "#0284c7", ["bestseller", "new-release"]),
  b("love-hypothesis", "The Love Hypothesis", "Ali Hazelwood", "Romance", "Olive Smith fabricates a relationship with a brooding professor to convince her best friend to date the man she likes.", 4.2, 384, 2021, 14.99, "9780593336823", "#fef9c3", "#ca8a04", ["bestseller", "new-release"]),
  b("book-lovers", "Book Lovers", "Emily Henry", "Romance", "Nora is a literary agent who agrees to a month-long trip to Sunshine Falls. She keeps running into Charlie, a brooding editor from back home.", 4.1, 377, 2022, 15.99, "9780593334836", "#fae8ff", "#a855f7", ["new-release"]),
  b("pride-and-prejudice", "Pride and Prejudice", "Jane Austen", "Romance", "The story of Elizabeth Bennet and Mr. Darcy navigating societal expectations, family pressures, and their own stubborn pride.", 4.7, 279, 1813, 11.99, "9780141439518", "#f5f0e8", "#78350f", ["award-winner"]),
  b("outlander", "Outlander", "Diana Gabaldon", "Romance", "Claire Randall is transported from 1945 to 1743 Scotland, where she meets a dashing Highland warrior and becomes embroiled in the Jacobite risings.", 4.4, 850, 1991, 16.99, "9780440212560", "#1a2e1a", "#22c55e", ["bestseller"]),
  b("notebook", "The Notebook", "Nicholas Sparks", "Romance", "The story of Noah Calhoun and Allie Nelson, two lovers separated by war and class, whose passion for each other endures for decades.", 4.2, 214, 1996, 13.99, "9781455582877", "#e0f2fe", "#0284c7", ["bestseller"]),

  // ═══════════ NON-FICTION ═══════════
  b("sapiens", "Sapiens: A Brief History of Humankind", "Yuval Noah Harari", "Non-Fiction", "From the role of happenstance in human society to the ways biology and history define what it means to be human.", 4.6, 464, 2015, 19.99, "9780062316097", "#f5f0e8", "#78350f", ["bestseller", "award-winner"]),
  b("thinking-fast-slow", "Thinking, Fast and Slow", "Daniel Kahneman", "Non-Fiction", "Kahneman takes us on a tour of the mind explaining the two systems that drive the way we think.", 4.4, 499, 2011, 17.99, "9780374533557", "#0f172a", "#f97316", ["award-winner"]),
  b("brief-history-time", "A Brief History of Time", "Stephen Hawking", "Non-Fiction", "Was there a beginning of time? Is the universe infinite? A great scientific thinker explores the mysteries of the cosmos.", 4.5, 212, 1988, 15.99, "9780553380163", "#030712", "#60a5fa", ["award-winner"]),
  b("quiet", "Quiet: The Power of Introverts", "Susan Cain", "Non-Fiction", "At least one-third of people are introverts. This book shows how dramatically we undervalue them, and how much we lose in doing so.", 4.3, 352, 2012, 16.99, "9780307352156", "#1e293b", "#38bdf8", ["bestseller"]),
  b("freakonomics", "Freakonomics", "Steven D. Levitt", "Non-Fiction", "A rogue economist explores the hidden side of everything — from cheating teachers to drug dealers who live with their moms.", 4.0, 320, 2005, 15.99, "9780060731335", "#f97316", "#000000", ["bestseller"]),
  b("outliers", "Outliers", "Malcolm Gladwell", "Non-Fiction", "What makes high-achievers different? Gladwell argues we pay too much attention to what successful people are like, not where they're from.", 4.2, 309, 2008, 16.99, "9780316017930", "#f5f0e8", "#1e40af", ["bestseller"]),
  b("born-a-crime", "Born a Crime", "Trevor Noah", "Non-Fiction", "The compelling memoir of one man's coming-of-age, set during the twilight of apartheid and the tumultuous days of freedom that followed.", 4.6, 304, 2016, 16.99, "9780399588174", "#1c1917", "#fbbf24", ["bestseller"]),
  b("immortal-life", "The Immortal Life of Henrietta Lacks", "Rebecca Skloot", "Non-Fiction", "Henrietta Lacks's cells were taken without her knowledge and became one of the most important tools in medicine. Her story was ignored for decades.", 4.4, 381, 2010, 15.99, "9781400052189", "#1a2e1a", "#4ade80", ["award-winner"]),
  b("guns-germs-steel", "Guns, Germs, and Steel", "Jared Diamond", "Non-Fiction", "Why did Eurasians conquer the Americas and not vice versa? Diamond argues that geography and environment shaped the modern world.", 4.3, 528, 1997, 16.99, "9780393354324", "#1c1917", "#a16207", ["award-winner"]),

  // ═══════════ SELF-HELP ═══════════
  b("atomic-habits", "Atomic Habits", "James Clear", "Self-Help", "Practical strategies to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.", 4.8, 320, 2018, 17.99, "9780735211292", "#fefce8", "#eab308", ["bestseller"]),
  b("power-of-now", "The Power of Now", "Eckhart Tolle", "Self-Help", "Living in the now is the truest path to happiness and enlightenment. A profound guide to spiritual awakening.", 4.3, 236, 1997, 14.99, "9781577314806", "#fdf4ff", "#a855f7", ["bestseller"]),
  b("subtle-art", "The Subtle Art of Not Giving a F*ck", "Mark Manson", "Self-Help", "A superstar blogger cuts through the crap to show us how to stop trying to be positive all the time.", 4.0, 224, 2016, 14.99, "9780062457714", "#f97316", "#000000", ["bestseller"]),
  b("mans-search", "Man's Search for Meaning", "Viktor E. Frankl", "Self-Help", "A psychiatrist's memoir of life in Nazi death camps, with lessons for spiritual survival. Devastating yet life-affirming.", 4.7, 184, 1946, 13.99, "9780807014295", "#1c1917", "#d4d4d4", ["award-winner"]),
  b("four-agreements", "The Four Agreements", "Don Miguel Ruiz", "Self-Help", "Based on ancient Toltec wisdom, The Four Agreements offer a powerful code of conduct that can transform our lives.", 4.3, 160, 1997, 12.99, "9781878424310", "#fef3c7", "#92400e", ["bestseller"]),
  b("mindset", "Mindset: The New Psychology of Success", "Carol S. Dweck", "Self-Help", "World-renowned psychologist Carol Dweck reveals the power of our mindset — how fixed vs growth mindsets shape our lives.", 4.4, 320, 2006, 16.99, "9780345472328", "#e0f2fe", "#1d4ed8", ["bestseller"]),
  b("seven-habits", "The 7 Habits of Highly Effective People", "Stephen R. Covey", "Self-Help", "A holistic, integrated, principle-centered approach for solving personal and professional problems.", 4.3, 432, 1989, 16.99, "9781982137274", "#0f172a", "#22c55e", ["bestseller"]),
  b("rich-dad", "Rich Dad Poor Dad", "Robert T. Kiyosaki", "Self-Help", "What the rich teach their kids about money that the poor and middle class do not. Financial literacy for everyone.", 4.1, 336, 1997, 14.99, "9781612681139", "#7c3aed", "#fbbf24", ["bestseller"]),

  // ═══════════ BIOGRAPHY ═══════════
  b("becoming", "Becoming", "Michelle Obama", "Biography", "Former First Lady Michelle Obama chronicles the experiences that shaped her — from Chicago's South Side to the White House.", 4.7, 448, 2018, 18.99, "9781524763138", "#e0d5c7", "#1e40af", ["bestseller", "award-winner"]),
  b("educated", "Educated", "Tara Westover", "Biography", "Born to survivalists in Idaho, Tara was 17 the first time she set foot in a classroom. Her quest for knowledge took her to Harvard and Cambridge.", 4.6, 334, 2018, 16.99, "9780399590504", "#0f172a", "#3b82f6", ["bestseller", "award-winner"]),
  b("steve-jobs", "Steve Jobs", "Walter Isaacson", "Biography", "The exclusive biography of Apple's co-founder, based on more than forty interviews with Jobs and conversations with family and colleagues.", 4.3, 656, 2011, 18.99, "9781451648539", "#f5f0e8", "#1c1917", ["bestseller"]),
  b("long-walk", "Long Walk to Freedom", "Nelson Mandela", "Biography", "The autobiography of the anti-apartheid leader, tracing his remarkable journey from childhood to the presidency of South Africa.", 4.5, 656, 1994, 17.99, "9780316548182", "#1c1917", "#f59e0b", ["award-winner"]),
  b("shoe-dog", "Shoe Dog", "Phil Knight", "Biography", "The candid memoir of how Phil Knight founded Nike. Starting with a crazy idea, he tells the story of building one of the most iconic brands.", 4.5, 386, 2016, 16.99, "9781501135910", "#0f172a", "#ef4444", ["bestseller"]),
  b("glass-castle", "The Glass Castle", "Jeannette Walls", "Biography", "The memoir of a woman who grew up with parents whose ideals and stubborn nonconformity were sometimes inspiring, sometimes devastating.", 4.3, 288, 2005, 14.99, "9780743247542", "#e7e5e4", "#78716c", ["bestseller"]),
  b("born-crime-2", "When Breath Becomes Air", "Paul Kalanithi", "Biography", "At age thirty-six, on the verge of completing a decade's worth of training as a neurosurgeon, Paul Kalanithi was diagnosed with lung cancer.", 4.6, 228, 2016, 15.99, "9780812988406", "#1e293b", "#a8a29e", ["bestseller", "award-winner"]),
  b("diary-young-girl", "The Diary of a Young Girl", "Anne Frank", "Biography", "The writings of a Jewish girl who hid from the Nazis in Amsterdam for two years. One of the most moving and widely read accounts of the Holocaust.", 4.5, 283, 1947, 12.99, "9780553296983", "#f5f0e8", "#dc2626", ["award-winner"]),

  // ═══════════ HISTORY ═══════════
  b("1776", "1776", "David McCullough", "History", "The intensely human story of those who marched with George Washington in the year of the Declaration of Independence.", 4.2, 386, 2005, 16.99, "9780743226721", "#1e3a5f", "#dc2626", []),
  b("silk-roads", "The Silk Roads", "Peter Frankopan", "History", "Far from being forgotten backwaters, Central Asia and the Middle East were the very crossroads of civilization.", 4.3, 636, 2015, 17.99, "9781101912379", "#451a03", "#fbbf24", ["new-release"]),
  b("devil-white-city", "The Devil in the White City", "Erik Larson", "History", "Two men at the 1893 Chicago World's Fair — one an architect, the other a serial killer. Their stories unfold in parallel.", 4.2, 447, 2003, 15.99, "9780375725609", "#1c1917", "#a8a29e", ["bestseller"]),
  b("team-of-rivals", "Team of Rivals", "Doris Kearns Goodwin", "History", "The political genius of Abraham Lincoln, who brought his most formidable opponents together to create a remarkable cabinet.", 4.5, 916, 2005, 19.99, "9780743270755", "#1e3a5f", "#f5f0e8", ["award-winner"]),
  b("unbroken", "Unbroken", "Laura Hillenbrand", "History", "The incredible story of Louis Zamperini — Olympic runner, WWII bombardier, and survivor of a harrowing odyssey of endurance.", 4.5, 473, 2010, 16.99, "9780812974492", "#0f172a", "#ef4444", ["bestseller"]),
  b("emperors-new-mind", "Sapiens: A Graphic History", "Yuval Noah Harari", "History", "The graphic adaptation of the international bestseller, turning the story of humankind into a vivid, illustrated narrative.", 4.1, 256, 2020, 24.99, "9780063051331", "#fef9c3", "#854d0e", ["new-release"]),

  // ═══════════ HORROR ═══════════
  b("mexican-gothic", "Mexican Gothic", "Silvia Moreno-Garcia", "Horror", "Noemí heads to a remote mansion in the Mexican countryside after receiving a frantic letter from her cousin. The house holds dark secrets.", 4.0, 301, 2020, 15.99, "9780525620785", "#1a2e1a", "#22c55e", ["new-release"]),
  b("shining", "The Shining", "Stephen King", "Horror", "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. But a sinister presence begins to manifest.", 4.5, 447, 1977, 14.99, "9780307743657", "#450a0a", "#fca5a5", ["bestseller"]),
  b("house-of-leaves", "House of Leaves", "Mark Z. Danielewski", "Horror", "A experimental novel that challenges readers with its structure. A house that is bigger on the inside than on the outside.", 4.1, 709, 2000, 19.99, "9780375703768", "#1a1a1a", "#3b82f6", []),
  b("haunting-hill", "The Haunting of Hill House", "Shirley Jackson", "Horror", "Four seekers arrive at Hill House. The story of their decadent stay is the stuff of legendary horror.", 4.2, 246, 1959, 13.99, "9780143039983", "#1c1917", "#a8a29e", ["award-winner"]),
  b("bird-box", "Bird Box", "Josh Malerman", "Horror", "Something terrifying lurks outside. If you see it, you go mad. Malorie and her children must journey blindfolded to safety.", 3.9, 262, 2014, 13.99, "9780062259653", "#030712", "#6b7280", ["bestseller"]),
  b("it", "It", "Stephen King", "Horror", "The evil clown Pennywise terrorizes the children of Derry, Maine. A group of outcasts bands together to fight the ancient, shape-shifting evil.", 4.3, 1138, 1986, 18.99, "9781501142970", "#450a0a", "#ef4444", ["bestseller"]),
  b("frankenstein", "Frankenstein", "Mary Shelley", "Horror", "Victor Frankenstein creates a creature from dead tissue. But the being, rejected by society and its creator, seeks revenge.", 4.0, 280, 1818, 11.99, "9780486282114", "#1c1917", "#a3a3a3", ["award-winner"]),
  b("dracula", "Dracula", "Bram Stoker", "Horror", "The classic tale of Count Dracula's attempt to move from Transylvania to England so that he may find new blood and spread the undead curse.", 4.0, 418, 1897, 12.99, "9780486411095", "#450a0a", "#dc2626", ["award-winner"]),
];

function b(id, title, author, genre, description, rating, pages, year, price, isbn, coverColor, coverAccent, tags) {
  const hasEbook = !['house-of-leaves'].includes(id);
  return {
    id, title, author, genre, description, rating, pages, year,
    physicalPrice: price,
    ebookPrice: +(price * 0.65).toFixed(2),
    formats: hasEbook ? ["physical", "ebook"] : ["physical"],
    coverUrl: cover(isbn),
    coverColor, coverAccent,
    isbn,
    ebookFile: hasEbook ? `${id}.pdf` : null,
    tags: tags || [],
  };
}

const db = { books, cart: [], purchases: [] };
fs.writeFileSync(path.join(__dirname, 'db-seed.json'), JSON.stringify(db, null, 2));
console.log(`Generated ${books.length} books in db-seed.json`);
