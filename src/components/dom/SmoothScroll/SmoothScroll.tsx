// "use client"

// /**
//  * everything that potted in this container will be smoothely scrollable
//  */
// export const SmoothScrollContainer = ({ children }: { children: React.ReactNode }) => {

// 	return <div className="flex flex-col gap-2 w-ull h-fit">{children}</div>
// }


// // App.js or any other parent component
// import React from 'react';
// import MyBooleanContext from './MyBooleanContext';
// import ChildComponent from './ChildComponent';

// function App() {
//   return (
//     <MyBooleanContext.Provider value={true}>
//       <ChildComponent />
//     </MyBooleanContext.Provider>
//   );
// }

// export default App;




// // ChildComponent.js
// import React, { useContext } from 'react';
// import MyBooleanContext from './MyBooleanContext';

// function ChildComponent() {
//   const myBooleanValue = useContext(MyBooleanContext);

//   return (
//     <div>
//       The boolean value from context is: {myBooleanValue? 'True' : 'False'}
//     </div>
//   );
// }

// export default ChildComponent;