import React from 'react'
import "./imageCard.css"
import Tooltip from '../Tooltip';
interface Folder {
    name: string;
    children?: Folder[];
    open: boolean;
}
const ImageCard: React.FC<Folder> = ({ name, children }) => {
    {
        return (
            <div className="box">
                <Tooltip content={name} >
                    
                <div>
                    <img className="imageDisplay" src={"https://images.pexels.com/photos/7449040/pexels-photo-7449040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} height={100} width={100} />
                    <div>
                        <div className='flex justify-around'><span>{name}</span> <span>{"gender"}</span></div>
                        <div><span>2014</span> - <span>2016</span></div>
                    </div>
                </div>
                </Tooltip>
            </div>
        )
    }
}

export default ImageCard
