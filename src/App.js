import React, { Component, Fragment } from 'react';
import PhoneForm from './js/phoneForm'
import PhoneList from './js/phoneInfoList'
import Login from './js/login'
class App extends Component {

  id = 3;

  state = {
    information: [
      {
        id: 0,
        name: '홍길동',
        phone: '010-0000-0001',
        address: "서울특별시 강남구"
      },
      {
        id: 1,
        name: '김길동',
        phone: '010-0000-0002',
        address: "서울특별시 강북구"
      },
      {
        id: 2,
        name: '박길동',
        phone: '010-0000-0003',
        address: "서울특별시 노원구"
      }
    ],
    keyword: '',
    login: false
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
    console.log("핸들 로그인!")
    this.setState({
      login: !this.state.login
    })
  }

  render() {
    const {login} = this.state
    return (
      <div>
        {
          login ? (
            <Fragment>
              <PhoneForm onCreate={this.handleCreate}/>
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
            <Login submitLogin={this.handleLogin}/>
          )
        }
      </div>
    );
  }
}

export default App;