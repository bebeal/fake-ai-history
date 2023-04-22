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
          { TimelineTest() }
        </div>
        <>{console.log('---------------END COMPONENT---------------')}</>
      </ThemeProvider>
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