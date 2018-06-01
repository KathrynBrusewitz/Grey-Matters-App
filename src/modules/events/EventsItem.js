import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Link } from 'react-router-native';
import styles from './EventsItemStyles';
import { colors } from '../../constants';

const EventsItem = (props) => (
  <Link to={`/events/${props.event._id}`} underlayColor={colors.lightGrey}>
    <View style={styles.event}>
      <View style={styles.eventHeader}>
        <View style={styles.dateBox}>
          <Text style={styles.eventDate}>
            {new Date(props.event.dateStart).toLocaleDateString("en-US",{month: 'long', day: 'numeric'})}
          </Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.eventTime}>
            {`${new Date(props.event.dateStart).toLocaleTimeString("en-US",{hour: 'numeric', minute: 'numeric'})} - ${new Date(props.event.dateEnd).toLocaleTimeString("en-US",{hour: 'numeric', minute: 'numeric'})}`}
          </Text>
        </View>
      </View>
      <View style={styles.mainInfo}>
        <Text style={styles.eventName}>{props.event.title}</Text>
        <Text style={styles.eventLocation}>{props.event.location}</Text>
      </View>
    </View>
  </Link>
)

export default EventsItem;
