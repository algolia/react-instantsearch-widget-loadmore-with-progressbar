import { createConnector } from 'react-instantsearch-core';
import type {
  SearchState,
  ConnectorSearchResults,
} from 'react-instantsearch-core';
import type {
  IndexContext,
  InstantSearchContext,
} from 'react-instantsearch-core/dist/es/core/context';
import {
  getResults,
  refineValue,
} from 'react-instantsearch-core/dist/es/core/indexUtils';

import type { LoadMoreWithProgressBarExposedProps } from './widget';

export type LoadMoreWithProgressBarProvidedProps = {
  nbSeenHits: number;
  nbTotalHits: number;
  refineNext: () => void;
  isSearchStalled: boolean;
};

interface ConnectorProps {
  contextValue?: InstantSearchContext;
  indexContextValue?: IndexContext;
}

function getId() {
  return 'page';
}

export const connectLoadMoreWithProgressBar = createConnector<
  LoadMoreWithProgressBarProvidedProps,
  LoadMoreWithProgressBarExposedProps
>({
  displayName: 'AlgoliaLoadMoreWithProgressBar',

  getProvidedProps(
    props: ConnectorProps & LoadMoreWithProgressBarExposedProps,
    searchState: SearchState,
    searchResults: ConnectorSearchResults
  ) {
    const results = getResults(searchResults, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue,
    });

    if (!results) {
      return {
        nbSeenHits: 0,
        nbTotalHits: 0,
        refineNext: () => {},
        isSearchStalled: searchResults.isSearchStalled,
      };
    }

    const { page, nbPages, nbHits: nbTotalHits, hitsPerPage } = results;

    // Compute seen hits number
    const isLastPage = page + 1 === nbPages;
    let nbSeenHits = (page + 1) * hitsPerPage;
    nbSeenHits += isLastPage ? nbTotalHits - nbSeenHits : 0;

    return {
      nbSeenHits,
      nbTotalHits,
      refineNext: () => this.refine(page + 1),
      isSearchStalled: searchResults.isSearchStalled,
    };
  },

  refine(
    props: ConnectorProps & LoadMoreWithProgressBarExposedProps,
    searchState: SearchState,
    index
  ) {
    const id = getId();
    const nextValue = { [id]: index + 1 };
    const resetPage = false;

    return refineValue(
      searchState,
      nextValue,
      { ais: props.contextValue, multiIndexContext: props.indexContextValue },
      resetPage,
      null
    );
  },

  cleanUp(props, searchState: SearchState) {
    return searchState;
  },

  getSearchParameters(searchParameters) {
    return searchParameters;
  },
});
