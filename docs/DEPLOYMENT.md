# Namecheap deployment alongside WordPress

## Recommended URL setup

Use a subdirectory on the main domain:

`https://royalmaskan.com/tools/`

This keeps the tools on the same domain as WordPress and lets them benefit from the site's existing authority. WordPress remains untouched in `public_html/`; the generated Nuxt files live in `public_html/tools/`.

## First deployment

1. Back up the WordPress files and database from cPanel.
2. Replace the placeholder WhatsApp URL in `.env` and have the estimator approve all rates, factors and exclusions.
3. Run `npm install`, then `npm run generate` on a development computer or CI runner.
4. In Namecheap cPanel File Manager, create `public_html/tools/`.
5. Upload **the contents** of `.output/public/tools/` into `public_html/tools/` and `.output/public/ar/` into `public_html/ar/`. Ensure `.htaccess` is included in `/tools/`; enable “Show Hidden Files” in File Manager.
6. Test every calculator URL, mobile layout, canonical tag, redirects, form/WhatsApp links and the generated sitemap before adding links from WordPress.
7. Add a visible “Cost Calculators” link in the WordPress header/footer and contextual links from relevant service and blog pages.

## Sitemap and indexing

The calculator project includes `/tools/sitemap.xml`. Because WordPress owns the domain root, either:

- add the calculator sitemap URL to the WordPress sitemap index using the SEO plugin; or
- submit both the WordPress sitemap and the calculator sitemap separately in Google Search Console.

Request indexing for the hub and three calculator pages after launch. Do not block `/tools/` in the root `robots.txt`.

## Repeat deployments

Generate locally, upload the new `.output/public/` contents over `public_html/tools/`, and remove obsolete fingerprinted assets only after confirming the new version works. Keep a downloadable backup of the previous `/tools/` folder for rollback.

## Alternative when `public_html` is unavailable

If the WordPress plan is Namecheap EasyWP and does not provide normal cPanel file access, deploy to `tools.royalmaskan.com` on suitable hosting and add the subdomain DNS record. A subdirectory is preferred for SEO, but a subdomain is a safe fallback.
