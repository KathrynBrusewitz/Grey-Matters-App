import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { validate } from 'validate.js';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import { Link } from 'react-router-native';
import { userActions } from '../../actions';
import { profileActions } from '../../actions';
import styles from '../../styles';
import {signupValidation} from './validation';
import PolicyDialog from './PolicyDialog';


class Signup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearMessage();
  }

  onPress() {
    let name = !this.name ? null : this.name.trim();
    let email = !this.email ? this.email : this.email.trim();
    let password = !this.password ? this.password : this.password.trim();
    let confirmPassword = !this.confirmPassword ? this.confirmPassword : this.confirmPassword.trim();
    let errors = validate({ email, password, newPassword: confirmPassword }, signupValidation);
    if (errors) {
      for (let key in errors) {
        this.props.errorMessage(errors[key][0]);
        break;
      }
    } else if (password != confirmPassword) {
      this.props.errorMessage('Your password and password confirmation do not match');
    } else {
      this.props.clearMessage();
      this.props.signup({ name, email, password, history: this.props.history });
    }
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <View style={styles.formInput}>
          <FormInput
            placeholder='Name'
            autoCapitalize='words'
            onChangeText={(text) => this.name = text}
          />
        </View>
        <View
          style={styles.formInput}
        >
          <FormInput
            placeholder='Email Address'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => this.email = text}
          />
        </View>
        <View
          style={styles.formInput}
        >
          <FormInput
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(text) => this.password = text}
          />
        </View>
        <View
          style={styles.formInput}
        >
          <FormInput
            placeholder='Confirm Password'
            secureTextEntry={true}
            onChangeText={(text) => this.confirmPassword = text}
          />
        </View>
        <Text style={[styles.userConsent]} >
          By signing up you agree to our
          <Text
            style={styles.blue}
            onPress={() => {
              this.props.showPrivacyPolicy();
            }}
          >
            {' Privacy Policy'}.
          </Text>
        </Text>
        <Button
          title='Sign Up'
          buttonStyle={{ marginTop: 20, marginBottom: 20 }}
          onPress={() => this.onPress()}
        />
        <Link to="/login" underlayColor={'white'}>
          <Text style={{ textAlign: 'center' }}>
            Already a Member? <Text style={styles.blue}>login</Text>
          </Text>
        </Link>
        {this.props.message && <Text style={[styles.formMessage, styles.red]}>{this.props.message}</Text>}
        {this.props.privacyPolicyVisible && <PolicyDialog />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  message: state.user.message,
  privacyPolicyVisible: state.profile.privacyPolicyVisible,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signup: userActions.signup,
  clearMessage: userActions.clearMessage,
  errorMessage: userActions.errorMessage,
  showPrivacyPolicy: profileActions.showPrivacyPolicy,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
