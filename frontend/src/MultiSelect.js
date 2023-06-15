import React from 'react';

const MultiSelect = ({ choices, selectedChoices, setSelectedChoices }) => {
    const handleSelection = (e) => {
        if (e.target.checked) {
            setSelectedChoices([...selectedChoices, e.target.value]);
        } else {
            setSelectedChoices(selectedChoices.filter(item => item !== e.target.value));
        }
    }

    return (
        <div>
            {choices.map((choice, index) => (
                <label key={index}>
                    <input type="checkbox" value={choice} checked={selectedChoices.includes(choice)} onChange={handleSelection} />
                    {choice}
                </label>
            ))}
        </div>
    );
};

export default MultiSelect;