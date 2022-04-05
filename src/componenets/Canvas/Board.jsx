/* eslint-disable array-callback-return */
import { useEffect,useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { WriteData } from '../../utils/fb_funcs';
import realtime from '../../config/fb_config';
import { colors } from '../../utils/palette';
import Square from './Square';

function Board() {
    const range = [...Array(1600).keys()];
    const [currentColor, setCurrentColor] = useState(colors.red);
    const [colorMap, setColorMap] = useState([])
    const [loading, setLoading] = useState(true);

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
            // console.log(data)
            setColorMap(data)
            setLoading(false) 
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
            document.querySelector(".Canvas").style.transform=`scale(${scale})`;
        })
    }

    function DragSliderEvent() {
        return 0
    }

    useEffect(() => {
        CanvasListener()
        Wheel()
        DragSliderEvent()
    }, [loading])

    
    if (loading) {
        return(
            <div className="Loading">
                <div className="Loading_Text">Loading...</div>
            </div>
        )
    }
    
    return(
        <div className="Board">
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