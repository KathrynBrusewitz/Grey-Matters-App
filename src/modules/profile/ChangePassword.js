import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, FormInput } from 'react-native-elements';
import { validate } from 'validate.js';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { userActions } from '../../actions';
import { changePasswordValidation } from './validation';
import styles from '../../styles';


class ChangePassword extends Component {
	constructor(props) {
	  super(props);
	}

	componentDidMount() {
		this.props.clearMessage();
		this.props.clearConfirmation();
	}

	onPress() {
    let currentPassword = !this.currentPassword ? this.currentPassword : this.currentPassword.trim();
    let newPassword = !this.newPassword ? this.newPassword : this.newPassword.trim();
    let confirmNewPassword = !this.confirmNewPassword ? this.confirmNewPassword : this.confirmNewPassword.trim();
    let errors = validate({ currentPassword, newPassword }, changePasswordValidation);
    if (errors) {
      for (let key in errors) {
        this.props.errorMessage(errors[key][0]);
        break;
      }
    } else if (newPassword != confirmNewPassword) {
      this.props.errorMessage('Your password and password confirmation do not match');
    } else {
      this.props.clearMessage();
			this.props.updateUser({ 
				fields: {currentPassword, newPassword}, 
				id: this.props.user._id, 
			});
    }
  }

	render() {
    return (
			<View style={styles.formContainer}>
				<View style={styles.formInput}>
					<FormInput
						placeholder='Current Password'
						secureTextEntry={true}
						onChangeText={(text) => this.currentPassword = text}
					/>
				</View>
				<View style={styles.formInput}>
					<FormInput
						placeholder='New Password'
						secureTextEntry={true}
						onChangeText={(text) => this.newPassword = text}
					/>
				</View>
				<View style={styles.formInput}>
					<FormInput
						placeholder='Confirm New Password'
						secureTextEntry={true}
						onChangeText={(text) => this.confirmNewPassword = text}
					/>
				</View>
				<Button
					title='Submit'
					onPress={() => this.onPress()}
				/>
				{this.props.message 
				&& <Text style={[styles.formMessage, styles.red]}>{this.props.message}</Text>}
				{this.props.confirmation && <Text style={[styles.formMessage, styles.green]}>{this.props.confirmation}</Text>}
			</View>
    );
	}
}

const mapStateToProps = state => ({
  user: state.user.user,
	token: state.user.token,
	message: state.user.message,
	confirmation: state.user.confirmation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	updateUser: userActions.updateUser,
	clearConfirmation: userActions.clearConfirmation,
	clearMessage: userActions.clearMessage,
  errorMessage: userActions.errorMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
