import React, { Component } from 'react';

//Components
import BikeBrand from './bikeBrand';

//Material UI components
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';


export class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    const brand = props.definition;
    // .options.map( option => option.label);
    console.log(brand);
    this.state = {
      title: brand,
      checked: false
    };
  }
  render() {
    const { definition } = this.props;

    return (
        <div>
          {/* <Typography>{definition.text}</Typography> */}
          <List>
          {definition.input.inputs.map(option => {
              return <BikeBrand key={option.label} label={option.label} checked={option.checked}/>;
            })}
          </List>
        </div>
    );
  }
}
export default CheckboxGroup;
