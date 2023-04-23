# AI History

## Libraries

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [styled-components](https://styled-components.com/)
* [Carbon Design System](https://www.carbondesignsystem.com/)
* [Material Design Icons](https://materialdesignicons.com/)
* [Hugging Face](https://huggingface.co/)
* [react-pdf](https://react-pdf.org/)
* [Three.js](https://threejs.org/)

## Definitions

### Learning paradigms

* Supervised Learning
* Unsupervised Learning
* Reinforcement Learning
* Semi-Supervised Learning

### Neural Network Building Blocks

* Feed Forward Networks (FFN)
  * Perceptron
  * Multilayer Perceptron (MLP)
* Convolutional Neural Networks (CNN)
  * Convolutional layers
  * Deconvolution (Transposed Convolution) layers
  * Residual layers (Residual connections)
  * Dense layers (Densely connected layers)
  * Pooling layers (Max pooling, average pooling)
* Recurrent Neural Networks (RNN)
  * Long Short-Term Memory (LSTM)
  * Gated Recurrent Unit (GRU)
* Transformers
  * Multi-Head Self-Attention
  * Position-wise Feed-Forward Networks
  * Positional Encoding
* AutoEncoders (AE)
  * Variational Autoencoder (VAE)
  * Denoising Autoencoder
* Generative Adversarial Networks (GAN)
  * Generator
  * Discriminator
* Reinforcement Learning Models
  * Deep Q-Network (DQN)
  * Actor-Critic (AC)
  * Proximal Policy Optimization (PPO)
  * Soft Actor-Critic (SAC)
* Normalization techniques
  * Batch Normalization
  * Layer Normalization
  * Instance Normalization
  * Group Normalization
* Hierarchical and Modular Networks
  * Neurocognitron
  * Capsule Networks
* Energy-based Models
  * Boltzmann Machine
  * Restricted Boltzmann Machine
  * Deep Belief Networks
* Memory-augmented Networks
  * Neural Turing Machines
  * Differentiable Neural Computer

### Specific Archtypes

* Convolutional Neural Networks (CNN)
  * AlexNet
  * VGG
  * Inception (GoogLeNet)
  * ResNet
  * DenseNet
  * U-Net (Segmentation)
  * YOLO (Object Detection)
  * SSD (Object Detection)
  * EfficientNet
* Transformers
  * Generative Pre-trained Transformer (GPT)
  * Bidirectional Encoder Representations from Transformers (BERT)
  * A Robustly Optimized BERT Pretraining Approach (RoBERTa)
  * A distilled version of BERT (DistilBERT)
  * Text-to-Text Transfer Transformer (T5)
* Generative Adversarial Networks (GAN)
  * Deep Convolutional GAN (DCGAN)
  * CycleGAN
  * StyleGAN
  * BigGAN
  * Pix2Pix
* AutoEncoders (AE)
  * Variation Autoencoder (VAE)
  * Denoising Autoencoder (DAE)
  * Sparse Autoencoder (SAE)
  * Contractive Autoencoder
* Reinforcement Learning Models
  * Asynchronous Advantage Actor-Critic (A3C)
  * Deep Deterministic Policy Gradient (DDPG)
  * Trust Region Policy Optimization (TRPO)

## Components

### Timeline

* `Timeline`: Structures the overall timeline on the page
* `TimelineItem`: Corresponds to each item rendered along the timeline. Easily Themed with css styles.
  * `TimelineItemDate`: Corresponds to the date box rendered either to the left of the timeline line, or inlined within the `TimelineItemContent` card itself.
  * `TimelineItemMarker`: Corresponds to whats rendered in the marker point that is on the actual timeline line.
  * `TimelineItemContent`: Corresponds to whats rendered for the card for each item on the timeline. Pretty much just a wrapper for `HistoricalEvent`.

### Historical Event

* `HistoricalEvent`: Renders various tabs depending on data available, pertaining to this historical event. Pretty much just wrapper around each of the tabs.

* `EventTab`: Event tab that is initially displayed for each historical event containing a description of the event rendered in markdown, alongside some optional content rendered via a carousel which displays a single piece of content at a time:
  * `events`:  Main prop sent to `EventTab`, directly corresponds to and fed in from the data in json file. Maps to `EventList` component.
  * `event`: Maps to `Event` component
    * `description`: Describes the event. Either a markdown string, or src pointing to a markdown (.md) file
    * `content`: List of relevant content to render. (Rendered via `ContentCarousel` component.)
      * `src`: Source of content to display
      * `header`: Optional header to display with content.
      * `caption`: Optional caption to display with content. (Can be markdown string).
      * `content_source`: name or url of source of the content

* `ResearchTab`: Optional tab containing info on any research papers relevant to the event:
  * `researchList`: Main prop sent to `ResearchTab`, directly corresponds to and fed in from the data in json file. Maps to `ResearchList` component.
    * `research`: Maps to `Research` component.
      * `title`: Title of the research piece
      * `authors`: List of authors
        * `name`: Name of author
        * `url`: Relevant url/homepage of authors
      * `date`: Date of publish or just the relevant date for this research piece
      * `abstract` Abstract of the research piece, or just a general summary/descripion of it
      * `pdfs`: List of locations where pdf is located at, goes through list until able to render one successfully.

* `ResourcesTab`:
  * `resources`:  Main prop sent to `ResourcesTab`, just a list of `resource`s and directly corresponds to and fed in from the data in json file. Maps to `ResourceList` component.
  * `resource`: Maps to `Resource` component.
    * `url`: Location where the resource goes when clicked
    * `icon`: Icon displayed in resource to left of text
    * `label`: Text displayed in resource to right of icon

### ResearchPiece

Renders a collapsible accordion-like component that, when expanded, contains information related to a research piece such as, title, date, author, abstract, pdf preview/thumbail.

### Captioned

Generic text component to render a footnote-like caption in the bottom right w/ respect to the given content or a bold label to the top left w/ respect to the given content

#### TODO: Captioned

* Rename to something better

### Content

Generic content component that renders an optional border, caption, header, source, for a given piece of content.

#### TODO: Content

* Refactor shitty variable and function names
* Generalize to other types of content (e.g. videos, audio, ultimate goal is any react component, etc.)
* param to control border, height

### ContentCarousel

Generic content carousel that renders arrows on top of content to iterate through each individual piece of content

### Tag

Generic structure which renders an optional icon and an optional label. Easily Themed with css styles.

#### AuthorTags

Generic structure which renders a specifically styled `Tag` used for displaying an authors optional icon and name within the `ResearchPiece` component.

#### LogoTags

Generic structure which renders a specifically styled `Tag` used for displaying a company or orgs optional logo and name within the `ResourceTab`

#### AITags

Generic structure which renders a specifically styled `Tag` used for displaying a generic ai learning paradigm, archtype, neural building block used within each tabs tag list.

## Building

```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @fontsource/roboto
npm install react-pdf
npm i --save-dev @types/react-pdf
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
npm i moment
npm install -S color
npm i --save-dev @types/color
npm install -S @carbon/icons-react
npm i --save-dev @types/carbon__icons-react
```

* `npm run build`
* `npm start`
