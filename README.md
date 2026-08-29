# Royal Maskan cost calculators

SEO-first Vue/Nuxt microsite for three promotional construction tools:

- `/tools/uae-villa-construction-cost-calculator/`
- `/tools/villa-renovation-cost-calculator/`
- `/tools/abu-dhabi-fit-out-cost-calculator/`

## Local development

1. Copy `.env.example` to `.env` and replace the WhatsApp placeholder.
2. Run `npm install`.
3. Run `npm run dev`.

## Production build

Run `npm run generate`. Upload `.output/public/tools/` to `public_html/tools/` and `.output/public/ar/` to `public_html/ar/`. Keep WordPress in `public_html/`; only these two directories are managed by this project.

Before launch, confirm the calculator rates and exclusions with a Royal Maskan estimator. The current rates are placeholders for product development, not published quotations.

See `docs/DEPLOYMENT.md` and `docs/SEO-CHECKLIST.md`.
