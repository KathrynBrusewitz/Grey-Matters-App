import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, FormInput } from 'react-native-elements';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { userActions } from '../../actions';
import styles from './SettingsStyles';


class ChangePassword extends Component {
	constructor(props) {
	  super(props);
	}

	onPress() {
    let password = !this.password ? this.password : this.password.trim();
    let newPassword = !this.newPassword ? this.newPassword : this.newPassword.trim();
    let confirmNewPassword = !this.confirmNewPassword ? this.confirmNewPassword : this.confirmNewPassword.trim();
    let errors = validate({ newPassword }, validation);
    if (errors) {
      for (let key in errors) {
        this.props.errorMessage(errors[key][0]);
        break;
      }
    } else if (newPassword != confirmNewPassword) {
      this.props.errorMessage('Your password and password confirmation do not match');
    } else {
      this.props.clearMessage();
			//TODO: put change password action call here
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
				{this.props.message && <Text style={styles.formError}>{this.props.message}</Text>}
			</View>
    );
	}
}

const mapStateToProps = state => ({
  user: state.user.user,
  token: state.user.token,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	updateUser: userActions.updateUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
