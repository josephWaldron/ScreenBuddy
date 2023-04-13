import autocomplete from "../data/GET/autocomplete";

export interface autoCompleteRes {
  id: number;
  name: string;
}

interface Props {
  //minimum 2 characters
  search: string;
}
const getAutocomplete = ({ search }: Props) => {
  //call database and return autocomplete oject
  return autocomplete;
};

export default getAutocomplete;
