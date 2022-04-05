/* eslint-disable array-callback-return */
import { useEffect,useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { WriteData } from '../utils/fb_funcs';
import realtime from '../config/fb_config';
import { colors } from '../utils/palette';
import Square from './Square';

function Board() {

    const range = [...Array(1600).keys()];
    const [currentColor, setCurrentColor] = useState(colors.red);
    const [colorMap, setColorMap] = useState([])

    function initCanvas(){
        range.map((n) => {
            WriteData(realtime,`board/${n}`,{
                id: n,
                color: "white",
                lastModifier: "",
            })
        })
    }

    function CanvasListener() {
        const dbRef = ref(realtime, "board")
        onValue(dbRef, (snapshot) => {
            const data = Object.values(snapshot.val())
            console.log(data)
            setColorMap(data)
        });
    }

    function updateSquare(id, color){
        WriteData(realtime,`board/${id}`,{
            id: id,
            color: color,
            lastModifier: "",
        })
    }

    function Wheel() {
        let scale = 1;
        document.addEventListener("wheel", (e) => {
            e.preventDefault();
            scale += e.deltaY * -0.0015;
            scale = Math.min(Math.max(.025, scale), 4);
            document.querySelector(".Board").style.transform=`scale(${scale})`;
        })
    }

    function Cursor() {
        let scale = 1;
        document.addEventListener("wheel", (e) => {
            e.preventDefault();
            scale += e.deltaY * -0.0015;
            scale = Math.min(Math.max(.025, scale), 4);
            document.querySelector(".Board").style.transform=`scale(${scale})`;
        })
    }

    useEffect(() => {
        CanvasListener()
        Wheel()
    }, [])

    return(
        <div className="Board">
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

            <div className="Canvas">
                { colorMap.map((val,key)=>{
                    return (
                        <Square upadateSquare={()=>updateSquare(val.id,currentColor)} key={key} id={val.id} color={val.color} />
                    )
                })}
            </div>
        </div>
    )
}

export default Board;