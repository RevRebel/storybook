import React from 'react';
import HOC from '@storybook/addon-docs/svelte/HOC.svelte';
export const prepareForInline = storyFn => {
  const el = React.useRef(null);
  React.useEffect(() => {
    const root = new HOC({
      target: el.current,
      props: {
        storyFn
      }
    });
    return () => root.$destroy();
  });
  return /*#__PURE__*/React.createElement('div', {
    ref: el
  });
};