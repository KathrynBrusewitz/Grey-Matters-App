import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-native';
import {
  Text,
  ScrollView,
  View,
  Image,
  WebView,
} from 'react-native';
import styles from '../articles/ArticleStyles';
import { contentActions } from '../../actions';
import { analytics } from '../../store';
import Loading from '../shared/Loading';
import Unavailable from '../shared/Unavailable';
import References from '../shared/References';
import { creatorTitles } from '../../constants';


class Podcast extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getContent(this.props.match.params.id);
  }

  render() {
    if (this.props.isGettingContent) {
      return (
        <Loading />
      );
    }

    if (!this.props.content || !this.props.content.url) {
      return (
        <Unavailable message='Podcast currently unavailable' />
      );
    }
    analytics.page({
      anonymousId: '0',
      category: 'Podcasts',
      name: this.props.content.title,
    });
    return (
      <ScrollView>
        <View style={styles.image}>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: this.props.content.url}}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            {this.props.content.title}
          </Text>
          <View style={styles.metaData}>
            <View style={[styles.author]}>
              <Text>{creatorTitles[this.props.content.type].toUpperCase()}</Text>
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
                this.props.content.artists && this.props.content.artists.map((artist) => (
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
          <Text>{this.props.content.body}</Text>
          {this.props.content.references && <References references={this.props.content.references} />}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  content: state.content.content,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getContent: contentActions.getContent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Podcast);
