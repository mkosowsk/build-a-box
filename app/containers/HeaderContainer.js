import Header from '../components/Header';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		user: state
	}
}

export default connect(mapStateToProps)(Header);