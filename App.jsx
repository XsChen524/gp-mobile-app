import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabNavigation from './src/router/router';

function App() {
	return (
		<NavigationContainer>
			<AppTabNavigation	/>
		</NavigationContainer>
	);
}

export default App;
