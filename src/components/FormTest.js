import React from 'react'

class FormTest extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className='form-control-lg' onSubmit={this.handleSubmit}>
                <form>
                    <input type='text'
                           placeholder="please input text"
                           ref={(textInput) => {this.textInput = textInput}}

                    />
                    <button type='submit'>submit</button>
                </form>
            </div>
        )
    }

     handleSubmit(event) {
        alert(this.textInput.value);
        event.preventDefault();
    }
}

export default FormTest