# HTML Raw Template

A lightweight bundler for HTML template projects that packages your raw HTML, CSS, and JavaScript files into a clean distribution folder, perfect for delivering source code templates to clients.

## Pre-requirements

- NodeJS v18

## Quick Start

```bash
# install packages
npm install

# start development
npm run dev

# build source code
npm run build

# start local server
npm run start
```

## Project Structure

```
project/
├── dist/
├── node_modules/
├── scripts/
├── src/
│   ├── assets/
│   │   ├── js/
│   │   ├── modules/
│   │   └── scss/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── partials/
│   └── web/
├── .gitignore
├── config.js
└── package-lock.json
└── package.json
└── README.md
```

### Root Files

- `config.js`: Central configuration file for build settings, paths, and project options
- `.gitignore`: Specifies which files Git should ignore

### Main Directories

#### `dist/`

- The distribution directory containing the final built files
- Generated automatically during build process
- Contains optimized and processed files ready for deployment
- Should not be edited directly as contents are overwritten during builds

#### `node_modules/`

- Contains all npm package dependencies
- Managed by npm, should not be edited manually
- Not committed to version control

#### `scripts/`

- Contains build automation scripts
- Custom Node.js scripts for development and production builds
- Task runners and build process utilities

#### `src/`

Source files directory containing all project source code

##### `src/assets/`

- `js/`: JavaScript files
  - Application-specific JavaScript code
  - Entry points for JavaScript bundles
- `modules/`: External JavasScript/CSS Libraries
  - Standalone JavaScript/CSS functionality
  - Use folders to organize libraries and name them systematically
- `scss/`: SCSS stylesheets
  - Global styles
  - Component-specific styles
  - Variables and mixins

##### `src/components/`

- Reusable HTML components
- Each component should be self-contained
- Example components:
  - Navigation bars
  - Buttons
  - Cards
  - Forms

##### `src/data/`

- JSON data files
- Content that can be injected into templates
- Configuration files for different environments
- The filename becomes the data object key - for example, `menu.json` becomes `data.menu`
- Example files:
  - `menu.json`
  - `settings.yaml`
  - `content.json`

##### `src/layouts/`

- Base HTML layouts
- Template files that define the basic structure
- Example layouts:
  - `default.ejs`
  - `blog.ejs`
  - `auth.ejs`

##### `src/pages/`

- Individual page templates
- Each file represents a unique page
- Extends layouts with page-specific content
- Support nested folder structure in URLs
- Example pages:
  - `index.ejs`
  - `about.ejs`
  - `contact.ejs`

##### `src/partials/`

- Reusable HTML snippets
- Smaller sections of code used across multiple pages
- Common elements like headers and footers
- Example partials:
  - `header.ejs`
  - `footer.ejs`
  - `navigation.ejs`

##### `src/web/`

- Public web static assets
- Files that should be copied directly to output
- Browser and SEO-related files
- Common files:
  - `favicon.ico`
  - `robots.txt`
  - `sitemap.xml`
  - `manifest.json`

## Configuration

```js
// Project root: config.js

export default {
  site: {
    // Default Meta Title
    title: "Title | Template",

    // Default Meta Description
    description: "Description | Template",

    // Default Site Base Path, ex: href="{basePath}/web/css/app.min.css"
    basePath: ".",
  },

  // Bundle Configuration
  bundle: {
    js: {
      // Concat order for /src/assets/modules folder
      order: ["jquery-*/**/*.js", "hammer-*/**/*.js", "bootstrap-*/**/*.js"],
    },
  },
};
```
