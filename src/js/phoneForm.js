import React, { Component } from 'react';

class phoneForm extends Component {
    input = React.createRef();

    mapping = {
        name : "이름",
        phone : "핸드폰번호",
        address : "주소"
    }

    state = {
        name : '',
        phone : '',
        address: ''
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        for(let key in this.state){
            if(this.state[key] === ""){
                alert("["+this.mapping[key]+"] 항목이 비었습니다!")
                return false;
            }
        }
        this.props.onCreate(this.state)

        this.setState({
            name: '',
            phone: '',
            address: ''
          });
        this.input.current.focus();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    placeholder="이름"
                    onChange={this.handleChange}
                    value={this.state.name}
                    ref={this.input}
                />
                <input 
                    type="text" pattern="[0-9]*"
                    name="phone"
                    placeholder="핸드폰번호"
                    onChange={this.handleChange}
                    value={this.state.phone}
                />
                <input 
                    name="address"
                    placeholder="주소"
                    onChange={this.handleChange}
                    value={this.state.address}
                />
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default phoneForm;