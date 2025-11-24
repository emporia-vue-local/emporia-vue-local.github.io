# Emporia Vue Local - Documentation Site

This repository contains the source code for the Emporia Vue Local documentation website, built with [Docusaurus 3](https://docusaurus.io/).

## Development

### Prerequisites
* Node.js (version 18 or higher)
* pnpm (preferred) or npm/yarn

### Installation
```bash
pnpm install
```

### Local Development
Starts the development server with live reload.
```bash
pnpm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build
Builds the static site for production.
```bash
pnpm build
```
The static files will be generated in the `build` directory.

## Project Structure
* `/docs` - Documentation markdown files (User Guide).
* `/src` - React components and pages (e.g., the homepage).
* `/static` - Static assets like images.
* `docusaurus.config.ts` - Main configuration file.

## Contributing
1.  Fork the repository.
2.  Create a feature branch.
3.  Submit a Pull Request.
