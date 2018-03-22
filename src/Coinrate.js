import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import './css/custom.css';
export default class Coinrate extends Component{
	constructor(props){
		super(props);
		this.state = {
			coindata:[],
		}
	}
	componentWillMount(){
	    	setInterval(()=>{
	    		let oldData = this.state.coindata;
	    		axios.get('http://cors-proxy.htmldriven.com/?url=https://bittrex.com/api/v1.1/public/getmarketsummaries')
	      .then(res => {
	      	var result = JSON.parse(res.data.body);
	      	var data = result.result;
	      	if(oldData.length > 0){
		      	for(var i =0; i<data.length; i++){
		      		if(oldData[i].Last > data[i].Last){
		      			data[i].LastState = 'low';
		      		}
		      		else{
		      			data[i].LastState = 'high';
		      		}
		      		if(oldData[i].BaseVolume > data[i].BaseVolume){
		      			data[i].BaseVolumeState = 'low';
		      		}
		      		else{
		      			data[i].BaseVolumeState = 'high';
		      		}
		      		if(oldData[i].Bid > data[i].Bid){
		      			data[i].BidState = 'low';
		      		}
		      		else{
		      			data[i].BidState = 'high';
		      		}
		      		if(oldData[i].Ask > data[i].Ask){
		      			data[i].AskState = 'low';
		      		}
		      		else{
		      			data[i].AskState = 'high';
		      		}
		      	}
	      	}
	      	this.setState({coindata:data})
	      })
	  }, 5000);
  }

	render(){
		return(

			<div className="coinrate container-fluid">
				<h3 className="page-title"> Crypto Coin Rate </h3>
				<hr />
				<div className="row">
					{
						this.state.coindata.map((item,index)=>{
							var bidState;
							var askState;
							if(item.Bid > item.Ask) {
								bidState = 'high'
								askState = 'low';
							}
							else{
								askState = 'high';
								bidState = 'low';
							}
							return(
								<div className="col-sm-3 col-xs-6 col-lg-3 col-md-3" key={index}>
									<div className="figure">
										<div className="header">
											<h4> {item.MarketName} </h4>
										</div>
										<hr />
										<div className="body text-left">
											<div className="form-group">
												<label> Current Price <i className=""/></label> <small className={item.LastState}> {item.Last} </small>
											</div>
											<div className="form-group">
												<label> Current BID <i className=""/></label> <small className={item.BidState}> {item.Bid} </small>
											</div>
											<div className="form-group">
												<label> Current ASK <i className=""/></label> <small className={item.AskState}> {item.Ask} </small>
											</div>
											<div className="form-group">
												<label> Maximum Price <i className=""/></label> <small> {item.High} </small>
											</div>
											<div className="form-group">
												<label> Minimum Price <i className=""/></label> <small> {item.Low} </small>
											</div>
											<div className="form-group">
												<label> Volume  <i className=""/></label> <small className={item.BaseVolumeState}> {item.BaseVolume} </small>
											</div>
										</div>
									</div>
								</div>
								);
						})
					}
				</div>
			</div>

		);
	}
}