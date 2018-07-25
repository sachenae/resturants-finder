import React, { Component } from 'react';

class Info extends Component {

    render(){   
        const list = this.props.resturants.map((obj, i) => {
            return (
                <div className="col-sm-6" key= {i}>
                    <div className="card">
                        <div className="card-body">
                            <img 
                            className="card-img-top" 
                            style={{width: `100%`, height: `100%` }} 
                            src="http://i32.photobucket.com/albums/d22/sachenae/reactLogo_zpsc27yfp4q.jpg" alt="image cap" 
                            />
                                <h4 className="card-title">{obj.name}</h4>
                                    <h5 className="card-title">{obj.localized_city_name}</h5>
                                <p className="card-text">{obj.description}</p>
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <h6>
                    <em>
                        <strong>list of resturants shown in map</strong>
                    </em>
                </h6>
                <hr/>
                <div className="row">
                    {list}
                </div>
            </div>
        );
    }
}

export default Info;