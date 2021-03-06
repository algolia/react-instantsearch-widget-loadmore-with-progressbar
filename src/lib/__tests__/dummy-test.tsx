import { render } from '@testing-library/react';
import React from 'react';
import { Hits, InstantSearch } from 'react-instantsearch-dom';

import { LoadMoreWithProgressBar } from '../widget';

describe('nothing', () => {
  it('tests nothing', () => {
    const searchClient = {
      search(_requests: any[]) {
        return Promise.resolve({
          results: [
            {
              hits: [
                {
                  objectID: 'a',
                  name: 'test',
                },
              ],
            },
          ],
        });
      },
    };

    const { debug } = render(
      <InstantSearch indexName="test_index" searchClient={searchClient}>
        <LoadMoreWithProgressBar />
        <Hits hitComponent={({ hit }: { hit: any }) => hit.name} />
      </InstantSearch>
    );

    debug();
  });
});
