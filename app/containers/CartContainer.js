import Cart from '../components/Cart';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		selectedCart: state.cart.selected
	};
};

export default connect(mapStateToProps)(Cart);
