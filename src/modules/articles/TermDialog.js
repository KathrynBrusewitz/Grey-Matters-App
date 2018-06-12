import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-native';
import { Dialog, Button } from 'react-native-ui-lib';
import {
  Text,
  View,
} from 'react-native';
import styles from './ArticleStyles';
import { termsActions } from '../../actions';

class TermDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
				<Dialog
					visible={true}
					width="100%"
					height="35%"
					bottom
					centerH
					animationConfig={{duration: 250}}
				>
					<View style={styles.dialog}>
						{
							this.props.term ? (
								<View>
									<Text style={styles.term}>{this.props.term.term}</Text>
									<Link to={`/terms/${this.props.term._id}`} underlayColor={'white'}>
										<Text>{this.props.term.definition}</Text>
									</Link>
								</View>
							) : (
								<View>
									<Text>This term has been removed from the database and is currently unavailable.</Text>
								</View>
							)
						}
						<View >
							<Button text60 label="Done" link onPress={() => this.props.clearTerm()} />
						</View>
					</View>
				</Dialog>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  clearTerm: termsActions.clearTerm,
}, dispatch);

export default connect(null, mapDispatchToProps)(TermDialog);
