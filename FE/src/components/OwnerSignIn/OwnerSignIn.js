import React from 'react';
import './OwnerSignIn.css';
import { Container, Row, Col, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies'
import {connect} from 'react-redux'
import * as Actions from '../../actions/login_signup.js'
import serializeForm from 'form-serialize'

import jwtDecode from 'jwt-decode'

const mapStateToProps = (state) => {
  console.log("here",state)
 return {
   /*signInEmail : state.loginSingup.signInEmail,
   signInPassword : state.signInPassword,
   errors : state.errors,
   Redirection_Value : state.Redirection_Value*/
   loginSingup : state.LOGIN
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitSignInFalse : () => {dispatch(Actions.setErrorsasTrue(true))},
    onSubmitSignInTrue : () =>  {dispatch(Actions.setRedirectionasTrue(true))},
    onSubmitLog : (event) => {
      event.preventDefault();
      const values = serializeForm(event.target, { hash: true })
      console.log(values)
     var UserSignIn = { signInEmail: values.mailid , signInPassword : values.password}
     console.log("OBJECT IS " + JSON.stringify(UserSignIn))
     dispatch(Actions.SignIn(UserSignIn))
    }
    }
}


// const mapStateToProps = (state) => {
//   console.log("here",state)
//  return {
//    signInEmail : state.signInEmail,
//    signInPassword : state.signInPassword,
//    errors : state.errors,
//    Redirection_Value : state.Redirection_Value
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onEmailChange : (event) => dispatch(Actions.setUsernameField(event.target.value)),
//     onPasswordChange : (event) => dispatch(Actions.setPasswordField(event.target.value)),
//     onSubmitSignInFalse : () => {dispatch(Actions.setErrorsasTrue(true))},
//     onSubmitSignInTrue : () =>  {dispatch(Actions.setRedirectionasTrue(true))}
//         }
// }

class OwnerSignIn extends React.Component {

  constructor(props) {
    super(props);
  }
/*
  onSubmitSignIn = () => {
    fetch('http://localhost:4004/owner/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials : 'include',
      body: JSON.stringify({
      username: this.props.signInEmail,
      password: this.props.signInPassword
      })
    })
    .then(response => {
      if(response.status === 400)
        {
          //this.setState({errors : true})
          this.props.onSubmitSignInFalse()
        }
      else
        {
          response.json()
          .then(user => {
          console.log("NAME" + user)
          this.props.loadUser(user);
          //this.setState({Redirection_Value : true})
          this.props.onSubmitSignInTrue()
          })
        }
      })
  }
  */
 onSubmitSignIn = (event) => { 
  const request = async () => {
    await this.props.onSubmitLog(event)
 // await fetch('http://localhost:4004/owner/login', {
     await fetch('http://13.52.55.245:4004/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials : 'include',
      body: JSON.stringify({
      username: this.props.loginSingup.signInEmail,
      password: this.props.loginSingup.signInPassword
      })
    })
    .then(response => {
      if(response.status === 400)
        {
          console.log("This is called as False")
          this.props.onSubmitSignInFalse()
        }
      else
        {
          console.log("This is called as True")
          response.json()
          .then(user => {
              var decoded = jwtDecode(user);
              var accounttype = decoded.user.type;
              var userone = decoded.user._id;
              console.log("ACC - " + accounttype)
              console.log("USER", userone)
              localStorage.setItem("ACCOUNTTYPE", accounttype);
            //  localStorage.setItem("userId", username);
            //   response.json()
            //    .then(user => {
                console.log("NAME - " + userone)
                this.props.loadUser(userone);
                this.props.onSubmitSignInTrue()
              //  })
          })
        }
      })
    }
    request();
}

  /*render()
  {
    let Redirecty = null;
    let Errors = null;
     if(this.props.errors === true)
    {
      Errors = <p class="error">Username or Password doesn't exist </p>
    }
      if(this.props.Redirection_Value === true)
      {
       Redirecty =  <Redirect to="/owner/home" />
      }
      if(cookie.load('cookieowner'))
     {
        Redirecty =  <Redirect to="/owner/home" />
     }*/
     render()
     {
       let Redirecty = null;
       let Errors = null;
         console.log("HEEREE")
        const { handleSubmit } = this.props;
        var USERTYPE = localStorage.getItem("ACCOUNTTYPE")

      if(this.props.loginSingup.Redirection_Value === true &&  USERTYPE==="owner")
       {
        Redirecty =  <Redirect to="/owner/home" />
       }
       if(this.props.loginSingup.errors === true)
       {
         Errors = <p class="error">Username or Password doesn't exist </p>
       }
     return(
      <div>
    {Redirecty}
       <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <a class="navbar-brand" href="#"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://static.savings-united.com/shop/20251/logo/Logo_0062_HomeAway.png" height="150" width="150"/></a>
            <ul class="navbar-nav mr-auto">
            </ul>
            <ul class="navbar-nav">
                <li>
                <a class="site-header-birdhouse" href="/" title="Learn more"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://lh3.googleusercontent.com/peTB5wWV332_otZJMJ897LqTv2B40lity4VDuStgZ4U8ocCGKUBGisnjSi9TyhXSOydm=s180" height="50" width="50"/></a>          
                </li>
            </ul>
    </nav>
    <br />
    <hr />
      <Container>
       <h1> Log in to HomeAway </h1>
        <p className="font-small grey-text d-flex justify-content-center">Not a member? <a href="/owner/signup" className="blue-text ml-1"> Sign Up</a></p>
        <section className="form-elegant">
          <Row >
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">Account Login</h3>
                    <hr></hr>
                  </div>
                 <form onSubmit={this.onSubmitSignIn} > {/*{handleSubmit(this.onSubmit.bind(this))*/}
                  <input type="text" name="mailid" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"  onChange={this.props.onEmailChange} required/>
                  <br>
                  </br>
                  <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.props.onPasswordChange} required/>
                   <br>
                  </br>
                  <p className="blue-text d-flex pb-3">Forgot <a href="www.google.com" className="blue-text ml-1"> Password?</a></p>
                  <div className="text-center mb-3">
                    <input type="submit" gradient="blue" className="btn btn-primary btn-lg btn-block" value="Log In"/>
                      <hr></hr>
                  </div>
                  </form>
                </CardBody>     
              </Card>
            </Col>
          </Row>
        </section>
         {Errors}
      </Container>
      </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerSignIn);



/*
    return(
      <div>
      {Redirecty}
       <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <a class="navbar-brand" href="/owner/login"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://static.savings-united.com/shop/20251/logo/Logo_0062_HomeAway.png" height="150" width="150"/></a>
            <ul class="navbar-nav mr-auto">
            </ul>
            <ul class="navbar-nav">
                <li>
                <a class="site-header-birdhouse" href="/owner/login" title="Learn more"><img alt="HomeAway birdhouse" class="site-header-birdhouse__image" role="presentation" src="https://lh3.googleusercontent.com/peTB5wWV332_otZJMJ897LqTv2B40lity4VDuStgZ4U8ocCGKUBGisnjSi9TyhXSOydm=s180" height="50" width="50"/></a>          
                </li>
            </ul>
    </nav>
    <br/>
  <hr />
      <Container>
       <h1> Log in to HomeAway </h1>
             <p className="font-small grey-text d-flex justify-content-center">Not a member? <a href="/owner/signup" className="blue-text ml-1"> Sign Up</a></p>
        <section className="form-elegant">
          <Row >
            <Col md="4" className="mx-auto">
              <Card>
                <CardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">Owner Account Login</h3>
                    <hr></hr>
                  </div>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"  onChange={this.props.onEmailChange} required/>
                  <br>
                  </br>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={this.props.onPasswordChange} required/>
                   <br>
                  </br>
                  <p className="blue-text d-flex pb-3">Forgot <a href="www.google.com" className="blue-text ml-1"> Password?</a></p>
                  <div className="text-center mb-3">
                    <Button type="button" gradient="blue" className="btn btn-primary btn-lg btn-block" onClick = {this.onSubmitSignIn}>Log In</Button>
                      <hr></hr>
                  </div>
                </CardBody>     
              </Card>
            </Col>
          </Row>
        </section>
         {Errors}
      </Container>
      </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerSignIn);
*/
