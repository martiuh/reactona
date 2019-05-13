import React from 'react';

import { contentStyle } from './Content.css';

export default function Content({ children }) {
  return <div className={contentStyle}>{children}</div>;
}
