
import Reviews from '../components/Reviews';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews.list
  };
};



export default connect(
  mapStateToProps
)(Reviews);