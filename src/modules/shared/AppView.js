import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NativeRouter, Route, BackButton as RouterBackButton } from 'react-router-native';
import { history } from '../../store';
import { Header } from 'react-native-elements';
import styles from '../../styles.js';

import Menu from '../menu/Menu';
import Home from '../home/Home';
import Articles from '../articles/Articles';
import Article from '../articles/Article';
import Podcasts from '../podcasts/Podcasts';
import Podcast from '../podcasts/Podcast';
import Videos from '../videos/Videos';
import Video from '../videos/Video';
import Events from '../events/Events';
import ClubEvent from '../events/ClubEvent';
import LearningSection from '../learningsection/LearningSection';
import Terms from '../terms/Terms';
import Term from '../terms/Term';
import UserProfile from '../profile/UserProfile';
import CreatorProfile from '../profile/CreatorProfile';
import AppHeader from './AppHeader.js';
import Search from '../search/Search.js';
import Settings from '../profile/Settings';
import Signup from '../profile/Signup.js';
import Login from '../profile/Login.js';
import EditProfile from '../profile/EditProfile';
import ChangePassword from '../profile/ChangePassword';
import ForgotPassword from '../profile/ForgotPassword';
import PrivacyPolicy from '../profile/PrivacyPolicy';
import Support from '../profile/Support';
import Loading from './Loading';

import { userActions } from '../../actions';

class AppView extends React.Component {
  componentDidMount() {
    console.log('AppView component did mount');
    this.props.tokenLogin();
  }

  render () {
    // If there is no current user, we are not authenticated by the API yet
    if (!this.props.currentUser) {
      console.log('You are not authorized by the API. You need to login as basic or with user account.');
      return <Loading text={'Logging in...'} />
    }

    // If current user has no _id, then we are not logged in as a user
    if (!this.props.currentUser._id) {
      console.log('You are logged in for basic reader access (no user account).');
    } else {
      console.log(`You are logged in as user: ${this.props.currentUser.name}`);
    }

    return (
      <NativeRouter history={history} >
        <View style={styles.container}>
          <RouterBackButton />
          <Route path="/" component={AppHeader} />
          <View style={styles.mainContainer}>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/articles" component={Articles} />
            <Route exact path="/articles/:id" component={Article} />
            <Route exact path="/podcasts" component={Podcasts} />
            <Route exact path="/podcasts/:id" component={Podcast} />
            <Route exact path="/videos" component={Videos} />
            <Route exact path="/videos/:id" component={Video} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/events/:id" component={ClubEvent} />
            <Route exact path="/learningsection" component={LearningSection} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/terms/:id" component={Term} />
            <Route exact path="/creatorProfile/:id" component={CreatorProfile} />
            <Route exact path="/userProfile" component={UserProfile} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/editProfile" component={EditProfile} />
            <Route exact path="/changePassword" component={ChangePassword} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
            <Route exact path="/support" component={Support} />
            <Menu />
          </View>
        </View>
      </NativeRouter>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  tokenLogin: userActions.tokenLogin,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
