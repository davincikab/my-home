import React from 'react';
import './Home.css';

// import Button from '../Button';
import Footer from  '../Footer/Footer';
import Card from '../Card/Card';

import FormControl from '../FormControl';
import { withRouter } from "react-router-dom";

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm:'',
            results:[],
            homes:[{name:"Mwiki", id:1}, {name:"Naivasha", id:2}, {name:"Nairobi", id:3}]
        };
    }

    clickHandler = (home) => {
        console.log("Click: " + JSON.stringify(home));

        // redirect to map 
        this.props.history.push("/map?home="+home.name+"&id="+home.id);
    }

    onTextChange = (e) => {
        let text = e.target.value;
        console.log(text);

        // filter the homes
        let { homes } = this.state;

        homes = homes.filter(home => {
            if(home.name.toLowerCase().includes(text.toLowerCase())) {
                return home;
            }
        });

        this.setState({
            searchTerm:text,
            results:homes
        });
    }

    componentDidMount() {
        // get the data from the props

    }

    render() {
        const { searchTerm, results} = this.state;

        return (
            <div className="main-page">
                <div className="landing">
                    {/* <Button text="Children's Home" onClick={clickHandler} className="btn custom-btn"/> */}
                    <div className="w-50">
                        <FormControl 
                            id={"search-term"}
                            name={"q"}
                            value={searchTerm}
                            type={"text"}
                            placeholder={"Search Children's home ..."}
                            className="form-control text-lg"
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


const Home = withRouter(HomeComponent); 
export default Home;