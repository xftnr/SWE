import React, { Component } from 'react'
import {Navbar,Nav, Form, FormControl, Button, NavbarBrand} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class search extends Component {
    constructor (props) {
        super(props)
        this.title = this.id
        this.id = this.props.match.params;
        this.search = this.id['id']

        this.state = {};
        this.search_results = []
        console.log("GLOBAL SEARCH")
        }

        getBriefInfo(str, target, length) {
            // Target must be lower case
            var targetIndex;

            var info = str.split(" ");

            // find highlight
            for(let index in info){
                if(info[index].toLowerCase() === target.toLowerCase()){
                targetIndex = index;
                break;
                }
            }

            var left = [];
            var mid = [];
            var right = [];


            for(var i = (+targetIndex - length/2); i < (+targetIndex+length/2); i++){

                if( 0 <= i  && i < info.length){
                    if( i < targetIndex){
                        left.push(info[i]);
                    }
                    if(i == targetIndex){
                        mid=info[i];
                    }
                    if(i > targetIndex){
                        right.push(info[i]);
                    }
                }
            }

            var brief = [];
            brief.push(left);
            brief.push(mid);
            brief.push(right);
            // return "..."+brief.join(' ')+"...";
            return brief;
        }

        componentDidMount (){
            document.title = this.img;

            fetch(
                'https://www.energenius.me/api/energy?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.search_results.push(
                        <h2>
                            Energy Results for {this.search}
                        </h2>
                    )
                    for (const elem of data.entries()) {
                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'energy'

                        this.state[elem[1]['Name']] = this.info
                        var str = elem[1]['description'].replace('\n','')
                        var des = str.toLowerCase().split(" ");
                        if(des.includes(this.search.toLowerCase())){

                            var str = this.info['description'];

                            var brief = this.getBriefInfo(this.info['description'], this.search, 20)

                            var mid = brief[1];
                            var left = "..."+brief[0].join(" ")
                            var right = brief[2].join(" ")+"..."

                            console.log("HELLO WORLD")

                            this.search_results.push(
                            <div>

                                <h5>
                                    <Link to={'/energy/'+elem[1]['Name']}> {elem[1]['Name']} </Link>
                                </h5>


                                <div >
                                    <div className = "Button">{left} <b>{mid}</b> {right} </div>
                                    <br/>
                                    <br/>


                                </div>
                            </div>
                            )
                        }



                    }

                    this.setState({})


                })                .catch(e => {
                    console.log(e);
                })


            fetch(
                'https://www.energenius.me/api/production?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.search_results.push(
                        <h2>
                            Production Results for {this.search}
                        </h2>
                    )
                    for (const elem of data.entries()) {
                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'production'

                        this.state[elem[1]['Name']] = this.info
                        var str = elem[1]['description'].replace('\n','')
                        var des = str.toLowerCase().split(" ");
                        if(des.includes(this.search.toLowerCase())){

                            var str = this.info['description'];
                            var brief = this.getBriefInfo(this.info['description'], this.search, 20)

                            var mid = brief[1];
                            var left = "..."+brief[0].join(" ")
                            var right = brief[2].join(" ")+"..."


                            this.search_results.push(
                            <div>
                                <h5>
                                    <Link to={'/production/'+elem[1]['Name']}>{elem[1]['Name']}</Link>
                                </h5>


                                <div >
                                    <div className = "Button">{left} <b>{mid}</b> {right} </div>
                                    <br/>
                                    <br/>


                                </div>
                            </div>
                            )
                        }
                    }

                    this.setState({})


                })                .catch(e => {
                    console.log(e);
                })

            fetch(
                'https://www.energenius.me/api/country?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.search_results.push(
                        <h2>
                            Country Results for {this.search}
                        </h2>
                    )
                    for (const elem of data.entries()) {
                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'country'

                        this.state[elem[1]['Name']] = this.info


                        var str = elem[1]['description'].replace('\n','')
                        var des = str.toLowerCase().split(" ");
                        if(des.includes(this.search.toLowerCase())){

                            var str = this.info['description'];

                            var idx = str.indexOf(this.search);

                            var brief = this.getBriefInfo(this.info['description'], this.search, 20)

                            var mid = brief[1];
                            var left = "..."+brief[0].join(" ")
                            var right = brief[2].join(" ")+"..."


                            this.search_results.push(
                            <div>
                                <h5>
                                    <Link to={'/country/'+elem[1]['Name']}>{elem[1]['Name']}</Link>
                                </h5>


                                <div >
                                    <div className = "Button">{left} <b>{mid}</b> {right} </div>
                                    <br/>
                                    <br/>


                                </div>
                            </div>
                            )
                        }

                    }


                    this.setState({})




                })                .catch(e => {
                    console.log(e);
                })


            }

    render() {
        return (
        <div>


            <div>

                <p>{this.search_results}</p>

            </div>


            {/* Reset */}
            <Form  onSubmit={this.handleSubmit} noValidate inline className="justify-content-left col-xs-6" alignRight >
                <Link to={'/'}>

                  <Button variant="outline-primary" className="mt-2 mt-sm-0">
                    Reset
                  </Button>

                </Link>
            </Form>





        </div>
        )
    }
}
