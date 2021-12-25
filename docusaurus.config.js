// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'DorisCrafts',
    tagline: 'Krafts for Kids!',
    url: 'https://yakovliam.github.io',
    baseUrl: '/doriscrafts/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'yakovliam', // Usually your GitHub org/user name.
    projectName: 'doriscrafts', // Usually your repo name.

    plugins: ['docusaurus-plugin-sass'],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Doris\' Crafts',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'siteindex',
                        position: 'left',
                        label: 'Crafts',
                    },
                    // {to: '/blog', label: 'Blog', position: 'left'},
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Printables',
                        items: [
                            {
                                label: 'Crafts',
                                to: '/docs/siteindex',
                            },
                        ],
                    },
                    {
                        title: 'Info',
                        items: [
                            {
                                label: 'More Info',
                                to: '/docs/help',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Contact Doris',
                                href: 'mailto:ohiodoris@yahoo.com',
                            },
                            {
                                label: 'Host',
                                href: 'https://github.com/yakovliam/',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Doris Cohen`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
