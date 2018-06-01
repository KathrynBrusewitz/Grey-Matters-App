import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import { createMemoryHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers'; //Import the reducer
import Analytics from 'analytics-react-native';

export const analytics = new Analytics('trMds4w0XTPk7V8o7QMJh1uqqbm34YS1');

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create a history of your choosing (we're using a browser history in this case)
const history = createMemoryHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk, routerMiddleware(history)];

// Commpose middleware and enhancers
const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

// Create store
export const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);
