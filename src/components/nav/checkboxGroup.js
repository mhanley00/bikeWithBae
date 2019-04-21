import React, { Component } from 'react';

//Components
import BikeBrand from './bikeBrand';

//Material UI components
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});
export class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    const brand = props.definition.name;

    this.state = {
      title: brand,
      checked: false
    };
  }
  render() {
    const { definition } = this.props;

    return (
        <div>
          <List>
          {definition.input.inputs.map(option => {
              return <BikeBrand key={option.label} label={option.label} checked={option.checked}/>;
            })}
          </List>
        </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(CheckboxGroup);
