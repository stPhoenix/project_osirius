import React from 'react';


export const FeedbackComponent = ({p_name, email, p_text, onChange, click}) => {
  return(
    <section className="row d-flex justify-content-center">
            <div className="col-12 col-md-11 col-xl-7 d-flex flex-column my-4">
                <h2 className="text-center">Have something to say?</h2>
                <form>
                    <input className="custom-form-control" type="text" name="p_name" placeholder="Your name" onChange={onChange} />
                    <input className="custom-form-control my-2" type="email" name="email" placeholder="Your email" onChange={onChange} />
                    <textarea className="custom-form-control" name="p_text" rows="3" placeholder="Text" onChange={onChange}></textarea>
                </form>
                <button className="custom-btn btn-primary mx-auto mt-2 px-4 rounded-0" onClick={click}>Send</button>
            </div>
    </section>
  ); 
};