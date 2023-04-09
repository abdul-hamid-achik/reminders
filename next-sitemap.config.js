/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://reminders.dev',
  generateRobotsTxt: true, // (optional)
  // ...other options
}