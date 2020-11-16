import React from "react";
import "../scss/Login.scss";

const Login = (props) =>{
  const {email,
  setEmail,
  password,
  setPasswrod,
  emailError,
  passwordError,
  hasAccount,
  setHasAccount,
  handleSignIn,
  handleSignUp} = props


 return (
   <section className="login">
     <label>Username</label>
     <input type="text" autoFocus required value={email} onChange={e=> setEmail(e.target.value)}></input>
  <p className="error">{emailError}</p>
 
     <label>Password</label>
     <input type="password" required value={password} onChange={e=> setPasswrod(e.target.value)}></input>
 <p className="error">{passwordError}</p> 

 <div className="login__button">
   {hasAccount ? 
   <> 
   <button onClick={handleSignIn}>Sign In</button>
   <p>Don't Have an Account? <span onClick={()=> setHasAccount(!hasAccount)}>Sign Up</span></p>
   </>
   : 
   <>
   <button onClick={handleSignUp}>Sign Up</button>
   <p>Have an Account? <span onClick={()=> setHasAccount(!hasAccount)}>Sign In</span></p>
   </>}
 </div>
   </section>

 )
}

export default Login;
