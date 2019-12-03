/* Import package components */
import React, { useState, useEffect } from "react";
// import useStores from "../hooks/useStores";
import styled from "styled-components";


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

export default function LessonCard({lessonData}) {


  return (
    <>
    {/* <div>hello</div> */}
      <CardPage>
        <CardInCard>
          <img
            src={lessonData.image_url}
            style={{
              width: "100%",
              height: "65%",
              objectFit: "container"
            }}
          />
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              marginTop: "5px"
            }}
          >
            <p style={{ margin: 0 }}>Title: {lessonData.title}</p>
            <p style={{ margin: 0 }}>Author: {lessonData.owner_name}</p>
            <p style={{ margin: 0 }}>Skill: {lessonData.skill_name} </p>
          </div>
        </CardInCard>
      </CardPage>
    </>
  );
}


