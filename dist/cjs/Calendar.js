"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const CalendarHeader_1 = tslib_1.__importDefault(require("./CalendarHeader"));
const Week_1 = tslib_1.__importDefault(require("./Week"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
/**
 *
 * @param {ReactNode} customHeader customize the header of calendar
 * @param {void} onChange update the date
 * @param {string} selectedDate date selected
 * @param {string} dateFormat format of the date
 * @param {void} setIsOpen update the calendar view
 * @param {RefObject<HTMLInputElement>} datepickerRef
 * @returns JSX Element return calendar
 */
const Index = ({ customHeader, onChange, selectedDate, dateFormat, setIsOpen, datepickerRef, monthsList, yearsList }) => {
    const [currentDateCalendar, setCurrentDateCalendar] = (0, react_1.useState)([]);
    const [currentMonth, setCurrentMonth] = (0, react_1.useState)(new Date().getMonth());
    const [currentYear, setCurrentYear] = (0, react_1.useState)(new Date().getFullYear());
    const [daySelected, setDaySelected] = (0, react_1.useState)({
        day: '',
        month: '',
        year: '',
        otherMonth: '',
    });
    const listOfDay = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    let calendarRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        createCalendar(currentMonth, currentYear);
    }, [daySelected, currentMonth, currentYear]);
    (0, react_1.useEffect)(() => {
        if (daySelected.day !== '')
            checkDaySelected(daySelected);
    }, [daySelected]);
    (0, react_1.useEffect)(() => {
        handleValueInput(selectedDate);
        createCalendar(currentMonth, currentYear);
    }, [selectedDate]);
    (0, react_1.useEffect)(() => {
        document.addEventListener("click", handleWindowMouseDown);
    }, []);
    /**
     * handle the closing of the calendar
     * @param event detect the mouse click
     *
     */
    const handleWindowMouseDown = (event) => {
        var _a, _b;
        if (!(calendarRef.current && datepickerRef.current)) {
            return;
        }
        const eventIsOutside = !((_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)) && calendarRef.current !== event.target;
        const eventIsOnPopoverAnchor = ((_b = datepickerRef.current) === null || _b === void 0 ? void 0 : _b.contains(event.target)) || datepickerRef.current === event.target;
        if (eventIsOutside && !eventIsOnPopoverAnchor) {
            setIsOpen(false);
        }
    };
    /**
     * create a calender with current month and year
     * @param month current Month
     * @param year  currenn Year
     */
    const createCalendar = (month, year) => {
        const firstWeekDay = new Date(year, month, 1).getUTCDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
        let nextDay = 1;
        let currentDate = 1;
        const newArr = [];
        for (let i = 0; i < 6 * 7; i++) {
            if (i < new Date(year, month, 1).getUTCDay()) {
                newArr.push({
                    value: lastDayOfPrevMonth - firstWeekDay + i + 1,
                    selected: false,
                    otherMonth: 'previous-month',
                    month: currentMonth === 0 ? 11 : currentMonth - 1,
                    year: currentMonth === 0 ? currentYear - 1 : currentYear,
                });
            }
            else if (currentDate > lastDay) {
                newArr.push({
                    value: nextDay,
                    selected: false,
                    otherMonth: 'next-month',
                    month: currentMonth === 11 ? 0 : currentMonth + 1,
                    year: currentMonth === 11 ? currentYear + 1 : currentYear,
                });
                nextDay++;
            }
            else {
                newArr.push({
                    value: currentDate,
                    selected: isSameDay(daySelected, currentDate),
                    otherMonth: false,
                    month: currentMonth,
                    year: currentYear,
                });
                currentDate++;
            }
        }
        setCurrentDateCalendar(newArr);
    };
    /**
     * Change the month or year when other months
     * @param daySelected object
     */
    const checkDaySelected = (daySelected) => {
        let newMonth = currentMonth;
        let newYear = currentYear;
        if (daySelected.otherMonth === 'previous-month') {
            if (currentMonth === 0) {
                newYear -= 1;
                newMonth = 11;
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            }
            else {
                newMonth -= 1;
                setCurrentMonth(currentMonth - 1);
            }
            setCurrentMonth(newMonth);
        }
        else if (daySelected.otherMonth === 'next-month') {
            if (currentMonth === 11) {
                newYear += 1;
                newMonth = 0;
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            }
            else {
                newMonth += 1;
                setCurrentMonth(currentMonth + 1);
            }
        }
        const month = newMonth + 1 < 10 ? '0' + (newMonth + 1) : newMonth + 1;
        const year = newYear;
        dateFormat === 'MM/DD/YYYY'
            ? onChange(`${month}/${daySelected.day}/${year}`)
            : onChange(`${daySelected.day}/${month}/${year}`);
        setIsOpen(false);
    };
    /**
     *
     * @param date object : information on the selected date
     * @param currentDate : calendar day
     * @returns true if the date is selected
     */
    const isSameDay = (date, currentDate) => {
        const todayDate = new Date();
        const day = todayDate.getDate();
        const month = todayDate.getMonth();
        const year = todayDate.getFullYear();
        const dateInput = selectedDate.split('/').map(Number);
        // console.log(dateInput);
        if (!date.day && !selectedDate && day === currentDate && month === currentMonth && year === currentYear) {
            return true;
        }
        else if (date && date.day == currentDate && date.month === currentMonth && date.year === currentYear) {
            return true;
        }
        else if (selectedDate &&
            dateInput[0] === currentDate &&
            dateInput[1] - 1 === currentMonth &&
            dateInput[2] === currentYear) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Handle date written by user
     * @param selectedDate the date of user
     */
    const handleValueInput = (selectedDate) => {
        if (dateRegex.test(selectedDate)) {
            const date = selectedDate.split('/').map(Number);
            setCurrentMonth(date[1] - 1);
            setCurrentYear(date[2]);
        }
    };
    /**
     *  set the current month
     */
    const next = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        }
        else {
            setCurrentMonth(currentMonth + 1);
        }
    };
    /**
     * set the current month
     */
    const prev = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        }
        else {
            setCurrentMonth(currentMonth - 1);
        }
    };
    return (react_1.default.createElement("div", { className: "datepicker-calendar", ref: calendarRef },
        react_1.default.createElement("div", { className: 'calendar' },
            react_1.default.createElement(CalendarHeader_1.default, { currentMonth: currentMonth, currentYear: currentYear, next: next, prev: prev, customHeader: customHeader, changeYear: setCurrentYear, changeMonth: setCurrentMonth, monthsList: monthsList, yearsList: yearsList }),
            react_1.default.createElement("div", { className: 'calendar-body' },
                react_1.default.createElement("div", { className: 'calendar-day' }, listOfDay.map((day, index) => (react_1.default.createElement("span", { className: 'day-week', key: index }, day)))),
                react_1.default.createElement("div", { id: 'calendar-container', className: 'calendar-container' }, [...Array(6)].map((_value, index) => (react_1.default.createElement(Week_1.default, { key: index, calendarData: currentDateCalendar, indexWeek: index, setDaySelected: setDaySelected }))))))));
};
exports.default = Index;
Index.prototype = {
    onChange: prop_types_1.default.func.isRequired,
    selectedDate: prop_types_1.default.func.isRequired,
    setIsOpen: prop_types_1.default.func.isRequired,
    customHeader: prop_types_1.default.func,
    dateFormat: prop_types_1.default.string,
    monthsList: prop_types_1.default.array,
    yearList: prop_types_1.default.array,
};
