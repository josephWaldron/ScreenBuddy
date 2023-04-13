import autocomplete from "../../data/GET/autocomplete";

export interface autoComplete {
  id: number;
  name: string;
}

interface Props {
  //minimum 2 characters
  search: string;
}

const getAutocomplete = ({ search }: Props): autoComplete[] => {
  //call database and return autocomplete object
  return autocomplete;
};

export default getAutocomplete;
