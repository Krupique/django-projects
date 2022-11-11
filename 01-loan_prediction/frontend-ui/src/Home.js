import { Component } from 'react';
import './App.css';

function Home() {
  return (
    <div className="Home">
      <h1>Hello Home</h1>
      <JsonForm />
    </div>
  );
}

export default Home;


class JsonForm extends Component{
    constructor(props){
        super(props);
        this.state={Gender:"Male", Married:"No", Dependents:"0", Education:"Graduate", Self_Employed:"No", ApplicantIncome:"5489", 
                    CoapplicantIncome:"0", LoanAmount:"128", Loan_Amount_Term:"360", Credit_History:"1", Property_Area:"Urban",
                    score: -1
                };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        //console.log(event.target + " " + event.target.value);

        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "Gender":this.state.Gender,
            "Married":this.state.Married,
            "Dependents":this.state.Dependents,
            "Education":this.state.Education,
            "Self_Employed":this.state.Self_Employed,
            "ApplicantIncome":this.state.ApplicantIncome,
            "CoapplicantIncome":this.state.CoapplicantIncome,
            "LoanAmount":this.state.LoanAmount,
            "Loan_Amount_Term":this.state.Loan_Amount_Term,
            "Credit_History":this.state.Credit_History,
            "Property_Area":this.state.Property_Area
        });

        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
        fetch("http://127.0.0.1:8000/scoreJson/", requestOptions)        
            .then((resp) => resp.json())
            .then((respJ) => this.setState({score:respJ.score}))
            .catch(error => console.log('error', error));

    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <table><tbody>
                        <tr>
                            <td>Gender </td>
                            <td><input type="text" value={this.state.Gender} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        
                        <tr>
                            <td>Married </td>
                            <td><input type="text" value={this.state.Married} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>Dependents </td>
                            <td><input type="text" value={this.state.Dependents} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>Education </td>
                            <td><input type="text" value={this.state.Education} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>Self_Employed </td>
                            <td><input type="text" value={this.state.Self_Employed} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>ApplicantIncome </td>
                            <td><input type="text" value={this.state.ApplicantIncome} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>CoapplicantIncome </td>
                            <td><input type="text" value={this.state.CoapplicantIncome} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>LoanAmount </td>
                            <td><input type="text" value={this.state.LoanAmount} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>Loan_Amount_Term </td>
                            <td><input type="text" value={this.state.Loan_Amount_Term} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>Credit_History </td>
                            <td><input type="text" value={this.state.Credit_History} onChange={this.handleChange} name="input1"></input></td>
                        </tr>
                        <tr>
                            <td>Property_Area </td>
                            <td><input type="text" value={this.state.Property_Area} onChange={this.handleChange} name="input1"></input></td>
                        </tr>

                    </tbody></table>
                    <input type="submit" value="submit"></input>
                </form>

                <div>
                    <h3>The probability of getting approval is {this.state.score}</h3>
                </div>
            </div>
        )
    }
}