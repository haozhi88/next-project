/* Import package components */
import React from "react";

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
  background-color: white;
`;

export default function LessonCard({ lessonData }) {
  return (
    <>
      <CardPage>
        <CardInCard>
          <img
            src={lessonData.image_url}
            style={{
              width: "100%",
              height: "65%",
              objectFit: "container"
            }}
            alt="lesson"
          />
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              marginTop: "5px"
            }}
          >
            <div style={{ display: "flex", margin: 0, fontWeight: "bold" }}>
              Title:
              <p style={{ margin: 0, fontWeight: "normal" }}>
                {lessonData.title}
              </p>
            </div>
            <div style={{ display: "flex", margin: 0, fontWeight: "bold" }}>
              Author:
              <p style={{ margin: 0, fontWeight: "normal" }}>
                {lessonData.owner_name}
              </p>
            </div>
            <div style={{ display: "flex", margin: 0, fontWeight: "bold" }}>
              Skill:
              <p style={{ margin: 0, fontWeight: "normal" }}>
                {lessonData.skill_name}
              </p>
            </div>
          </div>
        </CardInCard>
      </CardPage>
    </>
  );
}
