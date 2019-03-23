import React, { Component } from 'react';
import jump from '../src/api/jump';
import cabi from '../src/api/cabi';
import bird from '../src/api/bird';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jumpBikes: undefined,
      caBiBikes: undefined,
      birdScooters: undefined
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

  getBirdScooters() {
    bird
    .search()
    .then(res => {
      this.setState({birdScooters: res});
    })
    .catch(err => console.log(err));
  }

    componentDidMount() {
      // this.getJumpBikes();
      // this.getCaBiBikes();
      this.getBirdScooters();
    }

  render() {
    
    return (
      <div className='App'>
        {/* {this.state.jumpBikes && (
          <div className='jump-bikes'>
          <h2>Here are where all the Jump Bikes are...</h2>
          {this.state.jumpBikes.map(jumpBike => (
            <div>
              <p key={jumpBike.bike_id}>Charge level {jumpBike.jump_ebike_battery_level}</p>
              <p key={[jumpBike.lat, jumpBike.lon]}>{jumpBike.lat}{jumpBike.lon}</p>
              </div>
            ))}
          </div>
        )} */}
        {this.state.birdScooters && (
          <div className='bird-scooters'>
          <h2>Here are where all the Bird Scooters are...</h2>
          {this.state.birdScooters.map(birdScooter => (
            <div>
              <p key={birdScooter.id}>Charge level {birdScooter.battery_level}</p>
              <p key={[birdScooter.location.latitude, birdScooter.location.longitude]}>{birdScooter.location.latitude}{birdScooter.location.longitude}</p>
              </div>
            ))}
          </div>
        )} 
      </div>
    );
  }
}

export default App;