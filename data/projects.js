(function attachProjectData(global) {
  const projects = [
    {
      slug: "istinara",
      title: "Istinara",
      context: "Digital",
      category: "Luxury Jewellery Branding",
      description:
        "A recycled luxury jewellery concept built around transformation, combining symbolic storytelling, material detail, and a spatially informed visual language that connects object, identity, and environment.",
      labels: ["Brand Identity", "Art Direction", "Interior Design"],
      accentRgb: "248, 208, 107",
      heroImage: "../assets/projects/ISTINARA/Bitti.png",
      logo: "../assets/projects/ISTINARA/istinara_logo.png",
      situation:
        "A recycled luxury jewellery brand with a clear ethos but nothing visual yet. No identity system, no digital presence, no creative framework. The project needed a team, a direction, and a visual language built from nothing.",
      challenge:
        "Luxury design defaults to polish and completion. This brand works with recycled material: things that carry a history before they arrive here. The identity needed to hold that tension rather than smooth it into predictable elegance.",
      decisions: [
        {
          heading: "Unfinished as a deliberate choice",
          body: "Traditional luxury presentation is about surfaces that look fully resolved. Here the visual direction leaned into something partially formed. Refinement without the pretence of completion."
        },
        {
          heading: "Directing without always designing",
          body: "For the first time, the role was partly to protect a creative direction rather than produce all the work. Learning when to make something and when to create space for the team to make it."
        },
        {
          heading: "One language across graphic and interior design",
          body: "The project moves between branding, jewellery display, and store interior thinking. The key decision was to keep the same design language across all scales, so the architectural and graphic elements feel like parts of one world."
        }
      ],
      lesson:
        "Carrying one concept across <em>brand identity, visual storytelling, and spatial design</em> as <em>creative lead</em>. The project became about making <em>transformation visible at every level</em>, from symbolism and material to jewellery display and the store environment.",
      galleryNote:
        "Add gallery images for ISTINARA here. Place image files in /assets/projects/ISTINARA/ and update the files array in the PROJECT_GALLERIES istinara entry inside src/js/project.js."
    },
    {
      slug: "classic-stripes",
      title: "The Classic Stripes",
      context: "Digital",
      category: "Vintage Football E-Commerce",
      description:
        "A nostalgic retail concept built around archival jersey culture, tactile product storytelling and a timeline-aware visual language that shifts between past and present.",
      labels: ["E-Commerce", "Digital Presence", "Promotional Assets"],
      accentRgb: "86, 124, 176",
      heroImage: "../assets/projects/The_Classic_Stripes/THECLASSICSTRIPES.png",
      logo: "../assets/projects/The_Classic_Stripes/tcs_logo.png",
      situation:
        "A vintage football jersey brand with a strong physical and cultural identity needed a complete web presence built from scratch: online shop, content system, and visual language.",
      challenge:
        "Standard e-commerce flattens the product into a grid. Archival jerseys carry history, rarity, and cultural specificity. The site needed to feel like a discovery rather than a catalogue, without losing the function of a working shop.",
      decisions: [
        {
          heading: "Timeline as visual language",
          body: "The design system shifts between past and present, expressing different eras of football culture through typography and image treatment. The visual register changes depending on what period you are looking at."
        },
        {
          heading: "Content around the object",
          body: "Product pages were treated as editorial space. The story of where a jersey came from and what it represents was given as much weight as the product photography itself."
        }
      ],
      lesson:
        "Working across <em>content, product storytelling, and web execution</em> in one project. It taught me how to prepare <em>promotional visuals for print</em>, where <em>color, scale, resolution, and material behavior</em> matter differently than they do on screen."
    },
    {
      slug: "wrapchat",
      title: "Wrapchat",
      context: "Digital",
      category: "AI Relationship Intelligence",
      description:
        "A conversational analysis tool that transforms exported chat histories into structured insight cards, revealing communication patterns, emotional tone, and relationship dynamics through a clear, readable visual system.",
      labels: ["UX/UI", "Product Design", "AI Product"],
      accentRgb: "139, 92, 246",
      heroImage: "../assets/projects/Wrapchat/WrapchatLogo.svg",
      logo: "../assets/projects/Wrapchat/WrapchatLogo.svg",
      situation:
        "A product with a clear premise but no design yet: AI-powered relationship analysis through real chat conversations, with no defined way to present that analysis without it feeling clinical or invasive.",
      challenge:
        "AI output defaults to metrics and percentages. The subject here is human relationships. The core design problem was not what the AI surfaces, but how the interface frames it: and what it chooses not to say.",
      decisions: [
        {
          heading: "Interpretive over factual",
          body: "The interface presents relationship dynamics as observations, not data points. Getting from raw AI output to something that actually means something required rethinking every label, summary, and tone the product uses."
        },
        {
          heading: "Building to test the idea",
          body: "Rather than designing in the abstract, the product was prototyped early enough to be felt. The interaction had to be experienced before it could be evaluated. Design and build were not separate phases."
        }
      ],
      lesson:
        "First complete product cycle from concept through <em>UX and UI</em> to a working app. The project changed how I think about building products, from <em>privacy, pricing, and testing decisions</em> to using <em>AI in my workflow</em> as a <em>collaborator in the design process</em>."
    }
  ];

  const projectBySlug = Object.fromEntries(
    projects.map(function mapProject(project, index) {
      return [
        project.slug,
        Object.assign({}, project, {
          index: index,
          href: "./project.html?slug=" + encodeURIComponent(project.slug)
        })
      ];
    })
  );

  global.OKS_PORTFOLIO_DATA = {
    studioName: "OKS Studio",
    ownerName: "Ozge Kiter",
    homeTitle: ["SELECTED", "WORKS"],
    projects: projects,
    projectBySlug: projectBySlug
  };
})(window);
