import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitUser, loggedIn } from "../../redux/reducer";
import axios from "axios";
import './SavedJobsPage.scss'
import SavedJobsContainer from '../SavedJobsContainter/SavedJobsContainer'

function SavedJobsPage() {
  const [savedList, setSavedList] = useState("");
  const user_id = useSelector(state => state.user.user_id);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userPull = localStorage.getItem("user")
    console.log(userPull)
    if (userPull){
      dispatch(submitUser(JSON.parse(userPull)));
      dispatch(loggedIn());
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  })

  useEffect(() => {
    getListings()
  });

  useEffect(() => {
    const pullback = localStorage.getItem("my-list")
    if (pullback){
      setSavedList(JSON.parse(pullback))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("my-list", JSON.stringify(savedList))
  })


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
