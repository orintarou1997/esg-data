import logo from './logo.svg';
import './App.css';
import BubbleChart from './components/BubbleChart';
import AlterTableV3 from './components/AlterTableV3';
import React, { Component } from 'react';
import * as d3 from 'd3';

class AppSelect extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
		}

		this.handler = this.handler.bind(this);
		this.handleDelete =  this.handleDelete.bind(this);
		//this.handleAddition = this.handleAddition.bind(this);
	}

	handler(id, action, value){	
		this.setState({
			data: []
		})
	}

	handleDelete(id){
		var newData = this.state.data;
		for(var i in newData.children){
			if(newData.children[i].id === id){
				newData.children.splice(i, 1);
			}
		}
		this.setState({
			data: newData,
		})
	}

	render(){
	  return (
	  	<div>
	      <BubbleChart data={this.props.data}/>
	      <AlterTableV3 handleAddition={this.handleAddition} handleDeleteItem={this.handleDelete} handler={this.handler} data={this.props.data}/>
	    </div>
	  );
	}
}

export default AppSelect;