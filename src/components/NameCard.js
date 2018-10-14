import React from 'react'

class NameCard extends React.Component {
    render() {
        const {name, number, isHuman, tags} = this.props//es6 析构
        return (
           <div className="alert alert-success">
               <h4 className="alert-danger">{name}</h4>
               <ul>
                   <li>电话: {number}</li>
                   <li>种族: {isHuman ? '是人类' : '非人类'}</li>
                   <hr/>
                   <p>
                       {tags.map((tag, index) => (
                           <span className='badge badge-pill badge-primary' key={index}>{index}: {tag}</span>
                       ))}
                   </p>
               </ul>
           </div>
        )
    }
}

//function type

// const NameCard = (props) => {
//     const {name, number, isHuman, tags} = props
//     name = 'apptec'//Error: "name" is read-only
//     return (
//         <div className="alert alert-success">
//             <h4 className="alert-danger">{name}</h4>
//             <ul>
//                 <li>电话: {number}</li>
//                 <li>种族: {isHuman ? '是人类' : '非人类'}</li>
//                 <hr/>
//                 <p>
//                     {tags.map((tag, index) => (
//                         <span className='badge badge-pill badge-primary' key={index}>{index}: {tag}</span>
//                     ))}
//                 </p>
//             </ul>
//         </div>
//     )
// }

export default NameCard