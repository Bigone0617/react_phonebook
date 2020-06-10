import React, { Component } from 'react';
import PhoneInfo from './phoneInfo';

class phoneInfoList extends Component {
    static defaultProps = {
        data: []
    }
    render() {
        const { data, onRemove,onUpdate } = this.props;
        const list = data.map(
            info => (
                <PhoneInfo 
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    info={info} 
                    key={info.id}
                />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default phoneInfoList;