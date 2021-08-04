import React from 'react';
import { translatable } from 'react-instantsearch-core';

import type { ProvidedProps } from './connector';
import type { ComponentType } from 'react';

export type ButtonComponentProps = {
  loadMoreTranslation: string;
  refineNext: () => void;
};

export type LoadMoreWithProgressBarProps = {
  translate: (key: string, ...params: any) => string;
  buttonComponent: ComponentType<ButtonComponentProps>;
  className: string;
} & ProvidedProps;

export type TextTranslationArgs = {
  nbSeenHits: number;
  nbTotalHits: number;
};

export const LoadMoreWithProgressBar = ({
  nbSeenHits,
  nbTotalHits,
  refineNext,
  translate,
  buttonComponent: ButtonComponent,
  className = '',
}: LoadMoreWithProgressBarProps) => {
  const hasMore = nbSeenHits < nbTotalHits;
  const hasResults = nbTotalHits > 0;
  const progress = hasResults
    ? Math.floor((nbSeenHits / nbTotalHits) * 100)
    : 0;

  return (
    <div className={['ais-LoadMoreWithProgressBar', className].join(' ')}>
      {hasResults && (
        <div className="ais-LoadMoreWithProgressBar-progressBar">
          <progress
            className="ais-LoadMoreWithProgressBar-progressBar-bar"
            max="100"
            value={progress}
          >
            <div className="ais-LoadMoreWithProgressBar-progressBar-fallback">
              <span
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </progress>
          <div className="ais-LoadMoreWithProgressBar-progressBar-text">
            {translate('text', { nbSeenHits, nbTotalHits })}
          </div>
        </div>
      )}

      {hasMore && hasResults && ButtonComponent ? (
        <ButtonComponent
          loadMoreTranslation={translate('loadMore')}
          refineNext={refineNext}
        />
      ) : (
        <button
          type="button"
          className="ais-InfiniteHits-loadMore ais-LoadMoreWithProgressBar-loadMore"
          onClick={refineNext}
        >
          {translate('loadMore')}
        </button>
      )}
    </div>
  );
};

const translations = {
  loadMore: 'Load more',
  text: ({ nbSeenHits, nbTotalHits }: TextTranslationArgs) =>
    `You've seen ${nbSeenHits} product${
      nbSeenHits > 1 ? 's' : ''
    } out of ${nbTotalHits}`,
};

export type TranslationsType = typeof translations;

export const LoadMoreWithProgressBarComponent = translatable(translations)(
  LoadMoreWithProgressBar
);
