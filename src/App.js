import React from 'react'
import './App.css';
import axios from 'axios'
import Progress_bar from './progressbar';
class App extends React.Component{
  
  state = { 
    count: '',
    total: '',
    percentage: ''
  }

  componentDidMount(){
    this.fetchCount()
  }
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });


 
  fetchCount = () => {
    axios.get('https://tscache.com/donation_total.json')
      .then((response) =>{
       let {count} = response.data

        this.setState({count})
        let total = 30000000
        let str = (count / total) * 100
        let percentage = str.toFixed(0)
        this.setState({percentage})
        total = total - count
        this.setState({total})
      }).catch ((error) =>{
        console.log(error);
      })
      
  }
  
  render(){
    return (
      <div className="app">
        <div className="card">
        <img src="https://assets01.teamassets.net/assets/images/teamseas-tm-logo.png" width="300px" />
        <p>Help them to remove 30 million pounds of trash by January 1st, 2022.</p>
        <div className="row">
          <div>
          <h1 className="heading">{this.formatter.format(this.state.count)}</h1>
          <span>Donated</span>
          </div>
          <div>
            <h1 className="heading red">{this.formatter.format(this.state.total)} </h1>
            <span>Remaining</span>
          </div>
        </div>

        <Progress_bar bgcolor="green" progress={this.state.percentage}  height={25} />

        <button className="button">
          <a href="https://teamseas.org/" target="_blank">Donate &#8594;</a>
        </button>
        
        </div>
       
      </div>
    )
  }
}

export default App;
