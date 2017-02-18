import React from 'react';
import { Text, View } from 'react-native';
import { Route, matchPath as Match, MemoryRouter as Router } from 'react-router';
import styles from './styles';
import Nav from './containers/Nav/Nav';
import MiniNav from './containers/Nav/MiniNav';
import MapViewer from './components/MapView/MapView';
import Rabble from './containers/Rabble/Rabble';
import VenueSchedule from './components/VenueSchedule/VenueSchedule';
import InviteFriends from './components/InviteFriends/InviteFriends';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user_fb_id: '444der',
      fullMenu: false,
      rabble: [
        { fb_id: '111smi', group_id: '12345', name: 'Smriti', img: 'https://facebook.github.io/react/img/logo_og.png' },
        { fb_id: '222john', group_id: '12345', name: 'John', img: 'https://facebook.github.io/react/img/logo_og.png' },
        { fb_id: '333pat', group_id: '12345', name: 'Pat', img: 'https://facebook.github.io/react/img/logo_og.png' },
        { fb_id: '444der', group_id: '12345', name: 'Derek', img: 'https://facebook.github.io/react/img/logo_og.png' }
      ],
      rabble_loc: {
        '111smi': { fb_id: '111smi', group_id: '12345', lat: 37.76998, long: -122.49298 },
        '222john': { fb_id: '222john', group_id: '12345', lat: 37.76772, long: -122.49438 },
        '333pat': { fb_id: '333pat', group_id: '12345', lat: 37.76757, long: -122.49427 },
        '444der': { fb_id: '444der', group_id: '12345', lat: 37.76837, long: -122.48994 }
      },
      geo_fences: [
        { name: 'Lands End Stage', type: 'venue', lat: 37.76766, long: -122.49479, radius: 50 },
        { name: 'Sutro Stage', type: 'venue', lat: 37.76992, long: -122.49341, radius: 50 },
        { name: 'Panhandle Stage', type: 'venue', lat: 37.76984, long: -122.48619, radius: 30 },
        { name: 'Twin Peaks Stage', type: 'venue', lat: 37.76974, long: -122.48303, radius: 30 },
        { name: 'Basecamp', type: 'group', lat: 37.7683, long: -122.49002, radius: 10 }
      ]
    };
  }

  render() {
    if (false) {
      return (
        <Router>
          <View style={styles.container}>
            <Nav swapView={this.swapView.bind(this)}/>
            {this.views[this.state.selected]}
          </View>
        </Router>
      );
    }
    return (
      <Router>
        <View style={styles.container}>
          <this.NavMenu />
          <Route exact path="/" component={MapViewer}/>
          <Route path="/rabble" component={() => (
            <Rabble
              user_id={this.state.user_fb_id}
              rabble={this.state.rabble}
              rabble_loc={this.state.rabble_loc}
              geo_fences={this.state.geo_fences}
              sortRabble={this.sortRabble.bind(this)}
            />
          )}/>
          <Route path="/agenda" component={() => <View><Text>User Schedule Holder</Text></View>}/>
          <Route path="/schedule" component={VenueSchedule}/>
          <Route path="/emergency" component={() => <View><Text>Emergency Info Holder</Text></View>}/>
          <Route path="/invite" component={InviteFriends}/>
        </View>
      </Router>
    );
  }

  NavMenu = () => {
    if (this.state.fullMenu) {
      return (
        <View>
          <Nav toggleMenu={this.toggleMenu.bind(this)}/>
          <MiniNav toggleMenu={this.toggleMenu.bind(this)}/>
        </View>
      );
    }
    return <MiniNav toggleMenu={this.toggleMenu.bind(this)}/>;
  };

  toggleMenu(hide = !this.state.fullMenu) {
    this.setState({
      fullMenu: hide
    });
  }

  sortRabble(method) {
    const sortedRabble = this.state.rabble.sort(sortAZ);
    console.log(sortedRabble);
    //Need to change how views are rendered for sort to work
    //this.views
    this.setState({
      rabble: sortedRabble
    });
  }
}

function sortAZ(a, b) {
  if(a.name < b.name) return -1;
  if(a.name > b.name) return 1;
  return 0;
}
