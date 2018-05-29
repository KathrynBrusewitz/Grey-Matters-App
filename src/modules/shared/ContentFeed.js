import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
} from 'react-native';
import { Link } from 'react-router-native';
import { Icon } from 'react-native-elements';
import styles from './ContentFeedStyles';
import { colors, creatorTitles } from '../../constants';
import BookmarkIcon from './BookmarkIcon';

const ContentFeed = (props) => (
  <View style={[styles.content]}>
  {
    props.list ? props.list.map((item) => {
      console.log(JSON.stringify(item, null, 4));
      return (
      <Link 
        to={`/${item.type}s/${item._id}`} 
        key={item._id} 
        style={[styles.box]}
        underlayColor={colors.lightGrey}
      >
        <View style={styles.contentListItem}>
          <Image style={styles.image} 
                source={{uri: 'https://is2-ssl.mzstatic.com/image/thumb/Purple60/v4/98/53/cc/9853cc2f-4b7a-8fd0-a7f8-5c6902e94ae8/source/256x256bb.jpg'}}
          />
          <View style={styles.informationBox}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                {item.title}
              </Text>
              { props.user._id && <BookmarkIcon item={item}/> }
            </View>
            <View style={styles.metaData}>
              <View style={styles.author}>
                <Text>{creatorTitles[item.type].toUpperCase()}</Text>
                <Text style={styles.blue}>
                  {item.creators && item.creators.length > 0 ? item.creators[0].name : null}
                </Text>
              </View>
              <View style={styles.date}>
                <Text>{new Date(item.publishTime).toLocaleDateString()}</Text>
              </View>
            </View>
            <Text style={styles.description}>
              {item.description}
              <Text style={[styles.blue]}>... READ MORE</Text>
            </Text>
          </View>
        </View>
      </Link>
    )}) : null
  }
  </View>
)

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(ContentFeed);
