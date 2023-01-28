import {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-bg-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt=" website logo"
            className="logo"
          />
          <button
            type="button"
            className="logout-btn"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="home-container">
          <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="card-img"
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
