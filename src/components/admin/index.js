import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../actions/admin'


const AdminPanel = ({ users, getUsers}) => {
    useEffect(()=>{
        getUsers()
    }, [])

    return (
        <div>
            { users.map( user => 
                <p>{user.name}</p>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.admin.users
})

export default connect(mapStateToProps, { getUsers })(AdminPanel)