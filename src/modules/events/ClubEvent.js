import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoHeightImage from 'react-native-auto-height-image';
import {
  Linking,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import styles from './ClubEventStyles';
import { eventsActions } from '../../actions';
import { analytics } from '../../store';
import Loading from '../shared/Loading';
import Unavailable from '../shared/Unavailable';

class ClubEvent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  render() {
    if(this.props.isGettingEvent) {
      return (
        <Loading />
      )
    }
    if (!this.props.event) {
      return (
        <Unavailable message='Event unvailable' />
      )
    }
    analytics.page({
      anonymousId: '0',
      category: 'Events',
      name: this.props.event.title,
      properties: {
        id: this.props.event._id,
      }
    });
    return (
      <ScrollView style={styles.container}>
        {this.props.event.coverImage ? (
          <AutoHeightImage
            width={Dimensions.get('window').width}
            source={{ uri: `https://${this.props.event.coverImage.s3Bucket}.s3.amazonaws.com/${this.props.event.coverImage.s3Key}` }}
          />
        ) : null}
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>
            {this.props.event.title}
          </Text>
          <View style={styles.metaData}>
            <View style={[styles.date]}>
              <Text>{"DATE"}</Text>
              <Text style={styles.blue}>
              {new Date(this.props.event.dateStart).toLocaleDateString("en-US",{month: 'long', day: 'numeric'})}
              </Text>
            </View>
            <View style={[styles.time]}>
              <Text>{"TIME"}</Text>
              <Text style={styles.blue}>
                {new Date(this.props.event.dateStart).toLocaleTimeString("en-US",{hour: 'numeric', minute: 'numeric'})}
              </Text>
            </View>
            <View style={[styles.location]}>
              <Text>{"LOCATION"}</Text>
              <Text style={styles.blue}>{this.props.event.location}</Text>
            </View>
          </View>
          <Text style={styles.body}>
            {this.props.event.description}
          </Text>
          {this.props.event.url && this.props.event.url.length > 0 ? (
            <Text 
              style={[styles.body, styles.blue]} 
              onPress={() => Linking.openURL(this.props.event.url)}
            >
              Watch it here!
            </Text>
            ) : null}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  event: state.events.event,
  isGettingEvent: state.events.isGettingEvent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getEvent: eventsActions.getEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClubEvent);
