import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoHeightImage from 'react-native-auto-height-image';
import ParsedText from 'react-native-parsed-text';
import { Link } from 'react-router-native';
import {
  Dimensions,
  Text,
  ScrollView,
  View,
  Image
} from 'react-native';
import { termsActions } from '../../actions';
import { analytics } from '../../store';
import styles from './ArticleStyles';
import References from '../shared/References';
import TermDialog from './TermDialog';

class ArticleView extends Component {
  constructor(props) {
    super(props);
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
    let references = [
      { number: 1, citation: 'Marrocco, S. (2017, April 28). ‘Big’ John McCarthy says weight-cutting more dangerous than PEDs in MMA. MMAJunkie.com.' },
      { number: 2, citation: 'Martin, D. (2014, February 18). Daniel Cormier remembers the weight cut that almost killed him. FoxSports.com' },
      { number: 3, citation: 'Ting, L. et al. (2016). Brain Formaldehyde is Related to Water Intake Behavior. Aging and Disease, 7(5), 561-584.' },
    ];
    analytics.page({
      anonymousId: '0',
      category: 'Articles',
      name: this.props.content.title,
      properties: {
        id: this.props.content._id,
      }
    });
    return (
      <View>
        <ScrollView>
          {this.props.content.coverImage ? (
            <AutoHeightImage
              width={Dimensions.get('window').width}
              source={{ uri: `https://${this.props.content.coverImage.s3Bucket}.s3.amazonaws.com/${this.props.content.coverImage.s3Key}` }}
            />
          ) : null}
          <View style={styles.container}>
            <Text style={styles.titleText}>
              {this.props.content.title}
            </Text>
            <View style={styles.metaData}>
              <View style={[styles.author]}>
                <Text>AUTHOR</Text>
                {
                  this.props.content.creators && this.props.content.creators.map((creator) => (
                    <Link
                      to={`/creatorProfile/${creator._id}`}
                      underlayColor='white'
                      key={creator._id}
                    >
                      <Text style={styles.blue}>{creator.name}</Text>
                    </Link>
                  ))
                }
              </View>
              <View style={[styles.artist]}>
                <Text>ARTIST</Text>
                {
                  this.props.content.coverImage 
                  && this.props.content.coverImage.artists.map((artist) => (
                    <Link
                      to={`/creatorProfile/${artist._id}`}
                      underlayColor='white'
                      key={artist._id}
                    >
                      <Text style={styles.blue}>{artist.name}</Text>
                    </Link>
                  ))
                }
              </View>
              <View style={[styles.date]}>
                <Text>{new Date(this.props.content.publishTime).toLocaleDateString()}</Text>
              </View>
            </View>
            <ParsedText
              style={styles.body}
              parse={
                [
                  { pattern: /<h2>([\S\s]+)<\/h2>/, style: styles.sectionTitle, renderText: this.renderText },
                  { pattern: /<span>([\w\s]+)<\/span>/, style: styles.blue, onPress: (term) => this.handleTermPress(term), renderText: this.renderText },
                ]
              }
            >
              {this.props.content.body}
            </ParsedText>
            {references && <References references={references} />}
          </View>
        </ScrollView>
        {this.props.terms && <TermDialog terms={this.props.terms} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  terms: state.terms.terms,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTerms: termsActions.getTerms,
  clearTerms: termsActions.clearTerms,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
