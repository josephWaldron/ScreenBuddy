import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Spacer,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Tabs,
  Tab,
  TabList,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import { debounce } from "lodash";

interface Props {
  onSearch: (searchText: string) => void;
  onSelectType: (type: string) => void;
  onFilter: (filter: string) => void;
  selectedFilter: string;
}

const Filters = ({
  onFilter,
  selectedFilter,
  onSearch,
  onSelectType,
}: Props) => {
  const filterOptions = [
    { value: "", label: "Newest" },
    { value: "updated_at ASC", label: "Oldest" },
    { value: "title ASC", label: "Title A-Z" },
    { value: "title DESC", label: "Title Z-A" },
    { value: "rating ASC", label: "Rating Low-High" },
    { value: "rating DESC", label: "Rating High-Low" },
  ];
  const handleInputChange = debounce((value) => {
    onSearch(value);
  }, 200);

  const currentSelectedFilter = filterOptions.find(
    (option) => option.value === selectedFilter
  );
  const ref = useRef<HTMLInputElement>(null);

  return (
    <VStack padding={2}>
      <Tabs>
        <TabList mb="1em">
          <Tab onClick={() => onSelectType("")}>All</Tab>
          <Tab onClick={() => onSelectType("movie")}>Movies</Tab>
          <Tab onClick={() => onSelectType("tv")}>TV / Anime</Tab>
        </TabList>
      </Tabs>
      <HStack>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (ref.current) onSearch(ref.current.value);
          }}
        >
          <InputGroup>
            <InputLeftElement children={<BsSearch />} />
            <Input
              ref={ref}
              borderRadius={20}
              placeholder="Search ..."
              variant="filled"
              width={250}
              onChange={() => {
                if (ref.current) {
                  handleInputChange(ref.current.value);
                }
              }}
            />
          </InputGroup>
        </form>
        <Spacer />
        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            {currentSelectedFilter?.label}
          </MenuButton>
          <MenuList>
            {filterOptions.map((order) => (
              <MenuItem
                onClick={() => onFilter(order.value)}
                key={order.value}
                value={order.value}
              >
                {order.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
};

export default Filters;
