import React from 'react' 
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigations/Navigation';



export const App = () => {
    return (
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer> 
    )
}

export default App;
