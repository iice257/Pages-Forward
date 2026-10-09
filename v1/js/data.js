/* Pages Forward - Real bookstore inventory. */

(function () {
  'use strict';

  const booksData = [
  {
    "id": 1,
    "slug": "the-runway-of-life",
    "title": "The Runway of Life",
    "author": "Peter Legge",
    "subtitle": "Lessons on Success from Master Business Leader Joe Segal",
    "description": "A collection of success lessons and insights from business leader Joe Segal, as told by Peter Legge.",
    "coverImage": "assets/covers/runway_of_life.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Leadership"
    },
    "popularity": {
      "author": 0.5,
      "book": 0.4
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 2,
    "slug": "the-power-of-a-praying-woman",
    "title": "The Power of a Praying Woman",
    "author": "Stormie Omartian",
    "subtitle": "",
    "description": "A spiritual guide offering prayers and insights to help women deepen their faith and prayer life.",
    "coverImage": "assets/covers/power_praying_woman.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Spirituality",
      "niche": "Christian Life"
    },
    "popularity": {
      "author": 0.85,
      "book": 0.9
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "OVER 10 MILLION SOLD",
    "majorAward": "",
    "bestsellers": 10,
    "awards": 5
  },
  {
    "id": 3,
    "slug": "qbq-the-question-behind-the-question",
    "title": "QBQ! The Question Behind the Question",
    "author": "John G. Miller",
    "subtitle": "What to Really Ask Yourself to Eliminate Blame Complaining and Procrastination",
    "description": "A concise guide to personal accountability that helps eliminate blame and procrastination in work and life.",
    "coverImage": "assets/covers/qbq.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Personal Accountability"
    },
    "popularity": {
      "author": 0.7,
      "book": 0.8
    },
    "length": "Short",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "OVER 1 MILLION SOLD",
    "majorAward": "",
    "bestsellers": 5,
    "awards": 0
  },
  {
    "id": 4,
    "slug": "your-best-year-yet",
    "title": "Your Best Year Yet!",
    "author": "Jinny S. Ditzler",
    "subtitle": "A Proven Method for Making the Next Twelve Months the Most Successful Ever",
    "description": "A systematic guide to setting goals and achieving personal success over the course of a year.",
    "coverImage": "assets/covers/best_year_yet.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Self-Help",
      "niche": "Goal Setting"
    },
    "popularity": {
      "author": 0.6,
      "book": 0.65
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "NYT BESTSELLER",
    "majorAward": "",
    "bestsellers": 2,
    "awards": 0
  },
  {
    "id": 5,
    "slug": "class-acts",
    "title": "Class Acts",
    "author": "Mary Mitchell",
    "subtitle": "How Good Manners Create Good Relationships and Good Relationships Create Good Business",
    "description": "A guide to business etiquette and how manners directly impact professional relationships and success.",
    "coverImage": "assets/covers/class_acts.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Etiquette"
    },
    "popularity": {
      "author": 0.4,
      "book": 0.35
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 6,
    "slug": "101-hymn-stories",
    "title": "101 Hymn Stories",
    "author": "Kenneth W. Osbeck",
    "subtitle": "Inspiring factual backgrounds and experiences that prompted the writing of 101 favorite hymns",
    "description": "A collection of the inspiring stories and history behind 101 of the most cherished Christian hymns.",
    "coverImage": "assets/covers/hymn_stories.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Music",
      "niche": "Christian Hymns"
    },
    "popularity": {
      "author": 0.5,
      "book": 0.6
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "CHRISTIAN CLASSIC",
    "majorAward": "",
    "bestsellers": 5,
    "awards": 0
  },
  {
    "id": 7,
    "slug": "personal-balance-sheet",
    "title": "Personal Balance Sheet",
    "author": "Randall M. Craig",
    "subtitle": "A Practical Career Planning Guide",
    "description": "A strategic guide for managing your career like a business asset to ensure long-term growth and stability.",
    "coverImage": "assets/covers/personal_balance_sheet.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Career Management"
    },
    "popularity": {
      "author": 0.3,
      "book": 0.25
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 8,
    "slug": "life-management-for-busy-women",
    "title": "Life Management for Busy Women",
    "author": "Elizabeth George",
    "subtitle": "Living Out God's Plan with Passion and Purpose",
    "description": "A spiritual and practical guide for women to manage their time and priorities according to biblical principles.",
    "coverImage": "assets/covers/life_management.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Spirituality",
      "niche": "Christian Life for Women"
    },
    "popularity": {
      "author": 0.8,
      "book": 0.85
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "OVER 1 MILLION SOLD",
    "majorAward": "",
    "bestsellers": 20,
    "awards": 4
  },
  {
    "id": 9,
    "slug": "hours-of-power",
    "title": "Hours of Power",
    "author": "Robert H. Schuller",
    "subtitle": "My Daily Book of Motivation and Inspiration",
    "description": "A daily devotional book offering motivation and inspiration from the founder of the Crystal Cathedral.",
    "coverImage": "assets/covers/hours_of_power.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Spirituality",
      "niche": "Daily Devotional"
    },
    "popularity": {
      "author": 0.7,
      "book": 0.6
    },
    "length": "Long",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 10,
    "slug": "transform-your-life",
    "title": "Transform Your Life",
    "author": "Geshe Kelsang Gyatso",
    "subtitle": "A Blissful Journey",
    "description": "A practical guide to transforming daily problems into opportunities for personal growth and happiness through Buddhist wisdom.",
    "coverImage": "assets/covers/transform_your_life.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Spirituality",
      "niche": "Buddhism"
    },
    "popularity": {
      "author": 0.75,
      "book": 0.65
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "INTERNATIONAL BESTSELLER",
    "majorAward": "",
    "bestsellers": 5,
    "awards": 0
  },
  {
    "id": 11,
    "slug": "teams-at-the-top",
    "title": "Teams at the Top",
    "author": "Jon R. Katzenbach",
    "subtitle": "Unleashing the Potential of Both Teams and Individual Leaders",
    "description": "A business guide exploring how senior leadership teams can balance individual performance with collective team goals for success.",
    "coverImage": "assets/covers/teams_at_the_top.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Leadership"
    },
    "popularity": {
      "author": 0.7,
      "book": 0.65
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 12,
    "slug": "change-your-thoughts-change-your-life",
    "title": "Change Your Thoughts - Change Your Life",
    "author": "Dr. Wayne W. Dyer",
    "subtitle": "Living the Wisdom of the Tao",
    "description": "A modern interpretation of the Tao Te Ching offering 81 essays on how to apply ancient wisdom to today's life.",
    "coverImage": "assets/covers/change_your_thoughts.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Self-Help",
      "niche": "Spirituality"
    },
    "popularity": {
      "author": 0.95,
      "book": 0.9
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "NYT BESTSELLER",
    "majorAward": "",
    "bestsellers": 20,
    "awards": 5
  },
  {
    "id": 13,
    "slug": "the-amazing-millionaire-formula",
    "title": "The Amazing Millionaire Formula",
    "author": "Andrew Skelly",
    "subtitle": "Discover the 7 Hidden Steps for Attracting Unlimited Wealth Success and Happiness",
    "description": "A guide revealing seven hidden steps to attracting wealth success and happiness into your life.",
    "coverImage": "assets/covers/millionaire_formula.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Self-Help",
      "niche": "Wealth Creation"
    },
    "popularity": {
      "author": 0.2,
      "book": 0.15
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 14,
    "slug": "life-on-the-edge",
    "title": "Life on the Edge",
    "author": "Dr. James Dobson",
    "subtitle": "A Young Adult's Guide to a Meaningful Future",
    "description": "A comprehensive guide for young adults navigating the critical decisions and challenges of early adulthood.",
    "coverImage": "assets/covers/life_on_the_edge.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Christian Life",
      "niche": "Young Adult"
    },
    "popularity": {
      "author": 0.85,
      "book": 0.8
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "GOLD MEDALLION AWARD",
    "majorAward": "Gold Medallion",
    "bestsellers": 30,
    "awards": 11
  },
  {
    "id": 15,
    "slug": "essential-manager-motivating-people",
    "title": "Essential Manager: Motivating People",
    "author": "Robert Heller",
    "subtitle": "Essential Managers",
    "description": "Practical techniques for motivating teams and individuals to achieve peak performance.",
    "coverImage": "assets/covers/motivating_people.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Management"
    },
    "popularity": {
      "author": 0.6,
      "book": 0.55
    },
    "length": "Short",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "MULTI-MILLION COPY SERIES",
    "majorAward": "",
    "bestsellers": 20,
    "awards": 0
  },
  {
    "id": 16,
    "slug": "leviathan",
    "title": "Leviathan",
    "author": "Scott Westerfeld",
    "subtitle": "",
    "description": "In an alternate 1914, the opposing sides of World War I are the Darwinians, who use fabricated beasts as weapons, and the Clankers, who use steam-powered machines.",
    "coverImage": "assets/covers/leviathan.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Fiction",
      "category": "Young Adult",
      "niche": "Steampunk"
    },
    "popularity": {
      "author": 0.9,
      "book": 0.85
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "NYT BESTSELLER",
    "majorAward": "",
    "bestsellers": 20,
    "awards": 5
  },
  {
    "id": 17,
    "slug": "wizard-and-glass",
    "title": "Wizard and Glass",
    "author": "Stephen King",
    "subtitle": "",
    "description": "The fourth volume in the Dark Tower series featuring Roland Deschain's backstory.",
    "coverImage": "assets/covers/wizard_and_glass.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Fiction",
      "category": "Fantasy",
      "niche": "Dark Tower"
    },
    "popularity": {
      "author": 0.99,
      "book": 0.95
    },
    "length": "Long",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "NYT #1 BESTSELLER",
    "majorAward": "",
    "bestsellers": 50,
    "awards": 50
  },
  {
    "id": 18,
    "slug": "bag-of-bones",
    "title": "Bag of Bones",
    "author": "Stephen King",
    "subtitle": "",
    "description": "A haunted love story about a writer who tries to resolve his grief at his lakeside retreat.",
    "coverImage": "assets/covers/bag_of_bones.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Fiction",
      "category": "Horror",
      "niche": "Ghost Story"
    },
    "popularity": {
      "author": 0.99,
      "book": 0.9
    },
    "length": "Long",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "BRAM STOKER AWARD WINNER",
    "majorAward": "Bram Stoker Award",
    "bestsellers": 50,
    "awards": 50
  },
  {
    "id": 19,
    "slug": "dan-brown-collection",
    "title": "Dan Brown Collection",
    "author": "Pages Forward",
    "subtitle": "The Da Vinci Code / Angels & Demons / The Lost Symbol",
    "description": "A set of three bestselling thrillers by Dan Brown featuring Robert Langdon.",
    "coverImage": "assets/covers/dan_brown_collection.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Fiction",
      "category": "Thriller",
      "niche": "Conspiracy"
    },
    "popularity": {
      "author": 0.95,
      "book": 0.95
    },
    "length": "Medium",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "INTERNATIONAL BESTSELLER",
    "majorAward": "",
    "bestsellers": 7,
    "awards": 0
  },
  {
    "id": 20,
    "slug": "speaking-your-way-to-success",
    "title": "Speaking Your Way to Success",
    "author": "Sheryl Lindsell-Roberts",
    "subtitle": "Say It So They'll Listen How to Speak Up Speak Well and Get Noticed in Today's Workplace",
    "description": "A guide to effective communication and public speaking in professional environments.",
    "coverImage": "assets/covers/speaking_success.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Communication"
    },
    "popularity": {
      "author": 0.3,
      "book": 0.4
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 21,
    "slug": "there-s-a-spiritual-solution-to-every-problem",
    "title": "There's a Spiritual Solution to Every Problem",
    "author": "Wayne W. Dyer",
    "subtitle": "",
    "description": "A guide on how to solve problems by accessing a higher spiritual level.",
    "coverImage": "assets/covers/spiritual_solution.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Self-Help",
      "niche": "Spirituality"
    },
    "popularity": {
      "author": 0.95,
      "book": 0.85
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "NYT BESTSELLER",
    "majorAward": "",
    "bestsellers": 20,
    "awards": 5
  },
  {
    "id": 22,
    "slug": "the-host",
    "title": "The Host",
    "author": "Stephenie Meyer",
    "subtitle": "",
    "description": "A sc-fi romance about an alien invasion of Earth where aliens inhabit human bodies.",
    "coverImage": "assets/covers/the_host.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Fiction",
      "category": "Sci-Fi",
      "niche": "Romance"
    },
    "popularity": {
      "author": 0.9,
      "book": 0.85
    },
    "length": "Long",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "NYT #1 BESTSELLER",
    "majorAward": "",
    "bestsellers": 6,
    "awards": 3
  },
  {
    "id": 23,
    "slug": "the-act-of-marriage",
    "title": "The Act of Marriage",
    "author": "Tim & Beverly LaHaye",
    "subtitle": "The Beauty of Sexual Love",
    "description": "A Christian guide to sexual intimacy in marriage.",
    "coverImage": "assets/covers/act_of_marriage.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Relationships",
      "niche": "Christian Marriage"
    },
    "popularity": {
      "author": 0.6,
      "book": 0.8
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "OVER 2.5 MILLION SOLD",
    "majorAward": "",
    "bestsellers": 40,
    "awards": 9
  },
  {
    "id": 24,
    "slug": "secrets-of-the-millionaire-mind",
    "title": "Secrets of the Millionaire Mind",
    "author": "T. Harv Eker",
    "subtitle": "Mastering the Inner Game of Wealth",
    "description": "A book identifying the personal blueprints that determine financial success.",
    "coverImage": "assets/covers/millionaire_mind.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Finance",
      "niche": "Wealth Mindset"
    },
    "popularity": {
      "author": 0.8,
      "book": 0.9
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "NYT #1 BESTSELLER",
    "majorAward": "",
    "bestsellers": 4,
    "awards": 0
  },
  {
    "id": 25,
    "slug": "the-business-model-book",
    "title": "The Business Model Book",
    "author": "Adam J. Bock & Gerard George",
    "subtitle": "Design Build and Adapt Business Ideas That Thrive",
    "description": "A workbook for designing and adapting successful business models.",
    "coverImage": "assets/covers/business_model_book.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Strategy"
    },
    "popularity": {
      "author": 0.2,
      "book": 0.3
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 26,
    "slug": "leaving-the-mother-ship",
    "title": "Leaving the Mother Ship",
    "author": "Randall M. Craig",
    "subtitle": "Having the Courage to Leave and Charting the Path to Get There",
    "description": "A career guide on making big transitions and leaving a secure job for new opportunities.",
    "coverImage": "assets/covers/leaving_mother_ship.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Career Transition"
    },
    "popularity": {
      "author": 0.3,
      "book": 0.25
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 27,
    "slug": "the-cottage-the-spider-brooch-and-the-second-wife",
    "title": "The Cottage The Spider Brooch and The Second Wife",
    "author": "Sandy Cardy",
    "subtitle": "How to Overcome the Challenges of Estate Planning",
    "description": "A narrative guide to understanding and overcoming estate planning challenges.",
    "coverImage": "assets/covers/the_cottage.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Finance",
      "niche": "Estate Planning"
    },
    "popularity": {
      "author": 0.1,
      "book": 0.15
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 28,
    "slug": "wealth",
    "title": "Wealth",
    "author": "Stuart E. Lucas",
    "subtitle": "Grow It Protect It Spend It and Share It",
    "description": "A comprehensive guide to managing family wealth for long-term preservation.",
    "coverImage": "assets/covers/wealth.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Finance",
      "niche": "Wealth Management"
    },
    "popularity": {
      "author": 0.2,
      "book": 0.3
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 29,
    "slug": "danger-in-the-comfort-zone",
    "title": "Danger in the Comfort Zone",
    "author": "Judith M. Bardwick",
    "subtitle": "From Boardroom to Mailroom - How to Break the Entitlement Habit That's Killing American Business",
    "description": "A management book about overcoming complacency and entitlement in organizations.",
    "coverImage": "assets/covers/danger_comfort_zone.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Management"
    },
    "popularity": {
      "author": 0.4,
      "book": 0.5
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "BUSINESS WEEK BESTSELLER",
    "majorAward": "",
    "bestsellers": 5,
    "awards": 1
  },
  {
    "id": 30,
    "slug": "how-to-stay-lovers-for-life",
    "title": "How to Stay Lovers for Life",
    "author": "Sharyn Wolf",
    "subtitle": "Discover a Marriage Counselor's Tricks of the Trade",
    "description": "Practical advice for maintaining romance and intimacy in long-term relationships.",
    "coverImage": "assets/covers/stay_lovers_for_life.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Relationships",
      "niche": "Marriage"
    },
    "popularity": {
      "author": 0.4,
      "book": 0.5
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 31,
    "slug": "building-wealth",
    "title": "Building Wealth",
    "author": "Russ Whitney",
    "subtitle": "Achieving Personal and Financial Success in Real Estate and Business Without Money Credit or Luck",
    "description": "Strategies for building wealth through real estate and business ventures.",
    "coverImage": "assets/covers/building_wealth.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Finance",
      "niche": "Real Estate"
    },
    "popularity": {
      "author": 0.5,
      "book": 0.6
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "NYT BESTSELLER",
    "majorAward": "",
    "bestsellers": 6,
    "awards": 0
  },
  {
    "id": 32,
    "slug": "the-confident-decision-maker",
    "title": "The Confident Decision Maker",
    "author": "Roger Dawson",
    "subtitle": "How to Make the Right Business and Personal Decisions Every Time",
    "description": "A guide to making better decisions in business and life with confidence.",
    "coverImage": "assets/covers/confident_decision_maker.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Decision Making"
    },
    "popularity": {
      "author": 0.5,
      "book": 0.55
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 33,
    "slug": "motivating-people",
    "title": "Motivating People",
    "author": "Robert Heller",
    "subtitle": "Essential Managers",
    "description": "A concise guide to motivating employees and teams effectively.",
    "coverImage": "assets/covers/motivating_people.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Management"
    },
    "popularity": {
      "author": 0.6,
      "book": 0.7
    },
    "length": "Short",
    "status": "reserved",
    "price": null,
    "format": "Physical",
    "stock": 0,
    "rating": null,
    "reviews": null,
    "accolade": "MULTI-MILLION COPY SERIES",
    "majorAward": "",
    "bestsellers": 20,
    "awards": 0
  },
  {
    "id": 34,
    "slug": "managing-your-mind",
    "title": "Managing Your Mind",
    "author": "Gillian Butler & Tony Hope",
    "subtitle": "The Mental Fitness Guide",
    "description": "A guide to mental health and overcoming anxiety depression and stress.",
    "coverImage": "assets/covers/managing_your_mind.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Psychology",
      "niche": "Mental Health"
    },
    "popularity": {
      "author": 0.5,
      "book": 0.6
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 35,
    "slug": "100-ways-to-motivate-others",
    "title": "100 Ways to Motivate Others",
    "author": "Steve Chandler & Scott Richardson",
    "subtitle": "How Great Leaders Can Produce Insane Results Without Driving People Crazy",
    "description": "Quick and practical leadership tips for motivating teams.",
    "coverImage": "assets/covers/100_ways_motivate_others.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Leadership"
    },
    "popularity": {
      "author": 0.6,
      "book": 0.7
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "BUSINESS BESTSELLER",
    "majorAward": "",
    "bestsellers": 4,
    "awards": 0
  },
  {
    "id": 36,
    "slug": "managing-your-emotions",
    "title": "Managing Your Emotions",
    "author": "Joyce Meyer",
    "subtitle": "Instead of Your Emotions Managing You",
    "description": "A Christian guide to understanding and managing emotions for a peaceful life.",
    "coverImage": "assets/covers/managing_your_emotions.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Spirituality",
      "niche": "Christian Life"
    },
    "popularity": {
      "author": 0.9,
      "book": 0.85
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "NYT BESTSELLER",
    "majorAward": "",
    "bestsellers": 100,
    "awards": 20
  },
  {
    "id": 37,
    "slug": "one-year-to-an-organized-life",
    "title": "One Year to an Organized Life",
    "author": "Regina Leeds",
    "subtitle": "From Your Closets to Your Finances the Week-by-Week Guide to Getting Completely Organized For Good",
    "description": "A week-by-week program for organizing every aspect of your life.",
    "coverImage": "assets/covers/organized_life.png",
    "missingCoverFile": "",
    "tags": {
      "type": "Non-Fiction",
      "category": "Self-Help",
      "niche": "Organization"
    },
    "popularity": {
      "author": 0.5,
      "book": 0.6
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "NYT BESTSELLER",
    "majorAward": "",
    "bestsellers": 10,
    "awards": 0
  },
  {
    "id": 38,
    "slug": "advantage-play",
    "title": "Advantage Play",
    "author": "David Ben",
    "subtitle": "The Manager's Guide to Creative Problem Solving",
    "description": "Using techniques from magic and creative thinking to solve business problems.",
    "coverImage": "",
    "missingCoverFile": "advantage_play.png",
    "tags": {
      "type": "Non-Fiction",
      "category": "Business",
      "niche": "Problem Solving"
    },
    "popularity": {
      "author": 0.2,
      "book": 0.25
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "",
    "majorAward": "",
    "bestsellers": 0,
    "awards": 0
  },
  {
    "id": 39,
    "slug": "the-amazing-results-of-positive-thinking",
    "title": "The Amazing Results of Positive Thinking",
    "author": "Norman Vincent Peale",
    "subtitle": "",
    "description": "Classic advice on using positive thinking to achieve success and happiness.",
    "coverImage": "",
    "missingCoverFile": "positive_thinking.png",
    "tags": {
      "type": "Non-Fiction",
      "category": "Self-Help",
      "niche": "Positive Thinking"
    },
    "popularity": {
      "author": 0.95,
      "book": 0.9
    },
    "length": "Medium",
    "status": "available",
    "price": null,
    "format": "Physical",
    "stock": 1,
    "rating": null,
    "reviews": null,
    "accolade": "15 MILLION COPIES SOLD",
    "majorAward": "",
    "bestsellers": 40,
    "awards": 25
  }
];

  window.PF = window.PF || {};
  window.PF.booksData = booksData;
  window.PF.CATEGORIES = [
  "Business",
  "Christian Life",
  "Fantasy",
  "Finance",
  "Horror",
  "Music",
  "Psychology",
  "Relationships",
  "Sci-Fi",
  "Self-Help",
  "Spirituality",
  "Thriller",
  "Young Adult"
];
  window.PF.FORMATS = [
  "Physical"
];
  window.PF.LENGTHS = [
  "Long",
  "Medium",
  "Short"
];

  console.log(`[PF Data] Real inventory loaded: ${booksData.length} books`);
})();
