import React, { Component } from 'react';

class phoneForm extends Component {
    input = React.createRef();

    mapping = {
        name: "이름",
        phone: "핸드폰번호",
        address: "주소"
    }

    state = {
        name: '',
        phone: '',
        address: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        for (let key in this.state) {
            if (this.state[key] === "") {
                alert("[" + this.mapping[key] + "] 항목이 비었습니다!")
                return false;
            }
        }
        this.props.onCreate(this.state)
        this.savePhonBook()
        this.setState({
            name: '',
            phone: '',
            address: ''
        });
        this.input.current.focus();
    }

    savePhonBook = () => {
        const { name, phone, address} = this.state;
        const phonebookInfo = {
            id: this.props.id,
            name: name,
            phone : phone,
            address: address
       }
       const phonebookList = JSON.parse(localStorage.getItem('phonebookInfo')) || []
       phonebookList.push(phonebookInfo)

       localStorage.setItem('phonebookInfo', JSON.stringify(phonebookList));

       console.log(JSON.parse(localStorage.getItem('phonebookInfo')))
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