import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import { Link } from 'react-router-native';
import { userActions } from '../../actions';
import styles from '../../styles.js';


class Signup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearMessage();
  }

  render() {
    return (
      <View>
        <FormInput
          placeholder='Name'
          onChangeText={(text) => this.name = text}
        />
        <FormInput
          placeholder='Email Address'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => this.email = text}
        />
        <FormInput
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.password = text}
        />
        <FormInput
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={(text) => this.confirmPassword = text}
        />
        <Button
          title='Sign Up'
          buttonStyle={{marginTop: 20, marginBottom: 20}}
          onPress={() => this.props.signup({
            name: this.name,
            email: this.email, 
            password: this.password,
          })}
        />
        <Link to="/login" >
          <Text style={{textAlign: 'center'}}>
            Already a Member? <Text style={{textDecorationLine: 'underline'}}>login</Text>
          </Text>
        </Link>
        {this.props.message && <Text style={styles.formError}>{this.props.message}</Text>}
      </View>
    );
  }
}

const mapStateToProps = state => ({
	message: state.user.message
});
  
const mapDispatchToProps = dispatch => bindActionCreators({
  signup: userActions.signup,
  clearMessage: userActions.clearMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);