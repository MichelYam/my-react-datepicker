# simple datePicker library of React components created using `create-react-app`

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```text
npm install my-react-datepicker --save
```

...or using yarn:

```text
yarn add my-react-datepicker --save
```

## Node usage

- ``selectedDate`` (string): variable controlling the display of the date selected
- ``onChange`` (function): action triggered when changing date

### optional

- ``customHeader`` (object): custom header of datepicker
- ``format`` (string): customize date format
- ``inputId`` (string): customize id
- ``monthsList`` (array): array of months
- ``yearsList`` (array): array of years

Here is a simple example, with report data injected directly as an object:

```tsx
import React, { useState } from 'react';
import DatePicker from "my-react-datepicker";
const App = () => {
  const [value, setValue] = useState("")
  return (
      <Datepicker
        selectedDate={startDate} 
        onChange={setStartDate} //when day is clicked
      />
    )
}
```

## Configuration

## Examples

easy to use

``` tsx
 const [value, setValue] = useState("")
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
    const years = range(1990, getYear(new Date()) + 1, 1);
  <Datepicker
    dateFormat='DD/MM/YYYY'
    selectedDate={startDate}
    onChange={(value: any) => setValue(value)}
    monthsList={months}
    yearsList={years}
    />
```

You can customize datePicker header with you own styles like:

```tsx
 const [value, setValue] = useState("")
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
    const years = range(1990, getYear(new Date()) + 1, 1);
  return (
       <Datepicker selectedDate={startDate} onChange={setStartDate}
        customHeader={({
          currentMonth,
          currentYear,
          changeMonth,
          changeYear,
          prev,
          next,
        }) => (
          <div>
            <button onClick={prev}>
              {"<"}
            </button>
            <select
              value={months[currentMonth as unknown as number]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={currentYear}
              onChange={({ target: { value } }: any) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={next} >
              {">"}
            </button>
          </div>
        )}
      />
    )
```
