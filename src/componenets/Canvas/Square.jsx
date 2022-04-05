

export default function Square({id,upadateSquare,color}) {
    return (
        <div className="Square" onClick={()=>upadateSquare()} id={id} style={{backgroundColor: color}}>
        </div>
    );
}