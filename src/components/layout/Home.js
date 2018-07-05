import React, { Component } from 'react';
import { Map, Info } from '../containers';
import superagent from 'superagent';
import SearchBar from '../layout';


class Home extends Component {

    constructor(){
        super()
        this.state = {
            resturants:[],
            markers:[]
        }
        
        
    }

    
    componentDidMount(){
        console.log('componentDidMount')

        const url = './src/components/layout/resturants.json'

        superagent
        .get(url)
        .query(null)
        .set('Accept', 'text/json')
        .end((error, response) => {
            const resturants = response.body
            // console.log(JSON.stringify(resturants))
            this.setState({
                resturants: resturants
            })
        })
    }

 

    
render(){

    const location = {
        lat:  60.1665291,
        lng: 24.9310137
    }

   
        return (

           
          
             
                        <div className="container">
                         <h1 className="type--upercase">
                                    <em>
                                        <strong>WELCOME TO RESTURANT FINDER...</strong>
                                    </em>
                                </h1>
                            <div className="row">
                                <div className="col-md-4"> 
                                <Map 
                                center={location}
                                zoom={17}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `800px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                markers={this.state.resturants}
                               
                                />
                                </div>
                                <div className="col-md-8"> 
                                <h3 className="type--upercase">
                                    <em>
                                        <strong>If you already know the name of resturant, hit Search below...</strong>
                                    </em>
                                </h3>
                                <form>
                                    <input type="text" name="search" placeholder="Search.."/>
                                    </form>
                                    <h3 className="type--upercase">
                                    <em>
                                        <strong>...or you can choose from map at the side, the markers show available resturants...</strong>
                                    </em>
                                </h3>
                                <hr/>
                                    <Info resturants={this.state.resturants}/>
                                </div>
                            </div> 
                        </div>
                
        )
    }
}

export default Home;



{/* <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"> */}