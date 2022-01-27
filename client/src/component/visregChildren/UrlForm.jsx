import React, { useState, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const UrlForm = ({urls, setUrls}) => {
  const [searchStatus, setearchStatus] = useState(false)
  const urlField = useRef();
  const checkbox = useRef('');

  const getSubpages = async () => {
    const subUrls = await axios.get('/urls', {
      params: {
        url: urlField.current.value
      }
    })
    return subUrls;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if(!checkbox.current.checked) {
      setUrls({...urls, [urlField.current.value]: [urlField.current.value]});
    } else {
      getSubpages(urlField.current.value)
        .then((response) => setUrls({...urls, [urlField.current.value]: response.data}))
        .catch((e)=>{console.log(e)});
    }
  }
  return (

    <div>
      <form onSubmit={submitHandler}>
        <label>Enter Website to Test:</label>
        <input type="url" ref={urlField} required></input>
        <br/>
        <label>Include Website Subpages:</label>
        <input type="checkbox" ref={checkbox}/>
        <button>Submit</button>
      </form>
      {searchStatus ? <div>Searching for urls...</div> : <div></div>}
    </div>
  )

};

export default UrlForm;