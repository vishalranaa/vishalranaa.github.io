import React, { Component } from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard.js";
import "./ExperienceAccordion.css";
import { Accordion, Panel } from "baseui/accordion";

class ExperienceAccordion extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="experience-accord">
        {/* <Accordion> */}
          {this.props.sections.map((section) => {
            return (
              // <Panel
              //   className="accord-panel"
              //   title={section["title"]}
              //   key={section["title"]}
              //   overrides={{
              //     Header: {
              //       style: () => ({
              //         backgroundColor: `${theme.body}`,
              //         border: `1px solid`,
              //         borderRadius: `5px`,
              //         borderColor: `${theme.headerColor}`,
              //         marginBottom: `3px`,
              //         fontFamily: "Google Sans Regular",
              //       }),
              //     },
              //     Content: {
              //       style: () => ({
              //         backgroundColor: `${theme.body}`,
              //       }),
              //     },
              //   }}
              // >
              
              < div className="accord-panel"
              title={section["title"]}
              key={section["title"]}
              style={{
                backgroundColor: `${theme.body}`,
                marginBottom: `3px`,
                fontFamily: "Google Sans Regular",
              }}>
                <h3>{section["title"]}</h3>
                {section["experiences"].map((experience) => {
                  return (
                    <ExperienceCard experience={experience} theme={theme} />
                  );
                })}
                </div>
              
            );
          })}
        {/* </Accordion> */}
      </div>
    );
  }
}

export default ExperienceAccordion;
