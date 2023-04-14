import React, { useCallback, useEffect, useRef, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Document, Outline, Page, pdfjs } from "react-pdf";
import Captioned from "../Captioned/Captioned";
import Tag from "../Tag/Tag";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
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

  const onLoadError = (error: any) => {
    paper.url_pdf = undefined;
    setWidth(0);
  };

  const getPaper = () => {
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
  };

  const getCaptioned = (component: any, caption: string, label: boolean) => {
    return (
      <Captioned caption={caption} label={label}>
        {component}
      </Captioned>
    );
  };

  const getTitle = () => {
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
  };

  const getDate = () => {
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
  };

  const getLastName = (author: string) => {
    return author.split(" ").slice(-1)[0].toLowerCase();
  };

  const getNamedAuthorTagName = (author: string) => {
    return "Custom_" + getLastName(author);
  }

  const getNamedAuthorTag = (author: string) => {
    return (
      <NamedTag tagName={getNamedAuthorTagName(author)} tagColor={"author"} />
    );
  };

  const getAuthorTag = (author: string) => {
    return (
      <Tag key={author} label={author} tagColor={"author"} />
    );
  };

  const getAuthor = (author: string) => {
    return (
      <Box padding="0px" margin="4px 0px 0px 0px">
        {tagInMap(getNamedAuthorTagName(author)) ? getNamedAuthorTag(author) : getAuthorTag(author)}
      </Box>
    )
  }

  const getAuthors = () => {
    return (
      <Typography
        noWrap
        gutterBottom
        fontWeight="400"
        fontSize={"12px"}
        display="flex"
        height="100%"
        justifyContent={"center"}
        alignItems={"center"}
      >
        {paper.authors.map((author: string, index: number) =>
          // index === paper.authors.length - 1 ? author : author + ", "
          getAuthor(author)
        )}
      </Typography>
    );
  };

  const getAuthorAndDate = () => {
    return (
      <Box margin="0px" padding="0px" display="inline-flex" height="auto">
        <div style={{marginRight: "16px", height: "100%"}}>{getCaptioned(getDate(), "Date", true)}</div>
        <div style={{height: "100%"}}>{getCaptioned(getAuthors(), "Authors", true)}</div>
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
        {paper.abstract}
      </AbstractText>
    );
  };

  const getPaperInfo = () => {
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
  };

  const getExpandedResearchPaper = () => {
    return (
      <Box
      display={"flex"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        style={{ backgroundColor: "#f8f9fa" }}
        display={"flex"}
        border={"1px solid #797A7B"}
        margin={"5px"}
        maxWidth={"80%"}
        maxHeight={"90%"}
        padding={"4px"}
      >
        <Grid container flexWrap={"nowrap"} overflow={"hidden"}>
          {getPaperInfo()}
          {getPaper()}
        </Grid>
      </Box>
    </Box>
    );
  }

  const getUnstyledExpandedResearchPaper = () => {
    return (
      <Box padding={"4px"}>
        <Grid container flexWrap={"nowrap"} overflow={"auto"}>
          {getPaperInfo()}
          {getPaper()}
        </Grid>
      </Box>
    );
  }

  const getAccordionResearchPaper = () => {
    return (
      <Accordion
      disableGutters={true}
      elevation={0}
      square={true}
      expanded={expanded}
      onChange={() => {
        setExpanded(!expanded);
      }}
      style={{ border: "1px solid rgba(200, 204, 209, 1)", backgroundColor: "#f8f9fa", margin: "0px", padding: "0px",  width: "100%", maxHeight: "100%", maxWidth: "100%", overflow: "hidden"}}
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


    )
  }
  

  return getAccordionResearchPaper();
};

export default ResearchPaper;
