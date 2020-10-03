import React, { useState,useEffect } from 'react'
import {Line} from "react-chartjs-2";
import numeral from "numeral";
import './App.css';
import { Redirect,Link } from "react-router-dom";



const options ={
    legend: {
        display:false,

    },
    elements: {
        points:{
            radius:0,
        },
    },
    maintainAspectratio: false,
    tooltips:{
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
        {
            type: "time",
            time: {
                format:"MM/DD/YY",
                tooltipFormat: "li",
            },
        },
    ],
        yAxes: [{
            gridLines: {
                display: false,
            },
            ticks:
            {
                callback: function (value, index, values){
                    return numeral(value).format("0a");
                }
            }
        }
    ],
    },
}


const buildChartData = (data,casesType) => {
    const chartData = [];
    let lastDataPoint;
    for(let date in data.cases) {
        if(lastDataPoint){
            const newDataPoint = {
                x:date,
                y:data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
                
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
}

function LineGraph({casesType = "cases",...props}) {

const [data, setData] = useState({})


    
    useEffect(() => {
        const fetchData = async () => {
        await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
            const chartData = buildChartData(data,casesType)
            setData(chartData)
            });
        }
        fetchData();
    }, [casesType])


    return (
        <div className={props.className}>
            {data?.length >0 && (
            <Line
                
                data ={{
                    datasets: [
                        {   
                            backgroundColor: "rgba(204,16,52,0.5",
                            borderColor:"#CC1034",
                            data: data
                        },
                    ],

                }}
                options = {options}
                
            />

            
            )}
            <br/>
            <br/>
            <br/>
            
            <h5>Project Courtesy : <a href="https://www.youtube.com/channel/UCqrILQNl5Ed9Dz6CGMyvMTQ/">Clever Programmer</a></h5>
            <h5>Data Sources Used : <a href="http://disease.sh/">Disease.sh</a></h5>
            <h5>Made with lots of <span role="img">&#128151;</span> and <span role="img">&#9749;</span>	 by <a href="https://www.linkedin.com/in/dhanesh-phulphagar-076366155/">Dhanesh Phulphagar</a></h5>
            <h5>Repository <span role="img">&#128187;</span> : <a href="https://github.com/darayn/Covid-19-Tracker---ReactJS">Covid-19 Tracker</a></h5>
        </div>
    )
}

export default LineGraph
