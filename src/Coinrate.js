import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Coinrate extends Component{
	constructor(props){
		super(props);
		this.state = {
			coindata:[],
			result:[],
			searchText:'',
		}
		this.handleText = this.handleText.bind(this);
	}
	componentWillMount(){
    	setInterval(()=>{
    		axios.get('http://cors-proxy.htmldriven.com/?url=https://bittrex.com/api/v1.1/public/getmarketsummaries')
      .then(res => {
      	var result = JSON.parse(res.data.body);
      	var data = result.result;
      	this.setState({coindata:data, result:data})
      })
  }, 5000);
  }

  handleText(e){
  	let text = e.target.value.toUpperCase();
  	let data = [];
  	let oldData = this.state.coindata;
  	this.setState({
  		searchText:text,
  	},()=>{
  		console.log(this.state.searchText);
  		if(this.state.searchText != ''){
	  		for(let i =0; i<this.state.coindata.length;i++){
	  			if(this.state.coindata[i].MarketName.indexOf(this.state.searchText) >1){
	  				data.push(this.state.coindata[i]);
	  			}
	  		}
	  		this.setState({result:data},()=>{
	  			console.log(this.state.result);
	  		})
  		}
  		else{
  			this.setState({result:oldData})
  		}
  	})
  }

	render(){
		console.log('it rendered');
		return(

			<div className="coinrate container-fluid">
				<h3> Crypto Coin Rate </h3>
				<input type="text" className="form-control search-coin pull-right col-sm-4 col-xs-12 col-lg-3 col-md-4"placeholder="Search Coin By Name" onChange={this.handleText} value={this.state.searchText}/>
				<hr />
				<div className="row">
					{
						this.state.result.map((item,index)=>{
							if(item.MarketName){
								item.MarketName = item.MarketName.replace('BTC-','');
							}
							return(
								<div className="col-sm-3 col-xs-6 col-lg-3 col-md-3" key={index}>
									<Card>
										<CardBody>
								          <CardTitle>{item.MarketName}</CardTitle>
								          <CardSubtitle> Current Price - {item.Last}</CardSubtitle>
								          <CardSubtitle> Max Price - {item.High}</CardSubtitle>
								          <CardSubtitle> Min Price - {item.Low}</CardSubtitle>
								          <CardSubtitle> Volume - {item.BaseVolume}</CardSubtitle>
								        </CardBody>
									</Card>
								</div>
								);
						})
					}
				</div>
			</div>

		);
	}
}