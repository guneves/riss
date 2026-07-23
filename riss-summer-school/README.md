# RiSS Summer School website

Static, responsive website inspired by the information architecture of the QSE PhD School website, without the Contest section.

## Recommended URL

`https://riss.rise.com.br/`

See `URL-DECISION.md` for alternatives and deployment notes.

## Pages

- `index.html` — home
- `program.html` — schedule
- `lecturers.html` — lecturer grid
- `venue.html` — venue, travel, and practical information
- `contact.html` — updates and contact
- `register.html` — expression of interest
- `404.html` — custom error page

## Image template structure

All image positions are organized under `templates/`:

- `templates/people/` — every human portrait or lecturer photo
- `templates/hero/` — main event image
- `templates/venue/` — venue and location images
- `templates/activities/` — networking, cultural, and social activities
- `templates/branding/` — RiSS logo
- `templates/icons/` — program icons
- `templates/sponsors/` — partner and sponsor logos

To replace an image without editing HTML, keep the same filename and aspect ratio. SVG placeholders can be replaced by JPG, PNG, WebP, or SVG, but update the file extension in HTML when necessary.

## Content that must be confirmed

- Official event title and edition year
- Event dates
- City, venue, and address
- Scientific theme/subtitle
- Lecturer names, roles, biographies, and links
- Final program and session times
- Registration phases, deadline, capacity, selection rules, fee, and inclusions
- Contact email
- Organizer and sponsor logos
- Privacy notice and consent wording

## Preview locally

Run one of these commands inside the project folder:

```bash
python -m http.server 8080
```

or

```bash
npx serve .
```

Then open `http://localhost:8080`.

## Forms

The forms are visual demos and do not transmit data. Before publication, connect them to a secure endpoint such as an institutional backend, Formspree, Google Forms, Mailchimp, or Brevo.

## Deployment

The project has no build step and can be deployed directly to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or an institutional web server.
