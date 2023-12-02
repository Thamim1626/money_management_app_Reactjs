import './index.css'

const MoneyDetails = props => {
  const {eachItem} = props
  const {color, amount, imgUrl, alt, des} = eachItem
  const itemClass = `expensive-item ${color}`

  return (
    <li className={itemClass}>
      <img src={imgUrl} alt={alt} className="expensive-img" />
      <div className="expensive-details">
        <p className="expensive-details-des">{des}</p>
        <h1 className="expensive-details-price"> Rs {amount}</h1>
      </div>
    </li>
  )
}

export default MoneyDetails
