import Header from '../components/Header';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists.list
  };
};

export default connect(
  mapStateToProps
)(Header);