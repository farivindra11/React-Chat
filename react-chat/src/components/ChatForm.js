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
      <div className='card-footer'>
        <form onSubmit={this.handleSubmit}>
          <div className='input-group'>

            <div className='container'>
              <div className='form-group row'>
                <div className="col form">
                  <input type="text" className="form-control type_msg" value={this.state.name} onChange={this.handleChangeName} placeholder='Insert Your Name Here' required />
                  <input type="text" className="form-control type_msg" value={this.state.message} onChange={this.handleChangeMessage} placeholder='Say Something' />
                </div>
                <div className="input-group-append right-form">
                  <button type="submit" value="Send" className='input-group-text send_btn'><i className="fas fa-location-arrow"></i></button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}