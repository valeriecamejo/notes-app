import React, { Component } from 'react'
import axios from 'axios'
export default class CreateUser extends Component {

  state = {
    users: [],
    username: ''
  }
  async componentDidMount() {
    this.getUsers()
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit = async e => {
    e.preventDefault()
    await axios.post("http://localhost:4000/api/users", {
      username: this.state.username
    })
    this.setState({ username: '' })
    this.getUsers()
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({ users: res.data })
  }

  deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/api/users/${id}`)
    this.getUsers()
  }

  updateUser = async (id) => {
    await axios.put(`http://localhost:4000/api/users/${id}`)
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Crear nuevo usuario</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeUsername}
                  value={this.state.username}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            {
              this.state.users.map(user => (
                <li
                  className="list-group-item list-group-item-action"
                  key={user._id}
                  //onDoubleClick={() => this.deleteUser(user._id)}
                >
                  {user.username}
                  <button type="button" className="btn btn-danger float-right m-1" onClick={() => this.deleteUser(user._id)}>Eliminar</button>
                  <button type="button" className="btn btn-primary float-right m-1">Edit</button>
                </li>
                ))
            }
          </ul>
        </div>
      </div>
    )
  }
}
