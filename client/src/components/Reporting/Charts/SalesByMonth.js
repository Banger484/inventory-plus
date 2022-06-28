import {Bar} from "react-chartjs-2"
import {Chart as Chartjs} from "chart.js/auto"
import { dummyProductMonths } from "../dummyData"
import ChartistGraph from 'react-chartist';
import "./charts.css";
import { GET_MONTH_TO_MONTH } from "../../../utils/queries";
import { useQuery } from "@apollo/client";
import { calculateAdditionalPropertiesForMonth } from "../../../utils/remodeledData"

export const MonthBar = ({enterpriseId,productId,property})=>{

    let variables;
    if(productId){
        variables = {enterpriseId,productId}
    }else{
        variables = {enterpriseId}
    }
    const {data:queryData,loading,error} = useQuery(GET_MONTH_TO_MONTH,{variables})

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    let addedData = [];
    queryData.groupItemsByMonth.forEach(i=>{
        const obj = {...i,month:i.month+1}
        addedData.push(obj)
    })

    addedData = calculateAdditionalPropertiesForMonth(addedData)

    addedData.sort((a,b)=>{
        return a.month-b.month
    })
    addedData.sort((a,b)=>{
        return a.year-b.year
    })

    console.log(addedData)

    const data = {
        // A labels array that can contain any sort of values
        labels: addedData.map(m=>`${m.month}/${m.year%100}`),
        // Our series array that contains series objects or in this case series data arrays
        series: property.map(p=>{
            return addedData.map(m=>m[p])
        })
      };


    const options = {
        high: findMax(data.series.map(e=>findMax(e))),
        width:"95vw",
        axisY:{
            position:"start",
            labelOffset: {
                x: 0,
                y: 0
              },
            scaleMinSpace:50,
            scaleMaxSpace:50,
            },
        }



    return (
        <div>
            <ChartistGraph data={data} options={options} type="Bar"
            listener={{"draw" : function(data) {
                if(data.type === 'line' || data.type === 'area') {
                  data.element.animate({
                    d: {
                      begin: 2000 * data.index,
                      dur: 2000,
                      from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                      to: data.path.clone().stringify(),
                      easing: Chartist.Svg.Easing.easeOutQuint
                    }
                  });
                } } }}
            
            />
        </div>
    )

}

function findMax(arr){
    console.log(arr)
    return arr.reduce((a,b)=>{
        return a>b?a:b
},0)
}