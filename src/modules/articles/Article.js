import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-native';
import ParsedText from 'react-native-parsed-text';
import {
  Text,
  ScrollView,
  View,
  Image
} from 'react-native';
import styles from './ArticleStyles';
import { contentActions } from '../../actions';
import { termsActions } from '../../actions';
import Loading from '../shared/Loading';
import Unavailable from '../shared/Unavailable';
import References from '../shared/References';
import TermDialog from './TermDialog';

class Article extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearTerms();
    this.props.getContent(this.props.match.params.id);
  }

  handleTermPress(term) {
    let pattern = /<span>([\w\s]+)<\/span>/;
    let match = term.match(pattern);
    this.props.getTerms({ term: match[1] });
  }

  renderText(matchingString, matches) {
    return `${matches[1]}`;
  }

  render() {
    if (this.props.isGettingContent) {
      return (
        <Loading />
      );
    }

    if (!this.props.content) {
      return (
        <Unavailable message='Article unavailable' />
      );
    }
    
    return (
      <View>
        <ScrollView>
          <Image style={styles.image} source={{uri: 'https://is2-ssl.mzstatic.com/image/thumb/Purple60/v4/98/53/cc/9853cc2f-4b7a-8fd0-a7f8-5c6902e94ae8/source/256x256bb.jpg'}}/>
          <View style={styles.container}>
            <Text style={styles.titleText}>
              {this.props.content.title}
            </Text>
            <View style={styles.metaData}>
              <View style={[styles.rightBorder, styles.metaDataBox]}>
                <Text>AUTHOR</Text>
                <Text style={styles.blue}>{this.props.content.creators[0]}</Text>
              </View>
              <View style={[styles.rightBorder, styles.metaDataBox]}>
                <Text>ARTIST</Text>
                <Text style={styles.blue}>{this.props.content.creators[0]}</Text>
              </View>
              <View style={[styles.metaDataBox]}>
                <Text>{ new Date(this.props.content.publishTime).toLocaleDateString()}</Text>
              </View>
            </View>
            <ParsedText
              parse={
                [
                  {pattern: /<h2>([\S\s]+)<\/h2>/, style: styles.sectionTitle, renderText: this.renderText},
                  {pattern: /<span>([\w\s]+)<\/span>/, style: styles.blue, onPress: (term) => this.handleTermPress(term), renderText: this.renderText},
                ]
              }
            >
              {this.props.content.body}
            </ParsedText>
            {this.props.content.references && <References references={this.props.content.references}/>}
          </View>
        </ScrollView>
        {this.props.terms && <TermDialog terms={this.props.terms} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  content: state.content.content,
  isGettingContent: state.content.isGettingContent,
  terms: state.terms.terms,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getContent: contentActions.getContent,
  getTerms: termsActions.getTerms,
  clearTerms: termsActions.clearTerms,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Article);
