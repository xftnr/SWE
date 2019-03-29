import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import {Jumbotron, Button, Carousel} from 'react-bootstrap'
// import DocumentTitle from 'react-document-title/DocumentTitle';

class CountryInstance extends Component {
    constructor (props) {
      super(props)
      this.states={}
      this.title = this.id
      this.id = this.props.match.params;
      this.img = this.id['id']
    }
    componentDidMount (){
        fetch(
            'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exsentences=10&origin=*&titles='+this.id['id']
        )
            .then(response => response.json())
            .then(data => {

                var v = data['query']['pages'];
                var keys = Object.keys(v);
                this.states['result'] = data['query']['pages'][keys[0]]['extract'];
            //   process the data
            this.setState({})
            })
            .catch(e => {
                console.log(e)
            })
        }

    render() {
        return (

        <div>
            <div class="row">

                    <div class="col-md-8 blog-main">
                        <h2 class="blog-post-title">{this.title}</h2>
                        <div class="ml-1">
                            <p class="px-5 c font" >
                               {this.states['result']}
                            </p>
                        </div>


                    </div>

                    <aside class="col-md-4 blog-sidebar">
                        <div class="p-4">
                        {/* <img class="img-rounded" src="../bootstrap/img/country/china/china1.png" width = "300"> */}
                        <img src={require('../../img/country/API/'+this.img+'.jpg')} width="80%" height="80%" />

                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Production&Usage</h4>
                        <ol class="list-unstyled mb-0">
                            <li><Link to={'/production/'+'Biomass_heating_system'}>Residential</Link></li>
                            <li><Link to={'/production/'+'Radioactive_tracer'}>Medical</Link></li>
                            <li><Link to={'/production/'+'Hydraulic_fracturing'}>Hydraulic Fracturing</Link></li>

                        </ol>
                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Energy Categories</h4>
                        <ol class="list-unstyled">
                            <li><Link to={'/energy/'+'Solar_energy'}>Solar</Link></li>
                            <li><Link to={'/energy/'+'Nuclear_power'}>Nuclear</Link></li>
                            <li><Link to={'/energy/'+'Natural_gas'}>Natural Gas</Link></li>

                        </ol>
                        </div>
                    </aside>

            </div>
        </div>

        )
    }
}

export default CountryInstance
