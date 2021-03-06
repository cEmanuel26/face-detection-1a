import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

const particlesOptions = {
  absorbers: [],
  background: {
    color: {
      value: '#0d47a1',
    },
    image: '',
    position: '50% 50%',
    repeat: 'no-repeat',
    size: 'cover',
  },
  backgroundMask: {
    cover: {
      color: {
        value: '#fff',
      },
      opacity: 1,
    },
    enable: false,
  },
  detectRetina: true,
  emitters: [],
  fpsLimit: 30,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onDiv: {
        elementId: '',
        enable: false,
        mode: [],
      },
      onHover: {
        enable: true,
        mode: 'repulse',
        parallax: {
          enable: false,
          force: 2,
          smooth: 10,
        },
      },
      resize: true,
    },
    modes: {
      absorbers: [],
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      connect: {
        distance: 80,
        lineLinked: {
          opacity: 0.5,
        },
        radius: 60,
      },
      emitters: [],
      grab: {
        distance: 400,
        lineLinked: {
          opacity: 1,
        },
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
        speed: 1,
      },
      slow: {
        factor: 3,
        radius: 200,
      },
    },
  },
  particles: {
    collisions: {
      enable: false,
      mode: 'bounce',
    },
    color: {
      value: '#ff0000',
    },
    lineLinked: {
      blink: false,
      color: {
        value: '#ffffff',
      },
      consent: false,
      distance: 150,
      enable: true,
      opacity: 0.4,
      shadow: {
        blur: 5,
        color: {
          value: 'lime',
        },
        enable: false,
      },
      width: 1,
    },
    move: {
      attract: {
        enable: false,
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      direction: 'none',
      enable: true,
      outMode: 'out',
      random: false,
      speed: 2,
      straight: false,
      trail: {
        enable: false,
        length: 10,
        fillColor: {
          value: '#000000',
        },
      },
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      limit: 0,
      value: 80,
    },
    opacity: {
      animation: {
        enable: true,
        minimumValue: 0.1,
        speed: 3,
        sync: false,
      },
      random: {
        enable: true,
        minimumValue: 1,
      },
      value: 0.5,
    },
    rotate: {
      animation: {
        enable: false,
        speed: 0,
        sync: false,
      },
      direction: 'clockwise',
      random: false,
      value: 0,
    },
    shadow: {
      blur: 0,
      color: {
        value: '#000000',
      },
      enable: false,
      offset: {
        x: 0,
        y: 0,
      },
    },
    shape: {
      options: {
        character: {
          fill: true,
          close: true,
          font: 'Verdana',
          style: '',
          value: '*',
          weight: '400',
        },
        char: {
          fill: true,
          close: true,
          font: 'Verdana',
          style: '',
          value: '*',
          weight: '400',
        },
        polygon: {
          fill: true,
          close: true,
          sides: 5,
        },
        star: {
          fill: true,
          close: true,
          sides: 5,
        },
      },
      image: {
        fill: true,
        close: true,
        height: 100,
        replaceColor: true,
        src: 'https://cdn.matteobruni.it/images/particles/github.svg',
        width: 100,
      },
      type: 'circle',
    },
    size: {
      animation: {
        enable: true,
        minimumValue: 0.1,
        speed: 20,
        sync: false,
      },
      random: {
        enable: true,
        minimumValue: 1,
      },
      value: 5,
    },
    stroke: {
      color: {
        value: '#000000',
      },
      width: 0,
      opacity: 1,
    },
    twinkle: {
      lines: {
        enable: true,
        frequency: 0.005,
        opacity: 1,
        color: {
          value: '#ff0000',
        },
      },
      particles: {
        enable: true,
        frequency: 0.05,
        opacity: 1,
        color: {
          value: '#ffff00',
        },
      },
    },
  },
  pauseOnBlur: true,
  polygon: {
    draw: {
      enable: false,
      stroke: {
        color: {
          value: '#fff',
        },
        width: 0.5,
        opacity: 1,
      },
    },
    enable: false,
    inline: {
      arrangement: 'one-per-point',
    },
    move: {
      radius: 10,
      type: 'path',
    },
    scale: 1,
    type: 'none',
    url: '',
  },
};

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calcululateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map((box) => {
      return box.region_info.bounding_box;
    });
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = clarifaiFace.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });

    return box;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://mighty-fjord-76547.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('https://mighty-fjord-76547.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calcululateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
