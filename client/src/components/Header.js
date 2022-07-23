import logo from './../assets/logo.png';
import {useRef,useState,useEffect} from "react";
import { useViewportScroll } from "framer-motion";
import {chakra,Flex,HStack,Link,useColorModeValue,Box,Image,Text} from "@chakra-ui/react";

const Header = () => {

  const bg = useColorModeValue("gray.50", "gray.800");
  const ref = useRef();
  const [y, setY] = useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();

  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  

  return (
    <Box pos="relative">
      <chakra.header ref={ref} shadow={y > height ? "sm" : undefined} transition="box-shadow 0.2s" bg={bg} borderTop="6px solid" borderTopColor="pink.400" w="full" overflowY="hidden">
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">

          <Flex w="full" h="full" px="6" align="center" justify="space-between">
            <Flex align="center">
              <Link href="/">
                <HStack>
                  <Image boxSize='80px' src={logo} alt="breast-cancer-logo"/>
                </HStack>
              </Link>
            </Flex>

            <Flex justify="center" w="full" maxW="824px" align="center" color="pink.400" display={{ base: "none", md: "flex" }}>
              <Text fontSize='4xl' color="pink.400" align="center" >Breast Cancer Classification</Text>
            </Flex>

            <Flex justify="flex-end" align="center">
                <Text color="pink.400"  display={{ base: "flex", md: "none" }}>Breast Cancer Classification</Text>
            </Flex>
          </Flex>
          
        </chakra.div>
      </chakra.header>
    </Box>
  );
};

export default Header;