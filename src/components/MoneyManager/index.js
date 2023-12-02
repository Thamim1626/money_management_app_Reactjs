import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const balanceColorDetails = [
  {
    id: 'BALANCE',
    amount: 2000,
    color: 'green',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    alt: 'balance',
    des: 'Your Balance',
  },
  {
    id: 'INCOME',
    amount: 2000,
    color: 'blue',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    alt: 'income',
    des: 'Your Income',
  },
  {
    id: 'EXPENSES',
    amount: 0,
    color: 'purple',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    alt: 'expenses',
    des: 'Your Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    source: 'income',
    title: '',
    amount: '',
    trasnsatationList: [],
    balanceColorDetail: balanceColorDetails,
    totalIncome: 0,
    totalExpenses: 0,
  }

  transationItemDel = id => {
    const {trasnsatationList} = this.state
    const filterTransationList = trasnsatationList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({trasnsatationList: [...filterTransationList]})
  }

  onChangeOption = event => {
    this.setState({source: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  SubmitForm = async event => {
    event.preventDefault()
    const {
      trasnsatationList,
      source,
      title,
      amount,
      balanceColorDetail,
    } = this.state
    const singleTrasnsatationList = {
      id: uuidv4(),
      type: source,
      title,
      amount,
    }
    await this.setState({
      trasnsatationList: [...trasnsatationList, singleTrasnsatationList],
    })

    if (source === 'income') {
      this.setState(prevState => ({
        totalIncome: prevState.totalIncome + parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        totalExpenses: prevState.totalExpenses + parseInt(amount),
      }))
    }

    const filterBalanceColorDetail = await balanceColorDetail.map(eachItem => {
      const {totalIncome, totalExpenses} = this.state
      if (eachItem.id === 'INCOME') {
        return {
          ...eachItem,
          amount: eachItem.amount + totalIncome,
        }
      }
      if (eachItem.id === 'EXPENSES') {
        return {
          ...eachItem,
          amount: eachItem.amount + totalExpenses,
        }
      }
      return {
        ...eachItem,
        amount: eachItem.amount + totalIncome - totalExpenses,
      }
    })
    this.setState({balanceColorDetail: filterBalanceColorDetail})
  }

  render() {
    const {
      trasnsatationList,
      totalExpenses,
      totalIncome,
      balanceColorDetail,
    } = this.state
    console.log(balanceColorDetail)
    return (
      <div className="main-container">
        <div className="header">
          <h1 className="header-heading">Hi, Al-Ansari</h1>
          <p className="header-des">
            Welcome back to your{' '}
            <span className="header-des-span">MONEY MANAGER</span>{' '}
          </p>
        </div>
        <ul className="incomepf-list">
          {balanceColorDetail.map(eachItem => (
            <MoneyDetails
              eachItem={eachItem}
              key={eachItem.id}
              trasnsatationList={trasnsatationList}
            />
          ))}
        </ul>

        <div className="transation-container">
          <div className="input-card">
            <h1 className="input-heading">Add Transactions</h1>
            <form className="transaction-form" onSubmit={this.SubmitForm}>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                type="text"
                placeholder="TITLE"
                className="input"
                id="title"
                onChange={this.onChangeTitle}
              />
              <br />
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <br />
              <input
                type="number"
                className="input"
                placeholder="AMOUNT"
                id="amount"
                onChange={this.onChangeAmount}
              />
              <br />
              <label htmlFor="type" className="label">
                TYPE
              </label>
              <br />
              <select
                className="input"
                name="options"
                onClick={this.onChangeOption}
              >
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
              <button className="form-button" type="submit">
                Add
              </button>
            </form>
          </div>

          <div className="transaction-card">
            <h1 className="input-heading">History</h1>
            <table id="dataTable" className="card-tabal">
              <thead className="tabel-head">
                <tr className="tabel-row">
                  <th className="cell">TITLE</th>
                  <th className="cell">AMOUNT</th>
                  <th className="cell">TYPE</th>
                  <th className="cell">{}</th>
                </tr>
              </thead>
              <tbody>
                {trasnsatationList.map(eachItem => (
                  <TransactionItem
                    eachItem={eachItem}
                    key={eachItem.id}
                    transationItemDel={this.transationItemDel}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
