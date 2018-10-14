import React from 'react'
import $ from 'jquery'

class FormTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            age:30
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(event) {
        this.timer = setInterval(() => {
            // console.log(this.state.age);
            this.setState({
                age: ++this.state.age
            });
        }, 1000);
    }

    render() {
        return (
            <div className='form-control-lg' onSubmit={this.handleSubmit}>
                <form>
                    <input type='text'
                           placeholder="please input text"
                           onChange={this.handleChange}
                           value={this.state.inputText}
                    />
                    <button type='submit'>submit</button>
                </form>
            </div>
        )
    }
     handleSubmit(event) {
         $.ajax({
             type:'get',
             url:'http://localhost:8080/data.jsonp',
             crossDomain: true,
             dataType: 'jsonp',
             jsonp: 'callback',
             success:function(res){
                 console.log(res);
             }
         });
         // $.ajax({
         //     type:'get',
         //     url:'http://localhost:8080/data.json',
         //     crossDomain: true,
         //     success:function(res){
         //         console.log(res);
         //     }
         // });
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
           inputText: event.target.value
        })
    }
}

export default FormTest