import { useState, useEffect, useRef } from 'react';

function App() {
  const [expandedProject, setExpandedProject] = useState(null);
  const [showRationale, setShowRationale] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
  const workSectionRef = useRef(null);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToWork = () => {
    workSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const principles = [
    { text: "Truth over theater", tooltip: "I show what's real, not what sounds impressive" },
    { text: "Guardrails over vibes", tooltip: "Systems and processes beat good intentions" },
    { text: "Zero-trust by default", tooltip: "Verify everything, assume nothing" },
    { text: "Human impact first", tooltip: "Technology serves people, not the other way around" }
  ];

  // Local Louisville client projects
  const localClients = [
    {
      id: "fableflow",
      title: "Fable & Flow",
      url: "https://fableandflows.vercel.app",
      preview: "/previews/fableflow.png",
      ogImage: "/og-images/fableflow-og.png",
      qrCode: "/qr-codes/fableflow-qr.png",
      description: "Boutique retail brand presence",
      category: "Retail",
      specWork: false, // Paid client work
      details: "A curated boutique bringing unique finds to Louisville. Built a clean, modern storefront that reflects the brand's personality and makes discovery easy."
    },
    {
      id: "jwcafe",
      title: "JW Cafe",
      url: "https://jw-cafe-bakery.vercel.app",
      preview: "/previews/jwcafe.png",
      ogImage: "/og-images/jwcafe-og.png",
      qrCode: "/qr-codes/jwcafe-qr.png",
      description: "Local cafe & bakery digital storefront",
      category: "Cafe",
      specWork: true, // Spec work - business model in development
      details: "A neighborhood cafe and bakery serving Louisville. Created an inviting online presence with menu, hours, and location—everything customers need at a glance."
    },
    {
      id: "passtimefishhouse",
      title: "Passtime Fish House",
      url: "https://passtime-fish-house.vercel.app",
      preview: "/previews/passtimefishhouse.png",
      ogImage: "/og-images/passtimefishhouse-og.png",
      qrCode: "/qr-codes/passtimefishhouse-qr.png",
      description: "Restaurant online presence",
      category: "Restaurant",
      specWork: true, // Spec work - business model in development
      details: "A Louisville staple for fresh seafood. Built a site that showcases the menu, captures the atmosphere, and makes reservations simple."
    },
    {
      id: "nachbar",
      title: "Nachbar",
      url: "https://nachbar.vercel.app",
      preview: "/previews/nachbar.png",
      ogImage: "/og-images/nachbar-og.png",
      qrCode: "/qr-codes/nachbar-qr.png",
      description: "Germantown's neighborhood bar",
      category: "Bar",
      specWork: true, // Spec work - business model in development
      details: "Louisville's beloved dive bar since 2007. German & Belgian beers, live music, two dog-friendly patios. Built a site that captures the vibe and keeps regulars informed."
    }
  ];

  const [expandedClient, setExpandedClient] = useState(null);

  const projects = [
    {
      id: "portfolio",
      title: "Full Portfolio",
      url: "https://projectlavos.com",
      preview: "/previews/portfolio.png",
      gif: "/demos/portfolio-demo.gif",
      description: "The complete picture",
      demos: [
        { type: "image", src: "/demos/portfolio-demo.gif", caption: "Browsing the portfolio" }
      ],
      rationale: "A central hub showcasing all deployed projects under one roof."
    },
    {
      id: "fretvision",
      title: "FretVision",
      url: "https://guitar.projectlavos.com",
      preview: "/previews/guitar.png",
      gif: "/demos/fretvision-demo.gif",
      description: "Interactive fretboard, lessons, MIDI playback",
      demos: [
        { type: "image", src: "/demos/fretvision-demo.gif", caption: "Navigating the Riff Generator and Fretboard" }
      ],
      rationale: "Guitar learning apps exist, but none combine fretboard visualization, tab playback, and riff generation in one place. I built this to prove that AI-assisted development can produce real educational tools—not just demos. The riff generator uses deterministic Python for music theory (LLMs can't count frets accurately) with AI only for style interpretation."
    },
    {
      id: "phishguard",
      title: "PhishGuard",
      url: "https://phishguard.projectlavos.com",
      preview: "/previews/phishguard.png",
      gif: "/demos/phishguard-demo.gif",
      description: "Sentiment analysis NLP for anti-phishing",
      demos: [
        { type: "image", src: "/demos/phishguard-demo.gif", caption: "Analyzing email for phishing patterns" }
      ],
      rationale: "Phishing attacks exploit human psychology, not just technical vulnerabilities. PhishGuard analyzes email sentiment patterns to flag manipulation tactics before they reach the inbox."
    },
    {
      id: "vantage",
      title: "Vantage",
      url: "https://jobs.projectlavos.com",
      preview: "/previews/jobs.png",
      gif: "/demos/vantage-demo.gif",
      description: "Local job market analysis, data enrichment, automated resume tailoring",
      demos: [
        { type: "image", src: "/demos/vantage-demo.gif", caption: "Exploring Louisville job market insights" }
      ],
      rationale: "Job boards show listings. Vantage shows patterns—which companies are hiring, what skills are trending locally, and how to position yourself. Built for Louisville first."
    },
    {
      id: "ourjourney",
      title: "OurJourney",
      url: "https://ourjourney.projectlavos.com",
      preview: "/previews/ourjourney.png",
      gif: "/demos/ourjourney-demo.gif",
      description: "A private space for couples to catalog experiences",
      demos: [
        { type: "image", src: "/demos/ourjourney-demo.gif", caption: "Navigating the shared experience tracker" }
      ],
      rationale: "Social media makes sharing performative. OurJourney is the opposite—a private space for two people to document what matters to them, without an audience."
    },
    {
      id: "jobtrack",
      title: "JobTrack",
      url: "https://jobtrack.projectlavos.com",
      preview: "/previews/jobtrack.png",
      gif: "/demos/jobtrack-demo.gif",
      description: "Application tracking system",
      demos: [
        { type: "image", src: "/demos/jobtrack-demo.gif", caption: "Managing job applications" }
      ],
      rationale: "Spreadsheets work until they don't. JobTrack adds structure to the job search grind—tracking applications, follow-ups, and outcomes in one place."
    }
  ];

  const handleCardClick = (e, projectId) => {
    e.preventDefault();
    if (expandedProject === projectId) {
      setExpandedProject(null);
      setShowRationale(false);
    } else {
      setExpandedProject(projectId);
      setShowRationale(false);
    }
  };

  const handleVisitSite = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  const handleShowRationale = (e) => {
    e.stopPropagation();
    setShowRationale(!showRationale);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <span className="text-teal-400 font-semibold text-sm">MS</span>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#work" className="hover:text-teal-400 transition-colors">Work</a>
            <a href="#method" className="hover:text-teal-400 transition-colors">Method</a>
            <a href="#louisville" className="hover:text-teal-400 transition-colors">Louisville</a>
            <a href="#why" className="hover:text-teal-400 transition-colors">Why</a>
            <a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24">
        <div className="max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
            <div className="flex flex-col items-center animate-fade-in">
              <img
                src="/headshot.png"
                alt="Matthew Scott - Web Developer and Consultant based in Louisville, Kentucky"
                className="headshot w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-teal-500/30 object-cover shadow-[0_0_40px_rgba(20,184,166,0.25)]"
              />
              <p className="text-sm text-slate-500 mt-3 text-center">
                Louisville, KY
              </p>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 animate-fade-in-delay-1 text-center md:text-left">
                MATTHEW SCOTT
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed mb-4 sm:mb-6 animate-fade-in-delay-2 text-center md:text-left">
                I take complexity, find the patterns, and make them useful.
              </p>
              {/* Operating Principles with tooltips */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 md:gap-x-6 animate-fade-in-delay-3 mb-8">
                {principles.map((principle, idx) => (
                  <span
                    key={idx}
                    className="principle-tag text-xs sm:text-sm text-teal-400 whitespace-nowrap cursor-help relative group"
                    title={principle.tooltip}
                  >
                    {principle.text}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-slate-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-normal w-48 text-center border border-slate-700 shadow-lg z-10">
                      {principle.tooltip}
                    </span>
                  </span>
                ))}
              </div>
              {/* CTA Button */}
              <div className="flex justify-center md:justify-start animate-fade-in-delay-3">
                <button
                  onClick={scrollToWork}
                  className="group flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                >
                  See My Work
                  <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section - Show work first */}
      <section
        ref={workSectionRef}
        id="work"
        className={`px-6 md:px-12 lg:px-24 py-16 border-t border-slate-800 transition-all duration-700 ${visibleSections.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            The Work
          </h2>
          <p className="text-slate-400 mb-8">
            These aren't demos. They're deployed, tested, running in production. Hover to preview, click to explore.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
            {projects.map((project) => {
              const isExpanded = expandedProject === project.id;
              const isHovered = hoveredProject === project.id;

              return (
                <div
                  key={project.id}
                  onClick={(e) => handleCardClick(e, project.id)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`
                    og-card group cursor-pointer transition-all duration-300 ease-in-out
                    ${isExpanded
                      ? 'sm:col-span-2 lg:col-span-3 row-span-2'
                      : ''
                    }
                    ${expandedProject && !isExpanded ? 'opacity-60 scale-95' : 'opacity-100 scale-100'}
                  `}
                >
                  {/* OG Preview Image / GIF on Hover - Hidden when expanded */}
                  {!isExpanded && (
                    <div className="overflow-hidden rounded-t-lg transition-all duration-300 aspect-[1200/630]">
                      <img
                        src={isHovered ? project.gif : project.preview}
                        alt={`${project.title} - ${project.description}`}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Card info */}
                  <div className="bg-slate-800 p-3 rounded-b-lg border-t border-slate-700">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                        <p className={`text-xs text-slate-400 ${isExpanded ? '' : 'truncate'}`}>{project.description}</p>
                      </div>
                      <span className={`text-teal-400 text-xs transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-700 animate-fade-in">
                        {/* Demo Videos/Screenshots */}
                        {project.demos.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">In Action</p>
                            <div className="grid grid-cols-1 gap-3">
                              {project.demos.map((demo, idx) => (
                                <div key={idx} className="rounded-lg overflow-hidden border border-slate-700">
                                  {demo.type === 'video' ? (
                                    <video
                                      src={demo.src}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="w-full h-auto"
                                    />
                                  ) : (
                                    <img
                                      src={demo.src}
                                      alt={demo.caption}
                                      className="w-full h-auto"
                                    />
                                  )}
                                  <p className="text-xs text-slate-400 p-2 bg-slate-900">{demo.caption}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rationale Toggle */}
                        <button
                          onClick={handleShowRationale}
                          className="text-xs text-teal-400 hover:text-teal-300 mb-2 flex items-center gap-1"
                        >
                          {showRationale ? '− Hide' : '+ Show'} rationale
                        </button>

                        {showRationale && (
                          <p className="text-sm text-slate-300 leading-relaxed mb-4 animate-fade-in">
                            {project.rationale}
                          </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={(e) => handleVisitSite(e, project.url)}
                            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 text-xs font-semibold rounded transition-colors"
                          >
                            Visit Site →
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedProject(null); setShowRationale(false); }}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Method Section */}
      <section
        id="method"
        className={`px-6 md:px-12 lg:px-24 py-16 border-t border-slate-800 transition-all duration-700 ${visibleSections.method ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
            The Method
          </h2>

          <p className="text-slate-300 leading-relaxed mb-6">
            I synthesize. I take sprawling, messy domains—regulations, technical systems,
            organizational processes—and build structured maps that operators and decision
            makers can actually use. Not reports that sit in a drawer. Views that drive action.
          </p>

          <p className="text-slate-300 leading-relaxed mb-6">
            My research method is simple: immerse, extract patterns, prototype, iterate.
            I don't theorize from a distance. I get inside the problem, find what's actually
            happening versus what people think is happening, and build something that proves
            the insight works.
          </p>

          <p className="text-slate-300 leading-relaxed mb-8">
            I've worked in scrappy startups and corporate grind houses. I see both sides—and
            I'm going through. The proof is in the work.
          </p>

        </div>
      </section>

      {/* Local Louisville Section */}
      <section
        id="louisville"
        className={`px-6 md:px-12 lg:px-24 py-16 border-t border-slate-800 transition-all duration-700 ${visibleSections.louisville ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Local Louisville
          </h2>
          <p className="text-slate-400 mb-4">
            Local first, always. Helping small and medium-sized businesses build their online presence—because every Louisville business deserves to be found.
          </p>
          <p className="text-xs text-slate-500 mb-8 italic">
            Note: Projects marked "Spec Work" were built to demonstrate capability while solidifying my business model. Fable & Flow is paid client work.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
            {localClients.map((client) => {
              const isClientExpanded = expandedClient === client.id;

              return (
                <div
                  key={client.id}
                  onClick={() => setExpandedClient(isClientExpanded ? null : client.id)}
                  className={`
                    og-card group cursor-pointer rounded-lg overflow-hidden bg-slate-800/50 border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 ease-in-out
                    ${isClientExpanded ? 'sm:col-span-2 lg:col-span-3 row-span-2' : ''}
                    ${expandedClient && !isClientExpanded ? 'opacity-60 scale-95' : 'opacity-100 scale-100'}
                  `}
                >
                  {/* Client Preview Image */}
                  <div className={`overflow-hidden bg-slate-800 transition-all duration-300 ${isClientExpanded ? 'aspect-[16/6]' : 'aspect-[1200/630]'}`}>
                    <img
                      src={client.preview}
                      alt={`${client.title} - ${client.description} - Louisville local business website`}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <span className="text-4xl font-bold text-teal-500/20">{client.title.charAt(0)}</span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-white">{client.title}</h3>
                          {client.specWork ? (
                            <span className="text-[10px] text-orange-400/80 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                              Spec Work
                            </span>
                          ) : (
                            <span className="text-[10px] text-green-400/80 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                              Client
                            </span>
                          )}
                        </div>
                        <p className={`text-xs text-slate-400 ${isClientExpanded ? '' : 'truncate'}`}>{client.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-teal-400/70 bg-teal-500/10 px-2 py-0.5 rounded whitespace-nowrap">
                          {client.category}
                        </span>
                        <span className={`text-teal-400 text-xs transition-transform duration-200 flex-shrink-0 ${isClientExpanded ? 'rotate-180' : ''}`}>
                          {isClientExpanded ? '▲' : '▼'}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isClientExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-700 animate-fade-in">
                        {/* OG Image & QR Code Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          {/* Social Preview (OG Image) */}
                          <div className="md:col-span-2">
                            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Social Preview</p>
                            <div className="rounded-lg overflow-hidden border border-slate-700">
                              <img
                                src={client.ogImage}
                                alt={`${client.title} social preview`}
                                className="w-full h-auto"
                                onError={(e) => {
                                  e.target.src = client.preview;
                                }}
                              />
                            </div>
                          </div>

                          {/* QR Code */}
                          <div>
                            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Scan to Visit</p>
                            <div className="rounded-lg overflow-hidden border border-slate-700 bg-white p-4 flex items-center justify-center min-h-[150px]">
                              {client.qrCode ? (
                                <img
                                  src={client.qrCode}
                                  alt={`QR code for ${client.title}`}
                                  className="w-full h-auto max-w-[150px]"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                  }}
                                />
                              ) : null}
                              <div className={`text-slate-400 text-xs text-center ${client.qrCode ? 'hidden' : 'block'}`}>
                                Coming Soon
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <p className="text-sm text-slate-300 leading-relaxed mb-4">
                          {client.details}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          {client.url ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(client.url, '_blank');
                              }}
                              className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-900 text-xs font-semibold rounded transition-colors"
                            >
                              Visit Site →
                            </button>
                          ) : (
                            <span className="px-4 py-2 bg-slate-700 text-slate-400 text-xs font-semibold rounded">
                              Coming Soon
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedClient(null);
                            }}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-slate-500 text-sm mt-8 text-center">
            Are you a Louisville business looking to establish or improve your online presence?{' '}
            <a href="mailto:matthewdscott7@gmail.com" className="text-teal-400 hover:text-teal-300 transition-colors">Let's talk.</a>
          </p>
        </div>
      </section>

      {/* Why I Build Section */}
      <section
        id="why"
        className={`px-6 md:px-12 lg:px-24 py-16 border-t border-slate-800 transition-all duration-700 ${visibleSections.why ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
            Why I Build
          </h2>

          <p className="text-slate-300 leading-relaxed mb-6">
            Everything I build solves a real human problem—mine, someone else's, or a
            business's. I don't build demos. I build tools that work, that ship, that
            people actually use.
          </p>

          <p className="text-slate-300 leading-relaxed mb-6">
            Right now, my focus is <span className="text-teal-400">Louisville first</span>.
            I'm supporting local small and medium-sized businesses—the operators who don't
            have the time or know-how to build the systems they need. The ones who are
            drowning in complexity and need someone who can translate it into clarity.
          </p>

          <p className="text-slate-300 leading-relaxed">
            If you're a Louisville SMB wrestling with process chaos, data you can't use,
            or technology that's supposed to help but doesn't—that's where I work best.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-6 md:px-12 lg:px-24 py-16 border-t border-slate-800">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Let's Build Something
          </h2>
          <p className="text-slate-400 mb-2">
            Have a complex problem that needs untangling? A system that should exist but doesn't?
          </p>
          <p className="text-slate-400 mb-8">
            <span className="text-teal-400">Currently available</span> for consulting and project work.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
            <a
              href="mailto:matthewdscott7@gmail.com"
              className="footer-link text-teal-400 hover:text-teal-300 transition-colors text-sm sm:text-base"
            >
              matthewdscott7@gmail.com
            </a>
            <a
              href="https://github.com/guitargnarr"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link text-teal-400 hover:text-teal-300 transition-colors text-sm sm:text-base"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mscott77"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link text-teal-400 hover:text-teal-300 transition-colors text-sm sm:text-base"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-slate-600 text-xs mt-12">
            © {new Date().getFullYear()} Matthew Scott. Built with purpose.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
