import React from 'react'
import PropTypes from 'prop-types'
// import './stylesheets/datepicker.css'

type Props = {
  value: string | number
  year?: string | number
  month?: string | number
  selected?: boolean
  otherMonth: boolean | string
  setDaySelected: ({ }) => void
}

/**
 * 
 * @param {number} value id of the week
 * @param {boolean} selected check is the day is selected
 * @param {string} otherMonth check if is previous or next month
 * @param {string} month current month
 * @param {string} year current year
 * @param {function} setDaySelected set day selected
 * @returns {JsxElement} return day
 */
const Index = ({ value, selected, otherMonth, setDaySelected, year, month }: Props) => {
  
  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.dataset.day
    const date = parseInt(target!, 10) < 10 ? '0' + target : target
    setDaySelected({
      day: date,
      otherMonth: e.currentTarget.dataset.month,
      month: month,
      year: year,
    })
  }
  const isMonth = otherMonth === false ? '' : otherMonth === 'previous-month' ? 'previous-month' : 'next-month'
  return (
    <span
      data-day={value}
      data-month={isMonth}
      className={`day ${isMonth}${selected ? 'selected' : ''}`}
      onClick={handleOnClick}
    >
      {value}
    </span>
  )
}

export default Index

Index.prototype = {
  value: PropTypes.string,
  selected: PropTypes.string,
  otherMonth: PropTypes.string,
  month: PropTypes.string,
  setDaySelected: PropTypes.func,
  year: PropTypes.string,
}
