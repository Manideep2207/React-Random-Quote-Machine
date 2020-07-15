import React from 'react'
import ReactDOM from 'react-dom'
const COLORS = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"]
console.log(COLORS[0]);
class RandomQuote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quote: '',
			author: '',
			color: "",
		};
		this.handleClick = this.handleClick.bind(this)
	}
	componentDidMount() {
		this.handleClick();
	}
	handleClick() {
		fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
			.then(response => response.json())
			.then((data) => {
				let quotes = data.quotes.map((q) => 
				{
					return (
						{quote: q.quote,
							author:q.author})
				})
				let randomIndex = Math.floor(Math.random() * quotes.length);
				let newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
				let newQuote = quotes[randomIndex];
			})
				this.setState({
					quote: newQuote.quote,
					author: newQuote.author,
					color: newColor
				})
			
	}
	render() {
		return (
			<div>
			<div id = "wrapper-block" className = "row w-auto h-100 d-flex flex-wrap justify-content-center" style = {backgroundColor: this.state.color}>
        <div id = "quote-box" className="col-xs-12 col-sm-10 col-md-8 my-auto rounded shadow-lg p-5 mb-5">
          <h3 
          id="text" 
          className="text-center"
          >{this.state.quote}</h3>
       
        <h4 
          id="author" 
          className="text-right font-weight-bold"
          >{this.state.author}</h4>
          <div className="row d-flex justify-content-between pt-2">
          
          <a 
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text="${this.state.quote}" - ${this.state.author}`}
            target="blank"
            className="btn btn-lg btn-tw m-2 col-xs-4"
            >
            <i className="fab fa-twitter"></i>
          </a>
          
          <button 
           id="new-quote"
           type="button"
           className="col-xs-4 btn m-2 font-weight-bold"
            onClick={this.handleClick}>New Quote</button>
          </div>
          </div>
      </div>
      </div>
			 );
	}
};
export default RandomQuote;
ReactDOM.render(<RandomQuote />, document.getElementById('root'))