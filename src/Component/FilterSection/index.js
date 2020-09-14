import React from 'react';
import RadioButton from '../RadioButtonControl';
import FormControl from '../FormControl';

import './FilterSection.css';

const FilterTab = ({onVisualTypeChange}) => {
    // application state;

    const handleVisualizeByChange = (event) => {
        console.log(event.target.value);
        onVisualTypeChange("cirle", event.target.value);
    }

    const handFilterChange = (event) => {
        console.log(event);
    }

    return (
        <div className="filter-tab">
            <div className="section">
                <h5 className="section-title">Visualize By</h5>

                {/*  */}
                <div className="visual-section">
                    <RadioButton 
                        id="population"
                        name="filter"
                        type="radio"
                        value="population"
                        onChange={handleVisualizeByChange}
                    >
                    Population
                    </RadioButton>

                    <RadioButton 
                        id="female"
                        name="filter"
                        type="radio"
                        value="female"
                        onChange={handleVisualizeByChange}
                    >
                        Female
                    </RadioButton>
                    <RadioButton 
                        id="male"
                        name="filter"
                        type="radio"
                        value="male"
                        onChange={handleVisualizeByChange}
                    >
                        Male
                    </RadioButton>

                    <RadioButton 
                        id="bed"
                        name="filter"
                        type="radio"
                        value="bed"
                        onChange={handleVisualizeByChange}
                    >
                        Bed
                    </RadioButton>
                </div>
            </div>
            <div className="section">
                <h5 className="section-title">Filter</h5>
                <div className="filter-section">
                    <div className="form-group">
                        <label>Beds</label>
                        <input type="range" />
                    </div>

                    <div className="form-group">
                        <label>Male</label>
                        <input type="range" />
                    </div>

                    <div className="form-group">
                        <label>Population</label>
                        <input type="range" />
                    </div>

                    <div className="form-group">
                        <label>Age Sets</label>
                        <select className="form-control">
                            <option name="">10 - 22</option>
                            <option name="">10 - 22</option>
                            <option name="">10 - 22</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterTab