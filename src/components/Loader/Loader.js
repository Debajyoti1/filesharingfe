import Spinner from "react-spinner-material";

export default function Loader(){
    return (
        <div style={{width:"100%",marginTop:"100px",display:"flex",justifyContent:"center"}}>
        <Spinner radius={50} color={"red"} stroke={5} visible={true} />
        </div>
    )
}