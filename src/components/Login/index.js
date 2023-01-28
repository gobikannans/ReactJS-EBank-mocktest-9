import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showErrorMsg: false, errorMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: userId, pin}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-container">
          <div className="login-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login"
            />
          </div>
          <div className="form-details-container">
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Welcome Back!</h1>
              <label htmlFor="username" className="label">
                User ID
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter User ID"
                className="input"
                value={userId}
                onChange={this.onChangeUserId}
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                placeholder="Enter PIN"
                className="input"
                value={pin}
                onChange={this.onChangePin}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
