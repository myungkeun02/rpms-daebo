/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://sv2003.com',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/admin/*'],
  transform: async (config, path) => {
    // Default priority values
    let priority = 0.7;
    let changefreq = 'weekly';

    // Higher priority for home pages
    if (path === '/ko' || path === '/en' || path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Product and features pages
    else if (path.includes('/product') || path.includes('/features')) {
      priority = 0.9;
    }
    // Specs and use-cases
    else if (path.includes('/specs') || path.includes('/use-cases')) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/admin/*'],
      },
    ],
  },
};
