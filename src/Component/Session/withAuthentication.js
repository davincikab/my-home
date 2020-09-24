import React from 'react';
import { withFirebase } from '../Firebase';
import { AuthContext } from './index';

const withAuthentication = Component => {
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
        
        componentWillUnmount() {
            this.listener();
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