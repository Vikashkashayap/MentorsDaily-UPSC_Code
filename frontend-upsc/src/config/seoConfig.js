// SEO Configuration for MentorsDaily
export const SEO_CONFIG = {
  // Basic Site Information
  siteName: 'MentorsDaily',
  siteUrl: 'https://mentorsdaily.com',
  siteDescription: 'Comprehensive UPSC preparation platform with expert mentorship, courses, study materials, and personalized guidance for civil services aspirants.',
  
  // Default Meta Tags
  defaultTitle: 'MentorsDaily - UPSC Preparation & Mentorship Platform',
  defaultDescription: 'Comprehensive UPSC preparation platform with expert mentorship, courses, study materials, and personalized guidance for civil services aspirants.',
  defaultKeywords: 'UPSC, civil services, IAS preparation, mentorship, study materials, current affairs, prelims, mains, interview',
  
  // Author Information
  author: 'MentorsDaily Team',
  authorEmail: 'info@mentorsdaily.com',
  
  // Social Media
  twitterHandle: '@mentorsdaily',
  facebookAppId: 'your-facebook-app-id',
  linkedinUrl: 'https://www.linkedin.com/company/mentorsdaily',
  
  // SEO Settings
  robots: 'index, follow',
  language: 'en',
  locale: 'en_IN',
  revisitAfter: '7 days',
  
  // Google Services
  googleSiteVerification: 'your-google-verification-code',
  googleAnalyticsId: 'GA_MEASUREMENT_ID',
  googleTagManagerId: 'GTM-XXXXXXX',
  
  // Performance
  themeColor: '#2563eb',
  msApplicationTileColor: '#2563eb',
  
  // Images
  defaultOgImage: '/images/hero.png',
  defaultTwitterImage: '/images/hero.png',
  logoUrl: '/Logo/logo.png',
  faviconUrl: '/Logo/icon.png',
  
  // Structured Data
  organizationSchema: {
    '@type': 'EducationalOrganization',
    name: 'MentorsDaily',
    url: 'https://mentorsdaily.com',
    logo: 'https://mentorsdaily.com/Logo/logo.png',
    description: 'Comprehensive UPSC preparation platform with expert mentorship and study materials',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://www.facebook.com/mentorsdaily',
      'https://www.twitter.com/mentorsdaily',
      'https://www.linkedin.com/company/mentorsdaily'
    ]
  }
};

// Page-specific SEO configurations
export const PAGE_SEO_CONFIGS = {
  // Homepage
  '/': {
    title: 'MentorsDaily - Best UPSC Preparation Platform | Expert Mentorship',
    description: 'Join MentorsDaily for comprehensive UPSC preparation with expert mentorship, personalized courses, study materials, and proven strategies to crack civil services exam.',
    keywords: 'UPSC preparation, IAS coaching, civil services mentorship, UPSC courses, study materials, current affairs, prelims preparation, mains preparation',
    priority: 1.0,
    changefreq: 'daily'
  },
  
  // Authentication
  '/login': {
    title: 'Login - MentorsDaily | Access Your UPSC Preparation Dashboard',
    description: 'Login to your MentorsDaily account and continue your UPSC preparation journey with personalized mentorship and study materials.',
    keywords: 'UPSC login, MentorsDaily login, civil services dashboard, study progress',
    priority: 0.8,
    changefreq: 'monthly'
  },
  
  '/register': {
    title: 'Register - MentorsDaily | Start Your UPSC Journey Today',
    description: 'Join thousands of successful UPSC aspirants with MentorsDaily. Get expert mentorship, comprehensive study materials, and personalized guidance.',
    keywords: 'UPSC registration, join MentorsDaily, civil services preparation, mentorship signup',
    priority: 0.8,
    changefreq: 'monthly'
  },
  
  // Mentorship Programs
  '/uppcs-mentorship': {
    title: 'UPPCS Mentorship 2025 | State PCS Preparation | MentorsDaily',
    description: 'Comprehensive UPPCS preparation program for 2025 with expert mentorship, study materials, and personalized guidance for state civil services.',
    keywords: 'UPPCS 2025, state PCS preparation, UPPSC mentorship, state civil services, PCS coaching',
    priority: 0.9,
    changefreq: 'weekly'
  },
  
  '/integrated-mentorship': {
    title: 'Integrated Mentorship Program | Complete UPSC Preparation | MentorsDaily',
    description: 'Comprehensive integrated mentorship program covering all aspects of UPSC preparation - prelims, mains, and interview with expert guidance.',
    keywords: 'integrated UPSC preparation, complete mentorship, prelims mains interview, comprehensive coaching',
    priority: 0.9,
    changefreq: 'weekly'
  },
  
  // Study Materials
  '/previous-year-papers': {
    title: 'UPSC Previous Year Papers | Download PDFs | MentorsDaily',
    description: 'Download UPSC previous year question papers for prelims and mains. Practice with real exam papers and improve your preparation.',
    keywords: 'UPSC previous year papers, prelims papers, mains papers, question papers download',
    priority: 0.8,
    changefreq: 'weekly'
  },
  
  '/free-study-materials': {
    title: 'Free UPSC Study Materials | NCERTs, Books & Resources | MentorsDaily',
    description: 'Access free UPSC study materials including NCERTs, reference books, current affairs, and comprehensive study resources.',
    keywords: 'free UPSC materials, NCERT books, study resources, current affairs, free downloads',
    priority: 0.8,
    changefreq: 'weekly'
  },
  
  // Blog
  '/upsc-preparation-blog': {
    title: 'UPSC Preparation Blog | Tips, Strategies & Guidance | MentorsDaily',
    description: 'Expert UPSC preparation tips, strategies, and guidance from successful candidates. Learn from the best to crack civil services.',
    keywords: 'UPSC preparation tips, study strategies, exam guidance, success tips, preparation blog',
    priority: 0.9,
    changefreq: 'daily'
  }
};

