import React, { Component, Fragment } from 'react';
import PhoneForm from './js/phoneForm'
import PhoneList from './js/phoneInfoList'
import Login from './js/login'
class App extends Component {

  id = 3;

  state = {
    information: JSON.parse(localStorage.getItem('phonebookInfo')),
    keyword: '',
    login: false,
    id: ''
  }


  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    })
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
        ...data,
        id: this.id++,
      })
    });
  }

  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }


  handleUpdate = (id, data) => {
    const {information} = this.state

    this.setState({
      information: information.map(
        info => {
          if(info.id === id) {
            return {
              id,
              ...data,
            }
          }
          return info
        }
      )
    });
  }

  handleLogin = () => {
    this.setState({
      login: !this.state.login
    })
  }

  setIdInfo = (id) => {
    this.setState({
      id : id
    });
    alert(id+"님 안녕하세요!")
  }

  render() {
    const {login, id} = this.state
    return (
      <div>
        {
          login ? (
            <Fragment>
              <PhoneForm onCreate={this.handleCreate} id={id}/>
              <div>
                <input 
                  value={this.state.keyword}
                  onChange={this.handleChange}
                  placeholder="검색!"
                />
                <button onClick={this.handleLogin}>로그아웃</button>
              </div>
              <PhoneList 
                data={this.state.information.filter(
                  info => (info.name.indexOf(this.state.keyword) > -1 || info.phone.indexOf(this.state.keyword) > -1 || info.address.indexOf(this.state.keyword) > -1)
                )}
                onRemove={this.handleRemove}  
                onUpdate={this.handleUpdate}
              />
            </Fragment>
          ) : (
            <Login submitLogin={this.handleLogin} setId={this.setIdInfo}/>
          )
        }
      </div>
    );
  }
}

export default App;