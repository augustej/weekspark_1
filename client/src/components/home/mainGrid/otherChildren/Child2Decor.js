import image1 from "../../../../images/homeImg.png"
import map from "../../../../images/map.svg"
import mountain from "../../../../images/mountain.svg"
import tree from "../../../../images/tree.svg"

function Child2Decor(){
    return(
        <div className="grid-child child2 not-logged">
                <img src={map} alt="" className="adventure-svg"/>
                <img src={tree} alt="" className="adventure-svg"/>
                <img src={mountain} alt="" className="adventure-svg"/>
                <img src={image1} alt="" className="decor-img"/>
        </div>
    )
}
export default Child2Decor