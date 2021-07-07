<p align="left">
  <a href="https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/">
    <img alt="React InstantSearch" src="https://i.ibb.co/44km5r2/react-widget.png">
  </a>
</p>

[React InstantSearch widget](https://www.algolia.com/?utm_source=react-instantsearch&utm_campaign=repository) that displays a **load more button with a progress bar**.  
It works in conjuction with [InfinitHits widget](https://www.algolia.com/doc/api-reference/widgets/infinite-hits/react/) for diplaying the hits.

![Example](https://i.ibb.co/qnCwCFq/example.gif)

---

[![MIT](https://img.shields.io/npm/l/@algolia/react-instantsearch-widget-loadmore-with-progressbar)](./LICENSE) [![NPM version](https://img.shields.io/npm/v/@algolia/react-instantsearch-widget-loadmore-with-progressbar.svg)](https://npmjs.org/package/@algolia/react-instantsearch-widget-loadmore-with-progressbar)

## Summary

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Styling](#styling)
- [Requirements](#requirements)
- [Options](#options)
- [Example](#example)
- [Browser Support](#browser-support)
- [Troubleshooting](#Troubleshooting)
- [Contributing & Licence](#contributing--licence)

# Get started

## Demo

[Demo](https://codesandbox.io/s/github/algolia/react-instantsearch-widget-loadmore-with-progressbar?file=/example/index.tsx) on CodeSandbox.

## Installation

```bash
npm install @algolia/react-instantsearch-widget-loadmore-with-progressbar
# or
yarn add @algolia/react-instantsearch-widget-loadmore-with-progressbar
```

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, SearchBox, Hits, Panel } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { LoadMoreWithProgressBar } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar';
import type { TextTranslationArgs } from '@algolia/react-instantsearch-widget-loadmore-with-progressbar';

// Import default styles
import '@algolia/react-instantsearch-widget-loadmore-with-progressbar/dist/style.css';

const searchClient = algoliasearch('appId', 'apiKey');

ReactDOM.render(
  <InstantSearch indexName="indexName" searchClient={searchClient}>
    <SearchBox />
    <InfiniteHits />
    <LoadMoreWithProgressBar
      translations={{
        text: ({ nbSeenHits, nbTotalHits }: TextTranslationArgs) =>
          `You've seen ${nbSeenHits} product${
            nbSeenHits > 1 ? 's' : ''
          } out of ${nbTotalHits}`,
        loadMore: 'Load more',
      }}
    />
  </InstantSearch>,
  document.getElementById('root')
);
```

## Styling

The widget ships with default styles that you can import either from the NPM package or directly from a CDN like JSDelivr.

```js
import '@algolia/react-instantsearch-widget-loadmore-with-progressbar/dist/style.css';
```

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@algolia/react-instantsearch-widget-loadmore-with-progressbar/dist/style.css"
/>
```

**Note:** This widget has its own load more button. If you use the [InfinitHits widget](https://www.algolia.com/doc/api-reference/widgets/infinite-hits/react/), a second load more button will show. You can hide it using this CSS rule:

```css
/* Hide InfinitHits widget load more button but not LoadMoreWithProgressBar widget load more button */
.ais-InfiniteHits-loadMore:not(.ais-LoadMoreWithProgressBar-loadMore) {
  display: none;
}
```

## Requirements

You will have to use the [InfinitHits widget](https://www.algolia.com/doc/api-reference/widgets/infinite-hits/react/) to display the hits.  
This widget only displays a load more button and a progress bar.

### Options

| Option | Type | Required | Default | Description |
| :-- | :-- | :-- | :-- | --- |
| [`translations`](#translations) | `object` | false | - | A mapping of keys to translation values. |

#### translations

> `object`

A mapping of keys to translation values.

- `text`: the text describing the current search progress. Accepts two number parameters:
  - `nbSeenHits` represents the number of hits already seen.
  - `nbTotalHits` represents the number of total hits in the current search state.
- `loadMore`: the label of the “Show more” button.

```tsx
<LoadMoreWithProgressBar
  translations={{
    text: ({ nbSeenHits, nbTotalHits }: TextTranslationArgs) =>
      `You've seen ${nbSeenHits} product${
        nbSeenHits > 1 ? 's' : ''
      } out of ${nbTotalHits}`,
    loadMore: 'Load more',
  }}
/>
```

## Example

Clone this repository and go to the repo folder:

```bash
git clone git@github.com:algolia/react-instantsearch-widget-loadmore-with-progressbar.git && \
cd react-instantsearch-widget-loadmore-with-progressbar
```

Install the dependencies and start the example:

```bash
npm install && npm start
# or
yarn install && yarn start
```

Then open http://localhost:3000/ to see the example in action.

## Browser support

Same as React InstantSearch it supports the **last two versions of major browsers** (Chrome, Edge, Firefox, Safari).

Please refer to the [browser support](https://www.algolia.com/doc/guides/building-search-ui/installation/react/#browser-support) section in the documentation to use React InstantSearch and this widget on other browsers.

## Troubleshooting

Encountering an issue? Before reaching out to support, we recommend heading to our [FAQ](https://www.algolia.com/doc/guides/building-search-ui/troubleshooting/faq/react/) where you will find answers for the most common issues and gotchas with the library.

## Contributing & Licence

### How to contribute

We welcome all contributors, from casual to regular 💙

- **Bug report**. Is something not working as expected? [Send a bug report](https://github.com/algolia/react-instantsearch-widget-loadmore-with-progressbar/issues/new?template=Bug_report.md).
- **Feature request**. Would you like to add something to the library? [Send a feature request](https://github.com/algolia/react-instantsearch-widget-loadmore-with-progressbar/issues/new?template=Feature_request.md).
- **Documentation**. Did you find a typo in the doc? [Open an issue](https://github.com/algolia/react-instantsearch-widget-loadmore-with-progressbar/issues/new) and we'll take care of it.
- **Development**. If you don't know where to start, you can check the open issues that are [tagged easy](https://github.com/algolia/react-instantsearch-widget-loadmore-with-progressbar/issues?q=is%3Aopen+is%3Aissue+label%3A%22Difficulty%3A++++++%E2%9D%84%EF%B8%8F+easy%22), the [bugs](https://github.com/algolia/react-instantsearch-widget-loadmore-with-progressbar/issues?q=is%3Aissue+is%3Aopen+label%3A%22%E2%9D%A4+Bug%22) or [chores](https://github.com/algolia/react-instantsearch-widget-loadmore-with-progressbar/issues?q=is%3Aissue+is%3Aopen+label%3A%22%E2%9C%A8+Chore%22).

To start contributing to code, you need to:

1.  [Fork the project](https://help.github.com/articles/fork-a-repo/)
1.  [Clone the repository](https://help.github.com/articles/cloning-a-repository/)
1.  Install the dependencies: `yarn`
1.  Run the development mode: `yarn start`
1.  [Open the project](http://localhost:3000)

Please read [our contribution process](CONTRIBUTING.md) to learn more.

### Licence

Licensed under the [MIT license](LICENSE).

---

**About React InstantSearch**

React InstantSearch is a React library that lets you create an instant-search result experience using [Algolia][algolia-website]’s search API. It is part of the InstantSearch family:

**React InstantSearch** | [InstantSearch.js][instantsearch.js-github] | [Angular InstantSearch][instantsearch-angular-github] | [Vue InstantSearch][instantsearch-vue-github] | [InstantSearch Android][instantsearch-android-github] | [InstantSearch iOS][instantsearch-ios-github]

This project was generated with [create-instantsearch-app](https://github.com/algolia/create-instantsearch-app) by [Algolia](https://algolia.com).

<!-- Links -->

[algolia-website]: https://www.algolia.com/?utm_source=react-instantsearch&utm_campaign=repository
[instantsearch.js-github]: https://github.com/algolia/instantsearch.js
[instantsearch-angular-github]: https://github.com/algolia/angular-instantsearch
[instantsearch-vue-github]: https://github.com/algolia/vue-instantsearch
[instantsearch-android-github]: https://github.com/algolia/instantsearch-android
[instantsearch-ios-github]: https://github.com/algolia/instantsearch-ios
