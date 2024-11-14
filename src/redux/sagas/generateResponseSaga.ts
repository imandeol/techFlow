import { call, put, takeLatest } from "redux-saga/effects";
import Groq from "groq-sdk";
import { UPDATE_FORM } from "../actions";
import { updateResponse } from "../actions";
// @ts-ignore
import { configs } from "../../../config";

const groq = new Groq({
  apiKey: configs.groqApiKey,
  dangerouslyAllowBrowser: true,
});

function* handleUpdateForm(action: any) {
  try {
    const appIdea = action.payload;

    const deadline = new Date(appIdea.deadline);
    const today = new Date();
    const differenceInMilliseconds = deadline.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    // @ts-ignore
    const chatCompletion = yield call([groq.chat.completions, "create"], {
      messages: [
        {
          role: "user",
          content: `
          As a technical project manager, analyze the following app idea and generate a detailed list of tasks:

          App Idea: ${appIdea.idea}
          Features: ${appIdea.features}
          Tech Stack: ${appIdea.techStack}
          Project Duration (in days): ${differenceInDays}  // This is the deadline date - today's date in days
          
          Generate a JSON array of tasks, where each task has:
          - title: A clear, concise title
          - description: A detailed technical description that explains how the task is completed using ${appIdea.techStack}. Mention any specific libraries, frameworks, or tools involved.
          - daysRequired: The number of days the task will take, evenly distributed so that the total matches ${differenceInDays}.
          
          Ensure that the daysRequired values are positive integers and sum up to ${differenceInDays}.
          
          Format the response as valid JSON only, no additional text.
          `,
        },
      ],
      model: "mixtral-8x7b-32768",
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 4096,
    });

    console.log(chatCompletion.choices[0].message.content);

    yield put(updateResponse(chatCompletion.choices[0].message.content));
  } catch (error) {
    console.error("Error fetching data from Groq:", error);
  }
}

export default function* watchUpdateForm() {
  yield takeLatest(UPDATE_FORM, handleUpdateForm);
}
