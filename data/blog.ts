export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  author: {
    name: string;
    initial: string;
  };
  date: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'art-of-flower-arrangement',
    title: "The Art of Flower Arrangement: A Beginner's Guide",
    excerpt:
      "Discover the fundamentals of creating stunning floral arrangements. From selecting the right blooms to mastering balance and proportion, learn how to bring nature's beauty into your home.",
    content: `Creating beautiful flower arrangements is both an art and a skill that anyone can learn. Whether you're arranging a simple bouquet for your dining table or crafting an elaborate centerpiece for a special occasion, understanding the basics will help you create stunning displays.

## Choosing Your Flowers

The first step in any arrangement is selecting the right flowers. Consider these factors:

1. **Color palette** - Choose colors that complement each other. Monochromatic arrangements using different shades of the same color create elegance, while contrasting colors add drama.

2. **Texture variety** - Mix different textures for visual interest. Combine soft roses with spiky thistles or delicate baby's breath with bold sunflowers.

3. **Seasonal availability** - Working with seasonal flowers ensures freshness and often better prices. Spring offers tulips and peonies, summer brings dahlias and zinnias, autumn showcases chrysanthemums, and winter features amaryllis and hellebores.

## The Rule of Threes

Professional florists often work in odd numbers, particularly threes. Three focal flowers, three types of greenery, or three accent blooms create natural-looking arrangements that please the eye.

## Building Your Arrangement

Start with a clean vase filled with fresh water and flower food. Begin by creating a foundation with greenery, then add your focal flowers at varying heights. Fill in gaps with secondary flowers and finish with delicate accent blooms.

## Proportion and Balance

Your arrangement should be roughly 1.5 times the height of your vase. Create visual balance by distributing colors and textures evenly, but avoid perfect symmetry—nature isn't perfectly symmetrical, and neither should your arrangement be.

## Common Mistakes to Avoid

- **Overcrowding** - Give each stem room to breathe
- **Ignoring water levels** - Check and refill daily
- **Using dull tools** - Sharp scissors or floral knives create clean cuts
- **Forgetting to remove leaves** - Any foliage below the water line will rot

## Practice Makes Perfect

Don't be discouraged if your first arrangements don't look like magazine photos. Each bouquet is an opportunity to learn. Start with hardy flowers like carnations and chrysanthemums before moving to more delicate blooms like garden roses or ranunculus.

The joy of flower arranging lies in the creative process. Experiment, make mistakes, and most importantly, have fun bringing nature's beauty into your space.`,
    category: 'Tips & Tricks',
    readTime: 5,
    author: {
      name: 'Anastasya',
      initial: 'A',
    },
    date: 'February 20, 2026',
    image: '/images/blog/flower-arrangement.jpg',
  },
  {
    id: 2,
    slug: 'choosing-flowers-for-occasions',
    title: 'Choosing the Perfect Flowers for Every Occasion',
    excerpt:
      'From romantic gestures to sympathy arrangements, different occasions call for different blooms. Learn the meaning behind popular flowers and how to select the perfect bouquet for any event.',
    content: `Flowers speak a language all their own. Throughout history, people have used blooms to convey emotions, celebrate milestones, and offer comfort. Understanding which flowers suit different occasions helps you send the perfect message.

## Romantic Occasions

**Anniversaries and Valentine's Day**
Red roses remain the classic choice for romantic love, but consider these alternatives:
- **Peonies** symbolize romance, prosperity, and happy marriage
- **Tulips** represent perfect love, especially in red
- **Orchids** convey luxury, beauty, and strength

**First Dates**
Keep it simple and not too overwhelming. A small bouquet of mixed seasonal flowers or a single stem rose says "I'm interested" without being too intense.

## Celebrations

**Birthdays**
Match the arrangement to the recipient's personality. Bright, cheerful flowers like gerbera daisies and sunflowers work for energetic personalities, while elegant lilies or roses suit more refined tastes. Consider their favorite colors!

**Graduations**
Sunflowers symbolize success and achievement. Mixed bouquets in school colors also make thoughtful gifts.

**New Baby**
- **Pink** - roses, carnations, and peonies for girls
- **Blue** - hydrangeas, delphiniums, and irises for boys
- **Yellow and white** - a cheerful, gender-neutral option

## Sympathy and Condolences

When words fail, flowers can express what we cannot say. Traditional sympathy flowers include:
- **White lilies** - symbolize the restored innocence of the departed soul
- **White roses** - represent reverence and remembrance
- **Chrysanthemums** - in many cultures, these symbolize death and grief
- **Gladioli** - represent strength of character

Stick to soft, muted colors—whites, creams, soft pinks, and lavenders convey respect and sympathy.

## Get Well Soon

Bright, cheerful flowers can lift spirits during illness:
- **Daisies** - represent cheerfulness and hope
- **Sunflowers** - bring warmth and positive energy
- **Mixed colorful bouquets** - create an uplifting atmosphere

Avoid strongly scented flowers in hospitals, and always check facility policies first.

## Thank You

Express gratitude with:
- **Pink roses** - represent appreciation and gratitude
- **Hydrangeas** - symbolize heartfelt emotions
- **Mixed seasonal bouquets** - show thoughtfulness

## Professional Settings

**Congratulations on a new job or promotion**
Opt for sophisticated arrangements—orchids, calla lilies, or elegant mixed bouquets in neutral colors work well in office environments.

**Business gifts**
Keep arrangements professional and not too personal. Avoid red roses (too romantic) and choose green plants or neutral-colored arrangements.

## When in Doubt

If you're unsure which flowers to choose, seasonal mixed bouquets are always appropriate. They show thoughtfulness without the pressure of specific symbolism. Or simply ask your florist—we love helping customers find the perfect arrangement for any occasion!`,
    category: 'Guides',
    readTime: 7,
    author: {
      name: 'Sarah Chen',
      initial: 'S',
    },
    date: 'February 15, 2026',
    image: '/images/blog/occasions.jpg',
  },
  {
    id: 3,
    slug: 'caring-for-fresh-flowers',
    title: 'How to Make Your Fresh Flowers Last Longer',
    excerpt:
      'Your beautiful bouquet deserves to stay fresh as long as possible. Discover expert tips on water, trimming, placement, and special tricks to extend the life of your flowers.',
    content: `You've received a gorgeous bouquet of fresh flowers—now how do you keep them looking beautiful as long as possible? With proper care, many cut flowers can last 7-14 days or even longer. Here are our expert tips for extending the life of your blooms.

## Immediate Care

**The First Hour Matters**
As soon as you receive flowers, unwrap them and follow these steps:

1. **Fill a clean vase** with lukewarm water (not cold—it's harder for stems to absorb)
2. **Add flower food** if provided, or make your own (recipe below)
3. **Cut the stems** at a 45-degree angle, removing 1-2 inches
4. **Remove lower leaves** that would sit below the water line
5. **Arrange loosely** to allow air circulation

## The Perfect Environment

**Location, Location, Location**
Where you place your flowers significantly impacts their lifespan:

- **Avoid direct sunlight** - It causes flowers to wilt faster
- **Keep away from heat sources** - Radiators, appliances, and electronics generate heat
- **Avoid fruit bowls** - Ripening fruit releases ethylene gas, which ages flowers quickly
- **Skip drafty areas** - Air conditioning vents and open windows can dehydrate blooms

**Temperature Matters**
Flowers last longest in cool environments (65-72°F / 18-22°C). Some people even place arrangements in the refrigerator overnight to extend their life!

## Daily Maintenance

**Water Changes**
Change the water every 2-3 days—or daily in warm weather. Bacteria in old water clogs stems and shortens flower life.

**Re-cutting Stems**
Each time you change water, trim 1/2 inch from the stems. This removes any blocked tissue and allows better water absorption.

**Remove Dying Blooms**
As individual flowers fade, remove them immediately. Dying flowers release ethylene gas that affects healthy blooms.

## DIY Flower Food

No flower food packet? Make your own:
- 1 quart warm water
- 2 tablespoons lemon juice (provides acidity)
- 1 tablespoon sugar (provides food)
- 1/2 teaspoon bleach (fights bacteria)

Or try these household alternatives:
- **Sprite or 7-Up** (1 part soda to 3 parts water) - the sugar and citric acid help
- **Apple cider vinegar** (2 tablespoons per quart) + sugar (2 tablespoons)

## Special Tips by Flower Type

**Roses**
Remove guard petals (outer damaged petals), crush the bottom inch of stems gently to increase water absorption.

**Tulips**
Use cold water and a clean vase. Tulips continue growing in the vase and will bend toward light—rotate your arrangement daily.

**Hydrangeas**
These thirsty flowers benefit from misting. If they wilt, submerge the entire head in cool water for 30 minutes.

**Lilies**
Remove the orange pollen stamens to prevent staining and extend bloom life.

**Sunflowers**
These sturdy flowers prefer lots of water. Check levels daily as they drink heavily.

## Signs It's Time to Say Goodbye

Even with the best care, all flowers eventually fade. It's time to compost when:
- Petals fall off easily
- Stems become slimy
- Water becomes cloudy quickly despite changes
- Flowers develop an unpleasant smell

## One Final Tip

Buy from quality florists who source fresh flowers and handle them properly. The freshest flowers will always last longest, no matter what tricks you use!`,
    category: 'Care Tips',
    readTime: 4,
    author: {
      name: 'Michael Park',
      initial: 'M',
    },
    date: 'February 10, 2026',
    image: '/images/blog/flower-care.jpg',
  },
  {
    id: 4,
    slug: 'wedding-flower-trends-2026',
    title: 'Wedding Flower Trends to Watch in 2026',
    excerpt:
      "Planning your special day? Explore this year's most popular wedding flower trends, from romantic pastels to bold tropical arrangements. Find inspiration for your dream wedding florals.",
    content: `Wedding flowers set the tone for your entire celebration. As we move through 2026, exciting new trends are emerging alongside timeless classics. Whether you're planning an intimate garden ceremony or a grand ballroom reception, here's what's trending in wedding florals this year.

## The Rise of Dried and Preserved Flowers

Sustainability meets style in this growing trend. Dried flowers offer:
- **Longevity** - Arrange months in advance without worry
- **Sustainability** - No refrigeration needed, less waste
- **Unique texture** - Pampas grass, dried palms, and preserved roses add dimension
- **Keepsake potential** - Your bouquet becomes a permanent memento

Combine dried elements with fresh blooms for a contemporary look that photographs beautifully.

## Bold, Saturated Colors

2026 is seeing a shift away from blush and pastels toward richer, more dramatic palettes:

- **Burgundy and wine** - Deep, romantic, and sophisticated
- **Burnt orange and terracotta** - Perfect for autumn weddings
- **Cobalt blue** - Unexpected and striking
- **Jewel tones** - Emerald, sapphire, and amethyst combinations

Don't be afraid to make a statement with color!

## Romantic Garden Style

Loose, unstructured arrangements that look freshly gathered from a garden remain popular:
- Flowing greenery with trailing elements
- Mixed textures and flower varieties
- Imperfect, organic shapes
- Seasonal, locally-sourced blooms

This style works beautifully for outdoor and rustic venues.

## Minimalist Elegance

On the opposite end, some couples are embracing "less is more":
- Single-variety bouquets (all white roses, or all ranunculus)
- Monochromatic color schemes
- Clean, architectural arrangements
- Negative space as a design element

This trend suits modern venues and couples who prefer understated sophistication.

## Statement Installations

Large-scale floral installations are becoming more popular than ever:
- **Flower walls** - Perfect backdrops for ceremonies and photos
- **Hanging installations** - Suspended arrangements above reception tables
- **Floral arches** - From traditional to asymmetrical designs
- **Ceiling meadows** - Overhead gardens creating immersive environments

These make stunning visual impacts and eliminate the need for extensive additional decor.

## Unexpected Elements

2026 weddings are incorporating surprising additions:
- **Fruits** - Lemons, pomegranates, and grapes add color and texture
- **Vegetables** - Artichokes, kale flowers, and ornamental cabbage
- **Herbs** - Rosemary, lavender, and sage for fragrance
- **Branches** - Flowering branches create height and drama

## Popular Flowers This Year

While trends change, certain blooms are having a moment:
- **Ranunculus** - The rose's more interesting cousin
- **Lisianthus** - Delicate, romantic, and long-lasting
- **Dahlias** - Available in virtually every color
- **Pampas grass** - The dried element that's here to stay
- **Sweet peas** - Delicate and wonderfully fragrant
- **Protea** - Bold, architectural, and unique

## Eco-Conscious Choices

Sustainability is increasingly important to couples:
- **Seasonal and local flowers** - Lower carbon footprint
- **Foam-free arrangements** - Using sustainable mechanics
- **Potted plants** - Guests can take home as favors
- **Donation programs** - Repurposing wedding flowers for hospital patients

## Working with Your Florist

To bring your vision to life:
1. Start with inspiration images, but stay open to alternatives
2. Consider your venue's existing features
3. Be realistic about budget (installations cost more than bouquets)
4. Trust your florist's expertise on seasonal availability
5. Book early—the best florists fill up quickly!

Your wedding flowers should reflect your personality as a couple. Whether you embrace the latest trends or stick with timeless classics, choose what speaks to you. After all, this is your day to celebrate!`,
    category: 'Trends',
    readTime: 6,
    author: {
      name: 'Emma Rodriguez',
      initial: 'E',
    },
    date: 'February 5, 2026',
    image: '/images/blog/wedding-trends.jpg',
  },
  {
    id: 5,
    slug: 'sustainable-floristry',
    title: 'Sustainable Floristry: Eco-Friendly Flower Choices',
    excerpt:
      'Learn how to enjoy beautiful flowers while being kind to the planet. We explore locally-sourced blooms, seasonal selections, and sustainable practices in modern floristry.',
    content: `The flower industry, like many others, is reckoning with its environmental impact. From carbon-intensive imports to plastic packaging and floral foam, traditional floristry practices can harm the planet. But a growing movement toward sustainable floristry offers beautiful alternatives that let you enjoy flowers with a clearer conscience.

## The Environmental Cost of Conventional Flowers

Before exploring solutions, let's understand the challenges:

- **Air miles** - Many flowers travel thousands of miles from South America, Africa, or the Netherlands
- **Refrigeration** - Cold chain logistics consume significant energy
- **Pesticides** - Conventional flower farming often uses heavy chemicals
- **Plastic waste** - Cellophane wrapping, foam, and other single-use materials
- **Floral foam** - This common arranging tool is non-biodegradable plastic

## Choosing Sustainable Flowers

**Buy Local**
Local flowers may not offer year-round peonies, but they provide:
- Reduced transportation emissions
- Support for local farmers and economies
- Peak freshness (harvested days, not weeks ago)
- Connection to your local landscape and seasons

**Embrace Seasonality**
Learning what blooms when reconnects us with natural cycles:
- **Spring**: Tulips, daffodils, ranunculus, sweet peas
- **Summer**: Dahlias, zinnias, sunflowers, cosmos
- **Autumn**: Chrysanthemums, celosia, marigolds
- **Winter**: Evergreens, berries, hellebores, amaryllis

Seasonal flowers are more affordable and require less energy to produce.

**Grow Your Own**
Even a small balcony can produce cut flowers:
- Zinnias and cosmos are easy from seed
- Sweet peas climb trellises on tiny patios
- Herbs like lavender and rosemary add fragrance to arrangements
- Dahlias reward minimal effort with abundant blooms

## Sustainable Alternatives to Cut Flowers

**Potted Plants**
Living plants last indefinitely and can be:
- Replanted in gardens
- Given as gifts that keep growing
- Enjoyed indoors for months or years

**Dried Flowers**
Once considered old-fashioned, dried flowers are back:
- No refrigeration needed
- Last months or years
- Zero water consumption once dried
- Create beautiful, sustainable décor

**Foraged and Garden Flowers**
With permission, gather:
- Flowering branches in spring
- Autumn leaves and berries
- Interesting seed pods
- Greenery and herbs

## Asking the Right Questions

When buying flowers, consider asking:
- Where are these flowers grown?
- Are they certified (organic, fair trade, Rainforest Alliance)?
- Do you use floral foam?
- How are the flowers wrapped?

Many florists are happy to accommodate sustainable requests.

## Sustainable Practices at Home

**Reuse and Recycle**
- Clean and reuse vases
- Compost flowers when they fade
- Return or recycle any packaging
- Repurpose ribbon and paper

**Extend Flower Life**
The longer your flowers last, the less frequently you need to buy:
- Change water regularly
- Keep away from heat and fruit
- Remove dying stems promptly

**Skip the Extras**
Those plastic water tubes, cellophane wrapping, and decorative picks all end up in landfills. Ask for minimal packaging or bring your own container.

## The Future of Floristry

The industry is evolving:
- **Foam-free floristry** is becoming standard for many designers
- **Carbon-neutral shipping** options are emerging
- **Regenerative farming** practices are gaining ground
- **Seasonal subscriptions** from local farms are growing

## Making a Difference

Every bouquet is an opportunity to make better choices. You don't have to be perfect—even small changes help:
- Choose local once in a while
- Skip the plastic wrapping
- Compost your flowers
- Support florists who prioritize sustainability

Beautiful flowers and environmental responsibility can coexist. By making thoughtful choices, we can enjoy nature's beauty while protecting it for future generations.`,
    category: 'Sustainability',
    readTime: 5,
    author: {
      name: 'Lisa Anderson',
      initial: 'L',
    },
    date: 'January 28, 2026',
    image: '/images/blog/sustainable.jpg',
  },
  {
    id: 6,
    slug: 'language-of-flowers',
    title: 'The Language of Flowers: What Each Bloom Means',
    excerpt:
      'Flowers have been used to convey messages for centuries. Discover the hidden meanings behind roses, lilies, tulips, and more. Express your feelings through the perfect floral choice.',
    content: `Long before text messages and emails, people communicated through flowers. During the Victorian era, "floriography"—the language of flowers—allowed people to express feelings that couldn't be spoken aloud. While we may not follow strict floral etiquette today, understanding flower meanings adds depth to the bouquets we give and receive.

## The History of Flower Meanings

Floriography reached its peak in Victorian England, where strict social codes limited direct expression of emotions. Entire conversations could be conducted through carefully chosen blooms. The angle at which a flower was held, whether it was given with the right or left hand, even if the ribbon was tied to the left or right—all carried meaning.

Today, while we've relaxed these strict rules, flower symbolism still enriches our celebrations and condolences.

## Roses: The Language of Love

No flower carries more symbolic weight than the rose:

- **Red rose** - Deep romantic love and desire
- **Pink rose** - Grace, gratitude, and admiration
- **White rose** - Purity, innocence, and new beginnings
- **Yellow rose** - Friendship, joy, and caring (though historically meant jealousy)
- **Orange rose** - Enthusiasm, passion, and energy
- **Lavender rose** - Enchantment and love at first sight
- **Black rose** - Death, farewell, or rebirth (often dyed)

The number of roses also carries meaning: one rose says "I love you," a dozen represents complete devotion, and 50 roses signify unconditional love.

## Popular Flowers and Their Meanings

**Tulips**
- Red tulips: Declaration of love
- Yellow tulips: Cheerful thoughts
- White tulips: Forgiveness
- Purple tulips: Royalty

**Lilies**
- White lily: Purity and virtue
- Stargazer lily: Ambition and encouragement
- Calla lily: Magnificent beauty
- Tiger lily: Wealth and pride

**Carnations**
- Red carnation: Deep love and admiration
- Pink carnation: A mother's undying love
- White carnation: Pure love and good luck
- Yellow carnation: Disappointment or rejection (use carefully!)

**Daisies**
Innocence, loyal love, and purity. The classic "he loves me, he loves me not" flower represents true love and keeping secrets.

**Sunflowers**
Adoration, loyalty, and longevity. Their tendency to follow the sun symbolizes constant devotion.

**Orchids**
Luxury, beauty, and strength. In ancient Greece, they were associated with virility. Today, they represent refined beauty and thoughtfulness.

**Peonies**
Romance, prosperity, and good fortune. In Chinese culture, they're known as the "king of flowers" and represent wealth and honor. They're particularly popular in wedding bouquets.

**Hydrangeas**
Heartfelt emotions, gratitude, and understanding. In negative contexts, they can represent boastfulness or vanity (due to their abundant blooms).

**Lavender**
Devotion, serenity, and grace. Its calming scent has made it a symbol of tranquility for centuries.

## Flowers for Difficult Times

**Sympathy and Condolences**
- White lilies: Restored innocence of the soul
- White roses: Reverence and humility
- Gladioli: Strength of character
- Chrysanthemums: Death and grief (in many cultures)

**Apologies**
- White tulips: Forgiveness
- Purple hyacinth: "I'm sorry, please forgive me"
- White orchids: Humble apology

## Flowers with Warnings

Some flowers carry negative connotations:
- **Yellow carnations**: Disappointment or disdain
- **Petunias**: Anger and resentment
- **Buttercups**: Ingratitude or childishness
- **Orange lilies**: Hatred or disdain

These are rarely given today, but understanding their meanings adds context to historical literature and art.

## Using Flower Language Today

While few people still speak fluent floriography, you can use flower meanings to:
- Add depth to gifts for special occasions
- Choose meaningful wedding flowers
- Select appropriate sympathy arrangements
- Create personalized bouquets with symbolic significance

When in doubt, ask your florist. We love helping customers find flowers that convey exactly the right message. After all, sometimes flowers say what words cannot.`,
    category: 'Inspiration',
    readTime: 8,
    author: {
      name: 'David Kim',
      initial: 'D',
    },
    date: 'January 20, 2026',
    image: '/images/blog/flower-meanings.jpg',
  },
];

// Helper functions
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}