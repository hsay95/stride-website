// Programmatic SEO pages: /block/<slug>. One entry per app; the template is in pages.mjs.
// Keep claims about each app general and verifiable (no usage stats without a source).

export const BLOCK_APPS = [
  {
    slug: "instagram",
    name: "Instagram",
    tmName: "Instagram",
    web: "instagram.com",
    title: "How to Block Instagram on iPhone Until You Walk | Stride",
    description:
      "Lock Instagram on your iPhone and earn it back by walking. Every 500 steps unlocks 15 minutes, and Instagram relocks on its own when time is up.",
    h1: "Block Instagram until you've <em>walked for it.</em>",
    lede:
      "Stride keeps Instagram locked behind your steps. Walk 500 steps to unlock 15 minutes of Reels, Stories and DMs. When the minutes are used, Instagram locks itself again.",
    loopsTitle: "Why Instagram is hard to put down",
    loops: [
      { t: "Reels never run out", d: "Swipe up and the next full-screen video is already playing. There's no last Reel, so there's no natural place to stop." },
      { t: "Explore refills itself", d: "The Explore grid is picked from what you've engaged with before, and it keeps loading more the further you scroll." },
      { t: "Stories expire", d: "Stories disappear after 24 hours, which turns checking them into a habit you don't want to break." },
    ],
    bridge: "Stride doesn't change Instagram. It puts a short walk between you and the feed, so opening it becomes <em>a choice instead of a reflex.</em>",
    extraFaqs: [
      {
        q: "Does locking Instagram also lock Threads or Facebook?",
        a: "Only if you pick them too. Threads and Facebook are separate apps in Apple's app picker. The free plan locks one app; Stride Pro locks as many as you like, or a whole category such as Social.",
      },
    ],
  },
  {
    slug: "tiktok",
    name: "TikTok",
    tmName: "TikTok",
    web: "tiktok.com",
    title: "How to Block TikTok on iPhone Until You Walk | Stride",
    description:
      "Put TikTok behind your steps. Stride locks TikTok on iPhone until you walk: 500 steps earns 15 minutes, then it relocks automatically.",
    h1: "Block TikTok until you've <em>walked for it.</em>",
    lede:
      "Stride locks TikTok and hands it back in 15-minute passes you earn by walking. 500 steps buys one pass. When it runs out, TikTok locks again without you lifting a finger.",
    loopsTitle: "Why TikTok swallows whole evenings",
    loops: [
      { t: "It opens mid-video", d: "The For You feed starts playing the moment you open the app. There's no menu or decision point before the first video." },
      { t: "Short clips, long sessions", d: "Each video is short, so one more always feels small. Twenty of them add up to an hour you didn't plan to spend." },
      { t: "A feed that learns fast", d: "For You is tuned by what you watch, replay and skip, so it gets better at holding your attention the more you use it." },
    ],
    bridge: "TikTok is built so you never have to decide to keep watching. Stride makes you <em>decide to start.</em>",
    extraFaqs: [
      {
        q: "Isn't TikTok's own screen time limit enough?",
        a: "TikTok's built-in daily limit can be overridden from inside the app with a passcode you set yourself. With Stride, more TikTok time comes from walking, which is harder to wave away and good for you.",
      },
    ],
  },
  {
    slug: "youtube",
    name: "YouTube",
    tmName: "YouTube",
    web: "youtube.com",
    title: "How to Block YouTube on iPhone Until You Walk | Stride",
    description:
      "Lock the YouTube app, including Shorts, until you walk. Stride turns 500 steps into 15 minutes of YouTube and relocks it when time is up.",
    h1: "Block YouTube until you've <em>walked for it.</em>",
    lede:
      "Stride locks the YouTube app, Shorts and all, until you've earned the time. 500 steps unlocks 15 minutes. Save the rest of your bank for the video you actually meant to watch.",
    loopsTitle: "Why one video turns into ten",
    loops: [
      { t: "Autoplay picks for you", d: "When a video ends, the next one is already queued and counting down. Doing nothing means watching more." },
      { t: "Shorts scroll forever", d: "Shorts work like any vertical feed: swipe, play, repeat, with no end of the list to reach." },
      { t: "Always another pick", d: "The home feed and Up next are filled with recommendations, so there's always one more thing that looks worth a click." },
    ],
    bridge: "YouTube is great when you choose what to watch. Stride keeps it that way: <em>walk first, then pick.</em>",
    extraFaqs: [
      {
        q: "Can I lock only YouTube Shorts?",
        a: "No. Stride locks whole apps, not parts of them. Locking YouTube locks Shorts, the home feed and everything else in the app. YouTube Music is a separate app and stays open unless you lock it too.",
      },
    ],
  },
  {
    slug: "reddit",
    name: "Reddit",
    tmName: "Reddit",
    web: "reddit.com",
    title: "How to Block Reddit on iPhone Until You Walk | Stride",
    description:
      "Stop endless Reddit scrolling. Stride locks the Reddit app on iPhone until you walk: 500 steps earns 15 minutes, then Reddit relocks.",
    h1: "Block Reddit until you've <em>walked for it.</em>",
    lede:
      "Stride locks the Reddit app until your steps pay for it. Every 500 steps unlocks 15 minutes of threads, and Reddit locks itself again when your time is used.",
    loopsTitle: "Why Reddit is a rabbit hole",
    loops: [
      { t: "The front page keeps loading", d: "Home and Popular load more posts as you reach the bottom, so the end of the page never arrives." },
      { t: "Threads inside threads", d: "Comments nest into replies, and every reply chain has another one under it. Reading one turns into reading forty." },
      { t: "A community for everything", d: "There's a subreddit for every interest, which means there's always something new to check." },
    ],
    bridge: "Reddit rewards just one more thread. Stride rewards <em>just one more walk.</em>",
    extraFaqs: [
      {
        q: "I use a different Reddit app. Does Stride work with it?",
        a: "Yes. Stride locks whichever app you pick in Apple's app picker, so choose the Reddit app you actually use, or lock both with Stride Pro.",
      },
    ],
  },
  {
    slug: "x-twitter",
    name: "X (Twitter)",
    tmName: "X",
    web: "x.com",
    title: "How to Block X (Twitter) on iPhone Until You Walk | Stride",
    description:
      "Lock X, formerly Twitter, on your iPhone until you walk. Stride turns every 500 steps into 15 minutes of X and relocks it automatically.",
    h1: "Block X (Twitter) until you've <em>walked for it.</em>",
    lede:
      "Stride locks X behind your steps. Walk 500 to unlock 15 minutes of your timeline, then X locks again on its own, so a news check stays a news check.",
    loopsTitle: "Why X keeps pulling you back",
    loops: [
      { t: "A timeline that refreshes", d: "For You keeps surfacing new posts, so there's always something you haven't seen yet at the top." },
      { t: "Everything feels urgent", d: "Breaking news and trending topics make every check feel important, even when it can wait an hour." },
      { t: "Replies bring you back", d: "Mentions, replies and quote posts pull you back into conversations long after you meant to leave." },
    ],
    bridge: "The timeline will still be there after a walk. <em>So will you, a little calmer.</em>",
    extraFaqs: [
      {
        q: "Is X the same app as Twitter?",
        a: "Yes. Twitter was renamed X in 2023, and the iPhone app is now listed as X. Pick X in Apple's app picker to lock it.",
      },
    ],
  },
];
