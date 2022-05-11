import Form from "./Form";
import {Flex,SimpleGrid} from "@chakra-ui/react";
  
  const Hero = () => {
    return (
      <SimpleGrid columns={{ base: 1}} spacing={0} _after={{bg: "brand.500", opacity: 0.25,pos: "absolute", top: 0,left: 0,bottom: 0,right: 0, zIndex: -1, content: '" "'}}>
        <Flex direction="row" alignItems="center" justifyContent="center" px={{ base: 4, lg: 20 }} py={24}>
            <Form />  
        </Flex>
      </SimpleGrid>
    );
  };
  
  export default Hero;