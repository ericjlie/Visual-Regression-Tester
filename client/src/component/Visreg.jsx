import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import UrlForm from './visregChildren/UrlForm.jsx';
import UrlList from './visregChildren/UrlList.jsx';
import Test from './visregChildren/Test.jsx';

const Visreg = () => {
  const [urls, setUrls] = useState({});
  const [serverState, setServerState] = useState('rest');
  const [reportTime, setReportTime] = useState(null);
  const [testSelect, setTestSelect] = useState(null);
  const [testTimeStamp, setTestTimeStamp] = useState(null);
  const [report, setReport] = useState({});

  const createReference = async () => {
    setServerState('Referencing');
    Object.keys(urls).forEach( async (site) => {
      const domain = (new URL(site)).hostname.replace('www.', '');
      const bodyUrls = urls[site].map((subUrl, i) => {
        return {
          label: domain + [i],
          url: subUrl
        }
      })
      console.log(bodyUrls);
      axios.post('/reference', {
        urls: bodyUrls,
        testName: domain
      }).then(()=>{setServerState('rest')})
    });
  }
  const runTest = async () => {
    setServerState('Testing');
    let tests = []
    Object.keys(urls).forEach( async (site) => {
      const domain = (new URL(site)).hostname.replace('www.', '');
      const bodyUrls = urls[site].map((subUrl, i) => {
        return {
          label: domain + [i],
          url: subUrl
        }
      })
      console.log(bodyUrls);
      tests.push({urls: bodyUrls, testName: domain})
    })
    console.log(tests)
    axios.post('/test', {
        tests: tests
      }).then((time)=>{
        console.log(time.data)
        setTestTimeStamp(time.data);
        setServerState('rest');

      })
   ;
  }
  useEffect(()=> {
    Object.keys(urls).forEach( async (site) => {
      const domain = (new URL(site)).hostname.replace('www.', '');
      axios.get(`/visreg/${domain}/bitmaps_test/${testTimeStamp}/report.json`)
      .then(testReport=>setReport({...report, [site]: testReport.data}))
    })
  }, [testTimeStamp])
  return (
    <div>
      <UrlForm
      setUrls={setUrls}
      urls={urls}
      />
      <UrlList
      setUrls={setUrls}
      urls={urls}
      setTestSelect={setTestSelect}
      />
    {Object.keys(urls).length > 0 ? (
      serverState === 'rest' ?
      <div>
        <button onClick={createReference}>Create New References</button>
        <button onClick={runTest}>Run Test</button>
      </div>
      :
      <div>Server is {serverState}...</div>

    )
     : <div></div>}
    {testSelect ? <Test testSelect={testSelect} testTimeStamp={testTimeStamp}/> : <div></div>}
    </div>
  )

};

export default Visreg;