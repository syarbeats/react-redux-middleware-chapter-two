import React from 'react';

class TableRow extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.title}</td>
                <td>{this.props.data.body}</td>
            </tr>
        );
    }
}

export default TableRow;