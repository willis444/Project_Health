import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation/navigator';
import { ThemeContext } from './src/theme/theme-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import { store } from './src/store/store.js'
import { Provider } from 'react-redux'

export default () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <RootSiblingParent>
        <IconRegistry icons={EvaIconsPack}/>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Provider store={store}> 
              <ApplicationProvider {...eva} theme={eva[theme]}>
                <AppNavigator/>
              </ApplicationProvider>
            </Provider>
        </ThemeContext.Provider>
      </RootSiblingParent>
    </>
  );
};