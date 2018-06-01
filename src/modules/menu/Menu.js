import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { menuActions } from '../../actions';
import MenuLinks from './MenuLinks';
import styles from '../../styles';

const Menu = (props) => (
    props.show 
    ? (
      <TouchableWithoutFeedback onPress={() => props.showMenu(false)}>
        <View style={styles.overlay}>
          <MenuLinks />
        </View>
      </TouchableWithoutFeedback>
    )
    : null
)

const mapStateToProps = state => ({
  show: state.menu.show,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showMenu: menuActions.showMenu,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
 