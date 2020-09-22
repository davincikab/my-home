import React, { Component } from 'react';

const withAuthentication = Component => (props) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
        
            this.state ={
              authUser:null
            };
        }
        
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
              authUser => {
                authUser
                  ? this.setState({ authUser })
                  : this.setState({ authUser: null });
              },
            );
        
          }
        
        componentWillMount() {
            // this.listener;
        }

        render() {
          return (
            <AuthContext.Provider value={this.state.authUser}>
                <Component {...this.props} />
            </AuthContext.Provider>
          );
        }
    }
     
    return withFirebase(WithAuthentication);
}

export default withAuthentication;