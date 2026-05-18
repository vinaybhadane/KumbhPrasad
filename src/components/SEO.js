import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://kumbhprasad.app';
const SITE_NAME = 'KumbhPrasad';
const DEFAULT_DESCRIPTION = 'Order authentic Nashik Kumbh Prasad, Godavari Jal, and sacred seva kits for Kumbh Mela 2026 with secure pre-order booking and doorstep delivery.';
const DEFAULT_KEYWORDS = 'KumbhPrasad, Kumbh Prasad, Nashik Kumbh Prasad, Kumbh Mela 2026, Godavari Jal, Ram Kund Nashik, Prasad delivery, Hindu prasad online';
const LOGO_URL = `${SITE_URL}/klogo-512.png`;

const routeMeta = {
  '/': {
    title: 'KumbhPrasad | Nashik Kumbh Prasad Delivery 2026',
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
  },
  '/store': {
    title: 'Prasad Store | KumbhPrasad Nashik 2026',
    description: 'Pre-order KumbhPrasad, sacred Godavari Jal, and divine Kumbh seva kits from Nashik for Kumbh Mela 2026.',
    keywords: 'KumbhPrasad store, buy Kumbh Prasad online, Godavari Jal online, Kumbh divine kit, Nashik prasad booking',
  },
  '/about': {
    title: 'About KumbhPrasad | From Nashik Ghats to Your Home',
    description: 'Learn about KumbhPrasad, a Nashik-based seva initiative delivering sanctified Kumbh offerings from Ram Kund and Panchavati to devotees.',
    keywords: 'about KumbhPrasad, Nashik seva, Ram Kund prasad, Panchavati Nashik, Maha Kumbh delivery',
  },
  '/contact': {
    title: 'Contact KumbhPrasad | Nashik Prasad Seva Support',
    description: 'Contact the KumbhPrasad Nashik team for pre-order support, delivery help, and Kumbh Mela 2026 prasad seva questions.',
    keywords: 'contact KumbhPrasad, KumbhPrasad support, Nashik prasad contact, Kumbh order help',
  },
  '/login': {
    title: 'Login | KumbhPrasad',
    description: 'Sign in securely to manage your KumbhPrasad pre-orders and track your sacred Nashik Kumbh delivery.',
    keywords: 'KumbhPrasad login, track prasad order, Kumbh order login',
    robots: 'noindex,follow',
  },
  '/profile': {
    title: 'My Orders | KumbhPrasad',
    description: 'View and track your KumbhPrasad pre-orders.',
    robots: 'noindex,nofollow',
  },
  '/checkout': {
    title: 'Checkout | KumbhPrasad',
    description: 'Complete your secure KumbhPrasad pre-order checkout.',
    robots: 'noindex,nofollow',
  },
  '/success': {
    title: 'Booking Confirmed | KumbhPrasad',
    description: 'Your KumbhPrasad booking has been confirmed.',
    robots: 'noindex,nofollow',
  },
  '/failed': {
    title: 'Payment Failed | KumbhPrasad',
    description: 'Your KumbhPrasad payment could not be completed.',
    robots: 'noindex,nofollow',
  },
  '/admin': {
    title: 'Admin | KumbhPrasad',
    description: 'KumbhPrasad admin dashboard.',
    robots: 'noindex,nofollow',
  },
};

const baseStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    email: 'seva@kumbhprasad.app',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Ram Kund, Panchavati',
      addressLocality: 'Nashik',
      addressRegion: 'Maharashtra',
      postalCode: '422003',
      addressCountry: 'IN',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/store?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
];

const storeStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'KumbhPrasad Store',
  itemListElement: [
    {
      '@type': 'Product',
      position: 1,
      name: 'KumbhPrasad',
      image: `${SITE_URL}/klogo-512.png`,
      description: 'Maha-Kumbh special sanctified offering from Nashik.',
      offers: { '@type': 'Offer', priceCurrency: 'INR', price: '51', availability: 'https://schema.org/PreOrder' },
    },
    {
      '@type': 'Product',
      position: 2,
      name: 'Godavari Jal',
      description: 'Sacred Godavari Jal from Ram Kund, Nashik.',
      offers: { '@type': 'Offer', priceCurrency: 'INR', price: '101', availability: 'https://schema.org/PreOrder' },
    },
    {
      '@type': 'Product',
      position: 3,
      name: 'Kumbh Divine Kit',
      description: 'Complete spiritual Kumbh seva collection.',
      offers: { '@type': 'Offer', priceCurrency: 'INR', price: '501', availability: 'https://schema.org/PreOrder' },
    },
  ],
};

const SEO = () => {
  const { pathname } = useLocation();
  const meta = routeMeta[pathname] || routeMeta['/'];
  const canonicalPath = routeMeta[pathname] ? pathname : '/';
  const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;
  const structuredData = pathname === '/store' ? [...baseStructuredData, storeStructuredData] : baseStructuredData;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords || DEFAULT_KEYWORDS} />
      <meta name="robots" content={meta.robots || 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={LOGO_URL} />
      <meta property="og:image:alt" content="KumbhPrasad logo" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={LOGO_URL} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
