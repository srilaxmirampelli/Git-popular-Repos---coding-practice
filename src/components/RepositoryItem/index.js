// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repositoryData
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="repository-image" />
      <h1 className="repository-name">{name}</h1>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stats-icon"
        />
        <p className="stats-count">{starsCount}</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stats-icon"
        />
        <p className="stats-count">{forksCount}</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stats-icon"
        />
        <p className="stats-count">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
