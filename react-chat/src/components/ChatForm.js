import React from 'react'


export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', message: '' };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) { this.setState({ name: event.target.value }); }
  handleChangeMessage(event) { this.setState({ message: event.target.value }); }

  handleSubmit(event) {
    event.preventDefault();
    this.props.add(this.state.name, this.state.message);
    this.setState({ name: '', message: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
            <input type="text" value={this.state.name} onChange={this.handleChangeName} />
        </label>

        <label>
          Message:
            <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}