(function attachProjectData(global) {
  const projects = [
    {
      slug: "istinara",
      title: "Istinara",
      context: "Digital",
      category: "Luxury Jewellery Branding",
      description:
        "A calm, luminous identity system for a recycled luxury jewellery brand. The homepage preview balances softness, material detail and a quiet sense of transformation.",
      labels: ["Art Direction", "Brand World", "Digital Presence"],
      accentRgb: "248, 208, 107",
      heroImage: "../assets/projects/ISTINARA/Bitti.png",
      logo: "../assets/projects/ISTINARA/istinara_logo.png"
    },
    {
      slug: "classic-stripes",
      title: "The Classic Stripes",
      context: "Digital",
      category: "Vintage Football E-Commerce",
      description:
        "A nostalgic retail concept built around archival jersey culture, tactile product storytelling and a timeline-aware visual language that shifts between past and present.",
      labels: ["E-Commerce", "Content System", "Campaign Art"],
      accentRgb: "86, 124, 176",
      heroImage: "../assets/projects/The_Classic_Stripes/THECLASSICSTRIPES.png",
      logo: "../assets/projects/The_Classic_Stripes/tcs_logo.png"
    },
    {
      slug: "wrapchat",
      title: "Wrapchat",
      context: "Digital",
      category: "AI Relationship Intelligence",
      description:
        "A mobile product that analyses real chat conversations to surface relationship dynamics — from love languages to accountability patterns — through a calm, insight-driven interface.",
      labels: ["UX/UI", "Product Vision", "AI Product"],
      accentRgb: "139, 92, 246",
      heroImage: "../assets/projects/Wrapchat/WrapchatLogo.svg",
      logo: "../assets/projects/Wrapchat/WrapchatLogo.svg"
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
