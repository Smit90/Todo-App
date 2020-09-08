import React from 'react';


const  Listitem = (props) =>{

    return <li className="list-group-item">

    <button className="btn-sm mr-4 btn btn-info"
  onClick={props.edittodo}>Update</button>

    {props.item.name}
  <button className="btn-sm ml-4 btn btn-danger"
  onClick={props.deletetodo}>Delete</button>
  </li>
};


export default Listitem;