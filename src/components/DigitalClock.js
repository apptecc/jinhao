import React from 'react'

class DigitalClock extends React.Component {
constructor(props) {
    super(props)

        this.state = {
            date: new Date(),
            name: 'apptec'
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000)
    }

    componentDidUpdate(props, state) {
        console.log(state)
    }

    conponetWillUnmount() {
        clearInterval(this.timer)
    }


    render() {
        return (
            <h1> {this.state.date.toLocaleTimeString()} </h1>
        )
    }
}

export default DigitalClock