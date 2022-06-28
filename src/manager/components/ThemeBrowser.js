import React from 'react';
import ReactJson from '@usulpro/react-json-view';

import * as styled from './ThemeBrowser.styled';
import Toolbar from '../UI/Toolbar';
import Caption from '../UI/Caption';
import IconButton from '../UI/IconButton';
import Text from '../UI/Text';
import { copyToClipboard } from '../../utils/clipboard';

const showThemePath = (selectedValue, fieldSnippetFn) => {
  if (!selectedValue) return 'Select value';
  try {
    return fieldSnippetFn(selectedValue);
  } catch (err) {
    return 'try to select value';
  }
};

const ThemeBrowser = ({
  theme,
  themeInfo,
  jsTheme,
  selectValue,
  selectedValue,
  fieldSnippetFn,
}) => {
  const footerAction = showThemePath(selectedValue, fieldSnippetFn);

  return (
    <styled.Container>
      <Toolbar>
        <Caption>{themeInfo.name}</Caption>
      </Toolbar>
      <styled.ThemeHolder>
        <ReactJson
          src={theme}
          onSelect={selectValue}
          name={null}
          theme={jsTheme}
        />
      </styled.ThemeHolder>
      <Toolbar footer>
        {footerAction && (
          <IconButton
            theme={jsTheme}
            icon="copy"
            title="copy to clipboard"
            onClick={copyToClipboard(footerAction)}
          />
        )}
        <Text>{footerAction}</Text>
      </Toolbar>
    </styled.Container>
  );
};

export default ThemeBrowser;
