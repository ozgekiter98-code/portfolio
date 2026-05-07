(function attachProjectPage(global) {
  const VERCEL_BLOB_BASE_URL = "https://yyukhmkupbovs5lx.public.blob.vercel-storage.com";
  const MEDIA_BLOB_BASE_URL = "https://yyukhmkupbovs5lx.public.blob.vercel-storage.com/assets/Media";
  const CLASSIC_STRIPES_ASSET_BLOB_BASE_URL =
    "https://yyukhmkupbovs5lx.public.blob.vercel-storage.com/assets/projects/The_Classic_Stripes/TCS-WebsiteUI/public/TCSassets";
  const ISTINARA_ASSET_BLOB_BASE_URL = VERCEL_BLOB_BASE_URL + "/assets/projects/ISTINARA";
  const ISTINARA_AXO_LIGHT_SRC = ISTINARA_ASSET_BLOB_BASE_URL + "/Axo-light.png";
  const ISTINARA_AXO_DARK_SRC = ISTINARA_ASSET_BLOB_BASE_URL + "/Axo-dark.png";
  const PROJECT_GALLERIES = {
    istinara: {
      basePath: ISTINARA_ASSET_BLOB_BASE_URL,
      folder: "ISTINARA",
      files: ["render1.png", "render4.png", "render3.png", "render2.png", "render5.png", "render6.png"]
    },
    "classic-stripes": {
      folder: "TheClassicStripes",
      files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"]
    },
    wrapchat: {
      folder: "Wrapchat",
      files: [
        "post_02.png",
        "post_04.png",
        {
          src: "post_03.png",
          defaultActive: true
        },
        {
          src: MEDIA_BLOB_BASE_URL + "/Gallery/Wrapchat/socialspost.MOV",
          type: "video",
          alt: "WrapChat social post video"
        },
        "post_05.png",
        "post_06.png"
      ]
    }
  };

  const WRAPCHAT_FICTIONAL_DEMO_CARDS = [
      {
        section: "THE ROAST",
        theme: "roast",
        title: "Who's more obsessed?",
      type: "bars",
      bars: [
        { label: "Alex", value: 28441, color: "#e16235" },
        { label: "Elliot", value: 21993, color: "#4f8fd8" }
      ],
      subtitle: "56% of all messages came from Alex.",
      quote: "Alex is absolutely carrying this friendship on texting stamina alone.",
      nextLabel: "Next →",
      hideBack: true
    },
    {
      section: "THE ROAST",
      theme: "roast",
      title: "The Ghost Award",
      type: "winnerInsight",
      winner: "Elliot",
      subtitle: "Alex avg reply: 18m    Elliot avg reply: 2h 11m",
      insightLabel: "WHAT'S REALLY GOING ON",
      insightBody: "Elliot disappears mid-conversation like a character leaving the plot for dramatic tension, then returns six hours later with memes and absolutely no explanation.",
      quote: "Elliot treats replying like a side quest."
    },
    {
      section: "THE ROAST",
      theme: "roast",
      title: "The Last Word",
      type: "winner",
      winner: "Alex Rivera",
      subtitle: "Sends the final unanswered message 1,143 times.",
      quote: "Last seen: Alex adding 'anyway' after already ending the conversation twice."
    },
    {
      section: "THE LOVELY",
      theme: "lovely",
      title: "Your longest streak",
      type: "winner",
      winner: "27 days",
      subtitle: "Texted every single day for 27 days straight.",
      quote: "At this point you basically became part of each other's routines."
    },
    {
      section: "THE LOVELY",
      theme: "lovely",
      title: "The Kindest One",
      type: "winnerInsight",
      winner: "Elliot",
      insightLabel: "THE SWEETEST MOMENT",
      insightBody: "When Alex casually mentioned he hadn't eaten all day, Elliot ordered food to his apartment without telling him and pretended it \"was probably a delivery mistake.\""
    },
    {
      section: "THE LOVELY",
      theme: "lovely",
      title: "Top 3 most active months",
      type: "months",
      months: [
        { medal: "🥇", month: "October 2024", count: "4,912 msgs" },
        { medal: "🥈", month: "January 2025", count: "4,301 msgs" },
        { medal: "🥉", month: "July 2024", count: "3,884 msgs" }
      ],
      subtitle: "October 2024 was emotionally loud."
    },
    {
      section: "THE LOVELY",
      theme: "lovely",
      title: "Who always reaches out first?",
      type: "winner",
      winner: "Alex Rivera",
      subtitle: "Started 68% of all conversations.",
      quote: "Someone's pretending not to care less than the other one."
    },
    {
      section: "THE FUNNY",
      theme: "funny",
      title: "The Funny One",
      type: "winnerInsight",
      winner: "Alex",
      insightLabel: "DROPS LINES LIKE",
      insightBody: "After accidentally walking into the wrong yoga class and staying for twenty minutes out of politeness, Alex described the experience like a war documentary while Elliot nearly passed out laughing."
    },
    {
      section: "THE FUNNY",
      theme: "funny",
      title: "Spirit emojis",
      type: "emojis",
      emojis: [
        { emoji: "🫠", name: "Alex Rivera" },
        { emoji: "☕️", name: "Elliot" }
      ],
      subtitle: "These two emojis basically ARE this friendship."
    },
    {
      section: "THE FUNNY",
      theme: "funny",
      title: "Top 10 most used words",
      type: "ranked",
      items: [
        ["literally", "482x"],
        ["insane", "401x"],
        ["wait", "377x"],
        ["bro", "355x"],
        ["crying", "291x"],
        ["actually", "264x"],
        ["please", "243x"],
        ["unreal", "198x"],
        ["obsessed", "177x"],
        ["no because", "166x"]
      ]
    },
    {
      section: "THE FUNNY",
      theme: "funny",
      title: "Signature phrases",
      type: "phrases",
      phrases: [
        { phrase: "i'm actually done this time", note: "never actually done", name: "Alex Rivera" },
        { phrase: "wait wait wait", note: "usually before chaos", name: "Elliot" }
      ],
      subtitle: "The phrases that basically summarize your entire dynamic."
    },
    {
      section: "THE STATS",
      theme: "stats",
      title: "Message length",
      type: "stats",
      stats: [
        { value: "22", label: "avg chars", detail: "max 481", name: "Alex Rivera" },
        { value: "37", label: "avg chars", detail: "max 912", name: "Elliot" }
      ],
      quote: "One sends paragraphs. The other sends emotional jumpscares like 'bro.'"
    },
    {
      section: "THE STATS",
      theme: "stats",
      title: "Media and links",
      type: "barGroups",
      groups: [
        { label: "PHOTOS & VIDEOS", bars: [{ label: "Alex", value: 1248, color: "#39b99b" }, { label: "Elliot", value: 803, color: "#4f8fd8" }] },
        { label: "VOICE MEMOS", bars: [{ label: "Alex", value: 18, color: "#39b99b" }, { label: "Elliot", value: 42, color: "#4f8fd8" }] },
        { label: "LINKS SHARED", bars: [{ label: "Alex", value: 219, color: "#39b99b" }, { label: "Elliot", value: 177, color: "#4f8fd8" }] }
      ]
    },
    {
      section: "INSIGHT",
      theme: "insight",
      title: "What you actually talk about",
      type: "insightStack",
      insights: [
        {
          label: "BIGGEST TOPIC",
          body: "Work disasters, emotionally confusing people, overpriced coffee, career crises, and the shared belief that nobody knows what they're doing."
        },
        {
          label: "MOST TENSE MOMENT",
          body: "Elliot disappearing for six hours after saying \"we need to talk later,\" while Alex immediately assumed somebody died."
        }
      ]
    },
    {
      section: "INSIGHT",
      theme: "insight",
      title: "The Drama Report",
      type: "winnerInsight",
      winner: "Alex",
      insightLabel: "HOW THEY DO IT",
      insightBody: "Alex treats every small inconvenience like season finale material — missed trains, weird coworkers, unread texts, suspiciously passive-aggressive Spotify lyrics. Elliot mostly adds fuel instead of solutions."
    },
    {
      section: "INSIGHT",
      theme: "insight",
      title: "What's really going on",
      type: "insightStack",
      insights: [
        {
          label: "CO-WORKERS TURNED BEST FRIENDS",
          body: "Started with work complaints and accidentally became the first person each other texts during emotional emergencies, bad dates, and grocery store breakdowns."
        }
      ]
    },
    {
      section: "INSIGHT",
      theme: "insight",
      title: "Chat vibe",
      type: "quoteCard",
      quote: "Two people who somehow turn every minor inconvenience into a 45-minute cinematic discussion.",
      subtitle: "Powered by AI — your messages never left your device.",
      nextLabel: "See summary →"
    },
    {
      section: "WRAPCHAT",
      theme: "wrapchat",
      title: "Your chat, unwrapped.",
      type: "summary",
      cells: [
        { label: "MOST TEXTS", value: "Alex Rivera" },
        { label: "GHOST AWARD", value: "Elliot" },
        { label: "FUNNIEST", value: "Alex" },
        { label: "TOP WORD", value: "\"literally\"" },
        { label: "SPIRIT EMOJIS", value: "🫠 ☕️" },
        { label: "BEST STREAK", value: "27 days" }
      ],
      quote: "Half emotional support hotline, half conspiracy podcast hosted at 1AM.",
      nextLabel: "My Results"
    }
  ];

  const WRAPCHAT_FICTIONAL_ADDITIONAL_REPORTS = {
    toxicity: [
      {
        section: "TOXICITY REPORT",
        theme: "toxicity",
        title: "Chat Health Score",
        type: "scoreInsight",
        score: "6 / 10",
        subtitle: "Out of 10 — based on conflict patterns, communication style, emotional pressure, and overall dynamic.",
        insightLabel: "VERDICT",
        insightBody: "A connection that swings between genuine emotional honesty and low-level emotional chaos. Arguments rarely fully explode, but tension tends to linger underneath jokes and sarcasm.",
        hideBack: false
      },
      {
        section: "TOXICITY REPORT",
        theme: "toxicity",
        title: "Individual health scores",
        type: "personScores",
        people: [
          {
            name: "Jordan",
            score: "7 / 10",
            body: "Emotionally direct and usually willing to communicate problems openly, but occasionally escalates situations through overexplaining and frustration spirals."
          },
          {
            name: "Alex",
            score: "5 / 10",
            body: "Avoids difficult conversations until tension builds too much, then suddenly becomes extremely reactive instead of addressing things gradually."
          }
        ]
      },
      {
        section: "TOXICITY REPORT",
        theme: "toxicity",
        title: "Who apologises more",
        type: "winnerInsightStack",
        winner: "Jordan",
        insights: [
          {
            label: "JORDAN — CONTEXT",
            body: "Usually apologises quickly after arguments, even when only partially responsible, mostly to restore emotional balance fast."
          },
          {
            label: "ALEX — CONTEXT",
            body: "Tends to explain intentions instead of directly apologising, especially during emotionally charged conversations."
          }
        ]
      },
      {
        section: "TOXICITY REPORT",
        theme: "toxicity",
        title: "Red flag moments",
        type: "entries",
        entries: [
          {
            label: "2025-02-11 • ALEX",
            body: "Turned a small scheduling misunderstanding into a passive-aggressive silence that lasted almost an entire day.",
            quote: "do whatever you want honestly"
          },
          {
            label: "2025-03-08 • JORDAN",
            body: "Used humor to dismiss a concern Alex was clearly trying to communicate seriously.",
            quote: "bro you're acting like we're divorcing"
          },
          {
            label: "2025-04-17 • ALEX",
            body: "Repeatedly replied with one-word answers during an active disagreement instead of engaging with the conversation.",
            quote: "k"
          }
        ]
      },
      {
        section: "TOXICITY REPORT",
        theme: "toxicity",
        title: "Conflict pattern",
        type: "insightStack",
        insights: [
          {
            label: "HOW ARGUMENTS UNFOLD",
            body: "Tension usually starts indirectly through sarcasm, delayed replies, or emotional withdrawal. One person pushes for clarity while the other avoids escalation until the pressure suddenly bursts."
          }
        ]
      },
      {
        section: "TOXICITY REPORT",
        theme: "toxicity",
        title: "Power balance",
        type: "winnerInsight",
        winner: "Slightly uneven",
        insightLabel: "POWER DYNAMIC",
        insightBody: "Jordan emotionally carries most difficult conversations, while Alex tends to control the pace of reconnection by withdrawing and returning unpredictably."
      },
      {
        section: "TOXICITY REPORT",
        theme: "toxicity",
        title: "The verdict",
        type: "scoreInsight",
        score: "6 / 10",
        subtitle: "Overall chat health score.",
        insightLabel: "FINAL READ",
        insightBody: "The connection still has warmth and emotional attachment underneath the tension, but communication habits occasionally turn small problems into emotionally exhausting loops.",
        footer: "Reflects patterns in this sample — not a final judgment.",
        nextLabel: "My Results"
      }
    ],
    lovelang: [
      {
        section: "LOVE LANGUAGE",
        theme: "lovelang",
        title: "Sam's love language",
        type: "winnerInsight",
        winner: "Words of affirmation",
        insightLabel: "HOW THEY SHOW IT",
        insightBody: "Constant encouragement, dramatic compliments, random \"thinking about you\" texts, and emotional check-ins hidden inside casual conversation.",
        hideBack: true
      },
      {
        section: "LOVE LANGUAGE",
        theme: "lovelang",
        title: "Taylor's love language",
        type: "winnerInsight",
        winner: "Quality time",
        insightLabel: "HOW THEY SHOW IT",
        insightBody: "Shows closeness through long calls, shared routines, late-night conversations, playlists, spontaneous plans, and making space for uninterrupted attention."
      },
      {
        section: "LOVE LANGUAGE",
        theme: "lovelang",
        title: "The language gap",
        type: "insightStack",
        insights: [
          {
            label: "DO THEY SPEAK THE SAME LANGUAGE?",
            body: "Sam expresses affection verbally and emotionally in real time, while Taylor shows it through consistency and presence. Different styles, but both still feel recognized by the other."
          }
        ]
      },
      {
        section: "LOVE LANGUAGE",
        theme: "lovelang",
        title: "Most loving moment",
        type: "insightStack",
        insights: [
          {
            label: "THE MOMENT",
            body: "When Sam casually mentioned being overwhelmed during finals week, Taylor created a shared \"survival playlist,\" ordered food to their apartment, and stayed on call silently while they worked."
          }
        ]
      },
      {
        section: "LOVE LANGUAGE",
        theme: "lovelang",
        title: "Love language compatibility",
        type: "scoreInsight",
        score: "9 / 10",
        insightLabel: "COMPATIBILITY READ",
        insightBody: "High compatibility — one person brings emotional reassurance, the other brings stability and presence. The dynamic feels emotionally safe without becoming repetitive.",
        nextLabel: "My Results"
      }
    ],
    growth: [
      {
        section: "GROWTH REPORT",
        theme: "growth",
        title: "Then vs Now",
        type: "dualText",
        blocks: [
          {
            label: "EARLY MESSAGES",
            body: "Mostly chaotic updates, reactive storytelling, ironic flirting, and constant \"what just happened\" energy without much emotional depth yet."
          },
          {
            label: "RECENT MESSAGES",
            body: "More emotionally grounded conversations about work pressure, future plans, burnout, relationships, and personal growth with noticeably more patience."
          }
        ],
        subtitle: "Conversations got deeper over time.",
        hideBack: true
      },
      {
        section: "GROWTH REPORT",
        theme: "growth",
        title: "Who changed more",
        type: "winnerInsight",
        winner: "Jamie",
        insightLabel: "HOW THEY CHANGED",
        insightBody: "Jamie slowly shifted from performing confidence to openly discussing fear, uncertainty, burnout, and long-term goals instead of masking everything through humor."
      },
      {
        section: "GROWTH REPORT",
        theme: "growth",
        title: "What changed in the chat",
        type: "dualText",
        blocks: [
          {
            label: "TOPICS THAT APPEARED",
            body: "Career anxiety, moving cities, emotional boundaries, healthier routines, therapy, future planning, and creative ambitions."
          },
          {
            label: "TOPICS THAT FADED",
            body: "Constant relationship drama, vague flirting cycles, attention-seeking arguments, and emotionally reactive late-night spirals."
          }
        ]
      },
      {
        section: "GROWTH REPORT",
        theme: "growth",
        title: "The arc",
        type: "insightStack",
        insights: [
          {
            label: "OVERALL READ",
            body: "What started as impulsive chaos and mutual distraction gradually became a stable emotional support system. Less intensity, more trust, and significantly more honesty."
          }
        ],
        nextLabel: "My Results"
      }
    ],
    accounta: [
      {
        section: "ACCOUNTABILITY",
        theme: "accounta",
        title: "Promises made",
        type: "statInsight",
        stats: [
          { value: "3", label: "promises", name: "Maya" },
          { value: "5", label: "promises", name: "Lena" }
        ],
        insightLabel: "OVERALL VERDICT",
        insightBody: "Both follow through on emotionally important things more than practical ones. The failures are rarely dramatic — they usually come from exhaustion, timing, or conversations drifting into chaos before the original plan survives."
      },
      {
        section: "ACCOUNTABILITY",
        theme: "accounta",
        title: "Maya's accountability",
        type: "scoreStatsInsight",
        score: "8 / 10",
        stats: [
          { value: "2", label: "kept" },
          { value: "1", label: "broken" }
        ],
        insightLabel: "PATTERN",
        insightBody: "Usually delivers when the promise is tied to emotional support or presence. Has a tendency to disappear mid-conversation during stressful weeks, but almost always circles back with context instead of pretending it never happened."
      },
      {
        section: "ACCOUNTABILITY",
        theme: "accounta",
        title: "Lena's accountability",
        type: "scoreStatsInsight",
        score: "7 / 10",
        stats: [
          { value: "4", label: "kept" },
          { value: "1", label: "broken" }
        ],
        insightLabel: "PATTERN",
        insightBody: "Keeps plans surprisingly well considering how impulsive the conversations feel. Most broken promises come from overcommitting socially and assuming she'll \"figure it out later.\""
      },
      {
        section: "ACCOUNTABILITY",
        theme: "accounta",
        title: "Most notable broken promise",
        type: "receipt",
        receiptLabel: "2024-11-18 • LENA",
        receiptQuote: "I'll send you the full voice note tonight, I swear. You need the entire story.",
        receiptBody: "The voice note became a running joke after being delayed across four separate conversations before finally arriving three days later at 2:14 AM."
      },
      {
        section: "ACCOUNTABILITY",
        theme: "accounta",
        title: "Most notable kept promise",
        type: "receipt",
        receiptLabel: "2025-01-07 • MAYA",
        receiptQuote: "You are NOT going to that appointment alone. I'll call during my break if I can't physically make it.",
        receiptBody: "Even during a workday, Maya checked in repeatedly and stayed present through the entire situation exactly as promised.",
        nextLabel: "My Results"
      }
    ],
    energy: [
      {
        section: "ENERGY REPORT",
        theme: "energy",
        title: "Net energy scores",
        type: "statInsight",
        stats: [
          { value: "8 / 10", label: "Maya", detail: "net positive" },
          { value: "9 / 10", label: "Lena", detail: "net positive" }
        ],
        insightLabel: "ENERGY COMPATIBILITY",
        insightBody: "Lena brings unpredictable stories and emotional momentum. Maya stabilizes the chaos without flattening it. One escalates the energy, the other gives it somewhere safe to land."
      },
      {
        section: "ENERGY REPORT",
        theme: "energy",
        title: "Maya's energy",
        type: "insightStack",
        insights: [
          {
            label: "POSITIVE ENERGY",
            body: "Acts as the emotional anchor of the friendship — reacts fast, remembers details, and somehow always knows when Lena is spiraling before Lena admits it herself."
          },
          {
            label: "DRAINING PATTERNS",
            body: "Absorbs other people's stress too easily and occasionally turns small frustrations into full emotional investigations."
          }
        ],
        quote: "Okay wait... tell me EVERYTHING from the beginning."
      },
      {
        section: "ENERGY REPORT",
        theme: "energy",
        title: "Lena's energy",
        type: "insightStack",
        insights: [
          {
            label: "POSITIVE ENERGY",
            body: "Injects absurdity into ordinary conversations. Even stressful stories somehow become entertaining halfway through because of the way she tells them."
          },
          {
            label: "DRAINING PATTERNS",
            body: "Has a habit of dropping emotionally loaded messages right before disappearing offline for hours."
          }
        ],
        quote: "I have terrible news but it's also objectively hilarious."
      },
      {
        section: "ENERGY REPORT",
        theme: "energy",
        title: "Most energising moment",
        type: "insightStack",
        insights: [
          {
            label: "THE MOMENT",
            body: "The spontaneous \"airport conspiracy theory\" conversation at 1 AM where both somehow convinced themselves a random stranger was secretly following Lena through three terminals. Completely irrational. Completely unforgettable."
          }
        ]
      },
      {
        section: "ENERGY REPORT",
        theme: "energy",
        title: "Most draining moment",
        type: "insightStack",
        insights: [
          {
            label: "THE MOMENT",
            body: "The recurring cycle of \"we need to properly talk tomorrow\" conversations that kept getting postponed until both forgot what the original issue even was."
          }
        ]
      },
      {
        section: "ENERGY REPORT",
        theme: "energy",
        title: "Energy compatibility",
        type: "statInsight",
        stats: [
          { value: "8 / 10", label: "Maya" },
          { value: "9 / 10", label: "Lena" }
        ],
        insightLabel: "OVERALL READ",
        insightBody: "This dynamic works because neither expects the other to behave perfectly. The conversations survive missed replies, chaotic storytelling, emotional spirals, and weird jokes because the underlying energy consistently feels safe and mutual.",
        nextLabel: "My Results"
      }
    ]
  };

  function getProjectFromQuery(store) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    return store.projectBySlug[slug] || store.projectBySlug[store.projects[0].slug];
  }

  function getWrapchatResultOverrideScript() {
    const cardsJson = JSON.stringify(WRAPCHAT_FICTIONAL_DEMO_CARDS).replace(/</g, "\\u003c");
    const reportsJson = JSON.stringify(WRAPCHAT_FICTIONAL_ADDITIONAL_REPORTS).replace(/</g, "\\u003c");

    return (
      '(function(){const VERSION="wrapchat-fictional-reports-2026-05-06-04";if(window.__oksWrapchatResultOverride&&window.__oksWrapchatResultOverride.version===VERSION){window.__oksWrapchatResultOverride.check();return;}if(window.__oksWrapchatResultOverride){delete window.__oksWrapchatResultOverride;const oldOverlay=document.getElementById("oksWrapchatResult");if(oldOverlay)oldOverlay.remove();}const CARDS=' + cardsJson + ';' +
      'const REPORTS=' + reportsJson + ';' +
      'const THEMES={roast:["#B83A10","#E8592A","#FF8B6A"],lovely:["#7A1C48","#A02860","#F08EBF"],funny:["#4A6A04","#6E9A08","#C8F06A"],stats:["#083870","#0E5AAA","#6AB4F0"],insight:["#1A3060","#2A4A90","#8AACF0"],wrapchat:["#601030","#901848","#F4A0C0"],toxicity:["#3D0A0A","#8B1A1A","#E04040"],lovelang:["#3D1A2E","#8B3A5A","#F08EBF"],growth:["#0A2E2E","#1A6B5A","#3AF0C0"],accounta:["#082D5F","#0D57A3","#74B8F0"],energy:["#3A2606","#8A5B08","#F2B84B"]};' +
      'let step=0,active=false,activeReport="general",pendingReport="";const root=document.getElementById("root");const fmt=n=>Number(n).toLocaleString("en-US");const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;"}[c]));' +
      'const style=document.createElement("style");style.id="oks-wrapchat-result-style";style.textContent=`#oksWrapchatResult{position:fixed;inset:0;z-index:9999;color:#fff;font-family:"DM Sans",Inter,system-ui,sans-serif}#oksWrapchatResult *{box-sizing:border-box}.oks-wc-shell{position:relative;width:min(430px,100vw);min-height:100svh;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;background:var(--bg)}.oks-wc-shell:before,.oks-wc-shell:after{content:"";position:absolute;border-radius:16px;background:var(--accent);pointer-events:none}.oks-wc-shell:before{width:70px;height:70px;top:58px;right:-22px;opacity:.2;transform:rotate(18deg)}.oks-wc-shell:after{width:46px;height:46px;bottom:86px;left:-16px;opacity:.15;transform:rotate(-14deg)}.oks-wc-progress{position:absolute;top:0;left:0;right:0;height:3px;background:rgba(255,255,255,.1);z-index:3}.oks-wc-progress span{display:block;height:100%;width:var(--progress);background:rgba(255,255,255,.65);border-radius:0 2px 2px 0;transition:width .35s}.oks-wc-pill{position:absolute;top:12px;left:50%;z-index:4;max-width:calc(100% - 48px);transform:translateX(-50%);border-radius:999px;padding:3px 10px;border:1px solid color-mix(in srgb,var(--pale) 50%,transparent);background:color-mix(in srgb,var(--pale) 20%,transparent);color:var(--pale);font-size:8.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;text-align:center;white-space:nowrap}.oks-wc-pane{position:relative;z-index:2;display:flex;min-height:100svh;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:42px 20px 28px;overflow-y:auto;animation:oksSlide .26s cubic-bezier(.2,0,.1,1) both}.oks-wc-title{width:100%;font-family:"DM Sans",Inter,system-ui,sans-serif;font-size:clamp(18px,5.4vw,23px);font-weight:900;line-height:1.04;letter-spacing:-.04em;text-align:center}.oks-wc-big{font-family:"DM Sans",Inter,system-ui,sans-serif;font-size:clamp(24px,7.2vw,31px);font-weight:900;line-height:1;text-align:center;letter-spacing:-.04em;overflow-wrap:anywhere}.oks-wc-score{position:relative;width:82px;height:82px;margin:4px auto 7px}.oks-wc-score svg{position:absolute;inset:0;transform:rotate(-90deg);overflow:visible}.oks-wc-score-bg,.oks-wc-score-fg{fill:none;stroke-width:8}.oks-wc-score-bg{stroke:rgba(255,255,255,.16)}.oks-wc-score-fg{stroke:var(--pale);stroke-linecap:round;stroke-dasharray:226;stroke-dashoffset:var(--score-offset)}.oks-wc-score-text{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.oks-wc-score-num{font-size:25px;font-weight:900;letter-spacing:-.05em;line-height:1}.oks-wc-score-den{margin-top:2px;color:rgba(255,255,255,.5);font-size:10px}.oks-wc-mini .oks-wc-score{width:64px;height:64px;margin:0 auto 7px}.oks-wc-mini .oks-wc-score-bg,.oks-wc-mini .oks-wc-score-fg{stroke-width:7}.oks-wc-mini .oks-wc-score-num{font-size:20px}.oks-wc-mini .oks-wc-score-den{font-size:8px}.oks-wc-sub{width:100%;font-size:10.5px;font-weight:500;line-height:1.38;color:rgba(255,255,255,.65);text-align:center}.oks-wc-card{position:relative;width:100%;overflow:hidden;border-radius:16px;padding:12px 13px;background:var(--inner);border:1px solid color-mix(in srgb,var(--pale) 50%,transparent)}.oks-wc-card:before{content:"";position:absolute;top:-16px;right:-16px;width:52px;height:52px;border-radius:13px;background:var(--pale);opacity:.14;transform:rotate(18deg)}.oks-wc-card>*{position:relative;z-index:1}.oks-wc-label{margin-bottom:7px;color:var(--pale);font-size:8.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;text-align:center}.oks-wc-body{font-size:10.5px;font-weight:500;line-height:1.48;color:rgba(255,255,255,.75);overflow-wrap:break-word}.oks-wc-quote{width:100%;border-radius:14px;padding:9px 11px;background:rgba(255,255,255,.07);font-size:10.5px;font-style:italic;font-weight:550;line-height:1.36;color:rgba(255,255,255,.82);text-align:center}.oks-wc-quote.is-large{min-height:66px;display:flex;align-items:center;justify-content:center;font-size:11px;line-height:1.42;color:#fff}.oks-wc-bars,.oks-wc-list,.oks-wc-summary,.oks-wc-groups{width:100%}.oks-wc-bar{margin-bottom:8px}.oks-wc-bar-head{display:flex;justify-content:space-between;gap:8px;margin-bottom:4px}.oks-wc-bar-name{font-size:10.5px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.oks-wc-bar-value{font-size:10.5px;font-weight:700;color:rgba(255,255,255,.65);white-space:nowrap}.oks-wc-track{height:6px;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden}.oks-wc-fill{height:100%;width:var(--w);border-radius:999px;background:var(--bar);transition:width .7s ease}.oks-wc-grid{display:grid;grid-template-columns:repeat(var(--cols,2),minmax(0,1fr));gap:8px;width:100%}.oks-wc-months{--cols:3}.oks-wc-mini,.oks-wc-cell{min-width:0;border-radius:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.13);padding:8px 7px;text-align:center}.oks-wc-mini-title,.oks-wc-cell-value{font-family:"DM Sans",Inter,system-ui,sans-serif;font-size:11px;font-weight:800;line-height:1.14;color:#fff;overflow-wrap:anywhere}.oks-wc-mini-detail,.oks-wc-cell-label{margin-top:4px;font-size:8.5px;font-weight:500;color:rgba(255,255,255,.55);line-height:1.25}.oks-wc-cell-label{margin-top:0;margin-bottom:5px;font-size:7.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;text-align:left}.oks-wc-cell-value{text-align:left}.oks-wc-emoji{font-size:34px;line-height:1}.oks-wc-rank{display:grid;grid-template-columns:24px minmax(0,1fr) auto;gap:6px;align-items:center;padding:5px 2px;border-bottom:1px solid rgba(255,255,255,.07)}.oks-wc-rank-num{font-weight:800;color:rgba(255,255,255,.76);font-size:10px}.oks-wc-rank-word{font-size:10.5px;font-weight:800}.oks-wc-rank-count{font-size:9.5px;color:rgba(255,255,255,.58);font-weight:700}.oks-wc-actions{display:flex;justify-content:center;gap:8px;width:100%;margin-top:5px}.oks-wc-btn{flex:0 1 auto;min-width:62px;border:0;border-radius:999px;padding:6px 10px;background:var(--pale);color:var(--bg);font-size:10.5px;font-weight:800;cursor:pointer}.oks-wc-btn.is-secondary{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.76)}.oks-wc-shell--entries .oks-wc-pane{justify-content:flex-start;gap:8px;padding-top:52px;padding-bottom:18px;overflow:hidden}.oks-wc-shell--entries .oks-wc-title{font-size:clamp(20px,6vw,25px);line-height:1.05;margin:4px 0 5px}.oks-wc-shell--entries .oks-wc-list{display:flex;flex-direction:column;gap:8px;min-height:0}.oks-wc-shell--entries .oks-wc-card{border:0;border-radius:15px;background:rgba(0,0,0,.24);padding:10px 11px}.oks-wc-shell--entries .oks-wc-card:before{content:none}.oks-wc-shell--entries .oks-wc-label{text-align:left;color:rgba(255,255,255,.42);font-size:7.5px;letter-spacing:.12em;margin-bottom:6px}.oks-wc-shell--entries .oks-wc-body{color:#fff;font-size:10px;font-weight:600;line-height:1.38}.oks-wc-shell--entries .oks-wc-quote{margin-top:6px;background:transparent;padding:0;color:rgba(255,255,255,.52);text-align:left;font-size:9px;line-height:1.25}.oks-wc-shell--entries .oks-wc-actions{margin-top:auto;gap:8px}.oks-wc-shell--entries .oks-wc-btn{flex:1;min-height:34px;border-radius:999px;font-size:10.5px;padding:7px 10px}.oks-wc-shell--entries .oks-wc-btn.is-secondary{background:rgba(255,255,255,.10)}@keyframes oksSlide{from{opacity:0;transform:translateX(36px)}to{opacity:1;transform:translateX(0)}}@media(max-width:360px){.oks-wc-pane{gap:8px;padding:40px 16px 24px}.oks-wc-months{--cols:1}.oks-wc-card{padding:11px 12px}.oks-wc-title{font-size:18px}.oks-wc-big{font-size:25px}.oks-wc-score{width:72px;height:72px}.oks-wc-score-bg,.oks-wc-score-fg{stroke-width:7}.oks-wc-score-num{font-size:22px}.oks-wc-body{font-size:10px;line-height:1.42}.oks-wc-btn{min-width:58px;padding:6px 9px}.oks-wc-shell--entries .oks-wc-pane{gap:7px;padding:48px 14px 16px}.oks-wc-shell--entries .oks-wc-title{font-size:20px}.oks-wc-shell--entries .oks-wc-body{font-size:9.5px}.oks-wc-shell--entries .oks-wc-btn{min-height:32px;font-size:10px}}`;document.head.appendChild(style);' +
      'function ensureOverlay(){let el=document.getElementById("oksWrapchatResult");if(!el){el=document.createElement("div");el.id="oksWrapchatResult";document.body.appendChild(el)}return el}' +
      'function closeToMyResults(){active=false;pendingReport="";if(root)root.style.visibility="visible";const overlay=document.getElementById("oksWrapchatResult");if(overlay)overlay.remove();const buttons=Array.from(document.querySelectorAll("button"));const closeBtn=buttons.find(b=>String(b.textContent||"").trim()==="×");if(closeBtn)closeBtn.click();}' +
      'function bar(b,max,i){const pct=Math.max(8,Math.round((b.value/Math.max(max,1))*100));return `<div class="oks-wc-bar"><div class="oks-wc-bar-head"><span class="oks-wc-bar-name">${esc(b.label)}</span><span class="oks-wc-bar-value">${fmt(b.value)}</span></div><div class="oks-wc-track"><div class="oks-wc-fill" style="--bar:${b.color};--w:${pct}%"></div></div></div>`}' +
      'function insight(label,body){return `<div class="oks-wc-card"><div class="oks-wc-label">${esc(label)}</div><div class="oks-wc-body">${esc(body)}</div></div>`}' +
      'function scoreNumber(score){const match=String(score||"").match(/\\d+(?:\\.\\d+)?/);return match?Math.max(0,Math.min(10,Number(match[0]))):0}' +
      'function scoreRing(score){const value=scoreNumber(score);const circumference=226;const offset=(circumference-(circumference*value/10)).toFixed(1);return `<div class="oks-wc-score" aria-label="${esc(score)}"><svg viewBox="0 0 82 82" aria-hidden="true"><circle class="oks-wc-score-bg" cx="41" cy="41" r="36"></circle><circle class="oks-wc-score-fg" cx="41" cy="41" r="36" style="--score-offset:${offset}"></circle></svg><div class="oks-wc-score-text"><div class="oks-wc-score-num">${esc(String(value).replace(/\\.0$/,""))}</div><div class="oks-wc-score-den">/10</div></div></div>`}' +
      'function isScoreValue(value){return /\\/\\s*10/.test(String(value||""))}' +
      'function statMarkup(s){const valueHtml=isScoreValue(s.value)?scoreRing(s.value):`<div class="oks-wc-big" style="font-size:28px;margin-bottom:5px">${esc(s.value)}</div>`;return `<div class="oks-wc-mini">${valueHtml}<div class="oks-wc-mini-detail">${esc(s.label)}</div>${s.detail?`<div class="oks-wc-mini-detail">${esc(s.detail)}</div>`:""}${s.name?`<div class="oks-wc-mini-title">${esc(s.name)}</div>`:""}</div>`}' +
      'function content(c){let h=`<h1 class="oks-wc-title">${esc(c.title)}</h1>`;if(c.type==="bars"){const m=Math.max(...c.bars.map(b=>b.value));h+=`<div class="oks-wc-bars">${c.bars.map((b,i)=>bar(b,m,i)).join("")}</div>`}' +
      'if(c.type==="winner"||c.type==="winnerInsight"){h+=`<div class="oks-wc-big">${esc(c.winner)}</div>`}' +
      'if(c.subtitle&&(c.type==="winner"||c.type==="winnerInsight"||c.type==="bars")){h+=`<div class="oks-wc-sub">${esc(c.subtitle)}</div>`}' +
      'if(c.type==="winnerInsight"){h+=insight(c.insightLabel,c.insightBody)}' +
      'if(c.type==="scoreInsight"){h+=scoreRing(c.score);if(c.subtitle){h+=`<div class="oks-wc-sub">${esc(c.subtitle)}</div>`}h+=insight(c.insightLabel,c.insightBody);if(c.footer){h+=`<div class="oks-wc-sub">${esc(c.footer)}</div>`}}' +
      'if(c.type==="personScores"){h+=`<div class="oks-wc-grid">${c.people.map(p=>`<div class="oks-wc-mini"><div class="oks-wc-mini-title">${esc(p.name)}</div>${scoreRing(p.score)}<div class="oks-wc-mini-detail">${esc(p.body)}</div></div>`).join("")}</div>`}' +
      'if(c.type==="statInsight"){h+=`<div class="oks-wc-grid">${c.stats.map(s=>statMarkup(s)).join("")}</div>`;h+=insight(c.insightLabel,c.insightBody)}' +
      'if(c.type==="scoreStatsInsight"){h+=scoreRing(c.score);h+=`<div class="oks-wc-grid">${c.stats.map(s=>`<div class="oks-wc-mini"><div class="oks-wc-big" style="font-size:26px;margin-bottom:4px">${esc(s.value)}</div><div class="oks-wc-mini-detail">${esc(s.label)}</div></div>`).join("")}</div>`;h+=insight(c.insightLabel,c.insightBody)}' +
      'if(c.type==="winnerInsightStack"){h+=`<div class="oks-wc-big">${esc(c.winner)}</div>`;h+=c.insights.map(x=>insight(x.label,x.body)).join("")}' +
      'if(c.type==="entries"){h+=`<div class="oks-wc-list">${c.entries.map(entry=>`<div class="oks-wc-card"><div class="oks-wc-label">${esc(entry.label)}</div><div class="oks-wc-body">${esc(entry.body)}</div><div class="oks-wc-quote">“${esc(entry.quote)}”</div></div>`).join("")}</div>`}' +
      'if(c.type==="receipt"){h+=`<div class="oks-wc-card"><div class="oks-wc-label">${esc(c.receiptLabel)}</div><div class="oks-wc-body" style="font-weight:650;color:#fff">“${esc(c.receiptQuote)}”</div><div class="oks-wc-sub" style="margin-top:10px;text-align:left">${esc(c.receiptBody)}</div></div>`}' +
      'if(c.type==="dualText"){h+=c.blocks.map(x=>insight(x.label,x.body)).join("");if(c.subtitle){h+=`<div class="oks-wc-sub">${esc(c.subtitle)}</div>`}}' +
      'if(c.type==="months"){h+=`<div class="oks-wc-grid oks-wc-months">${c.months.map(m=>`<div class="oks-wc-mini"><div style="font-size:25px">${m.medal}</div><div class="oks-wc-mini-title">${esc(m.month)}</div><div class="oks-wc-mini-detail">${esc(m.count)}</div></div>`).join("")}</div>`;if(c.subtitle){h+=`<div class="oks-wc-sub">${esc(c.subtitle)}</div>`}}' +
      'if(c.type==="emojis"){h+=`<div class="oks-wc-grid">${c.emojis.map(e=>`<div class="oks-wc-mini"><div class="oks-wc-emoji">${e.emoji}</div><div class="oks-wc-mini-detail">${esc(e.name)}</div></div>`).join("")}</div>`;if(c.subtitle){h+=`<div class="oks-wc-sub">${esc(c.subtitle)}</div>`}}' +
      'if(c.type==="ranked"){h+=`<div class="oks-wc-list">${c.items.map((it,i)=>`<div class="oks-wc-rank"><div class="oks-wc-rank-num">${i<3?["🥇","🥈","🥉"][i]:i+1}</div><div class="oks-wc-rank-word">${esc(it[0])}</div><div class="oks-wc-rank-count">${esc(it[1])}</div></div>`).join("")}</div>`}' +
      'if(c.type==="phrases"){h+=`<div class="oks-wc-grid">${c.phrases.map(p=>`<div class="oks-wc-mini"><div class="oks-wc-mini-title" style="font-style:italic">“${esc(p.phrase)}”</div><div class="oks-wc-mini-detail">(${esc(p.note)})</div><div class="oks-wc-mini-detail">${esc(p.name)}</div></div>`).join("")}</div>`;if(c.subtitle){h+=`<div class="oks-wc-sub">${esc(c.subtitle)}</div>`}}' +
      'if(c.type==="stats"){h+=`<div class="oks-wc-grid">${c.stats.map(s=>`<div class="oks-wc-mini"><div class="oks-wc-big" style="font-size:36px">${esc(s.value)}</div><div class="oks-wc-mini-detail">${esc(s.label)}</div><div class="oks-wc-mini-detail">${esc(s.detail)}</div><div class="oks-wc-mini-title">${esc(s.name)}</div></div>`).join("")}</div>`}' +
      'if(c.type==="barGroups"){let k=0;h+=`<div class="oks-wc-groups">${c.groups.map(g=>{const m=Math.max(...g.bars.map(b=>b.value));return `<div class="oks-wc-label" style="margin-top:14px">${esc(g.label)}</div>${g.bars.map(b=>bar(b,m,k++)).join("")}`}).join("")}</div>`}' +
      'if(c.type==="insightStack"){h+=c.insights.map(x=>insight(x.label,x.body)).join("")}' +
      'if(c.type==="quoteCard"){h+=`<div class="oks-wc-quote is-large">“${esc(c.quote)}”</div>`;if(c.subtitle){h+=`<div class="oks-wc-sub">${esc(c.subtitle)}</div>`}}' +
      'if(c.type==="summary"){h+=`<div class="oks-wc-grid">${c.cells.map(cell=>`<div class="oks-wc-cell"><div class="oks-wc-cell-label">${esc(cell.label)}</div><div class="oks-wc-cell-value">${esc(cell.value)}</div></div>`).join("")}</div>`}' +
      'if(c.quote&&c.type!=="quoteCard"){h+=`<div class="oks-wc-quote">“${esc(c.quote)}”</div>`}' +
      'return h}' +
      'function cards(){return activeReport==="general"?CARDS:REPORTS[activeReport]||CARDS}' +
      'function reportFromText(text){if(/Try demo chat|Who\\x27s more obsessed\\?|The Ghost Award|Your chat, unwrapped\\.|Alex, you might want to check your screen time|General Wrapped/.test(text))return "general";if(/Chat Health Score|Power balance|Red flag 1|Toxicity Report|Jordan/.test(text))return "toxicity";if(/Love language compatibility|Sam\\x27s love language|Love Language Report|Sam Chen|Sam/.test(text))return "lovelang";if(/Relationship trajectory|Growth Report|Then vs Now|Jamie/.test(text))return "growth";if(/Accountability Report|Promises made|Most notable broken promise|Maya & Lena/.test(text))return "accounta";if(/Energy Report|Net energy scores|Energy compatibility|Both net positive/.test(text))return "energy";return ""}' +
      'function detectReport(text){return pendingReport||reportFromText(text)}' +
      'document.addEventListener("click",e=>{const button=e.target&&e.target.closest&&e.target.closest("button");if(!button)return;const report=reportFromText(button.innerText||button.textContent||"");if(report){pendingReport=report}},true);' +
      'function render(){const list=cards();const c=list[step]||list[0];const theme=THEMES[c.theme]||THEMES.wrapchat;const overlay=ensureOverlay();const isLast=step===list.length-1;const showBack=!c.hideBack||step>0||activeReport!=="general";overlay.innerHTML=`<main class="oks-wc-shell oks-wc-shell--${esc(c.type)}" style="--bg:${theme[0]};--inner:${theme[1]};--pale:${theme[2]};--accent:${theme[2]};--progress:${((step+1)/list.length)*100}%"><div class="oks-wc-progress"><span></span></div><div class="oks-wc-pill">${esc(c.section)}</div><section class="oks-wc-pane">${content(c)}<div class="oks-wc-actions">${isLast?`<button class="oks-wc-btn is-secondary" data-back>← Back</button><button class="oks-wc-btn" data-next>${esc(c.nextLabel||"My Results")}</button>`:`${showBack?`<button class="oks-wc-btn is-secondary" data-back>← Back</button>`:""}<button class="oks-wc-btn" data-next>${esc(c.nextLabel||"Next →")}</button>`}</div></section></main>`;const back=overlay.querySelector("[data-back]");const next=overlay.querySelector("[data-next]");if(back)back.onclick=()=>{if(step===0){closeToMyResults()}else{step=Math.max(0,step-1);render()}};if(next)next.onclick=()=>{if(step>=list.length-1){closeToMyResults()}else{step+=1;render()}};}' +
      'function hasResultClose(){return Array.from(document.querySelectorAll("button")).some(b=>String(b.textContent||"").trim()==="×")}' +
      'function shouldOverride(){if(active)return true;if(!hasResultClose())return false;const text=(root&&root.innerText)||"";const report=detectReport(text);if(report){activeReport=report;return true}return false}' +
      'function check(){const overlay=document.getElementById("oksWrapchatResult");if(active){if(!overlay)render();return}if(shouldOverride()){active=true;step=0;if(root)root.style.visibility="hidden";render()}else{if(overlay)overlay.remove();if(root)root.style.visibility="visible"}}' +
      'window.__oksWrapchatResultOverride={version:VERSION,check};check();})();'
    );
  }

  function setupWrapchatDemoFrame(iframe) {
    if (!iframe) {
      return;
    }

    let observedDoc = null;
    let observer = null;
    let frameRequest = 0;

    function injectDemoFont(doc) {
      if (!doc || !doc.body) {
        return;
      }

      if (!doc.getElementById("wrapchat-dm-sans-font")) {
        const link = doc.createElement("link");
        link.id = "wrapchat-dm-sans-font";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap";
        (doc.head || doc.body).appendChild(link);
      }

      if (!doc.getElementById("wrapchat-dm-sans-style")) {
        const style = doc.createElement("style");
        style.id = "wrapchat-dm-sans-style";
        style.textContent =
          "html, body, #root, #root *, #oksWrapchatResult, #oksWrapchatResult * {" +
          "  font-family: 'DM Sans', Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;" +
          "}";
        (doc.head || doc.body).appendChild(style);
      }
    }

    function injectFrameScale(doc) {
      if (!doc || !doc.body || doc.getElementById("wrapchat-demo-scale")) {
        return;
      }

      const style = doc.createElement("style");
      style.id = "wrapchat-demo-scale";
      style.textContent =
        "html, body {" +
        "  width: 100% !important;" +
        "  height: 100% !important;" +
        "  min-height: 100% !important;" +
        "  overflow: hidden !important;" +
        "}" +
        "body {" +
        "  align-items: flex-start !important;" +
        "  justify-content: center !important;" +
        "}" +
        "#root {" +
        "  width: 393px !important;" +
        "  min-height: 852px !important;" +
        "  transform: scale(var(--wrapchat-demo-scale, 1));" +
        "  transform-origin: top center;" +
        "}" +
        "#root > div {" +
        "  width: 393px !important;" +
        "  min-height: 852px !important;" +
        "}" +
        "@media (max-width: 360px) {" +
        "  #root > div > div[style*='padding: 58px 24px 56px'] {" +
        "    padding: 52px 22px 50px !important;" +
        "  }" +
        "}";
      (doc.head || doc.body).appendChild(style);
    }

    function syncFrameScale(doc) {
      if (!doc || !doc.body) {
        return;
      }

      injectFrameScale(doc);
      const frameWidth = iframe.clientWidth || iframe.getBoundingClientRect().width || 393;
      const frameHeight = iframe.clientHeight || iframe.getBoundingClientRect().height || 852;
      const scale = Math.min(1, frameWidth / 393, frameHeight / 852);
      doc.documentElement.style.setProperty("--wrapchat-demo-scale", scale.toFixed(3));
    }

    function replaceLogo(doc) {
      if (!doc || !doc.body) {
        return;
      }

      doc.body.querySelectorAll('img[src*="WrapchatLogo_tr.png"]').forEach(function swapLogo(image) {
        if (image.getAttribute("src") !== "assets/WrapchatLogo.svg") {
          image.setAttribute("src", "assets/WrapchatLogo.svg");
        }
      });
    }

    function rewriteReportListNames(doc) {
      if (!doc || !doc.body || !doc.createTreeWalker) {
        return;
      }

      const replacements = {
        "Morgan": "Maya & Lena",
        "Morgan 7/7 · You 3/5": "Maya 3 · Lena 5",
        "Taylor": "Maya & Lena",
        "Aligned — both positive": "Both net positive"
      };
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      let node = walker.nextNode();

      while (node) {
        textNodes.push(node);
        node = walker.nextNode();
      }

      textNodes.forEach(function replaceNodeText(textNode) {
        const currentText = textNode.nodeValue.trim();

        if (Object.prototype.hasOwnProperty.call(replacements, currentText)) {
          textNode.nodeValue = textNode.nodeValue.replace(currentText, replacements[currentText]);
        }
      });
    }

    function rewriteUploadHomeCopy(doc) {
      if (!doc || !doc.body || !doc.createTreeWalker || !doc.defaultView) {
        return;
      }

      const walker = doc.createTreeWalker(doc.body, doc.defaultView.NodeFilter.SHOW_TEXT);
      const textNodes = [];
      let node = walker.nextNode();

      while (node) {
        textNodes.push(node);
        node = walker.nextNode();
      }

      textNodes.forEach(function replaceUploadText(textNode) {
        const currentText = textNode.nodeValue.trim();
        const parent = textNode.parentElement;

        if (!parent) {
          return;
        }

        if (currentText === "Upload your chat" && parent.style.textTransform === "uppercase") {
          parent.style.display = "none";
          return;
        }

        if (currentText === "Drop your chat.") {
          parent.style.textAlign = "center";
          textNode.nodeValue = textNode.nodeValue.replace(currentText, "WrapChat");
          return;
        }

        if (currentText === "Export from WhatsApp and upload it here.") {
          parent.style.textAlign = "center";
          textNode.nodeValue = textNode.nodeValue.replace(currentText, "Your chats, unwrapped.");
          return;
        }

        if (currentText === "WhatsApp export") {
          textNode.nodeValue = textNode.nodeValue.replace(currentText, "Upload your chat");
        }
      });
    }

    function autoFillAuth(doc) {
      if (!doc || !doc.body) {
        return;
      }

      const emailInput = doc.querySelector('input[type="email"]');
      const pwInput = doc.querySelector('input[type="password"]');

      if (!emailInput || !pwInput || (emailInput.value && pwInput.value)) {
        return;
      }

      const win = doc.defaultView;
      const nativeSetter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value").set;

      function fillInput(input, value) {
        nativeSetter.call(input, value);
        input.dispatchEvent(new win.Event("input", { bubbles: true }));
        input.dispatchEvent(new win.Event("change", { bubbles: true }));
      }

      fillInput(emailInput, "hello@oks.design");
      fillInput(pwInput, "demo1234");
    }

    function injectResultOverride(doc) {
      if (!doc || !doc.body) {
        return;
      }

      const existingScript = doc.getElementById("oks-wrapchat-result-script");
      const nextScriptText = getWrapchatResultOverrideScript();

      if (existingScript && existingScript.textContent !== nextScriptText) {
        existingScript.remove();
      }

      if (!doc.getElementById("oks-wrapchat-result-script")) {
        const script = doc.createElement("script");
        script.id = "oks-wrapchat-result-script";
        script.textContent = nextScriptText;
        (doc.body || doc.head).appendChild(script);
      } else if (doc.defaultView && doc.defaultView.__oksWrapchatResultOverride) {
        doc.defaultView.__oksWrapchatResultOverride.check();
      }
    }

    function syncDemo(doc) {
      injectDemoFont(doc);
      syncFrameScale(doc);
      replaceLogo(doc);
      rewriteReportListNames(doc);
      rewriteUploadHomeCopy(doc);
      autoFillAuth(doc);
      injectResultOverride(doc);
    }

    function observeDemo(doc) {
      if (!doc || !doc.body || observedDoc === doc) {
        return;
      }

      if (observer) {
        observer.disconnect();
      }

      observedDoc = doc;
      observer = new MutationObserver(function onMutation(mutations) {
        const onlyOverrideMutations = mutations.every(function isOverrideMutation(mutation) {
          const target = mutation.target;
          return target && target.nodeType === 1 && (
            target.id === "oksWrapchatResult" ||
            (target.closest && target.closest("#oksWrapchatResult"))
          );
        });

        if (onlyOverrideMutations) {
          return;
        }

        if (frameRequest) {
          return;
        }

        frameRequest = doc.defaultView.requestAnimationFrame(function onFrame() {
          frameRequest = 0;
          syncDemo(doc);
        });
      });

      observer.observe(doc.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    function applyDemoEnhancements() {
      try {
        const doc = iframe.contentDocument;
        syncDemo(doc);
        observeDemo(doc);
      } catch (_error) {
        // Ignore iframe access issues.
      }
    }

    iframe.addEventListener("load", applyDemoEnhancements);
    window.addEventListener("resize", applyDemoEnhancements, { passive: true });
    applyDemoEnhancements();
  }

  function setupClassicStripesDemoFrame(frame) {
    if (!frame) {
      return;
    }

    const screen = frame.querySelector(".desktop-screen");
    const iframe = frame.querySelector(".desktop-screen-iframe");

    if (!screen) {
      return;
    }

    function syncScale() {
      const rect = screen.getBoundingClientRect();
      const scale = Math.min(1, rect.width / 1440, rect.height / 900);
      screen.style.setProperty("--desktop-demo-scale", scale.toFixed(3));
    }

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(syncScale);
      observer.observe(screen);
      frame._desktopDemoResizeObserver = observer;
    } else {
      window.addEventListener("resize", syncScale, { passive: true });
    }

    syncScale();
    window.requestAnimationFrame(syncScale);

    setupClassicStripesBlobAssets(iframe);
  }

  function getClassicStripesBlobAssetUrl(value) {
    if (!value || value.indexOf(CLASSIC_STRIPES_ASSET_BLOB_BASE_URL) === 0) {
      return value;
    }

    if (value.indexOf("assets/") === 0) {
      return CLASSIC_STRIPES_ASSET_BLOB_BASE_URL + "/" + value.replace(/^assets\//, "");
    }

    if (value.indexOf("TCSassets/") === 0) {
      return CLASSIC_STRIPES_ASSET_BLOB_BASE_URL + "/" + value.replace(/^TCSassets\//, "");
    }

    return value;
  }

  function applyClassicStripesBlobAssets(doc) {
    if (!doc || !doc.body) {
      return;
    }

    doc.querySelectorAll("img[src], source[src]").forEach(function rewriteMediaAsset(element) {
      const currentSrc = element.getAttribute("src");
      const nextSrc = getClassicStripesBlobAssetUrl(currentSrc);

      if (nextSrc === currentSrc) {
        return;
      }

      element.setAttribute("src", nextSrc);

      if (element.tagName.toLowerCase() === "source" && element.parentElement && element.parentElement.load) {
        element.parentElement.load();
      }
    });

    doc.querySelectorAll("video[poster]").forEach(function rewritePosterAsset(video) {
      const currentPoster = video.getAttribute("poster");
      const nextPoster = getClassicStripesBlobAssetUrl(currentPoster);

      if (nextPoster !== currentPoster) {
        video.setAttribute("poster", nextPoster);
      }
    });
  }

  function setupClassicStripesBlobAssets(iframe) {
    if (!iframe) {
      return;
    }

    function applyAssets() {
      try {
        applyClassicStripesBlobAssets(iframe.contentDocument);
      } catch (_error) {
        // Ignore iframe access issues.
      }
    }

    iframe.addEventListener("load", applyAssets);
    applyAssets();
  }

  function initProjectGallery(container) {
    if (!container) {
      return;
    }

    const rail = container.querySelector(".project-gallery-rail");
    const track = container.querySelector(".project-gallery-track");
    const items = Array.from(container.querySelectorAll(".project-gallery-item"));
    const prevButton = container.querySelector(".project-gallery-arrow.is-prev");
    const nextButton = container.querySelector(".project-gallery-arrow.is-next");

    if (!rail || !track || !items.length) {
      return;
    }

    let activeIndex = items.findIndex(function findDefaultActiveItem(item) {
      return item.dataset.defaultActive === "true";
    });
    let dragStartX = 0;
    let dragStartY = 0;
    let isPointerActive = false;

    if (activeIndex < 0) {
      activeIndex = Math.floor(items.length / 2);
    }

    function syncVideoPlayback() {
      items.forEach(function syncItemVideo(item, index) {
        const video = item.querySelector("video");

        if (!video) {
          return;
        }

        if (!video.dataset.galleryLoaded) {
          video.preload = "auto";
          video.load();
          video.dataset.galleryLoaded = "true";
        }

        if (index === activeIndex) {
          const playPromise = video.play();

          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function ignoreAutoplayBlock() {});
          }
        } else {
          video.pause();
        }
      });
    }

    function applyActiveIndex(index) {
      activeIndex = Math.max(0, Math.min(items.length - 1, index));
      items.forEach(function markItem(item, index) {
        item.classList.toggle("is-active", index === activeIndex);
      });

      if (prevButton) {
        prevButton.disabled = activeIndex === 0;
      }

      if (nextButton) {
        nextButton.disabled = activeIndex === items.length - 1;
      }

      syncVideoPlayback();
    }

    function updateTrackPosition() {
      const targetItem = items[activeIndex];

      if (!targetItem) {
        return;
      }

      const itemCenter = targetItem.offsetLeft + targetItem.offsetWidth / 2;
      const offset = rail.clientWidth / 2 - itemCenter;
      track.style.transform = "translate3d(" + offset + "px, 0, 0)";
    }

    function setActiveIndex(index) {
      const boundedIndex = Math.max(0, Math.min(items.length - 1, index));
      applyActiveIndex(boundedIndex);
      updateTrackPosition();
    }

    if (prevButton) {
      prevButton.addEventListener("click", function onPrevClick() {
        setActiveIndex(activeIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function onNextClick() {
        setActiveIndex(activeIndex + 1);
      });
    }

    items.forEach(function bindItemClick(item, index) {
      item.addEventListener("click", function onItemClick() {
        setActiveIndex(index);
      });
    });

    rail.addEventListener("pointerdown", function onPointerDown(event) {
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      isPointerActive = true;
    });

    rail.addEventListener("pointerup", function onPointerUp(event) {
      if (!isPointerActive) {
        return;
      }

      isPointerActive = false;
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;

      if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
        return;
      }

      if (deltaX < 0) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    });

    rail.addEventListener("pointercancel", function onPointerCancel() {
      isPointerActive = false;
    });

    window.addEventListener("resize", function onResizeGallery() {
      updateTrackPosition();
    }, { passive: true });

    setActiveIndex(activeIndex);
  }

  function getProjectGallery(project) {
    const gallery = PROJECT_GALLERIES[project.slug];

    if (!gallery || !gallery.files.length) {
      return [];
    }

    return gallery.files.map(function toGalleryItem(file, index) {
      if (typeof file === "object" && file !== null) {
        const item = Object.assign({}, file);

        if (item.src && item.src.indexOf("/") === -1) {
          item.src = gallery.basePath ? gallery.basePath + "/" + item.src : MEDIA_BLOB_BASE_URL + "/Gallery/" + gallery.folder + "/" + item.src;
        }

        return Object.assign(
          {
            alt: getProjectDisplayTitle(project) + " gallery item " + String(index + 1).padStart(2, "0")
          },
          item
        );
      }

      return {
        src: gallery.basePath ? gallery.basePath + "/" + file : MEDIA_BLOB_BASE_URL + "/Gallery/" + gallery.folder + "/" + file,
        alt: getProjectDisplayTitle(project) + " gallery image " + String(index + 1).padStart(2, "0")
      };
    });
  }

  function renderProjectNote(text) {
    return '<p class="project-note">' + text + "</p>";
  }

  function renderProjectContext(project) {
    if (!project.situation && !project.challenge) {
      return "";
    }
    return (
      '<section class="project-content-section project-context" aria-label="Project context">' +
      (project.situation
        ? '<div class="project-context-situation">' +
          '  <p class="eyebrow">Situation</p>' +
          '  <p class="project-section-copy">' + project.situation + "</p>" +
          "</div>"
        : "<div></div>") +
      (project.challenge
        ? '<div class="project-context-question">' +
          '  <p class="eyebrow">The real question</p>' +
          '  <p class="project-context-question-text">' + project.challenge + "</p>" +
          "</div>"
        : "") +
      "</section>"
    );
  }

  function renderProjectDecisions(project) {
    if (!project.decisions || !project.decisions.length) {
      return "";
    }
    return (
      '<section class="project-content-section" aria-label="Key decisions">' +
      '  <div class="project-section-head">' +
      '    <p class="eyebrow">Key decisions</p>' +
      "  </div>" +
      '  <div class="project-decisions-list">' +
      project.decisions
        .map(function renderDecision(decision, index) {
          return (
            '<div class="project-decision">' +
            '  <span class="project-decision-num">0' + (index + 1) + "</span>" +
            '  <div class="project-decision-body">' +
            "    <strong>" + decision.heading + "</strong>" +
            "    <p>" + decision.body + "</p>" +
            "  </div>" +
            "</div>"
          );
        })
        .join("") +
      "  </div>" +
      "</section>"
    );
  }

  function renderProjectLesson(project) {
    if (!project.lesson) {
      return "";
    }
    return (
      '<section class="project-lesson" aria-label="What I\'ve learned from this">' +
      '  <p class="eyebrow">What I\'ve learned from this</p>' +
      '  <p class="project-lesson-copy">' + project.lesson + "</p>" +
      "</section>"
    );
  }

  function renderProjectGallery(project) {
    const galleryItems = getProjectGallery(project);
    const galleryModifierClass = project.slug === "classic-stripes"
      ? " project-gallery-section--classic-stripes"
      : project.slug === "istinara"
      ? " project-gallery-section--istinara"
      : project.slug === "wrapchat"
      ? " project-gallery-section--wrapchat"
      : "";
    const galleryItemModifierClass = project.slug === "classic-stripes"
      ? " project-gallery-item--square"
      : project.slug === "istinara"
      ? " project-gallery-item--istinara"
      : "";

    if (!galleryItems.length) {
      return "";
    }

    return (
      '<section class="project-content-section project-gallery-section' + galleryModifierClass + '" aria-label="' + getProjectDisplayTitle(project) + ' gallery">' +
      '  <div class="project-section-head">' +
      '    <p class="eyebrow">Gallery</p>' +
      '  </div>' +
      '  <div class="project-gallery-shell" id="projectGallery">' +
      '    <button class="project-gallery-arrow is-prev" type="button" aria-label="Previous gallery image">&lsaquo;</button>' +
      '    <div class="project-gallery-rail">' +
      '      <div class="project-gallery-track">' +
      galleryItems
        .map(function renderGalleryItem(item) {
          const defaultActiveAttribute = item.defaultActive ? ' data-default-active="true"' : "";
          const mediaMarkup = item.type === "video"
            ? '  <video src="' + item.src + '" aria-label="' + item.alt + '" muted loop playsinline preload="auto"></video>'
            : '  <img src="' + item.src + '" alt="' + item.alt + '" loading="lazy" />';

          return (
            '<figure class="project-gallery-item' + galleryItemModifierClass + '"' + defaultActiveAttribute + ">" +
            mediaMarkup +
            "</figure>"
          );
        })
        .join("") +
      "      </div>" +
      "    </div>" +
      '    <button class="project-gallery-arrow is-next" type="button" aria-label="Next gallery image">&rsaquo;</button>' +
      "  </div>" +
      "</section>"
    );
  }

  function renderIstinaraAxoSection() {
    return (
      '<section class="project-content-section istinara-axo-section" aria-label="Axonometric and plans">' +
      '  <div class="project-section-head">' +
      '    <p class="eyebrow">Axonometric</p>' +
      '  </div>' +
      '  <div class="istinara-axo-layout">' +
      '    <figure class="istinara-axo-figure">' +
      '      <img src="' + ISTINARA_AXO_LIGHT_SRC + '" data-light-src="' + ISTINARA_AXO_LIGHT_SRC + '" data-dark-src="' + ISTINARA_AXO_DARK_SRC + '" alt="ISTINARA axonometric overview" loading="lazy" />' +
      '      <div class="istinara-axo-magnifier" aria-hidden="true"></div>' +
      '    </figure>' +
      '    <p class="project-section-copy istinara-axo-caption">The axonometric view illustrates the spatial organization across three levels. The ground floor is designed as an open retail environment with distinct jewellery zones, a seating area, and integrated digital experiences. The mezzanine functions as a private workspace for the founder, maintaining visual connection while preserving privacy. The basement supports operational needs, including meeting space, storage, and a secure vault.</p>' +
      '  </div>' +
      '  <div class="project-section-head">' +
      '    <p class="eyebrow">Plans</p>' +
      '  </div>' +
      '  <div class="istinara-plans-grid">' +
      '    <figure class="istinara-plan-item"><img src="' + ISTINARA_ASSET_BLOB_BASE_URL + '/plan1.png" alt="ISTINARA floor plan 1" loading="lazy" /></figure>' +
      '    <figure class="istinara-plan-item"><img src="' + ISTINARA_ASSET_BLOB_BASE_URL + '/plan2.png" alt="ISTINARA floor plan 2" loading="lazy" /></figure>' +
      '    <figure class="istinara-plan-item"><img src="' + ISTINARA_ASSET_BLOB_BASE_URL + '/plan3.png" alt="ISTINARA floor plan 3" loading="lazy" /></figure>' +
      '  </div>' +
      '</section>'
    );
  }

  function renderIstinaraDrawingsSection() {
    return (
      '<section class="project-content-section istinara-drawings-section" aria-label="Sections">' +
      '  <div class="project-section-head">' +
      '    <p class="eyebrow">Sections</p>' +
      '  </div>' +
      '  <div class="istinara-drawings-grid">' +
      '    <figure class="istinara-drawing-item"><img src="' + ISTINARA_ASSET_BLOB_BASE_URL + '/section1.png" alt="ISTINARA section 1" loading="lazy" /></figure>' +
      '    <figure class="istinara-drawing-item"><img src="' + ISTINARA_ASSET_BLOB_BASE_URL + '/section2.png" alt="ISTINARA section 2" loading="lazy" /></figure>' +
      '  </div>' +
      '</section>'
    );
  }

  function renderWrapchatDemoSection() {
    return (
      '<section class="project-demo-section" id="wrapchat-demo" aria-label="Interactive demo">' +
      '  <div class="project-section-head">' +
      '    <p class="eyebrow">Interactive demo</p>' +
      '    <p class="project-demo-hint">Type anything to proceed with the demo.</p>' +
      '  </div>' +
      '  <div class="phone-mockup-outer">' +
      '    <div class="phone-mockup">' +
      '      <div class="phone-chrome">' +
      '        <div class="phone-notch"></div>' +
      '        <iframe class="phone-screen"' +
      '          src="../assets/projects/Wrapchat/WrapchatUI/wrapchat-app.html"' +
      '          title="Wrapchat — interactive demo"' +
      '          sandbox="allow-scripts allow-same-origin"' +
      '          loading="lazy">' +
      '        </iframe>' +
      '        <div class="phone-home-bar"></div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</section>'
    );
  }

  function createTag(label) {
    const tag = document.createElement("span");
    tag.className = "meta-tag";
    tag.textContent = label;
    return tag;
  }

  function getProjectDisplayTitle(project) {
    return project.slug === "istinara" ? project.title.toUpperCase() : project.title;
  }

  function getProjectOverviewClass(project) {
    if (project.slug === "wrapchat") {
      return " project-overview--wrapchat";
    }

    if (project.slug === "istinara") {
      return " project-overview--istinara";
    }

    if (project.slug === "classic-stripes") {
      return " project-overview--desktop-demo";
    }

    return "";
  }

  function renderProjectHero(project, projectTitle) {
    if (project.slug === "wrapchat") {
      return (
        '<figure class="project-hero project-hero--animation" id="wrapchatHero">' +
        '  <div class="wrapchat-hero-panel wrapchat-hero-panel--ui">' +
        '    <iframe class="project-hero-animation-frame"' +
        '      src="../assets/projects/Wrapchat/wrapchat-hero.html"' +
        '      title="Wrapchat — abstract UI animation"' +
        '      allowtransparency="true">' +
        '    </iframe>' +
        '  </div>' +
        '  <div class="wrapchat-hero-panel wrapchat-hero-panel--demo">' +
        '    <div class="phone-mockup-outer">' +
        '      <div class="phone-mockup">' +
        '        <div class="phone-chrome">' +
        '          <div class="phone-notch"></div>' +
        '          <iframe class="phone-screen"' +
        '            data-src="../assets/projects/Wrapchat/WrapchatUI/wrapchat-app.html"' +
        '            title="Wrapchat — interactive demo"' +
        '            sandbox="allow-scripts allow-same-origin">' +
        '          </iframe>' +
        '          <div class="phone-home-bar"></div>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</figure>'
      );
    }

    if (project.slug === "istinara") {
      return (
        '<figure class="project-hero project-hero--istinara project-hero--istinara-logo" id="istinaraHero">' +
        '  <div class="istinara-logo-frame">' +
        '    <img class="istinara-logo-solid" src="' + ISTINARA_ASSET_BLOB_BASE_URL + '/solid-logo.png" alt="' + projectTitle + ' logo" />' +
        '    <img class="istinara-logo-wire" src="' + ISTINARA_ASSET_BLOB_BASE_URL + '/wireframe-logo.png" alt="' + projectTitle + ' wireframe logo" aria-hidden="true" />' +
        '  </div>' +
        '</figure>'
      );
    }

    if (project.slug === "classic-stripes") {
      return (
        '<figure class="project-hero project-hero--demo project-hero--desktop-demo">' +
        '  <div class="desktop-mockup" data-desktop-demo-frame>' +
        '    <div class="desktop-browser-bar" aria-hidden="true">' +
        '      <span></span><span></span><span></span>' +
        '    </div>' +
        '    <div class="desktop-screen">' +
        '      <iframe class="desktop-screen-iframe"' +
        '        src="../assets/projects/The_Classic_Stripes/TCS-WebsiteUI/public/index.html"' +
        '        title="The Classic Stripes — website demo"' +
        '        sandbox="allow-scripts allow-same-origin"' +
        '        loading="lazy">' +
        '      </iframe>' +
        '    </div>' +
        '  </div>' +
        '</figure>'
      );
    }

    return (
      '<figure class="project-hero">' +
      '  <img src="' + project.heroImage + '" alt="' + projectTitle + ' — project image" />' +
      '</figure>'
    );
  }

  function setupWrapchatHeroSwitch() {
    var hero = document.getElementById("wrapchatHero");
    var btn  = document.getElementById("tryDemoBtn");
    if (!hero || !btn) { return; }

    btn.addEventListener("click", function onTryDemo() {
      hero.classList.add("is-demo-active");

      var iframe = hero.querySelector(".wrapchat-hero-panel--demo .phone-screen");
      if (iframe && iframe.dataset.src && !iframe.getAttribute("src")) {
        iframe.setAttribute("src", iframe.dataset.src);
        setupWrapchatDemoFrame(iframe);
      }

      var hint = document.createElement("p");
      hint.className = "project-demo-hint";
      hint.textContent = "Press log in to explore";
      btn.replaceWith(hint);
    });
  }

  function setupIstinaraLogoHover() {
    if (window.matchMedia("(hover: none)").matches) { return; }
    var hero = document.getElementById("istinaraHero");
    var frame = hero && hero.querySelector(".istinara-logo-frame");
    var wire = hero && hero.querySelector(".istinara-logo-wire");
    var solid = hero && hero.querySelector(".istinara-logo-solid");
    if (!frame || !wire || !solid) { return; }

    var BASE_CELL = 40;
    var REVEAL_RADIUS = 142;
    var REVEAL_INNER_RADIUS = 38;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var rafId = 0;
    var targetX = 0;
    var targetY = 0;
    var cursorX = 0;
    var cursorY = 0;
    var targetReveal = 0;
    var reveal = 0;
    var canvasWidth = 0;
    var canvasHeight = 0;

    if (!ctx) { return; }

    canvas.className = "istinara-logo-canvas";
    canvas.setAttribute("aria-hidden", "true");
    frame.appendChild(canvas);

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function getBackgroundGrid() {
      var backgroundCanvas = document.getElementById("bgCanvas");

      if (backgroundCanvas && backgroundCanvas.width && backgroundCanvas.height) {
        var rect = backgroundCanvas.getBoundingClientRect();

        return {
          originX: rect.left,
          originY: rect.top,
          cellWidth: rect.width / backgroundCanvas.width,
          cellHeight: rect.height / backgroundCanvas.height
        };
      }

      var columns = Math.max(1, Math.ceil(window.innerWidth / BASE_CELL));
      var rows = Math.max(1, Math.ceil(window.innerHeight / BASE_CELL));

      return {
        originX: 0,
        originY: 0,
        cellWidth: window.innerWidth / columns,
        cellHeight: window.innerHeight / rows
      };
    }

    function getLoadedImage(image) {
      if (!image.complete || !image.naturalWidth) {
        return null;
      }

      return image;
    }

    function drawImageFitted(image) {
      var imageHeight = canvasWidth * (image.naturalHeight / image.naturalWidth);
      ctx.drawImage(image, 0, 0, canvasWidth, imageHeight);
    }

    function drawLogoState() {
      var solidImage = getLoadedImage(solid);
      var wireImage = getLoadedImage(wire);
      if (!solidImage || !wireImage || !canvasWidth || !canvasHeight) {
        return;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      drawImageFitted(solidImage);

      if (reveal <= 0.01) {
        return;
      }

      var frameRect = frame.getBoundingClientRect();
      var grid = getBackgroundGrid();
      var cellWidth = grid.cellWidth;
      var cellHeight = grid.cellHeight;
      var gridFrameX = frameRect.left - grid.originX;
      var gridFrameY = frameRect.top - grid.originY;
      var viewportX = gridFrameX + cursorX;
      var viewportY = gridFrameY + cursorY;
      var colMin = Math.floor((viewportX - REVEAL_RADIUS) / cellWidth);
      var colMax = Math.ceil((viewportX + REVEAL_RADIUS) / cellWidth);
      var rowMin = Math.floor((viewportY - REVEAL_RADIUS) / cellHeight);
      var rowMax = Math.ceil((viewportY + REVEAL_RADIUS) / cellHeight);
      var cells = [];

      for (var col = colMin; col <= colMax; col++) {
        for (var row = rowMin; row <= rowMax; row++) {
          var cellX = col * cellWidth - gridFrameX;
          var cellY = row * cellHeight - gridFrameY;
          if (cellX + cellWidth <= 0 || cellX >= canvasWidth || cellY + cellHeight <= 0 || cellY >= canvasHeight) { continue; }

          var dx = cellX + cellWidth * 0.5 - cursorX;
          var dy = cellY + cellHeight * 0.5 - cursorY;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > REVEAL_RADIUS) { continue; }

          var opacity = clamp(
            1 - (distance - REVEAL_INNER_RADIUS) / (REVEAL_RADIUS - REVEAL_INNER_RADIUS),
            0,
            1
          );

          cells.push({
            x: cellX,
            y: cellY,
            width: cellWidth,
            height: cellHeight,
            alpha: Math.pow(opacity, 1.6) * reveal
          });
        }
      }

      ctx.globalCompositeOperation = "destination-out";
      cells.forEach(function clearSolid(cell) {
        ctx.globalAlpha = cell.alpha;
        ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
      });

      ctx.globalCompositeOperation = "source-over";
      cells.forEach(function drawWire(cell) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(cell.x, cell.y, cell.width, cell.height);
        ctx.clip();
        ctx.globalAlpha = cell.alpha;
        drawImageFitted(wireImage);
        ctx.restore();
      });

      ctx.globalAlpha = 1;
    }

    function resizeLogoCanvas() {
      var rect = frame.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasWidth = Math.max(1, Math.round(rect.width));
      canvasHeight = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(canvasWidth * dpr);
      canvas.height = Math.round(canvasHeight * dpr);
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawLogoState();
      requestRevealFrame();
    }

    function animateReveal() {
      cursorX += (targetX - cursorX) * 0.28;
      cursorY += (targetY - cursorY) * 0.28;
      reveal += (targetReveal - reveal) * 0.2;
      drawLogoState();

      if (
        Math.abs(targetX - cursorX) > 0.2 ||
        Math.abs(targetY - cursorY) > 0.2 ||
        Math.abs(targetReveal - reveal) > 0.01
      ) {
        rafId = requestAnimationFrame(animateReveal);
        return;
      }

      rafId = 0;
    }

    function requestRevealFrame() {
      if (!rafId) {
        rafId = requestAnimationFrame(animateReveal);
      }
    }

    function syncPointer(event) {
      var rect = canvas.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    }

    function readyCanvas() {
      if (!getLoadedImage(solid) || !getLoadedImage(wire)) {
        return;
      }

      frame.classList.add("is-canvas-ready");
      resizeLogoCanvas();
      requestRevealFrame();
    }

    [solid, wire].forEach(function bindImageReady(image) {
      if (image.complete) {
        return;
      }

      image.addEventListener("load", readyCanvas, { once: true });
    });

    if (solid.complete && wire.complete) {
      readyCanvas();
    }

    hero.addEventListener("mousemove", function onLogoMouseMove(e) {
      syncPointer(e);
      targetReveal = 1;
      requestRevealFrame();
    });

    hero.addEventListener("mouseleave", function onLogoMouseLeave() {
      targetReveal = 0;
      requestRevealFrame();
    });

    window.addEventListener("resize", resizeLogoCanvas, { passive: true });
  }

  function setupIstinaraAxoMagnifier() {
    if (window.matchMedia("(hover: none)").matches) { return; }
    var figure = document.querySelector(".istinara-axo-figure");
    var magnifier = figure && figure.querySelector(".istinara-axo-magnifier");
    var img = figure && figure.querySelector("img");
    if (!figure || !magnifier || !img) { return; }

    var ZOOM = 2.2;

    function getImgSrc() {
      return img.currentSrc || img.src;
    }

    figure.addEventListener("mouseenter", function onAxoEnter() {
      magnifier.style.backgroundImage = "url(\"" + getImgSrc() + "\")";
      magnifier.style.opacity = "1";
    });

    figure.addEventListener("mouseleave", function onAxoLeave() {
      magnifier.style.opacity = "0";
      magnifier.style.clipPath = "circle(0px at 50% 50%)";
    });

    figure.addEventListener("mousemove", function onAxoMove(e) {
      var rect = figure.getBoundingClientRect();
      var cx = e.clientX - rect.left;
      var cy = e.clientY - rect.top;
      var W = figure.offsetWidth;
      var H = figure.offsetHeight;
      magnifier.style.backgroundSize = (W * ZOOM) + "px " + (H * ZOOM) + "px";
      magnifier.style.backgroundPosition = (cx * (1 - ZOOM)) + "px " + (cy * (1 - ZOOM)) + "px";
      magnifier.style.clipPath = "circle(182px at " + cx + "px " + cy + "px)";
    });
  }

  function setupIstinaraAxoTheme() {
    var img = document.querySelector(".istinara-axo-figure img");
    if (!img) { return; }

    function syncAxoImage(theme) {
      var nextSrc = theme === "dark" ? img.dataset.darkSrc : img.dataset.lightSrc;
      if (nextSrc && img.getAttribute("src") !== nextSrc) {
        img.setAttribute("src", nextSrc);
      }
    }

    var currentTheme = global.OKSTheme && global.OKSTheme.get ? global.OKSTheme.get() : "light";
    syncAxoImage(currentTheme);

    if (global.OKSTheme && global.OKSTheme.onChange) {
      global.OKSTheme.onChange(syncAxoImage);
    }
  }

  document.addEventListener("DOMContentLoaded", function onReady() {
    const store = global.OKS_PORTFOLIO_DATA;
    const app = global.OKSSite;
    const host = document.getElementById("projectDetail");

    if (!store || !host) {
      return;
    }

    function renderProjectPage() {
      const project = getProjectFromQuery(store);
      const nextProject = store.projects[(project.index + 1) % store.projects.length];
      const projectTitle = getProjectDisplayTitle(project);
      const nextProjectTitle = getProjectDisplayTitle(nextProject);

      document.title = projectTitle + " | OKS Studio";
      document.body.dataset.context = project.context;
      app.setAccent(project.accentRgb);
      app.setContext(project.context);

      host.innerHTML =
        '<section class="project-overview' + getProjectOverviewClass(project) + '">' +
        '  <div class="project-overview-copy">' +
        '    <div class="project-intro">' +
        '      <p class="eyebrow">' + project.category + "</p>" +
        '      <h1 class="project-detail-title">' + projectTitle + "</h1>" +
        "    </div>" +
        '    <p class="project-detail-description">' + project.description + "</p>" +
        '    <aside class="project-body-meta">' +
        '      <div class="project-labels" id="projectLabels"></div>' +
        "    </aside>" +
        "  </div>" +
        renderProjectHero(project, projectTitle) +
        "</section>" +
        '<div class="project-sections" id="projectSections">' +
        renderProjectDecisions(project) +
        renderProjectGallery(project) +
        (project.galleryNote ? renderProjectNote(project.galleryNote) : "") +
        (project.slug === "istinara" ? renderIstinaraAxoSection() : "") +
        (project.slug === "istinara" ? renderIstinaraDrawingsSection() : "") +
        renderProjectLesson(project) +
        "</div>" +
        '<footer class="project-foot">' +
        '  <img class="project-logo-inline" src="' + (project.slug === "istinara" ? ISTINARA_ASSET_BLOB_BASE_URL + "/istinara_logo.png" : project.logo) + '" alt="' + projectTitle + ' logo" data-slug="' + project.slug + '" />' +
        '  <div class="project-foot-nav">' +
        '    <a class="project-next" href="./project.html?slug=' + encodeURIComponent(nextProject.slug) + '">Next: ' + nextProjectTitle + "</a>" +
        "  </div>" +
        "</footer>";

      const labels = document.getElementById("projectLabels");
      project.labels.forEach(function appendLabel(label) {
        labels.appendChild(createTag(label));
      });

      if (project.slug === "wrapchat") {
        const tryDemoBtn = document.createElement("button");
        tryDemoBtn.className = "demo-cta-pill";
        tryDemoBtn.type = "button";
        tryDemoBtn.id = "tryDemoBtn";
        tryDemoBtn.textContent = "Try demo";
        document.querySelector(".project-body-meta").appendChild(tryDemoBtn);
      }

      if (project.liveUrl) {
        const demo = document.createElement("a");
        demo.className = "action-link";
        demo.href = project.liveUrl;
        demo.target = "_blank";
        demo.rel = "noopener noreferrer";
        demo.textContent = "View Live Project";
        document.querySelector(".project-body-meta").appendChild(demo);
      }

      if (project.slug === "wrapchat") {
        setupWrapchatHeroSwitch();
      }

      if (project.slug === "classic-stripes") {
        setupClassicStripesDemoFrame(host.querySelector("[data-desktop-demo-frame]"));
      }

      if (project.slug === "istinara") {
        setupIstinaraLogoHover();
        setupIstinaraAxoTheme();
        setupIstinaraAxoMagnifier();
      }

      const sections = document.getElementById("projectSections");
      if (sections && !sections.children.length) {
        sections.remove();
      }

      const gallery = document.getElementById("projectGallery");
      initProjectGallery(gallery);
    }

    document.addEventListener("oks:project-data-change", renderProjectPage);
    renderProjectPage();
  });
})(window);
