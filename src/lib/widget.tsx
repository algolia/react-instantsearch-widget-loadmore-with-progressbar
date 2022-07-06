import type { ComponentType } from 'react';

import { LoadMoreWithProgressBarComponent } from './component';
import type { ButtonComponentProps, TranslationsType } from './component';
import { connectLoadMoreWithProgressBar } from './connector';

export interface LoadMoreWithProgressBarExposedProps {
  translations?: TranslationsType;
  buttonComponent?: ComponentType<ButtonComponentProps>;
  className?: string;
}

export const LoadMoreWithProgressBar: ComponentType<LoadMoreWithProgressBarExposedProps> =
  connectLoadMoreWithProgressBar(LoadMoreWithProgressBarComponent, {
    $$widgetType: 'ais.loadMoreWithProgressBar',
  });
