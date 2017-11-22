import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AppFooter from '../AppFooter/AppFooter'
import AppHeader from '../AppHeader/AppHeader'
import HomePage from '../HomePage/HomePage'
import ProfilePage from '../ProfilePage/ProfilePage'

import './app.css'

const App = () => (
  <Router>
    <div className="app">
      <AppHeader />
      <section className="app-content">
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/profile/:username"
          render={({ match }) => <ProfilePage username={match.params.username} />}
        />
        <Route exact path="/download" render={() => 'Download'} />
      </section>
      <AppFooter />
    </div>
  </Router>
)

export default App