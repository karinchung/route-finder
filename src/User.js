import React, {Component} from 'react'
import clientAuth from './clientAuth.js'
import Maps from './Maps.js'
import './User.css'

class User extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      loggedIn: false,
      view: 'home'
    }
  }

  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
      view: 'home'
    })
}

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data) => {
      console.log(data)
      this.setState({
        view: 'login'
      })
    })
  }

  _logIn(credentials) {
    console.log(credentials)
    clientAuth.logIn(credentials).then(user => {
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: 'home'
      })
    })
  }

  _logOut() {
    clientAuth.logOut().then(message => {
      console.log(message)
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'home'
      })
    })
  }

  _setView(evt) {
  evt.preventDefault()
  const view = evt.target.name
  this.setState({
    view: view
  })
}

render() {
  return (
      <div>
          <button name='home' onClick={this._setView.bind(this)}>Home</button>
          {!this.state.loggedIn && (
              <button name='signup' onClick={this._setView.bind(this)}>Sign Up</button>
          )}
          {!this.state.loggedIn && (
            <button name='login' onClick={this._setView.bind(this)}>Log In</button>
          )}
          {this.state.loggedIn && (
            <button onClick={this._logOut.bind(this)}>Log Out: {this.state.currentUser.name}</button>
          )}
        {{
          home: <div id="map"><Maps /></div>,
          login: <LogIn onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />
        }[this.state.view]}
      </div>
  )
}
//// end component
}


class SignUp extends Component {
  _handleSignup(evt) {
    evt.preventDefault()
    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onSignup(newUser)
  }

  render() {
    return (
      <div className='signUpContainer'>
        <h2>Sign Up</h2>
        <form onSubmit={this._handleSignup.bind(this)}>
          <input type='text' placeholder='Name' ref='name' />
          <input type='text' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button className="button-primary" type='submit'>Create Account</button>
        </form>
      </div>
    )
  }
}

class LogIn extends Component {
  _handleLogin(evt) {
    evt.preventDefault()
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onLogin(credentials)
  }

  render() {
    return (
      <div className='logInContainer'>
        <h2>Log In</h2>
        <form onSubmit={this._handleLogin.bind(this)}>
          <input type='text' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button className="button-primary" type='submit'>Log In</button>
        </form>
      </div>
    )
  }
}

export default User
