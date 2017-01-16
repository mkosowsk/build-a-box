import Cart from '../components/Cart';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		selectedCart: state.cart.list
	};
};



export default connect(mapStateToProps)(Cart);
