import React from "react";
import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Button,
  Link,
  Heading,
  Center,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import zack from "../assets/Zack.png";
import joe from "../assets/Joe.jpg";
import {
  FaReact,
  FaNodeJs,
  SiTypescript,
  SiChakraui,
  AiFillGithub,
  IoLogoVercel,
  TbBrandVite,
  SiPostgresql,
  SiExpress,
  SiThemoviedatabase,
  AiOutlineMail,
  SiAxios,
} from "react-icons/all";

interface Developer {
  name: string;
  imageUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  role: string;
}

interface DeveloperCardProps extends Developer {}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  name,
  imageUrl,
  githubUrl,
  portfolioUrl,
  role,
}) => {
  return (
    <VStack spacing={4} alignItems="center">
      <Image
        borderRadius="full"
        boxSize="150px"
        src={imageUrl}
        alt={`${name}'s profile image`}
      />
      <Text fontSize="xl" fontWeight="bold">
        {name}
      </Text>
      <Text fontSize="md" fontWeight="bold" textColor={"red"}>
        {role}
      </Text>
      <HStack spacing={3}>
        <Link href={githubUrl} isExternal>
          <Button leftIcon={<FaGithub />} colorScheme="gray">
            GitHub
          </Button>
        </Link>
        <Link href={portfolioUrl} isExternal>
          <Button colorScheme="blue">Portfolio</Button>
        </Link>
      </HStack>
    </VStack>
  );
};

interface Technologies {
  name: string;
  icon: any;
}

interface TechnologiesGridProps {
  technologies: Technologies[];
}

const technologies = [
  { name: "React", icon: FaReact },
  { name: "Vite", icon: TbBrandVite },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Chakra UI", icon: SiChakraui },
  { name: "Axios", icon: SiAxios },
  { name: "EmailJS", icon: AiOutlineMail },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express", icon: SiExpress },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Vercel", icon: IoLogoVercel },
  { name: "GitHub", icon: AiFillGithub },
  { name: "The Movie Database", icon: SiThemoviedatabase },
];

const TechnologiesGrid = ({ technologies }: TechnologiesGridProps) => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        Technologies Used
      </Text>
      <Grid
        templateColumns="repeat(auto-fit, minmax(25%, 1fr))"
        gap={4}
        justifyContent="center"
      >
        {technologies.map((tech) => (
          <GridItem key={tech.name} textAlign="center">
            <VStack>
              <Box as={tech.icon} size="2em" />
              <Text fontSize="lg" fontWeight="bold">
                {tech.name}
              </Text>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

const About = () => {
  const developers: Developer[] = [
    {
      name: "Joseph Waldron",
      imageUrl: joe,
      githubUrl: "https://github.com/josephWaldron",
      portfolioUrl: "https://portfolio-site-delta-seven.vercel.app/",
      role: "Frontend",
    },
    {
      name: "Zach Gordon",
      imageUrl: zack,
      githubUrl: "https://github.com/zachgordon25",
      portfolioUrl: "https://zachgordon25.github.io/",
      role: "Backend",
    },
  ];
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });

  return (
    <VStack padding={10}>
      <Text>
        <Heading mb={6}>About ScreenBuddy</Heading>
      </Text>
      <Text>
        ScreenBuddy is a web application created as part of the Kean
        University's CPS 3500 Final Project.
      </Text>
      <br />
      <Text>
        The primary objective of ScreenBuddy is to offer a platform where users
        can showcase their entertainment interests and share it with friends and
        family.
      </Text>
      <br />
      <Box p={6} borderWidth="1px" borderRadius="lg">
        <Heading mb={6}>About the Developers</Heading>
        <StackComponent spacing={10}>
          {developers.map((dev, index) => (
            <DeveloperCard key={index} {...dev} />
          ))}
        </StackComponent>
      </Box>

      <Box p={6} borderWidth="1px" borderRadius="lg" width={400}>
        <TechnologiesGrid technologies={technologies} />
      </Box>
    </VStack>
  );
};

export default About;
