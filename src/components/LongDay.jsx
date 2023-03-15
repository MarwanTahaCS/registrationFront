// import React from "react";
// import AddIcon from "@material-ui/icons/Add";
// import { useState } from "react";
// import Fab from "@material-ui/core/Fab";
// import { Zoom } from "@material-ui/core";
// import Delete from "@material-ui/icons/Delete";

// export default function LongDay(props) {
//     const [longDayData, setLongDayData] = useState([
//         {
//             staff: [],
//             startOfLongDayHours: "15:30",
//             endOfLongDayHours: "18:00",
//         }
//     ]);

//     function updateAssistantName(event) {
//         const { value, name } = event.target;
//         let data = [...longDayData];
//         data[name].name = value;
//         // props.setNote();
//         setAssistants(data);
//         props.updateLongDay(assistants);
//     }
//     function updateAssistantPhonenumber(event) {
//         const { value, name } = event.target;
//         let data = [...longDayData];
//         data[name].phoneNumber = value;
//         // props.setNote();
//         setAssistants(data);
//         props.updateLongDay(assistants);
//     }
//     const arrayRange = (start, stop, step) =>
//         Array.from(
//             { length: (stop - start) / step + 1 },
//             (value, index) => start + index * step
//         );

//     function addAssistant() {
//         setAssistants([...longDayData, {
//             name: "",
//             phoneNumber: "",
//         }]);
//         props.updateLongDay(assistants);
//     }
//     function remove(index) {
//         let data = [...longDayData];
//         data.splice(index, 1);
//         setAssistants(data);
//         props.updateLongDay(assistants);
//     }

//     return (
//         <div className="container">
//             <p className="form-label">Assistants</p>
//             {arrayRange(1, assistants.length, 1).map((assistant, index) => {
//                 return <ul class="list-group mb-3">
//                     <li key={index} class="d-flex justify-content-between lh-sm">
//                         <div class="input-group mb-3">
//                             <span class="input-group-text" id="basic-addon1">Name</span><input
//                                 className="form-control bg-light"
//                                 onChange={updateAssistantName}
//                                 type="text"
//                                 name={index}
//                                 placeholder={"Assistant name " + `${index + 1}`}
//                                 autoComplete="off"
//                                 value={assistants[index].name}
//                             /></div>
//                         <div class=""></div>
//                         <div class="input-group mb-3 px-3">
//                             <span class="input-group-text" id="basic-addon1">Phone N.</span>
//                             <input
//                                 className="form-control bg-light"
//                                 onChange={updateAssistantPhonenumber}
//                                 type="text"
//                                 name={index}
//                                 placeholder={"Assistant Phone number " + `${index + 1}`}
//                                 autoComplete="off"
//                                 value={assistants[index].phoneNumber}
//                             />
//                         </div>
//                         <div class="mb-3 px-3">
//                             <Zoom in={true}>
//                                 <Fab onClick={() => remove(index)}>
//                                     <Delete />
//                                 </Fab>
//                             </Zoom>
//                         </div>
//                     </li>
//                 </ul>;
//             })}
//             <div class="">
//                 <Zoom in={true}>
//                     <Fab onClick={() => addAssistant()}>
//                         <AddIcon />
//                     </Fab>
//                 </Zoom>
//             </div>
//         </div>
//     );
// }