import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionSheet } from 'react-native-ui-lib';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { searchActions } from '../../actions';
import { menuActions } from '../../actions';
import SearchResults from './SearchResults';
import styles from './SearchStyles';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearSearch();
    this.props.showMenu(false);
  }

  render() {
    if (this.props.searchResults) {
      return (
        <SearchResults />
      )
    }
    return (
      <View style={styles.container}>
        <Text 
          style={styles.suggestionHeader}
        >
          Suggested
        </Text>
        <Text 
          style={styles.suggestion}
          onPress={() => this.props.getSearch({ q: 'Computers'})}
        >
          Computers
        </Text>
        <Text 
          style={styles.suggestion}
          onPress={() => this.props.getSearch({ q: 'Brain' })}
        >
          Brain
        </Text>
        <Text 
          style={styles.suggestion}
          onPress={() => this.props.getSearch({ q: 'Tapeworms' })}
        >
          Tapeworms
        </Text>
        <Text 
          style={styles.suggestion}
          onPress={() => this.props.getSearch({ q: 'Memory' })}
        >
          Memory
        </Text>
        <Text 
          style={styles.suggestion}
          onPress={() => this.props.getSearch({ q: 'Depression' })}
        >
          Depression
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.search.searchResults,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSearch: searchActions.getSearch,
  showMenu: menuActions.showMenu,
  clearSearch: searchActions.clearSearch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

