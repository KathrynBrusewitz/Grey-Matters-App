import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-native';
import {
	ScrollView,
	Text,
	View,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import ContentFeed from '../shared/ContentFeed';
import styles from './ProfileStyles';
import { profileActions } from '../../actions';
import { contentActions } from '../../actions';
import { termsActions } from '../../actions';
import Notes from './Notes';
import Unavailable from '../shared/Unavailable';

class UserProfile extends Component {
  constructor(props) {
    super(props);
	}

  render() {
		return (
			<View style={styles.container}>
					{
						this.props.user._id ? (
							<ScrollView>
								<View style={{flex:1}}>
									<View style={{alignItems: 'center'}}>
										<Avatar
											xlarge
											rounded
											title={this.props.user.name.substring(0, 1)}
											containerStyle={{marginBottom: 15}}
										/>
										<Text style={styles.name}>{this.props.user.name}</Text>
										<View style={styles.tabs}>
											<Text 
												style={[styles.tab, styles.tabLeft, this.props.showBookmarkList ? styles.tabSelected : null]}
												onPress={() => this.props.showBookmarks()}
											>
												Bookmarks
											</Text>
											<Text
												style={[styles.tab, styles.tabRight, !this.props.showBookmarkList ? styles.tabSelected : null]}
												onPress={() => this.props.showNotes()}
											>
												Notes
											</Text>
										</View>
									</View>
									{ this.props.showBookmarkList && 
										(( this.props.user.bookmarks.length > 0 && <ContentFeed list={this.props.user.bookmarks} />) ||
										<Unavailable message='No bookmarks yet' />) }
									{ !this.props.showBookmarkList && <Notes list={this.props.user.notes}/> }
								</View>
							</ScrollView>
						) : (
							<View style={{alignItems: 'center'}}>
								<Avatar
									xlarge
									rounded
									icon={{name: 'person'}}
									containerStyle={{ marginBottom: 15}}
								/>
								<Link to="/signup" underlayColor='white'>
									<Text style={[styles.signup]}>Sign Up</Text>
								</Link>
							</View>
						)
					}
			</View>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user.user,
	contents: state.content.contents,
	showBookmarkList: state.profile.showBookmarkList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	showBookmarks: profileActions.showBookmarks,
	showNotes: profileActions.showNotes,
	getContents: contentActions.getContents,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
