import axios from '../api/axios';
import { useState,useEffect} from 'react';
import {Flex,Box,FormControl,FormLabel,Input,HStack,Stack,Button,Text,useColorModeValue,useToast} from '@chakra-ui/react';

//The api end point we need to call to make our predictions 
const PREDICTION_URL = '/predict';

  const Form = () => {

    //Tumor Fields required to make a classification
    const [meanRadius, setMeanRadius] = useState("");
    const [meanPerimeter, setMeanPerimeter] = useState("");
    const [meanArea, setMeanArea] = useState("");
    const [meanSmoothness, setMeanSmoothness] = useState("");
    const [meanCompactness, setMeanCompactness] = useState("");
    const [meanConcavity, setMeanConcavity] = useState("");
    const [meanConcavePoints, setMeanConcavePoints] = useState("");
    const [radiusError, setRadiusError] = useState("");
    const [perimeterError, setPerimeterError] = useState("");
    const [areaError, setAreaError] = useState("");
    const [concavityError, setConcavityError] = useState("");
    const [concavePointsError, setConcavePointsError] = useState("");
    const [worstTexture, setWorstTexture] = useState("");
    const [worstPerimeter, setWorstPerimeter] = useState("");
    const [worstArea, setWorstArea] = useState("");
    const [worstSmoothness, setWorstSmoothness] = useState("");
    const [worstCompactness, setWorstCompactness] = useState("");
    const [worstRadius, setWorstRadius] = useState("");
    const [worstConcavity, setWorstConcavity] = useState("");
    const [worstConcavePoints, setWorstConcavePoints] = useState("");
    const [prediction, setPrediction] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const toast = useToast();


    /* 
        This function converts our variable naming convention from camel case to snake case.
        The server experts them to be be in snake case.
        To use best practices, i decided to convert them on the fly and use camelCase for javascript and pythonic snake_case for python 🐍
    */
    const camelToSnakeCase = (key) =>{
        return key.replace( /([A-Z])/g, "_$1" ).toLowerCase();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    const tumorData = {
        meanRadius, 
        meanPerimeter,
        meanArea,
        meanSmoothness,
        meanCompactness,
        meanConcavity,
        meanConcavePoints,
        radiusError,
        perimeterError,
        areaError,
        concavityError,
        concavePointsError,
        worstTexture,
        worstPerimeter,
        worstArea,
        worstSmoothness,
        worstCompactness,
        worstRadius,
        worstConcavity,
        worstConcavePoints    
    };

    let newTumorData = {};

    //convert the above tumor data variables from camelCase to snake_case
    for(let camel in tumorData) {
        newTumorData[camelToSnakeCase(camel)] = tumorData[camel];
    }

        try {
            const response = await axios.post(PREDICTION_URL,
                JSON.stringify(newTumorData),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const prediction = response?.data?.prediction;
         
            setPrediction(prediction);
            setMeanRadius("");
            setMeanPerimeter("");
            setMeanArea("");
            setMeanSmoothness("");
            setMeanCompactness("");
            setMeanConcavity("");
            setMeanConcavePoints("");
            setRadiusError("");
            setPerimeterError("");
            setAreaError("");
            setConcavityError("");
            setConcavePointsError("");
            setWorstTexture("");
            setWorstPerimeter("");
            setWorstArea("");
            setWorstSmoothness("");
            setWorstCompactness("");
            setWorstRadius("");
            setWorstConcavity("");
            setWorstConcavePoints("");
            setErrMsg("");

           
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response.');
            } else {
                setErrMsg('Making A Prediction Failed.');
            }
            
        }
    }

    useEffect(() => {
        //if our api call was successful and got a prediction back,display a success toast.
        if (prediction) {
          toast({
            title: "Prediction Results",
            variant: "pink",
            description: prediction,
            duration: 15000,
            position: "top",
            isClosable: true,
          });
        //if our api call went sideways and a mishap occured. Show the user a freindly message about that mishap as an error toast 🤨
        } else if(errMsg){
            toast({
                title: "An Error Occurred",
                description: errMsg,
                status: "error",
                duration: 15000,
                position: "top",
                isClosable: true,
              });
        }
      }, [prediction,errMsg]);
  
    return (
      <Flex  align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} py={12} px={6}>
          <Box rounded={'lg'} boxShadow={'lg'} p={8}>
          <Text fontSize={'lg'}>Please enter the following tumor details to classify it as either benign or malignant:</Text>
            <br/>
            <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <HStack>
                <Box>
                  <FormControl id="meanRadius">
                    <FormLabel >Mean Radius</FormLabel>
                    <Input value={meanRadius} onChange={(e) => setMeanRadius(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="meanPerimeter">
                    <FormLabel>Mean Perimeter</FormLabel>
                    <Input value={meanPerimeter} onChange={(e) => setMeanPerimeter(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="meanArea">
                    <FormLabel>Mean Area </FormLabel>
                    <Input  value={meanArea} onChange={(e) => setMeanArea(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="meanSmoothness">
                    <FormLabel>Mean Smoothness</FormLabel>
                    <Input  value={meanSmoothness} onChange={(e) => setMeanSmoothness(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <FormControl id="meanCompactness">
                    <FormLabel>Mean Compactness</FormLabel>
                    <Input  value={meanCompactness} onChange={(e) => setMeanCompactness(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="meanConcavity">
                    <FormLabel>Mean Concavity</FormLabel>
                    <Input  value={meanConcavity} onChange={(e) => setMeanConcavity(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="meanConcavePoints">
                    <FormLabel>Mean Concave Points</FormLabel>
                    <Input   value={meanConcavePoints} onChange={(e) => setMeanConcavePoints(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="radiusError">
                    <FormLabel>Radius Error</FormLabel>
                    <Input  value={radiusError} onChange={(e) => setRadiusError(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <FormControl id="perimeterError">
                    <FormLabel>Perimeter Error</FormLabel>
                    <Input  value={perimeterError} onChange={(e) => setPerimeterError(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="areaError">
                    <FormLabel>Area Error</FormLabel>
                    <Input  value={areaError} onChange={(e) => setAreaError(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="concavityError">
                    <FormLabel>Concavity Error</FormLabel>
                    <Input  value={concavityError} onChange={(e) => setConcavityError(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="concavePointsError">
                    <FormLabel>Concave Points Error</FormLabel>
                    <Input  value={concavePointsError} onChange={(e) => setConcavePointsError(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <FormControl id="worstRadius">
                    <FormLabel >Worst Radius</FormLabel>
                    <Input  value={worstRadius} onChange={(e) => setWorstRadius(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="worstTexture">
                    <FormLabel>Worst Texture</FormLabel>
                    <Input  value={worstTexture} onChange={(e) => setWorstTexture(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="worstPerimeter">
                    <FormLabel>Worst Perimeter</FormLabel>
                    <Input  value={worstPerimeter} onChange={(e) => setWorstPerimeter(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="worstArea">
                    <FormLabel>Worst Area</FormLabel>
                    <Input  value={worstArea} onChange={(e) => setWorstArea(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <FormControl id="worstSmoothness">
                    <FormLabel>Worst Smoothness</FormLabel>
                    <Input  value={worstSmoothness} onChange={(e) => setWorstSmoothness(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="worstCompactness">
                    <FormLabel>Worst Compactness</FormLabel>
                    <Input  value={worstCompactness} onChange={(e) => setWorstCompactness(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="worstConcavity">
                    <FormLabel>Worst Concavity</FormLabel>
                    <Input  value={worstConcavity} onChange={(e) => setWorstConcavity(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="worstConcavePoints">
                    <FormLabel>Worst Concave Points</FormLabel>
                    <Input value={worstConcavePoints} onChange={(e) => setWorstConcavePoints(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>
              
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Predicting"
                  size="lg"
                  bg={'pink.400'}
                  color={'white'}
                  _hover={{
                    bg: 'pink.500',
                  }}>
                  Classify Tumor
                </Button>
              </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

  Input.defaultProps = {
    focusBorderColor:'pink.400',
    step:"0.001",
    type: "number"
  }
  
  FormControl.defaultProps = {
    isRequired: true
  }

  export default Form;