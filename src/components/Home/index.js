import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {async} from 'fast-glob'
import TeamCard from '../TeamCard'

import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {isLoading: true, teams: []}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const responce = await fetch(teamsApiUrl)
    const fetchedData = await responce.json()
    const formattedData = fetchedData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageUrl: team.team_image_url,
    }))
    this.setTeams(formattedData, false)
  }

  setTeams = (formattedData, isLoading) => {
    this.setState({teams: formattedData, isLoading})
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height="50" />
    </div>
  )

  renderTeamsList = () => {
    const {teams} = this.state
    return (
      <ul className="teams-list">
        {teams.map(teamData => (
          <TeamCard key={teamData.id} teamData={teamData} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-container">
        <div className="logo-title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="home-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? this.renderLoader() : this.renderTeamsList()}
      </div>
    )
  }
}

export default Home
