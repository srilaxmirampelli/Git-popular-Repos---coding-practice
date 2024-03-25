import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repositoriesList: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getGithubRepos()
  }

  getGithubRepos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeLanguageFilterId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(githubReposApiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))

      this.setState({
        repositoriesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoriesSuccessView = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="github-repos-list">
        {repositoriesList.map(repo => (
          <RepositoryItem key={repo.id} repositoryData={repo} />
        ))}
      </ul>
    )
  }

  renderRepositoriesData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState(
      {
        apiStatus: apiStatusConstants.inProgress,
        activeLanguageFilterId: newFilterId,
      },
      this.getGithubRepos,
    )
  }

  renderLanguageFiltersData = () => {
    const {activeLanguageFilterId} = this.state
    return (
      <ul className="language-filters-list">
        {languageFiltersData.map(languageItem => (
          <LanguageFilterItem
            key={languageItem.id}
            isActive={activeLanguageFilterId === languageItem.id}
            languageFilterDetails={languageItem}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="main-heading">Popular</h1>
          {this.renderLanguageFiltersData()}
          {this.renderRepositoriesData()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
