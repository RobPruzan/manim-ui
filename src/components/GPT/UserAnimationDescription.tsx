import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from "openai";
import { useState, type Dispatch, type SetStateAction } from "react";
export type UserAnimationDescriptionProps = {
  setVideoURL: Dispatch<SetStateAction<string | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  selectedType: "code" | "gpt";
};

async function requestGPT(description: string) {
  const configuration = new Configuration({
    organization: "org-w3pzkJvfH1OVGYWqigk0JqjE",
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const preprompt = `
Output the the following code for the manim community animation given the natural language command.

Always end the code with (outside of the class): 
scene = Name()
scene.render()

and ONLY respond with code, do not respond with any other text and do not import manim, that is already imported. Do not assume there are other variables available to your, and make sure the syntax is 100% correct.

\n\n

REMEMBER: Only give code for the above request.
      `;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        content: preprompt + description,
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
      },
    ],
  });

  const content = response.data.choices?.[0]?.message?.content;

  return [content, response, preprompt + description] as const;
}

export const gptErrorRequest = async ({
  sourceCode,
  error,
  originalPrompt,
}: {
  sourceCode: string;
  error: string;
  originalPrompt: string;
}) => {
  const configuration = new Configuration({
    organization: process.env.NEXT_PUBLIC_OPENAI_ORG_KEY,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_ORG_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const prePrompt =
    "The following code produced an error, please correct yourself:";

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        content: originalPrompt + prePrompt + sourceCode + error,
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
      },
    ],
  });
  return [
    response.data.choices?.[0]?.message?.content,
    response,
    originalPrompt,
  ] as const;
};

const UserAnimationDescription = ({
  setVideoURL,
  setIsLoading,
  selectedType,
}: UserAnimationDescriptionProps) => {
  const [userAnimationDescription, setUserAnimationDescription] =
    useState<string>("");

  return (
    <>
      <textarea
        placeholder="Enter your animation description here"
        value={userAnimationDescription}
        onChange={(e) => setUserAnimationDescription(e.target.value)}
        className="m-2 h-3/4 w-3/4 rounded-lg bg-zinc-800 p-2 text-white outline-none"
      />
<<<<<<< HEAD
=======
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          if (selectedType === "code") {
            console.log("Click", userAnimationDescription);
            setVideoURL(null);
            setIsLoading(true);
            await fetchVideo(userAnimationDescription, setVideoURL);
            console.log("done");
            setIsLoading(false);
            return;
          }
          setVideoURL(null);
          setIsLoading(true);
          // setTimeout(() => {
          const code = await requestGPT(userAnimationDescription);
          if (code[0]) {
            const fetchVideoRes = await fetchVideo(code[0], setVideoURL);
            // }
          }
          // }, 5000);
          setIsLoading(false);
        }}
        className="m-2 w-3/4 rounded-lg bg-zinc-800  p-2 text-white outline-none ring-zinc-700  transition hover:ring-1"
      >
        Submit
      </button>
>>>>>>> 29109d7 (Fetch video and render in browser)
    </>
  );
};

export default UserAnimationDescription;
