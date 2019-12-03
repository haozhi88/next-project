/* Import package components */
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";
import { observer } from "mobx-react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import LessonCard from "../components/LessonCard";


/* Import app components */
import DialogPage from "../components/DialogPage";


const FeaturedPage = styled.div`
  height: 22vh;
  border: 1px solid #1589ff;
  border-radius: 1px;
  width: 92vw;
`;

const FeaturedPageWrapper = styled.div`
  width: 96vw;
  margin-bottom: 50px;
`;

const CardPage = styled.div`
  height: 260px;
  /* width: 30vw; */
  /* border: 1px solid #1589ff; */
  padding: 5px;
`;
const CardInCard = styled.div`
  border: 1px solid #1589ff;
  border-radius: 1px;
  height: 100%;
  background-color:white;
`;
 const HeaderTitle = styled.div`
  padding: 5px;
  color: #4c4c4c;
  font-size: 24px;
  font-weight: 550;
 `

function Content() {
  const {
    userStore: { currentUser, logout, checkUserLoggedIn }
  } = useStores();
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };
  useEffect(() => {
    // Check if user already logged in
    if (!currentUser.loggedIn) {
      checkUserLoggedIn();
    }
  }, []);

  const Featuredsettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3250,
    pauseOnHover: true
  };
  const Cardsettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  const [TeachsData, setTeachsData] = useState({
    Teachdata:[]
  });

  const [LearnsData, setLearnsData] = useState({
    Learndata:[]
  });

  useEffect(() => {
    axios
      .get(`${getApiRoute("lessons/filter?")}teach=false`)
      .then(result => {
        let lessonList = result.data;
        let newLessonList = [];
        // Filter out lessons that belong to user
        for (let i = 0; i < lessonList.length; i++) {
          if (lessonList[i].owner_id !== currentUser.id) {
            newLessonList.push(lessonList[i]);
          }
        }
        console.log(newLessonList)
        setLearnsData({
          Learndata: newLessonList
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${getApiRoute("lessons/filter?")}teach=true`)
      .then(result => {
        let lessonList = result.data;
        let newLessonList = [];

        // Filter out lessons that belong to user
        for (let i = 0; i < lessonList.length; i++) {
          if (lessonList[i].owner_id !== currentUser.id) {
            newLessonList.push(lessonList[i]);
          }
        }
        console.log(newLessonList)
        setTeachsData({
          Teachdata: newLessonList
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <>
      <Grid item>
      <FeaturedPageWrapper style={{paddingTop:"12px"}}>
        <HeaderTitle>Featured</HeaderTitle>
        <Slider {...Featuredsettings}>
          <FeaturedPage>
            <img
              src={require('../media/fea1.png')}
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          </FeaturedPage>
          <FeaturedPage>
          <img
              src={require('../media/fea2.png')}
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          </FeaturedPage>
          <FeaturedPage>
            <img
              src={require('../media/fea3.png')}
              style={{
                width: "100%",
                height: "100%"
              }}
            />
          </FeaturedPage>
        </Slider>
        <HeaderTitle style={{ paddingTop:"25px", color:"#1589FF" }}>Learn</HeaderTitle>
        <div style={{ backgroundColor:"#e2e2e2"}}>
        <Slider {...Cardsettings}>
          <CardPage>
            <CardInCard onClick={() => routeTo(route.createLearnPage)} > 
              <IconButton style={{ height: "100%", width: "100%" }}>
                <AddIcon style={{ color: "1589FF", fontSize: "62px" }} />
              </IconButton>
            </CardInCard>
          </CardPage>
          {LearnsData.Learndata.map(lessonData => (
            <div
            key={lessonData.id}
            onClick={() => {
              setRouteArgs({ lesson: lessonData, showAction: true });
              routeTo(route.lessonPage);
            }}
          > 
          <LessonCard lessonData={lessonData}/>
          </div>
          ))}
        </Slider>
        </div>
        <HeaderTitle style={{ paddingTop:"45px", color:"#1589FF" }}> Teach</HeaderTitle>
        <div style={{ backgroundColor:"#e2e2e2"}}>
        <Slider {...Cardsettings}>
          <CardPage>
            <CardInCard onClick={() => routeTo(route.createTeachPage)}>
              <IconButton style={{ height: "100%", width: "100%" }}>
                <AddIcon style={{ color: "1589FF", fontSize: "62px" }} />
              </IconButton>
            </CardInCard>
          </CardPage>
          {TeachsData.Teachdata.map(lessonData => (
            <div
            key={lessonData.id}
            onClick={() => {
              setRouteArgs({ lesson: lessonData, showAction: true });
              routeTo(route.lessonPage);
            }}
          > 
          <LessonCard lessonData={lessonData}/>
          </div>
          ))}
        </Slider>
        </div>
      </FeaturedPageWrapper>
      </Grid>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        routeArgs={routeArgs}
        dialogOpen={dialogOpen}
        />
    </>
  );
}

export default observer(Content);
