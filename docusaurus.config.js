module.exports = {
  title: "橙立科技",
  tagline: "工作文档",
  url: "https://gitlab.com/signp/documents",
  baseUrl: "/pages/documents/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "signp",
  projectName: "documents",
  themeConfig: {
    navbar: {
      title: "橙立科技",
      logo: {
        alt: "橙立科技",
        src: "img/logo.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
        },
        {
          href: "https://gitlab.com/signp/documents",
          label: "GitLab",
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
              label: "Style Guide",
              to: "docs/",
            },
            {
              label: "Second Doc",
              to: "docs/doc2/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitLab",
              href: "https://gitlab.com/signp/documents",
            },
          ],
        },
      ],
      copyright: `Copyright © 2013-${new Date().getFullYear()} 橙视光标`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://gitlab.com/signp/documents",
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
