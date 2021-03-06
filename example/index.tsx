import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Hit } from 'react-instantsearch-core';
import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  Configure,
  Highlight,
} from 'react-instantsearch-dom';

import { LoadMoreWithProgressBar } from '../src';
import type { TextTranslationArgs, ButtonComponentProps } from '../src';

import '../src/style.scss';
import './index.scss';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const HitComponent = (props: { hit: Hit }) => {
  return (
    <div>
      <img src={props.hit.image} alt={props.hit.name} width="80" />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
};

const ButtonComponent = ({
  translations,
  isSearchStalled,
  refineNext,
}: ButtonComponentProps) => {
  return (
    <button
      type="button"
      className="ais-InfiniteHits-loadMore ais-LoadMoreWithProgressBar-loadMore"
      disabled={isSearchStalled}
      onClick={refineNext}
    >
      {isSearchStalled ? translations.searchStalled : translations.loadMore}
    </button>
  );
};

const App = () => (
  <InstantSearch indexName="instant_search" searchClient={searchClient}>
    <Configure hitsPerPage={2} />
    <main>
      <SearchBox />
      <InfiniteHits hitComponent={HitComponent} />
      <LoadMoreWithProgressBar
        translations={{
          loadMore: 'Load more',
          searchStalled: 'Loading...',
          text: ({ nbSeenHits, nbTotalHits }: TextTranslationArgs) =>
            `You've seen ${nbSeenHits} item${
              nbSeenHits > 1 ? 's' : ''
            } out of ${nbTotalHits}`,
        }}
        buttonComponent={ButtonComponent}
      />
    </main>
  </InstantSearch>
);

createRoot(document.getElementById('root')!).render(<App />);
