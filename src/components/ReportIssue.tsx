import { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import emailjs from "emailjs-com";

const ReportIssue = () => {
  const [issue, setIssue] = useState("");
  const toast = useToast();
  const { user } = useUser();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const templateParams = {
      user_email: user.primaryEmailAddress!.emailAddress,
      user_name: user.username,
      issue_description: issue,
    };
    const KEY = import.meta.env.VITE_EMAIL_API_KEY;

    emailjs
      .send("service_zrd526f", "template_x99r93q", templateParams, KEY)
      .then(
        (result) => {
          toast({
            title: "Issue reported successfully",
            description:
              "We have received your issue report and will get back to you shortly.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setIssue("");
        },
        (error) => {
          toast({
            title: "Failed to report issue",
            description: "Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      );
  };

  return (
    <Box
      padding={6}
      borderWidth={1}
      borderColor="white"
      borderRadius="md"
      boxShadow="md"
      margin={10}
    >
      <Center>
        <Text fontSize="xl" fontWeight="bold">
          Report an Issue
        </Text>
      </Center>

      <form onSubmit={handleSubmit}>
        <FormControl id="issue" isRequired>
          <FormLabel>Issue</FormLabel>
          <Textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe your issue"
          />
        </FormControl>
        {!user && (
          <Text color="red.500" mt={4}>
            Please log in to submit an issue.
          </Text>
        )}
        <Tooltip
          label={
            !user
              ? "Please log in to submit an issue"
              : "The issue description must be at least 5 characters long"
          }
          placement="top"
          isDisabled={!!(user && issue.length >= 5)}
        >
          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            isDisabled={!user || issue.length < 5}
          >
            Submit Issue
          </Button>
        </Tooltip>
      </form>
    </Box>
  );
};

export default ReportIssue;
