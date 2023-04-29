import {
  Box,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import ContentGrid from "../ContentGrid";
import { BsSearch } from "react-icons/bs";
import useTMDBSearch from "../../../hooks/getHooks/useTMDBSearch ";

const AddContent = () => {
  const [searchText, setSearchText] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const { results, isLoading } = useTMDBSearch(searchText);
  const [changeCount, setChangeCount] = useState(0); //to rate limit kinda

  if (!results && !isLoading)
    return (
      <Box flex="1">
        <VStack alignItems={"center"} margin={3}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (ref.current) setSearchText(ref.current.value);
            }}
          >
            <InputGroup>
              <InputLeftElement children={<BsSearch />} />
              <Input
                ref={ref}
                borderRadius={20}
                placeholder="Search ..."
                variant="filled"
                width={350}
              ></Input>
            </InputGroup>
          </form>
          <a target="_blank" href="https://www.themoviedb.org/">
            Search powered by TMDB
          </a>
        </VStack>
        <Center>
          <Text fontSize={"4xl"}>
            No Content Found for search text: {searchText}
          </Text>
        </Center>
      </Box>
    );
  return (
    <>
      <Box flex="1">
        <VStack alignItems={"center"} margin={3}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (ref.current) setSearchText(ref.current.value);
            }}
          >
            <InputGroup>
              <InputLeftElement children={<BsSearch />} />
              <Input
                ref={ref}
                borderRadius={20}
                placeholder="Search ..."
                variant="filled"
                width={350}
                onChange={() => {
                  if (ref.current) {
                    setChangeCount((prevCount) => prevCount + 1);
                    if (changeCount >= 2) {
                      setSearchText(ref.current.value);
                      setChangeCount(0);
                    }
                  }
                }}
              />
            </InputGroup>
          </form>
          <a target="_blank" href="https://www.themoviedb.org/">
            Search powered by TMDB
          </a>
        </VStack>
        <ContentGrid contentArray={results} isLoading={isLoading} />
      </Box>
    </>
  );
};

export default AddContent;
