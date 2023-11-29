import logo from './logo.svg';
import './App.css';
import AppV1 from './AppV1';
import AppV2 from './AppV2';
import React, { Component } from 'react';
import * as d3 from 'd3';

const data = 
  [
    {id: "Sandbox", name: "Sandbox",value:50},
    {id: "Intra-Organziation", value:100},
    {id: "Community Development", value:100},
    {id: "ESG Fellowship", value:100},
    {id: "Software", value:200},
    {id: "Business Model Strategy", value:100},
    ];

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			tab: 'V2'
		}
		this.welcome = this.welcome.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		document.querySelector('#tabOne').classList.add('bg-white');
		document.querySelector('#tabTwo').classList.add('bg-black');
		document.querySelector('#tabThree').classList.add('bg-white');
	}
	handleClick(e){
		this.setState({
			tab: e.target.innerHTML,
		})
	}

	welcome(p) {
		if(p === 'V1'){
			document.querySelector('#tabOne').classList.replace('bg-white', 'bg-black');
			document.querySelector('#tabTwo').classList.replace('bg-black', 'bg-white');
			document.querySelector('#tabThree').classList.replace('bg-black', 'bg-white');
			return <AppV1 data={data}/>;		
		}else if(p === 'V2'){
			if(document.querySelector('#tabOne')){
				document.querySelector('#tabOne').classList.replace('bg-black', 'bg-white');
				document.querySelector('#tabTwo').classList.replace('bg-white', 'bg-black');
				document.querySelector('#tabThree').classList.replace('bg-black', 'bg-white');
			}
			return <AppV2 data={data}/>
		}else if(p === 'V3'){
			document.querySelector('#tabOne').classList.replace('bg-black', 'bg-white');
			document.querySelector('#tabTwo').classList.replace('bg-black', 'bg-white');
			document.querySelector('#tabThree').classList.replace('bg-white', 'bg-black');
		}
	}
	render(){
	  var myTab = this.state.tab;
	  const tabCount = 3;

	  return (
	    <div>
	    	<header>

		      {
		      	this.welcome(myTab)
		      }
	      	<div id="tabs" className="flex justify-center">
		      	<ul>
		      	{
		      		[...Array(tabCount)].map((e, i) => <li className="float-left">Hello</li>)
		      	}
		      		<li onClick={(e) => this.handleClick(e)} id="tabOne" className="">V1</li>
	      			<li onClick={(e) => this.handleClick(e)} id="tabTwo" className="">V2</li>
		      		<li onClick={(e) => this.handleClick(e)} id="tabThree" className="">V3</li>
		      	</ul>
	      	</div>
	      	</header>
	    </div>
	  );
	}
}

export default App;