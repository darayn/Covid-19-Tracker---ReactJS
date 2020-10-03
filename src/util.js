import React from 'react'
import {Circle, Popup} from "react-leaflet"
import numeral from "numeral"


const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 700,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 700,
    },
    deaths: {
      hex: "#CC1034",
      multiplier: 2000,
    },
  };
  
export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1)); 
    
};


export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const prettyPrintStat2 = (stat) =>
  stat ? `+${numeral(stat).format("0")}` : "+0";

// Draw circles on map with tooltop
export const showDataOnMap = (data, casesType = 'cases') =>(
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity ={0.4}
            color = {casesTypeColors[casesType].hex}
            fillColor = {casesTypeColors[casesType].hex}

            radius ={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }

        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style = {{ backgroundImage: `url(${country.countryInfo.flag})`}}
                    />

                    <div
                        className="info-name"
                    >{ country.country }
                    </div>

                    <div 
                        className="info-confirmed"
                    >Confirmed: { numeral(country.cases).format("0,0")  }
                    </div>

                    <div
                        className="info-recovered"
                    >Recovered: { numeral(country.recovered).format("0,0")  }
                    </div>

                    <div
                        className="info-deaths"
                    >Deaths: { numeral(country.deaths).format("0,0")  }
                    </div>

                    <div
                        className="info-newCases"
                    >New Cases: { prettyPrintStat2(numeral(country.todayCases).format("0,0"))  }
                    </div>

                    

                    <div
                        className="info-active"
                    >Active Cases: { numeral(country.active).format("0,0")  }
                    </div>


                </div>
            </Popup>

        </Circle>

        
    ))
);
