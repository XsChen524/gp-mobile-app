import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AppTabNavigation from "./src/router/router";
import { store } from './src/redux/store'

const App: React.FunctionComponent<{}> = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<AppTabNavigation />
			</NavigationContainer>
		</Provider>
	);
}

export default App;
