// addons, panels and events get unique names using a prefix
export const PARAM_KEY = 'test';
export const ADDON_ID = 'storybookjs/test';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const ADD_TESTS = `${ADDON_ID}/add_tests`;
export function defineJestParameter(parameters) {
  const {
    jest,
    fileName: filePath
  } = parameters;

  if (typeof jest === 'string') {
    return [jest];
  }

  if (jest && Array.isArray(jest)) {
    return jest;
  }

  if (jest === undefined && typeof filePath === 'string') {
    const fileName = filePath.split('/').pop().split('.')[0];
    return [fileName];
  }

  return null;
}