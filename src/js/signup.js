import React, { Component } from 'react';

class signup extends Component {
    state = {
        id : "",
        pw : "",
        pwchk: ""
    }

    mapping = {
        id : "아이디",
        pw : "비밀번호",
        pwchk : "비밀번호 확인"
    }

    //input박스 값 바뀔때 마다 state 변경
    handleLoginInformation = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    //회원가입
    handleSubmit = (e) => {
        const {id, pw, pwchk} = this.state;
        e.preventDefault();
        console.log("=========================");
        console.log("id : " + id)
        console.log("pw : " + pw)
        console.log("pwchk : "+pwchk) 
        console.log("=========================");

        if(this.checkEmpty()){
            if(pw !== pwchk){
                alert("비밀번호와 비밀번호 확인이 다릅니다!")
                this.resetState()
            }else{
                this.saveInformantion()
                this.resetState()
                this.props.toggleSignUp()
            }
        }
    }

    //빈칸 체크
    checkEmpty = () => {
        let chk = "";

        for(let key in this.state) {
            if(this.state[key].trim() === ""){
                alert("["+this.mapping[key]+ "] 항목이 비었습니다")
                chk = false;
            }
            if(chk === false){
                break;
            }

            chk = true
        }

        return chk
    }

    //중복체크 
    checkOverlap = () => {
        const idList = JSON.parse(localStorage.getItem('information'))
        console.log(idList);
    }

    //아이디 정보 localstorage에 저장
    saveInformantion = () => {
        const {id, pw} = this.state;
        const information = {
            id : id,
            pw : pw
        }
        const InformationArry = JSON.parse(localStorage.getItem('information')) || []

        InformationArry.push(information)

        localStorage.setItem('information', JSON.stringify(InformationArry));
        this.setState({

        })
        console.log(localStorage.getItem('information'))
    }

    //state 초기화
    resetState = () => {
        this.setState({
            id: "",
            pw: "",
            pwchk: ""
        })
    }
 
    render() {
        const {id, pw, pwchk} = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input 
                            name="id"
                            placeholder="아이디" 
                            value={id}
                            onChange={this.handleLoginInformation}
                        />
                        <button onClick={this.checkOverlap}>아이디 중복체크</button>
                    </div>
                    <div>
                        <input 
                            name="pw"
                            placeholder="비밀번호"
                            value={pw}
                            onChange={this.handleLoginInformation}
                        />
                    </div>
                    <div>
                        <input 
                            name="pwchk"
                            placeholder="비밀번호 확인"
                            value={pwchk}
                            onChange={this.handleLoginInformation}
                        />
                    </div>
                    <div>
                        <button type="submit">회원가입</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default signup;