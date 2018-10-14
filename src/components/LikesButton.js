import React from 'react'

class LikesButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0
        }
        //bind method 1
        this.increaseLikes = this.increaseLikes.bind(this)
    }

    increaseLikes() {
        console.log("helloworld")
        console.log(this)
        this.setState({
            likes: ++this.state.likes
        })
    }



    render() {
        return (
            <div className='alert-success'>
                <button
                    type='button'
                    className='btn btn-outline-primary btn-lg'
                    // onClick={this.increaseLikes}
                    //bind method 2 箭头函数
                    onClick={() => { this.increaseLikes() }}
                >赞{this.state.likes}</button>
            </div>
        )
    }


}
function increaseLikes() {
    alert(123)
}


export default LikesButton