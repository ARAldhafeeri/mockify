import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createProject, deleteProject, fetchProjects, updateProject } from "./projectThunk";
import { IFetchProjectResponse, IFetchedProjectData, IProjectInitState } from "types/Project";

const initialState : IProjectInitState = {
  project: [],
  loading: true,
  error: null
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // fetch projects
      .addCase(fetchProjects.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(fetchProjects.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchProjects.fulfilled, (
        state, action : PayloadAction<  IFetchProjectResponse | any>
        ) => {
        state.loading = false;
        state.project = action.payload;
      })


      // delete project
      .addCase(deleteProject.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(deleteProject.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteProject.fulfilled, (
        state, action : PayloadAction< any | IFetchProjectResponse>
        ) => {
        state.loading = false;
        state.project = state.project.filter((project: any) => project._id !== action.payload.data._id);
      })

      builder
      // update projects
      .addCase(updateProject.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(updateProject.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(updateProject.fulfilled, (
        state, action : PayloadAction<  IFetchProjectResponse | any>
        ) => {
        state.loading = false;
        const index = state.project.findIndex(
          (project: any) => project._id === action.payload.data._id);
        state.project[index] = {
          ...action.payload.data
        }

      })

      // create projects
      .addCase(createProject.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(createProject.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (
        state, action : PayloadAction<  IFetchProjectResponse[] | any >
        ) => {
        state.loading = false;

         state.project.push(action.payload.data);
      })
  },
});

export default projectSlice.reducer;