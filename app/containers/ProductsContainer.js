
import Products from '../components/Products';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  console.log("STATETETETE", state)
  return {
    products: state.list
  };
};


export default connect(
  mapStateToProps
)(Products);