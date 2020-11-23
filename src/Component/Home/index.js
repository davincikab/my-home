import React from 'react';
import './Home.css';

import Button from '../Button';
import Footer from  '../Footer/Footer';
import Card from '../Card/Card';

import FormControl from '../FormControl';
import { withRouter } from "react-router-dom";
import {withFirebase } from '../Firebase';
import { compose } from 'recompose';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm:'',
            results:[],
            homes:[]
        };
    }

    clickHandler = (home) => {
        console.log("Click: " + JSON.stringify(home));

        // redirect to map 
        this.props.history.push("/my-home/map?home="+home.name+"&id="+home.id);
    }

    onTextChange = (e) => {
        let text = e.target.value;
       
        if(text.length < 2) {
            this.setState({
                searchTerm:text,
                results:[]
            });

            return;
        }

        console.log(text);

        // filter the homes
        let { homes } = this.state;

        homes = homes.filter(home => {
            if(home.name.toLowerCase().includes(text.toLowerCase())) {
                return home;
            }
        });

        homes = homes.length > 5 ? homes.slice(0, 5) : homes;

        this.setState({
            searchTerm:text,
            results:homes
        });
    }

    componentDidMount() {
        // get the data from the props
        this.props.firebase.homes().on("value", snapshot => {
            console.log(snapshot.val());
            this.setState({
                homes:snapshot.val()
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.homes().off();
    }

    render() {
        const { searchTerm, results} = this.state;

        return (
            <div className="main-page">
                <div className="landing">
                    <div className="w-50 inner-container">
                        <Button text="Children's Home" onClick={this.clickHandler} className="btn custom-btn my-2"/>
                        <div className="w-100">
                            <FormControl 
                                id={"search-term"}
                                name={"q"}
                                value={searchTerm}
                                type={"text"}
                                placeholder={"Search Children's home ..."}
                                className="form-control text-lg w-100"
                                onChange={this.onTextChange}
                            />

                            <div className="list-group mt-2">
                                {
                                    results.map(result => (
                                        <li 
                                            key={result.id}
                                            className="list-group-item"
                                            onClick={() => this.clickHandler(result)}
                                        >{result.name}</li>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h5 className="title-text">TESTIMONIAL</h5>
                
                </div>

                <div className="section">
                    <h5 className="title-text">TESTIMONIAL</h5>
                    <div className="section_inner">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>

                <div className="section">
                    <h5 className="title-text">CONTACT</h5>
                </div>

                <Footer />
            </div>
        );
    }
}


const Home = compose(
    withRouter,
    withFirebase
)(HomeComponent); 

export default Home;