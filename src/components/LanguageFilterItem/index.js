// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFilterDetails, setActiveLanguageFilterId} = props
  const {language} = languageFilterDetails
  const btnClassName = isActive
    ? 'language-filter-btn active-language-filter-btn'
    : 'language-filter-btn'

  const onClickLanguageFilterButton = () => {
    const {id} = languageFilterDetails
    setActiveLanguageFilterId(id)
  }

  return (
    <li>
      <button
        type="button"
        className={btnClassName}
        onClick={onClickLanguageFilterButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
