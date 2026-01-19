import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

// Photo Carousel Component
const PhotoCarousel = ({ photos, caption, onClose }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Photo */}
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <img
            src={photos[currentPhoto]}
            alt={`${caption} ${currentPhoto + 1}`}
            className="w-full h-[70vh] object-contain bg-gray-100"
          />
          
          {/* Caption and counter */}
          <div className="p-4 bg-white">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-900">{caption}</h3>
              <span className="text-gray-600">
                {currentPhoto + 1} / {photos.length}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Thumbnail dots */}
        {photos.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPhoto(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentPhoto ? 'bg-white w-8' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Embedded Carousel Component (Auto-playing)
const EmbeddedCarousel = ({ photos }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (!photos || photos.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [photos]);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (!photos || photos.length === 0) {
    return <div className="text-center text-gray-500">No photos available</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-lg overflow-hidden shadow-xl">
        {/* Photo */}
        <div className="relative bg-gray-200">
          <img
            src={photos[currentPhoto]}
            alt={`Street photography ${currentPhoto + 1}`}
            className="w-full h-[85vh] object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-black rounded-full p-3 hover:bg-white transition-colors shadow-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-black rounded-full p-3 hover:bg-white transition-colors shadow-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          {/* Counter overlay */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentPhoto + 1} / {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
};

// Automation Card Component
const AutomationCard = ({ title, summary, problem, tools, impact }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-900 hover:shadow-xl transition-all">
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      
      {/* Summary - Always visible */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{summary}</p>

      {/* Read More Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-900 font-semibold text-sm hover:underline mb-4 flex items-center gap-1"
      >
        {isExpanded ? (
          <>Show less <ChevronDown size={16} className="transform rotate-180" /></>
        ) : (
          <>Read more <ChevronDown size={16} /></>
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4 animate-unfold">
          <div>
            <div className="font-semibold text-gray-900 mb-2 text-sm">The problem</div>
            <ul className="text-gray-700 text-sm space-y-1">
              {problem.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-semibold text-gray-600">Tools:</span>
            {tools.map((tool, idx) => (
              <React.Fragment key={idx}>
                <span className="px-3 py-1 bg-blue-100 text-blue-900 font-semibold rounded-full">{tool}</span>
                {idx < tools.length - 1 && <span className="text-gray-400">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Impact - Always visible */}
      <div className="bg-blue-50 p-3 rounded text-sm font-bold text-blue-900 mt-4">
        {Array.isArray(impact) ? (
          impact.map((item, idx) => <div key={idx}>{item}</div>)
        ) : (
          impact
        )}
      </div>
    </div>
  );
};

export default function LightBluePortfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [expandedRole, setExpandedRole] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseStep, setCaseStep] = useState(0);
  const [hoveredProof, setHoveredProof] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [timeSaved, setTimeSaved] = useState(0);
  const [daysSaved, setDaysSaved] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [storyPage1, setStoryPage1] = useState(0);
  const [storyPage2, setStoryPage2] = useState(0);
  const [storyPage3, setStoryPage3] = useState(0);

  const carouselItems = [
    'Sonal Misra',
    'University of Waterloo',
    'Psychology × Business × Legal Studies',
    'Builds systems that scale',
    'Runs long distances on purpose',
    'Human-first marketer'
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const automationSection = document.getElementById('automation-section');
    if (automationSection) {
      observer.observe(automationSection);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated && timeSaved < 22) {
      const timer = setTimeout(() => setTimeSaved(timeSaved + 1), 80);
      return () => clearTimeout(timer);
    }
  }, [timeSaved, hasAnimated]);

  useEffect(() => {
    if (hasAnimated && daysSaved < 3) {
      const timer = setTimeout(() => setDaysSaved(daysSaved + 1), 500);
      return () => clearTimeout(timer);
    }
  }, [daysSaved, hasAnimated]);

  const experiences = [
    {
      year: '2025',
      title: 'Customer Engagement Marketing Coordinator',
      company: 'PointClickCare',
      context: 'SaaS healthcare platform, scaling customer engagement and adoption',
      problem: 'Low survey response rates, manual campaign work eating team time, slow asset approval cycles',
      ownership: 'Led customer activation, AI automation, and process innovation initiatives',
      tools: ['GPT', 'Power Automate', 'Salesforce', 'MS Forms', 'SharePoint'],
      impact: ['56% survey engagement lift', '21% more reviews generated', '17+ hours saved per campaign', '300+ customers activated on Pulse platform']
    },
    {
      year: '2024',
      title: 'Customer Success Intern',
      company: 'PointClickCare',
      context: 'Healthcare SaaS, managing customer data and engagement campaigns',
      problem: '2,000+ forwarding contacts lost in auto-reply emails, low engagement from dormant customers',
      ownership: 'Built lead data automation, reactivation campaigns, and first Pharmacy digest',
      tools: ['Excel', 'Power Automate', 'Email Marketing', 'Analytics'],
      impact: ['2,000+ contacts consolidated', '10% engagement lift', '$6,500 added MRR', '400+ customers reached via digest']
    },
    {
      year: '2023',
      title: 'HR Corporate & Community Affairs Intern',
      company: 'Fidelity Investments',
      context: '2,000+ employees, improving internal comms and engagement',
      problem: 'Low intranet engagement, unclear company achievements visibility',
      ownership: 'Led content optimization and CSR initiative coordination',
      tools: ['Adobe Experience Manager', 'Viva Engage', 'Yammer', 'Surveys'],
      impact: ['15% positive sentiment increase', '1,000+ employees engaged in CSR', 'Enhanced platform analytics insights']
    },
    {
      year: '2023',
      title: 'Business Operations Intern',
      company: 'Fidelity Investments',
      context: 'Registered products department, high-volume processing operations',
      problem: 'Slow processing times, delayed transfer requests impacting customer satisfaction',
      ownership: 'Streamlined processing workflows and monitored transfer operations',
      tools: ['Financial Systems', 'Data Analysis', 'Reporting Tools'],
      impact: ['25% faster processing', '40% customer satisfaction improvement', 'Improved decision-making through statistical analysis']
    }
  ];

  const caseStudies = [
    {
      title: 'How We Reactivated "Dead" Customers',
      outcome: '10% Engagement Lift',
      goal: 'Re-engage low-activity customers who stopped interacting',
      insight: 'The myth: If customers stop engaging, they\'re gone. The reality: Most were just overlooked. Behavior data showed patterns hiding in plain sight—these users weren\'t uninterested, they just weren\'t being spoken to properly.',
      strategy: 'Segment low-engagement users and build re-engagement campaigns that spoke to one clear use case at a time, felt human (not automated), and made re-engaging frictionless.',
      execution: 'Built targeted campaigns addressing specific pain points per segment. Each message focused on a single use case with clear, conversational copy that removed barriers to action.',
      result: '📈 Engagement increased 10% | 💰 $6.5K in recovered MRR',
      nextTest: 'Test proactive outreach when usage patterns match at-risk cohort behavior'
    },
    {
      title: 'The NPS Follow-Up Everyone Skipped',
      outcome: '56% Higher Survey Engagement',
      goal: 'Increase engagement with high-NPS customers',
      insight: 'Most NPS programs treat every response the same. High-NPS customers were already happy—so instead of another generic survey email, I treated them like insiders.',
      strategy: 'Segment promoters only. Use lightweight challenges instead of long surveys. Focus on momentum, not reminders.',
      execution: 'Created short, value-driven asks that made customers feel like insiders. Used challenge-based formats that felt engaging, not extractive. Timed outreach for maximum response rates.',
      result: '📊 56% higher engagement | ⭐ 21% more customer reviews',
      nextTest: 'Build tiered insider programs based on engagement frequency and referral quality'
    },
    {
      title: 'What 30 Posts Taught Me About Small Brands',
      outcome: '20% Social Engagement Lift',
      goal: 'Increase meaningful social media engagement for small brand',
      insight: 'Posting more didn\'t move the needle. Learning faster did. Polished content lost. Clear, relatable content won.',
      strategy: 'Test formats, hooks, timing, and tone across 30 posts—then double down on what actually stopped the scroll. Pair social learnings with website refresh so engagement didn\'t drop after the click.',
      execution: 'Ran rapid experiments across post types. Tracked what drove real interaction vs vanity metrics. Optimized website experience to match social messaging and maintain momentum.',
      result: '🔥 20% lift in engagement | 👀 Fewer vanity metrics, more real interaction',
      nextTest: 'Create content templates from top-performing formats to scale winning patterns'
    }
  ];

  const offHours = [
    { 
      image: '📸', 
      caption: 'Street photography', 
      insight: 'Composition teaches you what to emphasize',
      photos: [
        '/photos/street1.JPG', '/photos/street2.JPG', '/photos/street3.JPG', '/photos/street4.JPG', '/photos/street6.JPG',
        '/photos/street8.JPG', '/photos/street9.JPG', '/photos/street10.JPG', '/photos/street11.JPG', '/photos/street12.JPG',
        '/photos/street13.JPG', '/photos/street14.JPG', '/photos/street15.JPG', '/photos/street16.JPG', '/photos/street17.JPG',
        '/photos/street18.JPG', '/photos/street19.JPG', '/photos/street21.JPG', '/photos/street22.JPG', '/photos/street23.JPG',
        '/photos/street25.JPG', '/photos/street26.JPG', '/photos/street27.JPG', '/photos/street28.JPG', '/photos/street29.JPG',
        '/photos/street30.JPG', '/photos/street31.JPG', '/photos/street32.JPG', '/photos/street33.JPG', '/photos/street34.JPG',
        '/photos/street35.JPG', '/photos/street37.JPG', '/photos/street38.JPG', '/photos/street39.JPG', '/photos/street40.JPG',
        '/photos/street41.JPG', '/photos/street42.JPG', '/photos/street43.JPG', '/photos/street44.JPG', '/photos/street45.JPG',
        '/photos/street46.JPG', '/photos/street47.JPG', '/photos/street48.JPG', '/photos/street49.JPG', '/photos/street50.JPG',
        '/photos/street51.JPG', '/photos/street52.JPG', '/photos/street53.JPG', '/photos/street54.JPG', '/photos/street55.JPG',
        '/photos/street56.JPG', '/photos/street57.JPG', '/photos/street58.JPG', '/photos/street59.JPG', '/photos/street60.JPG',
        '/photos/street61.JPG', '/photos/street62.JPG', '/photos/street63.JPG', '/photos/street64.JPG', '/photos/street65.JPG',
        '/photos/street67.JPG', '/photos/street68.JPG', '/photos/street69.JPG', '/photos/street70.JPG', '/photos/street71.JPG',
        '/photos/street72.JPG', '/photos/street73.JPG', '/photos/street75.JPG', '/photos/street76.JPG', '/photos/street77.JPG',
        '/photos/street78.JPG', '/photos/street79.JPG', '/photos/street80.JPG', '/photos/street81.JPG', '/photos/street82.JPG',
        '/photos/street83.JPG', '/photos/street84.JPG', '/photos/street85.JPG', '/photos/street86.JPG', '/photos/street87.JPG',
        '/photos/street88.JPG', '/photos/street89.JPG', '/photos/street90.JPG', '/photos/street91.JPG', '/photos/street92.JPG',
        '/photos/street93.JPG', '/photos/street94.JPG', '/photos/street96.JPG', '/photos/street99.JPG', '/photos/street100.JPG',
        '/photos/street136.JPG'
      ]
    }
  ];

  const TestimonialCard = ({ shortQuote, fullQuote, author, title }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="bg-white p-8 rounded-lg hover:shadow-xl transition-shadow border border-blue-100">
        <p className="text-lg mb-6 leading-relaxed text-gray-700">
          "{isExpanded ? fullQuote : shortQuote}"
        </p>
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-900 font-semibold text-sm hover:underline mb-4"
          >
            Read more →
          </button>
        )}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-blue-900 font-semibold text-sm hover:underline mb-4"
          >
            Show less ←
          </button>
        )}
        <p className="text-sm text-gray-600 font-semibold">— {author}</p>
        <p className="text-xs text-gray-500">{title}</p>
      </div>
    );
  };

  const StoryCard = React.memo(({ title, subtitle, problem, system, howItWorks, whyItMatters, tools, currentPage, setCurrentPage }) => {
    const pages = ['problem', 'system', 'how', 'why'];

    const nextPage = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    const prevPage = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 overflow-hidden">
        {/* Book Cover/Title */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-blue-100 text-sm">{subtitle}</p>
        </div>

        {/* Book Pages */}
        <div className="relative bg-white min-h-96">
          {/* Page Content */}
          <div className="p-8">
            {/* Page Number Indicator */}
            <div className="flex justify-center gap-2 mb-6">
              {pages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded ${idx === currentPage ? 'bg-blue-900' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            {/* Page 1: The Problem */}
            {currentPage === 0 && (
              <div key="page-0">
                <div className="flex items-start gap-3 mb-4">
                  <h4 className="text-2xl font-bold text-blue-900">The Problem</h4>
                </div>
                <p className="text-gray-800 text-2xl leading-relaxed italic border-l-4 border-blue-900 pl-4">
                  "{problem}"
                </p>
              </div>
            )}

            {/* Page 2: The System */}
            {currentPage === 1 && (
              <div key="page-1">
                <div className="flex items-start gap-3 mb-4">
                  <h4 className="text-2xl font-bold text-blue-900">The System</h4>
                </div>
                <p className="text-gray-800 text-xl leading-relaxed border-l-4 border-blue-900 pl-4">
                  {system}
                </p>
              </div>
            )}

            {/* Page 3: How It Works */}
            {currentPage === 2 && (
              <div key="page-2">
                <div className="flex items-start gap-3 mb-4">
                  <h4 className="text-2xl font-bold text-blue-900">How It Works</h4>
                </div>
                <div className="space-y-4">
                  {howItWorks.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-gray-800 text-lg pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Page 4: Why It Matters */}
            {currentPage === 3 && (
              <div key="page-3">
                <div className="flex items-start gap-3 mb-4">
                  <h4 className="text-2xl font-bold text-blue-900">Why It Matters</h4>
                </div>
                <p className="text-gray-800 text-xl leading-relaxed mb-6 border-l-4 border-blue-900 pl-4">
                  {whyItMatters}
                </p>
                <div className="mt-6 pt-6 border-t border-blue-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Built with:</p>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-900 text-white text-xs font-semibold rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-between px-8">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-1 text-sm bg-blue-900 text-white font-semibold rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors flex items-center gap-1"
            >
              <span>←</span> Previous
            </button>
            <button
              type="button"
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="px-4 py-1 text-sm bg-blue-900 text-white font-semibold rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors flex items-center gap-1"
            >
              Next <span>→</span>
            </button>
          </div>
        </div>
      </div>
    );
  });

  const ProjectCard = ({ title, description, location, outcome, tools, whatItIs, problem, system, impact }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('what');

    return (
      <div 
        className={`bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden transition-all duration-500 ${isExpanded ? 'shadow-xl' : 'hover:shadow-lg'}`}
      >
        {/* Collapsed State */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-700 mb-1">{description}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="flex-shrink-0 mt-2 p-2 hover:bg-blue-50 rounded-full transition-colors"
            >
              <ChevronDown className={`w-6 h-6 text-blue-900 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg font-bold text-blue-900">{outcome}</span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {tools.map((tool, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-900 text-xs font-semibold rounded-full">
                {tool}
              </span>
            ))}
          </div>
          
          {!isExpanded && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="flex items-center text-blue-900 font-semibold text-sm hover:translate-x-1 transition-transform cursor-pointer"
            >
              View details <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>

        {/* Expanded State */}
        {isExpanded && (
          <div 
            className="border-t border-blue-100 animate-unfold"
            style={{
              animation: 'unfold 0.5s ease-out'
            }}
          >
            {/* Tabs */}
            <div className="flex border-b border-blue-100 bg-blue-50">
              <button
                onClick={() => setActiveTab('what')}
                className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'what' 
                    ? 'bg-white text-blue-900 border-b-2 border-blue-900' 
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                What it is
              </button>
              <button
                onClick={() => setActiveTab('problem')}
                className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'problem' 
                    ? 'bg-white text-blue-900 border-b-2 border-blue-900' 
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                The problem
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'system' 
                    ? 'bg-white text-blue-900 border-b-2 border-blue-900' 
                    : 'text-gray-600 hover:text-blue-900'
                }`}
              >
                The system
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'what' && (
                <div className="text-gray-700 text-lg leading-relaxed">
                  {whatItIs}
                </div>
              )}
              
              {activeTab === 'problem' && (
                <ul className="text-gray-700 space-y-2">
                  {problem.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-900 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              {activeTab === 'system' && (
                <ul className="text-gray-700 space-y-2">
                  {system.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-900 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Impact - Always Visible */}
            <div className="px-6 pb-6">
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                <h4 className="font-bold text-green-900 mb-3">Impact</h4>
                <div className="space-y-2 text-gray-700">
                  {impact.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setIsExpanded(false)}
                className="w-full px-6 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded hover:bg-blue-900 hover:text-white transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 text-gray-900 font-sans relative overflow-x-hidden">
      
      {/* Animated Moving Cloud Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-96 h-32 bg-white/60 rounded-full shadow-sm animate-cloud-1" 
             style={{ top: '10%' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-full opacity-50 blur-md"></div>
        </div>
        
        <div className="absolute w-80 h-28 bg-pink-50/60 rounded-full shadow-sm animate-cloud-2" 
             style={{ top: '30%' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 rounded-full opacity-40 blur-md"></div>
        </div>
        
        <div className="absolute w-72 h-24 bg-purple-50/60 rounded-full shadow-sm animate-cloud-3" 
             style={{ top: '50%' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 rounded-full opacity-40 blur-md"></div>
        </div>
        
        <div className="absolute w-88 h-30 bg-cyan-50/60 rounded-full shadow-sm animate-cloud-4" 
             style={{ top: '70%' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-100 via-cyan-50 to-cyan-100 rounded-full opacity-40 blur-md"></div>
        </div>
        
        <div className="absolute w-64 h-20 bg-yellow-50/50 rounded-full shadow-sm animate-cloud-5" 
             style={{ bottom: '10%' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded-full opacity-30 blur-md"></div>
        </div>
        
        <div className="absolute w-60 h-24 bg-indigo-50/60 rounded-full shadow-sm animate-cloud-small-1" 
             style={{ top: '25%', left: '45%' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-indigo-50 to-indigo-100 rounded-full opacity-40 blur-md"></div>
        </div>
        
        <div className="absolute w-56 h-22 bg-teal-50/60 rounded-full shadow-sm animate-cloud-small-2" 
             style={{ top: '55%', right: '40%' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-100 via-teal-50 to-teal-100 rounded-full opacity-40 blur-md"></div>
        </div>
      </div>

      {/* Hero with Carousel */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="max-w-4xl text-center relative z-10">
          {/* Profile Photo */}
          <div className="mb-8 pt-24 flex justify-center">
            <div className="relative w-72 h-72 rounded-2xl overflow-hidden border-4 border-blue-900 shadow-xl profile-3d-card">
              <img 
                src="/photos/sonal.JPG" 
                alt="Sonal Misra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mb-12">
            <div className="h-32 flex items-center justify-center">
              <h1 
                className="text-5xl font-bold text-blue-900 transition-opacity duration-700"
                key={carouselIndex}
              >
                {carouselItems[carouselIndex]}
              </h1>
            </div>
          </div>
          <div className="max-w-3xl mx-auto text-left space-y-4 text-lg text-gray-700 leading-relaxed mb-12">
            <p className="text-2xl font-semibold text-blue-900">Hi, I'm Sonal</p>
            <p>
              I'm a University of Waterloo grad with a background in Business and Psychology, and I'm fascinated by how people, systems, and strategy come together. I enjoy tackling messy problems, building smarter processes, and finding ways to make work feel clearer and more human.
            </p>
            <p>
              I love bringing campaigns to life, from shaping the message and understanding the audience to launching, testing, and learning from real customer behavior. I'm at my best when I'm using insights and data to improve engagement, refine messaging, and create experiences that feel thoughtful rather than transactional.
            </p>
            <p>
              I'm especially interested in the space where traditional marketing meets automation, using systems and technology to remove busywork and support better ideas. Right now, I'm focused on blending psychology, business strategy, and technology to build marketing that genuinely works for people.
            </p>
            <p>
              I hope you enjoy reading a little about my journey as much as I've enjoyed creating this space for you 😊
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-900 text-white font-semibold hover:scale-105 transition-transform rounded-lg">
              See How I Work
            </button>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-blue-900 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white transition-all rounded-lg"
            >
              Let's Talk
            </button>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-blue-900" />
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 px-6 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-blue-900 mb-4 relative">
            <span className="inline-block animate-plane text-4xl absolute left-0 -top-12">
              🛫
              <span className="smoke-trail"></span>
            </span>
            <span className="inline-block">Not a resume. A journey.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-16">Each role was a new experience.</p>
          
          <div className="relative border-l-4 border-blue-900 pl-12 space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-14 w-6 h-6 bg-blue-900 rounded-full border-4 border-white" />
                <div 
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow border border-blue-100"
                  onClick={() => setExpandedRole(expandedRole === idx ? null : idx)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-bold text-blue-900 mb-1">{exp.year}</div>
                      <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      {expandedRole !== idx && (
                        <div className="mt-3 flex gap-2 flex-wrap">
                          {exp.impact.map((metric, i) => (
                            <span key={i} className="text-sm font-bold text-blue-900">{metric}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronDown className={`w-6 h-6 text-blue-900 transition-transform ${expandedRole === idx ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {expandedRole === idx && (
                    <div className="mt-6 space-y-4 text-gray-700">
                      <div><strong>Context:</strong> {exp.context}</div>
                      <div><strong>Problem:</strong> {exp.problem}</div>
                      <div><strong>Ownership:</strong> {exp.ownership}</div>
                      <div className="flex gap-2 flex-wrap">
                        <strong>Tools:</strong>
                        {exp.tools.map((tool, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-100 text-blue-900 text-sm font-semibold rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <div>
                        <strong>Impact:</strong>
                        <ul className="mt-2 space-y-1">
                          {exp.impact.map((metric, i) => (
                            <li key={i} className="text-blue-900 font-bold">• {metric}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-blue-900 mb-4 flex items-center gap-3">
            <span className="inline-block relative text-4xl animate-test-tube-tilt" style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
              🧪
              <span className="test-tube-spill"></span>
              <span className="test-tube-spill" style={{ animationDelay: '0.6s' }}></span>
              <span className="test-tube-spill" style={{ animationDelay: '1.2s' }}></span>
            </span>
            <span>Things I've tested (so you don't have to)</span>
          </h2>
          <p className="text-xl text-gray-600 mb-16">Real experiments. Real outcomes.</p>
          
          {!selectedCase ? (
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((study, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-gray-200 p-8 rounded-lg cursor-pointer hover:border-blue-900 hover:shadow-xl transition-all group"
                  onClick={() => { setSelectedCase(idx); setCaseStep(0); }}
                >
                  <div className="text-4xl font-black text-blue-900 mb-4">{study.outcome}</div>
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <div className="flex items-center text-blue-900 font-semibold group-hover:translate-x-2 transition-transform">
                    Read the story <ChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-xl border border-blue-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold">{caseStudies[selectedCase].title}</h3>
                <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-gray-200 rounded">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex gap-2 mb-8">
                {['Goal', 'Insight', 'Strategy', 'Execution', 'Result', 'Next Test'].map((label, i) => (
                  <div key={i} className={`h-2 flex-1 rounded ${i <= caseStep ? 'bg-blue-900' : 'bg-gray-300'}`} />
                ))}
              </div>

              <div className="bg-blue-50 p-8 rounded-lg mb-6">
                {caseStep === 0 && <div><strong className="text-blue-900">Goal:</strong> <p className="mt-2 text-lg">{caseStudies[selectedCase].goal}</p></div>}
                {caseStep === 1 && <div><strong className="text-blue-900">Insight:</strong> <p className="mt-2 text-lg">{caseStudies[selectedCase].insight}</p></div>}
                {caseStep === 2 && <div><strong className="text-blue-900">Strategy:</strong> <p className="mt-2 text-lg">{caseStudies[selectedCase].strategy}</p></div>}
                {caseStep === 3 && <div><strong className="text-blue-900">Execution:</strong> <p className="mt-2 text-lg">{caseStudies[selectedCase].execution}</p></div>}
                {caseStep === 4 && <div><strong className="text-blue-900">Result:</strong> <p className="mt-2 text-lg text-blue-900 font-bold">{caseStudies[selectedCase].result}</p></div>}
                {caseStep === 5 && <div><strong className="text-blue-900">What I'd Test Next:</strong> <p className="mt-2 text-lg">{caseStudies[selectedCase].nextTest}</p></div>}
              </div>

              <div className="flex justify-between">
                <button 
                  onClick={() => setCaseStep(Math.max(0, caseStep - 1))}
                  disabled={caseStep === 0}
                  className="px-6 py-2 border-2 border-blue-900 text-blue-900 font-semibold disabled:opacity-30 rounded"
                >
                  Previous
                </button>
                <button 
                  onClick={() => caseStep < 5 ? setCaseStep(caseStep + 1) : setSelectedCase(null)}
                  className="px-6 py-2 bg-blue-900 text-white font-semibold hover:scale-105 transition-transform rounded"
                >
                  {caseStep < 5 ? 'Next' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Automation */}
      <section id="automation-section" className="py-24 px-6 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-blue-900 mb-3 flex items-center gap-3">
              <span className="inline-block animate-spin-slow text-6xl">⚙️</span>
              <span>I Automate So Marketers Can Breathe</span>
            </h2>
            <p className="text-xl text-gray-600">Systems that scale work, not stress.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <AutomationCard
              title="Out-of-Office Contact Tracker"
              summary="Automated system that collects out-of-office and role-change contacts from monthly digest auto-reply emails."
              problem={['Hundreds of auto-replies every month', 'Manual scanning of inboxes', 'Missed or outdated contacts']}
              tools={['Power Automate', 'Excel']}
              impact="⏱️ Hours saved each month"
            />

            {/* Card 2 */}
            <AutomationCard
              title="Asset Publishing Workflow"
              summary="Centralized workflow for requesting, approving, tracking, and publishing marketing assets."
              problem={['Requests via email, chat, DMs', 'No visibility into approval status', 'Missed deadlines']}
              tools={['MS Forms', 'SharePoint']}
              impact="⏱️ Eliminated manual follow-ups"
            />

            {/* Card 3 */}
            <AutomationCard
              title="AI-Powered Personalized Emails"
              summary="GPT-powered workflow that generates hundreds of personalized emails with custom salutations and unique links."
              problem={['Manual personalization at scale', 'Copy-paste errors', 'Long campaign prep times']}
              tools={['GPT', 'Power Automate']}
              impact={['⏱️ 17+ hours saved per campaign', '📧 200+ emails instantly']}
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 italic text-lg mb-6">Built to scale personalization — not stress.</p>
            <div className="flex items-center justify-center gap-12">
              <div className="text-center">
                <div className="text-5xl font-black text-blue-900 mb-2">+{timeSaved}</div>
                <div className="text-sm text-gray-600 font-semibold">hours saved/month</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-blue-900 mb-2">{daysSaved}</div>
                <div className="text-sm text-gray-600 font-semibold">days saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-blue-900 mb-4 flex items-center gap-3">
            <span className="inline-block relative">
              <span className="inline-block animate-speech-bubble text-4xl absolute" style={{ bottom: '-5px', left: '0px', animationDelay: '0s' }}>💭</span>
              <span className="inline-block animate-speech-bubble text-6xl" style={{ animationDelay: '0.5s' }}>💭</span>
            </span>
            <span>Projects That Show How I Think & Execute</span>
          </h2>
          <p className="text-xl text-gray-600 mb-16">From client work to technical builds.</p>
          
          <div className="space-y-8">
            {/* Project 1: Pristine Clean */}
            <ProjectCard
              title="Growing a Local Brand Through Strategy & Content"
              description="Freelance Marketing Consultant — Pristine Clean with Kayla"
              location="Niagara Region · Jan 2024 – Apr 2024"
              outcome="📊 20% increase in engagement"
              tools={['Instagram', 'LinkedIn', 'Google Search Console', 'Website CMS']}
              whatItIs="A freelance marketing engagement focused on increasing visibility, engagement, and traffic for a growing local service business."
              problem={[
                'Inconsistent social presence',
                'Low discoverability online',
                'No clear content strategy tied to performance data'
              ]}
              system={[
                'Built a targeted content strategy for LinkedIn & Instagram',
                'Created and published 30 platform-specific posts',
                'Redesigned the website using insights from Google Search Console',
                'Worked closely with the client to align timelines, feedback, and goals'
              ]}
              impact={[
                '📊 20% increase in engagement',
                '🔍 Improved site traffic and discoverability',
                '🤝 High client satisfaction through clear communication and delivery'
              ]}
            />

            {/* Project 2: AI Financial Advisory */}
            <ProjectCard
              title="Building an AI System for Personalized Financial Guidance"
              description="WE Accelerate — Microsoft Azure AI Project"
              location="Toronto · May 2022 – Aug 2022"
              outcome="📌 Enabled individualized financial advice at scale"
              tools={['Microsoft Azure', 'NLP Models', 'Kaggle Datasets', 'Data Pipelines']}
              whatItIs="A team project to design a financial advisory AI that delivers personalized investment insights to help reduce wealth inequality."
              problem={[
                'Financial advice is often inaccessible or generic',
                'Users need tailored guidance based on their individual data'
              ]}
              system={[
                'Co-developed a financial advisory AI system with a 4-person team',
                'Designed an NLP model to collect and interpret client inputs',
                'Used Kaggle datasets to inform investment strategies',
                'Built an Azure-based pipeline to analyze responses and generate personalized recommendations'
              ]}
              impact={[
                '📌 Enabled individualized financial advice at scale',
                '🧠 Applied AI to a real social problem, not just a technical exercise',
                '🤝 Strengthened collaboration across technical and non-technical roles'
              ]}
            />
          </div>
        </div>
      </section>

      {/* What I'd Build Next */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-blue-900 mb-4 flex items-center gap-3">
            <span className="text-5xl animate-lightbulb">💡</span>
            <span>What I'd Build Next</span>
          </h2>
          <p className="text-xl text-gray-600 mb-16">Systems I would build for marketing.</p>
          
          <div className="space-y-8">
            {/* Story 1: Product Launch Command Center */}
            <StoryCard
              key="story-1"
              title="Product Launch Command Center"
              subtitle="One place to plan, track, and measure every launch"
              problem="Product launches lived across decks, documents, emails, and meetings, making ownership unclear and performance hard to track."
              system="A centralized launch intake workflow that automatically creates go-to-market tasks, assigns owners, and tracks launch milestones and KPIs in one place."
              howItWorks={[
                'A standardized launch intake form captures key inputs (product, audience, timeline, goals)',
                'Submission triggers automated creation of launch tasks and owners across teams',
                'Milestones and dependencies are tracked in a shared workspace',
                'Launch progress auto-updates status and KPIs in real time'
              ]}
              whyItMatters="Improves launch consistency, reduces manual coordination, and gives leadership clear visibility into launch readiness and impact."
              tools={['Power Automate', 'Microsoft Forms', 'SharePoint', 'Planner', 'Teams']}
              currentPage={storyPage1}
              setCurrentPage={setStoryPage1}
            />

            {/* Story 2: Launch KPI Auto-Tracker */}
            <StoryCard
              key="story-2"
              title="Launch KPI Auto-Tracker"
              subtitle="Stop manually reporting—let the data tell the story"
              problem="Post-launch performance data was scattered across tools, requiring manual reporting to understand what worked and what didn't."
              system="A recurring automation that pulls pipeline, adoption, and engagement data tied to each launch and compares planned vs. actual KPIs."
              howItWorks={[
                'Launch KPIs are defined upfront and stored centrally',
                'A scheduled automation pulls performance data from CRM and reporting sources',
                'Actual results are compared against launch targets automatically',
                'A recurring summary highlights trends, gaps, and areas needing adjustment'
              ]}
              whyItMatters="Enables PMMs to quickly evaluate launch success, adjust messaging or strategy, and communicate performance with confidence."
              tools={['Power Automate', 'Salesforce', 'Excel / Power BI', 'SharePoint']}
              currentPage={storyPage2}
              setCurrentPage={setStoryPage2}
            />

            {/* Story 3: Deal-Triggered Sales Enablement */}
            <StoryCard
              key="story-3"
              title="Deal-Triggered Sales Enablement"
              subtitle="The right message, at the right stage, automatically"
              problem="Sales teams didn't always have the right messaging or assets at the right stage of the buying process."
              system="A Salesforce-triggered automation that detects opportunity stage changes and delivers relevant PMM-approved messaging, decks, and references in real time."
              howItWorks={[
                'Opportunity stages in Salesforce act as triggers',
                'Each stage is mapped to approved PMM messaging and assets',
                'When a deal progresses, the relevant materials are automatically delivered to Sales',
                'Content stays consistent and up to date without manual PMM intervention'
              ]}
              whyItMatters="Improves message consistency, reduces friction for Sales, and ensures PMM strategy shows up where it matters most—inside active deals."
              tools={['Power Automate', 'Salesforce', 'Outlook / Teams', 'SharePoint']}
              currentPage={storyPage3}
              setCurrentPage={setStoryPage3}
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-blue-900 mb-16 flex items-center justify-center gap-3">
            <span className="inline-block animate-wobble text-6xl">🌱</span>
            <span>What working with me feels like.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              shortQuote="I've had the pleasure of working with Sonal, and I can confidently say she is a powerhouse when it comes to leveraging technology to streamline processes and boost productivity."
              fullQuote="I've had the pleasure of working with Sonal, and I can confidently say she is a powerhouse when it comes to leveraging technology to streamline processes and boost productivity. Her expertise in Power Automate has been instrumental in simplifying complex workflows, saving time, and reducing manual effort. 

What truly sets Sonal apart is her creativity and innovative mindset. She doesn't just solve problems—she reimagines them. Whether it's finding a new way to automate a tedious task or designing a solution that improves cross-functional collaboration, Sonal consistently brings fresh ideas to the table that drive meaningful outcomes.

Her commitment to excellence is evident in everything she does. Sonal goes above and beyond to ensure that her solutions are not only effective but scalable and sustainable. Her drive to promote efficiency and her passion for continuous improvement make her an invaluable asset to any team."
              author="Jenn Krieger"
              title="Senior Leader at PointClickCare"
            />

            <TestimonialCard
              shortQuote="Sonal is a valuable co-op student on our Digital Customer Success team. She brings a kind and approachable personality to her work and demonstrates a solid foundation in coding and data analysis."
              fullQuote="Sonal is a valuable co-op student on our Digital Customer Success team. She brings a kind and approachable personality to her work and demonstrates a solid foundation in coding and data analysis. 

Sonal has shown steady growth in her ability to approach challenges thoughtfully and contribute to team initiatives. Her willingness to learn and collaborate has been appreciated, and I am confident she will continue to bring value to her future endeavors."
              author="Christine Steffler"
              title="Digital Strategy Lead at PointClickCare"
            />
          </div>
        </div>
      </section>

      {/* Off Hours */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-blue-900 mb-4 flex items-center gap-3">
            <span className="inline-block relative" style={{ width: '60px', height: '40px' }}>
              <span className="eyeball-container">
                <span className="eyeball-white"></span>
                <span className="eyeball-pupil animate-pupil-move"></span>
              </span>
              <span className="eyeball-container" style={{ left: '32px' }}>
                <span className="eyeball-white"></span>
                <span className="eyeball-pupil animate-pupil-move"></span>
              </span>
            </span>
            <span>Offline, but still curious.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12">Everything I do outside work makes me better at it.</p>
          
          {/* Embedded Photo Carousel */}
          <EmbeddedCarousel photos={offHours[0].photos} />
          
          {/* Blog Link */}
          <div className="mt-12 text-center">
            <a 
              href="https://sonalmisrablog.home.blog/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all hover:scale-105 shadow-lg"
            >
              <span className="text-2xl">✍️</span>
              <span>Read my blog</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-blue-900 text-white relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8">Let's build something that works.</h2>
          <div className="flex flex-col gap-4 max-w-md mx-auto mb-12">
            {['I\'m hiring', 'I\'m curious', 'I like how you think'].map((prompt, idx) => (
              <a key={idx} href="mailto:s22misra@uwaterloo.ca" className="px-6 py-4 bg-white text-blue-900 font-semibold hover:scale-105 transition-transform text-left rounded-lg">
                {prompt}
              </a>
            ))}
          </div>
          <div className="flex gap-6 justify-center">
            <a href="mailto:s22misra@uwaterloo.ca" className="text-lg hover:text-cyan-300 transition-colors">
              s22misra@uwaterloo.ca
            </a>
            <span className="text-gray-400">•</span>
            <a href="https://www.linkedin.com/in/sonal-misra-3807901bb/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-cyan-300 transition-colors">
              linkedin.com/in/sonal-misra
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .cloud {
          position: absolute;
          font-size: 4rem;
          opacity: 0.4;
        }
        .cloud-1 {
          top: 10%;
          left: -100px;
          animation: cloud-1 80s linear infinite;
        }
        .cloud-2 {
          top: 30%;
          animation: cloud-2 100s linear infinite;
        }
        .cloud-3 {
          top: 60%;
          left: -100px;
          animation: cloud-3 90s linear infinite;
        }
        .cloud-4 {
          top: 80%;
          animation: cloud-4 110s linear infinite;
        }
        .cloud-5 {
          top: 45%;
          left: -100px;
          animation: cloud-5 95s linear infinite;
        }
        @keyframes cloud-1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 400px)); }
        }
        @keyframes cloud-2 {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-400px); }
        }
        @keyframes cloud-3 {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 400px)); }
        }
        @keyframes cloud-4 {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-400px); }
        }
        @keyframes cloud-5 {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 400px)); }
        }
        @keyframes cloud-small-1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        @keyframes cloud-small-2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(15px) scale(0.95); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-pen {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes speech-bubble {
          0% { 
            opacity: 0;
            transform: scale(0.3) translateY(10px);
          }
          20% { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          80% { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% { 
            opacity: 0;
            transform: scale(0.3) translateY(-10px);
          }
        }
        .animate-speech-bubble {
          animation: speech-bubble 3.6s ease-in-out infinite;
        }
        @keyframes eyes-move {
          0%, 100% { 
            transform: translateX(0);
          }
          25% { 
            transform: translateX(-8px);
          }
          75% { 
            transform: translateX(8px);
          }
        }
        .animate-eyes {
          animation: eyes-move 4s ease-in-out infinite;
        }
        @keyframes pupil-move {
          0%, 100% { 
            transform: translate(-50%, -50%) translateX(0) translateY(0);
          }
          25% { 
            transform: translate(-50%, -50%) translateX(-6px) translateY(-3px);
          }
          50% { 
            transform: translate(-50%, -50%) translateX(6px) translateY(3px);
          }
          75% { 
            transform: translate(-50%, -50%) translateX(-4px) translateY(4px);
          }
        }
        .eyeball-container {
          position: absolute;
          width: 28px;
          height: 28px;
          display: inline-block;
        }
        .eyeball-white {
          position: absolute;
          width: 28px;
          height: 28px;
          background: white;
          border-radius: 50%;
          border: 2px solid #1e3a8a;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .eyeball-pupil {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #1e3a8a;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .animate-pupil-move {
          animation: pupil-move 3s ease-in-out infinite;
        }
        @keyframes unfold {
          0% {
            max-height: 0;
            opacity: 0;
            transform: scaleY(0);
            transform-origin: top;
          }
          100% {
            max-height: 2000px;
            opacity: 1;
            transform: scaleY(1);
            transform-origin: top;
          }
        }
        .animate-unfold {
          animation: unfold 0.5s ease-out;
        }
        @keyframes page-turn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-page-turn {
          animation: page-turn 0.3s ease-out;
        }
        @keyframes hammer-hit {
          0%, 100% {
            transform: scaleX(-1) rotate(20deg) translateY(0);
          }
          10% {
            transform: scaleX(-1) rotate(45deg) translateY(-5px);
          }
          20% {
            transform: scaleX(-1) rotate(20deg) translateY(0);
          }
          25% {
            transform: scaleX(-1) rotate(20deg) translateY(2px) scale(0.95);
          }
          30% {
            transform: scaleX(-1) rotate(20deg) translateY(0) scale(1);
          }
        }
        .animate-hammer-hit {
          animation: hammer-hit 2s ease-in-out infinite;
          transform-origin: bottom left;
          display: inline-block;
        }
        @keyframes firework-pop {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-firework-pop {
          animation: firework-pop 1.5s ease-out infinite;
          display: inline-block;
        }
        @keyframes party-pop {
          0%, 100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(15deg) scale(1.1);
          }
        }
        .animate-party-pop {
          animation: party-pop 3s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes streamer-burst {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1);
            opacity: 0;
          }
        }
        .streamer {
          position: absolute;
          width: 4px;
          height: 20px;
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 2px;
          top: 0;
          left: 50%;
          animation: streamer-burst 3s ease-out infinite;
        }
        .streamer-1 {
          --tx: -40px;
          --ty: -30px;
          background: linear-gradient(to bottom, #ef4444, #f59e0b);
        }
        .streamer-2 {
          --tx: 40px;
          --ty: -35px;
          background: linear-gradient(to bottom, #10b981, #3b82f6);
          animation-delay: 0.2s;
        }
        .streamer-3 {
          --tx: 0px;
          --ty: -50px;
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          animation-delay: 0.4s;
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
        @keyframes plane-fly {
          0% { left: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(100% - 60px); opacity: 0; }
        }
        @keyframes smoke-trail {
          0% { 
            transform: translateX(0) scale(1);
            opacity: 0.6;
          }
          100% { 
            transform: translateX(-100px) scale(2);
            opacity: 0;
          }
        }
        .smoke-trail {
          position: absolute;
          left: -20px;
          top: 50%;
          width: 80px;
          height: 3px;
          background: linear-gradient(to left, rgba(156, 163, 175, 0.4), transparent);
          border-radius: 50%;
          animation: smoke-trail 1.5s ease-out infinite;
          pointer-events: none;
        }
        .smoke-trail::before,
        .smoke-trail::after {
          content: '';
          position: absolute;
          width: 60px;
          height: 3px;
          background: linear-gradient(to left, rgba(156, 163, 175, 0.3), transparent);
          border-radius: 50%;
          animation: smoke-trail 1.5s ease-out infinite;
        }
        .smoke-trail::before {
          animation-delay: 0.2s;
          left: 10px;
        }
        .smoke-trail::after {
          animation-delay: 0.4s;
          left: 20px;
        }
        @keyframes spill-liquid {
          0% { 
            transform: translateY(0) translateX(20px) scale(0.3);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          50% {
            opacity: 0.7;
          }
          100% { 
            transform: translateY(100px) translateX(50px) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes test-tube-tilt {
          0%, 100% { 
            transform: rotate(15deg);
          }
          50% { 
            transform: rotate(55deg);
          }
        }
        .animate-test-tube-tilt {
          animation: test-tube-tilt 3s ease-in-out infinite;
          transform-origin: bottom center;
        }
        .test-tube-spill {
          position: absolute;
          bottom: 10px;
          right: -5px;
          width: 35px;
          height: 35px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.7) 0%, rgba(134, 239, 172, 0.5) 40%, transparent 80%);
          border-radius: 50%;
          animation: spill-liquid 2s ease-out infinite;
          pointer-events: none;
          z-index: 10;
        }
        .test-tube-spill::before,
        .test-tube-spill::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          animation: spill-liquid 2s ease-out infinite;
        }
        .test-tube-spill::before {
          width: 25px;
          height: 25px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(147, 197, 253, 0.4) 40%, transparent 80%);
          left: -10px;
          top: 8px;
          animation-delay: 0.3s;
        }
        .test-tube-spill::after {
          width: 28px;
          height: 28px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(216, 180, 254, 0.4) 40%, transparent 80%);
          right: -12px;
          top: 5px;
          animation-delay: 0.5s;
        }
        .animate-cloud-1 { animation: cloud-1 60s linear infinite; }
        .animate-cloud-2 { animation: cloud-2 70s linear infinite; }
        .animate-cloud-3 { animation: cloud-3 50s linear infinite; }
        .animate-cloud-4 { animation: cloud-4 65s linear infinite; }
        .animate-cloud-5 { animation: cloud-5 55s linear infinite; }
        .animate-cloud-small-1 { animation: cloud-small-1 8s ease-in-out infinite; }
        .animate-cloud-small-2 { animation: cloud-small-2 10s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-spin-pen { animation: spin-pen 3s linear infinite; }
        .animate-wobble { animation: wobble 1.5s ease-in-out infinite; }
        .animate-plane { animation: plane-fly 5s ease-in-out infinite; }
        
        /* Lightbulb Glow Animation */
        @keyframes lightbulb-glow {
          0%, 100% {
            filter: brightness(0.7) drop-shadow(0 0 0px rgba(255, 200, 0, 0));
            transform: scale(1);
          }
          50% {
            filter: brightness(1.3) drop-shadow(0 0 20px rgba(255, 200, 0, 0.9)) drop-shadow(0 0 40px rgba(255, 200, 0, 0.5));
            transform: scale(1.1);
          }
        }
        .animate-lightbulb {
          display: inline-block;
          animation: lightbulb-glow 2s ease-in-out infinite;
        }
        
        /* Brick Building Animation */
        .brick-stack {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          height: 60px;
          width: 50px;
          justify-content: flex-end;
        }
        .brick {
          font-size: 1.2rem;
          line-height: 1;
          animation: brick-drop 3s ease-in-out infinite;
          opacity: 0;
        }
        .brick-1 {
          animation-delay: 0s;
        }
        .brick-2 {
          animation-delay: 0.4s;
        }
        .brick-3 {
          animation-delay: 0.8s;
        }
        @keyframes brick-drop {
          0% {
            transform: translateY(-30px);
            opacity: 0;
          }
          15% {
            transform: translateY(0px);
            opacity: 1;
          }
          20% {
            transform: translateY(-3px);
          }
          25% {
            transform: translateY(0px);
          }
          80% {
            transform: translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translateY(0px);
            opacity: 0;
          }
        }
        
        /* 3D Profile Card Animation */
        .profile-3d-card {
          animation: float3d 6s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .profile-3d-card:hover {
          animation-play-state: paused;
          transform: perspective(1000px) rotateY(15deg) rotateX(5deg) scale(1.05);
          box-shadow: -20px 20px 50px rgba(30, 58, 138, 0.3), 0 0 30px rgba(59, 130, 246, 0.2);
        }
        @keyframes float3d {
          0%, 100% {
            transform: perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(0px);
            box-shadow: -10px 10px 30px rgba(30, 58, 138, 0.2);
          }
          25% {
            transform: perspective(1000px) rotateY(5deg) rotateX(-5deg) translateY(-10px);
            box-shadow: 10px 20px 40px rgba(30, 58, 138, 0.25);
          }
          50% {
            transform: perspective(1000px) rotateY(5deg) rotateX(5deg) translateY(0px);
            box-shadow: 10px 10px 30px rgba(30, 58, 138, 0.2);
          }
          75% {
            transform: perspective(1000px) rotateY(-5deg) rotateX(-5deg) translateY(-10px);
            box-shadow: -10px 20px 40px rgba(30, 58, 138, 0.25);
          }
        }
      `}</style>
    </div>
  );
}
