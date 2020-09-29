/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Text, View} from 'react-native';

import {realtime} from './client';

function LogItem(props) {
  let backgroundColor = 'green';
  let color = '#fff';
  if (props.ts > 500) {
    color = '#000';
    backgroundColor = 'yellow';
  }
  if (props.ts > 1000) {
    backgroundColor = 'red';
  }

  let text = props.ts + 'ms';
  if (props.ts > 10000) {
    text = Math.round(props.ts / 1000) + 's';
  }
  return (
    <View style={styles.logItemBox}>
      <Text style={{...styles.logItemTs, color, backgroundColor}}>+{text}</Text>
      <Text>{props.text}</Text>
    </View>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
    this.scrollView = React.createRef();
    this.lastTs = Date.now();
  }

  async componentDidMount() {
    this.debug('rendered');
    const client = await realtime.createIMClient('114514');
    this.debug('IMClient created');
  }

  debug = (message) => {
    const now = Date.now();
    const ts = now - this.lastTs;
    this.lastTs = now;
    const logItem = {
      key: this.state.logs.length,
      text: message,
      ts,
    };
    this.setState({
      logs: [...this.state.logs, logItem],
    });
    console.log(logItem);
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, margin: 4}}>
        <Text>LeanMessage</Text>
        {/* <Button title="Clear Log" onPress={() => this.debug('lalala')} /> */}
        <ScrollView ref={this.scrollView} style={{borderWidth: 1}}>
          {this.state.logs.map((log) => (
            <LogItem key={log.key} text={log.text} ts={log.ts} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logItemBox: {
    flex: 1,
    flexDirection: 'row',
  },
  logItemTs: {
    width: 64,
    marginRight: 4,
  },
});
