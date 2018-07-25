/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const users = [
  {
    caption: 'Cryptostrikers',
    image: '/img/shield-logo.svg',
    infoLink: 'https://www.cryptostrikers.com/',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Status Technikon',
  tagline: 'Build the future of a new web',
  url: 'https://status.im',
  baseUrl: '/',
  projectName: 'docs.status.im',
  organizationName: 'status-im',
  users,
  editUrl: 'https://github.com/status-im/docs.status.im/edit/develop/docs/',
  headerLinks: [
    { search: true },
    {href: 'https://blog.status.im', label: 'Blog'},
    {href: 'https://chat.status.im/#/register', label: 'Riot'},
    {doc: 'testing', label: 'Test Status'},
    {href: 'https://github.com/status-im/', label: 'GitHub'}
  ],
  algolia: {
    apiKey: '8e12bdadff441d3df9f9c77d7d4a3650',
    indexName: 'status_technikon',
    algoliaOptions: {} 
  },
  headerIcon: 'img/logo_white.png',
  footerIcon: 'img/logo_white.png',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#4A5AB5',
    secondaryColor: '#6CC1F6',
  },
  fonts: {
    myFont: [
      "PostGrotesk-Book",
      "Segoe UI",
      "Helvetica",
      "Arial",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui"
    ]
  },
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Status.im',
  highlight: {
    theme: 'atom-one-dark',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  onPageNav: 'separate',
  ogImage: 'img/og_logo.png',
  twitterImage: 'img/og_logo.png',
  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },
  repoUrl: 'https://github.com/status-im/status-react',
};

module.exports = siteConfig;
