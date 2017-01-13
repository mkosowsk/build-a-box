import Product from '../components/Product';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		selectedProduct: state.products.selected
	};
};

export default connect(mapStateToProps)(Product);
