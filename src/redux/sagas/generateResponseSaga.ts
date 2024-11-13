// sagas/updateFormSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import Groq from 'groq-sdk';
import { UPDATE_FORM } from '../actions';
import { updateResponse } from '../actions';
import { configs } from '../../../config';

const groq = new Groq({ apiKey: configs.groqApiKey, dangerouslyAllowBrowser: true });

function* handleUpdateForm(action:any) {
  try {
    const appIdea = action.payload;

    console.log("")

    const chatCompletion = yield call([groq.chat.completions, 'create'], {
        
            messages: [{ role: 'user', content:`
            As a technical project manager, analyze the following app idea and generate a detailed list of tasks:
            
            App Idea: ${appIdea.idea}
            Features: ${appIdea.features}
            Tech Stack: ${appIdea.techStack}
            Deadline: ${appIdea.deadline}
            
            Generate a JSON array of tasks, where each task has:
            - title: A clear, concise title
            - description: A detailed technical description that explains how the task is completed using ${appIdea.techStack}. Mention any specific libraries, frameworks, or tools involved.
            - dueDate: A realistic date starting from today up to ${appIdea.deadline}, evenly distributed to match the project's timeline
            
            Format the response as valid JSON only, no additional text.
          ` }],
            model: 'mixtral-8x7b-32768',
            response_format: {"type": "json_object"},
            temperature: 0.3,
            max_tokens: 4096,
          
      });

      console.log(chatCompletion.choices[0].message.content);

    yield put(updateResponse(chatCompletion.choices[0].message.content));
  } catch (error) {
    console.error('Error fetching data from Groq:', error);
  }
}

export default function* watchUpdateForm() {
  yield takeLatest(UPDATE_FORM, handleUpdateForm);
}