import './index.css'

const TransactionItem = props => {
  const {eachItem, transationItemDel} = props
  const {type, amount, title, id} = eachItem
  const delItem = () => {
    transationItemDel(id)
  }
  return (
    <tr className="tabel-row">
      <td className="cell">{title}</td>
      <td className="cell">Rs {amount}</td>
      <td className="cell">{type}</td>
      <td className="cell">
        <button
          type="button"
          data-testid="delete"
          onClick={delItem}
          className="del-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="del-img"
          />
        </button>
      </td>
    </tr>
  )
}

export default TransactionItem
