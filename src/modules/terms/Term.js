import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  KeyboardAvoidingView,
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import Loading from '../shared/Loading';
import Unavailable from '../shared/Unavailable';
import { termsActions } from '../../actions';
import { userActions } from '../../actions';
import styles from './TermStyles';

class Term extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTerm(this.props.match.params.id);
  }

  componentWillUnmount() {
    if (this.props.user._id && this.props.term) {
      let index = -1;
      for (let i = 0; i < this.props.user.notes.length; i++) {
        if (this.props.user.notes[i].term._id == this.props.term._id) {
          index = i;
          break;
        }
      }
      if (this.notes) { // the user edited the notes text
        if (index > -1) {
          // the user already had a note for this term
          if (this.notes.length > 0) {
            this.props.user.notes[index].body = this.notes;
          } else {
            this.props.user.notes.splice(index, 1);
          }
        } else {
          // this is the user's first time writing a note for this term
          if (this.notes.length > 0) {
            this.props.user.notes.push({body: this.notes, term: this.props.term._id});
          }
        }
        this.props.updateUser({ 
          fields: {notes: this.props.user.notes}, 
          id: this.props.user._id
        });
      }
    }
  }

  render() {
    if (this.props.isGettingTerm) {
      return (
        <Loading />
      )
    }

    if (!this.props.term) {
      return (
        <Unavailable message='Term unavailable' />
      )
    }

    if (this.props.user._id) {
      this.notes = null;
      for (let i = 0; i < this.props.user.notes.length; i++) {
        if (this.props.user.notes[i].term._id == this.props.term._id) {
          this.notes = this.props.user.notes[i].body;
          break;
        }
      }
    }
    analytics.page({
      anonymousId: '0',
      category: 'Terms',
      name: this.props.term.term,
      properties: {
        id: this.props.term._id,
      }
    });
    return (
      <KeyboardAwareScrollView 
        enableResetScrollToCoords={false} 
        extraScrollHeight={20}
      >
        <Image style={styles.image} source={{uri: 'http://3.bp.blogspot.com/-oulaC4PV0sw/V1Y4OskA1yI/AAAAAAAAb20/_clCVq9Y7DsvpM7CQU6PBJCTwC9D-VEsQCK4B/s1600/synapse.jpg'}}/>
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.term.term}</Text>
          <View>
            <View style={styles.sectionHeaderBox}>
              <Text style={styles.sectionHeader}>Definition</Text>
            </View>
            <Text style={styles.paragraph}>{this.props.term.definition}</Text>
          </View>
          {
            this.props.user._id ? (
              <View>
                <View style={styles.sectionHeaderBox}>
                  <Text style={styles.sectionHeader}>Notes</Text>
                </View>
                <View>
                  {
                    this.notes && this.notes.length > 0 ? (
                      <TextInput
                        multiline = {true}
                        defaultValue={this.notes}
                        style={styles.paragraph}
                        onChangeText={(text) => this.notes = text}
                      />
                    ) : (
                      <TextInput
                        multiline = {true}
                        placeholder={'Write your notes here'}
                        style={styles.paragraph}
                        onChangeText={(text) => this.notes = text}
                      />                      
                    )
                  }
                </View>
              </View>
            ) : null
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  term: state.terms.term,
  token: state.user.token,
  isGettingTerm: state.terms.isGettingTerm,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTerm: termsActions.getTerm,
  updateUser: userActions.updateUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Term);

