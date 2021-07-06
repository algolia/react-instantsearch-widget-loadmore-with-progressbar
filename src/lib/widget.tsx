import { LoadMoreWithProgressBarComponent } from './component';
import { connectLoadMoreWithProgressBar } from './connector';

import type { ElementType } from 'react';

export const LoadMoreWithProgressBar: ElementType =
  connectLoadMoreWithProgressBar(LoadMoreWithProgressBarComponent);
