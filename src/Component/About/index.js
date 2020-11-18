import React from "react";
import { withFirebase } from '../Firebase';
import { withRouter, Link } from 'react-router-dom';

import { compose } from 'recompose';

import './About.css';

// 
import { Bar } from 'react-chartjs-2';

class AboutComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading:true,
            home:null
        };
    }

    componentDidMount() {
        const { params: { name, id} } = this.props.match;
       
        this.props.firebase.home(id).on("value", snapshot => {
            console.log(snapshot.val());

            this.setState({
                home:snapshot.val(),
                loading:false
            });

        });

    }

    componentWillUnmount() {
        this.props.firebase.home(this.state.home.id).off();
    }

    render() {
        const { loading, home } = this.state;
        let services;
        if(home) {

        }

        return (
            <div className="main-container">
                {
                    loading &&
                    <div className="text-center my-2"> Loading data ... </div>
                }

                {
                    !loading && 
                    <div className="">
                        <h2 className="text-center">{ home.name }</h2>
                        <div className="container d-flex">
                            <div className="gen-info w-50 mx-2">
                                <h4 className="text-white bg-primary">General Infomation</h4>
                                <div className="info">
                                    <p><b>Name</b>{home.name}</p>
                                    <p><b>Owner</b>{home.registration_details}</p>
                                    <p><b>Open On </b>{home.open_on}</p>
                                    <p><b>Age Category</b>{home.age_category}</p>
                                    <p><b>Water Source</b>{home.water_source}</p>

                                    <h5 className="text-center text-gray my-2">Location</h5>
                                    <div className="my-2">
                                        <p><b>SubCounty</b>{home['sub-county']}</p>
                                        <div className="mx-2">
                                            <Link to={`/map?home=${home.name}&id=${home.id}`} >Map Location</Link>
                                        </div>
                                    </div>

                                    <h5 className="text-center text-gray my-2">Services Provided</h5>
                                    <div className="services">
                                       
                                        { home.services_provided.split(',').map(service => (
                                            <div className="service" key={service.toString()}>
                                                {service}
                                            </div>
                                        ))}
                                        
                                    </div>

                                </div>
                               
                            </div>

                            <div className="stats w-50 mx-2">
                                <h4 className="text-white bg-gray">Statistical Infomation</h4>

                                <div className="info">
                                    <p><b>Workers</b>{home.workers}</p>
                                    <p><b>Beds</b>{home.beds}</p>
                                    <p><b>Toilets</b>{home.toilets}</p>
                                    <p><b>Buses</b>{home.school_buses}</p>
                                    <p></p>
                                    <p><b>Population</b>{home.population}</p>
                                    <p><b>Male</b>{home.male}</p>
                                    <p><b>Female</b>{home.female}</p>
                                </div>
                                <div>
                                    <Bar
                                        data={{
                                            labels: ['Male', 'Female'],
                                            datasets: [{
                                                data: [12, 19],
                                                legend:{
                                                    display:false
                                                },
                                                backgroundColor:[
                                                    '#338873',
                                                    '#282c34'
                                                ]
                                            }]
                                        }}

                                        width={50}
                                        height={200}
                                        options={{ 
                                            maintainAspectRatio: false,
                                            title: {
                                                display: true,
                                                text: 'Gender'
                                            },
                                            scales: { 
                                                yAxes: [{ 
                                                    ticks: { 
                                                        beginAtZero: true,
                                                        stepSize:5
                                                    } 
                                                }] 
                                            } 
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
    
}

const About = compose(
    withFirebase,
    withRouter
)(AboutComponent);

export default About;