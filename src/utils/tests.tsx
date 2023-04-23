import { Box, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import CaptionedComponent from "../components/Captioned/Captioned";
import Content from "../components/Content/Content";
import Tag from "../components/Tags/Tag";
import NamedTag from "../components/Tags/NamedTag";
import TagList from "../components/Tags/TagList";
import { TAG_MAP, getIconOnBackground } from "../components/Tags/tagUtils";
import Research, { ResearchPiece } from "../components/Research/Research";
import ResearchList from "../components/Research/ResearchList";
import ContentCarousel from "../components/ContentCarousel/ContentCarousel";
import { Themes } from "./themes";
import TimelineItem from "../components/Timeline/TimelineItem";
import { Timeline } from "../components/Timeline/Timeline";
import { interpolateGradientInSRGB, interpolateGradientInLinearRGB, isURL, getDateInBetween, srgbToLinear, linearToSRGB, hexToRGBA, rgbaToHex } from "./utils";
import { useEffect } from "react";
import moment from "moment";
import GradientBackground from "../components/GradientBackground/GradientBackground";
import styled from "styled-components";
import EventBlock from "../components/EventBlock/EventBlock";
import ZoomableGraph, { OrbProps } from "../components/ZoomableGraph/ZoomableGraph";

const verbose = 0;

export const TestTheme = createTheme({
  components: {
    // Override for Grid component to center content and remove default margin and padding
    MuiGrid: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          margin: '0',
          padding: '0',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },
});

export const Test = () => {
    useEffect(() => {
      console.log('---------------START TEST---------------');
      runTests();
      console.log('---------------END TEST---------------');
    }, []);
  
    return (
      <ThemeProvider theme={TestTheme}>
        <>{console.log('---------------START COMPONENT---------------')}</>
        <div>
          {/* {CaptionedTest()} */}
          {/* {ContentTest()} */}
          {/* {ContentCarouselTest()} */}
          {/* {TagTest()} */}
          {/* {ResearchTest()} */}
          {/* {ResearchListTest()} */}
          {/* {TimelineItemTest()} */}
          {/* { gradientInterpolateTest() } */}
          {/* { TimelineTest() } */}
          {/* { GradientBackgroundTest() } */}
          { ZoomableGraphTest() }
          {/* { svg() } */}
          {/* { EventBlockTest() } */}
        </div>
        <>{console.log('---------------END COMPONENT---------------')}</>
      </ThemeProvider>
    );
};

export const ZoomableGraphTest = () => {
  const orbPropsList: { [name: string]: OrbProps } = {
    orb1:{ cx: 99.18, cy: 11.16, size: 5.5, fill: "#5577AA"},
    orb2: { cx: 11.17, cy: 56.04, size: 5.5, fill: "#5577AA", },
    orb3: { cx: 12.92, cy: 117.45, size: 5.5, fill: "#5577AA", },
    orb4: { cx: 70.31, cy: 156.69, size: 5.5, fill: "#5577AA", },
    orb5: { cx: 138.54, cy: 174.92, size: 6.5, fill: "#5577AA", },
    orb6: { cx: 203.71, cy: 11.21, size: 5.5, fill: "#5577AA", },
    orb7: { cx: 189.61, cy: 124.08, size: 5.5, fill: "#5577AA", },
    orb8: { cx: 235.56, cy: 80.03, size: 7.5, fill: "#5577AA", },
    orb9: { cx: 201.76, cy: 256.47, size: 5.5, fill: "#5577AA", },
    orb10: { cx: 178.26, cy: 196.23, size: 5.5, fill: "#5577AA", },
    orb11: { cx: 225.93, cy: 261.61, size: 6.5, fill: "#5577AA", },
    orb12: { cx: 223.64, cy: 200.53, size: 5.5, fill: "#5577AA", },
    orb13: { cx: 292.36, cy: 172.4, size: 5.5, fill: "#5577AA", },
    orb14: { cx: 229.88, cy: 129.55, size: 9, fill: "#5577AA", },
    orb15: { cx: 294.52, cy: 107.27, size: 5.5, fill: "#5577AA", },
    orb16: { cx: 272.23, cy: 62.13, size: 5.5, fill: "#5577AA", },
    orb17: { cx: 116.47, cy: 82.14, size: 9.5, fill: "#5577AA", },
  };
  return (
    <Grid container columnGap={1} width={"100%"} height={"800px"} sx={{display: 'flex', flexDirection: 'red'}}>
      <ZoomableGraph orbPropsList={orbPropsList} />
    </Grid>
  )
};


const svg = () => {
  const handleClick = (event: any) => {
    const point = event.currentTarget.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const cursorPt = point.matrixTransform(event.currentTarget.getScreenCTM().inverse());
    
    console.log(cursorPt.x, cursorPt.y);
  }

  return (
    <svg viewBox="0 0 305.89 272.83" onClick={handleClick}> <g transform="translate(-47.069 -63.563)"> <path d="m143.71 63.851c-5.404 1.374-8.981 6.271-8.638 11.825l0.113 1.821-5.038 2.527c-2.772 1.389-6.258 3.159-7.747 3.932-1.49 0.773-6.458 3.306-11.042 5.627-13.194 6.684-22.324 11.317-27.5 13.955-2.635 1.344-7.524 3.831-10.864 5.528l-6.073 3.086-1.115-0.949c-4.585-3.902-11.005-3.811-15.226 0.215-5.784 5.517-4.176 15.143 3.074 18.403l1.558 0.7v40.224l-1.342 0.883c-11.506 7.565-1.14 25.539 11.211 19.439l1.223-0.604 8.256 5.952c4.541 3.273 13.46 9.698 19.819 14.278 13.122 9.449 11.868 8.376 11.872 10.152 0.021 8.992 11.436 13.832 18.558 7.868 1.17-0.98 0.799-0.996 5.299 0.227 3.359 0.913 16.072 4.36 36.136 9.797 3.833 1.039 7.027 1.959 7.097 2.045 0.07 0.085 0.297 0.717 0.505 1.403 2.425 8.014 13.256 11.386 19.312 6.012 0.356-0.316 0.378-0.306 17.347 7.574l3.522 1.635 0.037 2.391c0.098 6.309 4.304 10.756 10.606 11.214l1.853 0.135 0.685 1.771c0.377 0.974 2.554 6.552 4.837 12.396 2.282 5.843 5.623 14.398 7.424 19.011l3.274 8.387-0.927 1.092c-6.765 7.976 1.898 19.256 11.242 14.638 8.515-4.207 5.454-17.816-4.007-17.816-0.657 0-0.66-6e-3 -1.923-3.281-0.696-1.805-3.06-7.875-5.253-13.49-2.194-5.614-5.21-13.349-6.703-17.187-1.492-3.839-2.806-7.155-2.92-7.369-0.171-0.323-0.01-0.591 0.94-1.563 3.628-3.712 4.337-8.999 1.815-13.544l-0.622-1.122 1.085-1.378c0.596-0.758 3.435-4.378 6.307-8.045s6.384-8.145 7.804-9.952c1.419-1.808 2.651-3.214 2.737-3.125 0.215 0.22 11.019 24.423 11.019 24.684 0 0.115-0.473 0.728-1.053 1.361-4.888 5.35-3.301 13.886 3.241 17.423l1.248 0.675 0.784 10.509c0.431 5.779 1.095 14.633 1.477 19.675 0.722 9.541 0.722 9.548-0.236 9.788-7.204 1.805-9.494 12.877-3.814 18.441 8.493 8.321 22.533-0.604 18.487-11.751-1.156-3.185-5.164-6.999-7.355-6.999-0.359 0-0.346 0.147-1.843-20.104-1.605-21.709-1.522-19.193-0.638-19.359 4.551-0.853 8.244-5.77 8.244-10.973v-2.028l1.719-0.658c4.264-1.634 46.758-17.574 47.083-17.661 0.232-0.063 0.685 0.215 1.25 0.769 6.795 6.659 18.783 1.349 18.783-8.319 0-4.649-3.376-9.57-7.22-10.528-0.679-0.169-0.65 0.364-0.371-6.764 0.251-6.405 0.377-10.042 0.637-18.437 0.388-12.493 0.636-18.33 0.784-18.463 0.081-0.073 0.523-0.25 0.981-0.392 4.197-1.307 7.403-5.838 7.442-10.521 0.053-6.417-5.471-11.696-11.826-11.301l-1.675 0.104-6.413-12.681-6.413-12.682 1.041-1.199c8.765-10.093-4.472-24.687-15.064-16.608l-0.727 0.554-5.891-4.54c-3.24-2.497-6.453-4.974-7.141-5.504-0.687-0.529-7.156-5.511-14.375-11.069-24.844-19.128-22.714-17.431-22.66-18.056 0.498-5.786-0.14-8.146-2.965-10.979-5.868-5.883-16.173-3.607-18.637 4.118l-0.249 0.781h-41.442c-34.887 0-41.443-0.045-41.443-0.285 0-0.578-1.471-3.186-2.384-4.224-2.631-2.992-7.247-4.468-10.993-3.515m4.237 6.051c3.82 1.301 4.726 6.263 1.628 8.915-2.496 2.136-6.426 1.342-7.941-1.604-2.11-4.103 1.946-8.8 6.313-7.311m104.37-0.077c3.946 1.345 5 6.204 1.931 8.905-3.949 3.476-10.065-0.621-8.318-5.571 0.935-2.651 3.88-4.189 6.387-3.334m-12.1 8.835c0.135 0.409 0.212 0.769 0.172 0.8-0.667 0.525-39.105 31.757-58.103 47.211-10.461 8.509-9.228 7.648-10.01 6.99-1.625-1.367-4.974-2.535-7.92-2.763-0.926-0.071-1.713-0.232-1.752-0.357-0.038-0.126-0.776-3.228-1.64-6.895-0.863-3.667-3.26-13.78-5.327-22.474-4.275-17.982-3.994-16.375-2.977-17.055 1.521-1.014 2.766-2.502 3.662-4.371l0.87-1.816 82.78-0.013 0.245 0.743m-99.067 6.191c1.315 0.656 3.103 1.191 3.982 1.191 0.465 0 0.711 0.114 0.785 0.364 0.095 0.322 1.033 4.266 3.555 14.948 0.405 1.719 1.441 6.078 2.301 9.688 0.86 3.609 2.316 9.75 3.235 13.646 0.92 3.895 1.719 7.233 1.776 7.416 0.072 0.233-0.293 0.589-1.223 1.19-1.678 1.085-3.865 3.394-4.761 5.025-0.849 1.545 0.651 1.72-11.442-1.34-5.66-1.432-17.37-4.394-26.021-6.582-13.919-3.52-32.197-8.146-40.757-10.315l-2.945-0.747-0.122-0.756c-0.068-0.416-0.054-0.826 0.03-0.91 0.165-0.164 64.414-32.84 67.747-34.455l0.933-0.452 0.942 0.785c0.519 0.431 1.412 1.018 1.985 1.304m131.88 9.975c35.12 27.041 35.418 27.275 35.367 27.743-0.257 2.356-0.35 2.877-0.529 2.988-0.115 0.07-4.93 1.414-10.702 2.987l-10.494 2.859-1.196-0.289c-0.703-0.171-2.054-0.271-3.278-0.244l-2.082 0.045-1.485-3.218c-0.816-1.77-3.849-8.327-6.739-14.572-11.236-24.278-13.55-29.309-13.55-29.457 0-0.084 0.961 0.587 2.136 1.492 1.174 0.905 6.823 5.255 12.552 9.666m-31.633-4.264c-1.212 3.071-3.198 8.115-4.415 11.209-1.216 3.094-3.326 8.437-4.688 11.875-1.361 3.437-4.393 11.108-6.736 17.046-2.343 5.939-4.292 10.828-4.332 10.866-0.039 0.038-8.227 0.219-18.196 0.401s-19.638 0.366-21.487 0.409l-3.362 0.077-0.55-1.587c-0.302-0.873-0.571-1.695-0.596-1.827-0.026-0.132 4.781-4.166 10.682-8.965 25.991-21.135 43.453-35.332 46.25-37.602 1.662-1.348 4.466-3.627 6.232-5.063s3.253-2.569 3.305-2.517c0.053 0.052-0.896 2.608-2.107 5.678m14.672 2.771c1.828 3.953 3.521 7.61 3.762 8.125 0.473 1.01 6.108 13.194 11.454 24.761 3.891 8.421 3.532 7.054 2.214 8.417-1.309 1.353-2.266 2.907-2.922 4.741l-0.484 1.352-2.073 0.044c-16.239 0.341-39.93 0.71-40.017 0.624-0.102-0.103 2.831-7.616 15.511-39.73 2.511-6.36 4.923-12.481 5.36-13.602l0.796-2.039 3.076 0.12 3.323 7.187m-196 21.371c2.025 0.69 3.366 2.634 3.366 4.879 0 4.78-5.879 7.017-9.025 3.434-3.535-4.025 0.566-10.048 5.659-8.313m261.47 6.224c4.756 2.293 3.511 9.374-1.732 9.85-3.474 0.315-6.289-2.787-5.573-6.141 0.709-3.325 4.31-5.153 7.305-3.709m-236.42 8.556c19.961 5.052 46.614 11.793 56.25 14.227l7.292 1.841 0.062 0.72c0.056 0.649-6e-3 0.744-0.625 0.962-5.43 1.913-41.04 14.224-41.142 14.224-0.077 0-0.85-0.679-1.718-1.51-4.321-4.138-10.814-10.299-21.89-20.77-12.851-12.15-14.537-13.764-14.372-13.757 0.056 2e-3 7.32 1.831 16.143 4.063m-17.366 3.224c1.873 1.776 4.343 4.13 5.49 5.231 1.146 1.101 7.669 7.288 14.494 13.75s12.415 11.842 12.423 11.957c9e-3 0.114-0.701 0.458-1.575 0.764-0.875 0.305-6.091 2.118-11.591 4.027s-11.68 4.056-13.734 4.771l-3.734 1.299-1.37-1.382c-1.823-1.838-3.16-2.536-6.631-3.459-0.206-0.055-0.26-4.156-0.26-19.623v-19.553l1.302-0.534c1.716-0.704 1.322-0.913 5.186 2.752m242.32-0.646c1.615 2.734 5.615 4.809 9.287 4.817l1.801 5e-3 6.449 12.77 6.45 12.771-0.959 1.235c-1.7 2.19-2.396 3.994-2.633 6.818l-0.14 1.675-6.25 2.174c-3.438 1.195-12.413 4.32-19.946 6.944-15.855 5.523-13.917 5.037-14.741 3.699-1.371-2.229-4.067-4.525-6.575-5.6-0.562-0.241-1.049-0.466-1.083-0.499-0.056-0.056 0.321-3.511 1.943-17.829 0.292-2.578 0.596-4.743 0.675-4.811s0.684-0.239 1.344-0.38c7.969-1.705 12.243-11.931 7.869-18.826-0.472-0.744-0.561-1.024-0.353-1.104 0.443-0.17 16.051-4.432 16.29-4.448 0.119-8e-3 0.376 0.257 0.572 0.589m-143.29 5.456c5.924 2.216 7.514 9.881 2.991 14.416-5.021 5.036-13.548 2.255-14.791-4.824-1.147-6.536 5.508-11.946 11.8-9.592m118.69-0.055c6.387 3.132 4.244 12.625-2.853 12.638-7.416 0.014-9.215-10.274-2.258-12.914 1.229-0.466 3.891-0.322 5.111 0.276m-15.11 9.516c0.038 0.115-2.663 3.162-6.001 6.771-15.704 16.982-23.371 25.208-23.488 25.203-0.071-2e-3 -0.826-0.19-1.677-0.416-7.728-2.055-14.379 5.636-11.221 12.976l0.433 1.006-0.517 0.564c-1.86 2.026-19.745 21.372-24.115 26.084-2.923 3.151-6.295 6.787-7.493 8.08-2.118 2.287-2.189 2.341-2.563 1.967s-0.355-0.459 0.684-3.081c0.588-1.482 5.286-13.383 10.44-26.445 5.154-13.063 10.298-26.094 11.43-28.959 1.133-2.864 3.648-9.239 5.59-14.166l3.531-8.959 18.612-0.355c10.237-0.195 20.159-0.386 22.05-0.425 4.333-0.089 4.225-0.093 4.305 0.155m-51.597 0.816c0 0.136-1.191 3.198-4.259 10.955-1.564 3.953-3.582 9.063-4.485 11.354-0.903 2.292-4.048 10.261-6.989 17.709-2.941 7.447-6.233 15.791-7.317 18.541s-3.295 8.356-4.915 12.457l-2.946 7.457-2.525-0.122-2.55-10.729c-1.402-5.901-3.392-14.292-4.422-18.646s-3.422-14.431-5.316-22.393c-1.893-7.962-3.443-14.582-3.443-14.712s0.623-0.6 1.385-1.045c3.454-2.018 6.426-5.933 7.057-9.299 0.081-0.429 0.159-0.79 0.175-0.801 0.167-0.121 40.55-0.844 40.55-0.726m55.88 5.634c0.463 0.397 1.448 1.029 2.189 1.406l1.346 0.686-0.115 1.25c-0.83 8.981-2.387 21.359-2.697 21.443-0.137 0.037-0.858 0.18-1.603 0.318-10.32 1.917-15.135 14.932-8.661 23.413 0.409 0.537 0.744 1.029 0.744 1.094 0 0.151-11.823 15.238-12.052 15.379-0.153 0.095-10.656-23.091-10.656-23.526 0-0.103 0.319-0.519 0.708-0.925 2.195-2.287 2.936-6.133 1.823-9.463l-0.409-1.224 10.241-11.061c17.065-18.431 18.071-19.511 18.188-19.511 0.061 0 0.491 0.325 0.954 0.721m-123.28 0.617c2.24 3.374 6.202 5.797 10.445 6.388 1.848 0.256 1.801 0.217 2.154 1.822 0.143 0.65 0.994 4.275 1.891 8.057 2.368 9.977 8.382 35.282 11.147 46.898 2.741 11.516 2.596 10.542 1.657 11.123l-0.73 0.45-1.216-1.111c-1.146-1.046-34.646-32.77-38.679-36.627-1.031-0.987-2.953-2.824-4.271-4.084-1.318-1.259-6.732-6.395-12.031-11.413-5.3-5.018-9.636-9.196-9.636-9.284s3.164-1.254 7.032-2.591c3.867-1.338 12.375-4.297 18.906-6.577 13.747-4.799 12.379-4.486 13.331-3.051m192.24 11.995c1.971 0.738 3.342 2.754 3.323 4.888-0.044 4.876-6.463 6.979-9.324 3.054-3.109-4.267 1.063-9.789 6.001-7.942m-236.83 3.682c0.687 0.645 2.14 2.025 3.229 3.068 2.209 2.116 4.913 4.68 19.688 18.668 10.471 9.913 12.292 11.64 15.724 14.91 1.091 1.039 2.328 2.211 2.75 2.604 7.354 6.865 26.005 24.71 26.005 24.88 0 0.718-0.647 0.596-9.432-1.783-4.953-1.342-14.959-4.049-22.235-6.016s-13.391-3.624-13.589-3.682c-0.307-0.09-0.342-0.282-0.235-1.303 1.065-10.187-12.02-16.153-19.245-8.774l-1.027 1.049-13.213-9.521c-20.25-14.593-23.611-17.017-24.245-17.487l-0.586-0.435 0.442-1.336c0.242-0.735 0.503-2.011 0.578-2.836 0.131-1.443 0.161-1.509 0.784-1.732 0.357-0.128 6.18-2.154 12.94-4.504 6.761-2.349 13.979-4.867 16.042-5.595 4.553-1.609 4.11-1.596 5.625-0.175m-44.24 6.649c3.211 1.62 3.789 5.933 1.123 8.39-2.309 2.128-6.057 1.745-7.769-0.795-3.059-4.539 1.768-10.055 6.646-7.595m269.72 1.922c-0.149 0.207-5.789 7.612-12.532 16.456l-12.259 16.079-8.261-5.537c-9.983-6.691-8.894-5.687-8.23-7.587 0.376-1.078 0.584-2.203 0.673-3.642l0.129-2.083 2.187-0.766c1.203-0.422 4.203-1.468 6.667-2.324 12.765-4.439 28.217-9.828 29.688-10.354 2.042-0.73 2.315-0.764 1.938-0.242m5.99 3.434c0.159 0.413-1.342 43.125-1.521 43.288-0.087 0.078-0.528 0.26-0.98 0.405-0.84 0.269-2.677 1.274-3.24 1.773-0.268 0.237-1.696-0.655-9.896-6.176-5.271-3.55-9.708-6.528-9.861-6.619-0.204-0.12 2.371-3.64 9.556-13.063 5.409-7.094 11.018-14.464 12.466-16.377 2.503-3.31 3.198-3.956 3.476-3.231m-99.2 2.239c3.549 2.402 1.963 8.116-2.253 8.116-4.766 0-6.194-6.316-1.892-8.366 1.18-0.563 3.117-0.446 4.145 0.25m40.03 0.521c6.538 1.692 8.792 9.961 4.017 14.736-6.251 6.25-16.881 0.104-14.648-8.47 1.207-4.633 6.007-7.463 10.631-6.266m-44.988 12.386c0.333 0.113 1.245 0.277 2.028 0.364l1.423 0.158 2.143 4.792c1.179 2.635 3.806 8.494 5.839 13.02 2.032 4.526 3.74 8.383 3.795 8.571 0.085 0.29-17.748 23.39-19.402 25.133-0.443 0.467-0.465 0.469-1.378 0.123-3.118-1.179-7.619-0.2-10.749 2.34l-0.863 0.7-6.324-2.933c-3.478-1.614-7.355-3.404-8.616-3.978-2.036-0.928-4.698-2.215-4.846-2.344-0.03-0.026 0.103-0.46 0.296-0.965 0.414-1.089 0.496-5.374 0.119-6.269-0.238-0.565 2.021-3.15 12.533-14.336 0.7-0.745 2.308-2.48 3.573-3.855 3.052-3.317 2.561-2.786 11.402-12.336 4.266-4.609 7.907-8.382 8.09-8.386 0.183-3e-3 0.605 0.087 0.937 0.201m69.401 18.623c0.198 0.183 0.054 0.493-0.64 1.38-0.492 0.629-6.924 9.066-14.294 18.748s-13.462 17.675-13.538 17.761c-0.076 0.087-0.649 2e-3 -1.273-0.188-0.65-0.198-1.912-0.354-2.952-0.366l-1.817-0.019-5.973-13.334c-3.285-7.333-6.094-13.62-6.242-13.971-0.269-0.637-0.262-0.649 3.484-5.417 2.064-2.628 5.269-6.724 7.122-9.101 2.727-3.5 3.448-4.305 3.785-4.227 0.229 0.053 1.12 0.297 1.979 0.542 4.102 1.17 9.253 0.182 12.677-2.432l0.913-0.697 8.257 5.542c4.541 3.049 8.372 5.649 8.512 5.779m-183.98-0.1c3.399 1.544 4.184 5.914 1.529 8.511-3.29 3.216-8.838 0.794-8.808-3.845 0.023-3.54 4.06-6.128 7.279-4.666m199.45 10.436c9.229 6.179 9.795 6.593 9.675 7.084-0.07 0.286-0.188 1.552-0.263 2.812l-0.136 2.292-23.503 8.823c-12.927 4.852-23.548 8.778-23.602 8.724-0.055-0.054 1.194-1.792 2.774-3.861s7.795-10.233 13.81-18.143c6.016-7.91 11.052-14.362 11.191-14.337 0.139 0.024 4.663 2.997 10.054 6.606m22.346 5.326c3.531 1.204 4.529 5.926 1.813 8.582-3.26 3.187-8.797 0.859-8.797-3.699 0-3.593 3.529-6.06 6.984-4.883m-153.14 1.747c4.061 2.089 4.821 7.298 1.492 10.22-4.814 4.227-12.079-0.8-9.832-6.804 1.235-3.303 5.314-4.974 8.34-3.416m39.59 22.362c3.738 2.198 3.537 7.395-0.356 9.235-4.331 2.048-8.924-2.561-6.866-6.89 1.281-2.695 4.725-3.813 7.222-2.345m44.061 3.699c3.091 0.672 4.931 4.226 3.667 7.084-1.57 3.549-6.234 4.284-8.725 1.374-3.247-3.793 0.176-9.518 5.058-8.458m-20.885 57.356c2.614 1.42 2.946 5.366 0.602 7.154-4.275 3.26-9.499-2.367-5.861-6.313 1.42-1.541 3.391-1.856 5.259-0.841m24.462 4.288c2.294 1.171 3.357 4.352 2.24 6.703-1.921 4.041-7.749 4.014-9.495-0.045-1.976-4.592 2.769-8.946 7.255-6.658" fillRule="evenodd"/> </g> </svg>
  );
}

export const EventBlockTest = () => {
  return (
    <Grid container flexDirection={'column'} rowGap={2} flexWrap="nowrap" sx={{ overflow: 'auto'}} >
      <EventBlock date={'2020-01-01'} title={'Test Event'} initialExpanded={true} />
      <EventBlock date={'2020-03-01'} title={'Test Event22'} initialExpanded={false} variant={'grey2'} />
    </Grid>
  );
};

export const FlexContainer = styled.div<any>`
  display: flex;
  width: 100%;
  height: 100%;
`;


export const GradientBackgroundTest = () => {
  return (
    <FlexContainer>
      <Timeline events={[{date: "2023-01-01"}, {date: "2023-02-01"}, {}, {date: "2023-05-01"}, {date: "2023-06-01"}, {date: "2023-07-01"}]} variant="red2"/>
      <GradientBackground />
    </FlexContainer>
  );
};

export const gradientInterpolateTest = (gradientFrom: string = '#FF0000', gradientTo: string = '#008000', steps: number = 100) => {
  return (
    <>
    {gradientInterpolateTestWColorSpace(gradientFrom, gradientTo, steps)}
    </>
  )
};

export const gradientInterpolateTestWColorSpace = (gradientFrom: string = '#FF0000', gradientTo: string = '#008000', steps: number = 100) => {
  return (
    <Grid container columnGap={1} width={"100%"} height={"100%"} sx={{display: 'flex', flexDirection: 'row'}}>
      <Grid item sx={{border: '3px solid black'}}>{interpolateGradientFromPositionTest(interpolateGradientInLinearRGB, gradientFrom, gradientTo, steps)}</Grid>
      <Grid item sx={{border: '3px solid black'}}><div style={{width: '100px', height: `${steps}px`, background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`}}></div></Grid>
      <Grid item sx={{border: '3px solid black'}}>{interpolateGradientFromPositionTest(interpolateGradientInSRGB, gradientFrom, gradientTo, steps)}</Grid>
    </Grid>
  );
};

export const interpolateGradientFromPositionTest = (interpolateFunction: any, gradientFrom: string = '#FF0000', gradientTo: string = '#008000', steps: number = 100) => {
  const colors = []
  for (let i = 0; i < steps; i++) {
    const position = i / steps; 
    colors.push(interpolateFunction(gradientFrom, gradientTo, position));
  }
  return (
    <Grid container width={'100px'} height={`${steps}px`} direction='column'>
      {colors.map((color, i) => <div key={i} id={i.toString()} style={{background: `linear-gradient(to bottom, ${color}, ${color})`, width: '100px', height: '1px'}}></div>)}
    </Grid>
  );
};


export const TimelineTest = () => {
  return (
    <Grid container justifyContent="center" spacing={'2'}>
      {/* <Timeline events={[{date: "2020-01-01"}, {date: "2020-05-01"}]} /> */}
      <Timeline events={[{date: "2023-01-01"}, {date: "2023-02-01"}, {}, {date: "2023-05-01"}, {date: "2023-06-01"}, {date: "2023-07-01"}]} variant="red2"/>
      {/* <Timeline events={[{date: "2023-01-01"}, {date: "2023-02-01"}, {date: "2023-03-01"}, {date: "2023-04-01"}, {date: "2023-05-01"}, {date: "2023-06-01"}]} variant="blue2"/> */}
      
    </Grid>
  )
}

export const TimelineItemTest = () => {
  return ( 
    <TimelineItem date={'2020/04/20'} />
  )
};

export const ExampleResearch: ResearchPiece = {
    title: "Playing Atari with Deep Reinforcement Learning",
    authors: [ { name: "Vlad Mnih", }, { name: "Koray Kavukcuoglu" }, { name: "David Silver" }, { name: "Alex Graves", }, { name: "Ioannis Antonoglou" }, { name: "Daan Wierstra", }, { name: "Martin Riedmiller" } ],
    date: "January 1, 2013",
    abstract: "We present the first deep learning model to successfully learn control policies directly from high-dimensional sensory input using reinforcement learning. The model is a convolutional neural network, trained with a variant of Q-learning, whose input is raw pixels and whose output is a value function estimating future rewards. We apply our method to seven Atari 2600 games from the Arcade Learning Environment, with no adjustment of the architecture or learning algorithm. We find that it outperforms all previous approaches on six of the games and surpasses a human expert on three of them. ",
    pdfs: ['./pdfs/PlayingAtariWithDeepReinforcementLearning.pdf', 'https://arxiv.org/pdf/1312.5602.pdf'],
}

export const ResearchListTest = () => {
    return (
        <ResearchList researchList={[ExampleResearch, ExampleResearch]} />
    );
};

export const ResearchTest = () => {
    return (
        <Research
            researchPiece={ExampleResearch}
        />
    )
};

export const GradientTagsTest = () => {
    return (
        <Grid container justifyContent="center" spacing={'2'}>
            <Grid item >{getIconOnBackground('OpenAI', 'white', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '15px')}</Grid>
            <Grid item >{getIconOnBackground('OpenAI', 'white', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '10px')}</Grid>
            <Grid item >{getIconOnBackground('OpenAI', 'white', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '7px')}</Grid>
            <Grid item >{getIconOnBackground('OpenAI', 'white', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '5px')}</Grid>
            <Grid item >{getIconOnBackground('OpenAI', 'white', '#38C9EA', '#db258f', '#FFA93A', '#6D3DFC', '0px')}</Grid>
        </Grid>
    )
};

export const AllTagsTest: any = () => {
    return <TagList tags={Object.keys(TAG_MAP)} />;
};

export const NamedTagTest = (namedTags = ['OpenAI']) => {
    return (
        namedTags.map((tag, index) => {
            return (
                <Grid item key={index}>
                    <NamedTag tag={tag} />
                </Grid>
            )
        })
    )
};

export const TagTest = (size: string = "1.2rem") => {
    const svg = (
      <svg height={size} viewBox="0 0 511 511" xmlSpace="preserve">
        <g>
          <path d="M415.5,40H351v-0.5c0-8.547-6.953-15.5-15.5-15.5H295v-0.5C295,10.542,284.458,0,271.5,0h-32   C226.542,0,216,10.542,216,23.5V24h-40.5c-8.547,0-15.5,6.953-15.5,15.5V40H95.5C73.72,40,56,57.72,56,79.5v392   c0,21.78,17.72,39.5,39.5,39.5h320c21.78,0,39.5-17.72,39.5-39.5v-392C455,57.72,437.28,40,415.5,40z M343.498,87H407.5   c0.276,0,0.5,0.224,0.5,0.5v376c0,0.276-0.224,0.5-0.5,0.5h-304c-0.276,0-0.5-0.224-0.5-0.5v-376c0-0.276,0.224-0.5,0.5-0.5h64.001   c0.089,0,0.175-0.01,0.263-0.013C174.967,96.695,186.51,103,199.5,103h112c12.99,0,24.533-6.305,31.736-16.013   C343.324,86.99,343.41,87,343.498,87z M231,23.5c0-4.687,3.813-8.5,8.5-8.5h32c4.687,0,8.5,3.813,8.5,8.5V24h-49V23.5z M175,39.5   c0-0.276,0.224-0.5,0.5-0.5h160c0.276,0,0.5,0.224,0.5,0.5v7.942c0,0.02-0.003,0.039-0.003,0.058S336,47.539,336,47.558V63.5   c0,13.509-10.991,24.5-24.5,24.5h-112C185.991,88,175,77.009,175,63.5V39.5z M440,471.5c0,13.509-10.991,24.5-24.5,24.5h-320   C81.991,496,71,485.009,71,471.5v-392C71,65.991,81.991,55,95.5,55H160v8.5c0,2.918,0.328,5.76,0.931,8.5H103.5   C94.953,72,88,78.953,88,87.5v376c0,8.547,6.953,15.5,15.5,15.5h304c8.547,0,15.5-6.953,15.5-15.5v-376   c0-8.547-6.953-15.5-15.5-15.5h-57.431c0.604-2.74,0.931-5.582,0.931-8.5V55h64.5c13.509,0,24.5,10.991,24.5,24.5V471.5z" />{" "}
          <path d="M144.5,215h62c4.687,0,8.5-3.813,8.5-8.5v-62c0-4.687-3.813-8.5-8.5-8.5h-62c-4.687,0-8.5,3.813-8.5,8.5v62   C136,211.187,139.813,215,144.5,215z M151,151h49v49h-49V151z" />{" "}
          <path d="M206.5,344h-62c-4.687,0-8.5,3.813-8.5,8.5v62c0,4.687,3.813,8.5,8.5,8.5h62c4.687,0,8.5-3.813,8.5-8.5v-62   C215,347.813,211.187,344,206.5,344z M200,408h-49v-49h49V408z" />{" "}
          <path d="M218.197,242.197l-5.392,5.392c-2.707-4.535-7.65-7.589-13.305-7.589h-48c-8.547,0-15.5,6.953-15.5,15.5v48   c0,8.547,6.953,15.5,15.5,15.5h48c8.547,0,15.5-6.953,15.5-15.5v-8c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v8   c0,0.276-0.224,0.5-0.5,0.5h-48c-0.276,0-0.5-0.224-0.5-0.5v-48c0-0.276,0.224-0.5,0.5-0.5h48c0.276,0,0.5,0.224,0.5,0.5v4.894   l-16.5,16.5l-10.697-10.697c-2.929-2.929-7.678-2.929-10.606,0c-2.929,2.929-2.929,7.677,0,10.606l16,16   c1.464,1.465,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197l23.999-23.999c0.001-0.001,0.002-0.002,0.002-0.002l15.999-15.999   c2.929-2.929,2.929-7.677,0-10.606C225.875,239.268,221.125,239.268,218.197,242.197z" />{" "}
          <path d="M239.5,159h24c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-24c-4.142,0-7.5,3.358-7.5,7.5S235.358,159,239.5,159z" />{" "}
          <path d="M232,183.5c0,4.142,3.358,7.5,7.5,7.5h120c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-120   C235.358,176,232,179.358,232,183.5z" />{" "}
          <path d="M239.5,271h80c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-80c-4.142,0-7.5,3.358-7.5,7.5S235.358,271,239.5,271z" />{" "}
          <path d="M359.5,288h-120c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h120c4.142,0,7.5-3.358,7.5-7.5S363.642,288,359.5,288z" />{" "}
          <path d="M239.5,375h32c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5h-32c-4.142,0-7.5,3.358-7.5,7.5S235.358,375,239.5,375z" />{" "}
          <path d="M359.5,392h-120c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h120c4.142,0,7.5-3.358,7.5-7.5S363.642,392,359.5,392z" />{" "}
        </g>
      </svg>
    );
    const getTags = (variant?: any) => {
      return (
        <Grid container item spacing={2} direction={"column"} width={"auto"}>
          <Grid item xs={12}>
            <Typography
              fontSize={size}
              style={{ textDecoration: "underline" }}
          
            >
              {variant}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Tag fontSize={size} label={"test"} icon={svg} variant={variant} />
          </Grid>
          <Grid item xs={12}>
            <Tag fontSize={size} icon={svg} variant={variant} />
          </Grid>
          <Grid item xs={12}>
            <Tag fontSize={size} label={"test"} variant={variant} />
          </Grid>
          <Grid item xs={12}>
            <Tag
            fontSize={size}
              label={"test"}
              icon={svg}
              variant={variant}
              disableClick={true}
              disableHover={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Tag fontSize={size} label={"test"} icon={svg} variant={variant} inactive={true} />
          </Grid>
          <Grid item xs={12}>
            <Tag fontSize={size}
              label={"test"}
              icon={svg}
              variant={variant}
              href={"https://www.google.com"}
            />
          </Grid>
          <Grid item xs={12}>
            <Tag fontSize={size}
              label="test"
              icon={svg}
              icoVariant={variant}
              variant="dark"
            />
          </Grid>
          <Grid item xs={12}>
            <Tag fontSize={size} label="test" icon={svg} icoVariant={variant} />
          </Grid>
        </Grid>
      );
    };
  
    return (
      <Grid container spacing={1} direction={"row"} width={"100%"}>
        <Grid
          container
          item
          spacing={2}
          direction={"column"}
          width={"auto"}
          justifyContent={"center"}
          alignItems={"end"}
          lineHeight={size}
        >
          <Grid item xs={12}>
            <Typography>
              Theme:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Base:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >
              No Label:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >
              No Icon:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              No Click or Hover:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >
              Inactive:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Link:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >
              Dark Mode:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography >
              Light Mode:
            </Typography>
          </Grid>
        </Grid>
        {Object.keys(Themes).map((variant: any) => {
          return getTags(variant);
        })}
      </Grid>
    );
  };
  
export const contentOne = <Content src={"https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"} caption={"caption caption caption"} header={"header"} content_source={"https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"} width={"400px"}/>;
export const contentTwo = <Content src={"https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"} caption={"caption caption caption"} content_source={"https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"} width={"600px"} />;
export const contentThree = <Content src={"https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"} header={"header"} content_source={"https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"} width={"900px"} />

export const ContentCarouselTest = () => {
    return (
      <ContentCarousel contentList={[contentOne, contentTwo, contentThree]} />
    );
};

export const ContentTest = () => {
    return (
      <Grid container spacing={2} direction={"column"}>
        <Grid item xs={12}>
          {contentOne}
        </Grid>
        <Grid item xs={12}>
          {contentTwo}
        </Grid>
        <Grid item xs={12}>
          {contentThree}
        </Grid>
      </Grid>
      );
  };

export const CaptionedTest = (size: string = "200px") => {
    return (
      <>
      <Grid container spacing={2} direction={"column"}>
          <Grid item xs={12}>
            <CaptionedComponent url={"https://www.google.com"} caption={"Google"}>
              <Box width={size} height={size} bgcolor="grey">Example Content</Box>
            </CaptionedComponent>
          </Grid>
          <Grid item xs={12}>
            <CaptionedComponent url={"https://www.google.com"}>
              <Box width={size} height={size} bgcolor="grey">Example Content</Box>
            </CaptionedComponent>
          </Grid>
          <Grid item xs={12}>
            <CaptionedComponent caption={"https://www.google.com"}>
              <Box width={size} height={size} bgcolor="grey">Example Content</Box>
            </CaptionedComponent>
          </Grid>
          <Grid item xs={12}>
            <CaptionedComponent caption={"Google"}>
              <Box width={size} height={size} bgcolor="grey">Example Content</Box>
            </CaptionedComponent>
          </Grid>
        </Grid>
        
        <Grid container spacing={2} direction={"column"}>
          <Grid item xs={12}>
            <CaptionedComponent label={true} url={"https://www.google.com"} caption={"Google"}>
              <Box width={size} height={size} bgcolor="grey">Example Content</Box>
            </CaptionedComponent>
          </Grid>
          <Grid item xs={12}>
            <CaptionedComponent label={true} url={"https://www.google.com"}>
              <Box width={size} height={size} bgcolor="grey">Example Content</Box>
            </CaptionedComponent>
          </Grid>
          <Grid item xs={12}>
            <CaptionedComponent label={true} caption={"https://www.google.com"}>
              <Box width={size} height={size} bgcolor="grey">Example Content</Box>
            </CaptionedComponent>
          </Grid>
          <Grid item xs={12}>
            <CaptionedComponent label={true} caption={"Google"}>
              <Box width={size} height={size} bgcolor="grey">Example Content</Box>
            </CaptionedComponent>
          </Grid>
      </Grid>
      </>
    );
  };



// ------------------------
// FUNCTION TESTS
// ------------------------

export const runTests = () => {
  // runURLTests();
  // runDateTests();
  // runColorTests();
};

const runTest = (
  testFunc: (...args: any) => any,                    // function to test
  funcName: string,                                   // function name
  testCases: { input: any | any[]; expected: any }[], // test cases
  verbose = 0,                                        // verbosity level
) => {
  const results = testCases.map(({ input, expected }, index: number) => {
    let result;
    if (Array.isArray(input)) {
      result = testFunc(...input);
    } else {
      result = testFunc(input);
    }
    // round floats to 2 decimal places if they have more than 2 decimal places and remove trailing zeros
    if (Array.isArray(result)) {
      for (let i = 0; i < result.length; i++) {
        if (result[i] % 1 !== 0 && result[i].toString().split(".")[1].length > 2) {
          result[i] = Number(result[i]).toFixed(2).replace(/0+$/, '').replace(/\.$/, '');;
        }
      }
    }

    // ignore spaces and newlines and round floats to 2 decimal places
    let expectedResult = expected[funcName];
    let passed;
    if (typeof result === 'number' && typeof expectedResult === 'number') {
      passed = Number(result).toFixed(2) === Number(expectedResult).toFixed(2);
    } else {
      expectedResult = expectedResult.toString().replace(/[\s\n]+/g, '');
      passed = result.toString().replace(/[\s\n]+/g, '') === expectedResult;
    }
    
    if (!passed ) {
      console.log(`[TEST ${index + 1} ${funcName}(${input}) FAILED ❌]:\n\tresult:   ${result}\n\texpected: ${expectedResult}`);
    }
    return passed;
  });
  const passedTests = results.filter(Boolean).length;
  console.log(`[TEST ${funcName}]: ${passedTests}/${testCases.length} PASSED ✅`);
};

export const runDateTests = () => {
  const testCases: any = [
    {
      input: ["2021-01-01", "2021-02-01"],
      expected: { getDateInBetween: "2021-01-16", },
    },
    {
      input: ["2021-01-01", "2021-03-01"],
      expected: { getDateInBetween: "2021-01-30", },
    },
  ];
  runTest(getDateInBetween, "getDateInBetween", testCases);
};

export const runURLTests = () => {
  const testCases: any = [
    {
      input: "http://www.foufos.gr",
      expected: { isURL: true, },
    },
    {
      input: "https://www.foufos.gr",
      expected: { isURL: true, },
    },
    {
      input: "http://foufos.gr",
      expected: { isURL: true, },
    },
    {
      input: "http://www.foufos.gr/kino",
      expected: { isURL: true, },
    },
    {
      input: "http://werer.gr",
      expected: { isURL: true, },
    },
    {
      input: "www.foufos.gr",
      expected: { isURL: true, },
    },
    {
      input: "www.mp3.com",
      expected: { isURL: true, },
    },
    {
      input: "www.t.co",
      expected: { isURL: true, },
    },
    {
      input: "http://t.co",
      expected: { isURL: true, },
    },
    {
      input: "http://www.t.co",
      expected: { isURL: true, },
    },
    {
      input: "https://www.t.co",
      expected: { isURL: true, },
    },
    {
      input: "www.aa.com",
      expected: { isURL: true, },
    },
    {
      input: "http://aa.com",
      expected: { isURL: true, },
    },
    {
      input: "http://www.aa.com",
      expected: { isURL: true, },
    },
    {
      input: "https://www.aa.com",
      expected: { isURL: true, },
    },
    {
      input: "badurlnotvalid://www.google.com",
      expected: { isURL: false, },
    },
    {
      input: "htpp://www.google.com",
      expected: { isURL: false, },
    },
    {
      input: "www.foufos-.gr",
      expected: { isURL: false, },
    },
    {
      input: "www.-foufos.gr",
      expected: { isURL: false, },
    },
    {
      input: "foufos.gr",
      expected: { isURL: true, },
    },
    {
      input: "http://foufos",
      expected: { isURL: false, },
    },
    {
      input: "www.mp3#.com",
      expected: { isURL: false, },
    }
  ];
  runTest(isURL, "isURL", testCases);
};

export const runhexToRGBATests = () => {
  const testCases: any = [
    {
      input: "#24B5B7FF",
      expected: { hexToRGBA: [36,181,183,1], },
    },
    {
      input: "#24B5B7",
      expected: { hexToRGBA:[36,181,183,1], },
    },
    {
      input: "#24B5B780",
      expected: { hexToRGBA: [36,181,183,0.5], },
    },
  ];
  runTest(hexToRGBA, "hexToRGBA", testCases);
};

export const runRGBAToHexTests = () => {
  const testCases: any = [
    {
      input: [36, 181, 183, 1],
      expected: { rgbaToHex: "#24B5B7FF", },
    },
    {
      input: [36, 181, 183, 0.5],
      expected: { rgbaToHex: "#24B5B780", },
    },
    {
      input: [36, 181, 183],
      expected: { rgbaToHex: "#24B5B7FF", },
    },
  ];
  runTest(rgbaToHex, "rgbaToHex", testCases);
};

export const runSRGBToLinearTests = () => {
  const testCases: any = [
    {
      input: 0.5,
      expected: { srgbToLinear: 0.2140418828125, },
    },
  ];
  runTest(srgbToLinear, "srgbToLinear", testCases);
};

export const runLinearToSRGBTests = () => {
  const testCases: any = [
    {
      input: 0.2140418828125,
      expected: { linearToSRGB: 0.5, },
    },
  ];
  runTest(linearToSRGB, "linearToSRGB", testCases);
};

export const runColorTests = () => {
  runRGBAToHexTests();
  runhexToRGBATests();
  runSRGBToLinearTests();
  runLinearToSRGBTests();
};

export const rgbaToHexTest = (r: number = 36, g: number = 181, b: number = 183, a?: number) => {
  const rgb = rgbaToHex(r, g, b, a);
  if (verbose > 0) console.log(`rgbaToHex(${r}, ${g}, ${b}, ${a}) = ${rgb}`);
};

export const hexToRGBATest = (hex: string = "#24B5B7FF") => {
  const rgb = hexToRGBA(hex);
  if (verbose > 0) console.log(`hexToRGBA(${hex}) = ${rgb}`);
};

export const srgbToLinearTest = (srgb: number = 0.5) => {
  const linear = srgbToLinear(srgb);
  if (verbose > 0) console.log(`sRGBToLinear(${srgb}) = ${linear}`);
}

export const LinearToSRGBTest = (linear: number = 0.214) => {
  const srgb = linearToSRGB(linear);
  if (verbose > 0) console.log(`LinearTosRGB(${linear}) = ${srgb}`);
}

export const dateTest = (startDate: string = '2021-01-01', endDate: string = '2021-02-01') => {
  const out = getDateInBetween(startDate, endDate);
  if (verbose > 0) console.log(`Date between ${startDate} and ${endDate} is ${out}`);
}