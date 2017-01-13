import Product from '../components/Product';
import { connect } from 'react-redux';
import {receiveCart, addProductToCart} from '../action-creators/cart';




const mapStateToProps = (state) => {
	return {
		selectedProduct: state.products.selected
	};
};

const mapDispatchToProps = (dispatch) => {

	return{
		
		addProductToCart (product){
		 store.dispatch()
		}
	}
}

export default connect(mapStateToProps)(Product);
