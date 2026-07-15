# Waypoint Workflows Website

Launch-ready static website with a Cloudflare Pages Function for Digital Front Desk intake.

## Final sitemap

- `/` — Home
- `/solutions/` — Solution overview
- `/business-presence/`
- `/waypoint-voice/`
- `/digital-front-desk/`
- `/about/`
- `/william-wall/`
- `/contact/`
- `/privacy/`
- `/terms/`
- `/thank-you/` — noindex confirmation state
- `/404.html` — custom not-found state

## Required production configuration

Set the Cloudflare Pages environment variable `DFD_WEBHOOK_URL` to the Make webhook (or other endpoint) that receives Digital Front Desk intake. The function posts normalized JSON including `lead_status`, `priority`, `service_type`, `request_summary`, `quote_status`, `quote_readiness`, `next_action`, and `owner_notification`.

## Deploy through Git (recommended)

1. Create a Git repository and commit this folder.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository.
4. Framework preset: **None**.
5. Build command: leave blank.
6. Build output directory: `/` (repository root).
7. Deploy.
8. In the Pages project, open **Settings → Variables and Secrets** and add encrypted variable `DFD_WEBHOOK_URL`.
9. Redeploy after adding the variable.
10. Under **Custom domains**, add `waypointworkflows.com` and `www.waypointworkflows.com`; make the preferred host canonical through Cloudflare redirect rules if needed.

## Deploy directly with Wrangler

```bash
npm install
npx wrangler login
npm run deploy
```

Then add `DFD_WEBHOOK_URL` in the Cloudflare dashboard and redeploy.

## Local testing

```bash
npm install
npx wrangler pages dev . --binding DFD_WEBHOOK_URL=https://example.invalid/webhook
```

Static preview without the form function:

```bash
python -m http.server 8080
```

## Genuine remaining launch inputs

1. A real Digital Front Desk / Make webhook URL.
2. Final business phone number, when approved, to add to the header, footer, contact page, and structured data.
3. Legal confirmation of the Privacy Policy and Terms of Use.
4. Optional founder photograph and real project/customer imagery. The site is intentionally launchable without them.
5. Cloudflare account access, Git repository access, and DNS authority for deployment.
