import React, { Component, Fragment } from 'react';
import SignUp from './signup'

class login extends Component {
    state = {
        id : "",
        pw: "",
        isSignUp: false,
        text: "",
        idInformation : JSON.parse(localStorage.getItem('information')) 
    }

    

    componentDidMount = () => {
        if(this.state.idInformation === null){
            this.setState({
                isSignUp: true,
                text: " 회원가입을 먼저 해주세요!"
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        if(this.loginCheck()){
            this.props.submitLogin()
            this.props.setId(this.state.id)
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
            isSignUp : !this.state.isSignUp,
            idInformation : JSON.parse(localStorage.getItem('information'))
        });
    }

    loginCheck = () => {
        let chk = false;

        this.state.idInformation.forEach(function(item){
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
        const {id, pw, isSignUp, text} = this.state;
        return (
            <Fragment>
                {
                    isSignUp ? (
                        <SignUp toggleSignUp={this.toggleSignUp} text={text}/>
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
                                type="password"
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