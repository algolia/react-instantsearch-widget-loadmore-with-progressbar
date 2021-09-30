import classNames from 'classnames';
import React, { useMemo } from 'react';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from 'react-instantsearch-dom';

import type { LoadMoreWithProgressBarProvidedProps } from './connector';
import type { LoadMoreWithProgressBarExposedProps } from './widget';

export type ButtonComponentProps = {
  translations: Record<keyof typeof translations, string>;
  isSearchStalled: boolean;
  refineNext: () => void;
};

export type LoadMoreWithProgressBarProps = LoadMoreWithProgressBarExposedProps &
  LoadMoreWithProgressBarProvidedProps & {
    translate: (key: string, ...params: any) => string;
  };

const cx = (...args: string[]) =>
  classNames(createClassNames('LoadMoreWithProgressBar')(...args));

const ButtonComponent = ({
  translations,
  isSearchStalled,
  refineNext,
}: ButtonComponentProps) => (
  <button
    type="button"
    className={classNames(cx('loadMore'), 'ais-InfiniteHits-loadMore')}
    disabled={isSearchStalled}
    onClick={refineNext}
  >
    {isSearchStalled ? translations.searchStalled : translations.loadMore}
  </button>
);

export const LoadMoreWithProgressBar = ({
  nbSeenHits,
  nbTotalHits,
  isSearchStalled,
  refineNext,
  translate,
  buttonComponent: CustomButtonComponent,
  className,
}: LoadMoreWithProgressBarProps) => {
  const hasMore = nbSeenHits < nbTotalHits;
  const hasResults = nbTotalHits > 0;
  const progress = hasResults
    ? Math.floor((nbSeenHits / nbTotalHits) * 100)
    : 0;

  const translations = useMemo(
    () => ({
      loadMore: translate('loadMore'),
      searchStalled: translate('searchStalled'),
      text: translate('text', { nbSeenHits, nbTotalHits }),
    }),
    [translate, nbSeenHits, nbTotalHits]
  );

  const Button = CustomButtonComponent ?? ButtonComponent;

  return (
    <div className={classNames(cx(''), className)}>
      {hasResults && (
        <div className={cx('progressBar')}>
          <progress
            className={cx('progressBar-bar')}
            max="100"
            value={progress}
          >
            <div className={cx('progressBar-fallback')}>
              <span
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </progress>
          <div className={cx('progressBar-text')}>{translations.text}</div>
        </div>
      )}

      {hasMore && hasResults && (
        <Button
          translations={translations}
          isSearchStalled={isSearchStalled}
          refineNext={refineNext}
        />
      )}
    </div>
  );
};

const translations = {
  loadMore: 'Load more',
  searchStalled: 'Loading...',
  text: ({ nbSeenHits, nbTotalHits }: TextTranslationArgs) =>
    `You've seen ${nbSeenHits} hit${
      nbSeenHits > 1 ? 's' : ''
    } out of ${nbTotalHits}`,
};

export type TextTranslationArgs = {
  nbSeenHits: number;
  nbTotalHits: number;
};
export type TranslationsType = Partial<typeof translations>;

export const LoadMoreWithProgressBarComponent = translatable(translations)(
  LoadMoreWithProgressBar
);
