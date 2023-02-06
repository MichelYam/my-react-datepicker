import React, { useState } from 'react';
import Calendar from './Calendar';
import Input from './input';
import PropTypes from 'prop-types';
const Datapicker = ({ selectedDate, setSelectedDate, customHeader, dataFormat }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (React.createElement("div", { className: 'datapicker' },
        React.createElement("div", { className: 'datapicker-input', onClick: () => setIsOpen(true) },
            React.createElement(Input, { selectedDate: selectedDate, setSelectedDate: setSelectedDate, dataFormat: dataFormat }),
            isOpen && React.createElement(Calendar, { isOpen: isOpen, setIsOpen: () => setIsOpen(false), customHeader: customHeader, selectedDate: selectedDate, setSelectedDate: setSelectedDate, dataFormat: dataFormat }))));
};
export default Datapicker;
Datapicker.prototype = {
    selectedDate: PropTypes.string.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    customHeader: PropTypes.func,
    dataFormat: PropTypes.string,
};
//# sourceMappingURL=Datapicker.js.map