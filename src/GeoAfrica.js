//Modified from :https://github.com/muratkemaldar/using-react-hooks-with-d3.git

import React, {useRef, useEffect, useState} from "react";
import {select, geoPath, geoOrthographic, min, max, scaleLinear,zoom} from "d3";
import useResizeObserver from "./useResizeObserver";


function GeoAfrica({data, property}){
    const Refsvg = useRef();
    const wrapper = useRef();
    const size = useResizeObserver(wrapper);
    const [selectedCountry, setSelectedCountry]= useState(null);


    useEffect(()=>{
        const svg = select(Refsvg.current);

        const{width, height}=size||wrapper.current.getBoundingClientRect();
        const projection = geoOrthographic().fitSize([width, height], selectedCountry||data);
        const pathGenerator = geoPath().projection(projection);


        svg.selectAll(".country")
            .data(data.features)
            .join("path")
          /*  .on("click",(e,feature)=>{
                setSelectedCountry(selectedCountry === feature ? null : feature);
            })*/
            .attr("class","country")
            //.call(zoom.scaleBy, 2)
            .transition()
            .attr("d", feature => pathGenerator(feature));

      /*  var xy = projection([-26.1714537,27.8999389])
        svg.append("circle").attr({
            cx: xy[0],
            cy: xy[1],
            r: 5,
            fill: "blue"
        })*/


    },[data, size, property, selectedCountry]);

    
    return(

        <div ref={wrapper} style={{marginBottom: "2rem"}}>
            <svg ref={Refsvg}></svg>


        </div> 
    
    );


}



export default GeoAfrica;

