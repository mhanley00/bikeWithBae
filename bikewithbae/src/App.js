import React, { Component } from 'react';
import jump from '../src/api/jump';
import cabi from '../src/api/cabi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jumpBikes: undefined,
      caBiBikes: undefined
    };
  }

  
  getJumpBikes () {
    jump
    .search()
    .then(res => {
      this.setState({ jumpBikes: res });
    })
    .catch(err => console.log(err));
  }

  getCaBiBikes() {
    cabi
    .search()
    .then(res => {
      this.setState({caBiBikes: res});
    })
    .catch(err => console.log(err));
  }

    componentDidMount() {
      this.getJumpBikes();
      this.getCaBiBikes();
    }

  render() {
    
    return (
      <div className='App'>
        {this.state.jumpBikes && (
          <div className='jump-bikes'>
          <h2>Here are where all the Jump Bikes are...</h2>
          {this.state.jumpBikes.map(jumpBike => (
            <div>
              <p key={jumpBike.bike_id}>Charge level {jumpBike.jump_ebike_battery_level}</p>
              <p key={[jumpBike.lat, jumpBike.lon]}>{jumpBike.lat}{jumpBike.lon}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;