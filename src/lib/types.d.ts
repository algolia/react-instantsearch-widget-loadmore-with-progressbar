declare module 'react-instantsearch-core/dist/es/core/indexUtils' {
  import type { ConnectorSearchResults } from 'react-instantsearch-core';

  export function getResults(
    searchResults: ConnectorSearchResults,
    context: any
  ): any;

  export function refineValue(
    searchState,
    nextRefinement,
    context,
    resetPage: boolean,
    namespace
  ): any;
}

declare module 'react-instantsearch-core/dist/es/core/context' {
  export type InstantSearchContext = {
    onInternalStateUpdate: InstantSearch['onWidgetsInternalStateUpdate'];
    createHrefForState: InstantSearch['createHrefForState'];
    onSearchForFacetValues: InstantSearch['onSearchForFacetValues'];
    onSearchStateChange: InstantSearch['onSearchStateChange'];
    onSearchParameters: InstantSearch['onSearchParameters'];
    store: Store;
    widgetsManager: any;
    mainTargetedIndex: string;
  };

  export type IndexContext =
    | {
        targetedIndex: string;
      }
    | undefined;
}
