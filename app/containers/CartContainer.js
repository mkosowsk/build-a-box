import Cart from '../components/Cart';
import { connect } from 'react-redux';
import {createOrder} from '../action-creators/cart'

const mapStateToProps = (state) => {
	return {
		selectedCart: state.cart.list
	};
};

// const mapDispatch = (createOrder) => dispatch => {
// 	return {
// 		createOrder
// 	}
// }


export default connect(mapStateToProps)(Cart);
