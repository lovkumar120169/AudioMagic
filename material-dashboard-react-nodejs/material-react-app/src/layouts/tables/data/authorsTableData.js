/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import music from "./luv1.mp3"
import CardMedia from '@mui/material/CardMedia';
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { MDDialogsDelete } from "components/MDDialogsDelete/MDDialogsDelete";
import "./authorsTable.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context";
import axios from "axios";
import { url } from "utils";
import { convertToCustomFormat } from "utils/dateCoverter";

export default function data() {
  const [showModal, setShowModal] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const [audios,Setaudios]=useState([])
 
  const token=localStorage.getItem("token")
  const getData=()=>{
    axios.get(`${url}/voice`,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res.data)
      Setaudios(res.data.voices)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const playAudio = async (audioId) => {
    console.log(audioId)
    try {
      setShowModal(true);
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/voice/audio/${audioId}`, {
        responseType: 'blob'
      });
      console.log("response",response)
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      console.log(audioUrl)
      setLoading(false);
    } catch (error) {
      console.error('Error playing audio:', error);
      setLoading(false);
    }
  };

  // console.log("added audio",audios)
  const user=JSON.parse(localStorage.getItem("user"))
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const date=new Date();
  const closeModal = () => {
    setShowModal(false);
    setAudioUrl('');
  };
  console.log("checking",audioUrl)
  useEffect(()=>{
    getData()
  },[])

  return {
    columns: [
      { Header: "audio", accessor: "audio", width: "45%", align: "left" },
      { Header: "Author", accessor: "author", align: "left" },
      { Header: "duration", accessor: "duration", align: "center" },
      { Header: "date / time", accessor: "date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
 
    rows:audios.map((ele)=>{
      return(
        {
          audio: <><button onClick={()=>playAudio(ele._id)}>Play</button>
          {showModal && (
            <div className="modal">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  <audio controls>
                    <source src={audioUrl} type="audio/mpeg" />
                  </audio>
                  <button onClick={closeModal}>Close</button>
                </div>
              )}
            </div>
          )}</>
        ,
        author: <Author name={user?.name.toUpperCase()} email={user?.email} />,
        duration: (
          <MDBox ml={-1}>
            7 min 28 sec
          </MDBox>
        ),
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {convertToCustomFormat(ele.updatedAt)}
          </MDTypography>
        ),
        action: (
          <>
            <MDTypography component="a" mr={0.5} href="#" variant="caption" color="text" fontWeight="medium">
              Convert
            </MDTypography>
            /
            <MDDialogsDelete/>
          </>
        ),
        }
      
      )
      })
    
    
  };
}
