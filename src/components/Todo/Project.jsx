import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ProjectHeader from "./ProjectHeader";
import ProjectsList from "./ProjectsList";

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("projects").then(({ data }) => {
      setProjects(data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ProjectHeader />
      </Grid>
      <Grid item xs={12}>
        {projects.length === 0 ? (
          <div>暂无</div>
        ) : (
          <ProjectsList projects={projects} />
        )}
      </Grid>
    </Grid>
  );
};

export default Project;
