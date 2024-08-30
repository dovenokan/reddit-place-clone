/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { useEffect,useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { WriteData } from '../../utils/fb_funcs';
import realtime from '../../config/fb_config';
import { colors } from '../../utils/palette';
import Square from './Square';
import Tools from '../Tools/Tools';
import { TransformWrapper, TransformComponent } from "@tiendeo/react-zoom-pan-pinch";

function Board({userData}) {
    const range = [...Array(6400).keys()];
    const [currentColor, setCurrentColor] = useState(colors.c1);
    const [colorMap, setColorMap] = useState([])
    const [loading, setLoading] = useState(true);

    function initCanvas(){
        if (userData.uid==="Mtmma7pFXpWJsFEeIAUbN22aZkB3") {
            range.map((n) => {
                WriteData(realtime,`6400_board/${n}`,{
                    id: n,
                    color: "white",
                    lastModifier: "",
                })
            })
        }else{
            alert("You are not authorized to reset")
        }
    }

    function CanvasListener() {
        const dbRef = ref(realtime, "6400_board")
        onValue(dbRef, (snapshot) => {
            const data = Object.values(snapshot.val())
            setColorMap(data)
            setLoading(false) 
        });
    }

    function updateSquare(id, color){
        WriteData(realtime,`6400_board/${id}`,{
            id: id,
            color: color,
            lastModifierEmail: userData.email,
            lastModifierUID: userData.uid,
        })
    }

    function SquareColorize(color) {
        let r = document.querySelector(':root');
        r.style.setProperty('--squareBgColor', color);
        setCurrentColor(color)
    }

    useEffect(() => {
        CanvasListener()
    }, [loading])

    
    if (loading) {
        return(
            <div className="Loading">
                <div className="Loading_Text">Loading...</div>
            </div>
        )
    }
    
    return(
        <TransformWrapper
            limitToBounds={false}
            minScale={0}
            maxScale={15}
            initialScale={0}
            initialPositionX={100}
            initialPositionY={100}
        >
            <Tools setCurrentColor={SquareColorize} initCanvas={initCanvas} userData={userData} />
            <TransformComponent>
                <div className="Board">
                    <div className="Canvas">
                        { colorMap.map((val,key)=>{
                            return (
                                <Square upadateSquare={()=>updateSquare(val.id,currentColor)} key={key} id={val.id} color={val.color} />
                            )
                        })}
                    </div>
                </div>
            </TransformComponent>
        </TransformWrapper>
    )
}

export default Board;