# BSV-26

Static website for Swiss fire safety regulations with multilingual content and full-text search.

## Overview

**BSV-26** is a static website that publishes Swiss fire safety regulations with a modern, fast, and searchable interface.

The project is designed to:

- provide clear navigation of legislative texts
- support multiple languages (French, German, Italian)
- offer instant full-text search
- remain fast and accessible through static generation

The site is built using a modern static architecture and deployed on Cloudflare's global edge network.

## Features

- 📚 Structured navigation of regulations, chapters, sections, and articles
- 🌍 Multilingual content (FR / DE / IT)
- 🔎 Full-text search powered by Pagefind
- ⚡ Static site generation for high performance
- 📱 Responsive interface
- ☁️ Global deployment on Cloudflare Pages

## Tech Stack

- Astro — static site generator
- Sanity CMS — structured content management
- Alpine.js — lightweight frontend interactivity
- Tailwind CSS — utility-first styling
- Pagefind — static search indexing
- Cloudflare — global hosting and edge delivery

## Development

### Requirements

- Node.js or Bun
- Bun (recommended)

### Install dependencies

```bash
bun install
```

### Start the development server

```bash
bun run dev
```

The site will be available at:

```
http://localhost:4321
```

## Build

Generate the static site:

```bash
bun run build
```

The output will be generated in the `dist/` directory.

## Deployment

The project is deployed using **Cloudflare Pages**.

Typical workflow:

1. Push changes to the repository
2. Cloudflare Pages automatically builds the site
3. The generated static files are deployed globally

Build settings typically include:

```
Build command: bun run build
Output directory: dist
```

## Content

All legislative content is managed through **Sanity CMS**.

The content model and CMS repository can be found here: https://github.com/mornir/bsv-26-studio

## Search

Search is implemented using **Pagefind**, which generates a static search index during the build process.

This allows:

- fast client-side search
- no external search service
- full compatibility with static hosting

## Legal Notice

The content published on this website consists of **official fire safety regulations** issued by the  
**Vereinigung Kantonaler Feuerversicherungen (VKF / AEAI)**.

This repository provides a **technical implementation and web interface** for accessing these regulations.

The official texts remain the property of their respective publishers.

## License and trademarks

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

VKF and the VKF logo are trademarks of
Vereinigung Kantonaler Feuerversicherungen (VKF).

The MIT License applies only to the source code in this repository.
No rights are granted to use the VKF name or logo.

## Status

This repository is currently under active development and may change significantly before its public release.
