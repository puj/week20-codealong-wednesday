import React, {useState} from 'react'
import Profile from './Profile'

const URL = 'http://localhost:8080/users'

export const LoginForm = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [loggedInUser, setLoggedInUser] = useState(null)

    // To sign up a user.
    const handleSubmit = event => {
        event.preventDefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({name, password}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(json => setLoggedInUser(json))
            .catch(err => console.log('error:', err))
    }

    if (loggedInUser === null) {
        // If user is logged out, show login form
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>sign up</h1>
                    <label>
                        name
          <input
                            required
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </label>
                    <label>
                        password
          <input
                            required
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </label>
                    <button type='submit' onClick={handleSubmit}>
                        SIGN UP
        </button>
                </form>
            </div>
        )
    } else {
        // If user is logged in, show profile
        return (<Profile loggedInUser={loggedInUser}/>);
    }
}
export default LoginForm;