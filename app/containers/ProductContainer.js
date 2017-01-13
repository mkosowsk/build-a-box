import Product from '../components/Product';
import { connect } from 'react-redux';
import {receiveCart} from '../action-creators/cart';




const mapStateToProps = (state) => {
	return {
		selectedProduct: state.products.selected
	};
};

const mapDispatchToProps = (dispatch) => {

	return{
		
		addProductToCart (product){
		 axios.post('/api/')
		}
	}
}

export default connect(mapStateToProps)(Product);
