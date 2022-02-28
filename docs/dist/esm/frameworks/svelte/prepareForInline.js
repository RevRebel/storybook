import React from 'react';
import HOC from '@storybook/addon-docs/svelte/HOC.svelte';
export var prepareForInline = function prepareForInline(storyFn) {
  var el = React.useRef(null);
  React.useEffect(function () {
    var root = new HOC({
      target: el.current,
      props: {
        storyFn: storyFn
      }
    });
    return function () {
      return root.$destroy();
    };
  });
  return /*#__PURE__*/React.createElement('div', {
    ref: el
  });
};