// Blog-specific SEO configurations
export const BLOG_SEO_CONFIGS = {
  '/blogs/how-to-prepare-upsc-2025-in-100-days': {
    title: 'How to Prepare UPSC 2025 in 100 Days | Complete Strategy | MentorsDaily',
    description: 'Comprehensive 100-day strategy for UPSC 2025 preparation. Time management, study plan, and expert tips for last-minute preparation.',
    keywords: 'UPSC 100 days preparation, last minute strategy, time management, quick preparation, UPSC 2025',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'UPSC Preparation',
    readingTime: '12 min read'
  },
  
  '/blogs/how-to-deal-with-stress': {
    title: 'How to Deal with UPSC Preparation Stress | Mental Health Tips | MentorsDaily',
    description: 'Essential tips to manage stress during UPSC preparation. Mental health guidance, stress management techniques, and maintaining work-life balance.',
    keywords: 'UPSC stress management, mental health, preparation stress, work-life balance, stress relief',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'Mental Health',
    readingTime: '8 min read'
  },
  
  '/blogs/answer-writing-tips': {
    title: 'UPSC Answer Writing Tips | Mains Preparation Strategy | MentorsDaily',
    description: 'Master UPSC answer writing with expert tips and techniques. Improve your mains performance with structured answer writing strategies.',
    keywords: 'UPSC answer writing, mains preparation, writing skills, answer structure, exam techniques',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'Mains Preparation',
    readingTime: '10 min read'
  }
};

// SEO Utility Functions
export const getSEOConfig = (pathname) => {
  // Check if it's a blog post
  if (pathname.startsWith('/blogs/')) {
    return BLOG_SEO_CONFIGS[pathname] || {
      title: `${pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | MentorsDaily`,
      description: `Comprehensive guide on ${pathname.split('/').pop().replace(/-/g, ' ')} for UPSC preparation. Expert insights and strategies.`,
      keywords: 'UPSC preparation, study guide, exam tips, civil services',
      priority: 0.6,
      changefreq: 'monthly',
      category: 'UPSC Preparation',
      readingTime: '5 min read'
    };
  }
  
  // Check regular pages
  return PAGE_SEO_CONFIGS[pathname] || {
    title: `${pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | MentorsDaily`,
    description: `Access ${pathname.split('/').pop().replace(/-/g, ' ')} on MentorsDaily for comprehensive UPSC preparation.`,
    keywords: 'UPSC preparation, civil services, study materials, mentorship',
    priority: 0.6,
    changefreq: 'monthly'
  };
};

// Generate structured data for different page types
export const generateStructuredData = (pageType, data) => {
  const baseUrl = SEO_CONFIG.siteUrl;
  
  switch (pageType) {
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.imageUrl ? `${baseUrl}${data.imageUrl}` : `${baseUrl}/images/blog-hero.png`,
        author: {
          '@type': 'Person',
          name: data.author || SEO_CONFIG.author
        },
        publisher: {
          '@type': 'Organization',
          name: SEO_CONFIG.siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}${SEO_CONFIG.logoUrl}`
          }
        },
        datePublished: data.publishDate,
        dateModified: data.modifiedDate || data.publishDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}${data.articleUrl}`
        },
        articleSection: data.category || 'UPSC Preparation',
        wordCount: Math.ceil(data.description.length / 5),
        timeRequired: data.readingTime || '5 min read'
      };
      
    case 'course':
      return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: SEO_CONFIG.siteName,
          url: baseUrl
        },
        courseMode: data.mode || 'online',
        educationalLevel: 'Advanced',
        teaches: data.keywords,
        inLanguage: 'en-IN'
      };
      
    case 'organization':
      return SEO_CONFIG.organizationSchema;
      
    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title,
        description: data.description,
        url: `${baseUrl}${data.url}`,
        isPartOf: {
          '@type': 'WebSite',
          name: SEO_CONFIG.siteName,
          url: baseUrl
        }
      };
  }
};
