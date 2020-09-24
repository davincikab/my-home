import React, { useState } from 'react';
import RadioButton from '../RadioButtonControl';
import FormGroup from '../FormGroup';

import './FilterSection.css';

const FilterTab = ({onVisualTypeChange,filterPopulation, filterBeds}) => {
    // application state;
    const [population, setPopulation] = useState(50);
    const [beds, setBeds] = useState(40);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeVisual, setActiveVisual] = useState("default");

    const handleVisualizeByChange = (event) => {
        console.log(event.target.value);
        let target = event.target;

        target.value === "default" ? onVisualTypeChange("symbol", target.value) : onVisualTypeChange("circle", target.value);
        setActiveVisual(target.value);
    }

    const handleFilterChange = (event) => {
        let target = event.target;

       if(target.name === "population") {
            filterPopulation(target.value);
            setPopulation(target.value);
       } else {
            filterBeds(target.value);
            setBeds(target.value);
       } 
    }

    return (
        <div className={isCollapsed ? "filter-tab collapse" : "filter-tab"}>
            <div className="btn collapse-btn" onClick={e => setIsCollapsed(!isCollapsed)}>
            </div>
            <div className="section">
                <h5 className="section-title">Visualize By</h5>

                {/*  */}
                <div className="visual-section">
                    <RadioButton 
                        id="default"
                        name="filter"
                        type="radio"
                        value="default"
                        onChange={handleVisualizeByChange}
                        activeVisual={activeVisual}
                    >
                        Default
                    </RadioButton>
                    <RadioButton 
                        id="population"
                        name="filter"
                        type="radio"
                        value="Population"
                        onChange={handleVisualizeByChange}
                        activeVisual={activeVisual}
                    >
                    Population
                    </RadioButton>

                    <RadioButton 
                        id="female"
                        name="filter"
                        type="radio"
                        value="female"
                        onChange={handleVisualizeByChange}
                        activeVisual={activeVisual}
                    >
                        Female
                    </RadioButton>
                    <RadioButton 
                        id="male"
                        name="filter"
                        type="radio"
                        value="male"
                        onChange={handleVisualizeByChange}
                        activeVisual={activeVisual}
                    >
                        Male
                    </RadioButton>

                    <RadioButton 
                        id="bed"
                        name="filter"
                        type="radio"
                        value="beds"
                        onChange={handleVisualizeByChange}
                        activeVisual={activeVisual}
                    >
                        Bed
                    </RadioButton>
                </div>
            </div>
            <div className="section">
                <h5 className="section-title">Filter</h5>
                <div className="filter-section">
                    <FormGroup
                        id="bed-filter"
                        name="bed"
                        type="range"
                        value={beds}
                        onChange={handleFilterChange}
                    >
                        Beds
                    </FormGroup>

                    <FormGroup
                        id="population-filter"
                        name="population"
                        type="range"
                        value={population}
                        onChange={handleFilterChange}
                    >
                        Population
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}

export default FilterTab