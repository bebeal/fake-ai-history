/* eslint-disable */
import React, { useState } from "react";
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tab, Tabs } from "@mui/material";
import { styled } from '@mui/material/styles';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EventDescription from "./EventDescription";
import EventPapers from "./EventPapers";
import TagList from "../Tag/TagList";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EventModel from "./EventModel";

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  transform: ${(props: { expanded: boolean }) => props.expanded ? 'rotate(180deg)' : 'none'};
  transition: transform 0.2s ease-in-out;
`;

const EventHeader = styled(CardHeader)`
    margin: 0px 0px 0px 0px;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
    vertical-align: middle;
    & .MuiCardHeader-action {
        align-self: center;
    }
`

const EventContent = styled(CardContent)`
    padding: 5px 5px 5px 5px !important;
`

const EventTabs = styled(Tabs)`
    padding: 0px 0px 10px 0px;
    margin: 0px;
    min-height: 0px;
    & .MuiTab-root {
        padding: 5px 0px 5px 0px;
        margin: 0px;
        min-height: 0px;
    }
`

export interface EventProps {
  date?: string | Date;
  title?: string;
  subtitle?: string;
  description?: any;
  images?: any[];
  model?: any;
  papers?: any;
  resources?: any;
  tagNames?: string[];
  activeTags?: string[];
}

const Event: React.FC<EventProps> = ({
  date,
  title,
  subtitle,
  description,
  images,
  model,
  papers,
  resources,
  tagNames=[],
  activeTags=tagNames
}) => {
  const [activeTab, setActiveTab] = useState("description");
  const [expanded, setExpanded] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: string) => {
    setActiveTab(newTab);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getEventTitle = (): JSX.Element => {
    return (
        <EventHeader 
            title={title}
            titleTypographyProps={{variant: "h6"}}
            subheader={subtitle}
            subheaderTypographyProps={{variant: "subtitle2"}}
            sx={{ border: "1px solid #c8ccd1", textAlign: "left", display: "flex", alignItems: "center", boxShadow: 0}}
            onClick={toggleExpand}
            action={<StyledExpandMoreIcon expanded={expanded} />}
        />
    );
  };

  const getEventTags = (): JSX.Element => {
    return (
      <Box margin={'0px'} padding={'0px'}>
        <TagList tagNames={tagNames} activeTags={activeTags} />
      </Box>
    );
  };

  const getDescriptionTab = (): React.ReactNode => {
    return <EventDescription description={description} images={images} />;
  }

  const getModelTab = (): React.ReactNode => {
    return <EventModel model={model} />;
  }

  const getPapersTab = (): React.ReactNode => {
    return <EventPapers papers={papers} />;
  }

  const getResourcesTab = (): React.ReactNode => {
    return <Box>{resources}</Box>;
  }

  const getCollapsedCard = (): JSX.Element => {
    return (<Card raised={false} variant="outlined" elevation={0}>{title && getEventTitle()}</Card>);
  };

  const getExpandedCard = (): JSX.Element => {
    return (
      <Card raised={false} variant="outlined" elevation={0} sx={{ boxShadow: 0 }}>
      {title && getEventTitle()}
      <EventContent sx={{ border: "1px solid #c8ccd1", maxHeight: "600px" }}>
        <EventTabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab value="description" label="Event" icon={<AutoAwesomeRoundedIcon />} iconPosition="start" />
          {model && <Tab value="model" label="Model" icon={<AccountTreeRoundedIcon />} iconPosition="start" />}
          {papers && <Tab value="papers" label="Papers" icon={<InsertDriveFileIcon />} iconPosition="start" />}
          {resources && <Tab value="resources" label="Resources" icon={<LinkRoundedIcon />} iconPosition="start" />}
        </EventTabs>
        <Box height={"200px"} overflow={"auto"}>
            {activeTab === "description" && getDescriptionTab()}
            {papers && activeTab === "papers" && getPapersTab()}
            {model && activeTab === "model" && getModelTab()}
            {resources && activeTab === "resources" && getResourcesTab()}
        </Box>
        {tagNames && tagNames.length > 0 && getEventTags()}
        </EventContent>
    </Card>
    );
  };

  return expanded ? getExpandedCard() : getCollapsedCard();
};

export default Event;

/*
      <div style={{
        maxWidth: '1000px',
        height: 'auto'
      }}>
        <Event 
          title={"VAE"}
          subtitle={"Variational Auto Encoder"} 
          date={"10202020"} 
          description={"The [**Variational Auto Encoder (VAE)**](https://en.wikipedia.org/wiki/Autoencoder#Variational_autoencoder_(VAE)) is a type of [autoencoder](https://en.wikipedia.org/wiki/Autoencoder) that is trained to generate new data by sampling from a learned latent space. It was introduced by Diederik P. Kingma and Max Welling in their 2013 paper 'Auto-Encoding Variational Bayes'. The VAE is a generative model that learns to encode input data into a lower-dimensional latent space, and then decodes the latent representation back into the original input space. The VAE is unique in that it uses a probabilistic approach to generate new data, allowing for the creation of novel data points that are similar to the training data. The VAE has been used for a variety of applications, including image and speech generation, and has been shown to outperform other generative models such as the standard autoencoder and the generative adversarial network (GAN)."}
          image={"https://lilianweng.github.io/posts/2018-08-12-vae/vae-gaussian.png"}
          imageCaption={"Illustration of autoencoder model architecture"}
          model={{
            name: "VAE",
            description: "",
            repo: "",
            demo: "",
            image: "",
            tags: [],
            alt: [],
          }} 
          papers={[
            {
                "title": "Auto-Encoding Variational Bayes",
                "url": "https://arxiv.org/abs/1312.6114",
                "authors": [
                    "Kingma, Diederik P",
                    "Welling, Max"
                ],
                "proceeding": "arXiv preprint arXiv:1312.6114",
                "date": "2013",
                "abstract": "How can we perform efficient inference and learning in directed probabilistic models, in the presence of continuous latent variables with intractable posterior distributions, and large datasets? We introduce a stochastic variational inference and learning algorithm that scales to large datasets and, under some mild differentiability conditions, even works in the intractable case. Our contributions are two-fold. First, we show that a reparameterization of the variational lower bound yields a lower bound estimator that can be straightforwardly optimized using standard stochastic gradient methods. Second, we show that for i.i.d. datasets with continuous latent variables per datapoint, posterior inference can be made especially efficient by fitting an approximate inference model (also called a recognition model) to the intractable posterior using the proposed lower bound estimator. Theoretical advantages are reflected in experimental results.",
                "url_pdf": "https://arxiv.org/pdf/1312.6114.pdf",
            },
            {
              "title": "Auto-Encoding Variational Bayes",
              "url": "https://arxiv.org/abs/1312.6114",
              "authors": [
                  "Kingma, Diederik P",
                  "Welling, Max"
              ],
              "proceeding": "arXiv preprint arXiv:1312.6114",
              "date": "2013",
              "abstract": "How can we perform efficient inference and learning in directed probabilistic models, in the presence of continuous latent variables with intractable posterior distributions, and large datasets? We introduce a stochastic variational inference and learning algorithm that scales to large datasets and, under some mild differentiability conditions, even works in the intractable case. Our contributions are two-fold. First, we show that a reparameterization of the variational lower bound yields a lower bound estimator that can be straightforwardly optimized using standard stochastic gradient methods. Second, we show that for i.i.d. datasets with continuous latent variables per datapoint, posterior inference can be made especially efficient by fitting an approximate inference model (also called a recognition model) to the intractable posterior using the proposed lower bound estimator. Theoretical advantages are reflected in experimental results.",
              "url_pdf": "https://arxiv.org/pdf/1312.6114.pdf",
            },
            {
              "title": "Auto-Encoding Variational Bayes",
              "url": "https://arxiv.org/abs/1312.6114",
              "authors": [
                  "Kingma, Diederik P",
                  "Welling, Max"
              ],
              "proceeding": "arXiv preprint arXiv:1312.6114",
              "date": "2013",
              "abstract": "How can we perform efficient inference and learning in directed probabilistic models, in the presence of continuous latent variables with intractable posterior distributions, and large datasets? We introduce a stochastic variational inference and learning algorithm that scales to large datasets and, under some mild differentiability conditions, even works in the intractable case. Our contributions are two-fold. First, we show that a reparameterization of the variational lower bound yields a lower bound estimator that can be straightforwardly optimized using standard stochastic gradient methods. Second, we show that for i.i.d. datasets with continuous latent variables per datapoint, posterior inference can be made especially efficient by fitting an approximate inference model (also called a recognition model) to the intractable posterior using the proposed lower bound estimator. Theoretical advantages are reflected in experimental results.",
              "url_pdf": "https://arxiv.org/pdf/1312.6114.pdf",
            },
            {
              "title": "Auto-Encoding Variational Bayes",
              "url": "https://arxiv.org/abs/1312.6114",
              "authors": [
                  "Kingma, Diederik P",
                  "Welling, Max"
              ],
              "proceeding": "arXiv preprint arXiv:1312.6114",
              "date": "2013",
              "abstract": "How can we perform efficient inference and learning in directed probabilistic models, in the presence of continuous latent variables with intractable posterior distributions, and large datasets? We introduce a stochastic variational inference and learning algorithm that scales to large datasets and, under some mild differentiability conditions, even works in the intractable case. Our contributions are two-fold. First, we show that a reparameterization of the variational lower bound yields a lower bound estimator that can be straightforwardly optimized using standard stochastic gradient methods. Second, we show that for i.i.d. datasets with continuous latent variables per datapoint, posterior inference can be made especially efficient by fitting an approximate inference model (also called a recognition model) to the intractable posterior using the proposed lower bound estimator. Theoretical advantages are reflected in experimental results.",
              "url_pdf": "https://arxiv.org/pdf/1312.6114.pdf",
            },
            {
              "title": "Auto-Encoding Variational Bayes",
              "url": "https://arxiv.org/abs/1312.6114",
              "authors": [
                  "Kingma, Diederik P",
                  "Welling, Max"
              ],
              "proceeding": "arXiv preprint arXiv:1312.6114",
              "date": "2013",
              "abstract": "How can we perform efficient inference and learning in directed probabilistic models, in the presence of continuous latent variables with intractable posterior distributions, and large datasets? We introduce a stochastic variational inference and learning algorithm that scales to large datasets and, under some mild differentiability conditions, even works in the intractable case. Our contributions are two-fold. First, we show that a reparameterization of the variational lower bound yields a lower bound estimator that can be straightforwardly optimized using standard stochastic gradient methods. Second, we show that for i.i.d. datasets with continuous latent variables per datapoint, posterior inference can be made especially efficient by fitting an approximate inference model (also called a recognition model) to the intractable posterior using the proposed lower bound estimator. Theoretical advantages are reflected in experimental results.",
              "url_pdf": "https://arxiv.org/pdf/1312.6114.pdf",
            }
          ]} 
          resources={["https://lilianweng.github.io/posts/2018-08-12-vae/", "https://paperswithcode.com/method/vae"]} 
          />
      </div>
*/