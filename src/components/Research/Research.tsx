import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Typography,
  styled,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { tagInMap } from "../Tags/tagUtils";
import Tag from "../Tags/Tag";
import Captioned, { getLabeledCaptioned } from "../Captioned/Captioned";
import AuthorTag from "../Tags/AuthorTag";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const AbstractText = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface Author {
  name?: string;
  url?: string;
}

export interface ResearchPiece {
  title?: string;
  authors?: Author[];
  date?: string;
  abstract?: string;
  pdfs?: string[];
}

export interface ResearchProps {
  researchPiece: any;
  collapsed?: boolean;
}

const Research = ({ researchPiece, collapsed = false }: ResearchProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const thumbailRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<boolean>(!collapsed);
  const [lineClamp, setLineClamp] = useState<any>(2);

  const file = useMemo(
    () => ({ url: researchPiece.pdfs[0], withCredentials: true }),
    [researchPiece.pdfs]
  );

  // Updates number of lines in abstract based on width of pdf
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateLineClamp = () => {
    if (thumbailRef.current && textRef.current) {
      const pdfHeight = thumbailRef.current.getBoundingClientRect().height;
      const textHeight = textRef.current.getBoundingClientRect().height;
      console.log('txtHeight', textHeight, 'pdfHeight', pdfHeight, 'lineClamp', lineClamp, 'pdfHeight / 24', pdfHeight / 24);
      // console.log("pdfHeight", pdfHeight, "textHeight", textHeight, "lineClamp", lineClamp);
      if (textHeight > pdfHeight) {
        setLineClamp(Math.floor(pdfHeight / 24));
      } else {
        setLineClamp(null);
      }
    }
  };

  // event listener for resizing
  useEffect(() => {
    window.addEventListener("resize", updateLineClamp);
    return () => {
      window.removeEventListener("resize", updateLineClamp);
    };
  }, [updateLineClamp]);

  // callback for when pdf loads
  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) => {
    console.log("Pdf Load success")
  };

  // callback for when pdf fails to load
  const onLoadError = (error: any) => {
    console.log("Pdf Load error: ", error);
  };

  const getTitle = () => {
    return (
      <Typography variant="subtitle2" width="auto" fontSize={"16px"} component="div">
        {researchPiece.title}
      </Typography>
    );
  };

  const getDate = () => {
    return (
      <Typography
        noWrap
        fontWeight="400"
        fontSize={"14px"}
        display={"flex"}
        height={"24px"}
        justifyContent={"center"}
        alignItems={"center"}
        component="div"
      >
        {researchPiece.date}
      </Typography>
    );
  };

  const getAuthors = () => {
    return (
      researchPiece.authors && (
        <Typography
          flexWrap={"wrap"}
          gutterBottom
          fontWeight="400"
          fontSize={"14px"}
          display="flex"
          height="100%"
          component="div"
          justifyContent={"left"}
          alignItems={"center"}
        >
          {researchPiece.authors.map((author: Author, index: number) =>
            // index === paper.authors.length - 1 ? author : author + ", "
            <AuthorTag author={author.name} />
          )}
        </Typography>
      )
    );
  };

  const getAuthorAndDate = () => {
    return (
      <Box margin="0px" padding="0px" display="flex" height="auto">
        <Box style={{ marginRight: "16px", height: "auto" }}>
          {getLabeledCaptioned(getDate(), "Date")}
        </Box>
        <Box style={{ height: "auto" }}>
          {getLabeledCaptioned(getAuthors(), "Authors")}
        </Box>
      </Box>
    );
  };

  const getAbstract = () => {
    return (
      <AbstractText
        lineHeight={"1"}
        marginTop={"4px"}
        fontSize={"12px"}
        style={{ WebkitLineClamp: lineClamp, WebkitBoxOrient: "vertical" }}
      >
        {researchPiece.abstract}
      </AbstractText>
    );
  };

  const getResearchInfo = () => {
    return (
      <Grid
        item
        ref={textRef}
        maxWidth={"85%"}
        overflow={"auto"}
        display="flex"
        flexDirection="column"
        padding="0px"
        alignItems={"start"}
        flex={"1 1 auto"}
        textAlign={"left"}
      >
        {getLabeledCaptioned(getTitle(), "Title")}
        {getAuthorAndDate()}
        {getLabeledCaptioned(getAbstract(), "Abstract")}
      </Grid>
    );
  };

  const getPDF: any = () => {
    return (
      <Grid
        container
        item
        maxWidth={"15%"}
        height={"auto"}
        flex={"1"}
        flexGrow={1}
        flexBasis={"15%"}
        ref={pdfRef}
        style={{ marginLeft: "8px" }}
      >
        <Captioned caption={'source'} center={true}>
          <Box
            style={{
              display: "flex",
              border: "1px solid #c8ccd1",
              margin: "1px",
              width: "fit-content",
            }}
            ref={thumbailRef}
          >
            <Document
              file={file}
              loading={<CircularProgress />}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onLoadError}
            >
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                renderMode="canvas"
                width={200}
              />
            </Document>
          </Box>
        </Captioned>
      </Grid>
    );
  };

  const getUnstyledExpandedResearchPaper = () => {
    return (
      <Box padding={"4px"} width={"100%"}>
        <Grid container flexWrap={"nowrap"} overflow={"auto"} width={"100%"} alignItems={"start"}>
          {getResearchInfo()}
          {getPDF()}
        </Grid>
      </Box>
    );
  };

  const getResearchPiece = () => {
    return (
      <Accordion
        disableGutters={true}
        elevation={0}
        square={true}
        expanded={expanded}
        onChange={() => {
          setExpanded(!expanded);
        }}
        style={{
          border: "1px solid rgba(200, 204, 209, 1)",
          backgroundColor: "#f8f9fa",
          margin: "0px",
          padding: "0px",
          width: "100%",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {researchPiece.title}
        </AccordionSummary>
        <AccordionDetails>
          {getUnstyledExpandedResearchPaper()}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box width={"100%"} margin={"0px"} padding={"0px"} display="flex">
      {getResearchPiece()}
    </Box>
  );
};

export default Research;
