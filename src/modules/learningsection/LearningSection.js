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
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    this.props.updateTopImage(pageNum);
  }

  render() {
    let imageList = [
      require('../../images/whole_brain.png'),
      require('../../images/forebrain.png'),
      require('../../images/midbrain.png'),
      require('../../images/hind_brain.png'),
      require('../../images/cerebrum.png'),
      require('../../images/frontal_lobe.png'),
      require('../../images/parietal_lobe.png'),
      require('../../images/occipital_lobe.png'),
      require('../../images/temporal_lobe.png'),
      require('../../images/cerebrum.png'),
      require('../../images/corpus_callosum.png'),
      require('../../images/cerebellum.png'),
      require('../../images/limbic_system.png'),
      require('../../images/thalamus.png'),
      require('../../images/hypothalamus.png'),
      require('../../images/amygdala.png'),
      require('../../images/hippocampus.png'),
      require('../../images/brainstem.png'),
      require('../../images/midbrain.png'),
      require('../../images/pons.png'),
      require('../../images/medulla.png'),
    ];
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={imageList[this.props.baseImageIndex % imageList.length]}
        />
        <Image
          style={[styles.image]}
          source={imageList[this.props.topImageIndex % imageList.length]}
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
          <View style={styles.page}>
            <View style={styles.sectionHeaderBox}>
              <Text style={styles.sectionHeader}>Definition</Text>
            </View>
            <Text style={styles.pageText}>
              The brain is made of three main parts: the forebrain, midbrain, and hindbrain.
            </Text>
          </View>
          <View style={styles.page}>
            <View style={styles.sectionHeaderBox}>
              <Text style={styles.sectionHeader}>Definition</Text>
            </View>
            <Text style={styles.pageText}>
              The forebrain consists of the cerebrum, thalamus, and hypothalamus.
            </Text>
          </View>
          <View style={styles.page}>
            <View style={styles.sectionHeaderBox}>
              <Text style={styles.sectionHeader}>Definition</Text>
            </View>
            <Text style={styles.pageText}>
              The midbrain consists of the tectum and tegmentum.
            </Text>
          </View>
          <View style={styles.page}>
            <View style={styles.sectionHeaderBox}>
              <Text style={styles.sectionHeader}>Definition</Text>
            </View>
            <Text style={styles.pageText}>
              The hindbrain is made of the cerebellum, pons, and medulla. Often the midbrain, pons, and medulla are referred together as the brainstem.
            </Text>
          </View>
          <Text style={styles.page}>
            The cerebrum (or cerebral cortex) is the largest part of the brain and is associated with higher brain functions such as thought and action. The cerebral cortex is divided into four section or lobes: frontal, parietal, occipital, and temporal.
          </Text>
          <Text style={styles.page}>
            The frontal lobe is associated with reason, planning, parts of speech, movement, emotions, and problem solving.
          </Text>
          <Text style={styles.page}>
            The parietal lobe is associated with movement, orientation, recognition, and perception of stimuli.
          </Text>
          <Text style={styles.page}>
            The occipital lobe is associated with visual perception.
          </Text>
          <Text style={styles.page}>
            The temporal lobe is associated with perception and recognition of auditory stimuli, memory, and speech.
          </Text>
          <Text style={styles.page}>
            The cerebrum is highly wrinkled, with the deepest furrow dividing the brain in half to form the left and right hemispheres.
          </Text>
          <Text style={styles.page}>
            The corpus callosum is the bundle of axons that connect the two halves.
          </Text>
          <Text style={styles.page}>
            The cerebellum (or little brain) is similar to the cerebrum in that it has two hemispheres and has a wrinkly surface. This structure is associated with the regulation and coordination of movement, posture, and balance.
          </Text>
          <Text style={styles.page}>
            The limbic system is often referred to as the “emotional brain” and is buried within the cerebrum. This structure contains the thalamus, hypothalamus, amygdala, and hippocampus.
          </Text>
          <Text style={styles.page}>
            The thalamus acts as the switchboard center with almost all sensory information entering it before being relayed to the necessary structure.
          </Text>
          <Text style={styles.page}>
            The hypothalamus is involved in functions including homeostasis, emotion, thirst, hunger, circadian rhythms, and the control of the autonomic nervous system.
          </Text>
          <Text style={styles.page}>
            The amygdala is associated with memory, emotion, and fear.
          </Text>
          <Text style={styles.page}>
            Finally, the hippocampus is involved in learning and memory.
          </Text>
          <Text style={styles.page}>
            The brain stem is under the limbic system and is responsible for the basic vital life functions of breathing, heartbeat, and blood pressure. This is made of the midbrain, pons, and medulla.
          </Text>
          <Text style={styles.page}>
            The midbrain is involved in vision, hearing, eye movement, and body movement.
          </Text>
          <Text style={styles.page}>
            The pons is involved in motor control and sensory analysis, while also having a significant role in our level of consciousness and sleep patterns.
          </Text>
          <Text style={styles.page}>
            The medulla is responsible for maintaining vital body functions such as breathing and a steady heartbeat.
          </Text>
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
