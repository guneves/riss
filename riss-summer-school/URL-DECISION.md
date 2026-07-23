# URL recommendation for RiSS

## Recommended address

**https://riss.rise.com.br/**

Why this is the best default:

- It connects the school directly to the existing RiSE Labs institutional identity.
- It is short, memorable, and easy to pronounce internationally.
- It can remain stable across editions; the year belongs in the page title and content, not necessarily in the domain.
- It avoids the cost and governance overhead of a separate domain.

## Suggested alternatives

1. `https://riss2027.rise.com.br/` — useful if each edition must have an isolated website.
2. `https://rise.com.br/riss/` — simplest when subdomain configuration is unavailable.
3. `https://riss-summerschool.org/` — independent domain, but requires registration, renewal, and separate governance.

## Technical DNS setup for the recommended address

Create a DNS record for `riss`:

- For GitHub Pages, use a `CNAME` pointing to the project's GitHub Pages hostname.
- For Netlify or Vercel, follow the platform's custom-domain instructions and point the `riss` subdomain to the value they provide.
- Add a `CNAME` file containing `riss.rise.com.br` when deploying through GitHub Pages.

Before announcing the address, the owner of `rise.com.br` must approve and configure the subdomain.
