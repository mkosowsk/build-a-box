import Checkout from '../components/Checkout';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		selectedCart: state.cart.list
	};
};



export default connect(mapStateToProps)(Checkout);