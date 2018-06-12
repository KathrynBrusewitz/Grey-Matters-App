import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	View,
	Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { userActions } from '../../actions';
import { analytics } from '../../store';
import { uuid } from '../../constants';
import styles from './ContentFeedStyles';

class BookmarkIcon extends React.Component {
  constructor(props) {
    super(props);
	}
	
	render() {
		if (this.props.bookmarkIDSet) {
			return (
				<Icon
					name={ this.props.bookmarkIDSet.has(this.props.item._id) ? 'ios-bookmark' : 'ios-bookmark-outline'}
					color={ this.props.bookmarkIDSet.has(this.props.item._id) ? '#ff404e' : '#282828'}
					type='ionicon'
					containerStyle={styles.bookmarkIcon}
					onPress={() => {
						if (this.props.bookmarkIDSet.has(this.props.item._id)) {
							this.props.bookmarkIDSet.delete(this.props.item._id);
							analytics.track({
								userId: uuid,
								event: 'Unbookmark',
								properties: {
									contentTitle: this.props.item.title,
								}
							});
						} else {
							this.props.bookmarkIDSet.add(this.props.item._id);
							analytics.track({
								userId: uuid,
								event: 'Bookmark',
								properties: {
									contentTitle: this.props.item.title,
								}
							});
						}
						this.props.updateUser({ 
							fields: {bookmarks: [...this.props.bookmarkIDSet]}, 
							id: this.props.user._id,
						});
					}}
				/>
			);
		}
	}
}

const mapStateToProps = state => ({
	user: state.user.user,
	bookmarkIDSet: state.user.bookmarkIDSet,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	updateUser: userActions.updateUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkIcon);
