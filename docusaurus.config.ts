import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Local Control for Emporia Vue",
  tagline:
    "Unofficial ESPHome-based local control for your Emporia Vue energy monitor",
  favicon: "img/logo.svg",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_faster: true, // turns Docusaurus Faster on globally
  },

  // Set the production url of your site here
  url: "https://emporia-vue-local.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "emporia-vue-local", // Usually your GitHub org/user name.
  projectName: "emporia-vue-local.github.io", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  headTags: [
    {
      tagName: "meta",
      attributes: {
        name: "algolia-site-verification",
        content: "2C50783F6E46FA47",
      },
    },
  ],

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/emporia-vue-local/emporia-vue-local.github.io/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      appId: "IR0ZBFA6BD",
      apiKey: "b6c4e6f0386bedad74f773dea8457d5d",
      indexName: "Local Control for Emporia Vue",
      contextualSearch: true,
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Local Control for Emporia Vue",
      logo: {
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/emporia-vue-local/esphome",
          label: "Github",
          position: "right",
        },
        {
          href: "https://github.com/emporia-vue-local/esphome/discussions",
          label: "Discussion",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    // Add this function to inject the loader rule
    () => ({
      name: "resolve-raw-text",
      configureWebpack(config, isServer) {
        return {
          module: {
            rules: [
              {
                // Match the file extensions you want to load as raw strings
                test: /\.(yaml)$/i,
                // In Rspack/Webpack 5, use 'asset/source' to get the file content as a string
                type: "asset/source",
              },
            ],
          },
        };
      },
    }),
  ],
};

export default config;
