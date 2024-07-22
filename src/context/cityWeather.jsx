import axios from "axios";
import { createContext, useState } from "react";

const weatherContext = createContext();

function Provider ({ children }) {

    const [city, setCity] = useState("");

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            onSearch(city)
        }
    };

    return (
        <div>
            <input 
            type="text" 
            placeholder="Search for cities"
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            />
        
        <weatherContext.Provider>
            {children}
        </weatherContext.Provider>

        </div>
    )
}

export { Provider };
export default weatherContext;