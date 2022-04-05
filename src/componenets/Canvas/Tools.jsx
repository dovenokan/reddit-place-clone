import React from 'react'

function Tools() {
  
  return (
    <div className="Header">
      <div className="Tools">
        <div onClick={()=>initCanvas()} className="clean-btn">Clean</div>
      </div>
      <div className="Palette">
        <div onClick={()=>setCurrentColor(colors.red)} className="Palette-item red"></div>
        <div onClick={()=>setCurrentColor(colors.green)} className="Palette-item green"></div>
        <div onClick={()=>setCurrentColor(colors.blue)} className="Palette-item blue"></div>
        {/* <input type="color" onChange={(e)=>setCurrentColor(e.target.value)} className="Palette-item blue"></input> */}
      </div>
    </div>
  )
}

export default Tools