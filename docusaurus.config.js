// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');
require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lex Angola',
  tagline: 'O Lex Angola é uma plataforma digital que visa facilitar o acesso às leis de Angola. Ao disponibilizar informações jurídicas em um formato fácil de ler e pesquisar, a plataforma se torna uma ferramenta valiosa para estudantes, advogados, empresários e qualquer pessoa que queira conhecer seus direitos e obrigações.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://lex.ao',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'pixelinfinito', // Usually your GitHub org/user name.
  projectName: 'lex-ao', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt',
    locales: ['en','pt'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: process.env.GTAG,
          anonymizeIP: true,
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Lex.AO',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/pixelinfinito/lex-ao',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      mermaid: {
        theme: {light: 'base', dark: 'neutral'},
        options: {
          themeVariables: {
            primaryColor: '#c9184a', // Main shade of red
            primaryTextColor: '#FFFFFF', // White text color for contrast with primary color
            textColor: '#333333', // Dark gray for general text
            fontSize: '16px', // Font size
            primaryBorderColor: '#98142d', // Slightly darker shade of red for borders
            lineColor: '#e85a70', // Lighter shade of red for lines
            secondaryColor: '#5c2a3c', // Dark red as secondary color
            tertiaryColor: '#E8E8E8' // Light gray as tertiary color
          },          
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `${new Date().getFullYear()} © Criado em 🇦🇴 por <a href="https://pixel.ao">Pixel Infinito</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
