import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ParsedText from 'react-native-parsed-text';
import HTMLView from 'react-native-htmlview';
import {
	View,
	Image,
	Text,
	ScrollView,
} from 'react-native';
// import styles from './HomeStyles';
import { contentActions } from '../../actions';
import { termsActions } from '../../actions';
import Loading from '../shared/Loading';
import Unavailable from '../shared/Unavailable';
import References from '../shared/References';
import TermDialog from '../articles/TermDialog';
import ArticleView from '../articles/ArticleView';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
		this.props.clearTerm();
    this.props.getContents();
	}

  render() {
    if (this.props.isGettingContent) {
      return (
        <Loading />
      );
		}
		
    if (!this.props.contents || this.props.contents.length == 0) {
      return (
				<Unavailable message='Content unavailable' />
      );
    }
    
    return (
			<ArticleView content={this.props.contents[0]} /> 
    );
  }
}

const mapStateToProps = state => ({
  contents: state.content.contents,
	isGettingContent: state.content.isGettingContent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getContents: contentActions.getContents,
  clearTerm: termsActions.clearTerm,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
