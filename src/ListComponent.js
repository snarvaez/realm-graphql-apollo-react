import React from 'react'; 

const ListComponent = (props) => { 
  return (
    <div className="Component"> 
      <h1>{props.text}</h1> 
    </div> 
  ); 
}; 

export {ListComponent};