import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { learningActions } from '../../actions';
import Loading from '../shared/Loading';
import pages from './LearningSectionPages';
import styles from './LearningSectionStyles';

class LearningSection extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.topImageIndex == null) {
      this.props.updateTopImage(0);
    } else {
      this.refs._scrollView.scrollTo({ x: this.props.topImageIndex * Dimensions.get('window').width });
    }
  }

  onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = Dimensions.get('window');
    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    this.props.updateTopImage(pageNum);
  }

  render() {
    if (this.props.topImageIndex == null) {
      return (
        <Loading />
      )
    }
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={pages[this.props.baseImageIndex].image}
        />
        <Image
          style={[styles.image]}
          source={pages[this.props.topImageIndex].image}
          onLoadEnd={() => {
            this.props.updateBaseImage(this.props.topImageIndex)
          }}
        />
        {/* <View style={{marginTop: Dimensions.get('window').height / 2, justifyContent: 'space-between', alignSelf: 'stretch'}}>
          <Icon name='chevron-left' color='#282828' containerStyle={{flex: 1}}/>
          <Icon name='chevron-right' color='#282828' containerStyle={{flex: 1}} />
        </View> */}
        <ScrollView
          style={styles.story}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          onMomentumScrollEnd={(e) => this.onScrollEnd(e)}
          ref='_scrollView'
        >
          {
            pages.map((page, i) => (
              <View key={i} style={styles.page}>
                <View style={styles.sectionHeaderBox}>
                  <Text style={styles.sectionHeader}>{page.title}</Text>
                </View>
                <Text style={styles.pageText}>{page.description}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  baseImageIndex: state.learning.baseImageIndex,
  topImageIndex: state.learning.topImageIndex,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateBaseImage: learningActions.updateBaseImage,
  updateTopImage: learningActions.updateTopImage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LearningSection);
