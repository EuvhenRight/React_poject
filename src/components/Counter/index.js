import React, { useEffect, useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Euvhen");

    useEffect(() => {
        console.log('did');
    }, []);

    useEffect(() => {
        console.log('didmount+didupdate');
    });

    useEffect(() => {
        console.log('did+count');
    }, [count]);

    useEffect(() => {
        console.log('didmount+all');
    }, [name, count]);

    useEffect(() => {
        return () => {
            console.log('will');
        };
    }, []);
    return (
        <div>
            <h3>{count}</h3>
            <h3>{name}</h3>
            <button
                onClick={() => {
                    setCount((prevCount) => prevCount + 1);
                }}
            >
                Click
            </button>
        </div>
    );
}

// class Button extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log('Button constructor');
//         this.state = {
//             timer: 0,
//         };
//     }
//     componentDidMount() {
//         setInterval(() => {
//             this.setState(prevState => ({ timer: prevState.timer + 1 }));
//         }, 1000);
//     }
//     componentWillUnmount() {
//         console.log('buttonWillMount');
//     }
//     render() {
//         return (<button onClick={this.props.onClick}>{this.props.title}{this.state.timer}</button>)
//     }
// }

// export class Counter extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log('Conter Constructor');
//         this.state = {
//             count: 0,
//             name: "Euvhen",
//             showButton: true,
//         };
//     }
//     updateCount = () => {
//         this.setState({ count: this.state.count + 1 });
//     };
//     toggleButton = () => {
//         this.setState((prevState) => ({
//             showButton: !prevState.showButton
//         }));
//     };
//     render() {
//         return (
//             <div>
//                 <h3>{this.state.count}</h3>
//                 <h3>{this.state.name}</h3>
//                 <button onClick={this.toggleButton}>Superbutton</button>
//                 {this.state.showButton && <Button onClick={this.updateCount} title='Click' />}
//             </div >
//         );
//     }
// }
