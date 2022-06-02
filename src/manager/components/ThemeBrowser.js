import React, { useEffect } from 'react';
import ReactJson from '@usulpro/react-json-view';
import YamlEditor from "@focus-reactive/react-yaml";
import { useTheme } from '@storybook/theming';

import * as styled from './ThemeBrowser.styled';
import Toolbar from '../UI/Toolbar';
import Caption from '../UI/Caption';
import IconButton from '../UI/IconButton';
import Text from '../UI/Text';
import { copyToClipboard } from '../../utils/clipboard';

const showThemePath = selectedValue => {
  if (!selectedValue) return 'select value';
  try {
    const { namespace, name } = selectedValue;
    const path = namespace.join('.');
    const fullPath = `${path}.${name}`;
    const themeProp = `\${({ theme }) => theme.${fullPath}}`;
    return themeProp;
  } catch (err) {
    return 'try to select value';
  }
};

const ThemeBrowser = ({ theme, themeInfo, selectValue, selectedValue, updateTheme, themeInd }) => {
  const [editorJSON, setEditorJSON] = React.useState(true)
  const sbTheme = useTheme();
  const jsTheme =
    sbTheme.base === 'light' ? 'shapeshifter:inverted' : 'codeschool';
  const footerAction = showThemePath(selectedValue);

  useEffect(() => {
    if(!editorJSON && selectedValue) selectValue(null);
  }, [editorJSON, selectedValue]);

  const handlerChange = (value) => updateTheme(value.json);

  return (
    <styled.Container>
      <Toolbar>
        <Caption>Editor:</Caption>
        <styled.ButtonsEditor>
          <button  onClick={() => setEditorJSON(true)}>JSON</button>
          <button onClick={() => setEditorJSON(false)}>YAML</button>
        </styled.ButtonsEditor>
      </Toolbar>
      <styled.ThemeHolder>
        { editorJSON ?
          <ReactJson
            src={theme}
            onSelect={selectValue}
            name={null}
            theme={jsTheme}
          /> :
          <YamlEditor
            key={JSON.stringify(theme)}
            json={theme}
            onChange={handlerChange}
          />
        }
      </styled.ThemeHolder>
        {footerAction && editorJSON ? (
          <Toolbar footer>
              <IconButton
                icon="copy"
                title="copy to clipboard"
                onClick={copyToClipboard(footerAction)}
              />
            <Text>{footerAction}</Text>
          </Toolbar>
        ) : null}
    </styled.Container>
  );
};

export default ThemeBrowser;
