import React, { Component } from 'react';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	Text,
	ScrollView,
	View,
} from 'react-native';
import Loading from '../shared/Loading';
import Unavailable from '../shared/Unavailable';
import styles from './NotesStyles';
import { colors } from '../../constants';


class Notes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		if (this.props.isGettingTerms) {
      return (
        <Loading />
      );
    }

    if (!this.props.list || this.props.list.length == 0 ) {
      return (
				<Unavailable message='No notes yet'/>
      );
		}

    return (
			<ScrollView>
				<View style={styles.content}>
					{this.props.list.map(item => {
						return (
						<Link 
							to={`/terms/${item.term._id}`} 
							key={item._id} 
							underlayColor={colors.lightGrey}
						>
							<View style={styles.box}>
								<View>
									<Text style={styles.titleText}>{item.term.term}</Text>
								</View>
								<Text style={styles.text}>{item.body}</Text>
							</View>
						</Link>
					)})}
				</View>
			</ScrollView>
    );
  }
}

export default Notes;
