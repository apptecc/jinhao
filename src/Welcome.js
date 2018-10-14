import React from 'react'

class Welcome extends React.Component {
    render() {
        const todoList = ['learn react', 'learn redux'];
        const isLogin = false;
        return (
            <div>
                <h1> Welcome apptec </h1>
                <div>{'Andrew'}</div>
                <div>{12 + 34}</div>
                <div>{[1, 2, 3]}</div>
                {<p> this is a paragraph</p>}

                <ul>
                    {todoList.map(item =>
                        <li>todo: {item}</li>
                    )}
                </ul>

                <h1 className='red'>{isLogin ? 'you already login' : 'please login'}</h1>
            </div>

        )
    }
}

export default Welcome