import React from 'react';

const Checkbox = ({ isChecked, setChecked }) => {
    return (
        <input type="checkbox" checked={isChecked} onChange={(e) => setChecked(e.target.checked)} />
    );
};

export default Checkbox;
