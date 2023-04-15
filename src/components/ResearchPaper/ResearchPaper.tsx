import React, { useCallback, useEffect, useRef, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Document, Page, pdfjs } from "react-pdf";
import Captioned from "../Captioned/Captioned";
import Tag from "../Tag/Tag";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./ResearchPaper.css";
import NamedTag from "../Tag/NamedTag";
import { tagInMap } from "../Tag/Tags";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const AbstractText = styled(Typography)`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ResearchPaperProps {
  paper: any;
}

const ResearchPaper: React.FC<ResearchPaperProps> = ({ paper }) => {
  const [expanded, setExpanded] = useState<boolean>(paper.expanded);
  const pdfRef = useRef<HTMLDivElement>(null);
  const thumbailRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [lineClamp, setLineClamp] = useState<number>(2);

  const updateLineClamp = () => {
    if (thumbailRef.current && textRef.current) {
      const pdfHeight = thumbailRef.current.getBoundingClientRect().height;
      const textHeight = textRef.current.getBoundingClientRect().height;
      // console.log("pdfHeight", pdfHeight, "textHeight", textHeight, "lineClamp", lineClamp);

      if (textHeight > pdfHeight) {
        setLineClamp(Math.floor(pdfHeight / 24) - 1);
      } else {
        setLineClamp(2);
      }
    }
  };

  const handleResize = useCallback(() => {
    if (pdfRef.current) {
      setWidth(pdfRef.current.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    updateLineClamp();
  }, [width]);

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) => {
    setWidth(pdfRef.current!.getBoundingClientRect().width);
  };

  const onLoadError = useCallback((error: any) => {
    paper.url_pdf = undefined;
    setWidth(0);
  }, [paper]);

  const getPaper = useCallback(() => {
    return (
      <Grid
        container
        item
        maxWidth={"15%"}
        height={"auto"}
        flex={"1"}
        flexGrow={"1"}
        ref={pdfRef}
        style={{ marginLeft: "8px" }}
      >
        <Captioned caption={paper.urls[0]} center={true}>
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
              file={paper.url_pdfs[0]}
              loading={<CircularProgress />}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onLoadError}
            >
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                renderMode="canvas"
                width={width}
              />
            </Document>
          </Box>
        </Captioned>
      </Grid>
    );
  }, [onLoadError, paper.url_pdfs, paper.urls, width]);

  const getCaptioned = (component: any, caption: string, label: boolean) => {
    return (
      <Captioned caption={caption} label={label}>
        {component}
      </Captioned>
    );
  };

  const getTitle = useCallback(() => {
    return (
      <Typography
        variant="subtitle2"
        width="auto"
        maxWidth="100%"
        fontSize={"14px"}
      >
        {paper.title}
      </Typography>
    );
  }, [paper.title]);

  const getDate = useCallback(() => {
    return (
      <Typography
      noWrap
      fontWeight="400"
      fontSize={"12px"}
      display={"flex"}
      height={"30px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {paper.date}
    </Typography>
    );
  }, [paper.date]);

  const getLastName = (author: string) => {
    return author.split(" ").slice(-1)[0].toLowerCase();
  };

  const getNamedAuthorTagName = useCallback((author: string) => {
    return "Custom_" + getLastName(author);
  }, []);

  const getNamedAuthorTag = useCallback((author: string) => {
    return (
      <NamedTag tagName={getNamedAuthorTagName(author)} tagColor={"author"} />
    );
  }, [getNamedAuthorTagName]);

  const getAuthorTag = (author: string) => {
    return (
      <Tag key={author} label={author} tagColor={"author"} />
    );
  };

  const getAuthor = useCallback((author: string) => {
    return (
      <Box padding="0px" margin="4px 0px 0px 0px">
        {tagInMap(getNamedAuthorTagName(author)) ? getNamedAuthorTag(author) : getAuthorTag(author)}
      </Box>
    );
  }, [getNamedAuthorTag, getNamedAuthorTagName]);

  const getAuthors = useCallback(() => {
    return (
      <Typography
        flexWrap={"wrap"}
        gutterBottom
        fontWeight="400"
        fontSize={"12px"}
        display="flex"
        height="100%"
        justifyContent={"left"}
        alignItems={"left"}
      >
        {paper.authors.map((author: string, index: number) =>
          // index === paper.authors.length - 1 ? author : author + ", "
          getAuthor(author)
        )}
      </Typography>
    );
  }, [getAuthor, paper.authors]);

  const getAuthorAndDate = useCallback(() => {
    return (
      <Box margin="0px" padding="0px" display="flex" height="auto">
        <Box style={{marginRight: "16px", height: "auto"}}>{getCaptioned(getDate(), "Date", true)}</Box>
        <Box style={{height: "auto"}}>{getCaptioned(getAuthors(), "Authors", true)}</Box>
      </Box>
    );
  }, [getAuthors, getDate]);

  const getAbstract = useCallback(() => {
    return (
      <AbstractText
        lineHeight={"1"}
        marginTop={"4px"}
        fontSize={"12px"}
        style={{ WebkitLineClamp: lineClamp, WebkitBoxOrient: "vertical" }}
      >
        {paper.abstract}
      </AbstractText>
    );
  }, [lineClamp, paper.abstract]);

  const getPaperInfo = useCallback(() => {
    return (
      <Grid
        item
        ref={textRef}
        display="flex"
        flexDirection="column"
        padding="0px"
        flex={"1"}
        flexGrow={"1"}
        textAlign={"left"}
      >
        {getCaptioned(getTitle(), "Title", true)}
        {getAuthorAndDate()}
        {getCaptioned(getAbstract(), "Abstract", true)}
      </Grid>
    );
  }, [getAbstract, getAuthorAndDate, getTitle]);

  const getUnstyledExpandedResearchPaper = useCallback(() => {
    return (
      <Box padding={"4px"}>
        <Grid container flexWrap={"nowrap"} overflow={"auto"}>
          {getPaperInfo()}
          {getPaper()}
        </Grid>
      </Box>
    );
  }, [getPaper, getPaperInfo]);

  const getResearchPaper = useCallback(() => {
    return (
      <Accordion
      disableGutters={true}
      elevation={0}
      square={true}
      expanded={expanded}
      onChange={() => {
        setExpanded(!expanded);
      }}
      style={{ border: "1px solid rgba(200, 204, 209, 1)", backgroundColor: "#f8f9fa", margin: "0px", padding: "0px",  width: "auto", maxHeight: "100%", maxWidth: "100%", overflow: "auto"}}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {paper.title}
      </AccordionSummary>
      <AccordionDetails>
        {getUnstyledExpandedResearchPaper()}
        </AccordionDetails>
    </Accordion>
    );
  }, [expanded, getUnstyledExpandedResearchPaper, paper.title]);
  

  return getResearchPaper();
};

export default ResearchPaper;
