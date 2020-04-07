import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import './SavedJobsPage.scss'
import SavedJobsContainer from '../SavedJobsContainter/SavedJobsContainer'

function SavedJobsPage() {
  const [savedList, setSavedList] = useState("");
  const user_id = useSelector(state => state.user.user_id);

  useEffect(() => {
    getListings()
  });

  function getListings(){
    axios.get(`/api/listings/${user_id}`).then(res => {
      setSavedList(res.data);
    }).catch(err => console.log(err));
  }

  function deleteListing(e) {
    let id = e.target.value;
    let body = {
        user_id: user_id
    }
    axios.post(`/api/delete/${id}`, body).then(res => {
        setSavedList(res.data);
      }).catch(err => console.log(err));
  }

  return (
    <div className="savedJobsParentContainer">
      <p className="savedJobs">Saved Jobs</p> 
      {savedList ? <SavedJobsContainer savedList={savedList} deleteListing={deleteListing} /> : null}
    </div>
  );
}

export default SavedJobsPage;
