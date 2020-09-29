/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {setAdapters, debug} from 'leancloud-realtime';
import * as adapters from '@leancloud/platform-adapters-react-native';

debug.enable('LC*');
setAdapters(adapters);

AppRegistry.registerComponent(appName, () => App);
