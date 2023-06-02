import React, { useEffect } from "react" 
import "./Dropdown.css"
import { translations } from "../../translations"

const Dropdown = ({setCurrLang, currLang}) => {
    return (
    <div className="select-dropdown">
        <select defaultValue={'ru'} onChange={(e) => setCurrLang(e.target.value)}>
            <option value="en">{translations['english_' + currLang]}</option>
            <option value="ru">{translations['russian_' + currLang]}</option>
            <option value="ky">{translations['kyrgyz_' + currLang]}</option>
        </select>
    </div>
    )
} 
export default Dropdown;