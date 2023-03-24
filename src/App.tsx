import React from 'react';
import Event from './components/Event/Event';
import Image from './components/Image/Image';
import Tag from './components/Tag/Tag';

function App() {
  return (
    <div className="App">

      <Tag tagName={'JAX'} />

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
    </div>
  );
}

export default App;
