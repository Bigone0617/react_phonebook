import React, { Component, Fragment } from 'react';
import SignUp from './signup'

class login extends Component {
    state = {
        id : "",
        pw: "",
        isSignUp: false
    }

    idInformation = JSON.parse(localStorage.getItem('information'))

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.loginCheck()){
            this.props.submitLogin()
        }else{
            alert("일치하는 정보가 없습니다!");
        }
    }

    handleLoginInformation = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    toggleSignUp = () => {
        this.setState({
            isSignUp : !this.state.isSignUp
        });
    }

    loginCheck = () => {
        let chk = false;

        this.idInformation.forEach(function(item){
            if(item.id === this.state.id && item.pw === this.state.pw){
                chk = true
            }else{
                if(chk === false){
                    chk = false;
                }
            }
        }.bind(this))

        this.setState({
            id : '',
            pw: ''
        })

        return chk
    }

    render() {
        const {id, pw, isSignUp} = this.state;
        return (
            <Fragment>
                {
                    isSignUp ? (
                        <SignUp toggleSignUp={this.toggleSignUp}/>
                    ) : (
                        <form onSubmit={this.handleSubmit}>
                            <input 
                                name="id"
                                placeholder="아이디" 
                                value={id}
                                onChange={this.handleLoginInformation}
                            />
                            <input 
                                name="pw"
                                placeholder="비밀번호"
                                value={pw}
                                onChange={this.handleLoginInformation}
                            />
                            <button type="submit">로그인</button>
                            <div>
                                <button onClick={this.toggleSignUp}>회원가입</button>
                            </div>
                        </form>
                    )
                }
            </Fragment>
            
        );
    }
}

export default login;