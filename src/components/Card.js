import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
  let options=props.options;
  let data=useCart();
  const priceRef=useRef();
  let priceOpt=Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  let dispatch=useDispatchCart();
  let finalPrice=qty*parseInt(options[size]);
  const handleadd=async ()=>{
    await dispatch({type:"ADD", id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty, size:size,img:props.foodItem.img});
    console.log(data);
  }
  useEffect(()=>{
    setsize(priceRef.current.value)
  },[])
  return (
    <div>
        <div className="card mt-3" style={{"width": "18rem","maxHeight":"360px"}}>
          <img src={props.foodItem.img} style={{height:"125px", objectFit:"fill"}} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">Some quick example text to</p>
            <div className='container w-100'>
              <select onChange={(e)=> setqty(e.target.value)} className="m-2 h-100  bg-success rounded">
                {Array.from(Array(6),(e,i)=>{
                  return(
                    <option key={i+1} value={i+1}> {i+1} </option>
                  )
                })}
              </select>
              <select ref={priceRef} onChange={(e)=> setsize(e.target.value)} className="m-2 h-100  bg-success rounded">
                  {priceOpt.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                  })}
              </select>
              <div className="d-inline h-100 fs-5">
                ${finalPrice}
              </div>
            </div>
            <hr/>
            <button className='btn btn-success justify-center ms-2' onClick={handleadd}>Add to Cart</button>
          </div>
        </div>
      </div>
  )
}
