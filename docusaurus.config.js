// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Freact",
  tagline: "A Front End + React documentation",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Facundo Martin", // Usually your GitHub org/user name.
  projectName: "freact-docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Facundo-Martin/Freact-Docs/tree/main",
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Freact",
        logo: {
          alt: "Freact Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/Facundo-Martin/Freact-Docs",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://facundomartin.io/",
            label: "Facundo",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/",
              },
              {
                label: "Production React",
                to: "/",
              },
              {
                label: "Tech Stack",
                to: "/",
              },
              {
                label: "Tutorial",
                to: "/",
              },
              {
                label: "Tutorial",
                to: "/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Theo Browne",
                href: "https://www.youtube.com/@t3dotgg",
              },
              {
                label: "ThePrimeagen",
                href: "https://www.youtube.com/@ThePrimeagen",
              },
              {
                label: "Lee Robinson",
                href: "https://www.youtube.com/@leerob",
              },
              {
                label: "Jack Herrington",
                href: "https://www.youtube.com/@jherr",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Facundo Martin",
                href: "https://facundomartin.io/",
              },

              {
                label: "GitHub",
                href: "https://github.com/Facundo-Martin",
              },
            ],
          },
        ],
        copyright: `Copyright ?? ${new Date().getFullYear()} Facundo Martin`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
