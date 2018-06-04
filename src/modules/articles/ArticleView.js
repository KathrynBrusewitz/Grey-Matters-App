import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoHeightImage from 'react-native-auto-height-image';
import ParsedText from 'react-native-parsed-text';
import HTMLView from 'react-native-htmlview';
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

  handleLinkPress(id) {
    this.props.getTerm(id);
  }

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if(node.name == 'img') {
      const a = node.attribs;
      return (
        <AutoHeightImage
          width={Dimensions.get('window').width - 40}
          source={{ uri: a.src }}
          key={index}
        />
      )
    }
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
              style={styles.image}
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
                    <Text key={creator._id} style={styles.blue}>{creator.name}</Text>
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
                    <Text key={artist._id} style={styles.blue}>{artist.name}</Text>
                    </Link>
                  ))
                }
              </View>
              <View style={[styles.date]}>
                <Text>{new Date(this.props.content.publishTime).toLocaleDateString()}</Text>
              </View>
            </View>
            <HTMLView
              value={this.props.content.bodyHtml}
              stylesheet={styles}
              onLinkPress={(url) => console.log('clicked link: ', url)}
              renderNode={this.renderNode}
            />
            {references && <References references={references} />}
          </View>
        </ScrollView>
        {this.props.term && <TermDialog term={this.props.term} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  term: state.terms.term,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTerm: termsActions.getTerm,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
