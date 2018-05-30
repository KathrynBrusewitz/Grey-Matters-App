import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageControl } from 'react-native-ui-lib';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { learningActions } from '../../actions';
import { colors } from '../../constants';
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
    analytics.page({
      anonymousId: '0',
      category: 'Learning Section',
      name: 'Learning Section',
    });
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
        <ScrollView
          style={styles.story}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
        <PageControl
          containerStyle={{position: 'absolute', bottom: 0, left: 0, right: 0}}
          numOfPages={pages.length}
          currentPage={this.props.topImageIndex}
          color={colors.lightGrey} />
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
