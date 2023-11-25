import React, { Component } from 'react';
import * as d3 from 'd3';

class AlterTable extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
		}
	}

	render(){
		 return (
		    <div className='alter-table'>
		    	{
		    		this.props.data.map((item) => {
		    			if(item.children){
		    				var myLabel = item.data.name;
		    				var myLabelScore = 0;
		    				return(
		    					<ul className={'list-header'}>{myLabel}
								{	
									item.children.map((child) => {
										myLabelScore+=1;
										myLabel = (myLabelScore === 1) ? item.data.name : "";
			    						return (
			    									<li className="list-item">{child.data.name}</li>
			    						)
			    					})
								}
		    					</ul>
		    				)
		    			}else{
		    				if(item.parent.data.name === 'Eve'){
		    					return (
		    							<ul className="list-header">{item.data.name}
		    							</ul>
		    						)
		    				}
		    			}
		    		})
		    	}
		    </div>
		  );
	}
}

export default AlterTable;

{/*
			    					<li>{item.data.name}
			    					<ul>
			    					<li>{child.name}</li>
			    					</ul>
			    					</li>*/}

{/*			    	<li>InnerOne</li>
			    	<li>InnerTwo
			    		<ul>
			    		<li>Innto</li>
			    		<li>Intooo</li>
			    		</ul>
			    	</li>

			    	<li>InnerThree</li>

*/}

// .list-item{
//   background-color: gray;
//   border: 2px solid black;
//   list-style-type: none;
//   margin-left: 100px;
// }
