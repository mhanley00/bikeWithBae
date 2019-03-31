import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import LayerToggle from './layerToggle';

//Material-UI components
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

//SASS
import './layersController.scss';
export class LayersController extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log('MOUNTED', this.props.layers);
  }
  // handleClick = () => {
  //   const layer = getLayerByID(this.props.layerId);
  //TODO: Find out if client wants this button or not, initial state is saved in layerToggle
  //   this.setState({
  //     title: layer.title,
  //     visible: layer.visible,
  //     opacity: layer.opacity
  //   });
  // };


  render() {
    const { title } = this.props;

    return (
      <div >
          <Typography variant='title' className=''>
          {title}
          </Typography>
        <div>
        {this.props.layers.map(layerId => {
          return <LayerToggle layerId={layerId} key={layerId} />;
        })}
        </div>
        {/* <Button
          variant='contained'
          href='#'
          className='button'
          // onClick={this.handleClick}
        >
          Reset
        </Button> */}
      </div>
    );
  }
}

const mapStateToProps = ({ mapview: { layers }}) => ({
  layers
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LayersController);
