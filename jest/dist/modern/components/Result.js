import React, { Fragment, useState } from 'react';
import { styled, themes, convert } from '@storybook/theming';
import { Icons } from '@storybook/components';
import Message from './Message';
const Wrapper = styled.div(({
  theme,
  status
}) => ({
  display: 'flex',
  width: '100%',
  borderTop: `1px solid ${theme.appBorderColor}`,
  '&:hover': {
    background: status === `failed` ? theme.background.hoverable : null
  }
}));
const HeaderBar = styled.div(({
  theme,
  status
}) => ({
  padding: theme.layoutMargin,
  paddingLeft: theme.layoutMargin - 3,
  background: 'none',
  color: 'inherit',
  textAlign: 'left',
  cursor: status === `failed` ? 'pointer' : null,
  borderLeft: '3px solid transparent',
  width: '100%',
  display: 'flex',
  '&:focus': {
    outline: '0 none',
    borderLeft: `3px solid ${theme.color.secondary}`
  }
}));
const Icon = styled(Icons)(({
  theme
}) => ({
  height: 10,
  width: 10,
  minWidth: 10,
  color: theme.color.mediumdark,
  marginRight: 10,
  transition: 'transform 0.1s ease-in-out',
  alignSelf: 'center',
  display: 'inline-flex'
}));

const capitalizeFirstLetter = text => {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
};

export function Result(props) {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const {
    fullName,
    title,
    failureMessages,
    status
  } = props;
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Wrapper, {
    status: status
  }, /*#__PURE__*/React.createElement(HeaderBar, {
    onClick: onToggle,
    role: "button",
    status: status
  }, status === `failed` ? /*#__PURE__*/React.createElement(Icon, {
    icon: "chevrondown",
    size: 10,
    color: convert(themes.normal).color.mediumdark,
    style: {
      transform: `rotate(${isOpen ? 0 : -90}deg)`
    }
  }) : null, /*#__PURE__*/React.createElement("div", null, capitalizeFirstLetter(fullName) || capitalizeFirstLetter(title)))), isOpen ? /*#__PURE__*/React.createElement(Fragment, null, failureMessages.map((msg, i) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement(Message, {
    msg: msg,
    key: i
  }))) : null);
}
export default Result;