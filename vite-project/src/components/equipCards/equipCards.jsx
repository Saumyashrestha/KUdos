import React from "react";
import "./equipCards.css"

const EquipCards =({imgsrc,imgalt,imgdes})=>{
    return(
        <div className="card">
            <img src={imgsrc} alt={imgalt}/>
            <p className="description">{imgdes}</p>
            <button className="button">Add to list</button>
        </div>
    )
}

export default EquipCards;